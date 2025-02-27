import { AcademicFaculty } from './../academicFaculty/academicFaculty.model';
import status from 'http-status';
import AppError from '../../errors/AppError';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { AcademicDepartment } from '../academicDeparment/academicDepartment.model';
import { Faculty } from '../faculty/faculty.model';
import { Course } from '../course/course.model';
import { hasTimeConflict } from './offeredCourse.utils';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    faculty,
    course,
    section,
    days,
    startTime,
    endTime,
  } = payload;

  const isSemesterRegistrationExist =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExist) {
    throw new AppError(status.NOT_FOUND, 'Registration Semester not found');
  }

  const academicSemester = isSemesterRegistrationExist.academicSemester;

  const isAcademicFacultyExist =
    await AcademicFaculty.findById(academicFaculty);
  if (!isAcademicFacultyExist) {
    throw new AppError(status.NOT_FOUND, 'Academic Faculty not found');
  }

  const isAcademicDepartmentExist =
    await AcademicDepartment.findById(academicDepartment);
  if (!isAcademicDepartmentExist) {
    throw new AppError(status.NOT_FOUND, 'Academic Department not found');
  }

  const isFacultyExist = await Faculty.findById(faculty);
  if (!isFacultyExist) {
    throw new AppError(status.NOT_FOUND, 'Faculty not found');
  }

  const isCourseExist = await Course.findById(course);
  if (!isCourseExist) {
    throw new AppError(status.NOT_FOUND, 'Course not found');
  }

  // check if faculty exist in the department
  const isFacultyExistInDepartment = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isFacultyExistInDepartment) {
    throw new AppError(
      status.NOT_FOUND,
      `This ${isAcademicFacultyExist.name} not exist in the ${isAcademicDepartmentExist.name}`,
    );
  }

  // check if the same offered course same course same semester register and same section exist ?

  const isExistSameCourseSectionAndRegisterSemester =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isExistSameCourseSectionAndRegisterSemester) {
    throw new AppError(
      status.BAD_REQUEST,
      'Offered course with same section already exist',
    );
  }

  // check the faculty same schedules or not?

  const assignSchedules = await OfferedCourse.find(
    {
      semesterRegistration,
      faculty,
      days: { $in: days },
    },
    { days: 1, startTime: 1, endTime: 1, _id: 0 },
  );

  const newAssignSchedule = {
    startTime,
    endTime,
    days,
  };

  if (hasTimeConflict(assignSchedules, newAssignSchedule)) {
    throw new AppError(
      status.BAD_REQUEST,
      'This Faculty is not Available that time ! Chose other time  or day',
    );
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Partial<TOfferedCourse>,
) => {
  const { faculty, days, startTime, endTime } = payload;

  const isOfferedCourseExist = await OfferedCourse.findById(id, {
    academicDepartment: 0,
    academicFaculty: 0,
    academicSemester: 0,
    faculty: 0,
    _id: 0,
    __v: 0,
  });

  // check offered course exist
  if (!isOfferedCourseExist) {
    throw new AppError(
      status.BAD_REQUEST,
      'This Offered course not exist in the data base',
    );
  }

  // check the offered course semesterRegistration status UPCOMING or not ?
  const semesterRegistrationStatus = await SemesterRegistration.findById(
    isOfferedCourseExist.semesterRegistration,
    { status: 1, _id: 0 },
  );
  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      status.BAD_REQUEST,
      `This Course already ${semesterRegistrationStatus?.status} not possible to update`,
    );
  }

  const assignSchedules = await OfferedCourse.find(
    {
      semesterRegistration: isOfferedCourseExist.semesterRegistration._id,
      faculty,
      days: { $in: days },
    },
    { days: 1, startTime: 1, endTime: 1, _id: 0 },
  );
  const newAssignSchedule = {
    startTime: startTime!,
    endTime: endTime!,
    days: days!,
  };

  if (hasTimeConflict(assignSchedules, newAssignSchedule)) {
    throw new AppError(
      status.BAD_REQUEST,
      'This Faculty is not Available that time ! Chose other time  or day',
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  updateOfferedCourseIntoDB,
};

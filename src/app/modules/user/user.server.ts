import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createStudent = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  //   if password not given then set default password
  userData.password = password || (config.default_password as string);

  //  set role
  userData.role = 'student';

  const admissionsSemester = (await AcademicSemester.findById(
    payload.admissionSemester,
  )) as TAcademicSemester;

  // Implement Transaction Rollback
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // generate Student Id
    userData.id = await generateStudentId(admissionsSemester);

    //   create user
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Fail to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Fail to create student');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Fail Student create')
  }
};

export const UserService = {
  createStudent,
};

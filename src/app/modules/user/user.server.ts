/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus, { status } from 'http-status';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { AcademicDepartment } from '../academicDeparment/academicDepartment.model';

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
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Fail Student create');
  }
};

const createFaculty = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = 'faculty';
  
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment
  )

  if(!academicDepartment){
    throw new AppError(400,'Academic Department not found')
  }
  
  // implement Transaction
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await generateFacultyId();

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, 'Fail to create user ');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(status.BAD_REQUEST, 'Fail to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Fail Student create');
  }
};

const createAdmin = async (password: string, payload: TAdmin) => {
  const userData: Partial<TUser> = {};
  userData.password = password || config.default_password;
  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await generateAdminId();
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, 'Fail to create User ');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(status.BAD_REQUEST, 'fail to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(status.BAD_REQUEST, 'admin created fail');
  }
};

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
};

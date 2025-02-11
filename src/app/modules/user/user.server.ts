import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudent = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  //   if password not given then set default password
  userData.password = password || (config.default_password as string);

  //  set role
  userData.role = 'student';

  const admissionsSemester = (await AcademicSemester.findById(
    payload.admissionSemester,
  )) as TAcademicSemester;
  // generate Student Id
  userData.id = await generateStudentId(admissionsSemester);

  //   create user
  const newUser = await User.create(userData);

  //   create student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;

    const newStudent = await Student.create(payload);

    return newStudent;
  }
};

export const UserService = {
  createStudent,
};

import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudent = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};

  //   if password not given then set default password
  userData.password = password || (config.default_password as string);

  //  set role
  userData.role = 'student';

  // manually generated id
  userData.id = '2023100001';

  //   create user
  const newUser = await User.create(userData);

  //   create student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await Student.create(studentData);

    return newStudent;
  }
};

export const UserService = {
  createStudent,
};

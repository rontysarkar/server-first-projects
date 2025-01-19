import { StudentModel } from '../student.model';
import { Student } from './student.interface';

const createStudent = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentsData = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentData = async (email: string) => {
  const result = await StudentModel.find({ email: email });
  return result;
};

export const StudentServices = {
  createStudent,
  getAllStudentsData,
  getSingleStudentData,
};

import { Student } from '../student.model';
import { TStudent } from './student.interface';

const createStudent = async (studentData: TStudent) => {

// static methods in mongodb
  if(await Student.isUserExists(studentData.id)){
    throw new Error("User exists already")
   }


   const result = await Student.create(studentData);
  
  
    //create a instance methods

  // const student = new Student(studentData);
  // if(await student.isUserExists(studentData.id)){
  //   throw new Error("User already exists")
  // }
  // const result = await student.save();
  return result;
};

const getAllStudentsData = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentData = async (email: string) => {
  const result = await Student.find({ email: email });
  return result;
};

export const StudentServices = {
  createStudent,
  getAllStudentsData,
  getSingleStudentData,
};

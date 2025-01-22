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

const getSingleStudentData = async (id: string) => {
  // const result = await Student.find({ id: id });
  const result = await Student.aggregate([{$match : {id : id}}])
  return result;
};

const deleteSingleStudentData = async( id : string) =>{
  const result = await Student.updateOne({id},{isDeleted:true})
  return result
}

export const StudentServices = {
  createStudent,
  getAllStudentsData,
  getSingleStudentData,
  deleteSingleStudentData,
};

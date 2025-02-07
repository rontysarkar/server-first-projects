import { Student } from './student.model';




const getAllStudentsData = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentData = async (id: string) => {
  // const result = await Student.find({ id: id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteSingleStudentData = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentsData,
  getSingleStudentData,
  deleteSingleStudentData,
};

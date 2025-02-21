import { StudentServices } from './student.service';
import asyncHandler from '../../utils/asyncHandler';
import status from 'http-status';

const getAllStudentData = asyncHandler(async (req, res) => {
  const result = await StudentServices.getAllStudentsData(req.query);
  res.status(200).json({
    success: true,
    message: 'student data get successfully',
    data: result,
  });
});

const getSingleStudentData = asyncHandler(async (req, res) => {
  const result = await StudentServices.getSingleStudentData(req.params.id);
  res.status(200).json({
    success: true,
    message: 'student single data get successfully',
    data: result,
  });
});

const updateStudentData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentData(id, student);
  res.status(status.OK).json({
    success: true,
    message: 'Update data successfully',
    data: result,
  });
});

const deleteSingleStudentData = asyncHandler(async (req, res) => {
  const result = await StudentServices.deleteStudentData(req.params.id);
  res.status(200).json({
    success: true,
    message: 'data is deleted successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudentData,
  getSingleStudentData,
  updateStudentData,
  deleteSingleStudentData,
};

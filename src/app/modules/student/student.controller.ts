import { StudentServices } from './student.service';
import asyncHandler from '../../utils/asyncHandler';

const getAllStudentData = asyncHandler(async (req, res) => {
  const result = await StudentServices.getAllStudentsData();
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

const deleteSingleStudentData = asyncHandler(
  async (req, res) => {
    const result = await StudentServices.deleteStudentData(req.params.id);
    res.status(200).json({
      success: true,
      message: 'data is update successfully',
      data: result,
    });
  },
);

export const StudentControllers = {
  getAllStudentData,
  getSingleStudentData,
  deleteSingleStudentData,
};

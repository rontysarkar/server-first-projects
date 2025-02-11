import status from 'http-status';
import asyncHandler from '../../utils/asyncHandler';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = asyncHandler(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  res.status(status.OK).json({
    success: true,
    message: 'Academic Semester create successfully',
    data: result,
  });
});

const getAllSemesterData = asyncHandler(async (req, res) => {
  const result = await AcademicSemesterServices.getAllSemesterData();
  res.status(status.OK).json({
    success: true,
    message: 'All Semester Data Find Successfully',
    data: result,
  });
});

const getSingleSemesterData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicSemesterServices.getSingleSemesterDataById(id);

  res.status(status.OK).json({
    success: true,
    message: 'get your semester successfully',
    data: result,
  });
});
const updateSemesterDataById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await AcademicSemesterServices.updateSemesterDataById(
    id,
    updateData,
  );

  res.status(status.OK).json({
    success: true,
    message: 'get your semester successfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllSemesterData,
  getSingleSemesterData,
  updateSemesterDataById,
};

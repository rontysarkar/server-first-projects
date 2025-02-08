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

export const AcademicSemesterControllers = {
  createAcademicSemester,
};

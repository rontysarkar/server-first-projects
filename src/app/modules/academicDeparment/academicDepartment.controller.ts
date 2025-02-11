import status from 'http-status';
import asyncHandler from '../../utils/asyncHandler';
import { AcademicDepartmentService } from './academicDepartment.service';

const createAcademicDepartment = asyncHandler(async (req, res) => {
  const result = await AcademicDepartmentService.createAcademicDepartmentIntoDB(
    req.body,
  );
  res.status(status.OK).json({
    success: true,
    message: 'Academic Department created successfully',
    data: result,
  });
});

const getAllAcademicDepartment = asyncHandler(async (req, res) => {
  const result = await AcademicDepartmentService.getAllAcademicDepartment();
  res.status(status.OK).json({
    success: true,
    message: 'Get all Academic Department Data successfully',
    data: result,
  });
});

const getSingleAcademicDepartmentById = asyncHandler(async (req, res) => {
  const { departmentId } = req.params;

  const result =
    await AcademicDepartmentService.getSingleAcademicDepartmentById(
      departmentId,
    );
  res.status(status.OK).json({
    success: true,
    message: 'Get Academic Department Successfully',
    data: result,
  });
});

const updateAcademicDepartmentById = asyncHandler(async (req, res) => {
  const { departmentId } = req.params;
  const updateData = req.body;
  const result = await AcademicDepartmentService.updateAcademicDepartmentById(
    departmentId,
    updateData,
  );

  res.status(status.OK).json({
    success: true,
    message: 'Update Academic Department successfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartmentById,
  updateAcademicDepartmentById,
};

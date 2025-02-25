import status from 'http-status';
import asyncHandler from '../../utils/asyncHandler';
import { SemesterRegistrationServices } from './semesterRegistration.service';

const createSemesterRegistration = asyncHandler(async (req, res) => {
  const result =
    await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
      req.body,
    );
  res.status(status.OK).json({
    success: true,
    message: 'Semester Registration Successfully',
    data: result,
  });
});

const getSingleSemesterRegistration = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(id);
  res.status(status.OK).json({
    success: true,
    message: 'Registration Semester retrieved Successfully',
    data: result,
  });
});

const getAllSemesterRegistration = asyncHandler(async (req, res) => {
  const result =
    await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(
      req.query,
    );
  res.status(status.OK).json({
    success: true,
    message: 'Registration Semester retrieved Successfully',
    data: result,
  });
});

const updateSemesterRegistration = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(
      id,
      req.body,
    );
  res.status(status.OK).json({
    success: true,
    message: 'Update Registration Semester Successfully',
    data: result,
  });
});

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getSingleSemesterRegistration,
  getAllSemesterRegistration,
  updateSemesterRegistration,
};

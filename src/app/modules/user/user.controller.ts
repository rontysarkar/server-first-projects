import { UserService } from './user.server';
import asyncHandler from '../../utils/asyncHandler';

const createStudent = asyncHandler(async (req, res) => {
  const { student: studentData } = req.body;
  const {password} = studentData
  const result = await UserService.createStudent(password, studentData);

  res.status(200).json({
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

const createFaculty = asyncHandler(async (req, res) => {
  const { password, faculty } = req.body;

  const result = await UserService.createFaculty(password, faculty);

  res.status(200).json({
    success: true,
    message: 'faculty is created successfully',
    data: result,
  });
});
const createAdmin = asyncHandler(async (req, res) => {
  const { password, admin } = req.body;

  const result = await UserService.createAdmin(password, admin);

  res.status(200).json({
    success: true,
    message: 'admin is created successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
};

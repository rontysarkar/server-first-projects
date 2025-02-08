import { UserService } from './user.server';
import asyncHandler from '../../utils/asyncHandler';

const createStudent = asyncHandler(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await UserService.createStudent(password, studentData);

  res.status(200).json({
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};

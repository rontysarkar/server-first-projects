import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    const result = await StudentServices.createStudent(studentData);

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllStudentData = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsData();
    res.status(200).json({
      success: true,
      message: 'student data get successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudentData = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getSingleStudentData(req.params.email);
    res.status(200).json({
      success: true,
      message: 'student single data get successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudentData,
  getSingleStudentData,
};

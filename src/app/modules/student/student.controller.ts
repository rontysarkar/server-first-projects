/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
   
    const { student: studentData } = req.body;

    // const {error,value} = studentValidationSchema.validate(studentData)
    

   const result = await StudentServices.createStudent(studentData);

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
    
  } catch (error:any) {
    res.status(500).json({
      success:false,
      message:error.message ||"something is wrong",
      error:error, 
    })
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
  } catch (error:any) {
    res.status(500).json({
      success:false,
      message:error.message ||"something is wrong",
      error:error, 
    })
  }
};

const getSingleStudentData = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getSingleStudentData(req.params.id);
    res.status(200).json({
      success: true,
      message: 'student single data get successfully',
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
      success:false,
      message:error.message ||"something is wrong",
      error:error, 
    })
  }
};


const deleteSingleStudentData = async(req:Request,res:Response) =>{

  try{
    const result = await StudentServices.deleteSingleStudentData(req.params.id)
    res.status(200).json({
      success:true,
      message:"data is update successfully",
      data:result
    })
  }catch(error:any){
    res.status(500).json({
      success:false,
      message:error.message ||"something is wrong",
      error:error, 
    })
  }
}







export const StudentControllers = {
  createStudent,
  getAllStudentData,
  getSingleStudentData,
  deleteSingleStudentData,
};

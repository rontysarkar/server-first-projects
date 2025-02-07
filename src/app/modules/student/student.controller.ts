/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';



const getAllStudentData = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentsData();
    res.status(200).json({
      success: true,
      message: 'student data get successfully',
      data: result,
    });
  } catch (err) {
    next(err)
  }
};

const getSingleStudentData = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const result = await StudentServices.getSingleStudentData(req.params.id);
    res.status(200).json({
      success: true,
      message: 'student single data get successfully',
      data: result,
    });
  } catch (err) {
    next(err)
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
  getAllStudentData,
  getSingleStudentData,
  deleteSingleStudentData,
};

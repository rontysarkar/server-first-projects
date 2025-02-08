/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {  NextFunction, Request, RequestHandler, Response,  } from 'express';
import { StudentServices } from './student.service';


const asyncHandler = (fn:RequestHandler)=>{

  return (req:Request,res:Response,next:NextFunction) =>{
    Promise.resolve(fn(req,res,next)).catch(next)
  }
}

const getAllStudentData : RequestHandler = asyncHandler(async (req, res,next) => {

    const result = await StudentServices.getAllStudentsData();
    res.status(200).json({
      success: true,
      message: 'student data get successfully',
      data: result,
    });
});

const getSingleStudentData :RequestHandler = async (req, res,next) => {
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


const deleteSingleStudentData: RequestHandler= async(req,res) =>{

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

import { Request, Response } from "express";
import { UserService } from "./user.server";


const createStudent = async (req: Request, res: Response) => {
  try {
   
    const {password , student: studentData } = req.body;

    
   const result = await UserService.createStudent(password,studentData);

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


export const UserControllers = {
    createStudent,
}
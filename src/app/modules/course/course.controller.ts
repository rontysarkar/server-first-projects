import status from "http-status";
import asyncHandler from "../../utils/asyncHandler";
import { CourseServices } from "./course.service";

const createCourse = asyncHandler(async(req,res)=>{
    const result = await CourseServices.createCourseIntoDB(req.body)
    res.status(status.OK).json({
        success:true,
        message:'Crate Course Successfully',
        data:result
    })
})

const getAllCourse = asyncHandler(async(req,res)=>{
    const result = await CourseServices.getAllCourseFromDB(req.query);
    res.status(status.OK).json({
        success:true,
        message:"Get all courses successfully",
        data:result
    })
})
const getSingleCourse = asyncHandler(async(req,res)=>{
    const result = await CourseServices.getSingleCourseFromDB(req.params.id);
    res.status(status.OK).json({
        success:true,
        message:"Get courses successfully",
        data:result
    })
})

const updateCourse = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const result = await CourseServices.updateCourseIntoDB(id,req.body);
    res.status(status.OK).json({
        success:true,
        message:" courses updated successfully",
        data:result
    })
})




const deleteCourse = asyncHandler(async(req,res)=>{
    const result = await CourseServices.deleteCourseFromDB(req.params.id);
    res.status(status.OK).json({
        success:true,
        message:"deleted courses successfully",
        data:result
    })
})
const assignFacultiesWithCourse = asyncHandler(async(req,res)=>{
    const {courseId} = req.params;
    const {faculties} = req.body;
    const result = await CourseServices.assignFacultiesWithCourseIntoDB(courseId,faculties);
    res.status(status.OK).json({
        success:true,
        message:"faculties assign  successfully",
        data:result
    })
})

const removeFacultiesFromCourse = asyncHandler(async(req,res)=>{
    const {courseId} = req.params;
    const {faculties} = req.body;
    const result = await CourseServices.removeFacultiesFromCourseFromDB(courseId,faculties);
    res.status(status.OK).json({
        success:true,
        message:"faculties remove  successfully",
        data:result
    })
})



export const CourseControllers = {
    createCourse,
    getAllCourse,
    getSingleCourse,
    updateCourse,
    deleteCourse,
    assignFacultiesWithCourse,
    removeFacultiesFromCourse,
}
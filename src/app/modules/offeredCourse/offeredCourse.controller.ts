import status from "http-status";
import asyncHandler from "../../utils/asyncHandler";
import { OfferedCourseServices } from "./offeredCourse.service";


const createOfferedCourse = asyncHandler(async(req,res) =>{
    const result = await OfferedCourseServices.createOfferedCourseIntoDB(req.body)
    res.status(status.OK).json({
        success:true,
        message:"Offered Course created successfully",
        data:result,
    })
})

const updateOfferedCourse = asyncHandler(async(req,res) =>{

    const {id} = req.params
    const result = await OfferedCourseServices.updateOfferedCourseIntoDB(id,req.body)
    res.status(status.OK).json({
        success:true,
        message:"Offered Course update successfully",
        data:result,
    })
})


export const OfferedCourseControllers = {
    createOfferedCourse,
    updateOfferedCourse,
}
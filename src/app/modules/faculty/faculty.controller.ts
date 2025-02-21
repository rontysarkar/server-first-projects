import status from "http-status";
import asyncHandler from "../../utils/asyncHandler";
import { FacultyServices } from "./faculty.service";




const getAllFacultyData = asyncHandler(async (req, res) => {
    const result = await FacultyServices.getAllFacultyData();
    res.status(200).json({
      success: true,
      message: 'Faculty data get successfully',
      data: result,
    });
  });
  
  const getSingleFacultyData = asyncHandler(async (req, res) => {
    const result = await FacultyServices.getSingleFacultyData(req.params.facultyId);
    res.status(200).json({
      success: true,
      message: 'Faculty single data get successfully',
      data: result,
    });
  });
  
  const updateFacultyData = asyncHandler(async (req, res) => {
    const { facultyId } = req.params;
    const { faculty } = req.body;
    const result = await FacultyServices.updateFacultyData(facultyId, faculty);
    res.status(status.OK).json({
      success: true,
      message: 'Update data successfully',
      data: result,
    });
  });
  
  const deleteSingleFacultyData = asyncHandler(async (req, res) => {
    const result = await FacultyServices.deleteFacultyData(req.params.id);
    res.status(200).json({
      success: true,
      message: 'data is update successfully',
      data: result,
    });
  });

  export const FacultyControllers = {
    getAllFacultyData,
    getSingleFacultyData,
    updateFacultyData,
    deleteSingleFacultyData,
  }
  

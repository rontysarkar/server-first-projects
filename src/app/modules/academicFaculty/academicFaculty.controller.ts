import status from 'http-status';
import asyncHandler from '../../utils/asyncHandler';
import { AcademicFacultyService } from './academicFaculty.service';

const createAcademicFaculty = asyncHandler(async (req, res) => {
  const result = await AcademicFacultyService.createAcademicFacultyIntoDB(
    req.body,
  );
  res.status(status.OK).json({
    success: true,
    message: 'Academic Faculty created successfully',
    data: result,
  });
});

const getAllAcademicFaculty = asyncHandler(async (req, res) => {
  const result = await AcademicFacultyService.getAllAcademicFaculty();
  res.status(status.OK).json({
    success:true,
    message:"Get all Academic Faculty Data successfully",
    data:result
  })
});

const getSingleAcademicFacultyById = asyncHandler(async(req,res)=>{
    const {facultyId} = req.params;

    const result = await AcademicFacultyService.getSingleAcademicFacultyById(facultyId);
    res.status(status.OK).json({
        success:true,
        message:"Get Academic Faculty Successfully",
        data:result
    })
})

const updateAcademicFacultyById = asyncHandler(async(req,res)=>{
    const {facultyId} = req.params;
    const updateData = req.body;
    const result = await  AcademicFacultyService.updateAcademicFacultyById(facultyId,updateData)

    res.status(status.OK).json({
        success:true,
        message:"Update Academic Faculty successfully",
        data:result,
    })
})




export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFacultyById,
  updateAcademicFacultyById,
};

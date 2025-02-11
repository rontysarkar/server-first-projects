import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";



const createAcademicFacultyIntoDB = async(payload:TAcademicFaculty)=>{
   const result = await AcademicFaculty.create(payload)
   return result
}

const getAllAcademicFaculty = async()=>{
    const result = await AcademicFaculty.find()
    return result
}

const getSingleAcademicFacultyById = async(id:string)=>{
    const result = await AcademicFaculty.findById(id)
    return result
}

const updateAcademicFacultyById = async(id:string,updateData:TAcademicFaculty) =>{
    const result = await AcademicFaculty.findByIdAndUpdate(id,updateData,{new:true})
    return result
}



export const AcademicFacultyService = {
    createAcademicFacultyIntoDB,
    getAllAcademicFaculty,
    getSingleAcademicFacultyById,
    updateAcademicFacultyById
}
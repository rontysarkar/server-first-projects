import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartment = async () => {
  const result = await AcademicDepartment.find();
  return result;
};

const getSingleAcademicDepartmentById = async (id: string) => {
  const result = await AcademicDepartment.findById(id);
  return result;
};

const updateAcademicDepartmentById = async (
  id: string,
  updateData: TAcademicDepartment,
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartment,
  getSingleAcademicDepartmentById,
  updateAcademicDepartmentById,
};

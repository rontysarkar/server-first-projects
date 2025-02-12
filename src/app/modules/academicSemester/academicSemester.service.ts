import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code');
  }

  const result = AcademicSemester.create(payload);
  return result;
};

// Get all semester

const getAllSemesterData = async () => {
  const result = AcademicSemester.find();
  return result;
};

// Get Single semester using Id

const getSingleSemesterDataById = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateSemesterDataById = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester code');
  }
  if ((payload.name && !payload.code) || (!payload.name && payload.code)) {
    throw new Error('Give Semester Name Or Semester code in together');
  }

  const result = await AcademicSemester.findOneAndUpdate({_id:id}, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllSemesterData,
  getSingleSemesterDataById,
  updateSemesterDataById,
};

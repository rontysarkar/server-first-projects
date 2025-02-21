import mongoose from 'mongoose';
import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';

const getAllFacultyData = async (query: Record<string, unknown>) => {
  const searchAbleField = ['email', 'name.firstName'];

  const facultyQuery = new QueryBuilder(
    Faculty.find().populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    }),
    query,
  )
    .search(searchAbleField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

const getSingleFacultyData = async (id: string) => {
  const result = await Faculty.findById(id).populate({
    path:'academicDepartment',
    populate:{
      path:'academicFaculty'
    }
  });
  return result;
};

const updateFacultyData = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findByIdAndUpdate(id, modifiedUpdateData, {
    new: true,
  });
  return result;
};

const deleteFacultyData = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedFacultyData = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedFacultyData) {
      throw new AppError(status.BAD_REQUEST, 'Faculty data deleted fail');
    }

    const userId = deletedFacultyData.user;

    const deletedUserData = await User.findOneAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUserData) {
      throw new AppError(status.BAD_REQUEST, 'user data deleted fail');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedUserData;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Faculty Deleted Fail');
  }
};

export const FacultyServices = {
  getAllFacultyData,
  getSingleFacultyData,
  updateFacultyData,
  deleteFacultyData,
};

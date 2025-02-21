import mongoose from "mongoose";
import { TFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model";
import AppError from "../../errors/AppError";
import status from "http-status";
import { User } from "../user/user.model";


const getAllFacultyData = async () => {
  const result = await Faculty.find();
  return result;
};

const getSingleFacultyData = async (id: string) => {
 
  const result = await Faculty.findOne({ id })
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


  const result = await Faculty.findOneAndUpdate({ id }, modifiedUpdateData, {
    new: true,
  });
  return result;
};

const deleteFacultyData = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedFacultyData = await Faculty.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedFacultyData) {
      throw new AppError(status.BAD_REQUEST, 'Faculty data deleted fail');
    }

    const deletedUserData = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUserData) {
      throw new AppError(status.BAD_REQUEST, 'user data deleted fail');
    }

    await session.commitTransaction();
    await session.endSession();

    return deleteFacultyData;
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
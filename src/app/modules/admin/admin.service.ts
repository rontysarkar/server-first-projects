/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { User } from '../user/user.model';

const getAllAdminData = async () => {
  const result = await Admin.find();
  return result;
};

const getSingleAdminData = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};

const updateAdminData = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findByIdAndUpdate(id, modifiedUpdateData, {
    new: true,
  });

  return result;
};

const deletedAdminData = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );
    if (!deletedAdmin) {
      throw new AppError(status.BAD_REQUEST, 'fail to deleted admin');
    }

    const userID = deletedAdmin.user;

    const deletedUser = await User.findOneAndUpdate(
      userID,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(status.BAD_REQUEST, 'Fail to delete User');
    }

    return deletedAdmin;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(status.BAD_REQUEST, 'Fail to delete admin data');
  }
};

export const AdminServices = {
  getAllAdminData,
  getSingleAdminData,
  updateAdminData,
  deletedAdminData,
};

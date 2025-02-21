import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';

const getAllStudentsData = async (query: Record<string, unknown>) => {
  // Raw Query >>>

  const searchAbleField = [
    'email',
    'guardian.fatherName',
    'localGuardian.guardianName',
  ];
  // let searchTerm = '';
  // const queryObjet = { ...query };

  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // const excludeField = ['searchTerm', 'sort', 'limit', 'page', 'field'];
  // excludeField.forEach((el) => delete queryObjet[el]);

  // const searchQuery = Student.find({
  //   $or: searchAbleField.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });
  // // filter query

  // const filterQuery = searchQuery
  //   .find(queryObjet)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });

  // let sort = '-createdAt';
  // if (query?.sort) {
  //   sort = query.sort as string;
  // }
  // const sortQuery = filterQuery.sort(sort);

  // // limit query & pagination
  // let limit = 1;
  // let page = 1;
  // let skip = 0;

  // if (query?.limit) {
  //   limit = Number(query.limit);
  // }

  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // const paginateQuery = sortQuery.skip(skip);

  // const limitQuery = paginateQuery.limit(limit);

  // // field limiting
  // let field = '-__v';
  // if (query.field) {
  //   field = (query.field as string).split(',').join(' ');
  // }

  // const fieldLimitingQuery = await limitQuery.select(field);

  // return fieldLimitingQuery;

  const studentQuery = new QueryBuilder(Student.find().populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    }), query)
    .search(searchAbleField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentData = async (id: string) => {
  // const result = await Student.find({ id: id });
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudentData = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdateData, {
    new: true,
  });
  return result;
};

const deleteStudentData = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudentData = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteStudentData) {
      throw new AppError(status.BAD_REQUEST, 'student data deleted fail');
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

    return deletedStudentData;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Student Deleted Fail');
  }
};

export const StudentServices = {
  getAllStudentsData,
  getSingleStudentData,
  updateStudentData,
  deleteStudentData,
};

import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicFaculty',
  },
});

academicDepartmentSchema.pre('save', async function (next) {
  const departmentIsExists = await AcademicDepartment.find({ name: this.name });
  if (departmentIsExists.length) {
    throw new Error('This Department already Exists');
  }
  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isDepartmentIsExists = await AcademicDepartment.findOne(query);
  if (!isDepartmentIsExists) {
    throw new AppError(404, 'This Department Dos not exists');
  }

  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);

/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TStudentName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  matherName: string;
  matherOccupation: string;
  matherContactNo: string;
};

export type TLocalGuardian = {
  guardianName: string;
  guardianOccupation: string;
  guardianContactNo: string;
  guardianAddress: string;
};

export type TStudent = {
  id: string;
  user:Types.ObjectId;
  password:string;
  name: TStudentName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  admissionSemester:Types.ObjectId;
  isDeleted:boolean;
  academicDepartment:Types.ObjectId;
};


export interface StudentModel extends Model<TStudent> {
  isUserExists(id:string):Promise<TStudent | null>
}



//create a instance methods

// export type StudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>;
// };
// export type StudentModel = Model<TStudent,Record<string, never>>;

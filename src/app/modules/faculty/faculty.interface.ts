import { Types } from "mongoose";

export type TFacultyName = {
    firstName: string;
    middleName: string;
    lastName: string;
  };

export type TFaculty = {
    id:string;
    user:Types.ObjectId;
    designation:string;
    name:TFacultyName;
    gender:'male' | 'female';
    dateOfBirth:string;
    email:string;
    contactNo:string;
    emergencyContactNo:string;
    bloodGroup:'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress:string;
    permanentAddress:string;
    profileImg:string;
    academicDepartment:Types.ObjectId;
    isDeleted:boolean;
}
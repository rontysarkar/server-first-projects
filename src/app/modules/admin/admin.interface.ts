import { Types } from "mongoose";

export type TAdminName = {
    firstName: string;
    middleName: string;
    lastName: string;
  };

export type TAdmin = {
    id:string;
    user:Types.ObjectId;
    designation:string;
    name:TAdminName;
    gender:'male' | 'female';
    dateOfBirth:string;
    email:string;
    contactNo:string;
    emergencyContactNo:string;
    bloodGroup:'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress:string;
    permanentAddress:string;
    profileImg:string;
    managementDepartment:string;
    isDeleted:boolean;
}
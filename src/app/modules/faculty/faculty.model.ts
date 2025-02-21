import { model, Schema } from "mongoose";
import { TFaculty, TFacultyName } from "./faculty.interface";

const nameSchema = new Schema<TFacultyName>({
    firstName:{
        type:String,
        required:[true,'First Name is required']
    },
    middleName:{
        type:String,
    },
    lastName:{
        type:String,
        required:[true,'Last name is required']
    }
})

const facultySchema = new Schema<TFaculty>({
    id: {
        type: String,
        required: [true, 'ID is required'],
        unique:true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique:true,
        required: [true, 'User reference is required']
    },
    designation: {
        type: String,
        required: [true, 'Designation is required']
    },
    name: {
        type: nameSchema, // You should define a separate schema for TFacultyName
        required: [true, 'Name is required']
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: [true, 'Gender is required']
    },
    dateOfBirth: {
        type: String,
        required: [true, 'Date of Birth is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    contactNo: {
        type: String,
        required: [true, 'Contact Number is required']
    },
    emergencyContactNo: {
        type: String,
        required: [true, 'Emergency Contact Number is required']
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: [true, 'Blood Group is required']
    },
    presentAddress: {
        type: String,
        required: [true, 'Present Address is required']
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent Address is required']
    },
    profileImg: {
        type: String,
        required: [true, 'Profile Image is required']
    },
    academicDepartment: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
    },
    isDeleted: {
        type: Boolean,
        default: false,
      },
},{timestamps:true})

export const Faculty = model<TFaculty>('Faculty',facultySchema)


import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  studentName,
} from './student/student.interface';

const nameSchema = new Schema<studentName>({
  firstName: { 
    type: String,
    trim:true, 
    required: [true, "First name is required."],
  },
  middleName: { 
    type: String 
  },
  lastName: { 
    type: String, 
    required: [true, "Last name is required."] 
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { 
    type: String, 
    required: [true, "Father's name is required."] 
  },
  fatherOccupation: { 
    type: String, 
    required: [true, "Father's occupation is required."] 
  },
  fatherContactNo: { 
    type: String, 
    required: [true, "Father's contact number is required."] 
  },
  matherName: { 
    type: String, 
  },
  matherOccupation: { 
    type: String, 
    required: [true, "Mother's occupation is required."] 
  },
  matherContactNo: { 
    type: String, 
    required: [true, "Mother's contact number is required."] 
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  guardianName: { 
    type: String, 
    required: [true, "Local guardian's name is required."] 
  },
  guardianOccupation: { 
    type: String, 
    required: [true, "Local guardian's occupation is required."] 
  },
  guardianContactNo: { 
    type: String, 
    required: [true, "Local guardian's contact number is required."] 
  },
  guardianAddress: { 
    type: String, 
    required: [true, "Local guardian's address is required."] 
  },
});

const studentSchema = new Schema<Student>({
  id: {
    type: String,
    required: [true, "Student ID is required."],
  },
  name: {
    type: nameSchema,
    required: [true, "Student's name is required."],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: "Gender must be 'male', 'female', or 'other'.",
    },
    required: [true, "Gender is required."],
  },
  dateOfBirth: { 
    type: String, 
    required: [true, "Date of birth is required."] 
  },
  email: { 
    type: String, 
    required: [true, "Email address is required."], 
    unique: true,
  },
  contactNo: { 
    type: String, 
    required: [true, "Contact number is required."] 
  },
  emergencyContactNo: { 
    type: String, 
    required: [true, "Emergency contact number is required."] 
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: "Blood group must be one of 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', or 'O-'.",
    },
  },
  presentAddress: { 
    type: String, 
    required: [true, "Present address is required."] 
  },
  permanentAddress: { 
    type: String, 
    required: [true, "Permanent address is required."] 
  },
  guardian: { 
    type: guardianSchema, 
    required: [true, "Guardian information is required."] 
  },
  localGuardian: { 
    type: localGuardianSchema, 
    required: [true, "Local guardian information is required."] 
  },
  profileImg: { 
    type: String 
  },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      message: "Status must be 'active' or 'blocked'.",
    },
    default: "active",
  },
});


export const StudentModel = model<Student>('Student', studentSchema);

import { Schema, model } from 'mongoose';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TStudentName,
} from './student/student.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const nameSchema = new Schema<TStudentName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name is required.'],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required."],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required."],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required."],
  },
  matherName: {
    type: String,
  },
  matherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required."],
  },
  matherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required."],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  guardianName: {
    type: String,
    required: [true, "Local guardian's name is required."],
  },
  guardianOccupation: {
    type: String,
    required: [true, "Local guardian's occupation is required."],
  },
  guardianContactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required."],
  },
  guardianAddress: {
    type: String,
    required: [true, "Local guardian's address is required."],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: [true, 'Student ID is required.'],
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
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
    required: [true, 'Gender is required.'],
  },
  dateOfBirth: {
    type: String,
    required: [true, 'Date of birth is required.'],
  },
  email: {
    type: String,
    required: [true, 'Email address is required.'],
    unique: true,
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required.'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required.'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message:
        "Blood group must be one of 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', or 'O-'.",
    },
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required.'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required.'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian information is required.'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian information is required.'],
  },
  profileImg: {
    type: String,
  },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      message: "Status must be 'active' or 'blocked'.",
    },
    default: 'active',
  },
  isDeleted:{
    type:Boolean,
    default:false
  }
});

studentSchema.pre('save',async function (next) {
  this.password = await bcrypt.hash(this.password,Number(config.bcrypt_salt_rounds))
  next();
});

studentSchema.post('save', function(doc,next){
  doc.password = " ";
  next()
})

// query meddle ware

studentSchema.pre('find', function(next){
  this.find({isDeleted:{$ne :true}})
  next()
})

studentSchema.pre('aggregate', function(next){
  this.pipeline().unshift({$match:{isDeleted :{$ne : true}}})
  next()
})



studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

//create a instance methods

// studentSchema.methods.isUserExists = async function(id:string){
//   const existingUser = await Student.findOne({id});

//   return existingUser
// }
const a = 10 ; // practise perpose
console.log(a);

export const Student = model<TStudent, StudentModel>('Student', studentSchema);

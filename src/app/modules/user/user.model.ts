import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser,UserModel>(
  {
    id: { type: String, required: true,unique:true, },
    password: { type: String,select:0 },
    needsPasswordChange: { type: Boolean,default:true },
    passwordChangeAt:{
      type:Date,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = ' ';
  next();
});

userSchema.statics.isUserExistByCustomId = async function(id:string){
  return await User.findOne({id}).select('+password')
}

userSchema.statics.isPasswordMatch = async function(password:string,hashPassword:string){
  return await bcrypt.compare(password,hashPassword)
} 

userSchema.statics.isJwtIssuedBeforePasswordChange = function(passwordChangeTimestamp:Date,jwtIssuedTimestamp:number){
  const passwordChangeTime = new Date(passwordChangeTimestamp).getTime()/1000
  return passwordChangeTime >jwtIssuedTimestamp ;
}

export const User = model<TUser,UserModel>('User', userSchema);

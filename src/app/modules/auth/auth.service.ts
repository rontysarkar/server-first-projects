import status from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TChangePassword, TLoginUser } from "./auth.interface";
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../../config";

const loginUser = async(payload:TLoginUser)=>{
    // check user is exist 
    
    const isUserExist = await User.isUserExistByCustomId(payload.id)
    
    if(!isUserExist){
       throw new AppError(status.NOT_FOUND,"User not found")
    }

    // check user is deleted 
    const isDeleted = isUserExist?.isDeleted
    if(isDeleted){
        throw new AppError(status.FORBIDDEN,"User is deleted")
    }

    // check user is blocked
    const userStatus = isUserExist?.status
    if(userStatus === "blocked"){
        throw new AppError(status.FORBIDDEN,"User is Blocked")
    }

    // checking password is correct 
    const passwordMatch = await User.isPasswordMatch(payload.password,isUserExist?.password)

    if(!passwordMatch){
        throw new AppError(status.FORBIDDEN,"Password is incorrect")
    }
  
    // create access token and send to client 

    const jwtPayload = {
        userId:isUserExist?.id,
        role:isUserExist?.role,
    }

    const accessToken = jwt.sign(
        jwtPayload
      , config.jwt_access_secret as string, { expiresIn: "10d" });



    return {
        accessToken,
        needsPasswordChange:isUserExist?.needsPasswordChange
    };
}



const changePassword = async(reqUser:JwtPayload,payload:TChangePassword)=>{
    console.log(reqUser,payload);

    const user = await User.isUserExistByCustomId(reqUser.userId)
    console.log({user});

    if(!user){
        throw new AppError(status.NOT_FOUND,"User not found")
    }

    // check user is deleted
    const isDeleted = user?.isDeleted
    if(isDeleted){
        throw new AppError(status.FORBIDDEN,"User is Deleted ")
    }

    // check user is blocked
    if(user?.status === 'blocked'){
        throw new AppError(status.FORBIDDEN,"User is blocked")
    }

    // check olg password match 
    const passwordMatch = await User.isPasswordMatch(payload.oldPassword,user?.password)
    if(!passwordMatch){
        throw new AppError(status.FORBIDDEN,"old password is incorrect")
    }

}

export const AuthServices = {
    loginUser,
    changePassword
}
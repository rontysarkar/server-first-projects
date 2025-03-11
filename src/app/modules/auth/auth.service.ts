import status from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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

    const passwordMatch = await bcrypt.compare(payload.password,isUserExist?.password)
    if(!passwordMatch){
        throw new AppError(status.FORBIDDEN,"Password is incorrect")
    }
  
    // create access token and send to client 

    const jwtPayload = {
        userId:isUserExist?.id,
        role:isUserExist?.role,
    }

    const accessToken = jwt.sign({
        jwtPayload
      }, config.jwt_access_secret as string, { expiresIn: "10d" });



    return {
        accessToken,
        needsPasswordChange:isUserExist?.needsPasswordChange
    };
}

export const AuthServices = {
    loginUser,
}
import status from "http-status";
import asyncHandler from "../../utils/asyncHandler";
import { AuthServices } from "./auth.service";

const loginUser = asyncHandler(async(req,res)=>{
    const result = await AuthServices.loginUser(req.body)
    
    res.status(status.OK).json({
        success:true,
        message:"login Successfully",
        data:result,

    })
})

export const AuthControllers = {
    loginUser
}
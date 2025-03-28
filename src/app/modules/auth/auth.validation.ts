import { z } from "zod";

const loginValidationSchema = z.object({
    body:z.object({
        id:z.string({required_error:"Id is Required"}),
        password:z.string({required_error:"Password is required"})
    })
})

const changePasswordValidationSchema = z.object({
    body:z.object({
        oldPassword:z.string({required_error:"old password is Required"}),
        newPassword:z.string({required_error:"New password is required"})
    })
})

const refreshTokenValidationSchema = z.object({
    cookies:z.object({
        refreshToken:z.string({
            required_error:"Refresh token is required"
        })
    })
})

export const AuthValidation = {
    loginValidationSchema,
    changePasswordValidationSchema,
    refreshTokenValidationSchema
}
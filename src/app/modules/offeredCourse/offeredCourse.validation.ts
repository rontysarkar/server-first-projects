import { z } from "zod";
const Days = ["Sat","Sun","Mon","Tue","Wed","Thu","Fri"]
const createOfferedCourseValidationSchema = z.object({
    body:z.object({
        semesterRegistration:z.string(),
            academicFaculty:z.string(),
            academicDepartment:z.string(),
            faculty:z.string(),
            maxCapacity:z.number(),
            section:z.number(),
            days:z.array(z.enum([...Days] as [string,...string[]])),
            startTime:z.string(),
            endTime:z.string(),
    })
})


const updateOfferedCourseValidationSchema = z.object({
    body:z.object({
            maxCapacity:z.number().optional(),
            section:z.number().optional(),
            days:z.enum([...Days] as [string,...string[]]).optional(),
            startTime:z.string().optional(),
            endTime:z.string().optional(),
    })
})


export const OfferedCourseValidations = {
    createOfferedCourseValidationSchema,
    updateOfferedCourseValidationSchema
}
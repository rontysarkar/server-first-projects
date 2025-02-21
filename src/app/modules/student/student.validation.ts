import { z } from 'zod';

const nameValidationSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
});

const guardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  matherOccupation: z.string(),
  matherContactNo: z.string(),
});

const localGuardianValidationSchema = z.object({
  guardianName: z.string(),
  guardianOccupation: z.string(),
  guardianContactNo: z.string(),
  guardianAddress: z.string(),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      password: z.string(),
      name: nameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string().url(),
      admissionSemester:z.string(),
      academicDepartment:z.string(),
    }),
  }),
});

const updateNameValidationSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  matherOccupation: z.string().optional(),
  matherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  guardianName: z.string().optional(),
  guardianOccupation: z.string().optional(),
  guardianContactNo: z.string().optional(),
  guardianAddress: z.string().optional(),
});


const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      password: z.string().optional(),
      name: updateNameValidationSchema.optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
          message: 'Invalid date format',
        })
        .optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      profileImg: z.string().url().optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const StudentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};

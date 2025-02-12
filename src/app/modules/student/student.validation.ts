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
      dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
      }),
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

export const StudentValidations = {
  createStudentValidationSchema,
};

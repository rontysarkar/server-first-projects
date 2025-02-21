import { z } from 'zod';

const nameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string().optional(),
  lastName: z.string(),
});

const createFacultyValidationSchema = z.object({
  body: z.object({
    faculty: z.object({
      designation: z.string(),
      name: nameValidationSchema,
      gender: z.enum(['male', 'female']),
      dateOfBirth: z.string(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImg: z.string().url(),
      academicDepartment: z.string(),
    }),
  }),
});

const updateNameValidationSchema = z
  .object({
    firstName: z
      .string()
      .min(1)
      .max(20)
      .refine((value) => /^[A-Z]/.test(value), {
        message: 'First Name must start with a capital letter',
      }),
    middleName: z.string().optional(),
    lastName: z.string(),
  })
  .partial();

const updateFacultyValidationSchema = z
  .object({
    id: z.string(),
    designation: z.string(),
    name: updateNameValidationSchema,
    gender: z.enum(['male', 'female']),
    dateOfBirth: z.string(),
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    profileImg: z.string().url(),
    academicDepartment: z.string(),
  })
  .partial();

export const FacultyValidations = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};

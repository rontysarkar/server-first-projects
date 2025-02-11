import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name must be a string',
      required_error:"Name is require"
    }),
    academicFaculty:z.string({
        invalid_type_error:"Academic Faculty must be string",
        required_error:"Academic faculty is required"
    })
  }),
});
const updateAcademicDepartmentValidationSchema =z.object({
    body: z.object({
      name: z.string({
        invalid_type_error: 'Name must be a string',
        required_error:"Name is require"
      }).optional(),
      academicFaculty:z.string({
          invalid_type_error:"Academic Faculty must be string",
          required_error:"Academic faculty is required"
      }).optional()
    }),
  });

export const academicDepartmentValidation = {
 createAcademicDepartmentValidationSchema,
updateAcademicDepartmentValidationSchema,
};

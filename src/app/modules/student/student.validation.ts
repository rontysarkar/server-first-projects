import Joi from 'joi';

// Name Validation Schema
const nameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .regex(/^[A-Z][a-z]*$/)
    .required()
    .messages({
      "string.pattern.base": "First name must start with an uppercase letter followed by lowercase letters.",
      "any.required": "First name is required.",
    }),
  middleName: Joi.string().allow(null, ''),
  lastName: Joi.string().required().messages({
    "any.required": "Last name is required.",
  }),
});

// Guardian Validation Schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    "any.required": "Father's name is required.",
  }),
  fatherOccupation: Joi.string().required().messages({
    "any.required": "Father's occupation is required.",
  }),
  fatherContactNo: Joi.string().required().messages({
    "any.required": "Father's contact number is required.",
  }),
  motherName: Joi.string().required().messages({
    "any.required": "Mother's name is required.",
  }),
  matherOccupation: Joi.string().required().messages({
    "any.required": "Mother's occupation is required.",
  }),
  matherContactNo: Joi.string().required().messages({
    "any.required": "Mother's contact number is required.",
  }),
});

// Local Guardian Validation Schema
const localGuardianValidationSchema = Joi.object({
  guardianName: Joi.string().required().messages({
    "any.required": "Local guardian's name is required.",
  }),
  guardianOccupation: Joi.string().required().messages({
    "any.required": "Local guardian's occupation is required.",
  }),
  guardianContactNo: Joi.string().required().messages({
    "any.required": "Local guardian's contact number is required.",
  }),
  guardianAddress: Joi.string().required().messages({
    "any.required": "Local guardian's address is required.",
  }),
});

// Student Validation Schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Student ID is required.",
  }),
  name: nameValidationSchema.required().messages({
    "any.required": "Student's name is required.",
  }),
  gender: Joi.string()
    .valid('male', 'female', 'other')
    .required()
    .messages({
      "any.only": "Gender must be 'male', 'female', or 'other'.",
      "any.required": "Gender is required.",
    }),
  dateOfBirth: Joi.string().required().messages({
    "any.required": "Date of birth is required.",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email address is required.",
    "string.email": "Email must be a valid email address.",
  }),
  contactNo: Joi.string().required().messages({
    "any.required": "Contact number is required.",
  }),
  emergencyContactNo: Joi.string().required().messages({
    "any.required": "Emergency contact number is required.",
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .messages({
      "any.only": "Blood group must be one of 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', or 'O-'.",
    }),
  presentAddress: Joi.string().required().messages({
    "any.required": "Present address is required.",
  }),
  permanentAddress: Joi.string().required().messages({
    "any.required": "Permanent address is required.",
  }),
  guardian: guardianValidationSchema.required().messages({
    "any.required": "Guardian information is required.",
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    "any.required": "Local guardian information is required.",
  }),
  profileImg: Joi.string().uri().allow(null, ''),
  isActive: Joi.string()
    .valid('active', 'blocked')
    .default('active')
    .messages({
      "any.only": "Status must be 'active' or 'blocked'.",
    }),
});

export { studentValidationSchema };

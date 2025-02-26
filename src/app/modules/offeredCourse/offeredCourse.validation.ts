import { z } from 'zod';
const Days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: z.string().refine(
        (time) => {
          const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
          return timeRegex.test(time);
        },
        {
          message: "Invalid time format, expected 'HH:MM' in 24 hours ",
        },
      ),
      endTime: z.string().refine(
        (time) => {
          const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
          return timeRegex.test(time);
        },
        {
          message: "Invalid time format, expected 'HH:MM' in 24 hours ",
        },
      ),
    })
    .refine((body) => {
      const start = new Date(`2006-01-01T${body.startTime}:00`);
      const end = new Date(`2006-01-01T${body.endTime}:00`);

      return end > start;
    },{
        message:"Start time should be before end time"
    }),
});

const updateOfferedCourseValidationSchema = z.object({
  body: z.object({
    maxCapacity: z.number().optional(),
    section: z.number().optional(),
    days: z.enum([...Days] as [string, ...string[]]).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};

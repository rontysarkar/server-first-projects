import { z } from 'zod';
const Days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const timeFormatValidation = z.string().refine(
  (time) => {
    const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    return timeRegex.test(time);
  },
  {
    message: "Invalid time format, expected 'HH:MM' in 24 hours ",
  },
)

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
      startTime:timeFormatValidation,
      endTime: timeFormatValidation,
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
    faculty: z.string(),
    maxCapacity: z.number(),
    days: z.array(z.enum([...Days] as [string, ...string[]])),
    startTime: timeFormatValidation,
    endTime: timeFormatValidation,
  }).refine((body) => {
    const start = new Date(`2006-01-01T${body.startTime}:00`);
    const end = new Date(`2006-01-01T${body.endTime}:00`);

    return end > start;
  },{
      message:"Start time should be before end time"
  }),
});

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};

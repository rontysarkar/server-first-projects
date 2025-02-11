import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

router.get('/', AcademicSemesterControllers.getAllSemesterData);
router.get('/:id', AcademicSemesterControllers.getSingleSemesterData);
router.patch('/:id',validateRequest(AcademicSemesterValidations.updateAcademicSemesterValidationSchema) ,AcademicSemesterControllers.updateSemesterDataById);

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

export const AcademicSemesterRouter = router;

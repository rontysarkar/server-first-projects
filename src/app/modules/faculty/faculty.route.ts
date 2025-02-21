import express from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidations } from './faculty.validation';

const router = express.Router();

router.get('/', FacultyControllers.getAllFacultyData);
router.get('/:id', FacultyControllers.getSingleFacultyData);
router.patch(
  '/:id',
  validateRequest(FacultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateFacultyData,
);
router.delete('/:id', FacultyControllers.deleteSingleFacultyData);

export const FacultyRoutes = router;

import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidations } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getAllStudentData);
router.get('/:id', StudentControllers.getSingleStudentData);
router.patch(
  '/:id',
  validateRequest(StudentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudentData,
);
router.delete('/:id', StudentControllers.deleteSingleStudentData);

export const StudentRoutes = router;

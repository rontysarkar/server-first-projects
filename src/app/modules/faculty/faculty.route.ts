import express from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidations } from './faculty.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/',auth(USER_ROLE.admin,USER_ROLE.faculty), FacultyControllers.getAllFacultyData);
router.get('/:id', FacultyControllers.getSingleFacultyData);
router.patch(
  '/:id',
  validateRequest(FacultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateFacultyData,
);
router.delete('/:id', FacultyControllers.deleteSingleFacultyData);

export const FacultyRoutes = router;

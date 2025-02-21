import express from 'express'
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidations } from './faculty.validation';


const router = express.Router();

router.get('/',FacultyControllers.getAllFacultyData);
router.get('/:facultyId',FacultyControllers.getSingleFacultyData);
router.patch('/:facultyId',validateRequest(FacultyValidations.updateFacultyValidationSchema),FacultyControllers.updateFacultyData);
router.delete('/:facultyId',FacultyControllers.deleteSingleFacultyData)

export const FacultyRoutes =  router;
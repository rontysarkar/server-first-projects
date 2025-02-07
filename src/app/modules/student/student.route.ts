import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

router.get('/', StudentControllers.getAllStudentData);
router.get('/:id', StudentControllers.getSingleStudentData);
router.delete('/:id',StudentControllers.deleteSingleStudentData)

export const StudentRoutes = router;

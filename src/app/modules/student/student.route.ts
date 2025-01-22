import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

router.post('/create-student', StudentControllers.createStudent);
router.get('/', StudentControllers.getAllStudentData);
router.get('/:id', StudentControllers.getSingleStudentData);
router.delete('/:id',StudentControllers.deleteSingleStudentData)

export const StudentRoutes = router;

import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { OfferedCourseValidations } from './offeredCourse.validation'
import { OfferedCourseControllers } from './offeredCourse.controller'

const router = express.Router()

router.post('/create-offered-course',validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),OfferedCourseControllers.createOfferedCourse)
router.patch('/:id',validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),OfferedCourseControllers.updateOfferedCourse)

export const OfferedCourseRoutes = router;
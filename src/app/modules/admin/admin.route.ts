import express from 'express'
import { AdminControllers } from './admin.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AdminValidations } from './admin.validation'

const router = express.Router()

router.get('/',AdminControllers.getAllAdminData)
router.get('/:adminId',AdminControllers.getSingleAdminData)
router.patch('/:adminId',validateRequest(AdminValidations.updateAdminValidationSchema),AdminControllers.updateAdminData)
router.delete('/:adminId',AdminControllers.deletedAdminData)

export const AdminRoutes = router;
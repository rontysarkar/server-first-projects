import express from 'express'
import { AdminControllers } from './admin.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AdminValidations } from './admin.validation'

const router = express.Router()

router.get('/',AdminControllers.getAllAdminData)
router.get('/:id',AdminControllers.getSingleAdminData)
router.patch('/:id',validateRequest(AdminValidations.updateAdminValidationSchema),AdminControllers.updateAdminData)
router.delete('/:id',AdminControllers.deletedAdminData)

export const AdminRoutes = router;
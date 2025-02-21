import status from 'http-status';
import asyncHandler from '../../utils/asyncHandler';
import { AdminServices } from './admin.service';

const getAllAdminData = asyncHandler(async (req, res) => {
  const result = await AdminServices.getAllAdminData();
  res.status(status.OK).json({
    success: true,
    message: 'Admin data get successfully',
    data: result,
  });
});

const getSingleAdminData = asyncHandler(async (req, res) => {
  const { adminId } = req.params;
  const result = await AdminServices.getSingleAdminData(adminId);
  res.status(status.OK).json({
    success: true,
    message: 'Admin data get successfully',
    data: result,
  });
});

const updateAdminData = asyncHandler(async(req,res)=>{
    const {adminId} = req.params;
    const adminData = req.body;

    const result = await AdminServices.updateAdminData(adminId,adminData);
    res.status(status.OK).json({
        success:true,
        message:"Admin data get successfully",
        data:result,
    })
})

const deletedAdminData = asyncHandler(async(req,res)=>{

    const {adminId} = req.params;

    const result = await AdminServices.deletedAdminData(adminId)
    res.status(status.OK).json({
        success:true,
        message:"Admin data get successfully",
        data:result,
    })
})

export const AdminControllers = {
    getAllAdminData,
    getSingleAdminData,
    updateAdminData,
    deletedAdminData,
}

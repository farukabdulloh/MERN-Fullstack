import { Router } from 'express';
import { getEmployees, createEmployees, updateEmployees, deleteEmployees } from '../controller/employeeController.js';
import { protect, protectAdmin } from '../middleware/auth.js';
import multer from 'multer';

const upload = multer({
    dest: "uploads/"
})
const employeesRouter = Router();

employeesRouter.get('/', protect, protectAdmin, getEmployees)
employeesRouter.post('/', protect, protectAdmin, upload.single("profileImage"), createEmployees)
employeesRouter.put(
    '/:id',
    protect,
    protectAdmin,
    upload.single("profileImage"),
    updateEmployees
)
employeesRouter.delete('/:id', protect, protectAdmin, deleteEmployees)

export default employeesRouter;
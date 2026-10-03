import { Router } from 'express';
import {
    getEmployees,
    createEmployees,
    updateEmployees,
    deleteEmployees,
    restoreEmployee,
    permanentDeleteEmployee
} from '../controller/employeeController.js';
import { protect, protectAdmin } from '../middleware/auth.js';
import multer from 'multer';

const upload = multer({
    dest: "/tmp/uploads/"
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
employeesRouter.patch('/:id/restore', protect, protectAdmin, restoreEmployee)
employeesRouter.delete(
    '/:id/permanent',
    protect,
    protectAdmin,
    permanentDeleteEmployee
);

export default employeesRouter;
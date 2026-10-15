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
import fs from 'fs';
import path from 'path';

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads', { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });
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
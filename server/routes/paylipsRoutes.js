import { Router } from 'express';
import { createPayslips, getPayslips, getPayslipsById } from '../controller/paylipsController.js';
import { protect, protectAdmin } from '../middleware/auth.js';

const payslipsRouter = Router();

payslipsRouter.post('/', protect, protectAdmin, createPayslips)
payslipsRouter.get('/', protect, getPayslips)
payslipsRouter.get('/:id', protect, getPayslipsById)

export default payslipsRouter;
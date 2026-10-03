import { Router } from 'express';
import { createLeave, getLeave, updateLeave } from '../controller/leaveController.js';
import { protect, protectAdmin } from '../middleware/auth.js';

const leaveRouter = Router();

leaveRouter.post('/', protect, createLeave)
leaveRouter.get('/', protect, getLeave)
leaveRouter.patch('/:id', protect, protectAdmin, updateLeave)

export default leaveRouter;
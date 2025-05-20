import { Router } from 'express';
import patientRoutes from './patientRoutes';
import appointmentRoutes from './appointmentRoutes'
import authRoutes from './authRoutes';
import { authenticate } from '../middlewares/authMiddleware';
const router = Router();


router.use('/auth', authRoutes);

router.use('/patients', authenticate, patientRoutes);
router.use('/appointments', authenticate, appointmentRoutes);


export default router;
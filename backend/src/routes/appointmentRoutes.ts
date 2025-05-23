import { Router } from 'express';
import {
  createAppointment,
  getAppointmentById,
  deleteAppointment,
  updateAppointment,
  getAppointments,
} from '../controllers/appointmentController';

const router = Router();

router.get('/', getAppointments);
router.get('/:id', getAppointmentById);
router.post('/', createAppointment);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

export default router;

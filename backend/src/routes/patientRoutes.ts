import { Router } from 'express';
import {
  getPatients,
  getPatientById,
  createPacient,
  updatePacient,
  deletePacient,
} from '../controllers/patientController';

const router = Router();

router.get('/', getPatients);
router.get('/:id', getPatientById);
router.post('/', createPacient);
router.put('/:id', updatePacient);
router.delete('/:id', deletePacient);

export default router;

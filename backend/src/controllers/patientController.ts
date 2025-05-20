import { Request, Response } from 'express';
import Patient from '../models/Patient';


export const getPatients = async (req: Request, res: Response) => {
    try {
    const patients = await Patient.find();
    res.json(patients)
    return
    } catch (error) {
        res.status(500).json({ error: 'Server Error'})
    }
}

export const getPatientById = async (req: Request, res: Response) => {
    try {
    const patient = await Patient.findById(req.params.id);
    if(!patient) res.status(404).json({ error: 'Not Found'});
    res.json(patient);
    } catch (error) {
      res.status(500).json({ error: 'Server Error'})
    }
}

export const createPacient = async (req: Request, res: Response) => {
  try {
    const Pacient = new Patient(req.body);
    await Pacient.save();
    res.status(201).json(Pacient);
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: 'Invalid data' });
  }
};

export const updatePacient = async (req: Request, res: Response) => {
  try {
    const Pacient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!Pacient) res.status(404).json({ error: 'Not found' });
    res.json(Pacient);
  } catch (err) {
    res.status(400).json({ error: 'Invalid update' });
  }
};

export const deletePacient = async (req: Request, res: Response) => {
  try {
    const Pacient = await Patient.findByIdAndDelete(req.params.id);
    if (!Pacient) res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
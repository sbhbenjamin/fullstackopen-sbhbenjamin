/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import { Entry } from '../types';
import toNewPatient, { parseEntry } from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/:id', (req, res) => {
  const id: string = req.params.id;
  const patient = patientService.getNonSensitivePatient(id);
  if (!patient) {
    res.status(404).send('patient not found.');
  } else {
    res.send(patient);
  }
});

patientsRouter.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

patientsRouter.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

patientsRouter.post('/:id/entries', (req, res) => {
  try {
    const patientId: string = req.params.id;
    const newEntry: Entry = parseEntry(req.body);
    const addedEntry = patientService.addEntry(patientId, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientsRouter;

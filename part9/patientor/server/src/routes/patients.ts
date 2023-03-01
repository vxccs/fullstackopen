import express from 'express';
import patientService from '../services/patientService';
import { EntryWithoutId } from '../types';
import utils from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.json(patientService.getSensitiveEntries());
});

patientsRouter.post('/', (req, res) => {
  try {
    const newPatientEntry = utils.toNewPatientEntry(req.body);
    const addedPatient = patientService.addEntry(newPatientEntry);
    res.json(addedPatient);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

patientsRouter.get('/:id', (req, res) => {
  try {
    const patient = patientService
      .getSensitiveEntries()
      .find((p) => p.id === req.params.id);
    if (!patient) throw new Error('patient not found');

    res.json(patient);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

patientsRouter.post('/:id/entries/', (req, res) => {
  try {
    const newEntry = utils.toNewEntry(req.body);
    const addedPatient = patientService.addNewPatientEntry(
      req.params.id,
      newEntry as EntryWithoutId
    );
    res.json(addedPatient);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientsRouter;

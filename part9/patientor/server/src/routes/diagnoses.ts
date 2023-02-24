import express from 'express';
import { Diagnose } from '../../types';
import diagnoseService from '../services/diagnoseService';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
  const diagnoses: Diagnose[] = diagnoseService.getEntries();
  res.json({ diagnoses });
});

export default diagnosesRouter;

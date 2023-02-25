import patientsData from '../../data/patientsData';
import { Patient, PatientEntry, PatientNoSSN } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): PatientNoSSN[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addEntry = (entry: PatientEntry): Patient => {
  const newEntry = { id: uuid(), ...entry };

  patientsData.push(newEntry);
  return newEntry;
};

export default { getEntries, addEntry };

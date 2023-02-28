import patientsData from '../../data/patientsData';
import { Patient, PatientEntry, NonSensitivePatient } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getSensitiveEntries = (): Patient[] => {
  return patientsData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries, ssn }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries: entries || [],
      ssn,
    })
  );
};

const addEntry = (entry: PatientEntry): Patient => {
  const newEntry = { id: uuid(), ...entry };

  patientsData.push(newEntry);
  return newEntry;
};

export default { getEntries, addEntry, getSensitiveEntries };

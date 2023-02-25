import patientsData from '../../data/patientsData';
import { PatientNoSSN } from '../types';

const getEntries = (): PatientNoSSN[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default { getEntries };

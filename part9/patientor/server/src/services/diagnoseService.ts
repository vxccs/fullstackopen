import diagnosesData from '../../data/diagnosesData';
import { Diagnose } from '../../types';

const diagnoses: Diagnose[] = diagnosesData;

const getEntries = (): Diagnose[] => {
  return diagnoses;
};

export default { getEntries };

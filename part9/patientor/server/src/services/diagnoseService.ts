import diagnosesData from '../../data/diagnosesData';
import { Diagnose } from '../types';

const getEntries = (): Diagnose[] => {
  return diagnosesData;
};

export default { getEntries };

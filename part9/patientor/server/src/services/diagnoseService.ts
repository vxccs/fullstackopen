import diagnosesData from '../../data/diagnosesData';
import { Diagnosis } from '../types';

const getEntries = (): Diagnosis[] => {
  return diagnosesData;
};

export default { getEntries };

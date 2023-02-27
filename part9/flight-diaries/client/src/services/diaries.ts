import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';

const getAll = async () => {
  const { data } = await axios.get<NonSensitiveDiaryEntry[]>(
    `${apiBaseUrl}/diaries`
  );
  return data;
};

const addEntry = async (entry: NewDiaryEntry) => {
  const { data } = await axios.post<DiaryEntry>(`${apiBaseUrl}/diaries`, entry);
  return data;
};

export default { getAll, addEntry };

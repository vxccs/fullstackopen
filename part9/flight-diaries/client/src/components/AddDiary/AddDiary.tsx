import { NonSensitiveDiaryEntry, NewDiaryEntry } from '../../types';
import DiaryForm from '../AddDiary/DiaryForm';
import diariesService from '../../services/diaries';
import { useState } from 'react';
import axios from 'axios';

const AddDiary = ({
  diaries,
  setDiaries,
}: {
  diaries: NonSensitiveDiaryEntry[];
  setDiaries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>;
}) => {
  const [error, setError] = useState('');

  const addDiary = (diary: NewDiaryEntry) => {
    diariesService
      .addEntry(diary)
      .then((data) => setDiaries([...diaries, data]))
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === 'string') {
            const message = e.response.data.replace(
              'Something went wrong. Error: ',
              ''
            );
            console.error(message);
            showError(message);
          } else {
            showError('Unrecognized axios error');
          }
        } else {
          console.error('Unknown error', e);
          showError('Unknown error');
        }
      });
  };

  const showError = (e: string) => {
    setError(e);
    setTimeout(() => setError(''), 5000);
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Add new entry</h2>
      <DiaryForm addDiary={addDiary} />
    </div>
  );
};

export default AddDiary;

import { useEffect, useState } from 'react';
import AddDiary from './components/AddDiary/AddDiary';
import DiaryList from './components/DiaryList/DiaryList';
import diariesService from './services/diaries';
import { NonSensitiveDiaryEntry } from './types';

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    diariesService
      .getAll()
      .then((data) => setDiaries(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <AddDiary diaries={diaries} setDiaries={setDiaries} />
      <DiaryList diaries={diaries} />
    </div>
  );
}

export default App;

import { Fragment, useState } from 'react';
import { NewDiaryEntry, Visibility, Weather } from '../../types';

interface VisibilityOption {
  value: Visibility;
  label: string;
}
interface WeatherOption {
  value: Weather;
  label: string;
}

const visibilityOptions: VisibilityOption[] = Object.values(Visibility).map(
  (v) => ({ value: v, label: v.toString() })
);
const weatherOptions: WeatherOption[] = Object.values(Weather).map((v) => ({
  value: v,
  label: v.toString(),
}));

const DiaryForm = ({
  addDiary,
}: {
  addDiary: (diary: NewDiaryEntry) => void;
}) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [comment, setComment] = useState('');

  const submitDiary = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newDiary: NewDiaryEntry = {
      date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment,
    };

    addDiary(newDiary);
    setDate('');
    setVisibility(null);
    setWeather(null);
    setComment('');
  };

  return (
    <div>
      <form onSubmit={submitDiary}>
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span>visibility</span>
          {visibilityOptions.map((option) => (
            <Fragment key={option.label}>
              {option.label}{' '}
              <input
                type="radio"
                name="visibility"
                value={option.label}
                onChange={() => setVisibility(option.value)}
              />
            </Fragment>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span>weather</span>
          {weatherOptions.map((option) => (
            <Fragment key={option.label}>
              {option.label}{' '}
              <input
                type="radio"
                name="weather"
                value={option.label}
                onChange={() => setWeather(option.value)}
              />
            </Fragment>
          ))}
        </div>
        <div>
          comment
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};
export default DiaryForm;

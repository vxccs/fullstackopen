import express from 'express';
const app = express();
import { calculateBmi } from './calculateBmi';
import { calculateExercises } from './calculateExercises';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send(`hello full stack!`);
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (isNaN(Number(height)) || isNaN(Number(weight)))
    return res.status(400).json({ error: 'malformatted parameters' });

  return res.json({
    height: Number(height),
    weight: Number(weight),
    bmi: calculateBmi(Number(height), Number(weight)),
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { exercises, goal } = req.body;

  if (!exercises || !goal)
    return res.status(400).json({ error: 'parameters missing' });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  if (isNaN(Number(goal)) || exercises.some((e: number) => isNaN(Number(e))))
    return res.status(400).json({ error: 'malformatted parameters' });

  const result = calculateExercises(exercises as number[], Number(goal));
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

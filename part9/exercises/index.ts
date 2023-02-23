import express from 'express';
const app = express();
import { calculateBmi } from './calculateBmi';

app.get('/hello', (_req, res) => {
  res.send(`hello full stack!`);
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = req.query;

    if (isNaN(Number(height)) || isNaN(Number(weight))) throw new Error();

    res.json({
      height: Number(height),
      weight: Number(weight),
      bmi: calculateBmi(Number(height), Number(weight)),
    });
  } catch (error) {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

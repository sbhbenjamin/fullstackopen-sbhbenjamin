import { calculateBmi } from './bmiCalculator';
import { calculateExercises, parseExerciseArguments } from './exerciseCalculator';
import express from 'express';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi : string = calculateBmi(height, weight);

    res.json({
      weight,
      height,
      bmi
    });
  } else {
    res.status(422).send({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const [target, ...dailyExercises] = parseExerciseArguments([req.body.target, ...req.body.daily_exercises]); 
    res.send(calculateExercises(dailyExercises, target));
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === 'Provided values were not numbers!') {
        res.status(422).send({ error: 'malformatted parameters'});
      } else if (error.message === 'Not enough arguments') {
        res.status(422).send({ error: 'parameters missing'});
      }
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
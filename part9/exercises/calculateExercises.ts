interface result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface exerciseArgs {
  week: number[];
  goal: number;
}

const parseExerciseArguments = (args: string[]): exerciseArgs => {
  if (args.length < 4) throw new Error('not enough arguments');

  const week: number[] = [];

  for (let i = 3; i < args.length; i++) {
    if (isNaN(Number(args[i]))) throw new Error('arguments were not numbers');
    week.push(Number(args[i]));
  }

  return {
    week,
    goal: Number(args[2]),
  };
};

const calculateExercises = (week: number[], goal: number): result => {
  const periodLength = week.length;
  const trainingDays = week.filter((d) => d > 0).length;

  const average = week.reduce((p, c) => p + c, 0) / periodLength;

  const success = average >= goal;

  let rating = 0;
  let ratingDescription = '';
  if (average < goal / 2) {
    rating = 1;
    ratingDescription = 'you need to step it up';
  } else if (average < goal) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'you ate that';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: goal,
    average,
  };
};

try {
  const { week, goal } = parseExerciseArguments(process.argv);
  const result = calculateExercises(week, goal);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = 'something went wrong\n';
  if (error instanceof Error) {
    errorMessage += `error: ${error.message}`;
  }
  console.error(errorMessage);
}

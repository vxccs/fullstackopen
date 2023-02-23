interface bmiArgs {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: string[]): bmiArgs => {
  if (args.length < 4) throw new Error('not enough arguments');
  if (args.length > 4) throw new Error('too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('arguments were not numbers');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);

  if (bmi < 16.0) {
    return 'Underweight (Severe thinness)';
  } else if (bmi >= 16.0 && bmi < 17.0) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi >= 17.0 && bmi < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (bmi >= 18.5 && bmi < 25.0) {
    return 'Normal range';
  } else if (bmi >= 25.0 && bmi < 30.0) {
    return 'Overweight (Pre-obese)';
  } else if (bmi >= 30.0 && bmi < 35) {
    return 'Obese (Class I)';
  } else if (bmi >= 35.0 && bmi < 40.0) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  const result = calculateBmi(height, weight);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = 'something went wrong\n';
  if (error instanceof Error) {
    errorMessage += `error: ${error.message}`;
  }
  console.error(errorMessage);
}

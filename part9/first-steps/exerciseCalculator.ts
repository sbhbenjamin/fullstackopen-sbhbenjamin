interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const parseExerciseArguments = (args: Array<string>): Array<number> => {
  if (args.length <= 0) throw new Error ('Not enough arguments');

  const resultArray: number[] = [];

  args.forEach((arg) => {
    if (!isNaN(Number(arg))) {
      resultArray.push(Number(arg));
    } else {
      throw new Error('Provided values were not numbers!');
    }
  });

  return resultArray;
};

// calculates average time of daily exercise hours
export const calculateExercises = (exerciseHours: Array<number>, target: number) : Result => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((day) => day !== 0).length;
  const totalHours = exerciseHours.reduce((a, b) => a + b, 0);
  const targetHours = target * exerciseHours.length;
  const success = totalHours < targetHours  ? false : true;
  const average = totalHours / periodLength;
  let rating;
  let ratingDescription;

  if (totalHours < targetHours) {
    rating = 1;
    ratingDescription = 'bad';
  } else if (totalHours === targetHours) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'good job!';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

if (process.argv.length > 2) {
  const [, , ...rest] = process.argv;
  const [target, ...exerciseHours] = parseExerciseArguments(rest);
  console.log(calculateExercises(exerciseHours, target));
}
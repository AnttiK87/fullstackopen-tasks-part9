interface TrainingCalculatorValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseTrainingArguments = (
  args: string[]
): { target: number; dailyTrainingHours: number[] } => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = Number(args[2]);
  const dailyTrainingHours: number[] = process.argv.slice(3).map(Number);

  if (target <= 0) {
    throw new Error("target can't be negative or zero!");
  } else if (dailyTrainingHours.length < 3) {
    throw new Error("input training information atleast for three days!");
  } else if (isNaN(target)) {
    throw new Error("Provided target was not a number!");
  } else if (dailyTrainingHours.some((hour) => isNaN(hour))) {
    throw new Error("Provided training information were not numbers!");
  } else {
    return { dailyTrainingHours, target };
  }
};

export const calculateExercises = (
  dailyTrainingHours: number[],
  target: number
): TrainingCalculatorValues => {
  const periodLength = dailyTrainingHours.length;

  const trainingDays = dailyTrainingHours.filter((hours) => hours > 0).length;

  const periodTrainingHours = dailyTrainingHours.reduce(
    (sum, hours) => sum + hours,
    0
  );

  const initAverage = periodTrainingHours / periodLength;
  const average = parseFloat(initAverage.toFixed(2));

  let success = false;
  if (target <= average) {
    success = true;
  }

  let rating = 1;
  if (average > 0.5 * target && average < target) {
    rating = 2;
  } else if (average >= target) {
    rating = 3;
  }

  let ratingDescription =
    "You left behind from your target. Try to train more next week";
  if (rating === 2) {
    ratingDescription = "not too bad but could be better";
  } else if (rating === 3) {
    ratingDescription = "Great job! You have achieved your goal!";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { dailyTrainingHours, target } = parseTrainingArguments(process.argv);
  console.log(calculateExercises(dailyTrainingHours, target));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

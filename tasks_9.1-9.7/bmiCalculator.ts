interface BmiValues {
  height: number;
  weight: number;
  bmi: string;
}

const parseBmiArguments = (
  args: string[]
): { height: number; weight: number } => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (height <= 0) {
    throw new Error("Height can't be negative or zero!");
  } else if (weight <= 0) {
    throw new Error("Weight can't be negative or zero!");
  } else if (isNaN(height) || isNaN(weight)) {
    throw new Error("Provided values were not numbers!");
  } else {
    return { height, weight };
  }
};

export const bmiCalculator = (height: number, weight: number): BmiValues => {
  const heightAsMeters = height / 100;
  const bmi = weight / (heightAsMeters * heightAsMeters);
  const roundedBmi = parseFloat(bmi.toFixed(2));
  let category = "";

  if (bmi < 16) {
    category = "Underweight (Severe thinness)";
  } else if (bmi >= 16 && bmi <= 16.9) {
    category = "Underweight (Moderate thinness)";
  } else if (bmi >= 17 && bmi <= 18.4) {
    category = "Underweight (Mild thinness)";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = "Normal weight range";
  } else if (bmi >= 25 && bmi <= 29.9) {
    category = "Overweight (Pre-obese)";
  } else if (bmi >= 30 && bmi <= 34.9) {
    category = "Obese (Class I)";
  } else if (bmi >= 35 && bmi <= 39.9) {
    category = "Obese (Class II)";
  } else {
    category = "Obese (Class III)";
  }

  return {
    height,
    weight,
    bmi: `Your BMI is: ${roundedBmi} and it means that you are: ${category}`,
  };
};

if (require.main === module) {
  try {
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(bmiCalculator(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}

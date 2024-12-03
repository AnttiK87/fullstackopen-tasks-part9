import express from "express";
import { bmiCalculator } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

interface ExerciseInput {
  daily_exercises: number[];
  target: number;
}

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (!height || !weight || isNaN(height) || isNaN(weight)) {
      res
        .status(400)
        .send({ error: "Height and weight must be valid numbers." });
      return;
    }

    if (height <= 0 || weight <= 0) {
      res
        .status(400)
        .send({ error: "Height and weight must be positive numbers." });
      return;
    }

    const result = bmiCalculator(height, weight);
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: `Something went wrong. ${error}` });
  }
});

app.post("/exercises", (req, res) => {
  try {
    const { daily_exercises, target } = req.body as ExerciseInput;

    if (
      !Array.isArray(daily_exercises) ||
      daily_exercises.length < 3 ||
      daily_exercises.some((hour) => isNaN(hour)) ||
      !target ||
      isNaN(target)
    ) {
      res.status(400).send({ error: "Malformatted parameters" });
    }
    const result = calculateExercises(daily_exercises, target);
    res.json(result);
  } catch (error) {
    res.status(500).send({ error: `Something went wrong. ${error}` });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

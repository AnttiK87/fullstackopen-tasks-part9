import express, { Request, Response, NextFunction } from "express";
import patientService from "../services/patientsServices";
import { NonSensitivePatientEntry, NewPatientEntry } from "../types";
import { NewPatientSchema } from "../utils";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<NewPatientEntry>
  ) => {
    console.log("req");
    const addedEntry = patientService.addPatient(req.body);
    console.log(res.json(addedEntry));
    res.json(addedEntry);
  }
);

router.use(errorMiddleware);

export default router;

/*routes/api end points for getting and adding patients data
  and middlewares for parsing data and handling errors*/
import express, { Request, Response, NextFunction } from "express";
import patientService from "../services/patientsServices";
import {
  Patient,
  NonSensitivePatients,
  NewPatientEntry,
  NewMedicalEntry,
} from "../types";
import { NewPatientSchema, NewEntrySchema } from "../utils";
import { z } from "zod";

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
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
    console.log(error.message);
    res.status(400).send({ error: error });
  } else {
    next(error);
  }
};

//get all patients
router.get("/", (_req, res: Response<NonSensitivePatients[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

//get specific patient
router.get("/:id", (req, res: Response<Patient>) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

//add patient
router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<NewPatientEntry>
  ) => {
    const addedEntry = patientService.addPatient(req.body);

    res.json(addedEntry);
  }
);

//add entry for patient
router.post(
  "/:id/entries",
  newEntryParser,
  (req: Request<{ id: string }, unknown, NewMedicalEntry>, res: Response) => {
    const id = req.params.id;
    const newEntry = patientService.addEntry(req.body, id);
    res.json(newEntry);
  }
);

router.use(errorMiddleware);

export default router;

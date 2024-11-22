import patientData from "../../data/patients";
import {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatientEntry,
} from "../types";
import fs from "fs";
import { v1 as uuid } from "uuid";

const patients: PatientEntry[] = patientData;

const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);

  fs.writeFileSync(
    "./data/patients.json", // Oikea polku tiedostoon
    `${JSON.stringify(patients, null, 2)}`
  );

  return newPatientEntry;
};

export default {
  getNonSensitivePatients,
  addPatient,
};

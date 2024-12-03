import fs from "fs";
import path from "path";
import { PatientEntry } from "../src/types";
import { toNewPatientEntry } from "../src/utils";

const loadPatients = (): PatientEntry[] => {
  const filePath = path.resolve(__dirname, "patients.json");
  const data = fs.readFileSync(filePath, "utf-8");
  const patients = JSON.parse(data) as PatientEntry[];
  return patients;
};

const patients = loadPatients();

const patientData: PatientEntry[] = patients.map((obj) => {
  const object = toNewPatientEntry(obj) as PatientEntry;
  object.id = obj.id;
  return object;
});

export default patientData;

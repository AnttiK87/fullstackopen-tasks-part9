import fs from "fs";
import path from "path";
import { Patient } from "../src/types";
import { toNewPatientEntry } from "../src/utils";

// load patients data from patients.json
const loadPatients = (): Patient[] => {
  const filePath = path.resolve(__dirname, "patients.json");
  const data = fs.readFileSync(filePath, "utf-8");
  const patients = JSON.parse(data) as Patient[];
  return patients;
};

const patients = loadPatients();

const patientData: Patient[] = patients.map((obj) => {
  const object = toNewPatientEntry(obj) as Patient;
  object.id = obj.id;
  return object;
});

export default patientData;

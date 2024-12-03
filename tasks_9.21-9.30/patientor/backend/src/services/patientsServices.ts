//services for getting and adding patient data
import patientData from "../../data/patients";
import {
  NonSensitivePatient,
  Patient,
  NewPatientEntry,
  EntryType,
  NewMedicalEntry,
  Entry,
} from "../types";
import fs from "fs";
import { v1 as uuid } from "uuid";

//setting patient data to variable
const patients: Patient[] = patientData;

//Getting patient data with just defined non sensitive info
const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

// getting specific patient data
const findById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    return undefined; // undefined if patient is not to be found
  }

  // check for patients etries and their type
  if (patient.entries) {
    patient.entries = patient.entries.map((entry) => {
      if (!Object.values(EntryType).includes(entry.type)) {
        // if entry type is not supported set it as unknown
        return { ...entry, type: EntryType.Unknown };
      }
      return entry;
    });
  }

  return patient;
};

// Adding new patient
const addPatient = (patient: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(), // generate new id for the patient
    ...patient, // other data recieved with reguest
    entries: [], // set empty array as entries for new patient
  };

  patients.push(newPatientEntry);

  //write new patients data to file patients.json
  fs.writeFileSync(
    "./data/patients.json",
    `${JSON.stringify(patients, null, 2)}`
  );

  return newPatientEntry;
};

// Adding new entry for the patient
const addEntry = (entry: NewMedicalEntry, patientId: string): Entry => {
  //Find patient whom new entry is added
  const patient = patients.find((p) => p.id === patientId);
  //return error if patient doesn't exist
  if (!patient) {
    throw new Error(`Patient with id ${patientId} not found`);
  }

  const newEntry: Entry = { id: uuid(), ...entry }; //generate new id for the entry and set other data

  //wite new entry to the file patients.json
  patient.entries.push(newEntry);
  fs.writeFileSync("./data/patients.json", JSON.stringify(patients, null, 2));

  return newEntry;
};

export default {
  getNonSensitivePatients,
  addPatient,
  findById,
  addEntry,
};

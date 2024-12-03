export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface Patients {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NonSensitivePatients = Omit<Patients, "ssn">;

export type NewPatientEntry = Omit<Patient, "id" | "entries">;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export enum EntryType {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital",
  Unknown = "unknown", // Nyt EntryType sisältää myös "unknown"
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry["code"]>;
}

export type Entry =
  | HealthCheckEntry
  | OccupationalHealthcareEntry
  | HospitalEntry
  | UnknownEntry; // Lisätään UnknownEntry myös Entry-tyyppiin

export type NewMedicalEntry =
  | Omit<HealthCheckEntry, "id">
  | Omit<OccupationalHealthcareEntry, "id">
  | Omit<HospitalEntry, "id">;

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck; // Käytetään EntryType HealthCheck
  healthCheckRating: HealthCheckRating;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare; // Käytetään EntryType OccupationalHealthcare
  employerName: string;
  sickLeave?: SickLeave;
}

interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital; // Käytetään EntryType Hospital
  discharge: Discharge;
}

export interface UnknownEntry extends BaseEntry {
  type: EntryType.Unknown; // Käytetään EntryType Unknown
}

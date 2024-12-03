export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender | null;
  ssn?: string;
  dateOfBirth?: string;
  entries: Array<Entry>;
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export enum EntryType {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital",
  Unknown = "unknown", // Nyt EntryType sisältää myös "unknown"
}

export type Entry =
  | HealthCheckEntry
  | OccupationalHealthcareEntry
  | HospitalEntry
  | UnknownEntry; // Lisätään UnknownEntry myös Entry-tyyppiin

export type EntryFormValues =
  | Omit<HealthCheckEntry, "id">
  | Omit<OccupationalHealthcareEntry, "id">
  | Omit<HospitalEntry, "id">
  | Omit<UnknownEntry, "id">;

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

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

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare; // Käytetään EntryType OccupationalHealthcare
  employerName: string;
  sickLeave?: SickLeave;
}

export interface DischargeModel {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital; // Käytetään EntryType Hospital
  discharge: DischargeModel;
}

export interface UnknownEntry extends BaseEntry {
  type: EntryType.Unknown; // Käytetään EntryType Unknown
}

export type IconStyle = {
  color: string;
  title: string;
};

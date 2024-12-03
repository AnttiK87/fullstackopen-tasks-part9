import {
  NewPatientEntry,
  Gender,
  NewMedicalEntry,
  EntryType,
  HealthCheckRating,
} from "./types";
import { z } from "zod";

//schema for new patient
export const NewPatientSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 characters long." }),
  dateOfBirth: z
    .string()
    .date()
    .refine((value) => new Date(value) <= new Date(), {
      message: "Date cannot be in the future.",
    }),
  ssn: z
    .string()
    .regex(/^\d{6}-\d{4}$/, "Invalid SSN format. Expected: xxxxxx-xxxx"),
  gender: z.nativeEnum(Gender),
  occupation: z
    .string()
    .min(5, { message: "occupation must be at least 3 characters long." }),
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewPatientSchema.parse(object);
};

//schema for new entry (base entry completed with specific types of entries)
export const BaseEntrySchema = z.object({
  date: z
    .string()
    .date()
    .refine((value) => new Date(value) <= new Date(), {
      message: "Date cannot be in the future.",
    }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long." }),
  specialist: z
    .string()
    .min(5, { message: "Specialist name must be at least 5 characters long." }),
  diagnosisCodes: z.array(z.string()).optional(),
});

// HealthCheckEntry-schema
export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal(EntryType.HealthCheck),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

// OccupationalHealthcareEntry-schema
export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal(EntryType.OccupationalHealthcare),
  employerName: z
    .string()
    .min(2, { message: "Employer name must be at least 2 characters long." }),
  sickLeave: z
    .object({
      startDate: z
        .string()
        .date()
        .refine((value) => new Date(value) <= new Date(), {
          message: "Start date cannot be in the future.",
        }),
      endDate: z.string().date(),
    })
    .superRefine((obj, ctx) => {
      const startDate = new Date(obj.startDate);
      const endDate = new Date(obj.endDate);

      if (endDate < startDate) {
        ctx.addIssue({
          code: "custom",
          path: ["endDate"],
          message: "End date cannot be before start date.",
        });
      }
    })
    .optional(),
});

// HospitalEntry-schema
export const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal(EntryType.Hospital),
  discharge: z.object({
    date: z
      .string()
      .date()
      .refine((value) => new Date(value) <= new Date(), {
        message: "Start date cannot be in the future.",
      }),
    criteria: z
      .string()
      .min(10, { message: "Criteria must be at least 10 characters long." }),
  }),
});

// UnknownEntry-schema
export const UnknownEntrySchema = BaseEntrySchema.extend({
  type: z.literal(EntryType.Unknown),
});

export const NewEntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
  HospitalEntrySchema,
  UnknownEntrySchema,
]);

export const toNewMedicalEntry = (object: unknown): NewMedicalEntry => {
  return NewEntrySchema.parse(object) as NewMedicalEntry;
};

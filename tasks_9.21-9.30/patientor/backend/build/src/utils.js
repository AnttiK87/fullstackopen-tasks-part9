"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewMedicalEntry = exports.NewEntrySchema = exports.UnknownEntrySchema = exports.HospitalEntrySchema = exports.OccupationalHealthcareEntrySchema = exports.HealthCheckEntrySchema = exports.BaseEntrySchema = exports.toNewPatientEntry = exports.NewPatientSchema = void 0;
const types_1 = require("./types");
const zod_1 = require("zod");
//schema for new patient
exports.NewPatientSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(5, { message: "Name must be at least 5 characters long." }),
    dateOfBirth: zod_1.z
        .string()
        .date()
        .refine((value) => new Date(value) <= new Date(), {
        message: "Date cannot be in the future.",
    }),
    ssn: zod_1.z
        .string()
        .regex(/^\d{6}-\d{4}$/, "Invalid SSN format. Expected: xxxxxx-xxxx"),
    gender: zod_1.z.nativeEnum(types_1.Gender),
    occupation: zod_1.z
        .string()
        .min(5, { message: "occupation must be at least 3 characters long." }),
});
const toNewPatientEntry = (object) => {
    return exports.NewPatientSchema.parse(object);
};
exports.toNewPatientEntry = toNewPatientEntry;
//schema for new entry (base entry completed with specific types of entries)
exports.BaseEntrySchema = zod_1.z.object({
    date: zod_1.z
        .string()
        .date()
        .refine((value) => new Date(value) <= new Date(), {
        message: "Date cannot be in the future.",
    }),
    description: zod_1.z
        .string()
        .min(10, { message: "Description must be at least 10 characters long." }),
    specialist: zod_1.z
        .string()
        .min(5, { message: "Specialist name must be at least 5 characters long." }),
    diagnosisCodes: zod_1.z.array(zod_1.z.string()).optional(),
});
// HealthCheckEntry-schema
exports.HealthCheckEntrySchema = exports.BaseEntrySchema.extend({
    type: zod_1.z.literal(types_1.EntryType.HealthCheck),
    healthCheckRating: zod_1.z.nativeEnum(types_1.HealthCheckRating),
});
// OccupationalHealthcareEntry-schema
exports.OccupationalHealthcareEntrySchema = exports.BaseEntrySchema.extend({
    type: zod_1.z.literal(types_1.EntryType.OccupationalHealthcare),
    employerName: zod_1.z
        .string()
        .min(2, { message: "Employer name must be at least 2 characters long." }),
    sickLeave: zod_1.z
        .object({
        startDate: zod_1.z
            .string()
            .date()
            .refine((value) => new Date(value) <= new Date(), {
            message: "Start date cannot be in the future.",
        }),
        endDate: zod_1.z.string().date(),
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
exports.HospitalEntrySchema = exports.BaseEntrySchema.extend({
    type: zod_1.z.literal(types_1.EntryType.Hospital),
    discharge: zod_1.z.object({
        date: zod_1.z
            .string()
            .date()
            .refine((value) => new Date(value) <= new Date(), {
            message: "Start date cannot be in the future.",
        }),
        criteria: zod_1.z
            .string()
            .min(10, { message: "Criteria must be at least 10 characters long." }),
    }),
});
// UnknownEntry-schema
exports.UnknownEntrySchema = exports.BaseEntrySchema.extend({
    type: zod_1.z.literal(types_1.EntryType.Unknown),
});
exports.NewEntrySchema = zod_1.z.discriminatedUnion("type", [
    exports.HealthCheckEntrySchema,
    exports.OccupationalHealthcareEntrySchema,
    exports.HospitalEntrySchema,
    exports.UnknownEntrySchema,
]);
const toNewMedicalEntry = (object) => {
    return exports.NewEntrySchema.parse(object);
};
exports.toNewMedicalEntry = toNewMedicalEntry;

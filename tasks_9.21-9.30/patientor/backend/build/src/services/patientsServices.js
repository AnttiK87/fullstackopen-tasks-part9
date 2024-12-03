"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//services for getting and adding patient data
const patients_1 = __importDefault(require("../../data/patients"));
const types_1 = require("../types");
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
//setting patient data to variable
const patients = patients_1.default;
//Getting patient data with just defined non sensitive info
const getNonSensitivePatients = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    }));
};
// getting specific patient data
const findById = (id) => {
    const patient = patients.find((p) => p.id === id);
    if (!patient) {
        return undefined; // undefined if patient is not to be found
    }
    // check for patients etries and their type
    if (patient.entries) {
        patient.entries = patient.entries.map((entry) => {
            if (!Object.values(types_1.EntryType).includes(entry.type)) {
                // if entry type is not supported set it as unknown
                return Object.assign(Object.assign({}, entry), { type: types_1.EntryType.Unknown });
            }
            return entry;
        });
    }
    return patient;
};
// Adding new patient
const addPatient = (patient) => {
    const newPatientEntry = Object.assign(Object.assign({ id: (0, uuid_1.v1)() }, patient), { entries: [] });
    patients.push(newPatientEntry);
    //write new patients data to file patients.json
    fs_1.default.writeFileSync("./data/patients.json", `${JSON.stringify(patients, null, 2)}`);
    return newPatientEntry;
};
// Adding new entry for the patient
const addEntry = (entry, patientId) => {
    //Find patient whom new entry is added
    const patient = patients.find((p) => p.id === patientId);
    //return error if patient doesn't exist
    if (!patient) {
        throw new Error(`Patient with id ${patientId} not found`);
    }
    const newEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry); //generate new id for the entry and set other data
    //wite new entry to the file patients.json
    patient.entries.push(newEntry);
    fs_1.default.writeFileSync("./data/patients.json", JSON.stringify(patients, null, 2));
    return newEntry;
};
exports.default = {
    getNonSensitivePatients,
    addPatient,
    findById,
    addEntry,
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("../src/utils");
// load patients data from patients.json
const loadPatients = () => {
    const filePath = path_1.default.resolve(__dirname, "patients.json");
    const data = fs_1.default.readFileSync(filePath, "utf-8");
    const patients = JSON.parse(data);
    return patients;
};
const patients = loadPatients();
const patientData = patients.map((obj) => {
    const object = (0, utils_1.toNewPatientEntry)(obj);
    object.id = obj.id;
    return object;
});
exports.default = patientData;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//services for getting diagnose data
const diagnoses_1 = __importDefault(require("../../data/diagnoses"));
const diagnoses = diagnoses_1.default;
const getDiagnoses = () => {
    return diagnoses;
};
const findByCode = (code) => {
    const diagnose = diagnoses.find((d) => d.code === code);
    if (!diagnose) {
        return undefined;
    }
    return diagnose;
};
exports.default = {
    getDiagnoses,
    findByCode,
};

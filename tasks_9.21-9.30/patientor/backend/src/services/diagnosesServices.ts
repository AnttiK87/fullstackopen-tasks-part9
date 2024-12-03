//services for getting diagnose data
import diagnoseData from "../../data/diagnoses";
import { DiagnoseEntry } from "../types";

const diagnoses: DiagnoseEntry[] = diagnoseData;

const getDiagnoses = (): DiagnoseEntry[] => {
  return diagnoses;
};

const findByCode = (code: string): DiagnoseEntry | undefined => {
  const diagnose = diagnoses.find((d) => d.code === code);

  if (!diagnose) {
    return undefined;
  }

  return diagnose;
};

export default {
  getDiagnoses,
  findByCode,
};

//routes/api end points for getting diagnoses data
import express from "express";
import { Response } from "express";
import diagnoseService from "../services/diagnosesServices";
import { DiagnoseEntry } from "../types";

const router = express.Router();

// get all diagnoses
router.get("/", (_req, res: Response<DiagnoseEntry[]>) => {
  res.send(diagnoseService.getDiagnoses());
});

// get specific diagnose
router.get("/:code", (req, res: Response<DiagnoseEntry>) => {
  const diagnose = diagnoseService.findByCode(req.params.code);

  if (diagnose) {
    res.send(diagnose);
  } else {
    res.sendStatus(404);
  }
});

export default router;

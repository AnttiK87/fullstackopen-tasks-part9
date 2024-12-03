"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*routes/api end points for getting and adding patients data
  and middlewares for parsing data and handling errors*/
const express_1 = __importDefault(require("express"));
const patientsServices_1 = __importDefault(require("../services/patientsServices"));
const utils_1 = require("../utils");
const zod_1 = require("zod");
const router = express_1.default.Router();
const newPatientParser = (req, _res, next) => {
    try {
        utils_1.NewPatientSchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
const newEntryParser = (req, _res, next) => {
    try {
        utils_1.NewEntrySchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
const errorMiddleware = (error, _req, res, next) => {
    if (error instanceof zod_1.z.ZodError) {
        console.log(error.message);
        res.status(400).send({ error: error });
    }
    else {
        next(error);
    }
};
//get all patients
router.get("/", (_req, res) => {
    res.send(patientsServices_1.default.getNonSensitivePatients());
});
//get specific patient
router.get("/:id", (req, res) => {
    const patient = patientsServices_1.default.findById(req.params.id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.sendStatus(404);
    }
});
//add patient
router.post("/", newPatientParser, (req, res) => {
    const addedEntry = patientsServices_1.default.addPatient(req.body);
    res.json(addedEntry);
});
//add entry for patient
router.post("/:id/entries", newEntryParser, (req, res) => {
    const id = req.params.id;
    const newEntry = patientsServices_1.default.addEntry(req.body, id);
    res.json(newEntry);
});
router.use(errorMiddleware);
exports.default = router;

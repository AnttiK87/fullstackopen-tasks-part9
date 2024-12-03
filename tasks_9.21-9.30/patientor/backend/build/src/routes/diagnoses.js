"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//routes/api end points for getting diagnoses data
const express_1 = __importDefault(require("express"));
const diagnosesServices_1 = __importDefault(require("../services/diagnosesServices"));
const router = express_1.default.Router();
// get all diagnoses
router.get("/", (_req, res) => {
    res.send(diagnosesServices_1.default.getDiagnoses());
});
// get specific diagnose
router.get("/:code", (req, res) => {
    const diagnose = diagnosesServices_1.default.findByCode(req.params.code);
    if (diagnose) {
        res.send(diagnose);
    }
    else {
        res.sendStatus(404);
    }
});
exports.default = router;

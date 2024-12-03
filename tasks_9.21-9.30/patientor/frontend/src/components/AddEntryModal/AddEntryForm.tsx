// form for adding entries
import { useState, useEffect, SyntheticEvent } from "react";

import {
  TextField,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import enGB from "date-fns/locale/en-GB";

import handleDateChange from "./handleDateChange";

import {
  EntryFormValues,
  EntryType,
  Diagnosis,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
  UnknownEntry,
  DischargeModel,
  SickLeave,
} from "../../types";

import diadnoseService from "../../services/diagnoses";

import HealtRating from "./HealthRating";
import Discharge from "./Discharge";
import OccupationalHealthCare from "./OccupationalHealthCare";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

interface TypeOption {
  value: EntryType;
  label: string;
}

//setting options for selecting type
const typeOptions: TypeOption[] = Object.values(EntryType)
  .filter((t) => t !== EntryType.Unknown) //unknow is left out of selection
  .map((t) => ({
    value: t,
    label: t.toString(),
  }));

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  //state variables for all types
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<string>>([]);
  const [type, setType] = useState<EntryType | null>(null);

  //state variables for healtcheck
  const [healthCheckRating, setHealthCheckRating] = useState<number | null>(
    null
  );

  //state variables for hospital
  const [discharge, setDischarge] = useState<DischargeModel>({
    date: "",
    criteria: "",
  });

  //state variables for occupational
  const [employerName, setEmployerName] = useState("");
  const [sickLeave, setSickLeave] = useState<SickLeave>({
    startDate: "",
    endDate: "",
  });

  //state variables for diagnose selection
  const [diadnoses, setDiadnoses] = useState<Diagnosis[]>([]);

  //get diagnoses from backend data
  useEffect(() => {
    const fetchdiagnoseList = async () => {
      const diadnoses = await diadnoseService.getAll();
      setDiadnoses(diadnoses);
    };
    void fetchdiagnoseList();
  }, []);

  //setting options for selecting diagnoses
  const diagnoseOptions: Diagnosis[] = Object.values(diadnoses).map((d) => ({
    code: d.code,
    name: d.name,
  }));

  //handle entrys type change
  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const type = Object.values(EntryType).find((g) => g.toString() === value);
      if (type) {
        setType(type);
        setHealthCheckRating(null);
        setDischarge({
          date: "",
          criteria: "",
        });
        setEmployerName("");
        setSickLeave({
          startDate: "",
          endDate: "",
        });
      }
    }
  };

  //handle selecting diagnoses
  const selectDiagnose = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  //prepare data by entry type to be submitted for backend
  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const baseEntry = {
      specialist,
      date,
      description,
      diagnosisCodes,
      type: type || EntryType.Unknown,
    };

    switch (type) {
      case EntryType.HealthCheck:
        onSubmit({
          ...baseEntry,
          healthCheckRating,
        } as HealthCheckEntry);
        break;
      case EntryType.OccupationalHealthcare:
        onSubmit({
          ...baseEntry,
          employerName,
          sickLeave,
        } as OccupationalHealthcareEntry);
        break;
      case EntryType.Hospital:
        onSubmit({
          ...baseEntry,
          discharge,
        } as HospitalEntry);
        break;
      default:
        onSubmit(baseEntry as UnknownEntry);
    }
  };

  //render form
  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Specialist"
          fullWidth
          style={{ marginBottom: 10 }}
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <div style={{ marginBottom: 10 }}>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={enGB}
          >
            <DatePicker
              label="Select Date"
              value={date ? new Date(date) : null}
              onChange={(newValue) => handleDateChange(newValue, setDate)}
            />
          </LocalizationProvider>
        </div>
        <TextField
          style={{ marginBottom: 10 }}
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          multiline
          rows={4}
          variant="outlined"
        />
        <FormControl style={{ marginBottom: 10, width: "100%" }}>
          <InputLabel>Diagnose</InputLabel>
          <Select
            label="Diagnose"
            value={diagnosisCodes}
            multiple
            renderValue={(selected) => selected.join(", ")}
            onChange={selectDiagnose}
          >
            {diagnoseOptions.map((option) => (
              <MenuItem key={option.code} value={option.code}>
                <Checkbox checked={diagnosisCodes.includes(option.code)} />
                <ListItemText primary={option.code} secondary={option.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl style={{ marginBottom: 10, width: "100%" }}>
          <InputLabel>Type</InputLabel>
          <Select
            label="Type"
            fullWidth
            required
            value={type || ""}
            onChange={onTypeChange}
          >
            {typeOptions.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {type === EntryType.HealthCheck && (
          <HealtRating
            healthCheckRating={healthCheckRating}
            setHealthCheckRating={setHealthCheckRating}
          />
        )}
        {type === EntryType.Hospital && (
          <Discharge discharge={discharge} setDischarge={setDischarge} />
        )}
        {type === EntryType.OccupationalHealthcare && (
          <OccupationalHealthCare
            employerName={employerName}
            setEmployerName={setEmployerName}
            sickLeave={sickLeave}
            setSickLeave={setSickLeave}
          />
        )}
        <Grid style={{ marginBottom: "40px" }}>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;

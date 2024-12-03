import { useState, SyntheticEvent } from "react";

import {
  TextField,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import enGB from "date-fns/locale/en-GB";
import handleDateChange from "../AddEntryModal/handleDateChange";

import { PatientFormValues, Gender } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: PatientFormValues) => void;
}

interface GenderOption {
  value: Gender;
  label: string;
}

//setting options for selecting gender
const genderOptions: GenderOption[] = Object.values(Gender).map((v) => ({
  value: v,
  label: v.toString(),
}));

const AddPatientForm = ({ onCancel, onSubmit }: Props) => {
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [ssn, setSsn] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState<Gender | null>(null);

  //handle gender change
  const onGenderChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const gender = Object.values(Gender).find((g) => g.toString() === value);
      if (gender) {
        setGender(gender);
      }
    }
  };

  //prepare patient data to be submitted for backend
  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      name,
      occupation,
      ssn,
      dateOfBirth,
      gender: gender || Gender.Other,
    });
  };

  return (
    <div>
      <form onSubmit={addPatient}>
        <TextField
          style={{ marginBottom: 10 }}
          label="Name"
          fullWidth
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <TextField
          style={{ marginBottom: 10 }}
          label="Social security number"
          fullWidth
          value={ssn}
          onChange={({ target }) => setSsn(target.value)}
        />
        <div style={{ marginBottom: 10 }}>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={enGB}
          >
            <DatePicker
              label="Select Birth Date"
              openTo="year"
              views={["year", "month", "day"]}
              value={dateOfBirth ? new Date(dateOfBirth) : null}
              onChange={(newValue) =>
                handleDateChange(newValue, setDateOfBirth)
              }
            />
          </LocalizationProvider>
        </div>
        <TextField
          style={{ marginBottom: 10 }}
          label="Occupation"
          fullWidth
          value={occupation}
          onChange={({ target }) => setOccupation(target.value)}
        />
        <FormControl style={{ marginBottom: 10, width: "100%" }}>
          <InputLabel>Gender</InputLabel>
          <Select
            label="Gender"
            fullWidth
            value={gender || ""}
            onChange={onGenderChange}
          >
            {genderOptions.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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

export default AddPatientForm;

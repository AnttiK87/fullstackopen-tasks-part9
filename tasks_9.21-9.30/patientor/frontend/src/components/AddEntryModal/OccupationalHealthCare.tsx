// Entry form additions for type hospital
import { TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import enGB from "date-fns/locale/en-GB";

import { SickLeave } from "../../types";

import handleDateChange from "./handleDateChange";

interface Props {
  employerName: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  sickLeave: SickLeave;
  setSickLeave: React.Dispatch<React.SetStateAction<SickLeave>>;
}

const OccupationalHealthCare = ({
  employerName,
  setEmployerName,
  sickLeave,
  setSickLeave,
}: Props): JSX.Element => {
  return (
    <>
      <Typography style={{ marginBottom: 10 }} variant="subtitle1">
        <b>Sick Leave</b>
      </Typography>
      <div
        style={{
          marginBottom: 10,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
          <DatePicker
            label="Select Start Date"
            value={sickLeave.startDate ? new Date(sickLeave.startDate) : null}
            onChange={(newValue) =>
              handleDateChange(newValue, setSickLeave, "startDate")
            }
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
          <DatePicker
            label="Select End Date"
            value={sickLeave.endDate ? new Date(sickLeave.endDate) : null}
            onChange={(newValue) =>
              handleDateChange(newValue, setSickLeave, "endDate")
            }
          />
        </LocalizationProvider>
      </div>
      <TextField
        style={{ marginBottom: 10 }}
        label="Employer name"
        fullWidth
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
        variant="outlined"
      />
    </>
  );
};

export default OccupationalHealthCare;

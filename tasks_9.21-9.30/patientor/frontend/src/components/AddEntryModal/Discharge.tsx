// Entry form additions for type hospital
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import enGB from "date-fns/locale/en-GB";

import { DischargeModel } from "../../types";

import handleDateChange from "./handleDateChange";

interface Props {
  discharge: DischargeModel;
  setDischarge: React.Dispatch<React.SetStateAction<DischargeModel>>;
}

const Discharge = ({ discharge, setDischarge }: Props): JSX.Element => {
  return (
    <>
      <div style={{ marginBottom: 10 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
          <DatePicker
            label="Select Discharge Date"
            value={discharge.date ? new Date(discharge.date) : null}
            onChange={(newValue) =>
              handleDateChange(newValue, setDischarge, "date")
            }
          />
        </LocalizationProvider>
      </div>
      <TextField
        style={{ marginBottom: 10 }}
        label="Criteria"
        fullWidth
        value={discharge.criteria}
        onChange={({ target }) =>
          setDischarge((prevDischarge) => ({
            ...prevDischarge,
            criteria: target.value,
          }))
        }
        multiline
        rows={4}
        variant="outlined"
      />
    </>
  );
};

export default Discharge;

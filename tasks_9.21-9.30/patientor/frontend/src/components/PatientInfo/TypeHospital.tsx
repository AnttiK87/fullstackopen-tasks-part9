//structure of entry show for type hospita
import { Typography } from "@mui/material";
import { HospitalEntry } from "../../types";
import { FaTruckMedical } from "react-icons/fa6";
import { style1, style2 } from "./style";

const TypeHospital = ({ entry }: { entry: HospitalEntry }): JSX.Element => {
  return (
    <>
      <div style={style2}>
        <Typography variant="h6">
          <b>{entry.date}</b>
        </Typography>
        <FaTruckMedical title="Patient was hospitalized" style={style1} />
      </div>
      <Typography variant="subtitle1">{entry.description}</Typography>
      <Typography style={{ marginBottom: "10px" }} variant="subtitle1">
        <b>Discharge:</b> {entry.discharge.date}, {entry.discharge.criteria}
      </Typography>
    </>
  );
};

export default TypeHospital;

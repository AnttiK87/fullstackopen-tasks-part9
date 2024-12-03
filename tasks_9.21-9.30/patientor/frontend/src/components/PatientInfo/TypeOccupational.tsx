//structure of entry show for type occupational
import { Typography } from "@mui/material";
import { OccupationalHealthcareEntry } from "../../types";
import { FaBriefcaseMedical } from "react-icons/fa6";
import { style1, style2 } from "./style";

const TypeOccupational = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}): JSX.Element => {
  return (
    <>
      <div style={style2}>
        <Typography variant="h6">
          <b>{entry.date}</b>
        </Typography>
        <FaBriefcaseMedical
          title="Occupational healthcare visit"
          style={style1}
        />
      </div>
      <Typography variant="subtitle1">{entry.description}</Typography>
      <Typography style={{ marginBottom: "10px" }} variant="subtitle1">
        <b>Employer:</b> {entry.employerName}
      </Typography>
      {entry.sickLeave && (
        <Typography style={{ marginBottom: "10px" }} variant="subtitle1">
          <b>Sick leave:</b> {entry.sickLeave.startDate} -{" "}
          {entry.sickLeave.endDate}
        </Typography>
      )}
    </>
  );
};

export default TypeOccupational;

//structure of entry show for type healthCheck
import { Typography } from "@mui/material";
import { HealthCheckEntry } from "../../types";
import HealthCheckIcon from "./HealthCheckIcon";
import { FaStethoscope } from "react-icons/fa6";
import { style1, style2 } from "./style";

const TypeHealthCheck = ({
  entry,
}: {
  entry: HealthCheckEntry;
}): JSX.Element => {
  return (
    <>
      <div style={style2}>
        <Typography variant="h6">
          <b>{entry.date}</b>
        </Typography>
        <FaStethoscope title="General health check" style={style1} />
      </div>
      <Typography variant="subtitle1">{entry.description}</Typography>
      <div>
        <HealthCheckIcon healthCheckRating={entry.healthCheckRating} />
      </div>
    </>
  );
};

export default TypeHealthCheck;

//rendering healtcheckIcon component
import { FaHeartbeat } from "react-icons/fa";
import { HealthCheckRating, IconStyle } from "../../types";

const HealthCheckIcon = ({
  healthCheckRating,
}: {
  healthCheckRating: HealthCheckRating;
}): JSX.Element => {
  const iconStyles: { [key in HealthCheckRating]: IconStyle } = {
    [HealthCheckRating.Healthy]: { color: "green", title: "Healthy" },
    [HealthCheckRating.LowRisk]: { color: "orange", title: "Low risk" },
    [HealthCheckRating.HighRisk]: { color: "red", title: "High risk" },
    [HealthCheckRating.CriticalRisk]: {
      color: "black",
      title: "Critical risk!",
    },
  };

  const iconStyle = iconStyles[healthCheckRating];

  return (
    <FaHeartbeat
      style={{
        fontSize: "24px",
        color: iconStyle.color,
        cursor: "pointer",
      }}
      title={iconStyle.title}
    />
  );
};

export default HealthCheckIcon;

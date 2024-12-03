// Entry form additions for type healthCheck
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { HealthCheckRating } from "../../types";

interface RatingOption {
  value: string;
  label: string;
}

//options for healt rating
const ratingOptions: RatingOption[] = [
  { value: "0", label: "The patient is in great shape" },
  { value: "1", label: "The patient has a low risk of getting sick" },
  { value: "2", label: "The patient has a high risk of getting sick" },
  { value: "3", label: "The patient has a diagnosed condition" },
];

interface Props {
  healthCheckRating: HealthCheckRating | null;
  setHealthCheckRating: React.Dispatch<
    React.SetStateAction<HealthCheckRating | null>
  >;
}

const HealthRating = ({
  healthCheckRating,
  setHealthCheckRating,
}: Props): JSX.Element => {
  //handle rating change
  const onRatingChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = Number(event.target.value); // change string to number
    setHealthCheckRating(selectedValue as HealthCheckRating);
  };

  return (
    <FormControl style={{ marginBottom: 10, width: "100%" }}>
      <InputLabel>Health rating</InputLabel>
      <Select
        label="Health rating"
        fullWidth
        value={healthCheckRating !== null ? healthCheckRating.toString() : ""}
        onChange={onRatingChange}
      >
        {ratingOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default HealthRating;

// component for showing health rating on patients list page
import React, { useState, useEffect } from "react";
import { Rating } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

import { HealthCheckEntry } from "../types";

type HealthRatingBarProps = {
  entries: HealthCheckEntry[] | undefined;
};

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const HEALTHBAR_TEXTS = [
  "The patient is in great shape",
  "The patient has a low risk of getting sick",
  "The patient has a high risk of getting sick",
  "The patient has a diagnosed condition",
];

const HealthRatingBar: React.FC<HealthRatingBarProps> = ({ entries }) => {
  const [rating, setRating] = useState<number | "none" | "loading">("loading");

  //use effect for getting patients healthRating
  useEffect(() => {
    //if patient has no entries set health rating as none
    if (!entries || entries.length === 0) {
      setRating(entries === undefined ? "loading" : "none");
      return;
    }
    //filter only entries that has type health check
    const healthCheckEntries = entries.filter(
      (entry) => entry.type === "HealthCheck"
    );

    if (healthCheckEntries.length > 0) {
      //sort entried by date
      const sortedHealthCheckEntries = healthCheckEntries.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      //set most resent health rating to be shown on rating bar
      setRating(sortedHealthCheckEntries[0].healthCheckRating as number);
      //console.log(sortedHealthCheckEntries[0].healthCheckRating as number);
    } else {
      // if patient doesnot have healtcheck entries set rating as none
      setRating("none");
    }
  }, [entries]);

  //show loading if rating is being loaded
  if (rating === "loading") {
    return (
      <div className="health-bar">
        <div>Loading...</div>
      </div>
    );
  }

  //show this if patient has no health rating
  if (rating === "none") {
    return <div>No health check made</div>;
  }

  return (
    <div className="health-bar" title={HEALTHBAR_TEXTS[rating]}>
      <StyledRating
        readOnly
        value={3 - rating}
        max={3}
        icon={<Favorite fontSize="inherit" />}
        emptyIcon={<FavoriteBorder fontSize="inherit" />}
      />
    </div>
  );
};

export default HealthRatingBar;

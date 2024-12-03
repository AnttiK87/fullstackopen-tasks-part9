// component for rendering patients entries
import { useState, useEffect } from "react";
import diagnoseService from "../../services/diagnoses";
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HealingIcon from "@mui/icons-material/Healing";
import { Entry } from "../../types";
import EntryDetails from "./EntryDetails";

const Entries = ({ entries }: { entries: Entry[] }): JSX.Element => {
  const [diagnoses, setDiagnoses] = useState<{ [key: string]: string }>({});

  //fetch diagnoses from back end for combining entrys diagnosecodes to actual diagnoses
  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnosisNames: { [key: string]: string } = {};
      for (const entry of entries) {
        if (entry.diagnosisCodes) {
          for (const code of entry.diagnosisCodes) {
            if (!diagnosisNames[code]) {
              const diagnosis = await diagnoseService.getById(code);
              diagnosisNames[code] = diagnosis.name;
            }
          }
        }
      }
      setDiagnoses(diagnosisNames);
    };
    fetchDiagnoses();
  }, [entries]);

  //show no entries if there is no entries
  if (entries.length === 0) {
    return (
      <Typography style={{ marginBottom: 10, marginTop: 10 }} variant="h6">
        <b>No entries</b>
      </Typography>
    );
  }

  return (
    <div>
      {entries
        .slice()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) //sort by date
        .map((entry, index) => (
          <div
            key={entry.id}
            style={{
              margin: "10px 0",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#dcdcdc",
            }}
          >
            <div>
              <EntryDetails entry={entry} />
            </div>
            {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
              <>
                <Typography style={{ marginTop: "10px" }} variant="subtitle1">
                  <b>Diagnoses:</b>
                </Typography>
                <List
                  style={{
                    margin: "0px",
                    paddingTop: "0px",
                    paddingBottom: "0px",
                  }}
                >
                  {entry.diagnosisCodes.map((code) => (
                    <ListItem
                      style={{
                        margin: "0px",
                        paddingTop: "0px",
                        paddingBottom: "0px",
                      }}
                      key={code}
                    >
                      <ListItemIcon>
                        <HealingIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={code}
                        secondary={diagnoses[code] || "Loading..."}
                      ></ListItemText>
                    </ListItem>
                  ))}
                </List>
              </>
            )}
            <Typography style={{ marginTop: "15px" }} variant="subtitle1">
              <b>Diagnosed by:</b> {entry.specialist}
            </Typography>
          </div>
        ))}
    </div>
  );
};

export default Entries;

// main structure and functionalities of the patient info component
import { Box, Button, Typography } from "@mui/material";
import { useMatch } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { EntryFormValues, Patient } from "../../types";
import patientService from "../../services/patients";

import Entries from "./Entries";
import AddEntryModal from "../AddEntryModal";

interface Props {
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const PatientInfo = ({ setPatients }: Props): JSX.Element => {
  const style1 = { fontSize: "30px", cursor: "pointer", fontStyle: "bold" };
  const style2 = {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    marginTop: "20px",
  };
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  // for opening add entry form as modal
  const openModal = (): void => setModalOpen(true);

  // for closing add entry form
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const [patient, setPatient] = useState<Patient | null>(null);

  //use match for getting id from params
  const match = useMatch("/patient/:id");

  // function for getting patients data
  const fetchPatient = async (id: string) => {
    const patientData = await patientService.getById(id);
    setPatient(patientData);
  };

  //use effect for getting patients info
  useEffect(() => {
    if (match?.params.id) {
      fetchPatient(match.params.id);
    }
  }, [match?.params.id]);

  //function for submitting new entrys data to back end and handling errors
  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (patient) {
        const entry = await patientService.createEntry(values, patient.id);
        const updatedPatient = {
          ...patient,
          entries: patient.entries.concat(entry), //add new entry to patients existing data
        };
        setPatient(updatedPatient);
        setPatients((prevPatients) => {
          return prevPatients.map((p) =>
            p.id === updatedPatient.id ? updatedPatient : p
          );
        });
        setModalOpen(false); // close model after submission
      }
    } catch (e: unknown) {
      //handle errors and show info to user
      if (axios.isAxiosError(e)) {
        const errorMessages = e?.response?.data.error.issues[0].message;
        if (e?.response?.data) {
          console.error(errorMessages && errorMessages);
          setError(errorMessages);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  //show loading screen if patient data is being loaded
  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Box>
        <div style={style2}>
          <Typography style={{ marginRight: "15px" }} variant="h5">
            {patient?.name}
          </Typography>
          {patient?.gender === "male" ? (
            <i title="male" style={style1} className="fa fa-mars" />
          ) : patient?.gender === "female" ? (
            <i title="female" style={style1} className="fa fa-venus" />
          ) : (
            <i title="other" style={style1} className="fa fa-genderless" />
          )}
        </div>
        <Typography variant="subtitle1">
          <b>SSN:</b> {patient?.ssn}
        </Typography>
        <Typography style={{ marginBottom: "10px" }} variant="subtitle1">
          <b>Occupation:</b> {patient?.occupation}
        </Typography>
        <div
          style={{
            marginBottom: 10,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">Entries</Typography>
          <Button variant="contained" onClick={() => openModal()}>
            Add New Entry
          </Button>
        </div>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Entries entries={patient.entries} />
      </Box>
    </div>
  );
};

export default PatientInfo;

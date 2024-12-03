// main structure and functionalities of the patients list component
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Table,
  Button,
  TableHead,
  Typography,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import axios from "axios";

import {
  PatientFormValues,
  Patient,
  HealthCheckEntry,
  EntryType,
} from "../../types";
import AddPatientModal from "../AddPatientModal";

import HealthRatingBar from "../HealthRatingBar";

import patientService from "../../services/patients";

interface Props {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const PatientListPage = ({ patients, setPatients }: Props) => {
  console.log(patients);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  // for opening add patient form as modal
  const openModal = (): void => setModalOpen(true);

  // for closing add patient form
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  //function for submitting new entrys data to back end and handling errors
  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const patient = await patientService.create(values);
      setPatients(patients.concat(patient));
      setModalOpen(false);
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

  //use navigate for navigating to patients info page
  const navigate = useNavigate();
  const goRouteId = (id: string) => {
    navigate(`/patient/${id}`);
  };

  return (
    <div className="App">
      <Box>
        <Typography style={{ marginTop: "20px" }} align="left" variant="h5">
          Patient list
        </Typography>
      </Box>
      <Table style={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(patients)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((patient: Patient) => (
              <TableRow
                sx={{ cursor: "pointer" }}
                onClick={() => goRouteId(patient.id)}
                key={patient.id}
              >
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.occupation}</TableCell>
                <TableCell>
                  <HealthRatingBar
                    entries={patient.entries?.filter(
                      (entry): entry is HealthCheckEntry =>
                        entry.type === EntryType.HealthCheck
                    )}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </div>
  );
};

export default PatientListPage;

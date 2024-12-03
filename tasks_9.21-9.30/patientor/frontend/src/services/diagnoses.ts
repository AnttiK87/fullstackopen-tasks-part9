// services for getting diagnoses from backend
import axios from "axios";
import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

  return data;
};

const getById = async (code: string) => {
  const response = await axios.get(`${apiBaseUrl}/diagnoses/${code}`);
  return response.data;
};

export default {
  getAll,
  getById,
};

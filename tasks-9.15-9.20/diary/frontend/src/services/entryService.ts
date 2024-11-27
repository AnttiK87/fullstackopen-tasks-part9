//services for communication with backend api endpoints
import axios, { AxiosError } from "axios";
import {
  DiaryEntry,
  NewEntryStyle,
  ErrorMessage,
  ValidationError,
} from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

// Handle Axios errors with simplified error message
const handleErrors = (error: AxiosError | unknown): ErrorMessage => {
  const errorMessage: ErrorMessage = {
    errorMessage: "",
  };

  if (axios.isAxiosError(error)) {
    // Check if it’s an Axios error with a response
    if (error.response) {
      if (error.response.data) {
        // Handle validation errors (errors vith status 400)
        if (error.response.status === 400) {
          errorMessage.errorMessage = error.response.data as ValidationError;
        }
        // Handle other errors with response
        else {
          errorMessage.errorMessage = `Error with reguest type: "${error.response.config.method?.toUpperCase()}". Error code: ${
            error.response?.status
          }, ${error.response.statusText}`;
        }
      }
    }
    // Axios errors with a reguest but no response
    else if (error.request) {
      errorMessage.errorMessage =
        "No response from the server. Please check your internet connection or try again later.";
    }
    // other errors
    else {
      errorMessage.errorMessage = `Something went wrong while adding diary entry. Please try again later! Error: ${error.message}`;
    }
  }
  // Non-Axios errors, not sure if this is even nessesary
  else {
    errorMessage.errorMessage =
      "An unexpected error occurred. Please try again later.";
  }

  return errorMessage;
};

// function for getting all diary entries with error handling
export const getDiaryEntries = async (
  notify: (message: ErrorMessage) => void
) => {
  try {
    const response = await axios.get<DiaryEntry[]>(baseUrl);
    return response.data;
  } catch (error) {
    const errorMessage = handleErrors(error);
    notify(errorMessage);
  }
};

// function for adding diary entries with error handling
export const createEntry = async (
  object: NewEntryStyle,
  notify: (message: ErrorMessage) => void
) => {
  try {
    const response = await axios.post<DiaryEntry>(baseUrl, object);
    return response.data;
  } catch (error) {
    const errorMessage = handleErrors(error);
    notify(errorMessage);
  }
};

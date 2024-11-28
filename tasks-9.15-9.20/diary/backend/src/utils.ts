import { NewDiaryEntry, Weather, Visibility } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseComment = (comment: unknown): string => {
  if (!isString(comment)) {
    const errorMessage = `Incorrect or missing comment: ${comment}`;
    //console.error(errorMessage);
    throw new Error(errorMessage);
  }

  return comment;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    const errorMessage = `Incorrect date: ${date}`;
    throw new Error(errorMessage);
  }

  // check if date is in future
  const parsedDate = new Date(date);
  const currentDate = new Date();
  if (parsedDate > currentDate) {
    const errorMessage = `Date cannot be in the future: ${date}`;
    throw new Error(errorMessage);
  }

  return date;
};

const isWeather = (param: string): param is Weather => {
  return Object.values(Weather)
    .map((v) => v.toString())
    .includes(param);
};

const parseWeather = (weather: unknown): Weather => {
  if (!isString(weather) || !isWeather(weather)) {
    const errorMessage = `Incorrect weather: ${weather}`;
    //console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return weather;
};

const isVisibility = (param: string): param is Visibility => {
  return Object.values(Visibility)
    .map((v) => v.toString())
    .includes(param);
};

const parseVisibility = (visibility: unknown): Visibility => {
  if (!isString(visibility) || !isVisibility(visibility)) {
    const errorMessage = `Incorrect visibility: ${visibility}`;
    //console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return visibility;
};

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  if (!object || typeof object !== "object") {
    const errorMessage = "Incorrect or missing data";
    //console.error(errorMessage);
    throw new Error(errorMessage);
  }

  if (
    "comment" in object &&
    "date" in object &&
    "weather" in object &&
    "visibility" in object
  ) {
    const newEntry: NewDiaryEntry = {
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
      date: parseDate(object.date),
      comment: parseComment(object.comment),
    };

    return newEntry;
  }

  const errorMessage = "Incorrect data: a field missing";
  //console.error(errorMessage);
  throw new Error(errorMessage);
};

export default toNewDiaryEntry;

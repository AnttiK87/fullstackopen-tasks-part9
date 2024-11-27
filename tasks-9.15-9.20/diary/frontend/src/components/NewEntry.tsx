// component for rendering form for adding diary entries
import React, { useState } from "react";
import { createEntry } from "../services/entryService";

import { NewEntryStyle, FormData, NewEntryProps } from "../types";

const NewEntry = ({
  setDiaryEntries,
  diaryEntries,
  notify,
}: NewEntryProps): JSX.Element => {
  //styles
  const paddingLeft = {
    paddingLeft: "15px",
  };

  const marginBottom = {
    marginBottom: "5px",
  };

  //set initial values to form
  const [newEntryData, setNewEntryData] = useState<FormData>({
    date: "",
    radioGroup1: "not selected",
    radioGroup2: "not selected",
    textInput: "",
  });

  //set form values after change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewEntryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //handle submitting form halues
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newEntry: NewEntryStyle = {
      date: newEntryData.date,
      weather: newEntryData.radioGroup2 as NewEntryStyle["weather"],
      visibility: newEntryData.radioGroup1 as NewEntryStyle["visibility"],
      comment: newEntryData.textInput,
    };

    const savedEntry = await createEntry(newEntry, notify);
    if (savedEntry) {
      setDiaryEntries(diaryEntries.concat(savedEntry));

      setNewEntryData({
        date: "",
        radioGroup1: "",
        radioGroup2: "",
        textInput: "",
      });
    }
  };

  //render component
  return (
    <>
      <h2>Add new entry</h2>

      <form style={paddingLeft} onSubmit={handleSubmit}>
        <div style={marginBottom}>
          <label>
            <b>Select a date: </b>
          </label>
          <input
            type="date"
            name="date"
            required
            value={newEntryData.date}
            onChange={handleChange}
          />
        </div>

        <div style={marginBottom}>
          <b>Visibility:</b>
          <label>
            <input
              type="radio"
              name="radioGroup1"
              value="great"
              checked={newEntryData.radioGroup1 === "great"}
              onChange={handleChange}
            />
            great
          </label>
          <label>
            <input
              type="radio"
              name="radioGroup1"
              value="good"
              checked={newEntryData.radioGroup1 === "good"}
              onChange={handleChange}
            />
            good
          </label>
          <label>
            <input
              type="radio"
              name="radioGroup1"
              value="ok"
              checked={newEntryData.radioGroup1 === "ok"}
              onChange={handleChange}
            />
            OK
          </label>
          <label>
            <input
              type="radio"
              name="radioGroup1"
              value="poor"
              checked={newEntryData.radioGroup1 === "poor"}
              onChange={handleChange}
            />
            poor
          </label>
        </div>

        <div style={marginBottom}>
          <b>Weather:</b>
          <label>
            <input
              type="radio"
              name="radioGroup2"
              value="sunny"
              checked={newEntryData.radioGroup2 === "sunny"}
              onChange={handleChange}
            />
            sunny
          </label>
          <label>
            <input
              type="radio"
              name="radioGroup2"
              value="rainy"
              checked={newEntryData.radioGroup2 === "rainy"}
              onChange={handleChange}
            />
            rainy
          </label>
          <label>
            <input
              type="radio"
              name="radioGroup2"
              value="cloudy"
              checked={newEntryData.radioGroup2 === "cloudy"}
              onChange={handleChange}
            />
            cloudy
          </label>
          <label>
            <input
              type="radio"
              name="radioGroup2"
              value="windy"
              checked={newEntryData.radioGroup2 === "windy"}
              onChange={handleChange}
            />
            windy
          </label>
          <label>
            <input
              type="radio"
              name="radioGroup2"
              value="stormy"
              checked={newEntryData.radioGroup2 === "stormy"}
              onChange={handleChange}
            />
            stormy
          </label>
        </div>

        <div style={marginBottom}>
          <label htmlFor="textInput">
            <b>Comment: </b>
          </label>
          <input
            type="text"
            id="textInput"
            name="textInput"
            value={newEntryData.textInput}
            onChange={handleChange}
          />
        </div>

        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  );
};

export default NewEntry;

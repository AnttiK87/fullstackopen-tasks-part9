import { useState, useEffect } from "react";

import NewEntry from "./components/NewEntry";
import EntriesList from "./components/EntriesList";
import Notify from "./components/Notify";
import { DiaryEntry, ErrorMessage } from "./types";

import { getDiaryEntries } from "./services/entryService";

const App = () => {
  //state variables
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);

  //Get diary entries for entry list
  useEffect(() => {
    getDiaryEntries(notify).then((data) => {
      if (data) {
        setDiaryEntries(data);
      } else {
        setDiaryEntries([]);
      }
    });
  }, []);

  // Function for showing notification messages
  const notify = (message: ErrorMessage) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  //render main stricture of this application
  return (
    <div>
      <Notify errorMessage={errorMessage?.errorMessage || null} />
      <NewEntry
        setDiaryEntries={setDiaryEntries}
        diaryEntries={diaryEntries}
        notify={notify}
      />
      <EntriesList diaryEntries={diaryEntries} />
    </div>
  );
};

export default App;

// component for rendering list of diary entries
import Entry from "./Entry";
import { DiaryEntry } from "../types";

interface EntriesProps {
  diaryEntries: DiaryEntry[];
}

const EntriesList = ({ diaryEntries }: EntriesProps): JSX.Element => {
  return (
    <>
      <h2>Diary entries</h2>
      {diaryEntries.map((diaryEntry) => (
        <Entry key={diaryEntry.id} diaryEntry={diaryEntry} />
      ))}
    </>
  );
};

export default EntriesList;

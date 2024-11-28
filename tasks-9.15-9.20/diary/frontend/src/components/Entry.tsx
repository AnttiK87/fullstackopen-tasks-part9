// component for rendering one diary entry
import { DiaryEntry } from "../types";

interface EntryProps {
  diaryEntry: DiaryEntry;
}

const Entry = ({ diaryEntry }: EntryProps): JSX.Element => {
  //styles
  const marginBottom = {
    marginBottom: "7px",
  };

  const paddingLeft = {
    paddingLeft: "15px",
    width: "550px",
  };

  const borderBottom = {
    borderBottom: "1px solid black",
    paddingBottom: "15px",
  };

  return (
    <>
      <div style={paddingLeft}>
        <h2 style={marginBottom}>{diaryEntry.date}</h2>
        <div>
          <b>Weather:</b> {diaryEntry.weather}
        </div>
        <div>
          <b>Visibility:</b> {diaryEntry.visibility}
        </div>
        <div style={borderBottom}>
          <b>Comment:</b> {diaryEntry.comment}
        </div>
      </div>
    </>
  );
};

export default Entry;

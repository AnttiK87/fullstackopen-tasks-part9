//structure of entry show for type unknown
import { Typography } from "@mui/material";
import { UnknownEntry } from "../../types";
import { GrStatusUnknown } from "react-icons/gr";
import { style1, style2 } from "./style";

const TypeUnknown = ({ entry }: { entry: UnknownEntry }): JSX.Element => {
  return (
    <>
      <div style={style2}>
        <Typography variant="h6">
          <b>{entry.date}</b>
        </Typography>
        <GrStatusUnknown title="Unknown entry type" style={style1} />
      </div>
      <Typography variant="subtitle1">{entry.description}</Typography>
    </>
  );
};

export default TypeUnknown;

// for detemining what data/details of entry needs to be show according entry type
import { Entry, EntryType } from "../../types";
import TypeHealthCheck from "./TypeHealthCheck";
import TypeOccupational from "./TypeOccupational";
import TypeHospital from "./TypeHospital";
import TypeUnknown from "./TypeUnknown";

const EntryDetails = ({ entry }: { entry: Entry }): JSX.Element => {
  switch (entry.type) {
    case EntryType.HealthCheck:
      return <TypeHealthCheck entry={entry} />;
    case EntryType.OccupationalHealthcare:
      return <TypeOccupational entry={entry} />;
    case EntryType.Hospital:
      return <TypeHospital entry={entry} />;
    case EntryType.Unknown:
    default:
      return <TypeUnknown entry={entry} />;
  }
};

export default EntryDetails;

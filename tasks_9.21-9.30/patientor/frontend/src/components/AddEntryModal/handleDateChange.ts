// Function for handling date change
import { format } from "date-fns";

const handleDateChange = <T extends object>(
  newValue: Date | null,
  stateSetter:
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<T>>,
  fieldKey?: keyof T
) => {
  if (newValue) {
    const formattedDate = format(newValue, "yyyy-MM-dd"); //format date to desired format
    //if date is stored as an object
    if (fieldKey) {
      if (stateSetter as React.Dispatch<React.SetStateAction<T>>) {
        (stateSetter as React.Dispatch<React.SetStateAction<T>>)(
          (prevState: T) => ({
            ...prevState,
            [fieldKey]: formattedDate,
          })
        );
      }
    }
    //if date is stored as a plain string
    else {
      (stateSetter as React.Dispatch<React.SetStateAction<string>>)(
        formattedDate
      );
    }
  }
};

export default handleDateChange;

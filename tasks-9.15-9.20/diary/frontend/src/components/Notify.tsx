// component for shoving messages to user
import { ErrorMessage } from "../types";

const Notify = (props: ErrorMessage): JSX.Element | null => {
  let messageToShow: string | null = null;

  if (props.errorMessage) {
    if (typeof props.errorMessage === "string") {
      messageToShow = props.errorMessage;
    } else if (props.errorMessage.message) {
      messageToShow = props.errorMessage.message;
    }
  }

  if (!messageToShow) {
    return null;
  }

  return (
    <h2 style={{ padding: "5px", marginLeft: "35px", color: "red" }}>
      {messageToShow}
    </h2>
  );
};

export default Notify;

import { CoursePart } from "../App";

const marginBottom = {
  marginBottom: "0",
};

const marginTop = {
  marginTop: "0",
};

const marginVertical = {
  marginTop: "0",
  marginBottom: "0",
};

interface PartProps {
  coursePart: CoursePart;
}

const Part = ({ coursePart }: PartProps): JSX.Element => {
  interface BasicProps {
    name: string;
    exerciseCount: number;
  }

  const Basic = (props: BasicProps): JSX.Element => {
    return (
      <>
        <h3 style={marginBottom}>
          {props.name} {props.exerciseCount}
        </h3>
      </>
    );
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (coursePart.kind) {
    case "basic":
      return (
        <div>
          <Basic
            name={coursePart.name}
            exerciseCount={coursePart.exerciseCount}
          />
          <p style={marginTop}>{coursePart.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <Basic
            name={coursePart.name}
            exerciseCount={coursePart.exerciseCount}
          />
          <p style={marginTop}>
            Projects exercises: {coursePart.groupProjectCount}
          </p>
        </div>
      );
    case "background":
      return (
        <div>
          <Basic
            name={coursePart.name}
            exerciseCount={coursePart.exerciseCount}
          />
          <p style={marginVertical}>{coursePart.description}</p>
          <p style={marginTop}>
            submit to:{" "}
            <a
              href={coursePart.backgroundMaterial}
              target="_blank"
              rel="noreferrer"
            >
              {coursePart.backgroundMaterial}
            </a>
          </p>
        </div>
      );
    case "special":
      return (
        <div>
          <Basic
            name={coursePart.name}
            exerciseCount={coursePart.exerciseCount}
          />
          <p style={marginVertical}>{coursePart.description}</p>
          <p style={marginTop}>
            Required skills: <b>{coursePart.requirements.join(", ")}</b>
          </p>
        </div>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;

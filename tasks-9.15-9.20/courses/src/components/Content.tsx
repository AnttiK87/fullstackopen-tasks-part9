import Part from "./Part";
import { CoursePart } from "../App";

/*task 9.15
interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: Array<CoursePart>;
}*/

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps): JSX.Element => {
  return (
    <>
      {courseParts.map((coursePart) => (
        <Part key={coursePart.name} coursePart={coursePart} />
      ))}
    </>
  );
};

export default Content;

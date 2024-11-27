interface TotalProps {
  totalExercises: number;
}

const Total = (props: TotalProps): JSX.Element => {
  return (
    <>
      <p>
        Number of exercises <b>{props.totalExercises}</b>
      </p>
    </>
  );
};

export default Total;

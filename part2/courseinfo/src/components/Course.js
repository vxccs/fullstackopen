const Header = ({ name }) => <h2>{name}</h2>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part part={part} key={part.id} />
    ))}
  </div>
);

const Total = ({ parts }) => {
  const sum = parts.reduce((prev, current) => prev + current.exercises, 0);
  return (
    <p>
      <strong>total of {sum} exercises</strong>
    </p>
  );
};

const Course = ({ course }) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

export default Course;

import { CourseContent } from '../types';

const Total = ({ parts }: { parts: CourseContent[] }) => {
  return (
    <p>Number of exercises {parts.reduce((p, c) => p + c.exerciseCount, 0)}</p>
  );
};
export default Total;

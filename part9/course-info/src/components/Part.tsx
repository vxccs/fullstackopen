import { CoursePart } from '../types';
import { assertError } from '../utils';

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </p>
          <p>
            <em>{part.description}</em>
          </p>
        </div>
      );
    case 'group':
      return (
        <div>
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </p>
          <p>project exercises: {part.groupProjectCount}</p>
        </div>
      );
    case 'background':
      return (
        <div>
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </p>
          <p>
            <em>{part.description}</em>
          </p>
          <p>{part.backgroundMaterial}</p>
        </div>
      );
    case 'skills':
      return (
        <div>
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </p>
          <p>
            <em>{part.description}</em>
          </p>
          <p>requires skills: {part.requirements.join(', ')}</p>
        </div>
      );
    default:
      return assertError(part);
  }
};
export default Part;

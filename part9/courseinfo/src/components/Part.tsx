import React from 'react';
import { CoursePart } from '../types';

// renders attributes of each type of course part
const Part = ({ part }: { part: CoursePart }): JSX.Element => {
  // helper function for exhaustive type checking
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.type) {
    case 'normal':
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
    case 'groupProject':
      return (
        <div>
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </p>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      );
    case 'submission':
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
          <p>{part.exerciseSubmissionLink}</p>
        </div>
      );
    case 'special':
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
          <p>
            required skills:{' '}
            {part.requirements.map((req) => (
              <span key={req}>{req} </span>
            ))}
          </p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;

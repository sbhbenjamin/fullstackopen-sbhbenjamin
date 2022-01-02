import React from 'react';
import Part from './components/Part';
import { CoursePart } from './types';

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is the leisured course part',
      type: 'normal',
    },
    {
      name: 'Advanced',
      exerciseCount: 7,
      description: 'This is the harded course part',
      type: 'normal',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      type: 'groupProject',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
      type: 'submission',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      type: 'special',
    },
  ];

  // renders name of the course
  const Header = ({ courseName }: { courseName: string }) => {
    return <h1>{courseName}</h1>;
  };

  interface CourseProps {
    courseParts: Array<CoursePart>;
  }

  // renders names of different parts and exercises in each part
  const Content = ({ courseParts }: CourseProps) => {
    return (
      <div>
        {courseParts.map((course) => (
          <div key={course.name}>
            <Part part={course} />
          </div>
        ))}
      </div>
    );
  };

  // renders total sum of exercises in all parts
  const Total = ({ courseParts }: CourseProps) => {
    return (
      <p>
        Number of exercises{' '}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    );
  };

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;

import React from 'react';
import Part from './Part';

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, i) => {
        return <Part key={part + i} part={part} />;
      })}
    </div>
  );
};

export default Content;

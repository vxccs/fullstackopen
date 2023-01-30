import React from 'react';

const Total = ({ parts }) => {
  return (
    <div>
      <strong>total of {parts.reduce((p, c) => p + c.exercises, 0)} exercises</strong>
    </div>
  );
};

export default Total;

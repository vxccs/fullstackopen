import React from 'react';

const FormInput = ({ name, spread }) => {
  return (
    <input
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      id={name}
      name={name}
      {...spread}
    />
  );
};

export default FormInput;

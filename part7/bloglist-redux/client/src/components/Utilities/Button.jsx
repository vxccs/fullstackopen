import React from 'react';

const Button = ({ onClick, label, type = 'button', variant = 'primary' }) => {
  const buttonClass =
    variant === 'primary'
      ? 'rounded-lg bg-indigo-500 px-2 py-1 capitalize text-white transition-colors hover:bg-indigo-600 w-max flex-shrink-0'
      : 'rounded-lg border border-indigo-500 px-2 py-1 capitalize text-indigo-500 transition-colors hover:bg-indigo-600 hover:text-white w-max flex-shrink-0';

  return (
    <button className={buttonClass} onClick={onClick} type={type}>
      {label}
    </button>
  );
};

export default Button;

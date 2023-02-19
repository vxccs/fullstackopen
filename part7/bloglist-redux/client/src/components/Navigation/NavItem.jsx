import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ text, path }) => {
  return (
    <NavLink
      className={({ isActive }) => {
        const c = 'capitalize text-sm rounded-md px-2 py-1';
        return isActive
          ? `${c} bg-gray-300`
          : `${c}  text-gray-500 transition-colors duration-300 hover:bg-gray-300 hover:text-black`;
      }}
      to={path}
    >
      {text}
    </NavLink>
  );
};

export default NavItem;

import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ styles }) => (
  <Link
    to='/register'
    className={`py-5 px-6 font-poppins text-primary bg-blue-gradient rounded-[10px] ${styles}`}>
    Get Started
  </Link>
);

export default Button;

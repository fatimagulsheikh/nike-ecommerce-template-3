import React from 'react';

interface ButtonProps {
  onClick?: () => Promise<void> | void;
  disabled?: boolean;
  children: React.ReactNode;
  text?: string;
  classNames?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled, children, classNames }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-black mb-4 px-4 text-white text-center cursor-pointer hover:bg-transparent border-2 border-black hover:text-black transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ${classNames}`}
    >
      {children}
    </button>
  );
};

export default Button;
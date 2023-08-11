"use client";

import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button = ({ 
   children, 
   type, 
   fullWidth = false,
   onClick,
   secondary,
   danger,
   disabled
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `
   flex
   justify-center
   rounded-md
   py-2
   px-3
   text-sm
   font-semibold
   focus-visible:outline
   focus-visible:outline-2
   focus-visible:outline-offset-2
   `,
        disabled && "opacity-50 cursor-default bg-sky-400",
        fullWidth && "w-full",
        secondary ? "text-gray-900" : "text-white",
        danger &&
          "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600 transition-colors",
        !secondary &&
          !danger &&
          !disabled&&
          "bg-sky-400 hover:bg-sky-500 focus-visible:outline-sky-600 transition-colors"
      )}
    >
      {children}
    </button>
  );
};

export default Button;

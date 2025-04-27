import React from "react";

export const Button = ({ children, variant = "default", className = "", ...props }) => {
  const baseStyle = "px-4 py-2 rounded-md font-medium transition-colors";
  const variantStyle =
    variant === "outline"
      ? "border border-gray-300 text-gray-700 hover:bg-gray-50"
      : "bg-indigo-600 text-white hover:bg-indigo-700";

  return (
    <button className={` cursor-pointer ${baseStyle} ${variantStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};

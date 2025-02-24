import React from "react";

export const Input = (props) => {
  return (
    <input
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      {...props}
    />
  );
};

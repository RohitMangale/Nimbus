"use client";

import React, { useState } from "react";

export const Select = ({ options, defaultValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue || options[0]);

  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
    if (onChange) onChange(value);
  };

  return (
    <div className="relative">
      <button
        className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue}
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <li
              key={option}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

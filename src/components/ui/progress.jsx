import React from "react";

const Progress = ({ value, className }) => {
  return (
    <div className={`relative w-full h-2 bg-gray-200 rounded ${className}`}>
      <div
        className="absolute h-full bg-blue-500 rounded transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export { Progress };

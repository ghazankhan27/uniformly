import React from "react";

export default function InputField({ label, type, placeholder }) {
  return (
    <div className="flex space-x-6 justify-between items-center">
      <p>{label}</p>
      <input
        className="p-2 bg-neutral-200 border border-slate-800 focus:bg-slate-50"
        type={type}
        placeholder={placeholder}
      ></input>
    </div>
  );
}

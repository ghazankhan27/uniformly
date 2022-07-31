import React from "react";

export default function InputField({
  label,
  type,
  placeholder,
  value,
  changeHandler,
  valid,
  errorMessage,
}) {
  return (
    <div className="flex flex-col space-y-2">
      <p className="font-bold">{label}</p>
      <input
        onChange={changeHandler}
        value={value}
        className="p-2 bg-neutral-100 border border-slate-800 focus:bg-slate-50 rounded"
        type={type}
        placeholder={placeholder}
      ></input>
      {valid && (
        <p className="mt-1 mb-3 text-sm text-red-600 font-semibold">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

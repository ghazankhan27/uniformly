import React from "react";

export default function Button({ label, clickHandler }) {
  return (
    <button
      onClick={clickHandler}
      className="border border-blue-700 py-2 px-8 bg-blue-500 transition hover:bg-blue-900 text-neutral-200 rounded"
    >
      {label}
    </button>
  );
}

import React from "react";

export default function Button({ label, clickHandler }) {
  return (
    <button
      onClick={clickHandler}
      className="border border-orange-700 py-2 px-8 bg-orange-400 text-slate-900 transition hover:bg-orange-900 hover:text-neutral-200 rounded"
    >
      {label}
    </button>
  );
}

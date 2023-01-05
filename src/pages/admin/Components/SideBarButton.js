import React from "react";

export const SideBarButton = ({ children, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
      w-full
      text-left
      px-2 py-1
      rounded
      ${selected && "shadow-sm bg-slate-300"}  
      `}
    >
      {children}
    </button>
  );
};

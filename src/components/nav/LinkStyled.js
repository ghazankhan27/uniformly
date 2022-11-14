import React from "react";
import { Link } from "react-router-dom";

export default function LinkStyled({ path, label, toggleNav }) {
  return (
    <Link
      onClick={toggleNav}
      className="hover:underline hover:text-blue-600"
      to={path}
    >
      {label}
    </Link>
  );
}

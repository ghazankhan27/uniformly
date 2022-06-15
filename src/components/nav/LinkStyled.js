import React from "react";
import { Link } from "react-router-dom";

export default function LinkStyled({ path, label, toggleNav }) {
  return (
    <Link
      onClick={toggleNav}
      className="hover:underline hover:text-orange-200"
      to={path}
    >
      {label}
    </Link>
  );
}

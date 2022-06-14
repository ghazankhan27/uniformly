import React from "react";
import { Link } from "react-router-dom";

export default function LinkStyled({ path, label }) {
  return (
    <Link
      className="hover:underline hover:text-orange-200 transition"
      to={path}
    >
      {label}
    </Link>
  );
}

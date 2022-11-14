import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to={"/"}>
      <div className="self-start hover:text-blue-600 transition">
        <p>Uniformly</p>
      </div>
    </Link>
  );
}

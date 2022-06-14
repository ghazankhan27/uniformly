import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to={"/"}>
      <div className="border p-2 self-start md:p-4 hover:border-orange-300 hover:text-orange-300 transition rounded-xl">
        <p>Uniformly</p>
      </div>
    </Link>
  );
}

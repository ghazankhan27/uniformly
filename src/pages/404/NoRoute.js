import React from "react";
import { Link } from "react-router-dom";

export default function NoRoute() {
  return (
    <div className="flex-col w-screen h-screen flex justify-center items-center bg-neutral-100 space-y-2">
      <p className="text-2xl font-semibold">
        The page you were looking for does not exist.
      </p>
      <Link className="text-blue-600 text-xl hover:underline" to="/">
        Go back to home page?
      </Link>
    </div>
  );
}

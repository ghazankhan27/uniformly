import React from "react";
import LinksList from "./LinksList";
import Logo from "./Logo";

export default function NavBar() {
  return (
    <div className="nav-animate flex md:items-center justify-between text-lg py-3 px-2 md:px-20 bg-white shadow-sm shadow-slate-300">
      <Logo></Logo>
      <LinksList></LinksList>
    </div>
  );
}

import React, { useEffect } from "react";
import LinksList from "./LinksList";
import Logo from "./Logo";

export default function NavBar() {
  return (
    <div className="nav-animate flex md:items-center justify-between text-xl md:text-2xl py-4 px-2 md:px-20 bg-orange-700 text-neutral-100 border-b border-slate-900">
      <Logo></Logo>
      <LinksList></LinksList>
    </div>
  );
}

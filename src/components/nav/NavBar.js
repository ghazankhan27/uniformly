import React from "react";
import LinksList from "./components/LinksList";
import Logo from "./components/Logo";

export default function NavBar() {
  return (
    <div className="flex items-center justify-between text-2xl py-4 px-20 bg-orange-700 text-neutral-100 border-b border-slate-900">
      <Logo></Logo>
      <LinksList></LinksList>
    </div>
  );
}

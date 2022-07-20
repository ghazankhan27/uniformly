import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import LinkStyled from "./LinkStyled";
import { useSelector } from "react-redux/es/hooks/useSelector";

export default function LinksList() {
  const auth = useSelector((state) => state.auth.authorized);

  const [show, setShow] = useState("hidden");

  const toggleHidden = () => {
    if (show === "hidden") setShow("");
    else setShow("hidden");
  };

  const hamburgerIcon = () => {
    return (
      <AiOutlineMenu
        onClick={toggleHidden}
        className="text-2xl md:hidden hover:cursor-pointer"
      ></AiOutlineMenu>
    );
  };

  return (
    <div className="flex flex-col items-end md:mt-0 mt-3">
      {hamburgerIcon()}
      <ul
        className={
          show +
          " md:flex flex flex-col items-end md:flex-row md:space-x-10 mt-3 md:mt-0 space-y-1 md:space-y-0"
        }
      >
        <li>
          <LinkStyled
            toggleNav={toggleHidden}
            path={"/"}
            label={"Home"}
          ></LinkStyled>
        </li>
        <li>
          <LinkStyled
            toggleNav={toggleHidden}
            path={"/about"}
            label={"About"}
          ></LinkStyled>
        </li>
        <li>
          <LinkStyled
            toggleNav={toggleHidden}
            path="/profile"
            label={auth ? "Profile" : "Login"}
          ></LinkStyled>
        </li>
      </ul>
    </div>
  );
}

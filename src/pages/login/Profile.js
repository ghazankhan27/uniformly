import React from "react";
import { useSelector } from "react-redux";
import Data from "./Data";
import LoginSignup from "./LoginSignup";

export default function Profile() {
  const auth = useSelector((state) => state.auth.authorized);
  return <>{auth ? <Data></Data> : <LoginSignup></LoginSignup>}</>;
}

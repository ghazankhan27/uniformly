import React from "react";
import { useSelector } from "react-redux";
import Data from "./Data";
import Login from "./Login";

export default function Profile() {
  const auth = useSelector((state) => state.auth.authorized);
  return <>{auth ? <Data></Data> : <Login></Login>}</>;
}

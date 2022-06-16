import React from "react";
import { useDispatch } from "react-redux";
import Button from "../../components/Button";
import { setAuth } from "../../redux/slices/AdminAuthSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(setAuth(false));
  };

  return (
    <div>
      <p>Welcome to dashboard</p>
      <Button clickHandler={logout} label={"Logout"}></Button>
    </div>
  );
}

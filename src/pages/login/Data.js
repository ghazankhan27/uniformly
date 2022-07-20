import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { setAuth, setName } from "../../redux/slices/AuthSlice";
import Button from "../../components/Button";

export default function Data() {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.auth.name);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(setAuth(false));
    dispatch(setName(null));
  };

  return (
    <div className="fade-in flex flex-col items-center space-y-10">
      <div className="border-b border-slate-900 w-full text-center md:text-left">
        <p className="text-4xl">{"Welcome " + name}</p>
      </div>
      <Button clickHandler={logout} label="Logout"></Button>
    </div>
  );
}

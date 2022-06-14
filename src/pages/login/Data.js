import React from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { setAuth, setName } from "../../redux/slices/AuthSlice";
export default function Data() {
  const dispatch = useDispatch();
  return (
    <div>
      <p>Data</p>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          dispatch(setAuth(false));
          dispatch(setName(""));
        }}
        className=""
      >
        Logout
      </button>
    </div>
  );
}

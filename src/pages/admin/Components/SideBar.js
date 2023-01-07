import React from "react";
import { SideBarButton } from "./SideBarButton";
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../redux/slices/AdminAuthSlice";

export const SideBar = ({ setSelected, selected }) => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(setAuth(false));
  };

  return (
    <div
      className={`
      px-4 py-2 
      bg-slate-200
      shadow-md
      shadow-slate-300
      `}
    >
      <p className="text-lg font-semibold w-full border-b border-black text-center mb-10">
        Uniformly
      </p>
      <ul className="grid gap-y-2">
        <li>
          <SideBarButton
            onClick={() => setSelected(0)}
            selected={selected === 0}
          >
            Home
          </SideBarButton>
        </li>
        <li>
          <SideBarButton
            onClick={() => setSelected(1)}
            selected={selected === 1}
          >
            Add University
          </SideBarButton>
        </li>
        <li>
          <SideBarButton
            onClick={() => setSelected(2)}
            selected={selected === 2}
          >
            Departments
          </SideBarButton>
        </li>
        {/* <li>
          <SideBarButton
            onClick={() => setSelected(3)}
            selected={selected === 3}
          >
            Users
          </SideBarButton>
        </li> */}
        <li>
          <SideBarButton
            onClick={() => setSelected(4)}
            selected={selected === 4}
          >
            Profile
          </SideBarButton>
        </li>
        <li className="mt-10">
          <SideBarButton onClick={logout} selected={selected === 5}>
            <div className="flex items-center gap-x-1 font-semibold">
              <BiLogOut size={18} />
              Logout
            </div>
          </SideBarButton>
        </li>
      </ul>
    </div>
  );
};

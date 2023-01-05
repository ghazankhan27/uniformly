import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/slices/AdminAuthSlice";
import { SideBarButton } from "./Components/SideBarButton";
import { AiFillDelete } from "react-icons/ai";
import { GoPencil } from "react-icons/go";
import { BiLogOut } from "react-icons/bi";
import { IoMdCloseCircle } from "react-icons/io";
import { useGetAllUniversities } from "../../hooks/useGetAllUniversities";
import { TableHeading } from "./Components/TableHeading";
import { TableData } from "./Components/TableData";
import { ChangeButton } from "./Components/ChangeButton";
import { deleteUniversity } from "./Api/DeleteUniversity";
import { EditUniversityForm } from "./Components/EditUniversityForm";
import { AddUniversityForm } from "./Components/AddUniversityForm";

export default function Dashboard() {
  const { data, loading, getData } = useGetAllUniversities();

  const dispatch = useDispatch();

  const [selected, setSelected] = useState(0);
  const [editRowNumber, setEditRowNumber] = useState(-1);

  const logout = () => {
    dispatch(setAuth(false));
  };

  return (
    <div>
      <div className="grid grid-cols-12 gap-x-2">
        <div
          className={`
          col-span-2
          `}
        >
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
              <li>
                <SideBarButton
                  onClick={() => setSelected(3)}
                  selected={selected === 3}
                >
                  Users
                </SideBarButton>
              </li>
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
        </div>
        <div className="col-span-10">
          <div className="px-2">
            <div
              className={`
              ${selected === 0 ? "block" : "hidden"}
              `}
            >
              <table className="w-full">
                <thead>
                  <tr>
                    <TableHeading>Title</TableHeading>
                    <TableHeading>Location</TableHeading>
                    <TableHeading>Department</TableHeading>
                    <TableHeading>Contact</TableHeading>
                    <TableHeading>Programs</TableHeading>
                    <TableHeading />
                  </tr>
                </thead>
                {loading ? (
                  <p>Loading</p>
                ) : (
                  <tbody>
                    {data.map((item, index) => {
                      return (
                        <>
                          <tr
                            key={item.id}
                            className={`
                        ${index % 2 !== 0 && "bg-slate-200"}
                        `}
                          >
                            <TableData>{item.name}</TableData>
                            <TableData>{item.address}</TableData>
                            <TableData>Dept</TableData>
                            <TableData>{item.contact}</TableData>
                            <TableData>{item.degree}</TableData>
                            <TableData>
                              <div>
                                {editRowNumber === item.id ? (
                                  <ChangeButton
                                    onClick={() => setEditRowNumber(-1)}
                                  >
                                    <IoMdCloseCircle />
                                  </ChangeButton>
                                ) : (
                                  <ChangeButton
                                    onClick={() => setEditRowNumber(item.id)}
                                    color={"blue"}
                                  >
                                    <GoPencil />
                                  </ChangeButton>
                                )}

                                <ChangeButton
                                  onClick={async () => {
                                    await deleteUniversity(item.id);
                                    getData();
                                  }}
                                  color={"red"}
                                >
                                  <AiFillDelete />
                                </ChangeButton>
                              </div>
                            </TableData>
                          </tr>
                          <tr
                            className={`${
                              editRowNumber !== item.id && "hidden"
                            }`}
                          >
                            <EditUniversityForm
                              item={item}
                              getData={getData}
                              setEditRowNumber={setEditRowNumber}
                            />
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                )}
              </table>
            </div>
          </div>
          <div
            className={`
            ${selected === 1 ? "block" : "hidden"}
            `}
          >
            <AddUniversityForm getData={getData} />
          </div>
        </div>
      </div>
    </div>
  );
}

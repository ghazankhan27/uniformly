import React, { useState } from "react";
import { useGetAllDepartments } from "../Hooks/useGetAllDepartments";
import { AddDepartmentForm } from "./AddDepartmentForm";
import { TableData } from "./TableData";
import { TableHeading } from "./TableHeading";
import { AiFillDelete } from "react-icons/ai";
import { GoPencil } from "react-icons/go";
import { IoMdCloseCircle } from "react-icons/io";
import { ChangeButton } from "./ChangeButton";
import { EditDepartmentForm } from "./EditDepartmentForm";
import { deleteDepartment } from "../Api/DeleteDepartment";

export const Departments = () => {
  const { data, loading, getData } = useGetAllDepartments();
  const [editRowNumber, setEditRowNumber] = useState(-1);

  return (
    <>
      <p className="font-bold text-center text-lg">Departments</p>
      <hr className="mb-4" />
      <div className="grid grid-cols-2 gap-x-4">
        <div className="px-8 border-r">
          <DepartmentsTable
            getData={getData}
            data={data}
            loading={loading}
            editRowNumber={editRowNumber}
            setEditRowNumber={setEditRowNumber}
          />
        </div>
        <div>
          <AddDepartmentForm getData={getData} />
        </div>
      </div>
    </>
  );
};

const DepartmentsTable = ({
  loading,
  data,
  getData,
  editRowNumber,
  setEditRowNumber,
}) => {
  return (
    <table className="w-full table-fixed">
      <thead>
        <tr>
          <TableHeading>ID</TableHeading>
          <TableHeading>Name</TableHeading>
          <TableHeading />
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <p>Loading</p>
        ) : (
          data.map((item) => (
            <>
              <tr>
                <TableData>{item.id}</TableData>
                <TableData>{item.name}</TableData>
                <TableData>
                  <div>
                    {editRowNumber === item.id ? (
                      <ChangeButton onClick={() => setEditRowNumber(-1)}>
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
                        await deleteDepartment(item.id);
                        getData();
                      }}
                      color={"red"}
                    >
                      <AiFillDelete />
                    </ChangeButton>
                  </div>
                </TableData>
              </tr>
              <tr className={`${editRowNumber !== item.id && "hidden"}`}>
                <TableData colspan={3}>
                  <EditDepartmentForm
                    setEditRowNumber={setEditRowNumber}
                    item={item}
                    getData={getData}
                  />
                </TableData>
              </tr>
            </>
          ))
        )}
      </tbody>
    </table>
  );
};

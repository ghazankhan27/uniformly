import React, { useState } from "react";
import { ChangeButton } from "./ChangeButton";
import { EditUniversityForm } from "./EditUniversityForm";
import { TableData } from "./TableData";
import { TableHeading } from "./TableHeading";
import { AiFillDelete } from "react-icons/ai";
import { GoPencil } from "react-icons/go";
import { IoMdCloseCircle } from "react-icons/io";
import { deleteUniversity } from "../Api/DeleteUniversity";

export const UniversitiesTable = ({ data, loading, getData }) => {
  const [editRowNumber, setEditRowNumber] = useState(-1);

  return (
    <>
      <p className="text-center font-bold text-lg">All Univeristies</p>
      <hr className="mb-4" />
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
                    <TableData>{item.d_name}</TableData>
                    <TableData>{item.contact}</TableData>
                    <TableData>{item.degree}</TableData>
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
                  <tr className={`${editRowNumber !== item.id && "hidden"}`}>
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
    </>
  );
};

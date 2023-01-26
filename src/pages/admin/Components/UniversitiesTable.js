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
    <div>
      <div className={`${editRowNumber !== -1 && "hidden"}`}>
        <p className="text-let font-bold text-lg px-10">All Univeristies</p>
        <hr className="mb-4" />
        <table className="w-full">
          <thead>
            <tr>
              <TableHeading>Title</TableHeading>
              <TableHeading>Location</TableHeading>
              <TableHeading>Contact</TableHeading>
              <TableHeading>Departments</TableHeading>
              <TableHeading />
            </tr>
          </thead>
          {data && (
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
                      <TableData>{item.contact}</TableData>
                      <TableData>
                        <p>
                          {item.departments.map((item, index) => (
                            <span key={index}>
                              {item.name} <br />
                            </span>
                          ))}
                        </p>
                      </TableData>
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
                  </>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
      {editRowNumber !== -1 && (
        <div>
          <p className="px-10 first-letter:text-let font-bold text-lg">
            Edit Univerisity
          </p>
          <hr />
          <EditUniversityForm
            id={editRowNumber}
            item={data && data.find((item) => item.id === editRowNumber)}
            closeForm={() => setEditRowNumber(-1)}
            getData={getData}
          />
        </div>
      )}
    </div>
  );
};

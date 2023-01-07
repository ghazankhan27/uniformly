import React, { useState } from "react";
import { useGetAllUniversities } from "../../hooks/useGetAllUniversities";
import { AddUniversityForm } from "./Components/AddUniversityForm";
import { UniversitiesTable } from "./Components/UniversitiesTable";
import { SideBar } from "./Components/SideBar";
import { Departments } from "./Components/Departments";

export default function Dashboard() {
  const { data, loading, getData } = useGetAllUniversities();

  const [selected, setSelected] = useState(0);

  return (
    <div>
      <div className="grid grid-cols-12 gap-x-2">
        <div className="col-span-2">
          <SideBar selected={selected} setSelected={setSelected} />
        </div>
        <div className="col-span-10">
          <div className={`px-2 ${selected !== 0 && "hidden"}`}>
            <UniversitiesTable
              getData={getData}
              loading={loading}
              data={data}
            />
          </div>
          <div className={`${selected !== 1 && "hidden"}`}>
            <AddUniversityForm getData={getData} />
          </div>
          <div className={`${selected !== 2 && "hidden"}`}>
            <Departments />
          </div>
        </div>
      </div>
    </div>
  );
}

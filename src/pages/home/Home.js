import HomeContainer from "./components/HomeContainer";
import styles from "./home.module.css";
import { useGetAllUniversities } from "../../hooks/useGetAllUniversities";
import UniversityCard from "./components/UniversityCard";
import { useState } from "react";

export default function Home() {
  const { data, loading } = useGetAllUniversities();

  const [nameFilter, setNameFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [programmeFilter, setProgrammeFilter] = useState("");

  function filterUniversities(item) {
    if (
      nameFilter.length <= 0 &&
      departmentFilter.length <= 0 &&
      programmeFilter.length <= 0
    )
      return true;

    const filterName = item.name
      .toLowerCase()
      .includes(nameFilter.toLowerCase());

    const filterDept = item.departments.find((item) =>
      item.name.toLowerCase().includes(departmentFilter.toLowerCase())
    )
      ? true
      : false;

    const allProgs = new Set();

    item.departments.forEach((item) => {
      item.programs.forEach((item) => {
        if (typeof item === "object" && item !== null)
          allProgs.add(item.name.toLowerCase());
        if (typeof item === "string") allProgs.add(item.toLowerCase());
      });
    });

    const progFilter = [...allProgs].find((item) =>
      item.includes(programmeFilter.toLowerCase())
    );

    return filterName && filterDept && progFilter;
  }

  return (
    <HomeContainer>
      <div className="img-div flex justify-center items-center relative">
        <div className={`${styles["bg-image"]}`} />
        <div className="text-2xl absolute -bottom-6 bg-blue-500 text-white px-36 h-20 flex items-center shadow-md shadow-slate-400">
          <p>Top Universities</p>
        </div>
      </div>
      <div className="w-full grid place-items-center mt-20">
        <p className="mb-4 text-slate-700 font-bold text-lg">Search</p>
        <div className="flex gap-x-10">
          <InputField
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            label="By University Name"
          />
          <InputField
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            label="By Departments"
          />
          <InputField
            value={programmeFilter}
            onChange={(e) => setProgrammeFilter(e.target.value)}
            label="By Programmme"
          />
        </div>
      </div>
      <div className="min-h-screen">
        <div className="grid md:grid-cols-2 px-8 py-20 gap-10">
          {loading && <p>Loading...</p>}
          {data &&
            data
              .filter(filterUniversities)
              .map((item) => (
                <UniversityCard
                  title={item.name}
                  img={`http://localhost:8000/${item.image}`}
                  location={item.address}
                  id={item.id}
                  departments={item.departments}
                />
              ))}
        </div>
      </div>
    </HomeContainer>
  );
}

const InputField = ({ label, value, onChange }) => {
  return (
    <div>
      <p className="font-bold text-sm text-slate-500">{label}</p>
      <input
        className="outline-1 outline-slate-400 outline px-1 py-1 rounded"
        value={value}
        onChange={onChange}
        style={{ width: 300 }}
      />
    </div>
  );
};

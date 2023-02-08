import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function University() {
  const { id } = useParams();

  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterProgramme, setFilterProgramme] = useState("");

  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_HOST}/university/all/${id}`
        );

        if (res.status !== 200) throw Error("University does not exists");

        const data = await res.json();

        setData(data);
      } catch (err) {
        console.log(err);
      } finally {
      }
    }

    /* eslint-disable */
    getData();
  }, []);

  useEffect(() => {
    setFilterProgramme("");
  }, [filterDepartment]);

  return (
    <div>
      {data && (
        <div className="px-20 gap-y-4 grid grid-cols-2">
          <div className="flex flex-col gap-y-10">
            <div>
              <p className="text-2xl font-bold">{data.name}</p>
              <p className="flex items-center text-sm font-semibold text-slate-500">
                <MdLocationOn className="text-blue-500" />
                {data.address}
              </p>
            </div>
            <img
              alt={"university"}
              className="border border-slate-200 rounded"
              style={{ width: 400, height: 400, objectFit: "contain" }}
              src={`${process.env.REACT_APP_HOST}/${data.image}`}
            />
            <p className="text-slate-500 text-sm">{data.description}</p>
            {data.url && (
              <a
                style={{ width: 400 }}
                className="bg-blue-500 text-white text-center shadow-md rounded py-1 hover:opacity-90"
                href={data.url}
                rel="noreferrer"
                target="_blank"
              >
                Visit University Website
              </a>
            )}
          </div>
          <div>
            {data.criteria && (
              <div className="mb-4">
                <p className="font-bold mb-2 text-lg">Admission Criteria</p>
                <ul className=" list-disc list-inside">
                  {data.criteria.split(",").map((item) => (
                    <li>{item.trim()}</li>
                  ))}
                </ul>
              </div>
            )}
            <p className="font-bold mb-2 text-lg">Fee Structure</p>
            <SelectField
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              options={data.departments}
              label="Select Department"
            />
            <div>
              {data.departments
                .filter(
                  (item) =>
                    item.name.toLowerCase() === filterDepartment.toLowerCase()
                )
                .map((item) => (
                  <div className="mt-2">
                    <SelectField
                      value={filterProgramme}
                      onChange={(e) => setFilterProgramme(e.target.value)}
                      options={item.programs}
                      label="Select Programme"
                    />
                    <div className="mt-8">
                      {item.programs
                        .filter((item) => item.name === filterProgramme)
                        .map((item) => (
                          <div>
                            <p className="text-center border-b py-1 mb-4 text-sm font-bold text-slate-600">
                              {item.name}
                              <br />
                              <span className=" font-normal">
                                {item.description}
                              </span>
                            </p>
                            <table className="w-full table-fixed text-center">
                              <thead>
                                <tr className="bg-blue-600 text-white">
                                  <th>Semester</th>
                                  <th>Fee</th>
                                </tr>
                              </thead>
                              <tbody>
                                {item?.semesters
                                  ?.sort((a, b) =>
                                    parseInt(a.num) < parseInt(b.num) ? -1 : 1
                                  )
                                  .map((item, index) => (
                                    <tr
                                      className={`${
                                        index % 2 !== 0
                                          ? "bg-blue-200"
                                          : "bg-slate-100"
                                      }`}
                                    >
                                      <td>{item.num}</td>
                                      <td>Rs {item.fee}</td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const SelectField = ({ options, value, onChange, label }) => {
  return (
    <div>
      <p className="font-semibold text-sm text-slate-500">{label}</p>
      <select
        className="outline-slate-300 outline-1 outline rounded py-1 px-1"
        style={{ width: 400 }}
        value={value}
        onChange={onChange}
      >
        <option value={""} disabled>
          ...
        </option>
        {options.map((item) => (
          <option value={item.name}>{item.name}</option>
        ))}
      </select>
    </div>
  );
};

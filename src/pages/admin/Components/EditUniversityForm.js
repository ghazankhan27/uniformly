import { useEffect, useState } from "react";
import { updateUniversitySubmit } from "../Api/UpdateUniversitySubmit";
import { InputField } from "./InputField";

export const EditUniversityForm = ({ id, getData, closeForm }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`http://localhost:8000/university/all/${id}`);

        if (res.status !== 200) throw Error("University does not exists");

        const data = await res.json();

        setData(data);
      } catch (err) {
        console.log(err);
      } finally {
      }
    }

    getData();
  }, []);

  useEffect(() => {
    console.log(data);
  });

  const [program, setProgram] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState({
    name: "",
    programs: [],
  });
  const [selectedProgram, setSelectedProgram] = useState({
    name: "",
    semesters: [],
  });
  const [departmentObjects, setDepartmentObjects] = useState([]);
  const [semester, setSemester] = useState(1);
  const [semesterFee, setSemesterFee] = useState(0);

  const { status, setStatus } = useClearStatus();

  useEffect(() => {
    if (data) {
      setDepartmentObjects(data.departments);
    }
  }, [data]);

  useEffect(() => {
    if (departmentObjects.length > 0 && selectedDepartment.name === "") {
      setSelectedDepartment(departmentObjects[0]);
    }
  }, [departmentObjects]);

  useEffect(() => {
    if (selectedDepartment.name === "") return;

    if (selectedDepartment.programs.length <= 0) {
      setSelectedProgram({
        name: "",
        semesters: [],
      });
      setSemester(1);
      setSemesterFee(0);
    } else {
      setSelectedProgram(selectedDepartment.programs[0]);
    }
  }, [selectedDepartment]);

  useEffect(() => {
    if (selectedDepartment.name === "") return;

    const found = selectedDepartment.programs.find(
      (item) => item.name === selectedProgram.name
    );

    if (!found) return;

    setSemester(found.semesters[0].num);
    setSemesterFee(found.semesters[0].fee);
  }, [selectedProgram]);

  function addDepartmentToList() {
    if (departmentName.length <= 0) return;

    if (departmentObjects.find((item) => item.name === departmentName)) return;

    const departmentObject = {
      name: departmentName,
      programs: [],
    };

    setDepartmentObjects((state) => [...state, departmentObject]);
    setDepartmentName("");
  }

  function addProgramToDepartment() {
    if (program.length <= 0) return;

    const found = departmentObjects.find(
      (item) => item.name === selectedDepartment.name
    );

    if (!found) return;

    if (found.programs.find((item) => item.name === program)) return;

    let temp = {
      name: program,
      semesters: [
        {
          num: 1,
          fee: 0,
        },
      ],
    };

    found.programs.push(temp);

    setProgram("");
    setSelectedDepartment({ ...found });

    if (selectedProgram === 0) setSelectedProgram(temp);
  }

  // function deleteProgramFromDepartment(value) {
  //   const found = departmentObjects.find(
  //     (item) => item.name === selectedDepartment.name
  //   );

  //   if (!found) return;

  //   found.programs.splice(found.programs.indexOf(value), 1);

  //   setSelectedDepartment({ ...found });
  // }

  function onChangeDepartmentHandler(e) {
    const found = departmentObjects.find(
      (item) => item.name === e.target.value
    );

    setSelectedDepartment({ ...found });
  }

  function onChangeProgramHandler(e) {
    const found = selectedDepartment.programs.find(
      (item) => item.name === e.target.value
    );

    setSelectedProgram({ ...found });
  }

  function semesterChangeHandler(e) {
    if (!selectedProgram) return;

    if (e.target.value > 14 || e.target.value < 1) return;

    const findProgram = selectedDepartment.programs.find(
      (item) => item.name === selectedProgram.name
    );

    const findSemester = findProgram.semesters.find(
      (item) => item.num === parseInt(e.target.value)
    );

    if (findSemester) {
      setSemesterFee(findSemester.fee);
    }

    if (!findSemester) {
      setSemesterFee(0);
      findProgram.semesters.push({
        num: parseInt(e.target.value),
        fee: 0,
      });
    }

    setSemester(parseInt(e.target.value));
  }

  function semesterFeeChangeHandler(e) {
    if (!selectedProgram) return;
    if (e.target.value < 0) return;

    const findProgram = selectedDepartment.programs.find(
      (item) => item.name === selectedProgram.name
    );

    const findSemester = findProgram.semesters.find(
      (item) => item.num === parseInt(semester)
    );

    findSemester.fee = parseInt(e.target.value);
    console.log(findSemester);

    setSemesterFee(e.target.value);
  }

  if (!data) return <></>;

  return (
    <div className="px-10">
      <form
        onSubmit={async (e) => {
          const status = await updateUniversitySubmit(e, id, departmentObjects);
          if (status !== "Success") {
            setStatus(status);
            return;
          }
          getData();
          setStatus(status);
          setTimeout(closeForm, 1000);
        }}
      >
        <div className="grid">
          <button
            type="button"
            style={{ width: 200 }}
            className="rounded my-4 bg-blue-200"
            onClick={() => closeForm()}
          >
            Back
          </button>
          <div className="grid grid-cols-2 place-items-start">
            <div className="grid gap-y-3">
              <Subtitle>Basic Information</Subtitle>
              <InputField
                label="Name"
                options={{
                  defaultValue: data.name,
                  required: true,
                  type: "text",
                  name: "name",
                  placeholder: "Capital University of Science and Technology",
                }}
              />
              <InputField
                label="Address"
                options={{
                  defaultValue: data.address,
                  required: true,
                  type: "text",
                  name: "address",
                  placeholder: "F-7, Islamabad",
                }}
              />
              <InputField
                label="Contact"
                options={{
                  defaultValue: data.contact,
                  required: true,
                  type: "email",
                  name: "contact",
                  placeholder: "hr@cust.edu.pk",
                }}
              />
            </div>
            <div className="grid gap-y-3">
              <Subtitle>Departments</Subtitle>
              <div className="flex items-end gap-x-4">
                <InputField
                  label="Add Departments"
                  options={{
                    type: "text",
                    placeholder: "Computing",
                    value: departmentName,
                    onChange: (e) => setDepartmentName(e.target.value),
                  }}
                />
                <AddButton onClick={addDepartmentToList} />
              </div>
              <div>
                <SelectField
                  label="Departments"
                  value={selectedDepartment.name}
                  options={departmentObjects}
                  onChange={(e) => onChangeDepartmentHandler(e)}
                />
              </div>
              <Subtitle>Programs</Subtitle>
              <div className="flex items-end gap-x-4">
                <InputField
                  label="Add Programs"
                  options={{
                    type: "text",
                    placeholder: "BSCS",
                    onChange: (e) => setProgram(e.target.value),
                    value: program,
                  }}
                />
                <AddButton
                  options={{ disabled: selectedDepartment === 0 }}
                  onClick={addProgramToDepartment}
                />
              </div>
              <div>
                <SelectField
                  label="Programs"
                  options={selectedDepartment?.programs}
                  onChange={(e) => onChangeProgramHandler(e)}
                  value={selectedProgram.name}
                />
              </div>
              <InputField
                label="Add Semester"
                options={{
                  type: "number",
                  placeholder: "0",
                  onChange: (e) => semesterChangeHandler(e),
                  value: semester,
                }}
              />
              <InputField
                label="Add Fee"
                options={{
                  type: "number",
                  placeholder: "12000",
                  onChange: (e) => semesterFeeChangeHandler(e),
                  value: semesterFee,
                }}
              />
            </div>
            <SubmitButton />
          </div>
          <p className="text-center mt-10 font-bold w-full">{status}</p>
        </div>
      </form>
    </div>
  );
};

function useClearStatus() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    setTimeout(() => setStatus(""), 2000);
  }, [status]);

  return { status, setStatus };
}

const SubmitButton = () => {
  return (
    <button
      style={{ width: 400 }}
      className=" mt-12 outline outline-1 outline-blue-600 text-blue-600 py-1 rounded-full hover:bg-blue-600 hover:text-white"
      type="submit"
    >
      Submit
    </button>
  );
};

const AddButton = ({ onClick, options }) => {
  return (
    <button
      {...options}
      style={{ width: 50, height: 30 }}
      className="bg-blue-200 h-fit rounded-md"
      onClick={onClick}
      type="button"
    >
      Add
    </button>
  );
};

const SelectField = ({ value, options, onChange, label }) => {
  return (
    <>
      <p className="text-sm font-semibold text-slate-400">Added {label}</p>
      <select
        style={{ width: 400 }}
        value={value}
        className="outline outline-1 outline-slate-200 focus:outline-slate-500 rounded py-1 px-2"
        onChange={onChange}
      >
        <option value={""} disabled>
          ...
        </option>
        {options &&
          options.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
      </select>
    </>
  );
};

const Subtitle = ({ children }) => {
  return (
    <p
      style={{ width: 400 }}
      className="text-lg font-bold text-slate-600 border-b"
    >
      {children}
    </p>
  );
};

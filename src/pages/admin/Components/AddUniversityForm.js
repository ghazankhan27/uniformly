import { useEffect, useState } from "react";
import { AddUniversitySubmit } from "../Api/AddUniversitySubmit";
import { InputField } from "./InputField";

export const AddUniversityForm = ({ getData }) => {
  const { status, setStatus } = useClearStatus();

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

  useEffect(() => {
    if (departmentObjects.length > 0 && selectedDepartment.name === "") {
      setSelectedDepartment(departmentObjects[0]);
    }
  }, [departmentObjects]);

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

  function deleteProgramFromDepartment(value) {
    const found = departmentObjects.find(
      (item) => item.name === selectedDepartment.name
    );

    if (!found) return;

    found.programs.splice(found.programs.indexOf(value), 1);

    setSelectedDepartment({ ...found });
  }

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

    setSemesterFee(e.target.value);
  }

  useEffect(() => {
    if (selectedDepartment.name === "") return;

    if (selectedDepartment.programs.length <= 0) {
      setSelectedProgram(0);
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

  return (
    <>
      <p className="text-left px-10 font-bold text-lg">Add New Univeristy</p>
      <hr />

      <form
        onSubmit={async (e) => {
          const status = await AddUniversitySubmit(e, departmentObjects);
          setStatus(status);
          getData();
        }}
        className="grid mt-4"
      >
        <div className="grid px-10">
          <div className="grid grid-cols-2 place-items-start">
            <div className="grid gap-y-3">
              <Subtitle>Basic Information</Subtitle>
              <InputField
                label="Name"
                options={{
                  required: true,
                  type: "text",
                  name: "name",
                  placeholder: "Capital University of Science and Technology",
                }}
              />
              <InputField
                label="Address"
                options={{
                  required: true,
                  type: "text",
                  name: "address",
                  placeholder: "F-7, Islamabad",
                }}
              />
              <InputField
                label="Contact"
                options={{
                  required: true,
                  type: "email",
                  name: "contact",
                  placeholder: "hr@cust.edu.pk",
                }}
              />
              <InputField
                label="Image"
                options={{
                  type: "file",
                  name: "image",
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
            <p className="text-center mt-10 font-bold w-fit">{status}</p>
          </div>
        </div>
      </form>
    </>
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
        <option value="" disabled>
          ...
        </option>
        {options &&
          options.map((item) => {
            return (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            );
          })}
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

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
    description: "",
    semesters: [],
  });
  const [departmentObjects, setDepartmentObjects] = useState([]);
  const [programDescription, setProgramDescription] = useState("");
  const [semester, setSemester] = useState(1);
  const [semesterFee, setSemesterFee] = useState(0);

  // Set the first department object as selected if it exists if none is selected

  useEffect(() => {
    if (departmentObjects.length > 0 && selectedDepartment.name === "") {
      setSelectedDepartment(departmentObjects[0]);
    }
  }, [departmentObjects]);

  /**
   * If department is changed, choose the first program
   * in the list for editing if it exists
   * else leave it empty
   */

  useEffect(() => {
    if (selectedDepartment.name === "") return;

    const findDepartment = departmentObjects.find(
      (item) => item.name === selectedDepartment.name
    );

    if (!findDepartment) return;

    if (findDepartment.programs.length <= 0) {
      setSelectedProgram({
        name: "",
        description: "",
        semesters: [],
      });
    } else {
      setSelectedProgram(findDepartment.programs[0]);
    }
  }, [selectedDepartment]);

  /**
   * Get the values of the first semester of selected program
   * for editing
   */

  useEffect(() => {
    if (selectedDepartment.name === "") return;

    const findDepartment = departmentObjects.find(
      (item) => item.name === selectedDepartment.name
    );

    if (!findDepartment) return;

    const found = findDepartment.programs.find(
      (item) => item.name === selectedProgram.name
    );

    if (!found) return;

    console.log(found);

    setSemester(found.semesters[0].num);
    setSemesterFee(found.semesters[0].fee);
    setProgramDescription(found.description);
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
      description: "",
      semesters: [
        {
          num: 1,
          fee: 0,
        },
      ],
    };

    found.programs.push(temp);

    setProgram("");
    // setSelectedDepartment({ ...found });

    if (selectedProgram.name === "") setSelectedProgram(temp);
  }

  function programDescriptionChangeHandler(e) {
    if (!selectedProgram) return;

    const findProgram = selectedDepartment.programs.find(
      (item) => item.name === selectedProgram.name
    );

    if (!findProgram) return;

    findProgram.description = e.target.value;

    setProgramDescription(e.target.value);
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

    const findDepartment = departmentObjects.find(
      (item) => item.name === selectedDepartment.name
    );

    if (!findDepartment) return;

    const findProgram = findDepartment.programs.find(
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

    const department = departmentObjects.find(
      (item) => item.name === selectedDepartment.name
    );

    const findProgram = department.programs.find(
      (item) => item.name === selectedProgram.name
    );

    const findSemester = findProgram.semesters.find(
      (item) => item.num === parseInt(semester)
    );

    findSemester.fee = parseInt(e.target.value);

    setSemesterFee(e.target.value);
  }

  function clearAllFields() {
    setProgram("");
    setDepartmentName("");
    setSelectedDepartment({
      name: "",
      programs: [],
    });
    setSelectedProgram({
      name: "",
      description: "",
      semesters: [],
    });
    setDepartmentObjects([]);
    setProgramDescription("");
    setSemester(1);
    setSemesterFee(0);
  }

  return (
    <>
      <p className="text-left px-10 font-bold text-lg">Add New Univeristy</p>
      <hr />

      <form
        onSubmit={async (e) => {
          const status = await AddUniversitySubmit(e, departmentObjects);
          setStatus(status);
          getData();
          clearAllFields();
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
                label="University Url"
                options={{
                  required: true,
                  type: "text",
                  name: "url",
                  placeholder: "https://xyzuniversity.edu.pk",
                }}
              />
              <InputField
                label="Admission Criteria"
                options={{
                  required: true,
                  type: "text",
                  name: "criteria",
                  placeholder: "3.4 GPA",
                }}
              />
              <div>
                <p className="text-sm font-semibold text-slate-400">
                  University Description
                </p>
                <textarea
                  name="uni_description"
                  required
                  placeholder="This university is one of the best...."
                  style={{
                    width: 400,
                    height: 100,
                    resize: "none",
                    padding: "1px 3px",
                  }}
                />
              </div>
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
              <div>
                <p className="text-sm font-semibold text-slate-400">
                  Program Description
                </p>
                <textarea
                  value={programDescription}
                  onChange={(e) => programDescriptionChangeHandler(e)}
                  disabled={selectedProgram.name === ""}
                  placeholder="This program is...."
                  style={{
                    width: 400,
                    height: 100,
                    resize: "none",
                    padding: "1px 3px",
                  }}
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

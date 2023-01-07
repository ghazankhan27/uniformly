import React, { useEffect, useState } from "react";
import { AddDepartmentSubmit } from "../Api/AddDepartmentSubmit";
import { InputField } from "./InputField";

export const AddDepartmentForm = ({ getData }) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    setTimeout(() => setStatus(""), 1000);
  }, [status]);

  return (
    <>
      <p className="font-semibold mb-4 text-center">Add a new department</p>
      <form
        onSubmit={async (e) => {
          const status = await AddDepartmentSubmit(e);
          setStatus(status);
          getData();
        }}
        className="items-center flex flex-col"
      >
        <InputField
          label="Name"
          options={{
            required: true,
            type: "text",
            name: "name",
            placeholder: "Computing",
          }}
        />
        <button
          style={{ width: 60, height: 30 }}
          className="mt-2 outline outline-1 outline-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white"
          type="submit"
        >
          Add
        </button>
      </form>
      <p className="font-bold text-center mt-5">{status}</p>
    </>
  );
};

import React, { useState } from "react";
import { updateDepartmentSubmit } from "../Api/UpdateDepartmentSubmit";
import { InputField } from "./InputField";

export const EditDepartmentForm = ({ item, getData, setEditRowNumber }) => {
  const [status, setStatus] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        const status = await updateDepartmentSubmit(e, item.id);
        if (status !== "Success") {
          setStatus(status);
          return;
        }
        getData();
        setStatus(status);
        setEditRowNumber(-1);
      }}
      className="items-center flex flex-col bg-slate-300 py-6"
    >
      <InputField
        label="Name"
        options={{
          required: true,
          type: "text",
          name: "name",
          placeholder: "Computing",
          defaultValue: item.name,
        }}
      />
      <button
        style={{ width: 60, height: 30 }}
        className="mt-2 bg-blue-600 text-white rounded-full hover:bg-blue-800"
        type="submit"
      >
        Edit
      </button>
      <p className="mt-4 font-bold">{status}</p>
    </form>
  );
};

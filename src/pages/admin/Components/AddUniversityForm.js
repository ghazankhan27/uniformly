import { useState } from "react";
import { AddUniversitySubmit } from "../Api/AddUniversitySubmit";
import { InputField } from "./InputField";

export const AddUniversityForm = ({ getData }) => {
  const [status, setStatus] = useState("");

  return (
    <>
      <p className="text-center font-bold text-lg">Add New Univeristy</p>
      <hr />
      <form
        onSubmit={async (e) => {
          const status = await AddUniversitySubmit(e);
          setStatus(status);
          getData();
        }}
        className="grid place-items-center gap-y-3 mt-4"
      >
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
          label="Degree"
          options={{
            required: true,
            type: "text",
            name: "degree",
            placeholder: "CS, SE, ..",
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
        <button
          style={{ width: 400 }}
          className="outline outline-1 outline-blue-600 text-blue-600 py-1 rounded-full hover:bg-blue-600 hover:text-white"
          type="submit"
        >
          Submit
        </button>
      </form>
      <p className="text-center mt-10 font-bold ">{status}</p>
    </>
  );
};

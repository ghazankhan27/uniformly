import { useState } from "react";
import { updateUniversitySubmit } from "../Api/UpdateUniversitySubmit";
import { InputField } from "./InputField";
import { TableData } from "./TableData";

export const EditUniversityForm = ({ item, getData, setEditRowNumber }) => {
  const [status, setStatus] = useState("");

  return (
    <TableData colspan={6}>
      <div className="py-4 bg-slate-300">
        <form
          onSubmit={async (e) => {
            const status = await updateUniversitySubmit(e, item.id);
            getData();
            setStatus(status);
            setEditRowNumber(-1);
          }}
          className="grid place-items-center gap-y-3 mt-4"
        >
          <InputField
            label="Name"
            options={{
              defaultValue: item.name,
              required: true,
              type: "text",
              name: "name",
              placeholder: "Capital University of Science and Technology",
            }}
          />
          <InputField
            label="Degree"
            options={{
              defaultValue: item.degree,
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
              defaultValue: item.address,
              type: "text",
              name: "address",
              placeholder: "F-7, Islamabad",
            }}
          />
          <InputField
            label="Contact"
            options={{
              defaultValue: item.contact,
              required: true,
              type: "email",
              name: "contact",
              placeholder: "hr@cust.edu.pk",
            }}
          />
          <button
            style={{ width: 400 }}
            className="text-white py-1 rounded-full bg-blue-600 hover:bg-blue-800"
            type="submit"
          >
            Edit
          </button>
        </form>
        <p className="font-bold mt-4">{status}</p>
      </div>
    </TableData>
  );
};

import { addDepartmentEndpoint } from "../../../services/api";

export const AddDepartmentSubmit = async (e) => {
  e.preventDefault();

  const form = new FormData(e.target);

  try {
    const res = await fetch(addDepartmentEndpoint.url, {
      method: "POST",
      body: form,
    });

    if (res.status !== 201) return "Rejected";

    return "Success";
  } catch (err) {
    return "Network Error";
  } finally {
    e.target.reset();
  }
};

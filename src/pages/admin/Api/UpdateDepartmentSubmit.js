import { updateDepartmentEndpoint } from "../../../services/api";

export const updateDepartmentSubmit = async (e, id) => {
  e.preventDefault();

  console.log(id);

  const form = new FormData(e.target);

  form.append("id", id);

  try {
    const res = await fetch(updateDepartmentEndpoint.url, {
      method: "PUT",
      body: form,
    });

    if (res.status !== 204) return "Rejected";

    return "Success";
  } catch (err) {
    return "Network Error";
  } finally {
    e.target.reset();
  }
};

import { addUniversityEndpoint } from "../../../services/api";

export const AddUniversitySubmit = async (e, departmentObjects) => {
  e.preventDefault();

  const form = new FormData(e.target);
  form.append("departments", JSON.stringify(departmentObjects));

  try {
    const res = await fetch(addUniversityEndpoint.url, {
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

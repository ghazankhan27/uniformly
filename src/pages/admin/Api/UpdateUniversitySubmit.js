import { updateUniversityEndpoint } from "../../../services/api";

export const updateUniversitySubmit = async (e, id) => {
  e.preventDefault();

  const form = new FormData(e.target);

  form.append("id", id);

  try {
    const res = await fetch(updateUniversityEndpoint.url, {
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
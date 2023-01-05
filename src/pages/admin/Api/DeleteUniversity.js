import { deleteUniversityEndpoint } from "../../../services/api";

export const deleteUniversity = async (id) => {
  try {
    const res = await fetch(deleteUniversityEndpoint(id).url, {
      method: "DELETE",
    });

    if (res.status !== 204) return "Rejected";

    return "Success";
  } catch (err) {
    return "Network Error";
  } finally {
  }
};

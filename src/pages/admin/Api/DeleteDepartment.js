import { deleteDepartmentEndpoint } from "../../../services/api";

export const deleteDepartment = async (id) => {
  try {
    const res = await fetch(deleteDepartmentEndpoint(id).url, {
      method: "DELETE",
    });

    if (res.status !== 204) return "Rejected";

    return "Success";
  } catch (err) {
    return "Network Error";
  } finally {
  }
};

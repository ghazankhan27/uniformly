const host = "http://localhost:8000";

export const getAllUniversitiesEndpoint = {
  url: `${host}/university/all`,
};

export const addUniversityEndpoint = {
  url: `${host}/university/add`,
};

export const updateUniversityEndpoint = {
  url: `${host}/university/update`,
};

export const deleteUniversityEndpoint = (id) => {
  return {
    url: `${host}/university/delete/${id}`,
  };
};

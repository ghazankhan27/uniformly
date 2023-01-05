import { useEffect, useState } from "react";
import { getAllUniversitiesEndpoint } from "../services/api";

export const useGetAllUniversities = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);

      const res = await fetch(getAllUniversitiesEndpoint.url);

      if (res.status !== 200) throw new Error("Server Error");

      const data = await res.json();

      setData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    data,
    loading,
    error,
    getData,
  };
};

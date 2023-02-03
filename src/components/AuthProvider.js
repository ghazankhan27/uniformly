import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth, setName } from "../redux/slices/AuthSlice";

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const authenticate = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        if (!token) throw new Error("No token");

        const authorize = await fetch(
          `${process.env.REACT_APP_HOST}/auth/authenticate`,
          {
            method: "POST",
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await authorize.json();

        const auth = { name: data.user.name, auth: data.message };

        dispatch(setAuth(auth.auth));
        dispatch(setName(auth.name));
      } catch (err) {
        console.log("network error");
      } finally {
        setLoading(false);
      }
    };

    authenticate();

    /* eslint-disable */
  }, []);

  return <>{!loading && children}</>;
};

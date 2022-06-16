import "./App.css";
import NavBar from "./components/nav/NavBar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "./redux/slices/AuthSlice";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  const auth = useSelector((state) => state.auth.authorized);
  const dispatch = useDispatch();

  const capitalizeString = (string) => {
    let strings = string.split(" ");
    let name = strings[0];
    const _name = name.charAt(0).toUpperCase() + name.slice(1);

    return _name;
  };

  const getName = () => {
    if (auth) {
      fetch("http://localhost:8000/data/name", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(setName(capitalizeString(data.name)));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  useEffect(getName, [auth, dispatch]);

  return (
    <div className="App bg-orange-100 min-h-screen">
      {loading ? (
        <div className="h-screen w-screen flex justify-center items-center">
          <Loader></Loader>
        </div>
      ) : (
        <>
          <NavBar></NavBar>
          <div className="content md:px-20 px-8 p-10">
            <Outlet></Outlet>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

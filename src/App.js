import "./App.css";
import NavBar from "./components/nav/NavBar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setName, setAuth } from "./redux/slices/AuthSlice";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import { authorizeToken } from "./auth/Authorize";

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    authorizeToken()
      .then((data) => {
        if (data.auth !== true) {
          setLoading(false);
          return;
        }

        dispatch(setAuth(true));
        dispatch(setName(data.name));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <div className="App bg-neutral-100 min-h-screen">
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

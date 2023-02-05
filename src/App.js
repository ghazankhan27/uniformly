import { NavBar } from "./components/nav/NavBar";
import { Outlet, useLocation, useNavigate, useRoutes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { MyPopup } from "./components/MyPopup";
import { useEffect, useState } from "react";

function App() {
  const location = useLocation();

  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      location.pathname !== "/admin" && setShow(true);
    }, 2000);
  }, []);

  return (
    <div className="App bg-neutral-100 min-h-screen">
      <MyPopup show={show}>
        <div>
          <div className="mb-8">
            <p className="text-center font-bold text-lg">
              Welcome to Uniformly
            </p>
            <p className="text-sm my-1">
              Here we provide you with the information about the latest
              <br />
              universities from across the world so you can check all in the
              <br />
              information at a single spot.
            </p>
            <div className="my-4">
              <p className="text-sm text-slate-600 mb-2 text-center">
                Type in your email to subscribe to our weekly letter
              </p>
              <div className="grid place-items-center">
                <input
                  placeholder="johndoe@example.com"
                  type="email"
                  className="outline-black outline-1 outline px-1 py-1 focus:outline-blue-600 text-sm"
                />
              </div>
            </div>
          </div>
          <div className="grid place-items-center">
            <button
              className="bg-blue-600 text-white text-sm px-10 py-1 rounded hover:opacity-80 self-center"
              onClick={() => setShow(false)}
            >
              Close
            </button>
          </div>
        </div>
      </MyPopup>
      <>
        <NavBar></NavBar>
        <div className="content py-10 min-h-screen">
          <Outlet></Outlet>
        </div>
        <Footer />
      </>
    </div>
  );
}

export default App;

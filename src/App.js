import { NavBar } from "./components/nav/NavBar";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="App bg-neutral-100 min-h-screen">
      <>
        <NavBar></NavBar>
        <div className="content md:px-20 px-8 p-10 min-h-screen">
          <Outlet></Outlet>
        </div>
        <Footer />
      </>
    </div>
  );
}

export default App;

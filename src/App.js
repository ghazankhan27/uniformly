import "./App.css";
import NavBar from "./components/nav/NavBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App bg-orange-100 min-h-screen">
      <NavBar></NavBar>
      <div className="content md:px-20 px-8 p-10">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default App;

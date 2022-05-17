import "./App.css";
import NavBar from "./components/nav/NavBar";
import Home from "./pages/Home";
import LoginSignup from "./pages/LoginSignup";

function App() {
  return (
    <div className="App bg-orange-100 min-h-screen">
      <NavBar></NavBar>
      <div className="content px-20">
        <LoginSignup></LoginSignup>
      </div>
    </div>
  );
}

export default App;

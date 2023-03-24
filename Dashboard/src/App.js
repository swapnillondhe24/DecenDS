import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home/Home";
import Reset from "./components/Reset";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

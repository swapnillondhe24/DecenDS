import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home/Home";
import Reset from "./components/Reset";
import Documentation from "./components/Documentation/Documentation";
import Profile from "./components/Profile";
import HostANode from "./components/HostANode/HostANode";
import { PasswordProvider } from "./components/PasswordContext";
import CreateNewPassword from "./components/CreateNewPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <div className="App">
      <Router>
        <PasswordProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/host" element={<HostANode />} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/newpassword" element={<CreateNewPassword />} />
            <Route path="/documentation" element={<Documentation />} />
          </Routes>
        </PasswordProvider>
      </Router>
    </div>
  );
}

export default App;

import Home from "./pages/home/Home";
import Profile from "./pages/profile/profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:username" element={<Profile />} />
        {<Route path="*" element={<Home />} />}
      </Routes>
    </Router>
  );
}

export default App;

import Home from "./pages/home/Home";
import Profile from "./pages/profile/profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./state/AuthContext";

function App() {
  // ユーザーのログイン状態によって状態を遷移する
  const { user } = useContext(AuthContext);
  // <Route path="/" element={user ? <Home /> : <Register />} />　: uesr がなければ登録画面に遷移させてしまう

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:username" element={<Profile />} />
        {<Route path="*" element={<Home />} />}
      </Routes>
    </Router>
  );
}

export default App;

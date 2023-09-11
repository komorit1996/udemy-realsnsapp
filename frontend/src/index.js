import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// 認証状態を保持する
import { AuthContextProvider } from "./state/AuthContext";
// AuthContextProvider で囲うことで context を渡すことが可能
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);

reportWebVitals();

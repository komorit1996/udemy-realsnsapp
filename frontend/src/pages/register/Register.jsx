import "./Register.css";
import React, { useRef, useContext,  } from "react";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const email = useRef(null);
  const password = useRef(null);
  const checkPassword = useRef(null);
  const username = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // password check
    if (password.current.value !== checkPassword.current.value) {
      // FIXME 以下のコードがうまく動作していない
      // passwordConfirmation.current.setCustomValidity("パスワードがあってません。。。");
    } else {
      try {
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        };

        // check
        // console.log(user);

        // ユーザー登録のAPI：register API
        await axios.post("/auth/register", user);
        navigate("/login")
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">REAL SNS</h3>
          <span className="loginDesc">本格的なSNSを、自分の手で。</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
            <p className="loginMessage">新規登録はこちら</p>
            <input
              type="text"
              className="loginInput"
              placeholder="Uer Name"
              required
              ref={username}
            />
            <input
              type="email"
              className="loginInput"
              placeholder="e-mail"
              required
              ref={email}
            />
            <input
              type="password"
              className="loginInput"
              placeholder="password"
              required
              minLength="6"
              ref={password}
            />
            <input
              type="password"
              className="loginInput"
              placeholder="checkPassword"
              required
              minLength="6"
              ref={checkPassword}
            />
            <button className="loginButton" type="submit">
              Singn Up
            </button>
            <button className="loginRegisterButton">Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

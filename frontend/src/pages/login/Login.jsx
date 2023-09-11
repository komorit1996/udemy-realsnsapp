import React, { useRef, useContext } from "react";
import "./Login.css";
import loginCall from "../../ActionCalls";
import { AuthContext } from "../../state/AuthContext";

export const Login = () => {
  const email = useRef();
  const password = useRef();
  
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // test
    // console.log(`Current Value: ${email.current.value}, ${password.current.value}`);

    let emailVal = email.current.value;
    let passVal = password.current.value;

    loginCall({ email: emailVal, password: passVal }, dispatch);
  };

  // 初期値は null が返る
  // console.log(user);
  //

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">REAL SNS</h3>
          <span className="loginDesc">本格的なSNSを、自分の手で。</span>
        </div>
        <div className="loginRight">
          {/*  onSubmit={(e) => handleSubmit(e) で 入力された情報を拾う */}
          <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
            <p className="loginMessage">ログインはこちらから</p>
            <input
              type="email"
              className="loginInput"
              placeholder="e-mail"
              require
              ref={email}
            />
            <input
              type="password"
              className="loginInput"
              placeholder="password"
              require
              minLength="10"
              ref={password}
            />
            <button className="loginButton">Login</button>
            <span className="forgotPw">Forget you'r account</span>
            <button className="loginRegisterButton">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

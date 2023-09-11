import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

// user context の初期値
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  /*   
  user: {
    _id: "64f40b74deb7a815afb19454",
    username: "komocode",
    email: "testuser002@hotmail.com",
    password: "testuser002@hotmail.com",
    profilePicture: "2.jpeg",
    convertPicturer: "4.jpeg",
    followers: [],
    followings: [],
    isAdmin: false,
    city: "",
    desc: "こいつがテストユーザー：64f40b74deb7a815afb19454",
  },
*/
  isFetching: false,
  error: false,
};

// 状態をグローバル管理
export const AuthContext = createContext(initialState);

// state は今の状態を示す
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  // devtool > アプリケーション のローカルストレージから確認が可能
  localStorage.setItem("user", JSON.stringify(state.user));
  // ユーザー状態の変更でユーザーをセット
  useEffect(() => {}, [state.user]);

  // AuthContext.Provider で 現在の共有したい状態を記載する
  // dispathc はどのようなアクションを行ったのかが格納される
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// exports default { AuthContext, AuthContextProvider };

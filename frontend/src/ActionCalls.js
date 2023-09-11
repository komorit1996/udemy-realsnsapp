import axios from "axios";

// dispathc で状態を更新していく
const loginCall = async (user, dispatch) => {
  // hadlesubmit ですぐに呼ばれる
  dispatch({ type: "LOGIN_START" });

  try {
    const response = await axios.post("/auth/login", user);
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (err) {
    dispatch({ type: "LOGIN_ERROR", payload: err });
  }
};

export default loginCall;

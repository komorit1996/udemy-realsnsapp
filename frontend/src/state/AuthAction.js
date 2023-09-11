// ユーザー入力に応じたアクション設定

// LOGIN_START アクションクリエーター
const LoginStart = (user) => ({
  type: "LOGIN_START",
});

// LOGIN_SUCCESS アクションクリエーター
const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

// LOGIN_ERROR アクションクリエーター
const LoginError = (error) => ({
  type: "LOGIN_ERROR",
  payload: error,
});

export { LoginStart, LoginSuccess, LoginError };

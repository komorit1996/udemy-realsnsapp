const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        ifFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        ifFetching: false,
        error: false,
      };
    case "LOGIN_ERROE":
      return {
        user: null,
        ifFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;

/*

default: return state;

*/

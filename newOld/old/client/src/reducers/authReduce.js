const initialState = {
  token: null,
  user: { _id: "" },
  isAuth: false,
};

export default function authReducer(state, action) {
  state = state || initialState;
  switch (action.type) {
    case "AUTH_LOGIN":
      return {
        token: action.payload.token,
        user: action.payload.user,
        isAuth: true,
      };
    case "AUTH_LOGOUT":
      return initialState;
    default:
      return state;
  }
}

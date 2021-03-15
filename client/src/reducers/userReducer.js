const initialState = {
  alluser: null,
};

export default function userReducer(state, action) {
  state = state || initialState;
  switch (action.type) {
    case "ALL_USER":
      return { alluser: action.payload.alluser };

    default:
      return state;
  }
}

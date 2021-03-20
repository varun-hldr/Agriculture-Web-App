const initialState = {
  alluser: null,
  cart: [],
};

export default function userReducer(state, action) {
  state = state || initialState;
  switch (action.type) {
    case "ALL_USER":
      return { ...state, alluser: action.payload.alluser };
    case "CART":
      return { ...state, cart: action.payload.cart };

    default:
      return state;
  }
}

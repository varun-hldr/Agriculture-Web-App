const initialState = {
  alluser: null,
  cart: [],
  products: {
    isLoaded: false,
    data: [],
  },
};

export default function userReducer(state, action) {
  state = state || initialState;
  switch (action.type) {
    case "ALL_USER":
      return { ...state, alluser: action.payload.alluser };
    case "CART":
      return { ...state, cart: action.payload.cart };
    case "SEARCH_RESULT":
      return {
        ...state,
        products: { data: action.payload.products, isLoaded: true },
      };

    default:
      return state;
  }
}

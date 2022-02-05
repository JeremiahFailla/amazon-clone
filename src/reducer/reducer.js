export const initialState = {
  basket: [],
};

// Selector
export const getBasketTotal = (basket) => {
  return basket?.reduce((prevPrice, item) => item.price + prevPrice, 0);
};

export const reducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    default:
      return state;
  }
};

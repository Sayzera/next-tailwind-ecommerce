import { createContext, useReducer } from 'react';
import { cartAddItem } from './functions';

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      return cartAddItem(state, action);
    }
    case 'CART_REMOVE_ITEM': {
      const item = action.payload;
      const cartItems = state.cart.cartItems.filter(
        (x) => x.slug !== item.slug
      );

      return {
        ...state,
        cart: {
          cartItems,
        },
      };
    }
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}

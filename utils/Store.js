import { createContext, useReducer } from 'react';
import { cartAddItem } from './functions';
import Cookies from 'js-cookie';

export const Store = createContext();

const initialState = {
  cart: Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart'))
    : {
        cartItems: [],
        shippingAddress: {},
        paymentMethod: '',
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
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems,
        },
      };
    }
    case 'CART_RESET': {
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: {},
          paymentMethod: '',
        },
      };
    }

    case 'SAVE_SHIPPING_ADDRESS': {
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          },
        },
      };
    }

    case 'SAVE_PAYMENT_METHOD': {
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
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

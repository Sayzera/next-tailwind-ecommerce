import Cookies from 'js-cookie';

export const cartAddItem = (state, action) => {
  const newItem = action.payload;

  console.log(newItem);
  // Check if the item is already in the cart
  const existItem = state.cart.cartItems.find(
    (item) => item.slug == newItem.slug
  );

  // If the item is already in the cart, add the new item
  const cartItems = existItem
    ? state.cart.cartItems.map((item) =>
        item.name === existItem.name ? newItem : item
      )
    : [...state.cart.cartItems, newItem];

  Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
  return {
    ...state,
    cart: { ...state.cart, cartItems },
  };
};

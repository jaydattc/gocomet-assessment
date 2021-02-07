import React, { createContext, useContext, useState } from "react";
import usePersistState from "./usePersistState";

const cartContext = createContext(null);
const { Provider } = cartContext;

const cartActionsContext = createContext(null);
const { Provider: ActionsProvider } = cartActionsContext;

/**
 * Custom hook for cart
 * @returns {object} cart
 */
export const useCart = () => useContext(cartContext);

/**
 * Custom hook for cart methods
 * @returns {function} setCartData
 * @returns {function} setAppliedCart
 */
export const useCartActions = () => useContext(cartActionsContext);

export const CartProvider = ({ children }) => {
  const [cart, _setCart] = useState({
    cartItems: [],
  });
  const [wishlist, _setWishlist] = useState({
    wishlistItems: [],
  });
  const setWishlist = (value) => _setWishlist({ ...wishlist, ...value });
  const setCart = (value) => _setCart({ ...cart, ...value });

  usePersistState({
    key: "cart_details",
    state: cart,
    setStateMethod: _setCart,
  });
  usePersistState({
    key: "wishlist_details",
    state: wishlist,
    setStateMethod: _setWishlist,
  });

  const addCartItem = (value) =>
    _setCart({
      ...cart,
      cartItems: [...cart.cartItems, { ...value, quantity: 1 }],
    });
  const editCartItem = (value) => {
    const index = cart.cartItems.findIndex((item) => item.url === value.url);
    _setCart({
      ...cart,
      cartItems: [
        ...cart.cartItems.slice(0, index),
        value,
        ...cart.cartItems.slice(index + 1),
      ],
    });
  };
  const removeCartItem = (value) => {
    const index = cart.cartItems.findIndex((item) => item.url === value.url);
    _setCart({
      ...cart,
      cartItems: [
        ...cart.cartItems.slice(0, index),
        ...cart.cartItems.slice(index + 1),
      ],
    });
  };
  const addWishlistItem = (value) =>
    _setWishlist({
      ...wishlist,
      wishlistItems: [...wishlist.wishlistItems, value],
    });
  const editWishlistItem = (value) => {
    const index = wishlist.wishlistItems.findIndex(
      (item) => item.url === value.url,
    );
    _setWishlist({
      ...wishlist,
      wishlistItems: [
        ...wishlist.wishlistItems.slice(0, index),
        value,
        ...wishlist.wishlistItems.slice(index + 1),
      ],
    });
  };
  const removeWishlistItem = (value) => {
    const index = wishlist.wishlistItems.findIndex(
      (item) => item.url === value.url,
    );
    _setWishlist({
      ...wishlist,
      wishlistItems: [
        ...wishlist.wishlistItems.slice(0, index),
        ...wishlist.wishlistItems.slice(index + 1),
      ],
    });
  };

  return (
    <ActionsProvider
      value={{
        setCart,
        setWishlist,
        addCartItem,
        editCartItem,
        addWishlistItem,
        editWishlistItem,
        removeCartItem,
        removeWishlistItem,
      }}
    >
      <Provider value={{ cart, wishlist }}>{children}</Provider>
    </ActionsProvider>
  );
};

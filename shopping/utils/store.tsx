import React, { createContext, useReducer } from "react";

import { IProduct } from "../types/app";

/*
https://dev.to/elisealcala/react-context-with-usereducer-and-typescript-4obm
https://youtu.be/9KzQ9xFSAEU
https://www.youtube.com/watch?v=zM_ZiSl2n2E
*/

const initialState: INITIALSTATE = {
  cart: { cartItems: [] },
};

interface INITIALSTATE {
  cart: {
    cartItems: IProduct[];
  };
}

type ACTIONTYPES = { type: "CART_ADD_ITEM"; payload: IProduct };

export const Store = createContext<{
  state: INITIALSTATE;
  dispatch: React.Dispatch<ACTIONTYPES>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: INITIALSTATE = initialState, action: ACTIONTYPES) => {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
};

export const StoreProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

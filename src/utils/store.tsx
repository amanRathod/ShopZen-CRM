import Cookies from 'js-cookie';
import { Product } from '@appTypes/product';
import { createContext, useReducer } from 'react';
import { GlobalState, PaymentMethod } from './constants';

export type CartItem = {
  quantity: number;
} & Product;

const initialState = {
  cart: (() => {
    const cartCookie = Cookies.get('cart');
    if (cartCookie) {
      return JSON.parse(cartCookie);
    } else {
      return {
        cartItems: [],
        shippingAddress: {},
        billingAddress: {},
        paymentMethod: PaymentMethod.CARD,
      };
    }
  })(),
};

export const StoreContext = createContext(initialState);

type Action = {
  type: string;
  payload: any;
};

type State = {
  cart: {
    cartItems: any[];
  };
};

const reducer = (state: State, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case GlobalState.CART_ADD_ITEM: {
      const newItem = payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.id === newItem.id
      );

      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.id === existItem.id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return {
        ...state,
        cart: { ...state.cart, cartItems },
      };
    }

    case GlobalState.CART_REMOVE_ITEM: {
      const cartItems = state.cart.cartItems.filter(
        (item: Product) => item.id !== payload.id
      );

      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return {
        ...state,
        cart: { ...state.cart, cartItems },
      };
    }

    case GlobalState.CART_CLEAR_ITEMS: {
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems: [] }));
      return {
        ...state,
        cart: { ...state.cart, cartItems: [] },
      };
    }

    case GlobalState.SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: payload },
      };

    case GlobalState.SAVE_BILLING_ADDRESS:
      return {
        ...state,
        cart: { ...state.cart, billingAddress: payload },
      };

    case GlobalState.SAVE_PAYMENT_METHOD:
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: payload },
      };
    default:
      return state;
  }
};

const StoreProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value: any = { state, dispatch };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;

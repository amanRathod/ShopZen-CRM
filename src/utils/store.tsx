import Cookies from 'js-cookie';
import { Product } from '@appTypes/product';
import React, { createContext, useReducer } from 'react';
import { GlobalState, PaymentMethod } from './constants';
import { Address } from '@common/types/address';

export type OrderItem = {
  quantity: number;
  product_id: string;
} & Product;

type Order = {
  totalPrice: number;
  paymentMethod: string;
  totalQuantity: number;
};

export type Action = {
  type: string;
  payload: any;
};

export type State = {
  cart: {
    orderItems: OrderItem[];
    order: Order;
    shippingAddress: Address;
    billingAddress: Address;
  };
};

const initialState: State = {
  cart: (() => {
    const cartCookie = Cookies.get('cart');
    if (cartCookie) {
      return JSON.parse(cartCookie);
    } else {
      return {
        orderItems: [] as OrderItem[],
        shippingAddress: {} as Address,
        billingAddress: {} as Address,
        order: {} as Order,
      };
    }
  })(),
};

const updateCartInCookies = (cart: State['cart']) => {
  Cookies.set('cart', JSON.stringify(cart));
};

const reducer = (state: State, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case GlobalState.CART_ADD_ITEM: {
      const newItem = payload;
      const existItem = state.cart.orderItems.find(
        (item) => item.id === newItem.id
      );

      const orderItems = existItem
        ? state.cart.orderItems.map((item) =>
            item.id === existItem.id ? newItem : item
          )
        : [...state.cart.orderItems, newItem];

      updateCartInCookies({ ...state.cart, orderItems });
      return {
        ...state,
        cart: { ...state.cart, orderItems },
      };
    }

    case GlobalState.CART_REMOVE_ITEM: {
      const orderItems = state.cart.orderItems.filter(
        (item: Product) => item.id !== payload.id
      );

      updateCartInCookies({ ...state.cart, orderItems });
      return {
        ...state,
        cart: { ...state.cart, orderItems },
      };
    }

    case GlobalState.CART_CLEAR_ITEMS: {
      updateCartInCookies({ ...state.cart, orderItems: [] });
      return {
        ...state,
        cart: { ...state.cart, orderItems: [] },
      };
    }

    case GlobalState.CART_CLEAR_AFTER_PAYMENT: {
      updateCartInCookies({
        ...state.cart,
        orderItems: [] as OrderItem[],
        shippingAddress: {} as Address,
        billingAddress: {} as Address,
        order: {} as Order,
      });

      return {
        ...state,
        cart: {
          ...state.cart,
          orderItems: [] as OrderItem[],
          shippingAddress: {} as Address,
          billingAddress: {} as Address,
          order: {} as Order,
        },
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
        cart: {
          ...state.cart,
          order: { ...state.cart.order, paymentMethod: payload },
        },
      };

    case GlobalState.SAVE_ORDER:
      return {
        ...state,
        cart: { ...state.cart, order: payload },
      };

    default:
      return state;
  }
};

export type CartState = { state: State; dispatch: React.Dispatch<Action> };

export const StoreContext = createContext<{ state: State; dispatch: React.Dispatch<Action> }>({
  state: initialState,
  dispatch: () => {}
});

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState
  );

  const contextValue = {
    state,
    dispatch
  };

  return (
    <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;

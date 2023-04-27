import { Product } from '@/common/types/product';
import {createContext, useReducer} from 'react';

const initialState = {
   cart: { cartItems: [] },
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
      case 'CART_ADD_ITEM': {
         const newItem = payload;
         const existItem = state.cart.cartItems.find(
            (item) => item.id === newItem.id
         );

         const cartItems = existItem ? state.cart.cartItems.map((item) =>
            item.id === existItem.id ? newItem : item
         ) : [...state.cart.cartItems, newItem];

         return {
            ...state,
            cart: { ...state.cart, cartItems },
         };
      }
      case 'CART_REMOVE_ITEM':
         return {
            ...state,
            cart: {
               cartItems: state.cart.cartItems.filter(
                  (item: Product) => item.id !== payload.id
               ),
            },
         };
      case 'CART_SAVE_SHIPPING_ADDRESS':
         return {
            ...state,
            cart: { ...state.cart, shippingAddress: payload },
         };
      case 'CART_SAVE_PAYMENT_METHOD':
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
   const value:any = { state, dispatch };

   return (
      <StoreContext.Provider value={value}>
         {children}
      </StoreContext.Provider>
   );
};

export default StoreProvider;
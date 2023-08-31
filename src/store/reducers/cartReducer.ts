import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {ProductCart} from '../../types/Cart';

export interface InitialStateType {
  cart: ProductCart[];
}

const initialState: InitialStateType = {
  cart: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartAction(state, action: PayloadAction<ProductCart>) {
      const itemIndex = state.cart.findIndex(
        item => item.id === action.payload.id,
      );

      if (itemIndex >= 0) {
        state.cart.map(i => {
          if (i.id === action.payload.id) {
            i.quantity = i.quantity + action.payload.quantity;

            return;
          }
        });
      }

      if (itemIndex <= -1) {
        state.cart.push({
          id: action.payload.id,
          name: action.payload.name,
          image: action.payload.image,
          userId: action.payload.userId,
          quantity: action.payload.quantity,
          productAvailable: action.payload.productAvailable,
          valueProduct: action.payload.valueProduct,
        });
      }
    },

    setRemoverItemCartAction(state, action: PayloadAction<{id: number}>) {
      const newState = state.cart.filter(cart => cart.id !== action.payload.id);
      state.cart = newState;
    },
  },
});

export const {setCartAction, setRemoverItemCartAction} = cartSlice.actions;

export default cartSlice.reducer;

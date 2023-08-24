import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {ProductType} from '../../types/ProductTypes';

export interface InitialStateType {
  cart: ProductType[];
}

const initialState: InitialStateType = {
  cart: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartAction: (state, action: PayloadAction<ProductType>) => {
      state.cart.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {setCartAction} = cartSlice.actions;

export default cartSlice.reducer;

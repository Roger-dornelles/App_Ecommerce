/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface InitialStateType {
  token: string | undefined;
}

const initialState: InitialStateType = {
  token: undefined,
};

export const signinSlice = createSlice({
  name: 'signin',
  initialState,
  reducers: {
    tokenAction: state => {},

    setTokenAction: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {tokenAction, setTokenAction} = signinSlice.actions;

export default signinSlice.reducer;

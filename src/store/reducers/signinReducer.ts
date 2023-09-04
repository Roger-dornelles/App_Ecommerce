import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import axiosClient from '../../axios/config';

export interface InitialStateType {
  token: {
    token: string | undefined;
    exp?: number;
    iat?: number;
  };
}

const initialState: InitialStateType = {
  token: {
    token: undefined,
    exp: 0,
    iat: 0,
  },
};

export const signinSlice = createSlice({
  name: 'signin',
  initialState,
  reducers: {
    tokenAction: state => {
      let currentDate = new Date();

      //  exp is in seconds ( invalid token )
      if (state?.token?.exp! * 1000 < currentDate.getTime()) {
        state.token.token = undefined;
        state.token.exp = 0;
        state.token.iat = 0;
      } else {
        axiosClient.defaults.headers.common.Authorization = `Bearer ${state.token.token}`;
      }
    },
    setTokenAction: (state, action: PayloadAction<InitialStateType>) => {
      state.token.token = action.payload.token.token;
      state.token.exp = action.payload.token.exp;
      state.token.iat = action.payload.token.iat;
    },
  },
});

export const {tokenAction, setTokenAction} = signinSlice.actions;

export default signinSlice.reducer;

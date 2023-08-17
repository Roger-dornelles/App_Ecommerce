import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface InitialStateType {
  open: true | false;
  message: string | null | undefined;
  type: 'error' | 'success' | 'warning' | undefined;
}

const initialState: InitialStateType = {
  open: false,
  message: '',
  type: 'error',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalAction: (state, action: PayloadAction<InitialStateType>) => {
      state.message = action.payload.message;
      state.open = action.payload.open;
      state.type = action.payload.type;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setModalAction} = modalSlice.actions;

export default modalSlice.reducer;

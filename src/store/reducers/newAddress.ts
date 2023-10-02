import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface NewAddressTypes {
  name: string;
  newState: string;
  address: string;
  contact: string;
  district: string;
  number: string;
}

const initialState: NewAddressTypes = {
  name: '',
  newState: '',
  address: '',
  contact: '',
  district: '',
  number: '',
};

export const newAddressSlice = createSlice({
  name: 'newAddress',
  initialState,
  reducers: {
    newAddress: (state, action: PayloadAction<NewAddressTypes>) => {
      state.address = action.payload.address;
      state.contact = action.payload.contact;
      state.district = action.payload.district;
      state.name = action.payload.name;
      state.newState = action.payload.newState;
      state.number = action.payload.number;

      state;
    },
    setNewAddress: (state, action: PayloadAction<NewAddressTypes>) => {
      state.name = action.payload.name;
      state.address = action.payload.address;
      state.contact = action.payload.contact;
      state.district = action.payload.district;
      state.number = action.payload.number;
      state.newState = action.payload.newState;
    },
  },
});

export const {setNewAddress, newAddress} = newAddressSlice.actions;
export default newAddressSlice.reducer;

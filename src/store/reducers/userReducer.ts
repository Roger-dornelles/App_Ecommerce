import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface UserTypes {
  user: {
    email: string | undefined;
    id: number | undefined;
    exp?: number;
    iat?: number;
  };
}

const initialState: UserTypes = {
  user: {
    id: 0,
    email: '',
    exp: undefined,
    iat: undefined,
  },
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userAction: (state, action: PayloadAction<UserTypes>) => {
      if (action.payload) {
        state.user.email = action.payload.user.email;
        state.user.id = action.payload.user.id;
        state.user.exp = action.payload.user.exp;
        state.user.iat = action.payload.user.iat;
      }
      state;
    },

    setUserAction: (state, action: PayloadAction<UserTypes>) => {
      if (action.payload) {
        state.user.email = action.payload.user.email;
        state.user.id = action.payload.user.id;
        state.user.exp = action.payload.user.exp;
        state.user.iat = action.payload.user.iat;
      }
    },
  },
});

export const {userAction, setUserAction} = UserSlice.actions;
export default UserSlice.reducer;

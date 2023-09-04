import {configureStore} from '@reduxjs/toolkit';

import signinReducer from './reducers/signinReducer';
import modalReducer from './reducers/modalReducer';
import cartReducer from './reducers/cartReducer';
import useReducer from './reducers/userReducer';

export const store = configureStore({
  reducer: {
    signinReducer,
    modalReducer,
    cartReducer,
    useReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

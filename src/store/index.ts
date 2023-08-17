import {configureStore} from '@reduxjs/toolkit';

import signinReducer from './reducers/signinReducer';
import modalReducer from './reducers/modalReducer';

export const store = configureStore({
  reducer: {
    signinReducer,
    modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

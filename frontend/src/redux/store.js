import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import utilReducer from './utils/UtilSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    util: utilReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(),
  devTools: true,
});

export const dispatch = store.dispatch;

export default store;

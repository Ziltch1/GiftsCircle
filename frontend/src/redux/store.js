import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import utilReducer from './utils/UtilSlice';
import userReducer from './features/user/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    util: utilReducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(),
  devTools: true,
});

export const dispatch = store.dispatch;

export default store;

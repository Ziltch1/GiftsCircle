import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import utilReducer from './utils/UtilSlice';
import userReducer from './features/user/userSlice';
import eventReducer from './features/events/eventSlice';
import giftReducer from './features/gift/giftSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    util: utilReducer,
    user: userReducer,
    event: eventReducer,
    gift: giftReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(),
  devTools: true,
});

export const dispatch = store.dispatch;

export default store;

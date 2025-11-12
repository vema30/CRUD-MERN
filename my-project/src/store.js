import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import contactReducer from './features/ContactSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactReducer,
  },
});

export default store;

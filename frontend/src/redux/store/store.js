import { configureStore } from '@reduxjs/toolkit';
import supportReducer from '../reducers/supportReducer';

const store = configureStore({
  reducer: {
    support: supportReducer
  },
});

export default store;
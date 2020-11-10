import { configureStore } from '@reduxjs/toolkit';
import taxReducer from '../features/tax/taxSlice';
import salaryReducer from '../features/salary/salarySlice';

export default configureStore({
  reducer: {
    tax: taxReducer,
    salary: salaryReducer
  },
});

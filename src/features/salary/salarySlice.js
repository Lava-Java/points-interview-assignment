import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  salary: 0,
};

const salarySlice = createSlice({
  name: 'salary',
  initialState,
  reducers: {
    salarySubmitted: {
      reducer(state, action) {
        state.salary = action.payload;
      },
    },
  },
});

export const { salarySubmitted } = salarySlice.actions;
export const selectSalary = (state) => state.salary.salary;
export default salarySlice.reducer;

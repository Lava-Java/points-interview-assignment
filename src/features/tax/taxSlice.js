import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {
  taxRate: [],
  status: 'idle',
  totalTax: 0,
  error: null,
};

export const fetchTaxRate = createAsyncThunk('tax/fetchTaxRate', async () => {
  const response = await axios.get('http://localhost:5000/tax-calculator/brackets/2020');
  return response.data.tax_brackets;
});

const taxSlice = createSlice({
  name: 'tax',
  initialState,
  reducers: {
    calculateTaxableIncome(state, action) {
      const salary = action.payload;
      for (let i = 0; i < state.taxRate.length; i++) {
        const prevElement = i - 1;
        // Check if the salary fits in the current tax bracket, or if the salary is higher than $214368
        if (salary >= state.taxRate[i].min && salary <= state.taxRate[i].max
                    || (salary >= state.taxRate[i].min && !state.taxRate[i].max)) {
          // Calculate the taxes paid in the current tax bracket, and accumulate total
          state.taxRate[i].taxesPaidInBracket = Math.round((salary - state.taxRate[i].min) * state.taxRate[i].rate);
          state.totalTax += state.taxRate[i].taxesPaidInBracket;
          if (i === 0) {
            continue;
          } else {
            // Set the tax paid in the previous bracket to the maximum taxable value, and accumulate total
            state.taxRate[prevElement].taxesPaidInBracket = state.taxRate[i].taxForPreviousBracket;
            state.totalTax += state.taxRate[prevElement].taxesPaidInBracket;
          }
        }
        // If the salary does not fit in the current bracket, set taxesPaidInBracket to 0
        else {
          state.taxRate[i].taxesPaidInBracket = 0;
        }
      }
    },
  },
  extraReducers: {
    [fetchTaxRate.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchTaxRate.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.taxRate = state.taxRate.concat(action.payload);
      for (let i = 0; i < state.taxRate.length; i++) {
        const prevElement = i - 1;
        if (i === 0) {
          state.taxRate[i].taxForPreviousBracket = 0;
        } else {
          // For every tax bracket except the first,
          // Calculate the tax to be paid for the previous bracket based on the maximum
          state.taxRate[i].taxForPreviousBracket = Math.round(
            (state.taxRate[prevElement].max - state.taxRate[prevElement].min)
                            * state.taxRate[prevElement].rate
                            + state.taxRate[prevElement].taxForPreviousBracket,
          );
        }
      }
    },
    [fetchTaxRate.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const { calculateTaxableIncome } = taxSlice.actions;
export const selectTaxRate = (state) => state.tax.taxRate;
export const selectError = (state) => state.tax.error;
export const selectLoadingStatus = (state) => state.tax.status;
export const selectTotalTax = (state) => state.tax.totalTax;
export default taxSlice.reducer;

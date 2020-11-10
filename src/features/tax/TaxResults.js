import React from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { selectTaxRate, selectTotalTax } from './taxSlice';
import { selectSalary } from '../salary/salarySlice';

export const TaxResults = () => {
  const salary = useSelector(selectSalary);
  const taxRate = useSelector(selectTaxRate);
  const totalTax = useSelector(selectTotalTax);

  const content = taxRate.map((bracket) => (
    <div key={nanoid()}>
      <label
        htmlFor='taxBracket'
      >
        Federal Income Tax for Bracket {taxRate.indexOf(bracket) + 1}
        (Effective Rate: {Math.round((bracket.rate * 100))}% ):
      </label>
      <input
        type='number'
        id='taxedAmount'
        name='taxedAmount'
        value={bracket.taxesPaidInBracket}
        disabled
      />
    </div>
  ));

  return (
    <div>
      <h2>Federal Tax on Taxable Income</h2>
      <form>
        <label htmlFor='salary'>Salary:</label>
        <input
          type='number'
          id='salary'
          name='salary'
          value={salary}
          disabled
        />
        {content}
        <label htmlFor='totalTax'>Total Federal Tax:</label>
        <input
          type='number'
          id='toalTax'
          name='totalTax'
          value={totalTax}
          disabled
        />
      </form>
    </div>
  );
};

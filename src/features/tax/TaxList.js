import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoadingStatus, fetchTaxRate } from './taxSlice';
import { selectSalary } from '../salary/salarySlice';
import { TaxResults } from './TaxResults';

export const TaxList = () => {
  const dispatch = useDispatch();
  const taxRateStatus = useSelector(selectLoadingStatus);
  const salary = useSelector(selectSalary);

  let content;

  if (taxRateStatus === 'loading') {
    content = <div className='loader'>Loading...</div>;
  } else if (taxRateStatus === 'succeeded' && salary > 1) {
    content = <TaxResults />;
  } else if (taxRateStatus === 'failed') {
    dispatch(fetchTaxRate());
    console.log('Trying to FETCH from API again...');
  }

  return (
    <section>
      <div>{content}</div>
    </section>
  );
};

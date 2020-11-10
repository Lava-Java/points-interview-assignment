import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { salarySubmitted } from './salarySlice';
import { calculateTaxableIncome, selectLoadingStatus } from '../tax/taxSlice';

export const SalaryInputForm = () => {
    const [salary, setSalary] = useState('');
    const taxRateStatus = useSelector(selectLoadingStatus);
    const dispatch = useDispatch();
    const onSalaryChange = e => setSalary(e.target.value);

    const onSubmitClicked = () => {
        if (salary > 0) {
            dispatch(salarySubmitted(salary));
            dispatch(calculateTaxableIncome(salary));
            setSalary('');
        }
    };

    //Conditions used to check if submit button should be disabled
    const canSubmit = (salary > 0) && (salary < 999999) && (taxRateStatus === 'succeeded');

    return (
        <section>
            <h2>Enter Your Salary</h2>
            <form>
                <label htmlFor='salary'>Salary:</label>
                <input
                    type='number'
                    id='salary'
                    name='salary'
                    value={salary}
                    placeholder={0}
                    onChange={onSalaryChange}
                />
                <button
                    type='button'
                    disabled={!canSubmit}
                    onClick={onSubmitClicked}
                >
                    Calculate Taxes
                </button>
            </form>
        </section>
    );
};
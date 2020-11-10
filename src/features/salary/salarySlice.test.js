import reducer, { initialState, salarySubmitted, selectSalary } from './salarySlice';

describe('salary slice', () => {
    describe('selectors, actions, and reducers', () => {
        test('Should return the initial state on first run', () => {
            //Arrange 
            const nextState = initialState;
            //Act
            const result = reducer(undefined, {});
            //Assert
            expect(result).toEqual(nextState);
        });

        test('Should properly set the state when salary is submitted', () => {
            //Arrange
            const data = { salary: 65000 };
            //Act
            const nextState = reducer(initialState, salarySubmitted(data));
            //Assert
            const rootState = { salary: nextState };
            expect(selectSalary(rootState.salary)).toEqual(data.salary);
        });
    });
});
import reducer, { initialState, fetchTaxRate, selectError, selectLoadingStatus } from './taxSlice';

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
        test('Should set loading and error state when fetch request is made', () => {
            //Act
            const nextState = reducer(initialState, fetchTaxRate());
            const rootState = { tax: nextState };
            //Assert
            expect(selectError(rootState)).toEqual(null);
            expect(selectLoadingStatus(rootState)).toEqual('idle');
        });
    });
});
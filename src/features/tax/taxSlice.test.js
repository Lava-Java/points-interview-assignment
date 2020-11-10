import reducer, { initialState, calculateTaxableIncome, fetchTaxRate, selectError, selectLoadingStatus } from './taxSlice';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore([thunk]);

describe('salary slice', () => {
    describe('selectors, actions, and reducers', () => {
        test('Should return the initial state on first run', () => {
            const nextState = initialState;
            const result = reducer(undefined, {});
            expect(result).toEqual(nextState);
        });
        test('Should set loading and error state when fetch request is made', () => {
            const nextState = reducer(initialState, fetchTaxRate());
            const rootState = { tax: nextState };
            expect(selectError(rootState)).toEqual(null);
            expect(selectLoadingStatus(rootState)).toEqual('idle');
        });
        test('Should set loading, error state when fetch request succeeds', () => {
            const store = mockStore(initialState);
            console.log(store);
        });
    });
});
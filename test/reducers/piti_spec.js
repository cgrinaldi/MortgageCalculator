import {expect} from 'chai';
import reducer from '../../src/js/reducers/piti.js';
import {PRODUCT_035, PRODUCT_10, PRODUCT_20, PRODUCT_REX} from '../MortgageConstants';
import {SET_HOMEPRICE, SET_INCOME, SET_INTEREST_RATE,
        SET_PROPERTY_TAX_RATE, SET_PROPERTY_INSURANCE_RATE} from '../../src/js/constants/ActionTypes';

describe('PITI reducer', () => {

  const initialState = {
    homePrice: 500000,
    rates: {
      propertyTaxRate: 0.0125,
      propertyInsuranceRate: 0.003,
      mortgageInterestRate: 0.04
    },
    householdIncome: 70000,
    products: [
      PRODUCT_035,
      PRODUCT_10,
      PRODUCT_20,
      PRODUCT_REX
    ],
  };

  it('handles initializing application state', () => {
    const nextState = reducer(undefined, 'some action');
    expect(nextState).to.deep.equal(initialState);
  });

  it('handles SET_HOMEPRICE', () => {
    const action = {type: SET_HOMEPRICE, val: 350000};
    const nextState = reducer(initialState, action);
    expect(nextState).to.deep.equal({
      ...initialState,
      homePrice: 350000
    });
  });

  it('handles SET_INCOME', () => {
    const action = {type: SET_INCOME, val: 150000};
    const nextState = reducer(initialState, action);
    expect(nextState).to.deep.equal({
      ...initialState,
      householdIncome: 150000
    });
  });

  it('handles SET_INTEREST_RATE', () => {
    const action = {type: SET_INTEREST_RATE, val: 0.055};
    const nextState = reducer(initialState, action);
    expect(nextState).to.deep.equal({
      ...initialState,
      rates: {
        mortgageInterestRate: 0.055,
        propertyInsuranceRate: initialState.rates.propertyInsuranceRate,
        propertyTaxRate: initialState.rates.propertyTaxRate
      }
    });
  });

  it ('handles SET_PROPERTY_TAX_RATE', () => {
    const action = {type: SET_PROPERTY_TAX_RATE, val: 0.01};
    const nextState = reducer(initialState, action);
    expect(nextState).to.deep.equal({
      ...initialState,
      rates: {
        mortgageInterestRate: initialState.rates.mortgageInterestRate,
        propertyInsuranceRate: initialState.rates.propertyInsuranceRate,
        propertyTaxRate: 0.01
      }
    });
  });

  it('handles SET_PROPERTY_INSURANCE_RATE', () => {
    const action = {type: SET_PROPERTY_INSURANCE_RATE, val: .006};
    const nextState = reducer(initialState, action);
    expect(nextState).to.deep.equal({
      ...initialState,
      rates: {
        mortgageInterestRate: initialState.rates.mortgageInterestRate,
        propertyInsuranceRate: 0.006,
        propertyTaxRate: initialState.rates.propertyTaxRate
      }
    });
  });

});

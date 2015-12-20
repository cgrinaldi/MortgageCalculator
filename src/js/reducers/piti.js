import {SET_HOMEPRICE, SET_INCOME, SET_INTEREST_RATE,
        SET_PROPERTY_TAX_RATE} from '../constants/ActionTypes';
import {PRODUCT_035, PRODUCT_10, PRODUCT_20, PRODUCT_REX} from '../constants/MortgageConstants.js';

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

export default function piti (state = initialState, action) {
  switch(action.type) {
  case SET_HOMEPRICE:
    return {
      ...state,
      homePrice: action.val
    };

  case SET_INCOME:
    return {
      ...state,
      householdIncome: action.val
    }

  case SET_INTEREST_RATE:
    var originalRates = state.rates;
    return {
      ...state,
      rates: {
        ...originalRates,
        mortgageInterestRate: action.val
      }
    };

  case SET_PROPERTY_TAX_RATE:
    var originalRates = state.rates;
    return {
      ...state,
      rates: {
        ...originalRates,
        propertyTaxRate: action.val
      }
    };

  default:
    return state
  }
}

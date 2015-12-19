import {SET_HOMEPRICE} from '../constants/ActionTypes';
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
  default:
    return state
  }
}

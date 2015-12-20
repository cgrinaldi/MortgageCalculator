import * as types from '../constants/ActionTypes';

export function setHomePrice (val) {
  return {type: types.SET_HOMEPRICE, val};
}

export function setIncome (val) {
  return {type: types.SET_INCOME, val};
};

export function setInterestRate (val) {
  return {type: types.SET_INTEREST_RATE, val};
}

export function setPropertyTaxRate (val) {
  return {type: types.SET_PROPERTY_TAX_RATE, val};
}

export function setPropertyInsuranceRate (val) {
  return {type: types.SET_PROPERTY_INSURANCE_RATE, val};
}

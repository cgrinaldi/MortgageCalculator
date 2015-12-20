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

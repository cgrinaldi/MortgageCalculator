import * as types from '../constants/ActionTypes';

export function setHomePrice (val) {
  return {type: types.SET_HOMEPRICE, val};
}

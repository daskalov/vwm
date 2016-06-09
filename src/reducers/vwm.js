import * as actions from '../constants/actionTypes';

const O = false,
      X = true;

const stateInitial = {
  recall: [
    [O, O, O, O],
    [O, O, O, O],
    [O, O, X, O],
    [O, O, O, O],
  ],
};

export default function vwm(state=stateInitial, action={}) {
  switch (action.type) {
    case actions.GRID_TAP:
      return state;
    default:
      return state;
  }
}

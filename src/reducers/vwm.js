import * as actions from '../constants/actionTypes';

const O = false;
const stateInitial = {
  recall: [
    [O, O, O, O],
    [O, O, O, O],
    [O, O, O, O],
    [O, O, O, O],
  ],
};

export default function vwm(state=stateInitial, action={}) {
  switch (action.type) {
    case actions.GRID_TAP:
      const { row, col } = action;
      // TODO: Use an immutable library
      const recall = state.recall.map(a => a.slice(0));
      recall[row][col] = ! recall[row][col];
      return Object.assign({}, state, {
        recall: recall
      });
    default:
      return state;
  }
}

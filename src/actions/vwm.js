import * as actions from '../constants/actionTypes';

export function gridTap(row, col) {
  return {
    type: actions.GRID_TAP, row, col
  };
}

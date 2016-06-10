import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import * as reducers from '../reducers';

import NavigatorMain from './NavigatorMain';


const rootReducer = combineReducers(reducers);
const store = createStore(rootReducer);

class vwmbasic extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigatorMain />
      </Provider>
    );
  }
}

export default vwmbasic;

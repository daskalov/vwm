import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import * as reducers from './src/reducers';

import NavigatorMain from './src/components/NavigatorMain';


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

AppRegistry.registerComponent('vwmbasic', () => vwmbasic);

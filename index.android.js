import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import * as reducers from './src/reducers';

import VWM from './src/containers/VWM';
import Assessments from './src/components/Assessments';


class NavigatorMain extends Component {
  navigatorRenderScene(route, navigator) {
    const component = {
      'VWM':
        <VWM route={route} navigator={navigator} />,
      'Assessments':
        <Assessments route={route} navigator={navigator} />,
    }[route.name];
    return component;
  }

  render() {
    const initialRoute = {
      name: 'VWM'
    };
    return (
      <Navigator
        initialRoute={initialRoute}
        renderScene={this.navigatorRenderScene.bind(this)}
      />
    );
  }
}

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

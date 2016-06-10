import React, { Component } from 'react';
import { Navigator } from 'react-native';

import VWM from '../containers/VWM';
import Assessments from './Assessments';


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

export default NavigatorMain;

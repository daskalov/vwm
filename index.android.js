import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Navigator,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import * as reducers from './src/reducers';

import VWM from './src/containers/VWM';

class Assessments extends Component {
  tapMenu() {
    this.props.navigator.push({
      name: 'VWM'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon.ToolbarAndroid
          title="EMA"
          titleColor='white'
          style={styles.toolbar} />
        <View style={styles.containerContent}>
          <TouchableHighlight onPress={this.tapMenu.bind(this)}>
            <View style={styles.buttonMenu}>
              <Text>
                Visual Working Memory
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

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

const styles = StyleSheet.create({
  buttonMenu: {
    backgroundColor: 'white',
    padding: 8
  },
});

AppRegistry.registerComponent('vwmbasic', () => vwmbasic);

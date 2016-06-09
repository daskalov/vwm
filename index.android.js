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

import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, bindActionCreators } from 'redux';
import * as vwmActions from './src/actions/vwm';
import * as reducers from './src/reducers';

class VWMGridSquare extends Component {
  tap() {
    const { actions, row, col } = this.props;
    actions.gridTap(row, col);
  }

  render() {
    const gridDot = <View style={styles.gridDot} />;
    return (
      <TouchableHighlight onPress={this.tap.bind(this)} underlayColor={colors.none}>
        <View style={styles.gridSquare}>
          { (this.props.active) ? gridDot : null }
        </View>
      </TouchableHighlight>
    );
  }
}

class VWMGrid extends Component {
  render() {
    return (
      <View style={styles.grid}>
        { this.props.state.map((row, i) =>
            <View style={styles.gridRow} key={i}>
              { row.map((col, j) =>
                  <VWMGridSquare
                    active={col}
                    actions={this.props.actions}
                    row={i}
                    col={j}
                    key={j}/>
                )
              }
            </View>
          )
        }
      </View>
    );
  }
}

class VWM extends Component {
  render() {
    const stateGrid = this.props.state.recall,
          actions   = this.props.actions;
    return (
      <View style={styles.container}>
        <Icon.ToolbarAndroid
          title="Assessments"
          titleColor='white'
          style={styles.toolbar} />
        <View style={styles.containerContent}>
          <VWMGrid state={stateGrid} actions={actions} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    state: state.vwm
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators(vwmActions, dispatch)
  };
};

const ReduxVWM = connect(
  mapStateToProps,
  mapDispatchToProps
)(VWM);

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
        <ReduxVWM route={route} navigator={navigator} />,
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

const colors = {
  none:        '#00000000',
  bg:          '#EEEEEE',
  primary:     '#F44336',
  primaryDark: '#C62828',
  accent:      '#546E7A',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: colors.bg,
  },

  toolbar: {
    height: 56,
    backgroundColor: colors.primary
  },

  containerContent: {
    paddingTop: 8,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonMenu: {
    backgroundColor: 'white',
    padding: 8
  },

  grid: {
    flexDirection: 'column',
    padding: 4,
  },

  gridRow: {
    flexDirection: 'row',
  },

  gridSquare: {
    backgroundColor: 'white',
    width: 80,
    height: 80,
    borderRadius: 10,
    margin: 4,
  },

  gridDot: {
    backgroundColor: colors.primary,
    flex: 1,
    margin: 10,
    borderRadius: 200,
  }
});

AppRegistry.registerComponent('vwmbasic', () => vwmbasic);

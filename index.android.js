import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Navigator,
} from 'react-native';

import _ from 'underscore';
import Icon from 'react-native-vector-icons/MaterialIcons';

class VWMGridSquare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  tap() {
    this.setState({
      active: ! this.state.active
    });
  }

  render() {
    const gridDot = <View style={styles.gridDot} />;
    return (
      <TouchableHighlight onPress={this.tap.bind(this)} underlayColor={colors.none}>
        <View style={styles.gridSquare}>
          { (this.state.active) ? gridDot : null }
        </View>
      </TouchableHighlight>
    );
  }
}

class VWMGrid extends Component {
  render() {
    return (
      <View style={styles.grid}>
        { _.range(0, this.props.rows).map((row) =>
            <View style={styles.gridRow} key={row}>
              { _.range(0, this.props.cols).map((col) =>
                  <VWMGridSquare key={col}/>
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
    return (
      <View style={styles.container}>
        <Icon.ToolbarAndroid
          title="Assessments"
          titleColor='white'
          style={styles.toolbar} />
        <View style={styles.containerContent}>
          <VWMGrid rows={4} cols={4} />
        </View>
      </View>
    );
  }
}

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
      'VWM':         <VWM route={route} navigator={navigator}/>,
      'Assessments': <Assessments route={route} navigator={navigator}/>
    }[route.name];
    return component;
  }

  render() {
    const initialRoute = {
      name: 'Assessments'
    };
    return (
      <Navigator
        initialRoute={initialRoute}
        renderScene={this.navigatorRenderScene}
      />
    );
  }
}

class vwmbasic extends Component {
  render() {
    return (
      <NavigatorMain />
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

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

// import _ from 'lodash';

// var _ = require('lodash');

import _ from 'underscore';

class VWMGridSquare extends Component {
  constructor(props) {
    super(props);
    console.log('!!! constructor');
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
      <TouchableHighlight onPress={this.tap.bind(this)}>
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

class vwmbasic extends Component {
  render() {
    return (
      <View style={styles.container}>
        <VWMGrid rows={4} cols={4} />
      </View>
    );
  }
}

const colors = {
  bg:          '#EEEEEE',
  primary:     '#F44336',
  primaryDark: '#C62828',
  accent:      '#546E7A',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bg,
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

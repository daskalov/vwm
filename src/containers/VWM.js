import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Navigator,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as vwmActions from '../actions/vwm';

import colors from '../values/colors';
import stylesCommon from '../values/styles';


const stylesLocal = {
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
};

const styles = StyleSheet.create(
  Object.assign(stylesCommon, stylesLocal)
);

class VWMGridSquare extends Component {
  tap() {
    const { actions, row, col } = this.props;
    actions.gridTap(row, col);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.active != this.props.active;
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VWM);

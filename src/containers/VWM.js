import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import _ from 'underscore';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as vwmActions from '../actions/vwm';

import colors from '../values/colors';
import stylesCommon from '../values/styles';


class VWMGridSquare extends Component {
  tap() {
    const { actions, row, col, readOnly } = this.props;
    if (! readOnly) {
      actions.gridTap(row, col);
    }
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
  componentDidMount() {
    if (this.props.training) {
      const { then, time } = this.props.training;
      setTimeout(then, time);
    }
  }

  render() {
    const { state, actions, training } = this.props;
    const sumActive = _.flatten(state).reduce((m, e) => e ? m + 1 : m, 0),
          canProceed = sumActive >= 5;
    const isTraining = training !== undefined;
    return (
      <View>
        <View style={styles.grid}>
          { state.map((row, i) =>
              <View style={styles.gridRow} key={i}>
                { row.map((col, j) =>
                    <VWMGridSquare
                      active={col}
                      actions={actions}
                      readOnly={isTraining}
                      row={i}
                      col={j}
                      key={j}/>
                  )
                }
              </View>
            )
          }
        </View>
        <Button display={canProceed && !isTraining} onPress={() => {}}>
          <Text style={styles.buttonText}>
            Done
          </Text>
        </Button>
      </View>
    );
  }
}

const Button = ({ children, display, onPress }) => display ?
  <TouchableHighlight onPress={onPress} underlayColor={colors.none}>
    <View style={styles.button}>
      {children}
    </View>
  </TouchableHighlight> : null;

class VWMInstructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canProceed: false
    };
  }

  componentDidMount() {
    setTimeout(() =>
      this.setState({ canProceed: true })
    , this.props.continueDelay || 0);
  }

  render() {
    const { children, onContinue, continueText } = this.props;
    return (
      <View style={styles.card}>
        {children}
        <Button display={this.state.canProceed} onPress={onContinue}>
          <Text style={styles.buttonText}>
            {continueText}
          </Text>
        </Button>
      </View>
    );
  }
}

class VWM extends Component {
  constructor(props) {
    super(props);
    const advance = this.next.bind(this);

    const screensAll = _.flatten([
      <VWMInstructions
          continueText="Start"
          continueDelay={2000}
          onContinue={advance}>
        <Text style={styles.instructions}>
          You'll see between 1 and 4 grids.
          Each grid will remain on the screen
          for 1 second.
        </Text>
        <Text style={styles.instructions}>
          Try to remember the pattern in the last grid presented.
        </Text>
      </VWMInstructions>,
      this.generateRandomTrainingStates({
        fnAdvance: advance,
        timeDisplay: 500
      }),
      <VWMInstructions
          continueText="Start"
          continueDelay={5000}
          onContinue={advance}>
        <Text style={styles.instructions}>
          You'll now see a blank grid. Tap the squares
          to create the pattern that matches the last
          one you saw. You will have 5 seconds to
          complete this grid.
        </Text>
      </VWMInstructions>,
      (props) =>
        <VWMGrid state={props.state.recall} actions={props.actions} />,
    ]);

    const screenCurr = screensAll.shift();
    this.state = {
      screens: screensAll,
      screenCurrent: screenCurr,
      screensSeen: []
    };
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateRandomState(rows, cols) {
    const grid = _.range(0, rows).map((_row) =>
      _.range(0, cols).map((_col) => false)
    );
    let dots = 0;
    while (dots < 5) {
      const r = this.randomInt(0, rows-1),
            c = this.randomInt(0, cols-1);
      grid[r][c] = grid[r][c] ? true : ++dots && true;
    }
    return grid;
  }

  generateRandomTrainingStates({ fnAdvance, timeDisplay }) {
    const maxTrainings = this.randomInt(1, 4);
    return _.range(0, maxTrainings).map((idxTraining) => {
      return (
        <VWMGrid
          state={this.generateRandomState(4, 4)}
          key={idxTraining}
          training={{
            time: timeDisplay || 1000,
            then: fnAdvance
          }} />
      );
    });
  }

  next() {
    const { screens, screenCurr, screensSeen } = this.state;
    screensSeen.push(screenCurr);
    const screenNewCurr = screens.shift();
    this.setState({
      screens: screens,
      screenCurrent: screenNewCurr,
      screensSeen: screensSeen
    });
  }

  renderCurrentScreen() {
    const screenCurr = this.state.screenCurrent;
    return (typeof screenCurr === 'function') ?
      screenCurr(this.props) : screenCurr;
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon.ToolbarAndroid
          title="Assessments"
          titleColor='white'
          style={styles.toolbar} />
        <View style={styles.containerContent}>
          {this.renderCurrentScreen.apply(this)}
        </View>
      </View>
    );
  }
}

// Move styles
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
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 16,
  },

  instructions: {
    marginBottom: 8,
  },

  button: {
    backgroundColor: colors.accent,
    padding: 8,
    marginTop: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white'
  }
};

const styles = StyleSheet.create(
  Object.assign(stylesCommon, stylesLocal)
);


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

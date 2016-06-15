import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import stylesCommon from '../values/styles';


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

const stylesLocal = {
  buttonMenu: {
    backgroundColor: 'white',
    padding: 8
  },
};

const styles = StyleSheet.create(
  Object.assign(stylesCommon, stylesLocal)
);


export default Assessments;

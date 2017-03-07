import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
} from 'react-native';

import NavigatorController from './src/Navigation/NavigatorController'

export default class CPL extends Component {
  render() {
    return (
      <NavigatorController />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('CPL', () => CPL);

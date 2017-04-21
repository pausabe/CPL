import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import NavigatorController from './src/Navigation/NavigatorController'

export default class CPL extends Component {
  render() {
    return (
      <NavigatorController />
    );
  }
}

AppRegistry.registerComponent('CPL', () => CPL);

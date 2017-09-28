import React, { Component } from 'react';
import {
  AppRegistry,
  Platform
} from 'react-native';
import { NavStack } from './src/Navigation/router'
import NavigatorController from './src/Navigation/NavigatorController'

export default class CPL extends Component {
  render() {
    if(Platform.OS === 'ios'){
      return(
        <NavigatorController />
      );
    }
    else{
      return(
        <NavStack />
      );
    }
  }
}

AppRegistry.registerComponent('CPL', () => CPL);

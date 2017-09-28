import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  View,
  StatusBar
} from 'react-native';
import { NavStack } from './src/Navigation/router'
import NavigatorController from './src/Navigation/NavigatorController'
import GLOBAL from "./src/Globals/Globals";

export default class CPL extends Component {
  render() {
    if(Platform.OS === 'ios'){
      return(
        <NavigatorController />
      );
    }
    else{
      return(
        <View style={{flex: 1}}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={GLOBAL.statusBarColor}/>
          <NavStack />
        </View>
      );
    }
  }
}

AppRegistry.registerComponent('CPL', () => CPL);

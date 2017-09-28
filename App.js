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
import EventEmitter from 'EventEmitter';

export default class CPL extends Component {
  componentWillMount(){
    this.eventEmitter = new EventEmitter();
  }

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
          <NavStack screenProps={{events: this.eventEmitter}} />
        </View>
      );
    }
  }
}

AppRegistry.registerComponent('CPL', () => CPL);

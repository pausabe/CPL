import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  View,
  StatusBar
} from 'react-native';
import { NavigatorAndroid } from './src/Components/Navigation/NavigatorAndroid'
import NavigatorIos from './src/Components/Navigation/NavigatorIos'
import GLOBAL from "./src/Globals/Globals";

export default class CPL extends Component {
  render() {
    if(Platform.OS === 'ios'){
      return(
        <NavigatorIos />
      );
    }
    else{
      return(
        <View style={{flex: 1}}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={GLOBAL.statusBarColor}/>
          <NavigatorAndroid />
        </View>
      );
    }
  }
}

AppRegistry.registerComponent('CPL', () => CPL);

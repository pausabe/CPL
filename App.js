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
import {
  GoogleAnalyticsTracker,
  GoogleTagManager,
  GoogleAnalyticsSettings
} from "react-native-google-analytics-bridge";
import DeviceInfo from 'react-native-device-info';

export default class CPL extends Component {
  render() {
    //TRACKER THINGS
    // GoogleAnalyticsSettings.setDispatchInterval(1); //this should be commented. 20 by defoult

    const isEmulator = DeviceInfo.isEmulator();
    const uniqueId = DeviceInfo.getUniqueID();

    console.log("INFO! isEmulator: " + isEmulator + " uniqueId: " + uniqueId);

    trackerActive = true && !isEmulator; //need a Privacity Policy

    trackerInstance = null;
    if(trackerActive) {
      trackerInstance = new GoogleAnalyticsTracker("UA-113574827-1");
      trackerInstance.setClient(uniqueId);
    }
    let tracker = {
      active: trackerActive,
      instance: trackerInstance,
    }
    //TRACKER THINGS

    if(Platform.OS === 'ios'){
      return(
        <NavigatorIos screenProps={{tracker: tracker}}/>
      );
    }
    else{
      return(
        <View style={{flex: 1}}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={GLOBAL.statusBarColor}/>
          <NavigatorAndroid screenProps={{tracker: tracker}}/>
        </View>
      );
    }
  }
}

AppRegistry.registerComponent('CPL', () => CPL);

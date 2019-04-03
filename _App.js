import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  View,
  StatusBar,
  AppState
} from 'react-native';
import { NavigatorAndroid } from './src/Components/Navigation/_NavigatorAndroid'
import NavigatorIos from './src/Components/Navigation/_NavigatorIos'
import GLOBAL from "./src/Globals/Globals";
import {
  GoogleAnalyticsTracker,
  GoogleTagManager,
  GoogleAnalyticsSettings
} from "react-native-google-analytics-bridge";
import DeviceInfo from 'react-native-device-info';

export default class CPL extends Component {

  constructor(props) {
    super(props);

    //TRACKER THINGS
    const isEmulator = DeviceInfo.isEmulator();
    const uniqueId = DeviceInfo.getUniqueID();

    trackerActive = false && !isEmulator;
    // GoogleAnalyticsSettings.setDispatchInterval(1); //this should be commented. 20 by defoult
    GoogleAnalyticsSettings.setDryRun(!trackerActive); //first I need a Privacity Policy

    this.tracker = new GoogleAnalyticsTracker(GLOBAL.idTracker);
    this.tracker.setClient(uniqueId); //identifica el dispositiu
    this.tracker.setUser(uniqueId); //identifica l'usuari
    //si algun dia faig login dusuaris, hauré de canviar el setUser per el de l'usuari
    //d'aquesta manera si l'usuari entra a l'app des d'una tablet i un mobil
    //analytics sabrà que és el mateix usuari

    console.log("AppStateLog: Open 1rst time");
    this.tracker.createNewSession("Inici");
    this.tracker.trackEvent("AppState", "(First Inici)");
    this.stateFlux = AppState.currentState;
    //TRACKER THINGS
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange.bind(this));
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange.bind(this));
  }

  _handleAppStateChange(nextAppState){
    if(this.stateFlux.match(/background/) && nextAppState === 'active') {
      console.log("AppStateLog: ReOpen");
      this.tracker.trackEvent("AppState", "ReOpen");
    }
    else if(this.stateFlux.match(/active|inactive/) && nextAppState === 'background'){
      console.log("AppStateLog: leaving");
      this.tracker.trackEvent("AppState", "Leaving");
    }
    this.stateFlux = nextAppState;
  }

  render() {
    if(Platform.OS === 'ios'){
      return(
        <NavigatorIos screenProps={{tracker: this.tracker}}/>
      );
    }
    else{
      return(
        <View style={{flex: 1}}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={GLOBAL.statusBarColor}/>
          <NavigatorAndroid screenProps={{tracker: this.tracker}}/>
        </View>
      );
    }
  }
}

AppRegistry.registerComponent('CPL', () => CPL);

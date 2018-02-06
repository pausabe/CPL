import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image,
  DatePickerIOS,
  SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import DateTimePicker from 'react-native-modal-datetime-picker';
import EventEmitter from 'EventEmitter';
import HomeScreenController from '../../Controllers/HomeScreenController';
import SettingsScreen from '../../Views/SettingsScreen';
import LiturgiaDisplayScreen from '../../Views/LiturgiaDisplayScreen/LiturgiaDisplayScreen';
import GLOBAL from '../../Globals/Globals';

export default class NavigatorIos extends Component {
  componentWillMount() {
    Icon.getImageSource('ios-settings-outline', 30).then((source) => this.setState({ settingsIcon: source }));
    Icon.getImageSource('ios-calendar-outline', 30).then((source) => this.setState({ calendarIcon: source }));
    this.eventEmitter = new EventEmitter();
  }

  constructor(props) {
    super(props);

    //this is just for ios. You must change for android in HomeScreen as well
    this.date = new Date(/*2017,7,7*/);
    this.auxDate = this.date;
    this.minimumDate = new Date(2017,0,2);
    this.maximumDate = new Date(2017,11,28);

    this.state = {
      isDateTimePickerVisible: false,
      settingsIcon: null,
      calendarIcon: null,
      datePressed: false,
    }
  }

  render() {
    if (!this.state.settingsIcon || !this.state.calendarIcon) {
      return false;
    }

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: GLOBAL.barColor }}>
          {this.Home()}
      </SafeAreaView>
    );
  }

  Home(){
    return (
      <View style={{flex: 1}}>
        <StatusBar
            barStyle="light-content"
            backgroundColor={GLOBAL.statusBarColor}
            hidden={false}/>

          <NavigatorIOS
            ref='navIos'
            initialRoute={{
              component: HomeScreenController,
              title: 'CPL',
              passProps: {naviDate: this.date, events: this.eventEmitter, screenProps: this.props.screenProps},
              rightButtonIcon: this.state.settingsIcon,
              onRightButtonPress: () => this.rightPress(),
              leftButtonIcon: this.state.calendarIcon,
              onLeftButtonPress: () => this.leftPress(),
            }}

            style={{flex: 1}}
            barTintColor={GLOBAL.barColor}
            tintColor={GLOBAL.itemsBarColor}
            titleTextColor={GLOBAL.itemsBarColor}/>
      </View>
    )
  }

  backPress(nav){
    nav.pop();
  }

  rightPress(){
    this.eventEmitter.emit('myEvent', { type: 'settingsPressed'});
    this.refs.navIos.push({
      title: 'Configuració',
      passProps: {screenProps: this.props.screenProps},
      component: SettingsScreen
    });
  }

  leftPress(){
    this.eventEmitter.emit('calendarPressed');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 90,
  },
  barButton: {
    flex: 1,
    paddingLeft: 5,
    justifyContent: 'center'
  },
  barText: {
    textAlign: 'center',
    justifyContent: 'center',
    color: GLOBAL.itemsBarColor,
    fontSize: 20,
    fontWeight: '500'
  },
  barTextBack: {
    color: GLOBAL.itemsBarColor,
    fontSize: 16,
    fontWeight: '300'
  },
  bar: {
    backgroundColor: GLOBAL.barColor
  },
  popupText: {
    color: 'rgb(0, 122, 204)',
    fontSize: 17,
    fontWeight: '400'
  }
})

AppRegistry.registerComponent('NavigatorIos', () => NavigatorIos);

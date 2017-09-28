import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  NavigatorIOS,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image,
  Platform,
  DatePickerIOS
} from 'react-native';
import { NavStack } from '../Navigation/router'
import CustomTransitions from '../CustomTransitions/CustomTransitions';
import HomeScreen from '../Screens/HomeScreen'
import SettingsScreen from '../Screens/SettingsScreen'
import LiturgiaDisplayScreen from '../Screens/LiturgiaDisplayScreen'
import GLOBAL from '../Globals/Globals'
import Icon from 'react-native-vector-icons/Ionicons'
import PopupDialog, {
  DialogTitle,
} from 'react-native-popup-dialog';
import DateTimePicker from 'react-native-modal-datetime-picker';

import EventEmitter from 'EventEmitter';

export default class NavigatorController extends Component {
  componentWillMount() {
    Icon.getImageSource('ios-settings-outline', 30).then((source) => this.setState({ settingsIcon: source }));
    Icon.getImageSource('ios-calendar-outline', 30).then((source) => this.setState({ calendarIcon: source }));
    this.eventEmitter = new EventEmitter();
  }

  constructor(props) {
    super(props)

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

    console.log("Navigator RENDER");

    if(Platform.OS === 'ios'){
      return (
          <View style={{flex: 1}}>
            <StatusBar
              barStyle="light-content"
              backgroundColor={GLOBAL.statusBarColor}
              hidden={false}/>

            <NavigatorIOS
              ref='navIos'
              initialRoute={{
                component: HomeScreen,
                title: 'CPL',
                passProps: {naviDate: this.date, events: this.eventEmitter},
                rightButtonIcon: this.state.settingsIcon,
                onRightButtonPress: () => this.rightPress(),
                leftButtonIcon: this.state.calendarIcon,
                onLeftButtonPress: () => this.leftPress(),
              }}

              style={{flex: 1}}
              barTintColor={GLOBAL.barColor}
              tintColor={GLOBAL.itemsBarColor}
              titleTextColor={GLOBAL.itemsBarColor}/>

            <PopupDialog
                ref={(popupDialog) => { this.popupDialog = popupDialog}}
                dialogStyle={{backgroundColor: 'white'}}
                dialogTitle={<DialogTitle title="Canvia el dia" />} >
                <DatePickerIOS
                  date={this.auxDate}
                  minimumDate={this.minimumDate}
                  maximumDate={this.maximumDate}
                  mode="date"
                  onDateChange={this.onDateChangeIos.bind(this)}/>

                <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'white'}}>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <TouchableOpacity onPress={this.cancelDatePicker.bind(this)}>
                      <Text style={styles.popupText}>Cancel·la</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <TouchableOpacity onPress={this.okDatePicker.bind(this)}>
                      <Text style={styles.popupText}>{"D'acord"}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </PopupDialog>
        </View>
      );
    }
    else{
      return (
        <View style={{flex: 1}}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={GLOBAL.statusBarColor}
          />
          <Navigator
            ref="navAndroid"
            initialRoute={{id: 'home', index: 0, date: this.date, events: this.eventEmitter}}
            renderScene={this.renderScene}

            configureScene={(route, routeStack) =>
              CustomTransitions.NONE
              //Navigator.SceneConfigs.PushFromRight //tipo iphone
              //Navigator.SceneConfigs.FloatFromBottomAndroid //tipo android
            }

            navigationBar={
              <Navigator.NavigationBar
                routeMapper={{
                  LeftButton: (route, navigator, index, navState) =>
                  {
                    if (route.index === 0) {
                      return (
                        <TouchableOpacity style={{flex: 1, alignItems: 'center',
                            paddingLeft: 5, paddingRight: 5, justifyContent: 'center',}}
                            onPress={this.leftPress.bind(this)}>
                          <Icon
                            name="ios-calendar-outline"
                            size={30}
                            color="#FFFFFF"
                          />
                        </TouchableOpacity>
                      );
                    }
                    else {
                      return (
                        <TouchableOpacity style={styles.barButton}
                                          hitSlop={{top:35,bottom:35,right:45,left:35}}
                                          onPress={this.backPress.bind(this, navigator)}>
                          <View style={{flex:1, flexDirection: 'row', alignItems: 'center',
                          paddingLeft: 5, justifyContent:'center'}}>
                            <View >
                              <Icon
                                name="ios-arrow-back-outline"
                                size={30}
                                color="#FFFFFF"
                              />
                            </View>
                            <View >
                                <Text style={styles.barTextBack}>{'          '}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    }
                  },
                  RightButton: (route, navigator, index, navState) =>
                    {
                      if(route.index === 1){
                        return null;
                      }
                      else{
                        return (
                          <TouchableOpacity
                              style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}
                              onPress={this.rightPress.bind(this, navigator)}>
                            <View style={{flex:1, paddingRight: 5, paddingLeft: 5, flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
                              <Icon
                                name="ios-settings-outline"
                                size={30}
                                color="#FFFFFF"
                              />
                            </View>
                          </TouchableOpacity>
                        );
                      }
                    },
                  Title: (route, navigator, index, navState) =>
                    { return (
                      <View style={styles.container}>
                        <Text style={styles.barText}>{"CPL"}</Text>
                      </View>
                    );},
                }}
                style={styles.bar}
              />
            }
          />
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            date={this.date}
            onConfirm={this.okDatePicker.bind(this)}
            onCancel={this.cancelDatePicker.bind(this)}
            minimumDate={this.minimumDate}
            maximumDate={this.maximumDate}
          />
        </View>
      );
    }
  }

  onDateChangeIos(date){
    console.log('IOS. A date has been picked: ' + date);
    this.auxDate = date;
    this.forceUpdate();
  }

  okDatePicker(androidDate){
    if(Platform.OS === 'ios'){
      this.popupDialog.dismiss();
      this.date = this.auxDate;
      console.log("IOS. Date definitive picked: " + this.date);
      /*this.refs.navIos.replace({
        component: HomeScreen,
        title: 'CPL',
        passProps: {title: 'CPL', naviDate: this.date},
        rightButtonIcon: this.state.settingsIcon,
        onRightButtonPress: () => this.rightPress(),
        leftButtonIcon: this.state.calendarIcon,
        onLeftButtonPress: () => this.leftPress(),
      });*/
    }
    else{
      console.log('ANDROID. Date definitive picked: ' + androidDate);
      this.date = androidDate;
      /*this.refs.navAndroid.replace({
        id: 'home',
        index: 0,
        date: androidDate
      });*/
      this.setState({ isDateTimePickerVisible: false });
    }
    this.eventEmitter.emit('myEvent', { type: 'okPicker', newDate: this.date });
  }

  cancelDatePicker(){
    if(Platform.OS === 'ios'){
      this.popupDialog.dismiss();
    }
    else{
      this.setState({ isDateTimePickerVisible: false });
    }
  }

  backPress(nav){
    nav.pop();
  }

  rightPress(nav){
    this.eventEmitter.emit('myEvent', { type: 'settingsPressed'});
    if(Platform.OS === 'ios'){
      this.refs.navIos.push({
        title: 'Configuració',
        passProps: {title: 'Configuració'},
        component: SettingsScreen
      });
    }
    else{
      nav.push({
        id: 'settings',
        index: 1
      });
    }
  }

  leftPress(){
    this.eventEmitter.emit('calendarPressed');
    /*if(Platform.OS === 'ios'){
      this.auxDate = this.date;
      this.forceUpdate();
      this.popupDialog.show();
    }
    else{
      this.setState({ isDateTimePickerVisible: true });
    }*/
  }

  renderScene(route,nav){
    switch (route.id) {
      case 'home':
        return (
          <HomeScreen naviDate={route.date}
                      events={route.events}
                      navigator={nav} route={route}
                      title="Home" />);
      case 'settings':
        return (<SettingsScreen navigator={nav} route={route} title="Configuració"/>);
      case 'liturgia-display':
        return (<LiturgiaDisplayScreen
                          navigator={nav}
                          route={route}
                          title="Liturgia"
                          type={route.type}
                          variables={route.variables}
                          liturgicProps={route.liturgicProps} />);
    }
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

AppRegistry.registerComponent('NavigatorController', () => NavigatorController);

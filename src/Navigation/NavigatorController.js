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

export default class NavigatorController extends Component {
  componentWillMount() {
    Icon.getImageSource('ios-settings-outline', 30).then((source) => this.setState({ settingsIcon: source }));
    Icon.getImageSource('ios-calendar-outline', 30).then((source) => this.setState({ calendarIcon: source })); //md-calendar
  }

  constructor(props) {
    super(props)

    //this.HS = <HomeScreen ref="HS" />;

    this.state = {
      isDateTimePickerVisible: false,
      settingsIcon: null,
      calendarIcon: null,
      datePressed: false,
    }
  }

  anonimousFunction(nav){
    return <HomeScreen ref="HS" navigator={nav}/>;
  }

  render() {
    if (!this.state.settingsIcon || !this.state.calendarIcon) {
      return false;
    }

    if(Platform.OS === 'ios'){
      return (
          <View style={{flex: 1}}>
            <StatusBar
              barStyle="light-content"
              backgroundColor={GLOBAL.statusBarColor}
            />

            <NavigatorIOS
              ref='navi'
              initialRoute={{
                component: HomeScreen,//this.anonimousFunction.bind(this, navigator),
                title: 'CPL',
                rightButtonIcon: this.state.settingsIcon,
                onRightButtonPress: () => this.rightPress(),
                leftButtonIcon: this.state.calendarIcon,
                onLeftButtonPress: () => this.leftPress(),
              }}

              style={{flex: 1}}
              barTintColor={GLOBAL.barColor}
              tintColor={GLOBAL.itemsBarColor}
              titleTextColor={GLOBAL.itemsBarColor}
            />

            <PopupDialog
                ref={(popupDialog) => { this.popupDialog = popupDialog}}
                dialogTitle={<DialogTitle title="Canvia el dia" />} >
                <DatePickerIOS
                  date={new Date}
                  mode="date"
                  onDateChange={this.onDateChange.bind(this)}
                />
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <TouchableOpacity style={styles.buttonSantContainer} onPress={this.onCancel.bind(this)}>
                      <Text>Cancel·lar</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <TouchableOpacity style={styles.buttonSantContainer} onPress={this.onAcceptar.bind(this)}>
                      <Text>Acceptar</Text>
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
            initialRoute={{id: 'home', index: 0}}
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
                        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                          <Icon
                            name="ios-calendar-outline"
                            size={30}
                            color="#FFFFFF"
                            onPress={this.leftPress.bind(this)}
                          />
                        </TouchableOpacity>
                      );
                    }
                    else {
                      return (
                        <TouchableOpacity style={styles.barButton}
                                            onPress={this.backPress.bind(this, navigator)}>
                          <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
                            <View >
                              <Icon
                                name="ios-arrow-back-outline"
                                size={30}
                                color="#FFFFFF"
                              />
                            </View>
                            <View >
                                <Text style={styles.barTextBack}>{'  '}</Text>
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
                          <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                            <Icon
                              name="ios-settings-outline"
                              size={30}
                              color="#FFFFFF"
                              onPress={this.rightPress.bind(this, navigator)}
                            />
                          </TouchableOpacity>
                        );
                      }
                    },
                  Title: (route, navigator, index, navState) =>
                    { return (
                      <View style={styles.container}>
                        <Text style={styles.barText}>CPL</Text>
                      </View>
                    );},
                }}
                style={styles.bar}
              />
            }
          />
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleDatePicked.bind(this)}
            onCancel={this.hideDateTimePicker.bind(this)}
          />
        </View>
      );
    }
  }

  onDateChange(date){
    console.log('A date has been picked: ' + date);
    //this.setState({date: date});
  };

  onAcceptar(){
    //console.log("data final: " + this.state.date);
    //this.refs.HS.changeDate();
    this.popupDialog.dismiss();
  }

  onCancel(){
    this.popupDialog.dismiss();
  }

  hideDateTimePicker(){
    this.setState({ isDateTimePickerVisible: false });
  }

  handleDatePicked(date){
    console.log('A date has been picked: ' + date);
    //this.refs.HS.changeDate();
    this.hideDateTimePicker();
  }

  backPress(nav){
    nav.pop();
  }

  rightPress(nav){
    if(Platform.OS === 'ios'){
      this.refs.navi.push({
        title: 'Settings',
        passProps: {title: 'Settings'},
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
    if(Platform.OS === 'ios'){
      console.log("pressed-Navigator");
      this.popupDialog.show();
    }
    else{
      this.setState({ isDateTimePickerVisible: true });
    }
  }

  renderScene(route,nav){
    switch (route.id) {
      case 'home':
        return (<HomeScreen navigator={nav} route={route} title="Home"/>);
      case 'settings':
        return (<SettingsScreen navigator={nav} route={route} title="Settings"/>);
      case 'liturgia-display':
        return (<LiturgiaDisplayScreen
                          navigator={nav}
                          route={route}
                          title="Liturgia"
                          type={route.type}
                          date={route.date}
                          liturgicProps={route.liturgicProps} />);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
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
    fontWeight: '600'
  },
  barTextBack: {
    color: GLOBAL.itemsBarColor,
    fontSize: 16,
    fontWeight: '300'
  },
  bar: {
    backgroundColor: GLOBAL.barColor
  }
})

/*<View >
    <Text style={styles.barTextBack}>{' '}CPL</Text>
  </View>*/

AppRegistry.registerComponent('NavigatorController', () => NavigatorController);

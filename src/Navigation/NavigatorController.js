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
  Platform
} from 'react-native';

import HomeScreen from '../Screens/HomeScreen'
import SettingsScreen from '../Screens/SettingsScreen'
import LiturgiaDisplayScreen from '../Screens/LiturgiaDisplayScreen'

import GLOBAL from '../Globals/Globals'
import Icon from 'react-native-vector-icons/Ionicons'

export default class NavigatorController extends Component {
  componentWillMount() {
    Icon.getImageSource('ios-settings', 30).then((source) => this.setState({ gearIcon: source }));
  }

  constructor(props) {
    super(props)

    this.state = {
      gearIcon: null
    }
  }

  render() {
    if (!this.state.gearIcon) {
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
              component: HomeScreen,
              title: 'CPL',
              rightButtonIcon: this.state.gearIcon,
              onRightButtonPress: () => this.setPress()
            }}

            style={{flex: 1}}
            barTintColor={GLOBAL.barColor}
            tintColor={GLOBAL.itemsBarColor}
            titleTextColor={GLOBAL.itemsBarColor}
          />
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
              //Navigator.SceneConfigs.PushFromRight //tipo iphone
              Navigator.SceneConfigs.FloatFromBottomAndroid //tipo android
            }

            navigationBar={
              <Navigator.NavigationBar
                routeMapper={{
                  LeftButton: (route, navigator, index, navState) =>
                  {
                    if (route.index === 0) {
                      return null;
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
                          <TouchableOpacity >
                            <Icon
                              name="ios-settings"
                              size={30}
                              color="#FFFFFF"
                              onPress={this.setPress.bind(this, navigator)}
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
        </View>
      );
    }
  }

  backPress(nav){
    nav.pop();
  }

  setPress(nav){
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
                          hour={route.hour}
                          weekDay={route.weekDay}
                          monthDay= {route.monthDay}
                          month= {route.month}
                          year= {route.year}
                          cicle= {route.cicle}
                          ordinariWeek= {route.ordinariWeek}
                          pasquaWeek= {route.pasquaWeek}
                          quaresmaWeek={route.quaresmaWeek}
                          LT={route.LT}
                          ABC={route.ABC}/>);
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

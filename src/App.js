import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

import GLOBAL from "./Globals/Globals";

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from './Controllers/HomeScreenController';
import SettingsScreen from './Views/SettingsScreen';
import DonationScreen from './Views/DonationScreen';
import CommentScreen from './Views/CommentScreen';
import LHScreen from './Views/LHScreen/LHScreen';
import LHDisplayScreen from './Views/LHScreen/LHDisplayScreen/LHDisplayScreen';
import LDScreen from './Views/LDScreen/LDScreen';
import LDDisplayScreen from './Views/LDScreen/LDDisplayScreen';

const styles = StyleSheet.create({
  titleText: {
    textAlign: 'center',
    color: GLOBAL.itemsBarColor,
    fontSize: 20,
    fontWeight: '600',
  },
});

const HomeStack = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      title: "CPL",
      headerTintColor: 'white',
      headerTitleStyle: { flex: 1, textAlign: 'center', fontSize: 20 },
      headerStyle: { backgroundColor: GLOBAL.barColor },
      headerBackTitle: null,
    },
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      headerTitle: <Text style={styles.titleText}>{'Configuració'}</Text>,
      headerStyle: {
        backgroundColor: GLOBAL.barColor,
      },
      headerTintColor: GLOBAL.itemsBarColor,
    },
  },
  Donation: {
    screen: DonationScreen,
    navigationOptions: {
      headerTitle: <Text style={styles.titleText}>{'Donatiu lliure'}</Text>,
      headerStyle: {
        backgroundColor: GLOBAL.barColor,
      },
      headerTintColor: GLOBAL.itemsBarColor,
    },
  },
  Comment: {
    screen: CommentScreen,
    navigationOptions: {
      headerTitle: <Text style={styles.titleText}>{'Missatge'}</Text>,
      headerStyle: {
        backgroundColor: GLOBAL.barColor,
      },
      headerTintColor: GLOBAL.itemsBarColor,
    },
  },
});
HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const LHStack = createStackNavigator({
  LHScreen: {
    screen: LHScreen,
    navigationOptions: {

      title: "Litúrgia de les Hores",
      headerTintColor: 'white',
      headerTitleStyle: { flex: 1, textAlign: 'center', fontSize: 20 },
      headerStyle: { backgroundColor: GLOBAL.barColor },
      headerBackTitle: null,
    },
  },
  LHDisplay: {
    screen: LHDisplayScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <Text style={styles.titleText}>{navigation.state.params.title}</Text>,
      headerStyle: {
        backgroundColor: GLOBAL.barColor,
      },
      headerTintColor: GLOBAL.itemsBarColor,
    }),
  }
});
LHStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const LDStack = createStackNavigator({
  LDScreen: {
    screen: LDScreen,
    navigationOptions: {
      title: "Missa",
      headerTintColor: 'white',
      headerTitleStyle: { flex: 1, textAlign: 'center', fontSize: 20 },
      headerStyle: { backgroundColor: GLOBAL.barColor },
      headerBackTitle: null,
      tabStyle: { backgroundColor: 'red', marginRight: 20, width: 100 },
    },
  },
  LDDisplay: {
    screen: LDDisplayScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <Text style={styles.titleText}>{navigation.state.params.title}</Text>,
      headerStyle: {
        backgroundColor: GLOBAL.barColor,
      },
      headerTintColor: GLOBAL.itemsBarColor,
    }),
  }
});
LDStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    LH: { screen: LHStack },
    LD: { screen: LDStack }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {

        const { routeName } = navigation.state;

        switch(routeName) {
          case "Home":
              return (
                <View style={{ padding: 10 }}>
                  {focused ?
                    <Image source={require('./Globals/img/icons/home_pressed.png')}
                      style={{ flex: 1, resizeMode: 'contain', tintColor: 'white' }} />
                    :
                    <Image source={require('./Globals/img/icons/home.png')}
                      style={{ flex: 1, resizeMode: 'contain', tintColor: 'white' }} />
                  }
                </View>
              )

          case "LH":
              return (
                <View style={{ padding: 10 }}>
                  {focused ?
                    <Image source={require('./Globals/img/icons/LH_pressed.png')}
                      style={{ flex: 1, resizeMode: 'contain', tintColor: 'white' }} />
                    :
                    <Image source={require('./Globals/img/icons/LH.png')}
                      style={{ flex: 1, resizeMode: 'contain', tintColor: 'white' }} />
                  }
                </View>
              )

          case "LD":
              return (
                <View style={{ padding: 10 }}>
                  {focused ?
                    <Image source={require('./Globals/img/icons/LD_pressed.png')}
                      style={{ flex: 1, resizeMode: 'contain', tintColor: 'white' }} />
                    :
                    <Image source={require('./Globals/img/icons/LD.png')}
                      style={{ flex: 1, resizeMode: 'contain', tintColor: 'white' }} />
                  }
                </View>
              )
        }
      },
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        if (navigation.isFocused()) {
          // Do nothing
        }
        else {
          // Going to screen pressed
          defaultHandler()
        }
      },
    }),
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: GLOBAL.barColor,
      }
    },
    tabBarPosition: 'bottom',
    lazy: false, //false => Renderitzar totes les tabs a l'inici
    animationEnabled: false,
    swipeEnabled: false,
  }
);

export default createAppContainer(TabNavigator);
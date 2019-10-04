import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, Platform } from 'react-native';
import { TabNavigator, TabBarBottom, StackNavigator } from "react-navigation";

import GLOBAL from "./Globals/Globals";

import HomeScreen from './Controllers/HomeScreenController';
import SettingsScreen from './Views/SettingsScreen';
import DonationScreen from './Views/DonationScreen';
import CommentScreen from './Views/CommentScreen';
import LHDisplayScreen from './Views/LHScreen/LHDisplayScreen/LHDisplayScreen';
import LDDisplayScreen from './Views/LDScreen/LDDisplayScreen';
import LHScreen from './Views/LHScreen/LHScreen';
import LDScreen from './Views/LDScreen/LDScreen';
import TabBar from './Views/TabBar';

const styles = StyleSheet.create({
  titleText: {
    textAlign: 'center',
    color: GLOBAL.itemsBarColor,
    fontSize: 20,
    fontWeight: '600',
  },
});

const HomeStack = StackNavigator({

  //======== HOME TAB =========

  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      title: "CPL",
      headerTintColor: 'white',
      headerTitleStyle: { flex: 1, textAlign: 'center', fontSize: 20 },
      headerStyle: { backgroundColor: GLOBAL.barColor },
      headerBackTitle: null,
      tabBarIcon: ({ focused, tintColor }) => {
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
      },
      tabBarOnPress: (values) => {
        const { previousScene, scene, jumpToIndex } = values;

        if (scene.focused) {

        }
        else {
          jumpToIndex(scene.index);
        }
      },
    },
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarVisible: false,
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
      tabBarVisible: false,
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
      tabBarVisible: false,
      headerTitle: <Text style={styles.titleText}>{'Missatge'}</Text>,
      headerStyle: {
        backgroundColor: GLOBAL.barColor,
      },
      headerTintColor: GLOBAL.itemsBarColor,
    },
  },
});

//===========================

//========== LH TAB =========

const LHStack = StackNavigator({
  LHScreen: {
    screen: LHScreen,
    navigationOptions: {

      title: "Litúrgia de les Hores",
      headerTintColor: 'white',
      headerTitleStyle: { flex: 1, textAlign: 'center', fontSize: 20 },
      headerStyle: { backgroundColor: GLOBAL.barColor },
      headerBackTitle: null,
      tabBarIcon: ({ focused, tintColor }) => {
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
      },
      tabBarOnPress: (values) => {
        const { previousScene, scene, jumpToIndex } = values;

        if (scene.focused) {
        }
        else {
          if(scene.route.routes[0].params !== undefined)
            scene.route.routes[0].params.Refresh_LH();
          jumpToIndex(scene.index);
        }
      },
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
      tabBarVisible: false,
    }),
  }
});

//===========================

//========== LD TAB =========

const LDStack = StackNavigator({
  LDScreen: {
    screen: LDScreen,
    navigationOptions: {
      title: "Missa",
      headerTintColor: 'white',
      headerTitleStyle: { flex: 1, textAlign: 'center', fontSize: 20 },
      headerStyle: { backgroundColor: GLOBAL.barColor },
      headerBackTitle: null,
      tabBarIcon: ({ focused, tintColor }) => {
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
      },
      tabStyle: { backgroundColor: 'red', marginRight: 20, width: 100 },
      tabBarOnPress: (values) => {
        const { previousScene, scene, jumpToIndex } = values;
        if (scene.focused) {
        }
        else {
          if(scene.route.routes[0].params !== undefined)
            scene.route.routes[0].params.Refresh_LD();
          jumpToIndex(scene.index);
        }
      },
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
      tabBarVisible: false,
    }),
  }
});

export default TabNavigator(
  {
    Home: { screen: HomeStack },
    LH: { screen: LHStack },
    LD: { screen: LDStack },
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: GLOBAL.barColor,
      }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    lazy: false, //false => Renderitzar totes les tabs a l'inici
    animationEnabled: false,
    swipeEnabled: false,
  }
);

import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, Platform } from 'react-native';
import { TabNavigator, TabBarBottom, StackNavigator } from "react-navigation";

import GLOBAL from "./Globals/Globals";

import GenericHeader from './Views/HeaderBar.js';
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
      tabBarIcon: ({ focused, tintColor }) => {
        return (
          <View style={{ padding: 10 }}>
            {focused ?
              <Image source={require('./Globals/img/icons/home.png')}
                style={{ flex: 1, resizeMode: 'contain', tintColor: '#a8a8a8' }} />
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
      headerTitle: <Text style={styles.titleText}>{'Donatiu'}</Text>,
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
      headerTitle: <Text style={styles.titleText}>{'Comentari'}</Text>,
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
      headerTitle: <GenericHeader title={"Litúrgia de les hores"} left_padding={Platform.OS === 'ios' ? 0 : 160} />,
      headerStyle: {
        backgroundColor: GLOBAL.barColor,
      },
      tabBarIcon: ({ focused, tintColor }) => {
        return (
          <View style={{ padding: 10 }}>
            {focused ?
              <Image source={require('./Globals/img/icons/LH.png')}
                style={{ flex: 1, resizeMode: 'contain', tintColor: '#a8a8a8' }} />
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
      headerTitle: <GenericHeader title={"Litúrgia diària"} left_padding={Platform.OS === 'ios' ? 0 : 160} />,
      headerStyle: {
        backgroundColor: GLOBAL.barColor,
      },
      tabBarIcon: ({ focused, tintColor }) => {
        return (
          <View style={{ padding: 10 }}>
            {focused ?
              <Image source={require('./Globals/img/icons/LD.png')}
                style={{ flex: 1, resizeMode: 'contain', tintColor: '#a8a8a8' }} />
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
        backgroundColor: GLOBAL.barColor
      }
    },
    //tabBarComponent: TabBar,
    tabBarPosition: 'bottom',
    lazy: false, //Per renderitzar totes les tabs a l'inici
    animationEnabled: false,
    swipeEnabled: false,
  }
);

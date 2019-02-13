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
                style={{ flex: 1, resizeMode: 'contain', tintColor: '#c9c9c9' }} />
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
                style={{ flex: 1, resizeMode: 'contain', tintColor: '#c9c9c9' }} />
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
                style={{ flex: 1, resizeMode: 'contain', tintColor: '#c9c9c9' }} />
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
      tabBarVisible: false,//(navigation.state.index <= 0),
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
    //lazy: false, //Per render totes les tabs al principi
    animationEnabled: false,
    swipeEnabled: false,
  }
);


/*
This will hide the tab bar any time we navigate away from the feed home. We could switch visibility based on route name, but it would be strange to have the tab bar be hidden and then appear again when pushing another route — it should only be visible when returning to a route where it was previously visible.

Another option here would be to add another stack navigator as a parent of the tab navigator, and put the details screen there. This is recommended.

const FeedStack = createStackNavigator({
  FeedHome: FeedScreen,
  /* any other route you want to render under the tab bar */
/*});

const TabNavigator = createBottomTabNavigator({
  Feed: FeedStack,
  Profile: ProfileScreen,
});

const HomeStack = createStackNavigator({
  Tabs: TabNavigator,
  Details: DetailsScreen,
  /* any other route you want to render above the tab bar */
/*});

const AppNavigator = createSwitchNavigator({
  Auth: AuthScreen,
  Home: HomeStack,
});

*/
import React, { Component } from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {TabNavigator, TabBarBottom, StackNavigator} from "react-navigation";

import GLOBAL from "./src/Globals/Globals";

import GenericHeader from './fuking_header.js';
import HomeScreen from './src/Controllers/HomeScreenController';
import SettingsScreen from './src/Views/SettingsScreen';
import DonationScreen from './src/Views/DonationScreen';
import CommentScreen from './src/Views/CommentScreen';
import LHDisplayScreen from './src/Views/LHScreen/LHDisplayScreen/LHDisplayScreen';
import LHScreen from './src/Views/LHScreen/LHScreen';
import LDScreen from './src/Views/LDScreen/LDScreen';

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
      //headerTitle: <HeaderBar />,
      //headerStyle: Styles.headerBarContainer,
      tabBarIcon: ({ focused, tintColor }) => {
        return (
          <View style={{padding: 10, backgroundColor:'yellow'}}>
            {focused?
              <Image source={require('./src/Globals/img/icons/back.png')}
                          style={{flex: 1, resizeMode:'contain',}}/>
                          :
              <Image source={require('./src/Globals/img/icons/back.png')}
                          style={{flex: 1, resizeMode:'contain',}}/>
            }
          </View>
        )

      },
      tabBarOnPress: (values) => {
        const { previousScene, scene, jumpToIndex } = values;

        //console.log("events scene",scene);

        if(scene.focused){
          //scene.route.routes[0].params.scrollToTop();
        }
        else{
          jumpToIndex(scene.index);
        }
      },
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
      headerTitle: <GenericHeader />,
      headerStyle: {
        backgroundColor: GLOBAL.barColor,
      },
      tabBarIcon: ({ focused, tintColor }) => {
        return (
          <View style={{padding: 10, backgroundColor: 'red'}}>
            {focused?
              <Image source={require('./src/Globals/img/icons/back.png')}
                          style={{flex: 1, resizeMode:'contain'}}/>
              :
              <Image source={require('./src/Globals/img/icons/back.png')}
                          style={{flex: 1, resizeMode:'contain'}}/>
            }
          </View>
        )
      },
      tabBarOnPress: (values) => {
        const { previousScene, scene, jumpToIndex } = values;

        //console.log("groups scene",scene);

        if(scene.focused){
          //scene.route.routes[0].params.scrollToTop();
        }
        else{
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
    }),
  }
});

//===========================

//========== LD TAB =========

const LDStack = StackNavigator({
  LDScreen: {
    screen: LDScreen,
    navigationOptions: {
      headerTitle: <GenericHeader />,
      headerStyle: {
        backgroundColor: GLOBAL.barColor,
      },
      tabBarIcon: ({ focused, tintColor }) => {
        return (
          <View style={{padding: 10, backgroundColor: 'blue'}}>
            {focused?
              <Image source={require('./src/Globals/img/icons/back.png')}
                          style={{flex: 1, resizeMode:'contain'}}/>
              :
              <Image source={require('./src/Globals/img/icons/back.png')}
                          style={{flex: 1, resizeMode:'contain'}}/>
            }
          </View>
        )
      },
      tabBarOnPress: (values) => {
        const { previousScene, scene, jumpToIndex } = values;

        //console.log("groups scene",scene);

        if(scene.focused){
          //scene.route.routes[0].params.scrollToTop();
        }
        else{
          jumpToIndex(scene.index);
        }
      },
    },
  },
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
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);

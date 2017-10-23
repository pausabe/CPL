import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreenController from '../../Controllers/HomeScreen/HomeScreenController';
import LiturgiaDisplayScreen from '../../Views/LiturgiaDisplayScreen/LiturgiaDisplayScreen';
import SettingsScreen from '../../Views/SettingsScreen';
import GLOBAL from "../../Globals/Globals";

const styles = StyleSheet.create({
  titleText: {
    textAlign: 'center',
    color: GLOBAL.itemsBarColor,
    fontSize: 20,
    fontWeight: '600',
  },
});

export const NavigatorAndroid = StackNavigator({
  Home: {
    screen: HomeScreenController,
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


  LiturgiaDisplay: {
    screen: LiturgiaDisplayScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <Text style={styles.titleText}>{navigation.state.params.title}</Text>,
      headerStyle: {
        backgroundColor: GLOBAL.barColor,
      },
      headerTintColor: GLOBAL.itemsBarColor,
    }),
  }
});

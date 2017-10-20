import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from '../Screens/HomeScreen';
import LiturgiaDisplayScreen from '../Screens/LiturgiaDisplayScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import GLOBAL from "../Globals/Globals";
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  titleText: {
    textAlign: 'center',
    color: GLOBAL.itemsBarColor,
    fontSize: 20,
    fontWeight: '600',
  },
});

export const NavStack = StackNavigator({
  Home: {
    screen: HomeScreen,
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

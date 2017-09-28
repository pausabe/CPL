import React from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from '../Screens/HomeScreen';
import LiturgiaDisplayScreen from '../Screens/LiturgiaDisplayScreen';
import SettingsScreen from '../Screens/SettingsScreen'

export const NavStack = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'CPL',
    },
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Configuració',
    },
  },
  LiturgiaDisplay: {
    screen: LiturgiaDisplayScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
    }),
  }
});

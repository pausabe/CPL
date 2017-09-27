import React from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from '../Screens/HomeScreen';
//import LiturgiaDisplayScreen from '../Screens/LiturgiaDisplayScreen';

export const NavStack = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'CPL',
    },
  },
  /*LiturgiaDisplay: {
    screen: LiturgiaDisplayScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params,
    }),
  }*/
});

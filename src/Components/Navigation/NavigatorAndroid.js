import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreenController from '../../Controllers/HomeScreenController';
import LHDisplayScreen from '../../Views/LHScreen/LHDisplayScreen/LHDisplayScreen';
import SettingsScreen from '../../Views/SettingsScreen';
import DonationScreen from '../../Views/DonationScreen';
import CommentScreen from '../../Views/CommentScreen';
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

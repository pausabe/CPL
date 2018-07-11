import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  WebView,
 } from 'react-native';

import GLOBAL from "../Globals/Globals";

export default class DonationScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <WebView
          source={{uri: 'https://mescpl.cpl.es/donacions/'}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GLOBAL.backgroundColor,
  },
});

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  WebView
 } from 'react-native';

export default class LDScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello2</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

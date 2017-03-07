import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class LiturgiaDisplayScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.normalText}>{this.props.aha}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E1F5FE',
  },
  normalText: {
    textAlign: 'center',
    color: '#000000',
    fontWeight: '300'
  }
})

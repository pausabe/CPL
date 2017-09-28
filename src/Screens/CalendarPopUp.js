import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Platform } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import GLOBAL from "../Globals/Globals";

export default class CalendarPopUp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <DateTimePicker isVisible={true} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

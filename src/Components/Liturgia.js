import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Platform
 } from 'react-native';

import Hr from 'react-native-hr';
import LiturgiaDisplayScreen from '../Screens/LiturgiaDisplayScreen'

export default class Liturgia extends Component {
  onButtonPress(idPressed, type, component){
    if(Platform.OS === 'ios'){
      this.props.navigator.push({
        title: type,
        passProps: {
          type: type,
          hour: this.props.hour,
          day: this.props.day,
          month: this.props.month,
          year: this.props.year
        },
        component: component
      });
    }
    else{
      this.props.navigator.push({
        id: idPressed,
        type: type,
        index: 1,
        hour: this.props.hour,
        day: this.props.day,
        month: this.props.month,
        year: this.props.year
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonContainer} onPress={
        this.onButtonPress.bind(this, "liturgia-display", "Ofici", LiturgiaDisplayScreen)}>
         <Text style={styles.buttonText}>Ofici</Text>
       </TouchableOpacity>
       <Hr lineColor='#90A4AE' />
       <TouchableOpacity style={styles.buttonContainer} onPress={
       this.onButtonPress.bind(this, "liturgia-display", "Laudes", LiturgiaDisplayScreen)}>
         <Text style={styles.buttonText}>Laudes</Text>
       </TouchableOpacity>
       <Hr lineColor='#90A4AE' />
       <TouchableOpacity style={styles.buttonContainer} onPress={
       this.onButtonPress.bind(this, "liturgia-display", "Hora menor", LiturgiaDisplayScreen)}>
         <Text style={styles.buttonText}>Hora menor</Text>
       </TouchableOpacity>
       <Hr lineColor='#90A4AE' />
       <TouchableOpacity style={styles.buttonContainer} onPress={
       this.onButtonPress.bind(this, "liturgia-display", "Vespres", LiturgiaDisplayScreen)}>
         <Text style={styles.buttonText}>Vespres</Text>
       </TouchableOpacity>
       <Hr lineColor='#90A4AE' />
       <TouchableOpacity style={styles.buttonContainer} onPress={
       this.onButtonPress.bind(this, "liturgia-display", "Completes", LiturgiaDisplayScreen)}>
         <Text style={styles.buttonText}>Completes</Text>
       </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    opacity: 0.75,
    borderRadius: 15
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: '400'
  },
  hrstyle: {
    backgroundColor: '#263238',
    height: 4
  }
})

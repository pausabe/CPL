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
    if(this.props.liturgicProps.LITURGIA !== null){
      if(Platform.OS === 'ios'){
        this.props.navigator.push({
          title: type,
          passProps: {
            type: type,
            date: this.props.date,
            variables: this.props.variables,
            liturgicProps: this.props.liturgicProps,
          },
          component: component
        });
      }
      else{
        this.props.navigator.push({
          id: idPressed,
          type: type,
          index: 1,
          variables: this.props.variables,
          date: this.props.date,
          liturgicProps: this.props.liturgicProps,
        });
      }
    }
  }

  render() {
    var nowDate = new Date();
    var hour = nowDate.getHours();
    console.log("Hour: " + hour);
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonContainer} onPress={
        this.onButtonPress.bind(this, "liturgia-display", "Ofici", LiturgiaDisplayScreen)}>
         <Text style={styles.buttonText}>Ofici</Text>
       </TouchableOpacity>
       <Hr lineColor='#90A4AE' />
       <TouchableOpacity style={styles.buttonContainer} onPress={
       this.onButtonPress.bind(this, "liturgia-display", "Laudes", LiturgiaDisplayScreen)}>
         <Text style={styles.buttonText}>{hour > 5 && hour < 9 ? "* Laudes *" : "Laudes"}</Text>
       </TouchableOpacity>
       <Hr lineColor='#90A4AE' />
       <View style={{flex:1, flexDirection: 'column'}}>
         <View style={{flex:1, paddingTop: 10}}>
          <Text style={styles.buttonText}>Hora menor</Text>
         </View>
         <View style={{flex:2, flexDirection: 'row'}}>
           <TouchableOpacity style={styles.buttonContainer} onPress={
           this.onButtonPress.bind(this, "liturgia-display", "Tèrcia", LiturgiaDisplayScreen)}>
             <Text style={styles.horaMenorText}>{hour > 8 && hour < 12 ? "* Tèrcia *" : "Tèrcia"}</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.buttonContainer} onPress={
           this.onButtonPress.bind(this, "liturgia-display", "Sexta", LiturgiaDisplayScreen)}>
             <Text style={styles.horaMenorText}>{hour > 11 && hour < 15 ? "* Sexta *" : "Sexta"}</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.buttonContainer} onPress={
           this.onButtonPress.bind(this, "liturgia-display", "Nona", LiturgiaDisplayScreen)}>
             <Text style={styles.horaMenorText}>{hour > 14 && hour < 18 ? "* Nona *" : "Nona"}</Text>
           </TouchableOpacity>
         </View>
       </View>
       <Hr lineColor='#90A4AE' />
       <TouchableOpacity style={styles.buttonContainer} onPress={
       this.onButtonPress.bind(this, "liturgia-display", "Vespres", LiturgiaDisplayScreen)}>
         <Text style={styles.buttonText}>{hour > 17 && hour < 23 ? "* Vespres *" : "Vespres"}</Text>
         {this.props.liturgicProps.LITURGIA && (this.props.variables.date.getDay() === 6 || this.props.liturgicProps.LITURGIA.vespres1) ?
            <Text style={styles.redCenter}>Primeres Vespres</Text>
          : null }
       </TouchableOpacity>
       <Hr lineColor='#90A4AE' />
       <TouchableOpacity style={styles.buttonContainer} onPress={
       this.onButtonPress.bind(this, "liturgia-display", "Completes", LiturgiaDisplayScreen)}>
         <Text style={styles.buttonText}>{hour > 22  || hour < 2 ? "* Completes *" : "Completes"}</Text>
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
  horaMenorText: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 18,
    fontWeight: '400'
  },
  hrstyle: {
    backgroundColor: '#263238',
    height: 4
  },
  redCenter: {
    color: '#FF0000',
    fontSize: 15,
    textAlign: 'center'
  },
})

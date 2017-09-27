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
  componentDidMount() {
    //this.props.events.addListener('litEvent', this.openTest.bind(this));
  }

  /*openTest(args){
    console.log("open test");
    if(args.id === 0){
      this.props.navigator.push({
        title: 'testing - Ofici',
        passProps: {
          type: 'Ofici',
          date: this.props.date,
          variables: this.props.variables,
          liturgicProps: this.props.liturgicProps,
        },
        component: LiturgiaDisplayScreen
      });
    }
    else if(args.id === 1){
      this.props.navigator.push({
        title: 'testing - Laudes',
        passProps: {
          type: 'Laudes',
          date: this.props.date,
          variables: this.props.variables,
          liturgicProps: this.props.liturgicProps,
        },
        component: LiturgiaDisplayScreen
      });
    }

    this.props.navigator.push({
      title: 'testing - Tèrcia',
      passProps: {
        type: 'Tèrcia',
        date: this.props.date,
        variables: this.props.variables,
        liturgicProps: this.props.liturgicProps,
      },
      component: LiturgiaDisplayScreen
    });
    this.props.navigator.push({
      title: 'testing - Tèrcia',
      passProps: {
        type: 'Tèrcia',
        date: this.props.date,
        variables: this.props.variables,
        liturgicProps: this.props.liturgicProps,
      },
      component: LiturgiaDisplayScreen
    });
    this.props.navigator.push({
      title: 'testing - Sexta',
      passProps: {
        type: 'Sexta',
        date: this.props.date,
        variables: this.props.variables,
        liturgicProps: this.props.liturgicProps,
      },
      component: LiturgiaDisplayScreen
    });
    this.props.navigator.push({
      title: 'testing - Nona',
      passProps: {
        type: 'Nona',
        date: this.props.date,
        variables: this.props.variables,
        liturgicProps: this.props.liturgicProps,
      },
      component: LiturgiaDisplayScreen
    });
    this.props.navigator.push({
      title: 'testing - Completes',
      passProps: {
        type: 'Completes',
        date: this.props.date,
        variables: this.props.variables,
        liturgicProps: this.props.liturgicProps,
      },
      component: LiturgiaDisplayScreen
    });
  }*/

  onButtonPress(idPressed, type, component){
    var title = type;
    if(type === 'Ofici') title = 'Ofici de lectura';
    this.props.HS.liturgiaPressed();
    if(this.props.liturgicProps.LITURGIA !== null){
      if(Platform.OS === 'ios'){
        this.props.navigator.push({
          title: title,
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
        this.props.navigation.navigate('LiturgiaDisplay', 'YEAH');
      }
      /*else{
        this.props.navigator.push({
          id: idPressed,
          type: type,
          index: 1,
          variables: this.props.variables,
          date: this.props.date,
          liturgicProps: this.props.liturgicProps,
        });
      }*/
    }
  }

  render() {
    var nowDate = new Date();
    var hour = nowDate.getHours();
    //console.log("Hour: " + hour);
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonContainer} onPress={
        this.onButtonPress.bind(this, "liturgia-display", "Ofici", LiturgiaDisplayScreen)}>
         <Text style={styles.buttonText}>Ofici de lectura</Text>
       </TouchableOpacity>
       <Hr lineColor='#90A4AE' />
       <TouchableOpacity style={styles.buttonContainer} onPress={
       this.onButtonPress.bind(this, "liturgia-display", "Laudes", LiturgiaDisplayScreen)}>
         {hour > 5 && hour < 9 ?
           <Text style={styles.buttonTextBold}>{"Laudes"}</Text>
           :
           <Text style={styles.buttonText}>{"Laudes"}</Text>
         }
       </TouchableOpacity>
       <Hr lineColor='#90A4AE' />
       <View style={{flex:1, flexDirection: 'column'}}>
         <View style={{flex:1, paddingTop: 5}}>
          <Text style={styles.buttonText}>Hora menor</Text>
         </View>
         <View style={{flex:2, flexDirection: 'row'}}>
           <TouchableOpacity style={styles.buttonContainer} onPress={
           this.onButtonPress.bind(this, "liturgia-display", "Tèrcia", LiturgiaDisplayScreen)}>
             {hour > 8 && hour < 12 ?
               <Text style={styles.horaMenorTextBold}>{"Tèrcia"}</Text>
               :
               <Text style={styles.horaMenorText}>{"Tèrcia"}</Text>
             }
           </TouchableOpacity>
           <TouchableOpacity style={styles.buttonContainer} onPress={
           this.onButtonPress.bind(this, "liturgia-display", "Sexta", LiturgiaDisplayScreen)}>
             {hour > 11 && hour < 15 ?
               <Text style={styles.horaMenorTextBold}>{"Sexta"}</Text>
               :
               <Text style={styles.horaMenorText}>{"Sexta"}</Text>
             }
           </TouchableOpacity>
           <TouchableOpacity style={styles.buttonContainer} onPress={
           this.onButtonPress.bind(this, "liturgia-display", "Nona", LiturgiaDisplayScreen)}>
             {hour > 14 && hour < 18 ?
               <Text style={styles.horaMenorTextBold}>{"Nona"}</Text>
               :
               <Text style={styles.horaMenorText}>{"Nona"}</Text>
             }
           </TouchableOpacity>
         </View>
       </View>
       <Hr lineColor='#90A4AE' />
       <TouchableOpacity style={styles.buttonContainer} onPress={
       this.onButtonPress.bind(this, "liturgia-display", "Vespres", LiturgiaDisplayScreen)}>
        {hour > 17 && hour <= 23 ?
          <Text style={styles.buttonTextBold}>{"Vespres"}</Text>
          :
          <Text style={styles.buttonText}>{"Vespres"}</Text>
        }
         {this.props.liturgicProps.LITURGIA &&
           ((this.props.variables.date.getDay() === 6 /*&& this.props.variables.celType !== 'F'*/
              && this.props.variables.celType !== 'S')
            || this.props.liturgicProps.LITURGIA.vespres1) ?
            <Text style={styles.redCenter}>Primeres Vespres</Text>
          : null }
       </TouchableOpacity>
       <Hr lineColor='#90A4AE' />
       <TouchableOpacity style={styles.buttonContainer} onPress={
       this.onButtonPress.bind(this, "liturgia-display", "Completes", LiturgiaDisplayScreen)}>
         {hour >= 0 && hour < 2 ?
           <Text style={styles.buttonTextBold}>{"Completes"}</Text>
           :
           <Text style={styles.buttonText}>{"Completes"}</Text>
         }
       </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 10
    },
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
    color: '#000000',
    fontSize: 18,
    fontWeight: 'normal'
  },
  buttonTextBold: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 17,
    fontWeight: 'bold',
  },
  horaMenorText: {
    textAlign: 'center',
    color: '#595959',
    fontSize: 16,
    fontWeight: 'normal'
  },
  horaMenorTextBold: {
    textAlign: 'center',
    color: '#595959',
    fontSize: 16,
    fontWeight: 'bold'
  },
  hrstyle: {
    backgroundColor: '#263238',
    height: 4
  },
  redCenter: {
    color: '#FF0000',
    fontSize: 14,
    textAlign: 'center'
  },
})

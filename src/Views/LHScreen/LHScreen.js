import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
 } from 'react-native';

 import LHButtons from './LHButtons';
 import EventEmitter from 'EventEmitter';

export default class LHScreen extends Component {
  componentWillMount(){
    this.eventEmitter = new EventEmitter();
  }

  LHButtonCB(type, superTestMode){
    var title = type;
    if(type === 'Ofici') title = 'Ofici de lectura';

    //if(this.liturgicProps.LITURGIA !== null){
      var params = {
        title: title,
        props: {
          superTestMode: superTestMode,
          testErrorCallBack: this.testErrorCallBack.bind(this),
          nextDayTestCB: this.nextDayTest.bind(this),
          setNumSalmInv: this.setNumSalmInv.bind(this),
          setNumAntMare: this.setNumAntMare.bind(this),
          type: type,
          //variables: this.variables,
          //date: this.date,
          //liturgicProps: this.liturgicProps,
          emitShareCB: this.emitShare.bind(this),
          events: this.eventEmitter
        },
      }
      this.props.navigation.navigate('LHDisplay', params);
    //}
  }

  nextDayTest(){

  }

  emitShare(type){
    console.log("emitShare: " + type);
    switch (type) {
      case "Ofici":
        this.eventEmitter.emit('shareButtonPressed_Ofici');
        break;
      case "Laudes":
        this.eventEmitter.emit('shareButtonPressed_Laudes');
        break;
      case "Tèrcia":
      case "Sexta":
      case "Nona":
        this.eventEmitter.emit('shareButtonPressed_Menor');
        break;
      case "Vespres":
        this.eventEmitter.emit('shareButtonPressed_Vespres');
        break;
      case "Completes":
        this.eventEmitter.emit('shareButtonPressed_Completes');
        break;
    }
  }

  setNumSalmInv(numSalm){
    this.variables.numSalmInv = numSalm; //TODO:
  }

  setNumAntMare(numAntMare){
    this.variables.numAntMare = numAntMare; //TODO:
  }

  testErrorCallBack(){
    /*this.setState({testInfo: "something went wrong (bad text)"});
    console.log("InfoLog. super error (bad text))");
    this.testing = false;*/
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Litúrgia de les hores</Text>
        <View style={styles.liturgiaContainer}>
             <LHButtons

               //ViewData={this.props.ViewData}
               //variables={this.props.variables}
               
               oficiCB={this.LHButtonCB.bind(this, "Ofici", false)}
               laudesCB={this.LHButtonCB.bind(this, "Laudes", false)}
               terciaCB={this.LHButtonCB.bind(this, "Tèrcia", false)}
               sextaCB={this.LHButtonCB.bind(this, "Sexta", false)}
               nonaCB={this.LHButtonCB.bind(this, "Nona", false)}
               vespresCB={this.LHButtonCB.bind(this, "Vespres", false)}
               completesCB={this.LHButtonCB.bind(this, "Completes", false)}/>
           </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  liturgiaContainer: {
    flex: 6,
    marginBottom: 10,
    marginHorizontal: 10,
  },
});

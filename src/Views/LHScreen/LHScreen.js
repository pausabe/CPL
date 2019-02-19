import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';

import LHButtons from './LHButtons';
import EventEmitter from 'EventEmitter';

export default class LHScreen extends Component {
  componentWillMount() {
    this.eventEmitter = new EventEmitter();
  }

  componentDidMount() {
    this.props.navigation.setParams({
      Refresh_LH: this.Refresh_Layout.bind(this),
    });
  }

  Refresh_Layout(){
    this.forceUpdate();
  }

  LHButtonCB(type, superTestMode) {
    var title = type;
    if (type === 'Ofici') title = 'Ofici de lectura';

    var params = {
      title: title,
      props: {
        superTestMode: superTestMode,
        testErrorCallBack: this.testErrorCallBack.bind(this),
        nextDayTestCB: this.nextDayTest.bind(this),
        setNumSalmInv: this.setNumSalmInv.bind(this),
        setNumAntMare: this.setNumAntMare.bind(this),
        type: type,
        emitShareCB: this.emitShare.bind(this),
        events: this.eventEmitter
      },
    }
    this.props.navigation.navigate('LHDisplay', params);
  }

  nextDayTest() {

  }

  emitShare(type) {
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

  setNumSalmInv(numSalm) {
    G_VALUES.numSalmInv = numSalm;
  }

  setNumAntMare(numAntMare) {
    G_VALUES.numAntMare = numAntMare;
  }

  testErrorCallBack() {
    /*this.setState({testInfo: "something went wrong (bad text)"});
    console.log("InfoLog. super error (bad text))");
    this.testing = false;*/
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.liturgiaContainer}>
          <LHButtons
            oficiCB={this.LHButtonCB.bind(this, "Ofici", false)}
            laudesCB={this.LHButtonCB.bind(this, "Laudes", false)}
            terciaCB={this.LHButtonCB.bind(this, "Tèrcia", false)}
            sextaCB={this.LHButtonCB.bind(this, "Sexta", false)}
            nonaCB={this.LHButtonCB.bind(this, "Nona", false)}
            vespresCB={this.LHButtonCB.bind(this, "Vespres", false)}
            completesCB={this.LHButtonCB.bind(this, "Completes", false)} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'rgb(215, 215, 215)'
    backgroundColor: 'white',
  },
  liturgiaContainer: {
    flex: 6,
    margin: 30,
    /*marginBottom: 10,
    marginHorizontal: 10,*/
  },
  /*backgroundImage: {
    flex: 1,
    backgroundColor: 'transparent',
    width: null,
    height: null,
    //resizeMode: 'cover',
  },*/
});

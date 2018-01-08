import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Platform } from 'react-native';

import Ofici from './OracioDisplay/OficiDisplay'
import Laudes from './OracioDisplay/LaudesDisplay'
import Vespres from './OracioDisplay/VespresDisplay'
import HoraMenor from './OracioDisplay/HoraMenorDisplay'
import Completes from './OracioDisplay/CompletesDisplay'
import GLOBAL from "../../Globals/Globals";

function paddingBar(){
  if(Platform.OS === 'ios'){
    return 44; //64
  }
  return 0; //55;
}

export default class LiturgiaDisplayScreen extends Component {
  componentWillMount(){
    if(Platform.OS === 'ios'){
      barPad = 0;
    }

    if(Platform.OS === 'android'){
      this.props = this.props.navigation.state.params.props;
    }

    this.setState({type: this.props.type})
  }

  componentDidMount(){
    if(this.props.superTestMode){
      setTimeout(() => {
        this.setState({type: 'Laudes'});
      }, 1000);
    }
  }

  componentDidUpdate(){
    // console.log("LITDISPLAY updated");
    if(this.props.superTestMode){
      // console.log("TESTING OPEN - " + this.state.type);
      if(this.state.type === 'Laudes') this.setState({type: 'Tèrcia'});
      else if(this.state.type === 'Tèrcia') this.setState({type: 'Sexta'});
      else if(this.state.type === 'Sexta') this.setState({type: 'Nona'});
      else if(this.state.type === 'Nona') this.setState({type: 'Vespres'});
      else if(this.state.type === 'Vespres') this.setState({type: 'Completes'});
      else if(this.state.type === 'Completes') {
        this.props.nextDayTestCB();
        this.props.navigator.pop();
      }
    }
  }

  render() {
    // console.log("litdisplay render - " + this.props.superTestMode);
    return (
      <View style={styles.container}>
        <ScrollView automaticallyAdjustContentInsets={false} style={{padding: 10,}}>
          {this.liturgicComponent(this.state.type)}
        </ScrollView>
      </View>
    )
  }

  testErrorCB(){
    if(this.props.superTestMode){
      this.props.testErrorCallBack();
    }
  }

  liturgicComponent(type){
    switch (type) {
      case 'Ofici':
        return(
          <Ofici
            variables={this.props.variables}
            liturgicProps = {this.props.liturgicProps}
            superTestMode = {this.props.superTestMode}
            testErrorCB={this.testErrorCB.bind(this)}/>
          )
        break;
        case 'Laudes':
          return(
            <Laudes
              liturgicProps={this.props.liturgicProps}
              variables={this.props.variables}
              superTestMode = {this.props.superTestMode}
              testErrorCB={this.testErrorCB.bind(this)}/>
            )
          break;
          case 'Vespres':
            return(
              <Vespres
                liturgicProps={this.props.liturgicProps}
                variables={this.props.variables}
                superTestMode = {this.props.superTestMode}
                testErrorCB={this.testErrorCB.bind(this)}/>
              )
            break;
            case 'Tèrcia':
              return(
                <HoraMenor
                  variables={this.props.variables}
                  liturgicProps={this.props.liturgicProps}
                  HM = {type}
                  HORA_MENOR = {this.props.liturgicProps.LITURGIA.tercia}
                  superTestMode = {this.props.superTestMode}
                  testErrorCB={this.testErrorCB.bind(this)}/>
                )
              break;
              case 'Sexta':
                return(
                  <HoraMenor
                    variables={this.props.variables}
                    liturgicProps={this.props.liturgicProps}
                    HM = {type}
                    HORA_MENOR = {this.props.liturgicProps.LITURGIA.sexta}
                    superTestMode = {this.props.superTestMode}
                    testErrorCB={this.testErrorCB.bind(this)}/>
                  )
                break;
              case 'Nona':
                return(
                  <HoraMenor
                    variables={this.props.variables}
                    liturgicProps={this.props.liturgicProps}
                    HM = {type}
                    HORA_MENOR = {this.props.liturgicProps.LITURGIA.nona}
                    superTestMode = {this.props.superTestMode}
                    testErrorCB={this.testErrorCB.bind(this)}/>
                  )
                break;
              case 'Completes':
                return(
                  <Completes
                    variables={this.props.variables}
                    liturgicProps = {this.props.liturgicProps}
                    superTestMode = {this.props.superTestMode}
                    testErrorCB={this.testErrorCB.bind(this)}/>
                  )
                break;
      default: return(<Text style={styles.normalText}>{this.props.type}</Text>)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: paddingBar(),
    backgroundColor: GLOBAL.backgroundColor,
  },
  normalText: {
    textAlign: 'center',
    color: '#000000',
    fontWeight: '300'
  }
})

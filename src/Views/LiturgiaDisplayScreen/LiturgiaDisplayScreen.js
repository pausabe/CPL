import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Platform } from 'react-native';

import Ofici from '../LitugiaHores/OficiDisplay'
import Laudes from '../LitugiaHores/LaudesDisplay'
import Vespres from '../LitugiaHores/VespresDisplay'
import HoraMenor from '../LitugiaHores/HoraMenorDisplay'
import Completes from '../LitugiaHores/CompletesDisplay'

import GLOBAL from "../Globals/Globals";

function paddingBar(){
  if(Platform.OS === 'ios'){
    return 64;
  }
  return 0//55;
}

export default class LiturgiaDisplayScreen extends Component {
  componentWillMount(){
    if(Platform.OS === 'ios'){
      barPad = 0;
    }

    if(Platform.OS === 'android'){
      this.props = this.props.navigation.state.params.props;
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView automaticallyAdjustContentInsets={false} style={{padding: 10,}}>
          {this.liturgicComponent(this.props.type)}
        </ScrollView>
      </View>
    )
  }

  liturgicComponent(type){
    switch (type) {
      case 'Ofici':
        return(
          <Ofici
            variables={this.props.variables}
            liturgicProps = {this.props.liturgicProps}/>
          )
        break;
        case 'Laudes':
          return(
            <Laudes
              liturgicProps={this.props.liturgicProps}
              variables={this.props.variables}/>
            )
          break;
          case 'Vespres':
            return(
              <Vespres
                liturgicProps={this.props.liturgicProps}
                variables={this.props.variables}/>
              )
            break;
            case 'Tèrcia':
              return(
                <HoraMenor
                  variables={this.props.variables}
                  liturgicProps={this.props.liturgicProps}
                  HM = {type}
                  HORA_MENOR = {this.props.liturgicProps.LITURGIA.tercia}/>
                )
              break;
              case 'Sexta':
                return(
                  <HoraMenor
                    variables={this.props.variables}
                    liturgicProps={this.props.liturgicProps}
                    HM = {type}
                    HORA_MENOR = {this.props.liturgicProps.LITURGIA.sexta}/>
                  )
                break;
              case 'Nona':
                return(
                  <HoraMenor
                    variables={this.props.variables}
                    liturgicProps={this.props.liturgicProps}
                    HM = {type}
                    HORA_MENOR = {this.props.liturgicProps.LITURGIA.nona}/>
                  )
                break;
              case 'Completes':
                return(
                  <Completes
                    variables={this.props.variables}
                    liturgicProps = {this.props.liturgicProps}/>
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

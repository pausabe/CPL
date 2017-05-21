import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Platform } from 'react-native';

import Ofici from '../Components/OficiDisplay'
import Laudes from '../Components/LaudesDisplay'
import Vespres from '../Components/VespresDisplay'
import HoraMenor from '../Components/HoraMenorDisplay'
import Completes from '../Components/CompletesDisplay'

function paddingBar(){
  if(Platform.OS === 'ios'){
    return 1;
  }
  return 55;
}

export default class LiturgiaDisplayScreen extends Component {
  componentWillMount(){
    if(Platform.OS === 'ios'){
      barPad = 0;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{padding: 10,}}>
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
            date={this.props.date}

            cicle = {this.props.liturgicProps.cicle}
            setmana = {this.props.liturgicProps.setmana}
            LT={this.props.liturgicProps.LT}
            ABC={this.props.liturgicProps.ABC}
            OFICI={this.props.liturgicProps.LITURGIA.ofici}/>
          )
        break;
        case 'Laudes':
          return(
            <Laudes
              date={this.props.date}

              cicle = {this.props.liturgicProps.cicle}
              setmana = {this.props.liturgicProps.setmana}
              LT = {this.props.liturgicProps.LT}
              ABC = {this.props.liturgicProps.ABC}
              LAUDES = {this.props.liturgicProps.LITURGIA.laudes}/>
            )
          break;
          case 'Vespres':
            var today = new Date();
            if(this.props.weekDay !== 6){
              return(
                <Vespres
                  date={this.props.date}

                  cicle = {this.props.liturgicProps.cicle}
                  setmana = {this.props.liturgicProps.setmana}
                  LT = {this.props.liturgicProps.LT}
                  ABC = {this.props.liturgicProps.ABC}
                  VESPRES = {this.props.liturgicProps.LITURGIA.vespres}/>
                )
            }
            else{ //dissabte vespre = vespres de diumenge
              return(
                <Vespres
                  date={this.props.date}

                  cicle = {this.props.liturgicProps.cicle2}
                  setmana = {this.props.liturgicProps.setmana}
                  LT={this.props.liturgicProps.LT2}
                  ABC={this.props.liturgicProps.ABC2}
                  VESPRES = {this.props.liturgicProps.LITURGIA.vespres}/>
                )
            }
            break;
            case 'Tèrcia':
              return(
                <HoraMenor
                  HM = {type}
                  date={this.props.date}

                  cicle = {this.props.liturgicProps.cicle}
                  setmana = {this.props.liturgicProps.setmana}
                  LT={this.props.liturgicProps.LT}
                  ABC={this.props.liturgicProps.ABC}
                  HORA_MENOR = {this.props.liturgicProps.LITURGIA.tercia}/>
                )
              break;
              case 'Sexta':
                return(
                  <HoraMenor
                    HM = {type}
                    date={this.props.date}

                    cicle = {this.props.liturgicProps.cicle}
                    setmana = {this.props.liturgicProps.setmana}
                    LT={this.props.liturgicProps.LT}
                    ABC={this.props.liturgicProps.ABC}
                    HORA_MENOR = {this.props.liturgicProps.LITURGIA.sexta}/>
                  )
                break;
              case 'Nona':
                return(
                  <HoraMenor
                    HM = {type}
                    date={this.props.date}

                    cicle = {this.props.liturgicProps.cicle}
                    setmana = {this.props.liturgicProps.setmana}
                    LT={this.props.liturgicProps.LT}
                    ABC={this.props.liturgicProps.ABC}
                    HORA_MENOR = {this.props.liturgicProps.LITURGIA.nona}/>
                  )
                break;
              case 'Completes':
                return(
                  <Completes
                    date={this.props.date}

                    cicle = {this.props.liturgicProps.cicle}
                    setmana = {this.props.liturgicProps.setmana}
                    LT={this.props.liturgicProps.LT}
                    ABC={this.props.liturgicProps.ABC}
                    COMPLETES = {this.props.liturgicProps.LITURGIA.completes}/>
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
    backgroundColor: '#E1F5FE',
  },
  normalText: {
    textAlign: 'center',
    color: '#000000',
    fontWeight: '300'
  }
})

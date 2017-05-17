import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Platform } from 'react-native';

import Ofici from '../Components/Ofici'
import Laudes from '../Components/Laudes'
import Vespres from '../Components/Vespres'
import HoraMenor from '../Components/HoraMenor'
import Completes from '../Components/Completes'

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
            hour = {this.props.hour}
            weekDay = {this.props.weekDay}
            monthDay = {this.props.monthDay}
            month = {this.props.month}
            year = {this.props.year}
            cicle = {this.props.cicle}
            setmana = {this.props.setmana}
            LT={this.props.LT}
            ABC={this.props.ABC}/>
          )
        break;
        case 'Laudes':
          return(
            <Laudes
              hour = {this.props.hour}
              weekDay = {this.props.weekDay}
              monthDay = {this.props.monthDay}
              month = {this.props.month}
              year = {this.props.year}
              cicle = {this.props.cicle}
              setmana = {this.props.setmana}
              LT={this.props.LT}
              ABC={this.props.ABC}/>
            )
          break;
          case 'Vespres':
            var today = new Date();
            if(this.props.weekDay !== 6){
              return(
                <Vespres
                  hour = {this.props.hour}
                  weekDay = {this.props.weekDay}
                  monthDay = {this.props.monthDay}
                  month = {this.props.month}
                  year = {this.props.year}
                  cicle = {this.props.cicle}
                  setmana = {this.props.setmana}
                  LT={this.props.LT}
                  ABC={this.props.ABC}/>
                )
            }
            else{ //dissabte vespre = vespres de diumenge
              return(
                <Vespres
                  hour = {this.props.hour}
                  weekDay = {this.props.weekDay}
                  monthDay = {this.props.monthDay}
                  month = {this.props.month}
                  year = {this.props.year}
                  cicle = {this.props.cicle2}
                  setmana = {this.props.setmana}
                  LT={this.props.LT2}
                  ABC={this.props.ABC2}/>
                )
            }
            break;
            case 'Tèrcia':
              return(
                <HoraMenor
                  HM = {type}
                  hour = {this.props.hour}
                  weekDay = {this.props.weekDay}
                  monthDay = {this.props.monthDay}
                  month = {this.props.month}
                  year = {this.props.year}
                  cicle = {this.props.cicle}
                  setmana = {this.props.setmana}
                  LT={this.props.LT}
                  ABC={this.props.ABC}/>
                )
              break;
              case 'Sexta':
                return(
                  <HoraMenor
                    HM = {type}
                    hour = {this.props.hour}
                    weekDay = {this.props.weekDay}
                    monthDay = {this.props.monthDay}
                    month = {this.props.month}
                    year = {this.props.year}
                    cicle = {this.props.cicle}
                    setmana = {this.props.setmana}
                    LT={this.props.LT}
                    ABC={this.props.ABC}/>
                  )
                break;
              case 'Nona':
                return(
                  <HoraMenor
                    HM = {type}
                    hour = {this.props.hour}
                    weekDay = {this.props.weekDay}
                    monthDay = {this.props.monthDay}
                    month = {this.props.month}
                    year = {this.props.year}
                    cicle = {this.props.cicle}
                    setmana = {this.props.setmana}
                    LT={this.props.LT}
                    ABC={this.props.ABC}/>
                  )
                break;
              case 'Completes':
                return(
                  <Completes
                    hour = {this.props.hour}
                    weekDay = {this.props.weekDay}
                    monthDay = {this.props.monthDay}
                    month = {this.props.month}
                    year = {this.props.year}
                    cicle = {this.props.cicle}
                    setmana = {this.props.setmana}
                    LT={this.props.LT}
                    ABC={this.propsABC}/>
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

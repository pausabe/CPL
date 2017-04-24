import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Platform } from 'react-native';

import Ofici from '../Components/Ofici'
import Laudes from '../Components/Laudes'

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
        <ScrollView >
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
            ordinariWeek = {this.props.ordinariWeek}
            pasquaWeek = {this.props.pasquaWeek}
            quaresmaWeek = {this.props.quaresmaWeek}
            LT={this.props.LT}/>
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
              ordinariWeek = {this.props.ordinariWeek}
              pasquaWeek = {this.props.pasquaWeek}
              quaresmaWeek = {this.props.quaresmaWeek}
              LT={this.props.LT}/>
            )
          break;
          case 'Vespres':
            return(
              <Laudes
                hour = {this.props.hour}
                weekDay = {this.props.weekDay}
                monthDay = {this.props.monthDay}
                month = {this.props.month}
                year = {this.props.year}
                cicle = {this.props.cicle}
                ordinariWeek = {this.props.ordinariWeek}
                pasquaWeek = {this.props.pasquaWeek}
                quaresmaWeek = {this.props.quaresmaWeek}
                LT={this.props.LT}/>
              )
            break;
            case 'Hora menor':
              return(
                <Laudes
                  hour = {this.props.hour}
                  weekDay = {this.props.weekDay}
                  monthDay = {this.props.monthDay}
                  month = {this.props.month}
                  year = {this.props.year}
                  cicle = {this.props.cicle}
                  ordinariWeek = {this.props.ordinariWeek}
                  pasquaWeek = {this.props.pasquaWeek}
                  quaresmaWeek = {this.props.quaresmaWeek}
                  LT={this.props.LT}/>
                )
              break;
              case 'Completes':
                return(
                  <Laudes
                    hour = {this.props.hour}
                    weekDay = {this.props.weekDay}
                    monthDay = {this.props.monthDay}
                    month = {this.props.month}
                    year = {this.props.year}
                    cicle = {this.props.cicle}
                    ordinariWeek = {this.props.ordinariWeek}
                    pasquaWeek = {this.props.pasquaWeek}
                    quaresmaWeek = {this.props.quaresmaWeek}
                    LT={this.props.LT}/>
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
    padding: 10,
    backgroundColor: '#E1F5FE',
  },
  normalText: {
    textAlign: 'center',
    color: '#000000',
    fontWeight: '300'
  }
})

import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import { NavigationActions } from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons';
import Ofici from './OracioDisplay/OficiDisplay'
import Laudes from './OracioDisplay/LaudesDisplay'
import Vespres from './OracioDisplay/VespresDisplay'
import HoraMenor from './OracioDisplay/HoraMenorDisplay'
import Completes from './OracioDisplay/CompletesDisplay'
import GLOBAL from "../../../Globals/Globals";

export default class LHDisplayScreen extends Component {
  componentWillMount(){
    this.navigation = this.props.navigation;
    /*const setParamsAction = NavigationActions.setParams({
      params: {hideTabBar: false}
    });
    this.props.navigation.dispatch(setParamsAction);*/
    this.navigation.setParams({ hideTabBar: true });
    this.props = this.props.navigation.state.params.props;
    this.eventEmitter = this.props.events;
    this.titols = this.getTitols();
    this.setState({type: this.props.type})
  }

  componentWillUnmount(){
    /*const setParamsAction = NavigationActions.setParams({
      params: {hideTabBar: true}
    });
    this.props.navigation.dispatch(setParamsAction);*/
    this.navigation.setParams({ hideTabBar: false });
  }

  componentDidMount(){
    //this.navigation.setParams({ visible: false });

    /*if(this.props.superTestMode){
      setTimeout(() => {
        this.setState({type: 'Laudes'});
      }, 1000);
    }*/
  }

  static navigationOptions = ({ navigation }) => ({
      headerTitle: <View style={{paddingLeft: 100}}>
                      <Text style={{
                        textAlign: 'center',
                        color: GLOBAL.itemsBarColor,
                        fontSize: 20,
                        fontWeight: '600',
                      }}>{navigation.state.params.props.type}</Text>
                  </View>,
      headerStyle: {
        backgroundColor: GLOBAL.barColor,
      },
      headerRight: <TouchableOpacity
                      style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}
                      onPress={() => {
                        navigation.state.params.props.emitShareCB();
                      }}>
                      <View style={{flex:1, paddingRight: 10, alignItems: 'center', justifyContent:'center'}}>
                        <Icon
                          name="ios-share-outline"
                          size={30}
                          color="#FFFFFF"/>
                      </View>
                  </TouchableOpacity>,
  });

  componentDidUpdate(){
    // console.log("LITDISPLAY updated");
    if(this.props.superTestMode){
      //console.log("TESTING OPEN - " + this.state.type);
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

  saveShareTextCB(shareText){
    this.props.saveSharedTextCB(shareText);
  }

  getTitols(){
    var titols = [];

    titols.push(LH_VALUES.ofici.titol1);
    titols.push(LH_VALUES.ofici.titol2);
    titols.push(LH_VALUES.ofici.titol3);
    titols.push(LH_VALUES.laudes.titol1);
    titols.push(LH_VALUES.laudes.titol3);
    titols.push(LH_VALUES.vespres.titol1);
    titols.push(LH_VALUES.vespres.titol2);
    titols.push(LH_VALUES.completes.titol1);
    titols.push(LH_VALUES.completes.titol2);

    return titols;
  }

  liturgicComponent(type){
    switch (type) {
      case 'Ofici':
        return(
          <Ofici
            superTestMode = {this.props.superTestMode}
            testErrorCB={this.testErrorCB.bind(this)}
            titols={this.titols}
            setNumSalmInv={this.props.setNumSalmInv}
            events={this.eventEmitter}/>
          )
        break;
        
        case 'Laudes':
          return(
            <Laudes
              superTestMode = {this.props.superTestMode}
              testErrorCB={this.testErrorCB.bind(this)}
              titols={this.titols}
              setNumSalmInv={this.props.setNumSalmInv}
              events={this.eventEmitter}/>
            )
          break;

          case 'Vespres':
            return(
              <Vespres
                superTestMode = {this.props.superTestMode}
                testErrorCB={this.testErrorCB.bind(this)}
                events={this.eventEmitter}/>
              )
            break;

            case 'Tèrcia':
              return(
                <HoraMenor
                  HM = {type}
                  HORA_MENOR = {LH_VALUES.tercia}
                  superTestMode = {this.props.superTestMode}
                  testErrorCB={this.testErrorCB.bind(this)}
                  events={this.eventEmitter}/>
                )
              break;

              case 'Sexta':
                return(
                  <HoraMenor
                    HM = {type}
                    HORA_MENOR = {LH_VALUES.sexta}
                    superTestMode = {this.props.superTestMode}
                    testErrorCB={this.testErrorCB.bind(this)}
                    events={this.eventEmitter}/>
                  )
                break;

              case 'Nona':
                return(
                  <HoraMenor
                    HM = {type}
                    HORA_MENOR = {LH_VALUES.nona}
                    superTestMode = {this.props.superTestMode}
                    testErrorCB={this.testErrorCB.bind(this)}
                    events={this.eventEmitter}/>
                  )
                break;

              case 'Completes':
                return(
                  <Completes
                    superTestMode = {this.props.superTestMode}
                    testErrorCB={this.testErrorCB.bind(this)}
                    setNumAntMare={this.props.setNumAntMare}
                    events={this.eventEmitter}/>
                  )
                break;

            default: 
              return(<Text style={styles.normalText}>{this.props.type}</Text>)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  normalText: {
    textAlign: 'center',
    color: '#000000',
    fontWeight: '300'
  }
})

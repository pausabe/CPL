import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity } from 'react-native';

import GLOBAL from "../Globals/Globals";
import HR from '../Components/HRComponent';
import SettingsComponentAdapter from "../Adapters/SettingsComponentAdapter";
import DonationScreen from './DonationScreen';

export default class SettingsScreen extends Component {
  constructor(props){
    super(props);
    props.screenProps.tracker.trackScreenView("Configuració");
  }

  refreshHome(){
    this.props.navigation.state.params.refresh();
  }

  componentWillMount(){
      SettingsComponentAdapter.getSettingsOptions(this.refreshHome.bind(this)).then(result =>{
          this.setState({options: result});
      }).catch(error => console.log("InfoLog. " + error));
  }

  render() {
      if(!this.state || this.state && !this.state.options){
          return (
            <View style={styles.scrollContainer}>
              <ScrollView automaticallyAdjustContentInsets={false} style={styles.itemList}></ScrollView>
            </View>
          );
      }
      return (
        <View style={styles.scrollContainer}>
          <ScrollView automaticallyAdjustContentInsets={false} style={styles.itemList}>
            <View style={{height:10}}/>
            <HR/>
            <TouchableOpacity style={styles.buttonView} onPress={this.donationPressed.bind(this)}>
              <Text style={styles.text}>{"Fer donatiu"}</Text>
              <Text style={styles.text}>{">"}</Text>
            </TouchableOpacity>
            <HR/>
            <TouchableOpacity style={styles.buttonView}  onPress={this.commentPressed.bind(this)}>
              <Text style={styles.text}>{"Enviar missatge"}</Text>
              <Text style={styles.text}>{">"}</Text>
            </TouchableOpacity>
            <HR/>
            <View style={{height:10}}/>
            <HR/>
            {this.state.options}
            <View style={{height:10}}/>
            <HR/>
            <View style={{padding: 5, paddingTop: 10, backgroundColor: 'white'}}>
              <Text style={{textAlign:'center', color:'grey', fontSize:11}}>{"Text oficial de la Comissió Interdiocesana de Litúrgia de la Conferència Episcopal Tarraconense, aprovat pels bisbes de les diòcesis de parla catalana i confirmat per la Congregació per al Culte Diví i la Disciplina dels Sagraments: Prot. N. 312/15, 27 d'abril de 2016"}</Text>
            </View>
            <View style={{height:10}}/>
          </ScrollView>
        </View>
      );
    }

    donationPressed(){
      if(Platform.OS === 'ios'){
        this.props.navigator.push({
          component: DonationScreen
        });
      }
      else{
        this.props.navigation.navigate('DonationScreen');
      }
    }

    commentPressed(){
      console.log("comment");
    }
}

function paddingBar(){
  if(Platform.OS === 'ios'){
    var DeviceInfo = require('react-native-device-info');
    var iosVer = parseInt(DeviceInfo.getSystemVersion());
    if(iosVer>=11) return 44;
    return 64;
  }
  return 0;//64;
}

const styles = StyleSheet.create({
    itemList: {
        flex: 1,
    },
    scrollContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      paddingTop: paddingBar(),
      backgroundColor: 'gray'//GLOBAL.backgroundColor,
    },
    normalText: {
        textAlign: 'center',
        color: '#000000',
        fontWeight: '300'
    },
    buttonView: {
      minHeight: 45,
      paddingHorizontal: 20,
      paddingVertical: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: 'white'
    },
    text: {
        color: "black",
        fontSize: 16
    },
})

import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity } from 'react-native';
import GLOBAL from "../Globals/Globals";
import SettingComponent from "../Components/SettingComponent";
import SettingsComponentAdapter from "../ComponentAdapters/SettingsComponentAdapter";
import HomeScreen from '../Screens/HomeScreen'

export default class SettingsScreen extends Component {
  /*constructor(props, context){
    super(props, context);
    this._onForward = this._onForward.bind(this);
  }

  _onForward() {
    console.log("_onForward");
    this.props.navigator.replace({
      component: HomeScreen,
      title: 'CPL',
      passProps: {title: 'CPL', naviDate: this.date, setPres: false},
      rightButtonIcon: this.state.settingsIcon,
      onRightButtonPress: () => this.rightPress(),
      leftButtonIcon: this.state.calendarIcon,
      onLeftButtonPress: () => this.leftPress(),
    });
  }*/

  componentWillMount(){
      SettingsComponentAdapter.getSettingsOptions().then(result =>{
          this.setState({options: result});
      }).catch(error => console.log(error));
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
              {this.state.options}
          </ScrollView>
        </View>
      );
    }
}

function callbackTest(id, value){
    console.log("ID: "+id+" - VALUE: "+value)
}

function paddingBar(){
  if(Platform.OS === 'ios'){
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
      backgroundColor: GLOBAL.backgroundColor,
    },
    normalText: {
        textAlign: 'center',
        color: '#000000',
        fontWeight: '300'
    }
})

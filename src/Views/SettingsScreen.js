import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity } from 'react-native';
import GLOBAL from "../Globals/Globals";
import SettingsComponentAdapter from "../Adapters/SettingsComponentAdapter";
import HomeScreen from '../Screens/HomeScreen'

export default class SettingsScreen extends Component {
  refreshHome(){
    // console.log("fuck yeah");
    this.props.navigation.state.params.refresh();
  }

  componentWillMount(){
      SettingsComponentAdapter.getSettingsOptions(this.refreshHome.bind(this)).then(result =>{
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

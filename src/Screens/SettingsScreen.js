import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native';
import GLOBAL from "../Globals/Globals";
import SettingComponent from "../Components/SettingComponent";
import SettingsComponentAdapter from "../ComponentAdapters/SettingsComponentAdapter";

export default class SettingsScreen extends Component {

    componentWillMount(){
        SettingsComponentAdapter.getSettingsOptions().then(result =>{
            this.setState({options: result});
        });
    }

    render() {
        console.log("I'm rendering settings.");
        if(!this.state || this.state && !this.state.options){
            return (<ScrollView style={styles.itemList}>
                <Text>Carregant opcions</Text>
            </ScrollView>);
        }
        return (
            <ScrollView style={styles.itemList}>
                {this.state.options}
            </ScrollView>
        );
      }
}

function callbackTest(id, value){
    console.log("ID: "+id+" - VALUE: "+value)
}

const styles = StyleSheet.create({
    itemList: {
        flex: 1,
        paddingTop: GLOBAL.paddingBar
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E1F5FE',
    },
    normalText: {
        textAlign: 'center',
        color: '#000000',
        fontWeight: '300'
    }
})

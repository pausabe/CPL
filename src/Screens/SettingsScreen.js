import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native';
import GLOBAL from "../Globals/Globals";
import SettingComponent from "../Components/SettingComponent";

export default class SettingsScreen extends Component {

    render() {
        console.log("I'm rendering settings.");
        return (
            <ScrollView style={styles.itemList}>
                <SettingComponent name="Option 1" selectorComponent="switch" value={true} callback={callbackTest}/>
                <SettingComponent name="Option 2" selectorComponent="switch" value={false} callback={callbackTest}/>
                <SettingComponent name="Option 3" selectorComponent="picker" value="java" callback={callbackTest}/>
                <SettingComponent name="Option 4" selectorComponent="slider" selectorProps={{maximumValue: 10}} callback={callbackTest}/>
            </ScrollView>
        )
      }
}

function callbackTest(key, value){
    console.log("KEY: "+key+" - VALUE: "+value)
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

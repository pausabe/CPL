import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity } from 'react-native';
import GLOBAL from "../Globals/Globals";
import SettingComponent from "../Components/SettingComponent";
import SettingsComponentAdapter from "../ComponentAdapters/SettingsComponentAdapter";
import PopupDialog, {
  DialogTitle,
} from 'react-native-popup-dialog';

export default class SettingsScreen extends Component {
    componentWillMount(){
        SettingsComponentAdapter.getSettingsOptions().then(result =>{
            this.setState({options: result});
        }).catch(error => console.log(error));
    }

    render() {
        if(!this.state || this.state && !this.state.options){
            return (<ScrollView style={styles.itemList}></ScrollView>);
        }
        return (
          <View style={{flex:1}}>
            <ScrollView style={styles.itemList}>
                {this.state.options}
            </ScrollView>
            <PopupDialog
              ref={(popupDialog) => { this.popupDialog = popupDialog}}
              dialogTitle={<DialogTitle title="Sel·lecciona" />} >

              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <TouchableOpacity style={styles.buttonSantContainer} onPress={this.onCancel.bind(this)}>
                    <Text>Cancel·lar</Text>
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <TouchableOpacity style={styles.buttonSantContainer} onPress={this.onAcceptar.bind(this)}>
                    <Text>Acceptar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </PopupDialog>
          </View>
        );
      }

      onTextPress(){
        this.popupDialog.show();
      }

      onAcceptar(){
        this.popupDialog.dismiss();
      }

      onCancel(){
        this.popupDialog.dismiss();
      }

}

function callbackTest(id, value){
    console.log("ID: "+id+" - VALUE: "+value)
}

const styles = StyleSheet.create({
    itemList: {
        flex: 1,
        paddingTop: 64,
        backgroundColor: GLOBAL.backgroundColor,
    },
    normalText: {
        textAlign: 'center',
        color: '#000000',
        fontWeight: '300'
    }
})

import React, { Component } from 'react';
import { Platform } from 'react-native';
import SettingsManager, {diocesis, lloc, invitatori} from '../Settings/SettingsManager';
import SettingComponent from '../Components/SettingComponent';

//Id generating different keys for testing
var id = 0;

export default class SettingsComponentAdapter{

    static async getSettingsOptions(callback){

      // this.RH = callback;
      // console.log("RH");
      // this.RH();
      // console.log("RH");

        let options = [];
        //options.push(await SettingsComponentAdapter.getSettingComponentShowGlories());
        options.push(await SettingsComponentAdapter.getSettingComponentPrayLliures(callback));
        options.push(await SettingsComponentAdapter.getSettingComponentUseLatin(callback));
        options.push(await SettingsComponentAdapter.getSettingComponentTextSize(callback));
        options.push(await SettingsComponentAdapter.getSettingComponentDiocesis(callback));
        options.push(await SettingsComponentAdapter.getSettingComponentLloc(callback));
        //options.push(await SettingsComponentAdapter.getSettingComponentDayStart());
        options.push(await SettingsComponentAdapter.getSettingComponentInvitatori(callback));
        return options;
    }

    /*static async getSettingComponentShowGlories(){
        let value = await SettingsManager.getSettingShowGlories() === "true" ? true : false;
        let component = (<SettingComponent selectorComponent="switch" name="Mostrar glòria complet" id="showGlories" key="showGlories" value={value} callback={(id, value) => {
            SettingsManager.setSettingShowGlories(value ? "true" : "false");
        }}/>);
        return component;
    }*/

    static async getSettingComponentUseLatin(RH){
        let value = await SettingsManager.getSettingUseLatin() === "true" ? true : false;
        let component = (<SettingComponent selectorComponent="switch" name="Himnes en llatí" id="useLatin" key="useLatin" value={value} callback={(id, value) => {
            SettingsManager.setSettingUseLatin(value ? "true" : "false", this.refreshHome.bind(this,RH));
        }}/>);
        return component;
    }

    static async getSettingComponentPrayLliures(RH){
        let value = await SettingsManager.getSettingPrayLliures() === "true" ? true : false;
        let component = (<SettingComponent selectorComponent="switch" name="Memòries lliures" id="prayLliures" key="prayLliures" value={value} callback={(id, value) => {
            SettingsManager.setSettingPrayLliures(value ? "true" : "false", this.refreshHome.bind(this,RH));
        }}/>);
        return component;
    }

    static async getSettingComponentTextSize(RH){
        let value = parseInt(await SettingsManager.getSettingTextSize());
        let component = (<SettingComponent selectorComponent="slider" name="Mida del text" id="textSize" key="textSize"
            value={value} selectorProps={{minimumValue: 1, maximumValue: 10}} callback={(id, value) => {
                SettingsManager.setSettingTextSize(Math.trunc(value)+"", this.refreshHome.bind(this,RH));
            }}/>);
        return component;
    }

    static async getSettingComponentDiocesis(RH){
        let value = await SettingsManager.getSettingDiocesis();
        value = _getKeyFromValue(diocesis, value);
        let component = (<SettingComponent selectorComponent="picker" name="Diòcesi" id="diocesis" key="diocesis"
            value={value} options={diocesis} selectorProps={{mode: "dropdown"}} callback={(id, value) => {
                SettingsManager.setSettingDiocesis(diocesis[value], this.refreshHome.bind(this,RH));
            }}/>);
        return component;
    }

    static async getSettingComponentLloc(RH){
        let value = await SettingsManager.getSettingLloc();
        value = _getKeyFromValue(lloc, value);
        let component = (<SettingComponent selectorComponent="picker" name="Lloc" id="lloc" key="lloc"
            value={value} options={lloc} selectorProps={{mode: "dropdown"}} callback={(id, value) => {
                SettingsManager.setSettingLloc(lloc[value], this.refreshHome.bind(this,RH));
            }}/>);
        return component;
    }


    static async getSettingComponentDayStart(RH){
        let value = await SettingsManager.getSettingDayStart();
        let component = (<SettingComponent selectorComponent="picker" name="El dia comença a les" id="dayStart" key={"dayStart"/*+id*/} //Addes key+id for testing
            value={value} options={{0: "00:00 AM", 1: "01:00 AM", 2: "02:00 AM", 3: "03:00 AM"}} selectorProps={{mode: "dropdown"}} callback={(id, value) => {
                SettingsManager.setSettingDayStart(value, this.refreshHome.bind(this,RH));
            }}/>);
        //id++;//Augment ID for testing
        return component;
    }

    static async getSettingComponentInvitatori(RH){
      // console.log("test");
      // RH();
      // console.log("test");
      // console.log("this.aha: "+this.aha);
        let value = await SettingsManager.getSettingInvitatori();
        value = _getKeyFromValue(invitatori, value);
        let component = (<SettingComponent selectorComponent="picker" name="Invitatori" id="invitatori" key="invitatori"
            value={value} options={invitatori} selectorProps={{mode: "dropdown"}} callback={(id, value) => {
                SettingsManager.setSettingInvitatori(invitatori[value], this.refreshHome.bind(this,RH));
            }}/>);
        return component;
    }

    static refreshHome(RH){
      // console.log("refreshHome!");
      if(Platform.OS === 'android') RH();
      // console.log("refreshHome!");
    }

}

function _getKeyFromValue(object, value){
    for(key in object){
        if(object[key] == value){
            return key;
        }
    }
}

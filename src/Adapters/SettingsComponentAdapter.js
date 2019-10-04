import React from 'react';

import SettingsManager, {diocesis, lloc} from '../Controllers/Classes/SettingsManager';
import SettingsComponent from '../Components/SettingsComponent';

//Id generating different keys for testing
var id = 0;

export default class SettingsComponentAdapter{

    static async getSettingsOptions(callback){

        let options = [];
        options.push(await SettingsComponentAdapter.getSettingsComponentUseLatin(callback));
        options.push(await SettingsComponentAdapter.getSettingsComponentTextSize(callback));
        options.push(await SettingsComponentAdapter.getSettingsComponentDiocesis(callback));
        options.push(await SettingsComponentAdapter.getSettingsComponentLloc(callback));
        return options;
    }

    static async getSettingsComponentUseLatin(RH){
        let value = await SettingsManager.getSettingUseLatin() === "true" ? true : false;
        let component = (<SettingsComponent selectorComponent="switch" name="Himnes en llatí" id="useLatin" key="useLatin" value={value} callback={(id, value) => {
            SettingsManager.setSettingUseLatin(value ? "true" : "false", this.refreshHome.bind(this,RH));
        }}/>);
        return component;
    }

    static async getSettingsComponentPrayLliures(RH){
        let value = await SettingsManager.getSettingPrayLliures() === "true" ? true : false;
        let component = (<SettingsComponent selectorComponent="switch" name="Memòries lliures" id="prayLliures" key="prayLliures" value={value} callback={(id, value) => {
            SettingsManager.setSettingPrayLliures(value ? "true" : "false", this.refreshHome.bind(this,RH));
        }}/>);
        return component;
    }

    static async getSettingsComponentTextSize(RH){
        let value = parseInt(await SettingsManager.getSettingTextSize());
        let component = (<SettingsComponent selectorComponent="slider" name="Mida del text" id="textSize" key="textSize"
            value={value} selectorProps={{minimumValue: 1, maximumValue: 10}} callback={(id, value) => {
                SettingsManager.setSettingTextSize(Math.trunc(value)+"", this.refreshHome.bind(this,RH));
            }}/>);
        return component;
    }

    static async getSettingsComponentDiocesis(RH){
        let value = await SettingsManager.getSettingDiocesis();
        value = _getKeyFromValue(diocesis, value);
        let component = (<SettingsComponent selectorComponent="picker" name="Diòcesi" id="diocesis" key="diocesis"
            value={value} options={diocesis} selectorProps={{mode: "dropdown"}} callback={(id, value) => {
                SettingsManager.setSettingDiocesis(diocesis[value], this.refreshHome.bind(this,RH));
            }}/>);
        return component;
    }

    static async getSettingsComponentLloc(RH){
        let value = await SettingsManager.getSettingLloc();
        value = _getKeyFromValue(lloc, value);
        let component = (<SettingsComponent selectorComponent="picker" name="Lloc" id="lloc" key="lloc"
            value={value} options={lloc} selectorProps={{mode: "dropdown"}} callback={(id, value) => {
                SettingsManager.setSettingLloc(lloc[value], this.refreshHome.bind(this,RH));
            }}/>);
        return component;
    }


    static async getSettingsComponentDayStart(RH){
        let value = await SettingsManager.getSettingDayStart();
        let component = (<SettingsComponent selectorComponent="picker" name="El dia comença a les" id="dayStart" key={"dayStart"/*+id*/} //Addes key+id for testing
            value={value} options={{0: "00:00 AM", 1: "01:00 AM", 2: "02:00 AM", 3: "03:00 AM"}} selectorProps={{mode: "dropdown"}} callback={(id, value) => {
                SettingsManager.setSettingDayStart(value, this.refreshHome.bind(this,RH));
            }}/>);
        return component;
    }

    static refreshHome(RH){
      RH();
    }

}

function _getKeyFromValue(object, value){
    for(key in object){
        if(object[key] == value){
            return key;
        }
    }
}

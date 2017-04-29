import React, { Component } from 'react';
import SettingsManager, {diocesis} from '../Settings/SettingsManager';
import SettingComponent from '../Components/SettingComponent';

export default class SettingsComponentAdapter{

    static async getSettingsOptions(){
        let options = [];
        options.push(await SettingsComponentAdapter.getSettingComponentShowGlories());
        options.push(await SettingsComponentAdapter.getSettingComponentUseLatin());
        options.push(await SettingsComponentAdapter.getSettingComponentTextSize());
        options.push(await SettingsComponentAdapter.getSettingComponentDiocesis());
        options.push(await SettingsComponentAdapter.getSettingComponentDayStart());
        return options;
    }

    static async getSettingComponentShowGlories(){
        let value = await SettingsManager.getSettingShowGlories() === "true" ? true : false;
        let component = (<SettingComponent selectorComponent="switch" name="Mostrar Glòries" id="showGlories" key="showGlories" value={value} callback={(id, value) => {
            SettingsManager.setSettingShowGlories(value ? "true" : "false");
        }}/>);
        return component;
    }

    static async getSettingComponentUseLatin(){
        let value = await SettingsManager.getSettingUseLatin() === "true" ? true : false;
        let component = (<SettingComponent selectorComponent="switch" name="Utilitza llatí en alguns textos" id="useLatin" key="useLatin" value={value} callback={(id, value) => {
            SettingsManager.setSettingUseLatin(value ? "true" : "false");
        }}/>);
        return component;
    }

    static async getSettingComponentTextSize(){
        let value = parseInt(await SettingsManager.getSettingTextSize());
        let component = (<SettingComponent selectorComponent="slider" name="Tamany del text" id="textSize" key="textSize"
            value={value} selectorProps={{minimumValue: 12, maximumValue: 25}} callback={(id, value) => {
                SettingsManager.setSettingTextSize(Math.trunc(value)+"");
            }}/>);
        return component;
    }

    static async getSettingComponentDiocesis(){
        let value = await SettingsManager.getSettingDiocesis();
        value = _getKeyFromValue(diocesis, value);
        let component = (<SettingComponent selectorComponent="picker" name="Selecciona diocesis" id="diocesis" key="diocesis"
            value={value} options={diocesis} callback={(id, value) => {
                SettingsManager.setSettingDiocesis(diocesis[value]);
            }}/>);
        return component;
    }

    static async getSettingComponentDayStart(){
        let value = await SettingsManager.getSettingDayStart();
        let component = (<SettingComponent selectorComponent="picker" name="Selecciona a quina hora comença el día" id="dayStart" key="dayStart"
            value={value} options={{0: "00:00 AM", 1: "01:00 AM", 2: "02:00 AM", 3: "03:00 AM"}} callback={(id, value) => {
                SettingsManager.setSettingDayStart(value);
            }}/>);
        return component;
    }

}

function _getKeyFromValue(object, value){
    for(key in object){
        if(object[key] == value){
            return key;
        }
    }
}

import {AsyncStorage} from "react-native";

const diocesis = {
    BARCELONA: "Barcelona",
    TARRAGONA: "Tarragona",
    LLEIDA: "Lleida",
    GIRONA: "Girona",
};


const defaultSettings = {
    showGlories: false,
    useLatin: false,
    textSize: 18,
    diocesis: diocesis.BARCELONA,
    dayStart: 0 //Values from 0 to 3 allowed, which means 00:00AM, 01:00AM, 02:00AM and 03:00AM
};

export default class SettingsManager{
    
    /**
    * The undescore means that the method is "private", DO NOT USE outside of SettingsManager
    *
    * Returns an asynchronous Promise with the callback set when callback is a Function, if not, returns just the Promise.
    */
    static _getStorageValue(key, callback, defaultValue){
        let promise = AsyncStorage.getItem(key);
        if(callback instanceof Function){
            promise.then(SettingsManager._createCallbackDefault(defaultValue, callback));
        }
        return promise;
    }

    //If value is null, defaultValue will be returned
    static _returnDefault(defaultValue, value){
        return value == null ? defaultValue : value;
    }

    //Returns a function that if you pass a null parameter, it returns defaultValue
    static _createCallbackDefault(defaultValue, userCallback){
        return function(result){
            let finalResult = SettingsManager._returnDefault(defaultValue, result);
            userCallback(finalResult);
        }
    }

    static getSettingShowGlories(callback){
        return SettingsManager._getStorageValue("showGlories", callback, defaultSettings.showGlories);
    }

    static getSettingUseLatin(callback){
        return SettingsManager._getStorageValue("showLatin", callback, defaultSettings.useLatin);
    }

    static getSettingTextSize(callback){
        return SettingsManager._getStorageValue("textSize", callback, defaultSettings.textSize);
    }

    static getSettingDiocesis(callback){
        return SettingsManager._getStorageValue("diocesis", callback, defaultSettings.diocesis);
    }

    static getSettingDayStart(callback){
        return SettingsManager._getStorageValue("dayStart", callback, defaultSettings.dayStart);
    }

}

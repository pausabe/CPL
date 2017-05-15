import {AsyncStorage} from "react-native";

export const diocesis = {
    BARCELONA: "Barcelona",
    TARRAGONA: "Tarragona",
    LLEIDA: "Lleida",
    GIRONA: "Girona",
};

export const invitatori = {
    OFICI: "Ofici",
    LAUDE: "Laudes"
};

const defaultSettings = {
    showGlories: "false",
    useLatin: "false",
    textSize: "18",
    diocesis: diocesis.BARCELONA,
    dayStart: "0", //Values from 0 to 3 allowed, which means 00:00AM, 01:00AM, 02:00AM and 03:00AM
    invitatori: invitatori.OFICI
};

export default class SettingsManager{

    /**
    * The undescore means that the method is "private", DO NOT USE outside of SettingsManager
    *
    * Returns an asynchronous Promise with the callback set when callback is a Function, if not, returns just the Promise.
    */
    static _getStorageValue(key, callback, defaultValue){
        let getPromise = AsyncStorage.getItem(key);
        let settingsPromise = new Promise((resolve, reject) => {
            getPromise.then(
                value => resolve(value == null ? defaultValue : value)
            ).catch(
                error => reject(error)
            );
        });
        if(callback instanceof Function){
            settingsPromise.then(callback);
        }
        return settingsPromise;
    }

    static _setStorageValue(key, value, callback){
        let savePromise = AsyncStorage.setItem(key, value);
        savePromise.then(callback);
        return savePromise;
    }

    static _setValueIfValid(key, value, validateFunc, callback){
        console.log(key + " - " + value)
        if(!(validateFunc instanceof Function) || validateFunc(value)){
            console.log("VALID");
            return SettingsManager._setStorageValue(key, value, callback);
        }else{
            console.log("NOT VALID");
            let wrongValuePromise = new Promise((resolve, reject) => {
                reject(new Error("Invalid value"));
            });
            return wrongValuePromise;
        }
    }

    static getSettingShowGlories(callback){
        return SettingsManager._getStorageValue("showGlories", callback, defaultSettings.showGlories);
    }

    static getSettingUseLatin(callback){
        return SettingsManager._getStorageValue("useLatin", callback, defaultSettings.useLatin);
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

    static getSettingInvitatori(callback){
        return SettingsManager._getStorageValue("invitatori", callback, defaultSettings.invitatori);
    }

    static setSettingShowGlories(value, callback){
        return SettingsManager._setValueIfValid("showGlories", value,
            (val) => val === "true" || val === "false",
            callback);
    }

    static setSettingUseLatin(value, callback){
        return SettingsManager._setValueIfValid("useLatin", value,
            (val) => val === "true" || val === "false",
            callback);
    }

    static setSettingTextSize(value, callback){
        return SettingsManager._setValueIfValid("textSize", value,
            (val) => !isNaN(val) && (parseFloat(val)*10)%10 == 0,
            callback);
    }

    static setSettingDiocesis(value, callback){
        return SettingsManager._setValueIfValid("diocesis", value,
            (val) => {
                return findValueInObject(diocesis, val);
            }, callback);
    }

    static setSettingDayStart(value, callback){
        return SettingsManager._setValueIfValid("dayStart", value,
            (val) => val == "0" || val == "1" || val == "2" || val == "3",
            callback);
    }

    static setSettingInvitatori(value, callback){
        return SettingsManager._setValueIfValid("invitatori", value,
            (val) => {
                return findValueInObject(invitatori, val);
            }, callback);
    }

}

function findValueInObject(obj, value){
    let found = false;
    for(key in obj){
        if(invitatori[key] == value){
            found = true;
        }
    }
    return found;
}

import {AsyncStorage} from "react-native";
import {GoogleAnalyticsTracker} from "react-native-google-analytics-bridge";
import GLOBAL from "../../Globals/Globals";
const tracker = new GoogleAnalyticsTracker(GLOBAL.idTracker);

export const diocesis = {
    BARCELONA: "Barcelona",
    GIRONA: "Girona",
    LLEIDA: "Lleida",
    SANT_FELIU: "Sant Feliu de Llobregat",
    SOLSONA: "Solsona",
    TARRAGONA: "Tarragona",
    TERRASSA: "Terrassa",
    TORTOSA: "Tortosa",
    URGELL: "Urgell",
    VIC: "Vic",
    ANDORRA: "Andorra"
};

export const lloc = {
    DIOCESI: "Diòcesi",
    CIUTAT: "Ciutat",
    CATEDRAL: "Catedral"
};

/*export const invitatori = {
    OFICI: "Ofici",
    LAUDES: "Laudes"
};*/

export const salmInvitatori = {
  SALM94: '94',
  SALM99: '99',
  SALM66: '66',
  SALM23: '23',
}

const defaultSettings = {
    showGlories: "false",
    prayLliures: "false",
    useLatin: "false",
    textSize: "3", //1-5
    diocesis: diocesis.BARCELONA,
    lloc: lloc.DIOCESI,
    dayStart: "0", //Values from 0 to 3 allowed, which means 00:00AM, 01:00AM, 02:00AM and 03:00AM
    // invitatori: invitatori.OFICI
    salmInvitatori: salmInvitatori.SALM94
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
                value => {
                    // console.log("LOADED OPTION: " + key + " - " + value);
                    resolve(value == null ? defaultValue : value);
                }
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
        // console.log("CBBBB. "+callback);
        if(callback) savePromise.then(callback);
        return savePromise;
    }

    static _setValueIfValid(key, value, validateFunc, callback){
        // console.log(key + " - " + value)
        if(!(validateFunc instanceof Function) || validateFunc(value)){
            // console.log("VALID",value);
            return SettingsManager._setStorageValue(key, value, callback);
        }else{
            // console.log("NOT VALID",value);
            let wrongValuePromise = new Promise((resolve, reject) => {
                reject(new Error("Invalid value"));
            });
            return wrongValuePromise;
        }
    }

    static getSettingShowGlories(callback){
        return SettingsManager._getStorageValue("showGlories", callback, defaultSettings.showGlories);
    }

    static getSettingPrayLliures(callback){
        return SettingsManager._getStorageValue("prayLliures", callback, defaultSettings.prayLliures);
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

    static getSettingLloc(callback){
        return SettingsManager._getStorageValue("lloc", callback, defaultSettings.lloc);
    }

    static getSettingDayStart(callback){
        return SettingsManager._getStorageValue("dayStart", callback, defaultSettings.dayStart);
    }

    /*static getSettingInvitatori(callback){
        return SettingsManager._getStorageValue("invitatori", callback, defaultSettings.invitatori);
    }*/

    static getSettingNumSalmInv(callback){
        return SettingsManager._getStorageValue("salmInvitatori", callback, defaultSettings.salmInvitatori);
    }

    static setSettingShowGlories(value, callback){
        return SettingsManager._setValueIfValid("showGlories", value,
            (val) => val === "true" || val === "false",
            callback);
    }

    static setSettingUseLatin(value, callback){
      tracker.trackEvent("Configuration", "New value of Llatí: "+value);
        return SettingsManager._setValueIfValid("useLatin", value,
            (val) => val === "true" || val === "false",
            callback);
    }

    static setSettingPrayLliures(value, callback){
      tracker.trackEvent("Configuration", "New value of Lliures: "+value);
        return SettingsManager._setValueIfValid("prayLliures", value,
            (val) => val === "true" || val === "false",
            callback);
    }

    static setSettingTextSize(value, callback){
      tracker.trackEvent("Configuration", "New value of MidaText: "+value);
        return SettingsManager._setValueIfValid("textSize", value,
            (val) => !isNaN(val) && (parseFloat(val)*10)%10 == 0,
            callback);
    }

    static setSettingDiocesis(value, callback){
      tracker.trackEvent("Configuration", "New value of Diocesis: "+value);
        return SettingsManager._setValueIfValid("diocesis", value,
            (val) => {
                return findValueInObject(diocesis, val);
            }, callback);
    }

    static setSettingLloc(value, callback){
      tracker.trackEvent("Configuration", "New value of Lloc: "+value);
        return SettingsManager._setValueIfValid("lloc", value,
            (val) => {
                return findValueInObject(lloc, val);
            }, callback);
    }

    static setSettingDayStart(value, callback){
        return SettingsManager._setValueIfValid("dayStart", value,
            (val) => val == "0" || val == "1" || val == "2" || val == "3",
            callback);
    }

    /*static setSettingInvitatori(value, callback){
      tracker.trackEvent("Configuration", "New value of Invitatori: "+value);
        return SettingsManager._setValueIfValid("invitatori", value,
            (val) => {
                return findValueInObject(invitatori, val);
            }, callback);
    }*/

    static setSettingNumSalmInv(value){
      // tracker.trackEvent("Configuration", "New value of Invitatori: "+value);
        return SettingsManager._setValueIfValid("salmInvitatori", value,
            (val) => {
                return findValueInObject(salmInvitatori, val);
            });
    }

}

function findValueInObject(obj, value){
    let found = false;
    for(key in obj){
        if(obj[key] == value){
            found = true;
        }
    }
    return found;
}

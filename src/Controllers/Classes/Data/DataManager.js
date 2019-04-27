import { AsyncStorage } from 'react-native';

import DBAdapter from '../../../Adapters/DBAdapter';
import GF from "../../../Globals/GlobalFunctions";
import SOUL from '../SOUL/SOUL';
import SettingsManager from '../SettingsManager';
import { TestsManager, TEST_FIRST_DAY, TEST_LAST_DAY } from '../../../Tests/TestsManager';

/************
 * Class in charge of having all the data that will be shown in views. 
 * Also, to refreshed when necessary.
 * DataManager will posses LitHoresManager and LitDiaManager. So, this class 
 * is the only way to get and refresh all the data. 
 * DataManager uses singleton pattern in order to be accessible to other classes being 
 * just one instance in the whole program.
 ***********/

//Generic values
G_VALUES = {}
//Liturgia de les Hores values
LH_VALUES = {}
//Liturgia diària values
LD_VALUES = {}

//Makes us able to stop the test whenever we want
TESTING = false;

export function Reload_All_Data(date, Reload_Finished_Callback) {
  this.Reload_Finished_Callback = Reload_Finished_Callback;

  G_VALUES.date = date;
  Promise.all([
    SettingsManager.getSettingLloc((r) => {
      G_VALUES.lloc = r;
    }),
    SettingsManager.getSettingDiocesis((r) => {
      G_VALUES.diocesi = GF.transformDiocesiName(r, G_VALUES.lloc);
      G_VALUES.diocesiName = r;
    }),
    SettingsManager.getSettingUseLatin((r) => G_VALUES.llati = r),
    SettingsManager.getSettingTextSize((r) => G_VALUES.textSize = r),
    SettingsManager.getSettingNumSalmInv((r) => G_VALUES.numSalmInv = r),
    SettingsManager.getSettingNumAntMare((r) => G_VALUES.numAntMare = r)
  ]).then(() => {
    Refresh_Data(date);
  });
}

function Refresh_Data(newDay) {
  DB_Access = new DBAdapter();

  return DB_Access.getAnyLiturgic(
    newDay.getFullYear(),
    newDay.getMonth(),
    newDay.getDate(),
    (current, tomorrow, pentacosta) => {
      var celType = GF.getCelType(G_VALUES.diocesi, current);
      var tomorrowCelType = GF.getCelType(G_VALUES.diocesi, tomorrow);

      G_VALUES.celType = celType;
      G_VALUES.diaMogut = current.diaMogut;
      G_VALUES.diocesiMogut = current.diocesiMogut;
      G_VALUES.litColor = current.Color;
      G_VALUES.pentacosta = pentacosta;
      G_VALUES.tempsespecific = current.tempsespecific; //Ordinari, Quaresma, ... 
      G_VALUES.LT = current.temps; //O_ORDINAR, A_SETMANES, ...
      G_VALUES.cicle = current.cicle; //1-4
      G_VALUES.setmana = current.NumSet; //Ordinari: 1-34, pasqua: 2-7 i quaresma: 1-5 o 2-7
      G_VALUES.ABC = current.anyABC; //A, B o C
      G_VALUES.parImpar = current.paroimpar; //I o II
      G_VALUES.diaDeLaSetmana = current.DiadelaSetmana;

      var tomorrow_date = new Date(newDay.getFullYear(), newDay.getMonth(), newDay.getDate());
      tomorrow_date.setDate(tomorrow_date.getDate() + 1);

      var dataTomorrow = {
        date: tomorrow_date,
        celType: tomorrowCelType,
        diaMogut: tomorrow.diaMogut,
        diocesiMogut: tomorrow.diocesiMogut,
        litColor: tomorrow.Color,
        tempsespecific: tomorrow.tempsespecific,
        LT: tomorrow.temps,
        cicle: tomorrow.cicle,
        setmana: tomorrow.NumSet,
        ABC: tomorrow.anyABC,
        parImpar: tomorrow.paroimpar,
        diaDeLaSetmana: tomorrow.DiadelaSetmana
      }
      G_VALUES.dataTomorrow = dataTomorrow;

      Check_Lliure_Date();

      //Get all liturgia data
      new SOUL(Set_Soul_CB);
    }
  );
}

function Check_Lliure_Date() {
  AsyncStorage.getItem("lliureDate").then((value) => {
    if (!value) AsyncStorage.setItem('lliureDate', 'none');

    if (value && value !== 'none') {
      dataArr = value.split(':');
      if (parseInt(dataArr[0]) === G_VALUES.date.getDate() &&
        parseInt(dataArr[1]) === G_VALUES.date.getMonth() &&
        parseInt(dataArr[2]) === G_VALUES.date.getFullYear()) {
        G_VALUES.lliures = true;
      }
      else {
        G_VALUES.lliures = false;
      }
    }
    else {
      G_VALUES.lliures = false;
    }
  }).done();
}

function Set_Soul_CB(liturgia_hores, info_cel, liturgia_diaria) {
  LH_VALUES = liturgia_hores;
  G_VALUES.info_cel = info_cel;
  G_VALUES.primVespres = primVespres();
  LD_VALUES = liturgia_diaria;

  this.Reload_Finished_Callback();
}

function primVespres() {
  if ((G_VALUES.date.getDay() === 6 && G_VALUES.celType !== 'S') || LH_VALUES.vespres1) return true;
  return false;
}

export function Reload_All_Data_TestMode(Test_Information_Callback) {
  //Init stateArr and index iteration
  TESTING = true;
  Reload_All_Data(TEST_FIRST_DAY, Test_Day_Finished_Callback.bind(this, Test_Information_Callback));
}

function Test_Day_Finished_Callback(Test_Information_Callback) {
  if (TESTING) {
    /*if (necessary export) {
      TestsManager.writeState(bla bla);
    }*/

    //if (this.variables.celType === 'L' && this.variables.lliures === false) {
    //Tornem a passar el dia però amb lliures activades

    console.log(G_VALUES.date + " vsvsvsvsvsvs " + TEST_LAST_DAY);
    
    if (G_VALUES.date.getFullYear() === TEST_LAST_DAY.getFullYear() &&
      G_VALUES.date.getMonth() === TEST_LAST_DAY.getMonth() &&
      G_VALUES.date.getDate() === TEST_LAST_DAY.getDate()) { 
      Test_Information_Callback("FINISHED!");
    }
    else {
      Test_Information_Callback("DAY OK: " + G_VALUES.date);
      var next_day = new Date(G_VALUES.date.getFullYear(), G_VALUES.date.getMonth(), G_VALUES.date.getDate() + 1);
      Reload_All_Data(next_day, Test_Day_Finished_Callback.bind(this, Test_Information_Callback));
    }
  }
}

export function Force_Stop_Test(Test_Information_Callback) {
  Test_Information_Callback("FORCED TO FINISH");
  TESTING = false;
}
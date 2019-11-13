import { Reload_All_Data } from '../Controllers/Classes/Data/DataManager.js';
import GF from "../Globals/GlobalFunctions";

/********************** TEST VARIABLES **********************/

export var TEST_MODE_ON = true;
export var STATE_ON = TEST_MODE_ON && true;
export var TEST_FIRST_DAY = new Date(2020, 11, 7); //(s'inclou en el test)
export var TEST_LAST_DAY = new Date(2020, 11, 9); //(s'inclou en el test)
export var FIRST_DIOCESI = 0; //0-33 (s'inclou en el test) Order is determined in GF.getTestDiocesiByIndex()
export var LAST_DIOCESI = 0; //0-33 (s'inclou en el test)

/************************************************************/

/* Testing variables */
RNFS = require('react-native-fs');
PATH = '/Users/pau/Box/Projects/CPL/states/';
FILE_PART = 0;

var TESTING = false; //To stop test if necessary
var CURRENT_DIOCESI = 0;
var TEST_STATE_ARRAY = [];
var TEST_STATE_ARRAY_INDEX = 0;

export function Reload_All_Data_TestMode(Test_Information_Callback) {
  TESTING = true;
  CURRENT_DIOCESI = FIRST_DIOCESI
  G_VALUES.lliures = false;
  G_VALUES.diocesi = GF.getTestDiocesiByIndex(FIRST_DIOCESI)
  G_VALUES.diocesiName = GF.getTestNameDiocesiByIndex(FIRST_DIOCESI)
  G_VALUES.lloc = GF.getTestLlocByIndex(FIRST_DIOCESI)
  Reload_All_Data(TEST_FIRST_DAY, Test_Day_Finished_Callback.bind(this, Test_Information_Callback));
}

function Test_Day_Finished_Callback(Test_Information_Callback) {
  if (TESTING) {

    //Feedback to View
    Test_Information_Callback(
      "Date: " + G_VALUES.date.toLocaleDateString("es-ES") + " - " + TEST_LAST_DAY.toLocaleDateString("es-ES") + "\n" +
      "Diocesi: " + CURRENT_DIOCESI + " - " + LAST_DIOCESI + " [" + G_VALUES.diocesi + "]\n" +
      "Lliures: " + G_VALUES.lliures
    );

    //Add Liturgia to array
    Set_Liturgia_State();

    if (G_VALUES.celType == 'L' && G_VALUES.lliures == false) {
      //Tornem a passar el dia però amb lliures activades
      G_VALUES.lliures = true;
      Reload_All_Data(G_VALUES.date, Test_Day_Finished_Callback.bind(this, Test_Information_Callback));
    }
    else {
      G_VALUES.lliures = false;

      if (G_VALUES.date.getFullYear() === TEST_LAST_DAY.getFullYear() &&
        G_VALUES.date.getMonth() === TEST_LAST_DAY.getMonth() &&
        G_VALUES.date.getDate() === TEST_LAST_DAY.getDate()) {
        //Test interval finished
        TEST_STATE_ARRAY_INDEX = 0;

        if (STATE_ON) {
          setTimeout(() => {
            writeState(
              TEST_STATE_ARRAY,
              TEST_FIRST_DAY,
              TEST_LAST_DAY,
              FIRST_DIOCESI,
              LAST_DIOCESI,
              State_Saved_Callback.bind(this),
              (CURRENT_DIOCESI == LAST_DIOCESI)
            );
          }, 1000);
        }

        if (CURRENT_DIOCESI == LAST_DIOCESI) {
          Test_Information_Callback("FINISHED!");
        }
        else {
          CURRENT_DIOCESI++;
          G_VALUES.diocesi = GF.getTestDiocesiByIndex(CURRENT_DIOCESI)
          G_VALUES.diocesiName = GF.getTestNameDiocesiByIndex(CURRENT_DIOCESI)
          G_VALUES.lloc = GF.getTestLlocByIndex(CURRENT_DIOCESI)
          Reload_All_Data(TEST_FIRST_DAY, Test_Day_Finished_Callback.bind(this, Test_Information_Callback));
        }
      }
      else {
        var next_day = new Date(G_VALUES.date.getFullYear(), G_VALUES.date.getMonth(), G_VALUES.date.getDate() + 1);
        Reload_All_Data(next_day, Test_Day_Finished_Callback.bind(this, Test_Information_Callback));
      }
    }
  }
}

function Set_Liturgia_State() {
  var auxLIT = Object.assign({}, LH_VALUES);
  var auxLD = Object.assign({}, LD_VALUES);
  stateDayStructure = {
    date: {
      day: G_VALUES.date.getDate(),
      month: (G_VALUES.date.getMonth() + 1),
      year: G_VALUES.date.getFullYear(),
    },
    diocesi: G_VALUES.diocesi,
    LIT: auxLIT,
    LD: auxLD,
  }
  TEST_STATE_ARRAY[TEST_STATE_ARRAY_INDEX] = stateDayStructure;
  TEST_STATE_ARRAY_INDEX++;
}

function State_Saved_Callback(info_text) {
  console.log("State info: " + info_text);
}

export function Force_Stop_Test(Test_Information_Callback) {
  Test_Information_Callback("FORCED TO FINISH");
  TESTING = false;
}

function writeState(stateArr, idt, fdt, iDt, fDt, cb, lastW) {
  FILE_PART++;
  var dataShow = _transformData(stateArr);

  // write the file
  var idtAux = idt.getDate() + '_' + idt.getMonth() + '_' + idt.getFullYear();
  var fdtAux = fdt.getDate() + '_' + fdt.getMonth() + '_' + fdt.getFullYear();
  var rightNow = new Date();
  var rnDate = rightNow.getDate();
  var rnMonth = rightNow.getMonth() + 1;
  var rnYear = rightNow.getFullYear();
  var plusPath = rnDate + "_" + rnMonth + "_" + rnYear + "-state[" + idtAux + "-" + fdtAux + "," + iDt + "-" + fDt + "]/";
  var name = "state[" + idtAux + "-" + fdtAux + "," + iDt + "-" + fDt + "]Part" + FILE_PART + ".txt";
  var totalPath = PATH + plusPath + name;
  RNFS.mkdir(PATH + plusPath)
    .then((success) => {
      RNFS.writeFile(totalPath, dataShow, 'utf8')
        .then((success) => {
          if (lastW) {
            var rightNow = new Date();
            cb("All parts saved correctly at: " + rightNow);
          }
          else {
            cb("File saved correctly. Part: " + FILE_PART);
          }
        })
    })
    .catch((err) => {
      console.log('FileLog. Error: ' + err.message);
      cb("File not saved... Error: " + err.message);
    });
}

function _transformData(SA) {
  var TD = "";
  var x;
  for (x in SA) {
    console.log("FileLog. Part: " + FILE_PART + ". Saving data to file. Day: " + x + '/' + SA.length);
    TD += '>>>>>' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi;
    TD += '\n>>>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']OFICI';
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']antInvitatori: ' + _subText(SA[x].LIT.ofici.antInvitatori);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']himne: ' + _subText(SA[x].LIT.ofici.himne);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']ant1: ' + _subText(SA[x].LIT.ofici.ant1);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']titol1: ' + _subText(SA[x].LIT.ofici.titol1);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']com1: ' + _subText(SA[x].LIT.ofici.com1);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']salm1: ' + _subText(SA[x].LIT.ofici.salm1);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']gloria1: ' + _subText(SA[x].LIT.ofici.gloria1);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']ant2: ' + _subText(SA[x].LIT.ofici.ant2);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']titol2: ' + _subText(SA[x].LIT.ofici.titol2);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']com2: ' + _subText(SA[x].LIT.ofici.com2);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']salm2: ' + _subText(SA[x].LIT.ofici.salm2);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']gloria2: ' + _subText(SA[x].LIT.ofici.gloria2);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']ant3: ' + _subText(SA[x].LIT.ofici.ant3);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']titol3: ' + _subText(SA[x].LIT.ofici.titol3);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']com3: ' + _subText(SA[x].LIT.ofici.com3);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']salm3: ' + _subText(SA[x].LIT.ofici.salm3);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']gloria3: ' + _subText(SA[x].LIT.ofici.gloria3);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']respV: ' + _subText(SA[x].LIT.ofici.respV);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']respR: ' + _subText(SA[x].LIT.ofici.respR);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']referencia1: ' + _subText(SA[x].LIT.ofici.referencia1);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']cita1: ' + _subText(SA[x].LIT.ofici.cita1);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']titolLectura1: ' + _subText(SA[x].LIT.ofici.titolLectura1);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']lectura1: ' + _subText(SA[x].LIT.ofici.lectura1);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']citaResp1: ' + _subText(SA[x].LIT.ofici.citaResp1);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']resp1Part1: ' + _subText(SA[x].LIT.ofici.resp1Part1);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']resp1Part2: ' + _subText(SA[x].LIT.ofici.resp1Part2);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']resp1Part3: ' + _subText(SA[x].LIT.ofici.resp1Part3);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']referencia2: ' + _subText(SA[x].LIT.ofici.referencia2);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']cita2: ' + _subText(SA[x].LIT.ofici.cita2);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']titolLectura2: ' + _subText(SA[x].LIT.ofici.titolLectura2);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']lectura2: ' + _subText(SA[x].LIT.ofici.lectura2);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']versResp2: ' + _subText(SA[x].LIT.ofici.versResp2);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']resp2Part1: ' + _subText(SA[x].LIT.ofici.resp2Part1);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']resp2Part2: ' + _subText(SA[x].LIT.ofici.resp2Part2);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']resp2Part3: ' + _subText(SA[x].LIT.ofici.resp2Part3);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']himneOhDeuBool: ' + _subText(SA[x].LIT.ofici.himneOhDeuBool);
    TD += '\n';
    TD += '>[Ofici,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']oracio: ' + _subText(SA[x].LIT.ofici.oracio);
    TD += '\n--------------------';
    TD += '\n>>>[Laudes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']LAUDES';
    TD += '\n';
    TD += '>[Laudes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']himne: ' + _subText(SA[x].LIT.laudes.himne);
    TD += '\n';
    TD += '>[Laudes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']ant1: ' + _subText(SA[x].LIT.laudes.ant1);
    TD += '\n';
    TD += '>[Laudes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']titol1: ' + _subText(SA[x].LIT.laudes.titol1);
    TD += '\n';
    TD += '>[Laudes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']com1: ' + _subText(SA[x].LIT.laudes.com1);
    TD += '\n';
    TD += '>[Laudes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']salm1: ' + _subText(SA[x].LIT.laudes.salm1);
    TD += '\n';
    TD += '>[Laudes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']gloria1: ' + _subText(SA[x].LIT.laudes.gloria1);
    TD += '\n';
    TD += '>[Laudes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']ant2: ' + _subText(SA[x].LIT.laudes.ant2);
    TD += '\n';
    TD += '>[Laudes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']titol2: ' + _subText(SA[x].LIT.laudes.titol2);
    TD += '\n';
    TD += '>[Laudes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']com2: ' + _subText(SA[x].LIT.laudes.com2);
    TD += '\n';
    TD += '>[Laudes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']salm2: ' + _subText(SA[x].LIT.laudes.salm2);
    TD += '\n';
    TD += '>[Laudes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']gloria2: ' + _subText(SA[x].LIT.laudes.gloria2);
    TD += '\n';
    TD += '>[Laudes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']ant3: ' + _subText(SA[x].LIT.laudes.ant3);
    TD += '\n';
    TD += '>[Laudes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']titol3: ' + _subText(SA[x].LIT.laudes.titol3);
    TD += '\n';
    TD += '>[Laudes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']com3: ' + _subText(SA[x].LIT.laudes.com3);
    TD += '\n';
    TD += '>[Laudes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']salm3: ' + _subText(SA[x].LIT.laudes.salm3);
    TD += '\n';
    TD += '>[Laudes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']gloria3: ' + _subText(SA[x].LIT.laudes.gloria3);
    TD += '\n';
    TD += '>[Laudes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']vers: ' + _subText(SA[x].LIT.laudes.vers);
    TD += '\n';
    TD += '>[Laudes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']lecturaBreu: ' + _subText(SA[x].LIT.laudes.lecturaBreu);
    TD += '\n';
    TD += '>[Laudes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']calAntEspecial: ' + _subText(SA[x].LIT.laudes.calAntEspecial);
    TD += '\n';
    TD += '>[Laudes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']antEspecialLaudes: ' + _subText(SA[x].LIT.laudes.antEspecialLaudes);
    TD += '\n';
    TD += '>[Laudes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']respBreu1: ' + _subText(SA[x].LIT.laudes.respBreu1);
    TD += '\n';
    TD += '>[Laudes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']respBreu2: ' + _subText(SA[x].LIT.laudes.respBreu2);
    TD += '\n';
    TD += '>[Laudes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']respBreu3: ' + _subText(SA[x].LIT.laudes.respBreu3);
    TD += '\n';
    TD += '>[Laudes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']antCantic: ' + _subText(SA[x].LIT.laudes.antCantic);
    TD += '\n';
    TD += '>[Laudes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']pregaries: ' + _subText(SA[x].LIT.laudes.pregaries);
    TD += '\n';
    TD += '>[Laudes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']oracio: ' + _subText(SA[x].LIT.laudes.oracio);
    TD += '\n--------------------';
    TD += '\n>>>[Tercia,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']TERCIA';
    TD += '\n';
    TD += '>[Tercia,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']himne: ' + _subText(SA[x].LIT.tercia.himne);
    TD += '\n';
    TD += '>[Tercia,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']antifones: ' + _subText(SA[x].LIT.tercia.antifones);
    TD += '\n';
    TD += '>[Tercia,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']ant: ' + _subText(SA[x].LIT.tercia.ant);
    TD += '\n';
    TD += '>[Tercia,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']ant1: ' + _subText(SA[x].LIT.tercia.ant1);
    TD += '\n';
    TD += '>[Tercia,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']titol1: ' + _subText(SA[x].LIT.tercia.titol1);
    TD += '\n';
    TD += '>[Tercia,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']com1: ' + _subText(SA[x].LIT.tercia.com1);
    TD += '\n';
    TD += '>[Tercia,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']salm1: ' + _subText(SA[x].LIT.tercia.salm1);
    TD += '\n';
    TD += '>[Tercia,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']gloria1: ' + _subText(SA[x].LIT.tercia.gloria1);
    TD += '\n';
    TD += '>[Tercia,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']ant2: ' + _subText(SA[x].LIT.tercia.ant2);
    TD += '\n';
    TD += '>[Tercia,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']titol2: ' + _subText(SA[x].LIT.tercia.titol2);
    TD += '\n';
    TD += '>[Tercia,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']com2: ' + _subText(SA[x].LIT.tercia.com2);
    TD += '\n';
    TD += '>[Tercia,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']salm2: ' + _subText(SA[x].LIT.tercia.salm2);
    TD += '\n';
    TD += '>[Tercia,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']gloria2: ' + _subText(SA[x].LIT.tercia.gloria2);
    TD += '\n';
    TD += '>[Tercia,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']ant3: ' + _subText(SA[x].LIT.tercia.ant3);
    TD += '\n';
    TD += '>[Tercia,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']titol3: ' + _subText(SA[x].LIT.tercia.titol3);
    TD += '\n';
    TD += '>[Tercia,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']com3: ' + _subText(SA[x].LIT.tercia.com3);
    TD += '\n';
    TD += '>[Tercia,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']salm3: ' + _subText(SA[x].LIT.tercia.salm3);
    TD += '\n';
    TD += '>[Tercia,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']gloria3: ' + _subText(SA[x].LIT.tercia.gloria3);
    TD += '\n';
    TD += '>[Tercia,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']vers: ' + _subText(SA[x].LIT.tercia.vers);
    TD += '\n';
    TD += '>[Tercia,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']lecturaBreu: ' + _subText(SA[x].LIT.tercia.lecturaBreu);
    TD += '\n';
    TD += '>[Tercia,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']respV: ' + _subText(SA[x].LIT.tercia.respV);
    TD += '\n';
    TD += '>[Tercia,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']respR: ' + _subText(SA[x].LIT.tercia.respR);
    TD += '\n';
    TD += '>[Tercia,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']oracio: ' + _subText(SA[x].LIT.tercia.oracio);
    TD += '\n--------------------';
    TD += '\n>>>[Sexta,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']SEXTA';
    TD += '\n';
    TD += '>[Sexta,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']himne: ' + _subText(SA[x].LIT.sexta.himne);
    TD += '\n';
    TD += '>[Sexta,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']antifones: ' + _subText(SA[x].LIT.sexta.antifones);
    TD += '\n';
    TD += '>[Sexta,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']ant: ' + _subText(SA[x].LIT.sexta.ant);
    TD += '\n';
    TD += '>[Sexta,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']ant1: ' + _subText(SA[x].LIT.sexta.ant1);
    TD += '\n';
    TD += '>[Sexta,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']titol1: ' + _subText(SA[x].LIT.sexta.titol1);
    TD += '\n';
    TD += '>[Sexta,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']com1: ' + _subText(SA[x].LIT.sexta.com1);
    TD += '\n';
    TD += '>[Sexta,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']salm1: ' + _subText(SA[x].LIT.sexta.salm1);
    TD += '\n';
    TD += '>[Sexta,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']gloria1: ' + _subText(SA[x].LIT.sexta.gloria1);
    TD += '\n';
    TD += '>[Sexta,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']ant2: ' + _subText(SA[x].LIT.sexta.ant2);
    TD += '\n';
    TD += '>[Sexta,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']titol2: ' + _subText(SA[x].LIT.sexta.titol2);
    TD += '\n';
    TD += '>[Sexta,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']com2: ' + _subText(SA[x].LIT.sexta.com2);
    TD += '\n';
    TD += '>[Sexta,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']salm2: ' + _subText(SA[x].LIT.sexta.salm2);
    TD += '\n';
    TD += '>[Sexta,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']gloria2: ' + _subText(SA[x].LIT.sexta.gloria2);
    TD += '\n';
    TD += '>[Sexta,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']ant3: ' + _subText(SA[x].LIT.sexta.ant3);
    TD += '\n';
    TD += '>[Sexta,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']titol3: ' + _subText(SA[x].LIT.sexta.titol3);
    TD += '\n';
    TD += '>[Sexta,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']com3: ' + _subText(SA[x].LIT.sexta.com3);
    TD += '\n';
    TD += '>[Sexta,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']salm3: ' + _subText(SA[x].LIT.sexta.salm3);
    TD += '\n';
    TD += '>[Sexta,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']gloria3: ' + _subText(SA[x].LIT.sexta.gloria3);
    TD += '\n';
    TD += '>[Sexta,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']vers: ' + _subText(SA[x].LIT.sexta.vers);
    TD += '\n';
    TD += '>[Sexta,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']lecturaBreu: ' + _subText(SA[x].LIT.sexta.lecturaBreu);
    TD += '\n';
    TD += '>[Sexta,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']respV: ' + _subText(SA[x].LIT.sexta.respV);
    TD += '\n';
    TD += '>[Sexta,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']respR: ' + _subText(SA[x].LIT.sexta.respR);
    TD += '\n';
    TD += '>[Sexta,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']oracio: ' + _subText(SA[x].LIT.sexta.oracio);
    TD += '\n--------------------';
    TD += '\n>>>[Nona,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']NONA';
    TD += '\n';
    TD += '>[Nona,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']himne: ' + _subText(SA[x].LIT.nona.himne);
    TD += '\n';
    TD += '>[Nona,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']antifones: ' + _subText(SA[x].LIT.nona.antifones);
    TD += '\n';
    TD += '>[Nona,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']ant: ' + _subText(SA[x].LIT.nona.ant);
    TD += '\n';
    TD += '>[Nona,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']ant1: ' + _subText(SA[x].LIT.nona.ant1);
    TD += '\n';
    TD += '>[Nona,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']titol1: ' + _subText(SA[x].LIT.nona.titol1);
    TD += '\n';
    TD += '>[Nona,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']com1: ' + _subText(SA[x].LIT.nona.com1);
    TD += '\n';
    TD += '>[Nona,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']salm1: ' + _subText(SA[x].LIT.nona.salm1);
    TD += '\n';
    TD += '>[Nona,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']gloria1: ' + _subText(SA[x].LIT.nona.gloria1);
    TD += '\n';
    TD += '>[Nona,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']ant2: ' + _subText(SA[x].LIT.nona.ant2);
    TD += '\n';
    TD += '>[Nona,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']titol2: ' + _subText(SA[x].LIT.nona.titol2);
    TD += '\n';
    TD += '>[Nona,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']com2: ' + _subText(SA[x].LIT.nona.com2);
    TD += '\n';
    TD += '>[Nona,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']salm2: ' + _subText(SA[x].LIT.nona.salm2);
    TD += '\n';
    TD += '>[Nona,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']gloria2: ' + _subText(SA[x].LIT.nona.gloria2);
    TD += '\n';
    TD += '>[Nona,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']ant3: ' + _subText(SA[x].LIT.nona.ant3);
    TD += '\n';
    TD += '>[Nona,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']titol3: ' + _subText(SA[x].LIT.nona.titol3);
    TD += '\n';
    TD += '>[Nona,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']com3: ' + _subText(SA[x].LIT.nona.com3);
    TD += '\n';
    TD += '>[Nona,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']salm3: ' + _subText(SA[x].LIT.nona.salm3);
    TD += '\n';
    TD += '>[Nona,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']gloria3: ' + _subText(SA[x].LIT.nona.gloria3);
    TD += '\n';
    TD += '>[Nona,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']vers: ' + _subText(SA[x].LIT.nona.vers);
    TD += '\n';
    TD += '>[Nona,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']lecturaBreu: ' + _subText(SA[x].LIT.nona.lecturaBreu);
    TD += '\n';
    TD += '>[Nona,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']respV: ' + _subText(SA[x].LIT.nona.respV);
    TD += '\n';
    TD += '>[Nona,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']respR: ' + _subText(SA[x].LIT.nona.respR);
    TD += '\n';
    TD += '>[Nona,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']oracio: ' + _subText(SA[x].LIT.nona.oracio);
    TD += '\n--------------------';
    TD += '\n>>>[Vespres,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']VESPRES';
    TD += '\n';
    TD += '>[Vespres,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']himne: ' + _subText(SA[x].LIT.vespres.himne);
    TD += '\n';
    TD += '>[Vespres,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']ant1: ' + _subText(SA[x].LIT.vespres.ant1);
    TD += '\n';
    TD += '>[Vespres,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']titol1: ' + _subText(SA[x].LIT.vespres.titol1);
    TD += '\n';
    TD += '>[Vespres,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']com1: ' + _subText(SA[x].LIT.vespres.com1);
    TD += '\n';
    TD += '>[Vespres,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']salm1: ' + _subText(SA[x].LIT.vespres.salm1);
    TD += '\n';
    TD += '>[Vespres,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']gloria1: ' + _subText(SA[x].LIT.vespres.gloria1);
    TD += '\n';
    TD += '>[Vespres,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']ant2: ' + _subText(SA[x].LIT.vespres.ant2);
    TD += '\n';
    TD += '>[Vespres,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']titol2: ' + _subText(SA[x].LIT.vespres.titol2);
    TD += '\n';
    TD += '>[Vespres,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']com2: ' + _subText(SA[x].LIT.vespres.com2);
    TD += '\n';
    TD += '>[Vespres,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']salm2: ' + _subText(SA[x].LIT.vespres.salm2);
    TD += '\n';
    TD += '>[Vespres,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']gloria2: ' + _subText(SA[x].LIT.vespres.gloria2);
    TD += '\n';
    TD += '>[Vespres,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']ant3: ' + _subText(SA[x].LIT.vespres.ant3);
    TD += '\n';
    TD += '>[Vespres,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']titol3: ' + _subText(SA[x].LIT.vespres.titol3);
    TD += '\n';
    TD += '>[Vespres,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']com3: ' + _subText(SA[x].LIT.vespres.com3);
    TD += '\n';
    TD += '>[Vespres,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']salm3: ' + _subText(SA[x].LIT.vespres.salm3);
    TD += '\n';
    TD += '>[Vespres,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']gloria3: ' + _subText(SA[x].LIT.vespres.gloria3);
    TD += '\n';
    TD += '>[Vespres,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']vers: ' + _subText(SA[x].LIT.vespres.vers);
    TD += '\n';
    TD += '>[Vespres,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']lecturaBreu: ' + _subText(SA[x].LIT.vespres.lecturaBreu);
    TD += '\n';
    TD += '>[Vespres,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']calAntEspecial: ' + _subText(SA[x].LIT.vespres.calAntEspecial);
    TD += '\n';
    TD += '>[Vespres,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']antEspecialVespres: ' + _subText(SA[x].LIT.vespres.antEspecialVespres);
    TD += '\n';
    TD += '>[Vespres,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']respBreu1: ' + _subText(SA[x].LIT.vespres.respBreu1);
    TD += '\n';
    TD += '>[Vespres,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']respBreu2: ' + _subText(SA[x].LIT.vespres.respBreu2);
    TD += '\n';
    TD += '>[Vespres,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']respBreu3: ' + _subText(SA[x].LIT.vespres.respBreu3);
    TD += '\n';
    TD += '>[Vespres,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']antCantic: ' + _subText(SA[x].LIT.vespres.antCantic);
    TD += '\n';
    TD += '>[Vespres,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']pregaries: ' + _subText(SA[x].LIT.vespres.pregaries);
    TD += '\n';
    TD += '>[Vespres,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']oracio: ' + _subText(SA[x].LIT.vespres.oracio);
    TD += '\n--------------------';
    TD += '\n>>>[Completes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']COMPLETES';
    TD += '\n';
    TD += '>[Completes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']himne: ' + _subText(SA[x].LIT.completes.himne);
    TD += '\n';
    TD += '>[Completes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']antifones: ' + _subText(SA[x].LIT.completes.antifones);
    TD += '\n';
    TD += '>[Completes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']ant1: ' + _subText(SA[x].LIT.completes.ant1);
    TD += '\n';
    TD += '>[Completes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']titol1: ' + _subText(SA[x].LIT.completes.titol1);
    TD += '\n';
    TD += '>[Completes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']com1: ' + _subText(SA[x].LIT.completes.com1);
    TD += '\n';
    TD += '>[Completes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']salm1: ' + _subText(SA[x].LIT.completes.salm1);
    TD += '\n';
    TD += '>[Completes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']gloria1: ' + _subText(SA[x].LIT.completes.gloria1);
    TD += '\n';
    TD += '>[Completes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']ant2: ' + _subText(SA[x].LIT.completes.ant2);
    TD += '\n';
    TD += '>[Completes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']titol2: ' + _subText(SA[x].LIT.completes.titol2);
    TD += '\n';
    TD += '>[Completes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']com2: ' + _subText(SA[x].LIT.completes.com2);
    TD += '\n';
    TD += '>[Completes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']salm2: ' + _subText(SA[x].LIT.completes.salm2);
    TD += '\n';
    TD += '>[Completes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']gloria2: ' + _subText(SA[x].LIT.completes.gloria2);
    TD += '\n';
    TD += '>[Completes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']vers: ' + _subText(SA[x].LIT.completes.vers);
    TD += '\n';
    TD += '>[Completes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']lecturaBreu: ' + _subText(SA[x].LIT.completes.lecturaBreu);
    TD += '\n';
    TD += '>[Completes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']antRespEspecial: ' + _subText(SA[x].LIT.completes.antRespEspecial);
    TD += '\n';
    TD += '>[Completes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']respBreu1: ' + _subText(SA[x].LIT.completes.respBreu1);
    TD += '\n';
    TD += '>[Completes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']respBreu2: ' + _subText(SA[x].LIT.completes.respBreu2);
    TD += '\n';
    TD += '>[Completes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']respBreu3: ' + _subText(SA[x].LIT.completes.respBreu3);
    TD += '\n';
    TD += '>[Completes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']antCantic: ' + _subText(SA[x].LIT.completes.antCantic);
    TD += '\n';
    TD += '>[Completes,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']oracio: ' + _subText(SA[x].LIT.completes.oracio);
    TD += '\n--------------------';
    TD += '\n>>>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']MISSA';
    TD += '\n';
    
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']Lectura1Vespers: ' + _subText(SA[x].LD.Lectura1Vespers);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']Lectura1CitaVespers: ' + _subText(SA[x].LD.Lectura1CitaVespers);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']Lectura1TitolVespers: ' + _subText(SA[x].LD.Lectura1TitolVespers);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']Lectura1TextVespers: ' + _subText(SA[x].LD.Lectura1TextVespers);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']SalmVespers: ' + _subText(SA[x].LD.SalmVespers);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']SalmTextVespers: ' + _subText(SA[x].LD.SalmTextVespers);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']Lectura2Vespers: ' + _subText(SA[x].LD.Lectura2Vespers);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']Lectura2CitaVespers: ' + _subText(SA[x].LD.Lectura2CitaVespers);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']Lectura2TitolVespers: ' + _subText(SA[x].LD.Lectura2TitolVespers);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']Lectura2TextVespers: ' + _subText(SA[x].LD.Lectura2TextVespers);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']credoVespers: ' + _subText(SA[x].LD.credoVespers);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']AlleluiaTextVespers: ' + _subText(SA[x].LD.AlleluiaTextVespers);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']EvangeliCitaVespers: ' + _subText(SA[x].LD.EvangeliCitaVespers);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']EvangeliVespers: ' + _subText(SA[x].LD.EvangeliVespers);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']EvangeliTitolVespers: ' + _subText(SA[x].LD.EvangeliTitolVespers);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']EvangeliTextVespers: ' + _subText(SA[x].LD.EvangeliTextVespers);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']Lectura1: ' + _subText(SA[x].LD.Lectura1);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']Lectura1Cita: ' + _subText(SA[x].LD.Lectura1Cita);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']Lectura1Titol: ' + _subText(SA[x].LD.Lectura1Titol);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']Lectura1Text: ' + _subText(SA[x].LD.Lectura1Text);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']Salm: ' + _subText(SA[x].LD.Salm);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']SalmText: ' + _subText(SA[x].LD.SalmText);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']Lectura2: ' + _subText(SA[x].LD.Lectura2);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']Lectura2Cita: ' + _subText(SA[x].LD.Lectura2Cita);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']Lectura2Titol: ' + _subText(SA[x].LD.Lectura2Titol);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']Lectura2Text: ' + _subText(SA[x].LD.Lectura2Text);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']credo: ' + _subText(SA[x].LD.credo);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']AlleluiaText: ' + _subText(SA[x].LD.AlleluiaText);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']EvangeliCita: ' + _subText(SA[x].LD.EvangeliCita);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']Evangeli: ' + _subText(SA[x].LD.Evangeli);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']EvangeliTitol: ' + _subText(SA[x].LD.EvangeliTitol);
    TD += '\n';
    TD += '>[Missa,' + SA[x].date.day + '/' + SA[x].date.month + '/' + SA[x].date.year + '-' + SA[x].diocesi + ']EvangeliText: ' + _subText(SA[x].LD.EvangeliText);
    TD += '\n';

    
    TD += '\n::---------------------------------------------------::\n';
  }
  console.log("FileLog. TD.length: " + TD.length);
  return TD;
}

function _subText(text) {
  var maxChar = 30; //deixar en blanc si es vol tot el text (var maxChar;)
  if (text && text !== undefined) {
    if (typeof text !== 'string') text = text.toString();
    return text.substring(0, maxChar);
  }
  return "undefined";
}
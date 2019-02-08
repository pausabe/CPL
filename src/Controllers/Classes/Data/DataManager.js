import { AsyncStorage } from 'react-native';

import DBAdapter from '../../../Adapters/DBAdapter';
import GF from "../../../Globals/GlobalFunctions";
import SOUL from '../SOUL/SOUL';
import SettingsManager from '../SettingsManager';

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
      G_VALUES.tempsespecific = current.tempsespecific;
      G_VALUES.LT = current.temps;
      G_VALUES.cicle = current.cicle; //1-4
      G_VALUES.setmana = current.NumSet; //Ordinari: 1-34, pasqua: 2-7 i quaresma: 1-5 o 2-7
      G_VALUES.ABC = current.anyABC;

      var tomorrow = new Date(newDay.getFullYear(), newDay.getMonth(), newDay.getDate());
      tomorrow.setDate(tomorrow.getDate()+1);

      var dataTomorrow = {
        date: tomorrow,
        celType: tomorrowCelType,
        LT: tomorrow.temps,
        setmana: tomorrow.NumSet,
        diaMogut: tomorrow.diaMogut,
        diocesiMogut: tomorrow.diocesiMogut,
      }
      G_VALUES.dataTomorrow = dataTomorrow;

      Check_Lliure_Date();

      //Set Liturgia de les Hores
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

function Set_Soul_CB(liturgia_hores, info_cel) {
  LH_VALUES = liturgia_hores;
  G_VALUES.info_cel = info_cel;

  LD_VALUES = Fake_Values();

  this.Reload_Finished_Callback();
}

function Fake_Values(){
  return {
    Lectura1: "Isaïes 49,3.5-6",
    Lectura1Cita: "T’he fet llum de tots els pobles perquè la meva salvació",
    Lectura1Titol: "Lectura del llibre d’Isaïes",
    Lectura1Text: "El Senyor em digué: «Ets el meu servent, Israel, estic orgullós de tu». El Senyor mha format des del si de la mare perquè fos el seu servent i fes tornar el poble de Jacob, li reunís el poble dIsrael; mhe sentit honorat davant el Senyor, i el meu Déu ha estat la meva glòria; però ara ell em diu: «És massa poc que siguis el meu servent per restablir les tribus de Jacob i fer tornar els supervivents dIsrael; the fet llum de tots els pobles perquè la meva salvació arribi dun cap a laltre de la terra».",
    Salm: "Salm 39,2 i 4ab.7.8-9.10 (R.: 8a i 9a)",
    SalmText: "Tenia posada lesperança en el Senyor,\ni ell, inclinant-se cap a mi,\nha inspirat als meus llavis un càntic nou,\nun himne de lloança al nostre Déu.\n\nR. Aquí em teniu: Déu meu, vull fer la vostra voluntat.\n\nPerò vós no voleu oblacions ni sacrificis,\ni mheu parlat a cau dorella;\nno exigiu lholocaust ni lexpiació. R.\n\nPer això us dic: «Aquí em teniu:\ncom està escrit de mi en el llibre,\nDéu meu, vull fer la vostra voluntat,\nguardo la vostra llei al fons del cor». R.\n\nAnuncio amb goig la salvació\ndavant el poble en dia de gran festa.\nNo puc deixar danunciar-la,\nho sabeu prou, Senyor. R.",
    Lectura2: "1 Corintis 1,1-3",
    Lectura2Cita: "Us desitjo la gràcia i la pau de Déu, el nostre Pare,\ni de Jesucrist, el Senyor",
    Lectura2Titol: "Comença la primera carta de sant Pau als cristians de Corint",
    Lectura2Text: "Pau, que per voler de Déu ha estat cridat a ser apòstol de Jesucrist, i el seu germà Sòstenes, a la comunitat de Déu que és a Corint, als santificats en Jesucrist, cridats a ser-li consagrats, en unió amb tots els qui pertot arreu invoquen el nom de Jesucrist, el nostre Senyor i el dells.\nUs desitjo la gràcia i la pau de Déu, el nostre Pare, i de Jesucrist, el Senyor.",
    Alleluia: "Joan 1,14a.12a",
    AlleluiaText: "El qui és la Paraula es va fer home\ni plantà entre nosaltres el seu tabernacle.\nA tots els qui lhan rebut,\nels concedeix poder ser fills de Déu.",
    Evangeli: "Joan 1,29-34",
    EvangeliCita: "Mireu l’Anyell de Déu, que pren damunt seu el pecat del món",
    EvangeliTitol: "Lectura de l’evangeli segons sant Joan",
    EvangeliText: "En aquell temps, Joan veié que Jesús venia i digué: «Mireu lanyell de Déu, que pren damunt seu el pecat del món. És aquell de qui jo deia: Després de mi ve un home que mha passat davant, perquè, abans que jo, ell ja existia. Jo no sabia qui era, però vaig venir a batejar amb aigua perquè ell es manifestés a Israel». Després Joan testificà: «He vist que lEsperit baixava del cel com un colom i es posava damunt dell. Jo no sabia qui era, però el qui menvià a batejar amb aigua em digué: «Aquell sobre el qual veuràs que lEsperit baixa i es posa és el qui bateja amb lEsperit Sant». Jo ho he vist, i dono testimoniatge que aquest és el Fill de Déu»."
  }
}
import DBAdapter from '../../Adapters/DBAdapter';
import GF from "../../Globals/GlobalFunctions";
import SOUL from '../SOUL/SOUL';
import SettingsManager from './Classes/SettingsManager';

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

 export function Reload_All_Data(date){
   G_VALUES.date = date;
   Promise.all([
      SettingsManager.getSettingLloc((r) => {
         G_VALUES.lloc = r;
      }),
      SettingsManager.getSettingDiocesis((r) => {
         G_VALUES.diocesi = GF.transformDiocesiName(r, aux_lloc);
         G_VALUES.diocesiName = r;
      }),
      SettingsManager.getSettingUseLatin((r) => G_VALUES.llati = r),
      SettingsManager.getSettingTextSize((r) => G_VALUES.textSize = r),
      SettingsManager.getSettingNumSalmInv((r) => G_VALUES.numSalmInv = r),
      SettingsManager.getSettingNumAntMare((r) => G_VALUES.numAntMare = r),
   ]).then(() => {
      Refresh_Data(date);
   });


 }

 function Refresh_Data(newDay){
   DB_Access = new DBAdapter();
   DB_Access.getAnyLiturgic(
     newDay.getFullYear(),
     newDay.getMonth(),
     newDay.getDate(),
     (current, tomorrow, pentacosta) => {
       var celType = GF.getCelType(this.variables.diocesi, current);
       var tomorrowCelType = GF.getCelType(this.variables.diocesi, tomorrow);

       G_VALUES.celType = celType;
       G_VALUES.diaMogut = current.diaMogut;
       G_VALUES.diocesiMogut = current.diocesiMogut;
       G_VALUES.litColor = current.Color;

       G_VALUES.tempsespecific = current.tempsespecific;
       G_VALUES.LT = current.temps;
       G_VALUES.cicle = current.cicle; //1-4
       G_VALUES.setmana = current.NumSet; //Ordinari: 1-34, pasqua: 2-7 i quaresma: 1-5 o 2-7
       G_VALUES.ABC = current.anyABC;

       var dataTomorrow = {
         celType: tomorrowCelType,
         LT: tomorrow.temps,
         setmana: tomorrow.NumSet,
         diaMogut: tomorrow.diaMogut,
         diocesiMogut: tomorrow.diocesiMogut,
       }
       G_VALUES.dataTomorrow = dataTomorrow;

       checkLliureDate();

       var soul = new SOUL(this.variables, this.liturgicProps, this.dataTomorrow, pentacosta, this); //TODO: no this. CB de les funcions necessaries

       //TODO:

     }
   );
 }

 function checkLliureDate(){
   AsyncStorage.getItem("lliureDate").then((value) => {
       console.log("CLD-lliureDate",value);
       if(!value) AsyncStorage.setItem('lliureDate','none');
       if(value && value !== 'none'){
         dataArr = value.split(':');
         if(parseInt(dataArr[0])===this.variables.date.getDate() &&
             parseInt(dataArr[1])===this.variables.date.getMonth() &&
             parseInt(dataArr[2])===this.variables.date.getFullYear()){
               this.variables.lliures = true;
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

 function setSoul(liturgia){
   console.log("PlaceLog. HomeScreen - setSoul");

   this.liturgicProps.LITURGIA = liturgia;
   if(!this.testing){
     this.refEv = true;

     /*if(this.variables.celType === 'L' && this.variables.lliures === false){
       // this.liturgicProps.LITURGIA.info_cel.typeCel = 'L';
       // this.liturgicProps.LITURGIA.info_cel.nomCel = 'Titol Lliure';
       // this.liturgicProps.LITURGIA.info_cel.infoCel = 'Info Lliure';
     }*/

     this.setState({
       santPressed: false,
       ViewData: {
         ready: true,
         lloc: {
           diocesiName: this.variables.diocesiName,
           lloc: this.variables.lloc,
         },
         data: this.variables.date,
         setmana: this.liturgicProps.setmana,
         temps: this.liturgicProps.tempsespecific,
         setCicle: this.liturgicProps.cicle,
         anyABC: this.liturgicProps.ABC,
         color: this.variables.litColor,
         celebracio: {
           type: this.liturgicProps.LITURGIA.info_cel.typeCel,
           titol: this.liturgicProps.LITURGIA.info_cel.nomCel,
           text: this.liturgicProps.LITURGIA.info_cel.infoCel,
           titolCelTom: this.liturgicProps.LITURGIA.info_cel.nomCelTom,
         },
         primVespres: this.primVespres(),
       }
     });
     if(!this.evReady) {
       this.evReady = true;
       SplashScreen.hide();
       //TRACKING
       trackText = "lliures: "+this.variables.lliures+
             " | llati: "+this.variables.llati+
             " | midaText: "+this.variables.textSize+
             " | diocesi: "+this.variables.diocesiName+
             " | lloc: "+this.variables.lloc;
             // " | invitatori: "+this.variables.invitatori;
       this.props.screenProps.tracker.trackEvent("AppState", "SavingConf", {
         label: trackText
       });
       //TRACKING
       if(this.isLatePray()) {
         this.props.screenProps.tracker.trackEvent("Popup - Late prayer", "Opened");
         this.popupDialog.show();
       }
     }
   }
   /*************** TEST THINGS - START *******************/
   else{
     SplashScreen.hide();
    if(this.superTest) this.openOracions('Ofici');
    else{
      if(this.stateTest){
        this.setLiturgiaStateTest();
      }
      this.nextDayTest();
    }
   }
   /*************** TEST THINGS - END*******************/
 }
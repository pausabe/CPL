import React, { Component } from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
 } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from 'react-native-modal-datetime-picker';

import PopupDialog, {
  DialogTitle,
} from 'react-native-popup-dialog';
import HomeScreen from '../Views/HomeScreen/HomeScreen';
import DBAdapter from '../Adapters/DBAdapter';
import TA from '../Tests/testAdapter';
import SOUL from './Classes/SOUL/SOUL';
import SettingsManager from './Classes/SettingsManager';
import GLOBAL from "../Globals/Globals";
import GF from "../Globals/GlobalFunctions";
import LiturgiaDisplayScreen from '../Views/LiturgiaDisplayScreen/LiturgiaDisplayScreen';

export default class HomeScreenController extends Component {
  componentDidUpdate(){
    // console.log("Home updated");
    /*if(this.superTest){
      this.superTestOracioActual = GF.nextOracio(this.superTestOracioActual);
      if(this.superTestOracioActual !== 'end'){
        this.openOracions(this.variables.date, this.superTestOracioActual);
      }
      else{
        this.superTestOracioActual = 'Ofici';
      }
    }*/
  }

  componentDidMount() {
    if(Platform.OS==='android'){
      // setTimeout(() => { SplashScreen.hide(); }, 400);

      this.props.navigation.setParams({
            calPres: this.calendarPressed.bind(this),
            refreshFunction: this.refreshFunction.bind(this),
        });
    }
    else{
      // setTimeout(() => { SplashScreen.hide(); }, 50);

      this.props.events.addListener('myEvent', this.eventManager.bind(this));
      this.props.events.addListener('calendarPressed', this.calendarPressed.bind(this));
    }
  }

  static navigationOptions = ({ navigation }) => ({
      headerTitle: <View style={{paddingLeft: 100}}>
                      <Text style={{
                        textAlign: 'center',
                        color: GLOBAL.itemsBarColor,
                        fontSize: 20,
                        fontWeight: '600',
                      }}>CPL</Text>
                    </View>,
      headerStyle: {
        backgroundColor: GLOBAL.barColor,
      },
      headerLeft: <TouchableOpacity
                      style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}
                      onPress={ () => navigation.state.params.calPres() }>
                      <View style={{flex:1, paddingLeft: 10, alignItems: 'center', justifyContent:'center'}}>
                        <Icon
                          name="ios-calendar-outline"
                          size={30}
                          color="#FFFFFF"/>
                      </View>
                  </TouchableOpacity>,
      headerRight: <TouchableOpacity
                      style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}
                      onPress={() => navigation.navigate('Settings', { refresh: navigation.state.params.refreshFunction})}>
                      <View style={{flex:1, paddingRight: 10, alignItems: 'center', justifyContent:'center'}}>
                        <Icon
                          name="ios-settings-outline"
                          size={30}
                          color="#FFFFFF"/>
                      </View>
                  </TouchableOpacity>,
  });

  refreshFunction(){
    this.refreshEverything(this.variables.date);
  }

  calendarPressed(){
    this.calPres = true;
    this.setState({isDateTimePickerVisible: true})
  }

  constructor(props) {
    super(props)

    this.evReady = false;

    //this is just for android. You must change for ios in NavigatorController as well
    this.date = new Date(/*2018,0,1*/);

    this.minDatePicker = new Date(2017,0,2);
    this.maxDatePicker = new Date(2018,11,28);

    this.state = {
      testInfo: 'testing correctly',
      stateTestInfo: '',
      testInfoBegins: "Starts at: "+this.date,
      santPressed: false,
      isDateTimePickerVisible: false,

      ViewData: {
        ready: false,
        lloc: {
          diocesiName: '',
          lloc: '',
        },
        data: this.date,
        setmana: '',
        temps: '',
        setCicle: '',
        anyABC: '',
        color: '',
        celebracio: {
          typeText: '',
          titol: '',
          text: '',
        },
        primVespres: false,
        santPressed: false,
      }
    }

    /*************** TEST THINGS - START *******************/
    this.testing = false; //fer-ho amb iphone X sense console. Serveix per saber si els acdessos a bd stan bé. sobretot per quan hi ha canvis a la bd
    this.stateTest = this.testing && false; //guarda l'estat
    this.superTest = this.testing && false; //obre oracions. No estressar gens lordinador (pot influir). Tarda uns 40'/mes (8h/any) amb les 31 diocesis (o 20'/any amb 1 diocesi)
    if(this.stateTest){
      this.TA = new TA();
      this.stateArr = [];
      this.stateArrIndex=0;

      //Abans posava 500
      //Si poso -1 es farà un arxiu per cada diòcesi
      this.maxStateIndex=-1;//500;
    }
    this.renderTest = this.testing;
    this.initialDayTest = { //pot funcionar malament per culpa dels PASS DAYS
      day: 2, //1-31 (s'inclou en el test)
      month: 0, //0-11
      year: 2017,
    }
    this.finalDayTest = { //no pot ser el mateix qe l'initial
      day: 28, //1-31 (no s'inclou en el test)
      month: 0, //0-11
      year: 2018,
    }
    if(this.testing){
      var today = new Date(this.initialDayTest.year, this.initialDayTest.month, this.initialDayTest.day);
      this.initalDiocesiIndex = 1; //0-30 (s'inclou en el test)
      this.finalDiocesiIndex = 30; //0-30 (s'inclou en el test)
      this.diocesiTest = GF.nextDiocesi(this.initalDiocesiIndex);
      this.diocesiNameTest = GF.nextDiocesiName(this.initalDiocesiIndex);
      this.llocTest = GF.nextLloc(this.initalDiocesiIndex);
      this.idTest = this.initalDiocesiIndex;
      this.maxIdTest = this.finalDiocesiIndex;
      console.log("TestLog. -------------------------------->>>TEST BEGINS<<<--------------------------------");
      console.log("TestLog. --------------------------------:::"+this.idTest+" -> "+this.diocesiTest+":::--------------------------------");
      console.log("TestLog. -----------------------------------"+this.initialDayTest.day+"/"+this.initialDayTest.month+"/"+this.initialDayTest.year+" -> "+this.finalDayTest.day+"/"+this.finalDayTest.month+"/"+this.finalDayTest.year+"-----------------------------------");
    }
    /*************** TEST THINGS - END *******************/
    else{
      if(props.naviDate === undefined) var today = new Date();
      else var today = props.naviDate;
    }

    this.variables = {
      diocesi: '',
      diocesiName: '',
      lloc: '',
      invitatori: '',
      llati: '',
      gloria: 'false',
      lliures: '',
      textSize: '',
      cleanSalm: 'false',
      celType: '',
      mogut: '',
      litColor: '',
      date: today,
    }

    this.liturgicProps = {
      LITURGIA: null,
      tempsespecific: '',
      LT: '',
      cicle: '',
      setmana: '',
      ABC: '',
    }

    if(this.testing) this.variables.lliures = 'false';

    this.refreshing = false;
    this.litPres = false;
    this.refEv = false;
    this.setPres = false;
    this.santPress = 0;
    this.inLit = false;
    this.inSet = false;
    this.picAcc = false;
    this.calPres = false;

    var tomorrow = new Date(today.getFullYear(), today.getMonth());
    tomorrow.setDate(today.getDate() + 1);

    this.dataTomorrow = {
      date: tomorrow,
      celType: '',
      LT: '',
      setmana: '',
      mogut: '',
    }

    this.acceso = new DBAdapter();

    this.refreshEverything(today);
  }

  /*************** CREATING THE LITURGIA - START ***************/
  refreshEverything(date){
    console.log("PlaceLog. REFRESHING EVERYTHING: settings > anyliturgic > soul > render " + date);
    this.refreshing = true;
    Promise.all([
      SettingsManager.getSettingLloc((r) => {
        this.variables.lloc = r;
        SettingsManager.getSettingDiocesis((r) => {
          /*************** TEST THINGS - START *******************/
          if(this.testing){
            this.variables.diocesi = this.diocesiTest;
            this.variables.diocesiName = this.diocesiNameTest;
            this.variables.lloc = this.llocTest;
          }
          /*************** TEST THINGS - END *******************/
          else{
            this.variables.diocesi = GF.transformDiocesiName(r, this.variables.lloc);
            this.variables.diocesiName = r;
          }
          // console.log("this.variables.diocesi: "+this.variables.diocesi);
        })
      }),
      SettingsManager.getSettingInvitatori((r) => this.variables.invitatori = r),
      SettingsManager.getSettingUseLatin((r) => this.variables.llati = r),
      //SettingsManager.getSettingShowGlories((r) => this.variables.gloria = r),
      SettingsManager.getSettingPrayLliures((r) => {
        if(!this.testing)
          this.variables.lliures = r;
      }),
      SettingsManager.getSettingTextSize((r) => this.variables.textSize = r),
      //SettingsManager.getSettingShowGlories((r) => this.variables.cleanSalm = r),
    ]).then(results => {
      this.refreshDate(date);
    });
  }

  refreshDate(newDay){
    this.acceso.getAnyLiturgic(
      newDay.getFullYear(),
      newDay.getMonth(),
      newDay.getDate(),
      (current, tomorrow, pentacosta) => {
        var celType = GF.getCelType(this.variables.diocesi, current);
        var tomorrowCelType = GF.getCelType(this.variables.diocesi, tomorrow);
        // console.log("celType TODAY: " + celType + " | celTypeTomorrow: " + tomorrowCelType);

        this.variables.celType = celType;
        this.variables.date = newDay;
        this.variables.diaMogut = current.diaMogut;
        this.variables.diocesiMogut = current.diocesiMogut;
        this.variables.litColor = current.Color;

        this.liturgicProps.LITURGIA = null;

        this.liturgicProps.tempsespecific = current.tempsespecific;
        this.liturgicProps.LT = current.temps;
        this.liturgicProps.cicle = current.cicle; //1-4
        this.liturgicProps.setmana = current.NumSet; //Ordinari: 1-34, pasqua: 2-7 i quaresma: 1-5 o 2-7
        this.liturgicProps.ABC = current.anyABC;

        this.dataTomorrow.celType = tomorrowCelType;
        this.dataTomorrow.LT = tomorrow.temps;
        this.dataTomorrow.setmana = tomorrow.NumSet;
        this.dataTomorrow.diaMogut = tomorrow.diaMogut;
        this.dataTomorrow.diocesiMogut = tomorrow.diocesiMogut;

        if(this.SOUL === undefined)
          this.SOUL = new SOUL(this.variables, this.liturgicProps, this.dataTomorrow, pentacosta, this);
        else
          this.SOUL.makeQueryies(this.variables, this.liturgicProps, this.dataTomorrow, pentacosta, this);
      }
    );
  }

  setSoul(liturgia){
    console.log("PlaceLog. HomeScreen - setSoul");

    this.liturgicProps.LITURGIA = liturgia;
    if(!this.testing){
      this.refEv = true;

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
          },
          primVespres: this.primVespres(),
        }
      });
      if(!this.evReady) {
        this.evReady = true;
        SplashScreen.hide();
        if(this.isLatePray()) this.popupDialog.show();
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

  isLatePray(){
    var today = new Date();
    var h = today.getHours();
    if(this.evReady && h >= 0 && h < 3){
      return true;
    }
    return false;
  }

  primVespres(){
    if((this.variables.date.getDay() === 6 && this.variables.celType !== 'S') ||
        this.liturgicProps.LITURGIA.vespres1) return true;
    return false;
  }
 /*************** CREATING THE LITURGIA - END ***************/

 /*************** TEST THINGS - START *******************/
 nextDayTest(){
   if(this.testing){
     console.log("PlaceLog. NEXT DAY");
     if(this.variables.celType === 'L' && this.variables.lliures === 'false'){
       //Tornem a passar el dia però amb lliures activades
       console.log("TestLog. -----------REPTERIR per mem lliure---------"+this.idTest+" -> "+this.diocesiTest+": "+this.variables.date+"-----------------------------");
       this.variables.lliures = 'true';
       this.refreshEverything(this.variables.date);
       this.setState({testInfo: "Testing correctly *"});
     }
     else{
       this.variables.lliures = 'false';

       var nextDay = this.variables.date;
       nextDay.setDate(nextDay.getDate()+1);
       if(nextDay.getFullYear() === this.finalDayTest.year &&
         nextDay.getMonth() === this.finalDayTest.month &&
         nextDay.getDate() === this.finalDayTest.day){
         if(this.idTest === this.maxIdTest){
           if(this.stateTest) {
             setTimeout(() => {
               this.TA.writeState(this.stateArr,this.initialDayTest,this.finalDayTest,this.initalDiocesiIndex,this.finalDiocesiIndex,this.saveStateCB.bind(this),true);
             }, 1000);
           }
           var rightNow = new Date();
           this.setState({testInfo: "Test ended correctly at: "+rightNow});
           console.log("TestLog. -------------------------------->>>TEST ENDS<<<--------------------------------");
         }
         else{
           if(this.maxStateIndex===-1)this.writePart();
           firstDay = new Date(this.initialDayTest.year,this.initialDayTest.month,this.initialDayTest.day);
           this.idTest += 1;
           this.diocesiTest = GF.nextDiocesi(this.idTest);
           this.diocesiNameTest = GF.nextDiocesiName(this.idTest);
           this.llocTest = GF.nextLloc(this.idTest);
           auxTomorrow = new Date();
           auxTomorrow.setFullYear(this.initialDayTest.year);
           auxTomorrow.setMonth(this.initialDayTest.month);
           auxTomorrow.setDate(this.initialDayTest.day+1);
           this.dataTomorrow.date = auxTomorrow;
           this.refreshEverything(firstDay);
           this.setState({testInfo: "Testing correctly"});
           console.log("TestLog. --------------------------------:::NEXT DIÒCESI: "+this.idTest+" -> "+this.diocesiTest+" - "+firstDay+":::--------------------------------");
         }
       }
       else{
         dtDay = this.dataTomorrow.date.getDate();
         dtMonth = this.dataTomorrow.date.getMonth();
         dtYear = this.dataTomorrow.date.getFullYear();
         auxTomorrow = new Date(dtYear,dtMonth,dtDay);
         auxTomorrow.setDate(auxTomorrow.getDate()+1);
         this.dataTomorrow.date = auxTomorrow;
         while(GF.passDayTest(this.diocesiNameTest, nextDay)){
           console.log("TestLog. -----------------------------------"+this.idTest+" -> "+this.diocesiTest+" - PASS DAY: "+nextDay+"-----------------------------------");
           nextDay.setDate(nextDay.getDate()+1);
           auxTomorrow = this.dataTomorrow.date;
           auxTomorrow.setDate(auxTomorrow.getDate()+1);
           this.dataTomorrow.date = auxTomorrow;
         }
         console.log("TestLog. -----------------------------------"+this.idTest+" -> "+this.diocesiTest+" - NEXT DAY: "+nextDay+"-----------------------------------");
         this.refreshEverything(nextDay);
         this.setState({testInfo: "Testing correctly"});
       }
     }
   }
 }

 setLiturgiaStateTest(){
   var auxLIT = Object.assign({}, this.liturgicProps.LITURGIA);
   stateDayStructure = {
     date: {
       day: this.variables.date.getDate(),
       month: (this.variables.date.getMonth()+1),
       year: this.variables.date.getFullYear(),
     },
     diocesi: this.variables.diocesi,
     LIT: auxLIT,
   }
   this.stateArr[this.stateArrIndex] = stateDayStructure;
   this.stateArrIndex += 1;

   if(this.stateArrIndex===this.maxStateIndex) this.writePart();
 }

 writePart(){
   var auxArr = Object.assign({}, this.stateArr)
   setTimeout(() => {
     this.TA.writeState(auxArr,this.initialDayTest,this.finalDayTest,this.initalDiocesiIndex,this.finalDiocesiIndex,this.saveStateCB.bind(this),false);
   }, 1000);
   this.stateArr = [];
   this.stateArrIndex=0;
 }

 saveStateCB(text){
   this.setState({stateTestInfo:text});
 }

 error(){
    this.setState({testInfo: "something went wrong (bad calls)"});
    console.log("InfoLog. super error (bad calls)");
    this.testing = false;
  }

  testErrorCallBack(){
    this.setState({testInfo: "something went wrong (bad text)"});
    console.log("InfoLog. super error (bad text))");
    this.testing = false;
  }

 openOracions(oracioType){
   this.LHButtonCB(oracioType, true);
 }

 /*************** TEST THINGS - END *******************/

  shouldComponentUpdate(){
    if(Platform.OS === 'ios'){
      /*************** TEST THINGS - START *******************/
      if(this.testing){
        return true;
      }
      /*************** TEST THINGS - END *******************/
      else if(this.litPres){
        console.log("ShouldLog. NO, estic anant a Liturgia");
        this.inLit = true;
        this.litPres = false;
        return false;
      }
      else if(this.refEv){
        console.log("ShouldLog. YES, després de refreshEverything");
        this.refEv = false;
        return true;
      }
      else if(this.setPres){
        console.log("ShouldLog. NO, estic anant a Settings");
        this.inSet = true;
        this.setPres = false;
        return false;
      }
      else if(this.santPress === 1){
        console.log("ShouldLog. YES, estic obrint Sant");
        return true;
      }
      else if(this.santPress === 2){
        console.log("ShouldLog. YES, estic tancant Sant");
        this.santPress = 0;
        return true;
      }
      else if(this.inLit){
        console.log("ShouldLog. YES, estic tornant de Liturgia");
        this.inLit = false;
        return true;
      }
      else if(this.inSet){
        console.log("ShouldLog. NO, estic tornant de Settings");
        this.inSet = false;
        this.refreshEverything(this.variables.date);
        return false;
      }
      else if(this.calPres){
        console.log("ShouldLog. YES, obrint Picker");
        this.calPres = false;
        return true;
      }
      else{
        console.log("ShouldLog. YES, coses del Picker");
        return true;
      }
    }
    else{
      return true;
    }
  }

  eventManager(args){
    switch (args.type) {
      case 'settingsPressed':
        // console.log("settingsPressed");
        this.setPres = true;
      break;
      case 'pickerPressed':
        // console.log("pickerPressed");
        //this.setState({ asdf: null}); //just for go to should
        this.picPres = true;
      break;
      case 'okPicker':
        // console.log("pickerAccept: " + args.newDate);
        this.picAcc = true;
        if(args.newDate !== this.variables.date){
          var tomorrow = new Date();
          tomorrow.setFullYear(args.newDate.getFullYear());
          tomorrow.setMonth(args.newDate.getMonth());
          tomorrow.setDate(args.newDate.getDate() + 1);
          this.dataTomorrow.date = tomorrow;
          // console.log("this.dataTomorrow.date " + this.dataTomorrow.date);
          this.refreshEverything(args.newDate);
        }
      break;
    }
  }


  liturgiaPressed(){
    // console.log("liturgiaPressed");
    this.litPres = true;
  }

  datePickerOK(newDate){
    this.date = newDate;
    this.setState({isDateTimePickerVisible: false});
    // console.log("pickerAccept: " + newDate);
    if(newDate !== this.variables.date){
      this.showThisDate(newDate)
    }
  }

  showThisDate(date){
    var tomorrow = new Date();
    tomorrow.setFullYear(date.getFullYear());
    tomorrow.setMonth(date.getMonth());
    tomorrow.setDate(date.getDate() + 1);
    this.dataTomorrow.date = tomorrow;
    this.refreshEverything(date);
  }

  datePickerCANCEL(){
    this.setState({isDateTimePickerVisible: false});
  }


  onSantPressCB(){
    if(this.liturgicProps.LITURGIA && this.liturgicProps.LITURGIA.info_cel.infoCel !== '-'){
      if(this.santPress === 0) this.santPress = 1;
      else if(this.santPress === 1) this.santPress = 2;
      this.setState({santPressed: !this.state.santPressed});
    }
  }

  onYestPress(yesterday){
    this.showThisDate(yesterday);
    this.popupDialog.dismiss();
  }

  jumpDisplay(type, superTestMode, title){
    this.props.navigator.push({
      title: title,
      passProps: {
        superTestMode: superTestMode,
        testErrorCallBack: this.testErrorCallBack.bind(this),
        nextDayTestCB: this.nextDayTest.bind(this),
        type: type,
        date: this.date,
        variables: this.variables,
        liturgicProps: this.liturgicProps,
      },
      component: LiturgiaDisplayScreen
    });
  }

  LHButtonCB(type, superTestMode){
    var title = type;
    if(type === 'Ofici') title = 'Ofici de lectura';
    this.liturgiaPressed();
    if(this.liturgicProps.LITURGIA !== null){
      if(Platform.OS === 'ios'){
        if(superTestMode){
          setTimeout(() => {
            this.jumpDisplay(type, superTestMode, title);
          }, 1000);
        }
        else{
          this.jumpDisplay(type, superTestMode, title);
        }
      }
      else{
        var params = {
          title: title,
          props: {
            superTestMode: superTestMode,
            testErrorCallBack: this.testErrorCallBack.bind(this),
            nextDayTestCB: this.nextDayTest.bind(this),
            type: type,
            variables: this.variables,
            date: this.date,
            liturgicProps: this.liturgicProps,
          },
        }
        this.props.navigation.navigate('LiturgiaDisplay', params);
      }
    }
  }

  dacordString(){
    return "D'acord";
  }

  render(){
    if(!this.renderTest){
      var yesterday = new Date(this.date.getFullYear(),this.date.getMonth());
      yesterday.setDate(this.date.getDate()-1);
      return(
        <View style={{flex: 1}}>
          <HomeScreen
            ViewData={this.state.ViewData}
            santPressed={this.state.santPressed}
            santCB={this.onSantPressCB.bind(this)}
            oficiCB={this.LHButtonCB.bind(this, "Ofici",false)}
            laudesCB={this.LHButtonCB.bind(this, "Laudes",false)}
            terciaCB={this.LHButtonCB.bind(this, "Tèrcia",false)}
            sextaCB={this.LHButtonCB.bind(this, "Sexta",false)}
            nonaCB={this.LHButtonCB.bind(this, "Nona",false)}
            vespresCB={this.LHButtonCB.bind(this, "Vespres",false)}
            completesCB={this.LHButtonCB.bind(this, "Completes",false)}/>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            titleIOS={'Canvia el dia'}
            cancelTextIOS={'Cancel·la'}
            confirmTextIOS={this.dacordString()}
            date={this.date}
            minimumDate={this.minDatePicker}
            maximumDate={this.maxDatePicker}
            onConfirm={this.datePickerOK.bind(this)}
            onCancel={this.datePickerCANCEL.bind(this)}/>
          <PopupDialog
            ref={(popupDialog) => { this.popupDialog = popupDialog}}
            width={0.9}
            height={250}
            dialogStyle={{backgroundColor: 'white'}}
            dialogTitle={<DialogTitle titleTextStyle={{fontSize: 19, color: 'black'}} title="És més tard de les 12 de la nit!" />} >
            <View style={{flex:1,paddingHorizontal:10,justifyContent: 'center'}}>
              <Text style={{color: 'grey', fontSize: 18,textAlign: 'center',}}>{"Ja estem a dia "+this.date.getDate()+" de "+GF.getMonthText(this.date.getMonth())+"."}</Text>
              <Text style={{color: 'grey', fontSize: 18,textAlign: 'center',}}>{"Vols la litúrgia d’ahir dia "+yesterday.getDate()+" de "+GF.getMonthText(yesterday.getMonth())+"?"}</Text>
            </View>
            <View style={{justifyContent: 'flex-end', borderRadius: 15, paddingHorizontal: 10, paddingBottom:10, flexDirection: 'row', backgroundColor: 'white'}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <TouchableOpacity onPress={this.onYestPress.bind(this, yesterday)}>
                  <Text style={{color: 'rgb(14, 122, 254)', fontSize: 17,fontWeight: '600',textAlign: 'center',}}>{"Sí, la d'ahir dia"}</Text>
                  <Text style={{color: 'rgb(14, 122, 254)', fontSize: 17,fontWeight: '600',textAlign: 'center',}}>{yesterday.getDate()+"/"+(yesterday.getMonth()+1)+"/"+yesterday.getFullYear()}</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <TouchableOpacity onPress={() => this.popupDialog.dismiss()}>
                  <Text style={{color: 'rgb(14, 122, 254)', fontSize: 17,textAlign: 'center',}}>{"No, la d'avui dia"}</Text>
                  <Text style={{color: 'rgb(14, 122, 254)', fontSize: 17,textAlign: 'center',}}>{this.date.getDate()+"/"+(this.date.getMonth()+1)+"/"+this.date.getFullYear()}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </PopupDialog>
        </View>
      );
    }
    /*************** TEST THINGS - START *******************/
    else{
      return(
        <View >
          <Text>{"\n\n\n\n\n\n"}</Text>
          <Text>{this.state.testInfoBegins}</Text>
          <Text>{this.state.testInfo}</Text>
          <Text>{this.idTest}</Text>
          <Text>{this.diocesiTest}</Text>
          <Text>{this.variables.date.getDate() < 10 ? `0${this.variables.date.getDate()}` : this.variables.date.getDate()}/{this.variables.date.getMonth()+1 < 10 ? `0${this.variables.date.getMonth()+1}` : this.variables.date.getMonth()+1}/{this.variables.date.getFullYear()}</Text>
          <Text>{this.state.stateTestInfo}</Text>
        </View>
      );
    }
    /*************** TEST THINGS - END *******************/
  }
}

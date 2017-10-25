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

import HomeScreen from '../Views/HomeScreen/HomeScreen';
import DBAdapter from '../Adapters/DBAdapter';
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
      setTimeout(() => { SplashScreen.hide(); }, 400);

      this.props.navigation.setParams({
            calPres: this.calendarPressed.bind(this),
            refreshFunction: this.refreshFunction.bind(this),
        });
    }
    else{
      setTimeout(() => { SplashScreen.hide(); }, 50);

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

    //this is just for android. You must change for ios in NavigatorController as well
    this.date = new Date(/*2018,4,19*/);

    this.minDatePicker = new Date(2017,0,2);
    this.maxDatePicker = new Date(2018,11,28);

    this.state = {
      testInfo: 'testing correctly',
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
    this.testing = false; //fer-ho amb iphone X sense console i memories lliures actives
    this.superTest = this.testing && false; //obre oracions. No estressar gens lordinador (pot influir). Tarda uns 40'/mes (8h/any) amb les 31 diocesis
    this.renderTest = this.testing;
    // this.superTestOracioActual = 'Ofici';
    this.initialDayTest = { //pot funcionar malament per culpa dels PASS DAYS
      day: 25, //1-31 (s'inclou en el test)
      month: 9, //0-12
      year: 2017,
    }
    this.finalDayTest = {
      day: 25, //1-31 (s'inclou en el test)
      month: 10, //0-12
      year: 2017,
    }
    if(this.testing){
      var today = new Date(this.initialDayTest.year, this.initialDayTest.month, this.initialDayTest.day);
      var initalIndex = 26; //0-30 (s'inclou en el test)
      var finalIndex = 30; //0-30 (s'inclou en el test)
      this.diocesiTest = GF.nextDiocesi(initalIndex);
      this.diocesiNameTest = GF.nextDiocesiName(initalIndex);
      this.llocTest = GF.nextLloc(initalIndex);
      this.idTest = initalIndex;
      this.maxIdTest = finalIndex;
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
        /*************** TEST THINGS - START *******************/
        if(this.testing)
          this.variables.lliures = 'true';
        /*************** TEST THINGS - END *******************/
        else
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
        this.variables.mogut = current.Mogut;
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
        this.dataTomorrow.mogut = tomorrow.Mogut;

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
    }
    /*************** TEST THINGS - START *******************/
    else{
      // console.log("setting state test");
     if(this.superTest) this.openOracions('Ofici');
     else{
       this.nextDayTest();
     }
    }
    /*************** TEST THINGS - END*******************/
  }

  primVespres(){
    if((this.variables.date.getDay() === 6 && this.variables.celType !== 'S') ||
        this.liturgicProps.LITURGIA.vespres1) return true;
    return false;
  }
 /*************** CREATING THE LITURGIA - END ***************/

 /*************** TEST THINGS - START *******************/
 nextDayTest(){
   console.log("PlaceLog. NEXT DAY");
   var nextDay = this.variables.date;
   nextDay.setDate(nextDay.getDate()+1);
   /*console.log("TestLog. nextDay vs finalDayTest: " + nextDay.getFullYear() +
        "/" + nextDay.getMonth() + "/" + nextDay.getDate() + " - " +
        this.finalDayTest.year + "/" + this.finalDayTest.month + "/" +
        this.finalDayTest.day + "/");*/
   if(nextDay.getFullYear() === this.finalDayTest.year &&
     nextDay.getMonth() === this.finalDayTest.month &&
     nextDay.getDate() === this.finalDayTest.day){
     if(this.idTest === this.maxIdTest){
       this.setState({testInfo: "Test ended correctly"});
       console.log("TestLog. -------------------------------->>>TEST ENDS<<<--------------------------------");
     }
     else{
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
    //  console.log("dtDay: " + dtDay);
    //  console.log("dtMonth: " + dtMonth);
    //  console.log("dtYear: " + dtYear);
     auxTomorrow = new Date(dtYear,dtMonth,dtDay);
    //  console.log("auxTomorrow NO SET: " + auxTomorrow);
     auxTomorrow.setDate(auxTomorrow.getDate()+1);
    //  console.log("auxTomorrow SET: " + auxTomorrow);
     this.dataTomorrow.date = auxTomorrow;
    //  console.log("this.dataTomorrow.date SET: " + this.dataTomorrow.date);
     /*console.log("DAYDAYDAY: " + this.dataTomorrow.date + '\n' + auxTomorrow);
     auxTomorrow.setFullYear(this.dataTomorrow.date.getFullYear());
     var numMonth = this.dataTomorrow.date.getMonth();
     auxTomorrow.setMonth(numMonth);
     console.log("dont unertand: " + this.dataTomorrow.date.getMonth() + ' / ' + auxTomorrow.getMonth());
     aha = new Date(2017, 1, 1);
     console.log("vamo a vers1: " + aha);
     aha.setDate(aha.getDate()+1);
     console.log("vamo a vers2: " + aha);
     auxTomorrow.setDate(this.dataTomorrow.date.getDate()+1);
     this.dataTomorrow.date = auxTomorrow;
     console.log("auxTomorrow: " + auxTomorrow);
     console.log("this.dataTomorrow.date TEST: " + this.dataTomorrow.date);*/
    //  console.log("pass: " + GF.passDayTest(this.diocesiNameTest, nextDay));
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

 error(){
    this.setState({testInfo: "something went wrong"});
    console.log("InfoLog. super error");
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
      var tomorrow = new Date();
      tomorrow.setFullYear(newDate.getFullYear());
      tomorrow.setMonth(newDate.getMonth());
      tomorrow.setDate(newDate.getDate() + 1);
      this.dataTomorrow.date = tomorrow;
      // console.log("this.dataTomorrow.date " + this.dataTomorrow.date);
      this.refreshEverything(newDate);
    }
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

  jumpDisplay(type, superTestMode, title){
    this.props.navigator.push({
      title: title,
      passProps: {
        superTestMode: superTestMode,
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
        </View>
      );
    }
    /*************** TEST THINGS - START *******************/
    else{
      return(
        <View >
          <Text>{"\n\n\n\n\n\n"}</Text>
          <Text>{this.state.testInfo}</Text>
          <Text>{this.idTest}</Text>
          <Text>{this.diocesiTest}</Text>
          <Text>{this.variables.date.getDate() < 10 ? `0${this.variables.date.getDate()}` : this.variables.date.getDate()}/{this.variables.date.getMonth()+1 < 10 ? `0${this.variables.date.getMonth()+1}` : this.variables.date.getMonth()+1}/{this.variables.date.getFullYear()}</Text>
        </View>
      );
    }
    /*************** TEST THINGS - END *******************/
  }
}

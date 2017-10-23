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
import TEST from "../Tests/Test";
import LiturgiaDisplayScreen from '../Views/LiturgiaDisplayScreen/LiturgiaDisplayScreen';

export default class HomeScreenController extends Component {
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
    this.date = new Date(/*2017,7,7*/);

    this.minDatePicker = new Date(2017,0,2);
    this.maxDatePicker = new Date(2017,11,28);

    this.state = {
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

    this.testing = TEST.testState; //false; //fer-ho amb iphone 8 sense console i memories lliures actives

    if(props.naviDate === undefined) var today = new Date();
    else var today = props.naviDate;

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


  refreshEverything(date){
    console.log("REFRESHING EVERYTHING: settings > anyliturgic > soul > render " + date);
    this.refreshing = true;
    Promise.all([
      SettingsManager.getSettingLloc((r) => {
        this.variables.lloc = r;
        SettingsManager.getSettingDiocesis((r) => {
          if(this.testing){
            this.variables.diocesi = this.diocesiTest;
            this.variables.diocesiName = this.diocesiNameTest;
            this.variables.lloc = this.llocTest;
          }
          else{
            this.variables.diocesi = GF.transformDiocesiName(r, this.variables.lloc);
            this.variables.diocesiName = r;
          }
          console.log("this.variables.diocesi: "+this.variables.diocesi);
        })
      }),
      SettingsManager.getSettingInvitatori((r) => this.variables.invitatori = r),
      SettingsManager.getSettingUseLatin((r) => this.variables.llati = r),
      //SettingsManager.getSettingShowGlories((r) => this.variables.gloria = r),
      SettingsManager.getSettingPrayLliures((r) => {
        if(this.testing)
          this.variables.lliures = 'true';
        else
        this.variables.lliures = r;
      }),
      SettingsManager.getSettingTextSize((r) => this.variables.textSize = r),
      //SettingsManager.getSettingShowGlories((r) => this.variables.cleanSalm = r),
    ]).then(results => {
      this.refreshDate(date);
    });
  }

  shouldComponentUpdate(){
    if(Platform.OS === 'ios'){
      if(this.testing){
        return true;
      }
      else if(this.litPres){
        console.log("Should. NO, estic anant a Liturgia");
        this.inLit = true;
        this.litPres = false;
        return false;
      }
      else if(this.refEv){
        console.log("Should. YES, després de refreshEverything");
        this.refEv = false;
        return true;
      }
      else if(this.setPres){
        console.log("Should. NO, estic anant a Settings");
        this.inSet = true;
        this.setPres = false;
        return false;
      }
      else if(this.santPress === 1){
        console.log("Should. YES, estic obrint Sant");
        return true;
      }
      else if(this.santPress === 2){
        console.log("Should. YES, estic tancant Sant");
        this.santPress = 0;
        return true;
      }
      else if(this.inLit){
        console.log("Should. YES, estic tornant de Liturgia");
        this.inLit = false;
        return true;
      }
      else if(this.inSet){
        console.log("Should. NO, estic tornant de Settings");
        this.inSet = false;
        this.refreshEverything(this.variables.date);
        return false;
      }
      else if(this.calPres){
        console.log("Should. YES, obrint Picker");
        this.calPres = false;
        return true;
      }
      else{
        console.log("Should. YES, coses del Picker");
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
        console.log("settingsPressed");
        this.setPres = true;
      break;
      case 'pickerPressed':
        console.log("pickerPressed");
        //this.setState({ asdf: null}); //just for go to should
        this.picPres = true;
      break;
      case 'okPicker':
        console.log("pickerAccept: " + args.newDate);
        this.picAcc = true;
        if(args.newDate !== this.variables.date){
          var tomorrow = new Date();
          tomorrow.setFullYear(args.newDate.getFullYear());
          tomorrow.setMonth(args.newDate.getMonth());
          tomorrow.setDate(args.newDate.getDate() + 1);
          this.dataTomorrow.date = tomorrow;
          console.log("this.dataTomorrow.date " + this.dataTomorrow.date);
          this.refreshEverything(args.newDate);
        }
      break;
    }
  }


  liturgiaPressed(){
    console.log("liturgiaPressed");
    this.litPres = true;
  }

  refreshDate(newDay){
    this.acceso.getAnyLiturgic(
      newDay.getFullYear(),
      newDay.getMonth(),
      newDay.getDate(),
      (current, tomorrow, pentacosta) => {
        var celType = GF.getCelType(this.variables.diocesi, current);
        var tomorrowCelType = GF.getCelType(this.variables.diocesi, tomorrow);
        console.log("celType TODAY: " + celType + " | celTypeTomorrow: " + tomorrowCelType);

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
    console.log("HomeScreen - setSoul");

    this.liturgicProps.LITURGIA = liturgia;
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

  primVespres(){
    if((this.variables.date.getDay() === 6 && this.variables.celType !== 'S') ||
        this.liturgicProps.LITURGIA.vespres1) return true;
    return false;
  }

  passDayTest(day){
    if((this.diocesiNameTest==='Solsona' || this.diocesiNameTest==='Urgell' || this.diocesiNameTest==='Tortosa') && (day.getDate()===28 || day.getDate()===29) && day.getMonth()===4 && day.getFullYear()===2017)
      return true;
    return false;
  }

  datePickerOK(newDate){
    this.date = newDate;
    this.setState({isDateTimePickerVisible: false});
    console.log("pickerAccept: " + newDate);
    if(newDate !== this.variables.date){
      var tomorrow = new Date();
      tomorrow.setFullYear(newDate.getFullYear());
      tomorrow.setMonth(newDate.getMonth());
      tomorrow.setDate(newDate.getDate() + 1);
      this.dataTomorrow.date = tomorrow;
      console.log("this.dataTomorrow.date " + this.dataTomorrow.date);
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

  LHButtonCB(type){
    var title = type;
    if(type === 'Ofici') title = 'Ofici de lectura';
    this.liturgiaPressed();
    if(this.liturgicProps.LITURGIA !== null){
      if(Platform.OS === 'ios'){
        this.props.navigator.push({
          title: title,
          passProps: {
            type: type,
            date: this.date,
            variables: this.variables,
            liturgicProps: this.liturgicProps,
          },
          component: LiturgiaDisplayScreen
        });
      }
      else{
        var params = {
          title: title,
          props: {
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
    return(
      <View style={{flex: 1}}>
        <HomeScreen
          ViewData={this.state.ViewData}
          santPressed={this.state.santPressed}
          santCB={this.onSantPressCB.bind(this)}
          oficiCB={this.LHButtonCB.bind(this, "Ofici")}
          laudesCB={this.LHButtonCB.bind(this, "Laudes")}
          terciaCB={this.LHButtonCB.bind(this, "Tèrcia")}
          sextaCB={this.LHButtonCB.bind(this, "Sexta")}
          nonaCB={this.LHButtonCB.bind(this, "Nona")}
          vespresCB={this.LHButtonCB.bind(this, "Vespres")}
          completesCB={this.LHButtonCB.bind(this, "Completes")}/>
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
    )
  }
}

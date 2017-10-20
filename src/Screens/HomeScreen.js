import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  BackAndroid,
  ScrollView,
  TouchableOpacity,
 } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import Liturgia from '../LitugiaHores/Liturgia';
import Icon from 'react-native-vector-icons/Ionicons';
import DBAdapter from '../Adapters/DBAdapter';
import SOUL from '../LitugiaHores/SOUL';
import SettingsManager from '../Settings/SettingsManager';
import GLOBAL from "../Globals/Globals";
import TEST from "../Test/TestAdapter";
import EventEmitter from 'EventEmitter';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { NavigationActions } from 'react-navigation';

function paddingBar(){
  if(Platform.OS === 'ios'){
    return 64;
  }
  return 0;//54;
}

export default class HomeScreen extends Component {
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

  /*componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.backHandler.bind(this));
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.backHandler.bind(this));
    //this.eventEmitter = new EventEmitter();
  }*/

  /*backHandler(){
    console.log("Android back: " + this.props.navigator.getCurrentRoutes().length);
    if(this.props.navigator.getCurrentRoutes().length>1){
      this.props.navigator.pop();
      return true;
    }
    return false;
  }*/

  constructor(props) {
    super(props)

    //this is just for android. You must change for ios in NavigatorController as well
    this.date = new Date(/*2017,7,7*/);
    // this.auxDate = this.date;
    this.minimumDate = new Date(2017,0,2);
    this.maximumDate = new Date(2017,11,28);

    this.state = {
      santPressed: false,
      testInfo: 'testing correctly',
      isDateTimePickerVisible: false,
    }

    this.arrows = false;

    this.testing = TEST.testState; //false; //fer-ho amb iphone 8 sense console i memories lliures actives
    this.renderTest = this.testing;
    console.log("here1");
    if(this.testing){
      console.log("here2");
    }
    else{
      console.log("Que pasa neng ------------------->>: "+props.naviDate);
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
    //this.picPres = true;

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

    //this.refresh = false;
    this.refreshEverything(today);
  }

  error(){
    this.setState({testInfo: "something went wrong"});
    this.testing = false;
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
            this.variables.diocesi = this.transformDiocesiName(r, this.variables.lloc);
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
        var celType = this.getCelType(this.variables.diocesi, current);
        var tomorrowCelType = this.getCelType(this.variables.diocesi, tomorrow);
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
    //this.refreshing = false;
    if(!this.testing){
      this.liturgicProps.LITURGIA = liturgia;
      //this.iWantRender = false;
      this.refEv = true;
      this.setState({santPressed: false});
      //this.forceUpdate();
    }
    else{
      // TEST.testThisDay();
    }
  }

  passDayTest(day){
    if((this.diocesiNameTest==='Solsona' || this.diocesiNameTest==='Urgell' || this.diocesiNameTest==='Tortosa') && (day.getDate()===28 || day.getDate()===29) && day.getMonth()===4 && day.getFullYear()===2017)
      return true;
    /*if(day.getDate()===23 && day.getMonth()===8 && day.getFullYear()===2017)
      return true;
    if(this.diocesiTest === 'LlV' && day.getDate()===2 && day.getMonth()===9 && day.getFullYear()===2017)
      return true;
    if(this.diocesiTest === 'LlV' && day.getDate()===1 && day.getMonth()===9 && day.getFullYear()===2017)
      return true;
    if((this.diocesiTest === 'SFD' || this.diocesiTest === 'SFV' || this.diocesiTest === 'SFC') && day.getDate()===23 && day.getMonth()===8 && day.getFullYear()===2017)
      return true;
    if((this.diocesiTest === 'SoD' || this.diocesiTest === 'SoV' || this.diocesiTest === 'SoC') && day.getDate()===14 && day.getMonth()===10 && day.getFullYear()===2017)
      return true;
    if((this.diocesiTest === 'ToD' || this.diocesiTest === 'ToV' || this.diocesiTest === 'ToC') && day.getDate()===31 && day.getMonth()===7 && day.getFullYear()===2017)
      return true;
    if((this.diocesiTest === 'ToD' || this.diocesiTest === 'ToV' || this.diocesiTest === 'ToC') && day.getDate()===1 && day.getMonth()===8 && day.getFullYear()===2017)
      return true;*/
    return false;
  }

  onMinusPress(){
    var newDay = new Date();
    newDay.setDate(this.variables.date.getDate());
    newDay.setMonth(this.variables.date.getMonth());
    newDay.setFullYear(this.variables.date.getFullYear());
    newDay.setDate(this.variables.date.getDate()-1);

    auxTomorrow = this.dataTomorrow.date;
    auxTomorrow.setDate(auxTomorrow.getDate()-1);
    this.dataTomorrow.date = auxTomorrow;

    this.refreshDate(newDay, this.variables.diocesi, this.variables.liturgia);
  }

  onPlusPress(){
    var newDay = new Date();
    newDay.setDate(this.variables.date.getDate());
    newDay.setMonth(this.variables.date.getMonth());
    newDay.setFullYear(this.variables.date.getFullYear());
    newDay.setDate(this.variables.date.getDate()+1);

    auxTomorrow = this.dataTomorrow.date;
    auxTomorrow.setDate(auxTomorrow.getDate()+1);
    this.dataTomorrow.date = auxTomorrow;

    this.refreshDate(newDay, this.variables.diocesi, this.variables.liturgia);
  }

  render() {
    console.log("RENDER!!!");

    if(!this.renderTest){
      auxPadding = 5;
      return (
        <View style={styles.container}>
         <Image source={require('../img/bg/currentbg.jpg')} style={styles.backgroundImage}>
           <View style={styles.infoContainer}>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center',}}>
                {this.arrows ?
                  <View>
                    <TouchableOpacity style={styles.buttonSantContainer} onPress={this.onMinusPress.bind(this)}>
                       <Text>{"<<<     "}</Text>
                    </TouchableOpacity>
                  </View> : null}
                <View>
                  <Text style={styles.infoText}>{this.variables.diocesiName}{" ("}{this.variables.lloc}{")"}
                    {" - "}<Text style={styles.infoText}>{this.variables.date.getDate() < 10 ? `0${this.variables.date.getDate()}` : this.variables.date.getDate()}/{this.variables.date.getMonth()+1 < 10 ? `0${this.variables.date.getMonth()+1}` : this.variables.date.getMonth()+1}/{this.variables.date.getFullYear()}</Text>
                  </Text>
                </View>
                {this.arrows ?
                  <View>
                    <TouchableOpacity style={styles.buttonSantContainer} onPress={this.onPlusPress.bind(this)}>
                       <Text>{"     >>>"}</Text>
                    </TouchableOpacity>
                  </View> : null}
              </View>
           </View>
           <View style={styles.diaLiturgicContainer}>
             <Text style={styles.diaLiturgicText}>{this.weekDayName(this.variables.date.getDay())}{this.liturgicProps.setmana !== '0' ? " de la setmana " : null}
               {this.liturgicProps.setmana !== '0' ? this.liturgicPaint(this.romanize(this.liturgicProps.setmana), this.variables.litColor) : null }</Text>
             <Text style={styles.diaLiturgicText}>{"Temps - "}{this.liturgicPaint(this.tempsName(this.liturgicProps.tempsespecific), this.variables.litColor)}</Text>
             <Text style={styles.diaLiturgicText}>{"Setmana "}{this.liturgicPaint(this.romanize(this.liturgicProps.cicle), this.variables.litColor)}
              {" del cicle litúrgic, any "}{this.liturgicPaint(this.liturgicProps.ABC, this.variables.litColor)}</Text>
           </View>
           {this.liturgicProps.LITURGIA !== null && this.liturgicProps.LITURGIA.info_cel.nomCel !== '-' ?
           <View style={{paddingBottom: 5}}>
             {this.transfromCelTypeName(this.liturgicProps.LITURGIA.info_cel.typeCel, this.liturgicProps.tempsespecific)}
           </View>
           : null}
           {this.liturgicProps.LITURGIA !== null && this.liturgicProps.LITURGIA.info_cel.nomCel !== '-' ?
             <View style={styles.santContainer}>
               <TouchableOpacity activeOpacity={1.0} style={styles.buttonSantContainer} onPress={this.onSantPress.bind(this)}>
                 <View style={{flex: 1, flexDirection: 'row', paddingRight: auxPadding}}>
                   <View style={{flex: 20, justifyContent: 'center', paddingRight: (auxPadding*2)}}>
                     <Text numberOfLines={2} style={styles.santText}>{this.liturgicProps.LITURGIA.info_cel.nomCel}</Text>
                   </View>
                   <View style={{flex: 1, justifyContent: 'center'}}>
                   {this.liturgicProps.LITURGIA.info_cel.infoCel !== '-' ?
                    <View>
                    {this.state.santPressed ?
                      <Icon
                        name="ios-arrow-down"
                        size={25}
                        color="#424242"/>
                      :
                      <Icon
                        name="ios-arrow-forward-outline"
                        size={25}
                        iconStyle={{padding: 50}}
                        color="#424242"/>
                    }
                    </View>
                    :
                    null
                   }
                   </View>
                 </View>
               </TouchableOpacity>
             </View>
           : null}

            {this.state.santPressed && this.liturgicProps.LITURGIA.info_cel.infoCel !== '-' ?
             <View style={styles.liturgiaContainer}>
              <ScrollView>
               <Text style={styles.santExText}>{this.liturgicProps.LITURGIA.info_cel.infoCel}</Text>
               <Text style={styles.santExText}/>
              </ScrollView>
             </View>
             :
             <View style={styles.liturgiaContainer}>
               <Liturgia
                 HS={this}
                 navigation={this.props.navigation}
                 navigator={this.props.navigator}
                 variables={this.variables}
                 liturgicProps={this.liturgicProps}
                 events={this.eventEmitter} />
             </View>
           }
         </Image>
         <DateTimePicker
           isVisible={this.state.isDateTimePickerVisible}
           titleIOS={'Canvia el dia'}
           cancelTextIOS={'Cancel·la'}
           confirmTextIOS={"D'acord"}
           date={this.date}
           minimumDate={this.minimumDate}
           maximumDate={this.maximumDate}
           onConfirm={this.dateOK.bind(this)}
           onCancel={this.dateCANCEL.bind(this)}/>
       </View>
      )
    }
    else{
      return(
        <View style={styles.container}>
          <Text>{this.state.testInfo}</Text>
          <Text>{this.idTest}</Text>
          <Text>{this.diocesiTest}</Text>
          <Text>{this.variables.date.getDate() < 10 ? `0${this.variables.date.getDate()}` : this.variables.date.getDate()}/{this.variables.date.getMonth()+1 < 10 ? `0${this.variables.date.getMonth()+1}` : this.variables.date.getMonth()+1}/{this.variables.date.getFullYear()}</Text>
        </View>
      )
    }
  }

  dateOK(newDate){
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

  dateCANCEL(){
    this.setState({isDateTimePickerVisible: false});
  }

  tempsName(t){
    if(!t) return "";
    if(t === 'Ordinari'){
      return "Durant l'any";
    }
    return t;
  }

  liturgicPaint(string, color){
    switch (color) {
      case 'B':
          return(<Text style={{color: 'rgb(242, 242, 242)'}}>{string}</Text>);
        break;
      case 'V':
          return(<Text style={{color: 'rgb(0, 102, 0)'}}>{string}</Text>);
        break;
      case 'R':
          return(<Text style={{color: 'rgb(192, 57, 43)'}}>{string}</Text>);
        break;
      case 'M':
          return(<Text style={{color: 'rgb(134, 45, 134)'}}>{string}</Text>);
        break;
      default:
        return(<Text style={{color: '#c0392b'}}>{string}</Text>);
    }
  }

  onSantPress(){
    if(this.liturgicProps.LITURGIA && this.liturgicProps.LITURGIA.info_cel.infoCel !== '-'){
      if(this.santPress === 0) this.santPress = 1;
      else if(this.santPress === 1) this.santPress = 2;
      this.setState({santPressed: !this.state.santPressed});
    }
  }

  changeDate(testtt){
    console.log(testtt);
  }

  getCelType(diocesi, anyliturgic){
    switch (diocesi) {
      default:
        celType = anyliturgic.BaD;
        break;
      case "BaD":
        celType = anyliturgic.BaD;
        break;
      case "BaV":
        celType = anyliturgic.BaV;
        break;
      case "BaC":
        celType = anyliturgic.BaC;
        break;
      case "GiD":
        celType = anyliturgic.GiD;
        break;
      case "GiV":
        celType = anyliturgic.GiV;
        break;
      case "GiC":
        celType = anyliturgic.GiC;
        break;
      case "LlD":
        celType = anyliturgic.LlD;
        break;
      case "LlV":
        celType = anyliturgic.LlV;
        break;
      case "LlC":
        celType = anyliturgic.LlC;
        break;
      case "SFD":
        celType = anyliturgic.SFD;
        break;
      case "SFV":
        celType = anyliturgic.SFV;
        break;
      case "SFC":
        celType = anyliturgic.SFC;
        break;
      case "SoD":
        celType = anyliturgic.SoD;
        break;
      case "SoV":
        celType = anyliturgic.SoV;
        break;
      case "SoC":
        celType = anyliturgic.SoC;
        break;
      case "TaD":
        celType = anyliturgic.TaD;
        break;
      case "TaV":
        celType = anyliturgic.TaV;
        break;
      case "TaC":
        celType = anyliturgic.TaC;
        break;
      case "TeD":
        celType = anyliturgic.TeD;
        break;
      case "TeV":
        celType = anyliturgic.TeV;
        break;
      case "TeC":
        celType = anyliturgic.TeC;
        break;
      case "ToD":
        celType = anyliturgic.ToD;
        break;
      case "ToV":
        celType = anyliturgic.ToV;
        break;
      case "ToC":
        celType = anyliturgic.ToC;
        break;
      case "UrD":
        celType = anyliturgic.UrD;
        break;
      case "UrV":
        celType = anyliturgic.UrV;
        break;
      case "UrC":
        celType = anyliturgic.UrC;
        break;
      case "ViD":
        celType = anyliturgic.ViD;
        break;
      case "ViV":
        celType = anyliturgic.ViV;
        break;
      case "ViC":
        celType = anyliturgic.ViC;
        break;
      case "Andorra":
        celType = anyliturgic.Andorra;
        break;
    }

    return(celType);
  }

  transformDiocesiName(diocesi, lloc){
    console.log("diocesi: " + diocesi + " - " + "lloc: " + lloc);
    switch (diocesi) {
      case "Barcelona":
        switch (lloc) {
          case "Diòcesi":
            return 'BaD';
            break;
          case "Catedral":
            return 'BaC';
            break
          case "Ciutat":
            return 'BaV';
            break;
        }
        break;
      case "Girona":
        switch (lloc) {
          case "Diòcesi":
            return 'GiD';
            break;
          case "Catedral":
            return 'GiC';
            break
          case "Ciutat":
            return 'GiV';
            break;
        }
        break;
      case "Lleida":
        switch (lloc) {
          case "Diòcesi":
            return 'LlD';
            break;
          case "Catedral":
            return 'LlC';
            break
          case "Ciutat":
            return 'LlV';
            break;
        }
        break;
      case "Sant Feliu de Llobregat":
        switch (lloc) {
          case "Diòcesi":
            return 'SFD';
            break;
          case "Catedral":
            return 'SFC';
            break
          case "Ciutat":
            return 'SFV';
            break;
        }
        break;
      case "Solsona":
        switch (lloc) {
          case "Diòcesi":
            return 'SoD';
            break;
          case "Catedral":
            return 'SoC';
            break
          case "Ciutat":
            return 'SoV';
            break;
        }
        break;
      case "Tarragona":
        switch (lloc) {
          case "Diòcesi":
            return 'TaD';
            break;
          case "Catedral":
            return 'TaC';
            break
          case "Ciutat":
            return 'TaV';
            break;
        }
        break;
      case "Terrassa":
        switch (lloc) {
          case "Diòcesi":
            return 'TeD';
            break;
          case "Catedral":
            return 'TeC';
            break
          case "Ciutat":
            return 'TeV';
            break;
        }
        break;
      case "Tortosa":
        switch (lloc) {
          case "Diòcesi":
            return 'ToD';
            break;
          case "Catedral":
            return 'ToC';
            break
          case "Ciutat":
            return 'ToV';
            break;
        }
        break;
      case "Urgell":
        switch (lloc) {
          case "Diòcesi":
            return 'UrD';
            break;
          case "Catedral":
            return 'UrC';
            break
          case "Ciutat":
            return 'UrV';
            break;
        }
        break;
      case "Vic":
        switch (lloc) {
          case "Diòcesi":
            return 'ViD';
            break;
          case "Catedral":
            return 'ViC';
            break
          case "Ciutat":
            return 'ViV';
            break;
        }
        break;
      case "Andorra":
        return 'Andorra';
        break;
    }

    return('BaD');
  }

  transfromCelTypeName(CT, t){
    switch (CT) {
      case 'F':
        return (<Text style={styles.celebracioType}>Festa</Text>);
        break;
      case 'S':
        return (<Text style={styles.celebracioType}>Solemnitat</Text>);
        break;
      case 'M':
        if(t === 'Quaresma')
          return (<Text style={styles.celebracioType}>Commemoració</Text>);
        return (<Text style={styles.celebracioType}>Memòria obligatòria</Text>);
        break;
      case 'V':
      case 'L':
        if(t === 'Quaresma')
          return (<Text style={styles.celebracioType}>Commemoració</Text>);
        return (<Text style={styles.celebracioType}>Memòria lliure</Text>);
        break;
    }
    return null;
  }

  romanize (num) {
      if (!+num)
          return false;
      var digits = String(+num).split(""),
          key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
                 "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
                 "","I","II","III","IV","V","VI","VII","VIII","IX"],
          roman = "",
          i = 3;
      while (i--)
          roman = (key[+digits.pop() + (i * 10)] || "") + roman;
      return Array(+digits.join("") + 1).join("M") + roman;
  }

  weekDayName(num){
    switch (num) {
      case 0:
        return("Diumenge");
        break;
      case 1:
        return("Dilluns");
        break;
      case 2:
        return("Dimarts");
        break;
      case 3:
        return("Dimecres");
        break;
      case 4:
        return("Dijous");
        break;
      case 5:
        return("Divendres");
        break;
      case 6:
        return("Dissabte");
        break;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: paddingBar(),
    backgroundColor: GLOBAL.backgroundColor,
  },
  backgroundImage: {
   flex: 1,
   backgroundColor: 'transparent',
   width: null,
   height: null,
   //resizeMode: 'cover',
 },
  diaLiturgicContainer: {
    flex: 1.7,
    justifyContent: 'center',
    shadowOpacity: 0.2,
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 10
    },
    //backgroundColor: 'silver',
  },
  diaLiturgicText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 17,
    fontWeight: '300'
  },
  infoContainer: {
    flex: 0.4,
    justifyContent: 'flex-end',
    paddingTop: 5,
    //backgroundColor: 'red',
  },
  infoText: {
    textAlign: 'center',
    color: '#424242',
    fontSize: 13,
    fontStyle: 'italic',
    fontWeight: '300'
  },
  santContainer: {
    flex: 1.1,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 10
    },
    justifyContent: 'center',
    backgroundColor: '#E0F2F1',
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    paddingLeft: 10,
    opacity: 0.8,
  },
  buttonSantContainer: {
    flex: 1,
  },
  santText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontWeight: '300',
  },
  santExText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontWeight: '300'
  },
  celebracioType: {
    textAlign: 'center',
    color: '#333333',
    //fontStyle: 'italic',
    fontSize: 13,
    fontWeight: '300'
  },
  liturgiaContainer: {
    flex: 6,
    marginBottom: 10,
    marginHorizontal: 10,
  },
});

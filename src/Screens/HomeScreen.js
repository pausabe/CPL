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
import Liturgia from '../Components/Liturgia';
import Icon from 'react-native-vector-icons/Ionicons';
import DBAdapter from '../SQL/DBAdapter';
import SOUL from '../Components/SOUL';
import SettingsManager from '../Settings/SettingsManager';
import GLOBAL from "../Globals/Globals";
var Subscribable = require('Subscribable');

function paddingBar(){
  if(Platform.OS === 'ios'){
    return 64;
  }
  return 54;
}

export default class HomeScreen extends Component {
  componentDidMount() {
    if(Platform.OS==='android'){
      setTimeout(() => { SplashScreen.hide(); }, 550);
    }
    console.log("this.props.events: " + this.props.events);
    this.props.events.addListener('myEvent', this.eventManager.bind(this));
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.backHandler.bind(this));
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.backHandler.bind(this));
  }

  backHandler(){
    console.log("Android back: " + this.props.navigator.getCurrentRoutes().length);
    if(this.props.navigator.getCurrentRoutes().length>1){
      this.props.navigator.pop();
      return true;
    }
    return false;
  }

  constructor(props) {
    super(props)

    //this.iWantRender = false;

    this.state = {
      santPressed: false,
    }

    this.arrows = false;

    this.testing = false; //fer-ho amb iphone 7!
    this.initialDayTest = {
      day: 2,
      month: 0,
      year: 2017,
    }
    this.finalDayTest = {
      day: 28,
      month: 11,
      year: 2017,
    }

    if(this.testing){
      var today = new Date(this.initialDayTest.year, this.initialDayTest.month, this.initialDayTest.day);
      var initalIndex = 0; //0-30
      var finalIndex = 15; //0-30
      this.diocesiTest = this.nextDiocesi(initalIndex);
      this.diocesiNameTest = this.nextDiocesiName(initalIndex);
      this.llocTest = this.nextLloc(initalIndex);
      this.idTest = initalIndex;
      this.maxIdTest = finalIndex;
      console.log("-------------------------------->>>TEST BEGINS<<<--------------------------------");
      console.log("--------------------------------:::"+this.idTest+" -> "+this.diocesiTest+":::--------------------------------");
      console.log("-----------------------------------"+this.initialDayTest.day+"/"+this.initialDayTest.month+"/"+this.initialDayTest.year+" -> "+this.finalDayTest.day+"/"+this.finalDayTest.month+"/"+this.finalDayTest.year+"-----------------------------------");
    }
    else{
      console.log("Que pasa neng -------------------------45-4-5-45-458-4-584-85-458-478-478-748-748-78--87>>: "+props.naviDate);
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
    if(this.litPres){
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
    else{
      console.log("Should. NO, coses del Picker");
      return false;
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
      var nextDay = this.variables.date;
      nextDay.setDate(nextDay.getDate()+1);
      if(nextDay.getFullYear() === this.finalDayTest.year &&
        nextDay.getMonth() === this.finalDayTest.month &&
        nextDay.getDate() === this.finalDayTest.day){
          if(this.idTest === this.maxIdTest){
            console.log("-------------------------------->>>TEST ENDS<<<--------------------------------");
          }
          else{
            firstDay = new Date(this.initialDayTest.year,this.initialDayTest.month,this.initialDayTest.day);
            this.idTest += 1;
            this.diocesiTest = this.nextDiocesi(this.idTest);
            this.diocesiNameTest = this.nextDiocesiName(this.idTest);
            this.llocTest = this.nextLloc(this.idTest);
            auxTomorrow = new Date();
            auxTomorrow.setFullYear(this.initialDayTest.year);
            auxTomorrow.setMonth(this.initialDayTest.month);
            auxTomorrow.setDate(this.initialDayTest.day+1);
            this.dataTomorrow.date = auxTomorrow;
            this.refreshEverything(firstDay);
            console.log("--------------------------------:::NEXT DIÒCESI: "+this.idTest+" -> "+this.diocesiTest+" - "+firstDay+":::--------------------------------");
          }
      }
      else{
        auxTomorrow = new Date();
        auxTomorrow.setFullYear(this.dataTomorrow.date.getFullYear());
        auxTomorrow.setMonth(this.dataTomorrow.date.getMonth());
        auxTomorrow.setDate(this.dataTomorrow.date.getDate()+1);
        this.dataTomorrow.date = auxTomorrow;
        while(this.passDayTest(nextDay)){
          console.log("-----------------------------------"+this.idTest+" -> "+this.diocesiTest+" - PASS DAY: "+nextDay+"-----------------------------------");
          nextDay.setDate(nextDay.getDate()+1);
          auxTomorrow = this.dataTomorrow.date;
          auxTomorrow.setDate(auxTomorrow.getDate()+1);
          this.dataTomorrow.date = auxTomorrow;
        }
        console.log("-----------------------------------"+this.idTest+" -> "+this.diocesiTest+" - NEXT DAY: "+nextDay+"-----------------------------------");
        this.refreshEverything(nextDay);
      }
    }
  }

  passDayTest(day){
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
    console.log("RENDER!!! " + this.variables.date);
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
                      color="#424242"
                    />
                    :
                    <Icon
                      name="ios-arrow-forward-outline"
                      size={25}
                      iconStyle={{padding: 50}}
                      color="#424242"
                    />
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
               navigator={this.props.navigator}
               variables={this.variables}
               liturgicProps={this.liturgicProps}
             />
           </View>
         }
       </Image>
     </View>
    )
  }

  tempsName(t){
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
          return(<Text style={{color: 'rgb(0, 128, 40)'}}>{string}</Text>);
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
  nextDiocesi(index){
    switch (index) {
      case 0:
        return 'BaD';
        break;
      case 1:
        return 'BaV';
        break;
      case 2:
        return 'BaC';
        break;
      case 3:
        return 'GiD';
        break;
      case 4:
        return 'GiV';
        break;
      case 5:
        return 'GiC';
        break;
      case 6:
        return 'LlD';
        break;
      case 7:
        return 'LlV';
        break;
      case 8:
        return 'LlC';
        break;
      case 9:
        return 'SFD';
        break;
      case 10:
        return 'SFV';
        break;
      case 11:
        return 'SFC';
        break;
      case 12:
        return 'SoD';
        break;
      case 13:
        return 'SoV';
        break;
      case 14:
        return 'SoC';
        break;
      case 15:
        return 'TaD';
        break;
      case 16:
        return 'TaV';
        break;
      case 17:
        return 'TaC';
        break;
      case 18:
        return 'TeD';
        break;
      case 19:
        return 'TeV';
        break;
      case 20:
        return 'TeC';
        break;
      case 21:
        return 'ToD';
        break;
      case 22:
        return 'ToV';
        break;
      case 23:
        return 'ToC';
        break;
      case 24:
        return 'UrD';
        break;
      case 25:
        return 'UrV';
        break;
      case 26:
        return 'UrC';
        break;
      case 27:
        return 'ViD';
        break;
      case 28:
        return 'ViV';
        break;
      case 29:
        return 'ViC';
        break;
      case 30:
        return 'Andorra';
        break;
      }
  }

  nextDiocesiName(index){
    switch (index) {
      case 0:
      case 1:
      case 2:
        return 'Barcelona';
        break;
      case 3:
      case 4:
      case 5:
        return 'Girona';
        break;
      case 6:
      case 7:
      case 8:
        return 'Lleida';
        break;
      case 9:
      case 10:
      case 11:
        return 'Sant Feliu de Llobregat';
        break;
      case 12:
      case 13:
      case 14:
        return 'Solsona';
        break;
      case 15:
      case 16:
      case 17:
        return 'Tarragona';
        break;
      case 18:
      case 19:
      case 20:
        return 'Terrassa';
        break;
      case 21:
      case 22:
      case 23:
        return 'Tortosa';
        break;
      case 24:
      case 25:
      case 26:
        return 'Urgell';
        break;
      case 27:
      case 28:
      case 29:
        return 'Vic';
        break;
      case 30:
        return 'Andorra';
        break;
      }
  }

  nextLloc(index){
    switch (index) {
      case 0:
      case 3:
      case 6:
      case 9:
      case 12:
      case 15:
      case 18:
      case 21:
      case 24:
      case 27:
      case 30:
        return 'Diòcesi';
        break;
      case 1:
      case 4:
      case 7:
      case 10:
      case 13:
      case 16:
      case 19:
      case 22:
      case 25:
      case 28:
        return 'Ciutat';
        break;
      case 2:
      case 5:
      case 8:
      case 11:
      case 14:
      case 17:
      case 20:
      case 23:
      case 26:
      case 29:
        return 'Catedral';
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
})

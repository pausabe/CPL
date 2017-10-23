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
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import EventEmitter from 'EventEmitter';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { NavigationActions } from 'react-navigation';

import HomeScreen from '../Views/HomeScreen/HomeScreen';
import DBAdapter from '../Adapters/DBAdapter';
import SOUL from './Classes/SOUL/SOUL';
import SettingsManager from './Classes/SettingsManager';
import GLOBAL from "../Globals/Globals";
import TEST from "../Tests/Test";
import LiturgiaDisplayScreen from '../Views/LiturgiaDisplayScreen/LiturgiaDisplayScreen';

function paddingBar(){
  if(Platform.OS === 'ios'){
    return 64;
  }
  return 0;//54;
}

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
    // this.auxDate = this.date;
    this.minimumDate = new Date(2017,0,2);
    this.maximumDate = new Date(2017,11,28);

    this.state = {
      santPressed: false,
      testInfo: 'testing correctly',
      isDateTimePickerVisible: false,

      ViewData: {
        ready: null,
        lloc: {
          diocesiName: '',
          lloc: '',
        },
        data: '',
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
        primVespres: '',
      }
    }

    /*primeres vespres setter
    this.props.liturgicProps.LITURGIA &&
      if((this.props.variables.date.getDay() === 6
         && this.props.variables.celType !== 'S')
       || this.props.liturgicProps.LITURGIA.vespres1) //YES else //NO
    */

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
    return false;
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


  onSantPressCB(){
    if(this.liturgicProps.LITURGIA && this.liturgicProps.LITURGIA.info_cel.infoCel !== '-'){
      if(this.santPress === 0) this.santPress = 1;
      else if(this.santPress === 1) this.santPress = 2;
      this.setState({santPressed: !this.state.santPressed});
    }
  }

  changeDate(testtt){
    console.log(testtt);
  }

  LHButtonCB(type){
    var title = type;
    if(type === 'Ofici') title = 'Ofici de lectura';
    this.liturgiaPressed();
    if(this.props.liturgicProps.LITURGIA !== null){
      if(Platform.OS === 'ios'){
        this.props.navigator.push({
          title: title,
          passProps: {
            type: type,
            date: this.props.date,
            variables: this.props.variables,
            liturgicProps: this.props.liturgicProps,
          },
          component: LiturgiaDisplayScreen
        });
      }
      else{
        var params = {
          title: title,
          props: {
            type: type,
            variables: this.props.variables,
            date: this.props.date,
            liturgicProps: this.props.liturgicProps,
          },
        }
        this.props.navigation.navigate('LiturgiaDisplay', params);
      }
    }
  }

  render(){
    return(
      <HomeScreen
        ViewData={this.state.ViewData}
        santCB={this.onSantPressCB.bind(this)}
        oficiCB={this.LHButtonCB.bind(this, "Ofici")}
        laudesCB={this.LHButtonCB.bind(this, "Laudes")}
        terciaCB={this.LHButtonCB.bind(this, "Tèrcia")}
        sextaCB={this.LHButtonCB.bind(this, "Sexta")}
        nonaCB={this.LHButtonCB.bind(this, "Nona")}
        vespresCB={this.LHButtonCB.bind(this, "Vespres")}
        completesCB={this.LHButtonCB.bind(this, "Completes")}/>
    )
  }








  /*MAKE GLOBALS*/
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

import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  BackAndroid,
  TouchableOpacity,
 } from 'react-native';

import Liturgia from '../Components/Liturgia';
import Icon from 'react-native-vector-icons/Ionicons';
import DBAdapter from '../SQL/DBAdapter';
import SOUL from '../Components/SOUL';
import SettingsManager from '../Settings/SettingsManager';

/*
*
*
*
Recorda que quan canvies de data s'ha de posar santPressed a false
Solemnitat de santsSolemnitats en diumenge es fa? (tinc posat que no)
*
*
*
*/

function paddingBar(){
  if(Platform.OS === 'ios'){
    return 64;
  }
  return 54;
}

export default class HomeScreen extends Component {
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      this.props.navigator.pop();
      return true;
    });
  }

  constructor(props) {
    super(props)

    this.iWantRender = false;

    this.state = {
      santPressed: false,
    }

    var today = new Date();
    //today.setDate(25); //1-31
    //today.setMonth(4); //0-11
    //today.setFullYear(2017); //XXXX
    this.HCDiocesi = 'BaD';

    this.variables = {
      diocesi: '',
      diocesiName: '',
      invitatori: '',
      llati: '',
      gloria: '',
      lliures: '',
      textSize: '',
      celType: '',
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

    var tomorrow = new Date(today.getFullYear(), today.getMonth());
    tomorrow.setDate(today.getDate() + 1);

    this.dataTomorrow = {
      date: tomorrow,
      celType: '',
      LT: '',
      setmana: '',
    }

    this.acceso = new DBAdapter();

    this.refresh = false;
    this.refreshEverything(today);

  }

  refreshEverything(date){
    //settings > anyliturgic > soul > render
    Promise.all([
      SettingsManager.getSettingDiocesis((r) => {
        this.variables.diocesi = this.transformDiocesiName(r);
        this.variables.diocesiName = r;
        console.log(r+'-'+this.variables.diocesi);
      }),
      SettingsManager.getSettingInvitatori((r) => this.variables.invitatori = r),
      SettingsManager.getSettingUseLatin((r) => this.variables.llati = r),
      SettingsManager.getSettingShowGlories((r) => this.variables.gloria = r),
      SettingsManager.getSettingShowGlories((r) => this.variables.lliures = r),
      SettingsManager.getSettingTextSize((r) => {
        console.log("textSize: " + r);
        this.variables.textSize = r;
      }),
    ]).then(results => {
      console.log("gloria: " + this.variables.gloria);
      this.refreshDate(date);
    });
  }

  shouldComponentUpdate(){
    if(!this.iWantRender){
      console.log("should render here but I don't want it");

      if(this.refresh){
        this.refreshEverything(this.variables.date);
      }

      this.refresh = !this.refresh;
      return false;
    }
    console.log("should render here and I want it");
    this.iWantRender = false;
    return true;
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

        this.liturgicProps.LITURGIA = null;

        this.liturgicProps.tempsespecific = current.tempsespecific;
        this.liturgicProps.LT = current.temps;
        this.liturgicProps.cicle = current.cicle; //1-4
        this.liturgicProps.setmana = current.NumSet; //Ordinari: 1-34, pasqua: 2-7 i quaresma: 1-5 o 2-7
        this.liturgicProps.ABC = current.anyABC;

        this.dataTomorrow.celType = tomorrowCelType;
        this.dataTomorrow.LT = tomorrow.temps;
        this.dataTomorrow.setmana = tomorrow.NumSet;

        console.log("CHANGING TOMORROW DATE: " + this.dataTomorrow.date.getDate() + "/" + this.dataTomorrow.date.getMonth());

        if(this.SOUL === undefined)
          this.SOUL = new SOUL(this.variables, this.liturgicProps, this.dataTomorrow, pentacosta, this);
        else
          this.SOUL.makeQueryies(this.variables.date, this.liturgicProps, this.dataTomorrow, this.variables.celType, this.variables.diocesi, this.variables.invitatori, pentacosta, this,  this.variables.llati);
      }
    );
  }

  setSoul(liturgia){
    console.log("HomeScreen - setSoul");
    this.liturgicProps.LITURGIA = liturgia;
    this.iWantRender = false;
    this.setState({santPressed: false});
    this.forceUpdate();
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
    auxPadding = 5;
    return (
      <View style={styles.container}>
       <Image source={require('../img/bg/currentbg.jpg')} style={styles.backgroundImage}>
         <View style={styles.infoContainer}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center',}}>
              <View>
                <TouchableOpacity style={styles.buttonSantContainer} onPress={this.onMinusPress.bind(this)}>
                   <Text>{"<<<     "}</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.infoText}>Diòcesi de {this.variables.diocesiName} - {this.variables.date.getDate() < 10 ? `0${this.variables.date.getDate()}` : this.variables.date.getDate()}/{this.variables.date.getMonth()+1 < 10 ? `0${this.variables.date.getMonth()+1}` : this.variables.date.getMonth()+1}/{this.variables.date.getFullYear()}</Text>
              </View>
              <View>
                <TouchableOpacity style={styles.buttonSantContainer} onPress={this.onPlusPress.bind(this)}>
                   <Text>{"     >>>"}</Text>
                </TouchableOpacity>
              </View>
            </View>
         </View>
         <View style={styles.diaLiturgicContainer}>
           <Text style={styles.diaLiturgicText}>{this.weekDayName(this.variables.date.getDay())}{this.liturgicProps.setmana !== 0 ? " de la setmana" : null}
             {this.liturgicProps.setmana !== 0 ? <Text style={{color: '#c0392b'}}> {this.romanize(this.liturgicProps.setmana)}</Text> : null }</Text>
           <Text style={styles.diaLiturgicText}>Temps de
              <Text style={{color: '#c0392b'}}> {this.liturgicProps.tempsespecific}</Text></Text>
           <Text style={styles.diaLiturgicText}>Setmana
             <Text style={{color: '#c0392b'}}> {this.romanize(this.liturgicProps.cicle)} </Text>
             del cicle litúrgic, any
               <Text style={{color: '#c0392b'}}> {this.liturgicProps.ABC}</Text></Text>
         </View>
         {this.liturgicProps.LITURGIA !== null && this.liturgicProps.LITURGIA.info_cel.nomCel !== '-' ?
         <View style={{paddingBottom: 5}}>
           <Text style={styles.celebracioType}>{this.transfromCelTypeName(this.liturgicProps.LITURGIA.info_cel.typeCel)}</Text>
         </View>
         : null}
         {this.liturgicProps.LITURGIA !== null && this.liturgicProps.LITURGIA.info_cel.nomCel !== '-' ?
           <View style={styles.santContainer}>
             <TouchableOpacity activeOpacity={1.0} style={styles.buttonSantContainer} onPress={this.onSantPress.bind(this)}>
               <View style={{flex: 1, flexDirection: 'row', paddingRight: auxPadding}}>
                 <View style={{flex: 20, justifyContent: 'center', paddingRight: (auxPadding*2)}}>
                   <Text style={styles.santText}>{this.liturgicProps.LITURGIA.info_cel.nomCel}</Text>
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
             <Text style={styles.santExText}>{this.liturgicProps.LITURGIA.info_cel.infoCel}</Text>
             <Text style={styles.santExText}/>
           </View>
           :
           <View style={styles.liturgiaContainer}>
             <Liturgia
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

  onSantPress(){
    if(this.liturgicProps.LITURGIA){
      this.iWantRender = true;
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

  transformDiocesiName(diocesi){
    switch (diocesi) {
      case "Barcelona":
        return 'BaD';
        break;
      case "Girona":
        return 'GiD';
        break;
      case "Lleida":
        return 'LlD';
        break;
      case "Tarragona":
        return 'TaD';
        break;
    }

    return(celType);
  }

  transfromCelTypeName(CT){
    switch (CT) {
      case 'F':
        return 'Festivitat';
        break;
      case 'S':
        return 'Solemnitat';
        break;
      case 'M':
        return 'Memòria obligatòria';
        break;
      case 'L':
        return 'Memòria lliure';
        break;
    }
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
    backgroundColor: '#E1F5FE',
  },
  backgroundImage: {
   flex: 1,
   backgroundColor: 'transparent',
   width: null,
   height: null,
   //resizeMode: 'cover',
 },
  diaLiturgicContainer: {
    flex: 3,
    justifyContent: 'center',
    //backgroundColor: 'silver',
  },
  diaLiturgicText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: '300'
  },
  infoContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
    paddingTop: 5,
    //backgroundColor: '#E1F5FE',
  },
  infoText: {
    textAlign: 'center',
    color: '#424242',
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: '300'
  },
  santContainer: {
    flex: 1.5,
    justifyContent: 'center',
    backgroundColor: '#E0F2F1',
    borderRadius: 15,
    marginHorizontal: 10,
    paddingLeft: 10,
    opacity: 0.8,
  },
  buttonSantContainer: {
    flex: 1,
  },
  santText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: '300'
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
    fontSize: 14,
    fontWeight: '300'
  },
  liturgiaContainer: {
    flex: 9,
    marginVertical: 10,
    marginHorizontal: 10,
  },
})

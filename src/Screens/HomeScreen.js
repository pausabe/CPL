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

function paddingBar(){
  if(Platform.OS === 'ios'){
    return 64;
  }
  return 54;
}

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)

    var today = new Date();
    today.setDate(2); //1-31
    today.setMonth(10); //0-11
    //today.setFullYear(2017); //XXXX
    this.HCDiocesi = 'BaD';

    this.state = {
      diocesi: '',
      santPressed: false,
      invitatori: '',
      date: today,

      liturgicProps: {
        LITURGIA: null,
        tempsespecific: '',
        LT: '',
        cicle: '',
        setmana: '',
        ABC: '',
        tempsespecific2: '',
        LT2: '',
        cicle2: '',
        setmana2: '',
        ABC2: '',
      },
    }

    this.dataRec = {
      diocesi: '',
      invitatori: '',
    }
    SettingsManager.getSettingDiocesis((r) => this.setState({diocesi: /*r*/this.HCDiocesi}));
    SettingsManager.getSettingInvitatori((r) => this.setState({invitatori: r}));

    this.acceso = new DBAdapter();
    this.acceso.getAnyLiturgic(
      this.state.date.getFullYear(),
      this.state.date.getMonth(),
      this.state.date.getDate(),
      (current, tomorrow) => {
        var celType = this.celebracio(this.HCDiocesi, current); //TODO: HC, cal agafar-ho de settings
        this.setState({
          celType: celType, //S, M, L, F, V o -

          liturgicProps: {
            LITURGIA: null,

            tempsespecific: current.tempsespecific, //Pasqua, Quaresema...
            LT: current.temps, //Q_SETMANES, P_SETMANES...
            cicle: current.cicle, //1-4
            setmana: current.NumSet, //Ordinari: 1-34, pasqua: 2-7 i quaresma: 1-5 o 2-7
            ABC: current.anyABC, //A, B o C

            tempsespecific2: tomorrow.tempsespecific,
            LT2: tomorrow.temps,
            cicle2: tomorrow.cicle,
            setmana2: tomorrow.NumSet,
            ABC2: tomorrow.anyABC,
          },
        });

        this.SOUL = new SOUL(this.state, this);
      }
    );
  }

  refreshDate(newDay, diocesi, invitatori){
    console.log("NEW DAY: " + newDay.getDate() + ", diocesi: " + diocesi + ", invitatori: " + invitatori);
    this.acceso.getAnyLiturgic(
      newDay.getFullYear(),
      newDay.getMonth(),
      newDay.getDate(),
      (current, tomorrow) => {
        var celType = this.celebracio(this.HCDiocesi, current); //TODO: HC, this.HCDiocesi cal agafarho de settings (diocesi)
        this.setState({
          date: newDay,
          celType: celType,
          diocesi: /*diocesi*/this.HCDiocesi,
          invitatori: invitatori,

          liturgicProps: {
            LITURGIA: null,

            tempsespecific: current.tempsespecific,
            LT: current.temps,
            cicle: current.cicle, //1-4
            setmana: current.NumSet, //Ordinari: 1-34, pasqua: 2-7 i quaresma: 1-5 o 2-7
            ABC: current.anyABC,

            tempsespecific2: tomorrow.tempsespecific,
            LT2: tomorrow.temps,
            cicle2: tomorrow.cicle,
            setmana2: tomorrow.NumSet,
            ABC2: tomorrow.anyABC,
          },
        });

        this.SOUL.makeQueryies(newDay, this.state.liturgicProps, this.state.celType, this.state.diocesi, this.state.invitatori, this);
      }
    );
  }

  /*asdf(){
    console.log("update");

    //1
    SettingsManager.getSettingDiocesis((r) => {
      this.dataReceived("diocesi", r);
    });
    //2
    SettingsManager.getSettingInvitatori((r) => {
      this.dataReceived("invitatori", r);
    });
  }

  dataReceived(type, value){
    this.cDR = 2;
    switch (type) {
      case "diocesi":
        this.cDR -= 1;
        this.dataRec.diocesi = value;
        break;
      case "invitatori":
        this.cDR -= 1;
        this.dataRec.invitatori = value;
        break;
    }

    if(this.cDR === 0){
      this.setState({diocesi: this.dateRec.diocesi, invitatori: this.dateRec.invitatori});
      this.SOUL.makeQueryies(newDay, this.state.liturgicProps, this.dateRec.invitatori, this);
    }
  }*/

  setSoul(liturgia){
    this.setState({
      liturgicProps: {
        LITURGIA: liturgia,
        tempsespecific: this.state.liturgicProps.tempsespecific,
        LT: this.state.liturgicProps.LT,
        cicle: this.state.liturgicProps.cicle,
        setmana: this.state.liturgicProps.setmana,
        ABC: this.state.liturgicProps.ABC,

        tempsespecific2: this.state.liturgicProps.tempsespecific2,
        LT2: this.state.liturgicProps.LT2,
        cicle2: this.state.liturgicProps.cicle2,
        setmana2: this.state.liturgicProps.setmana2,
        ABC2: this.state.liturgicProps.ABC2,
      }
    });
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      this.props.navigator.pop();
      return true;
    });
  }

  onMinusPress(){
    var newDay = new Date();
    newDay.setDate(this.state.date.getDate()-1);
    this.refreshDate(newDay, this.state.diocesi, this.state.liturgia);
  }

  onPlusPress(){
    var newDay = new Date();
    newDay.setDate(this.state.date.getDate()+1);
    this.refreshDate(newDay, this.state.diocesi, this.state.liturgia);
  }

  render() {
    return (
      <View style={styles.container}>
       <Image source={require('../img/bg/fons4.jpg')} style={styles.backgroundImage}>
         <View style={styles.infoContainer}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center',}}>
              <View>
                <TouchableOpacity style={styles.buttonSantContainer} onPress={this.onMinusPress.bind(this)}>
                   <Text>{"<<<     "}</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.infoText}>Diòcesi de {this.state.diocesi} - {this.state.date.getDate() < 10 ? `0${this.state.date.getDate()}` : this.state.date.getDate()}/{this.state.date.getMonth()+1 < 10 ? `0${this.state.date.getMonth()+1}` : this.state.date.getMonth()+1}/{this.state.date.getFullYear()}</Text>
              </View>
              <View>
                <TouchableOpacity style={styles.buttonSantContainer} onPress={this.onPlusPress.bind(this)}>
                   <Text>{"     >>>"}</Text>
                </TouchableOpacity>
              </View>
            </View>
         </View>
         <View style={styles.diaLiturgicContainer}>
           <Text style={styles.diaLiturgicText}>{this.weekDayName(this.state.date.getDay())}{this.state.liturgicProps.setmana !== 0 ? " de la setmana" : null}
             {this.state.liturgicProps.setmana !== 0 ? <Text style={{color: '#c0392b'}}> {this.romanize(this.state.liturgicProps.setmana)}</Text> : null }</Text>
           <Text style={styles.diaLiturgicText}>Temps de
             <Text style={{color: '#c0392b'}}> {this.state.liturgicProps.tempsespecific}</Text></Text>
           <Text style={styles.diaLiturgicText}>Setmana
             <Text style={{color: '#c0392b'}}> {this.romanize(this.state.liturgicProps.cicle)} </Text>
             del cicle litúrgic, any
               <Text style={{color: '#c0392b'}}> {this.state.liturgicProps.ABC}</Text></Text>
         </View>
         {this.state.liturgicProps.LITURGIA !== null && this.state.liturgicProps.LITURGIA.info_cel.nomCel !== '-' ?
           <View style={styles.santContainer}>
             <TouchableOpacity activeOpacity={1.0} style={styles.buttonSantContainer} onPress={this.onSantPress.bind(this)}>
               <View style={{flex: 1, flexDirection: 'row'}}>
                 <View style={{flex: 20, justifyContent: 'center'}}>
                   <Text style={styles.santText}>{this.state.liturgicProps.LITURGIA.info_cel.nomCel}</Text>
                 </View>
                 <View style={{flex: 1, paddingRight: 10, justifyContent: 'center'}}>
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
               </View>
             </TouchableOpacity>
           </View>
         : null}

         {this.state.santPressed ?
           <View style={styles.liturgiaContainer}>
             <Text style={styles.santExText}>{this.state.liturgicProps.LITURGIA.info_cel.infoCel}</Text>
             <Text style={styles.santExText}/>
           </View>
           :
           <View style={styles.liturgiaContainer}>
             <Liturgia
               navigator={this.props.navigator}
               date={this.state.date}
               liturgicProps={this.state.liturgicProps}
             />
           </View>
         }
       </Image>
     </View>
    )
  }

  onSantPress(){
    this.setState({santPressed: !this.state.santPressed});
    //this.refreshDate();
  }

  celebracio(diocesi, anyliturgic){
    switch (diocesi) {
      case "BaD":
        celebracio = anyliturgic.BaD;
        break;
      case "BaV":
        celebracio = anyliturgic.BaV;
        break;
      case "BaC":
        celebracio = anyliturgic.BaC;
        break;
      case "GiD":
        celebracio = anyliturgic.GiD;
        break;
      case "GiV":
        celebracio = anyliturgic.GiV;
        break;
      case "GiC":
        celebracio = anyliturgic.GiC;
        break;
      case "LlD":
        celebracio = anyliturgic.LlD;
        break;
      case "LlV":
        celebracio = anyliturgic.LlV;
        break;
      case "LlC":
        celebracio = anyliturgic.LlC;
        break;
      case "SFD":
        celebracio = anyliturgic.SFD;
        break;
      case "SFV":
        celebracio = anyliturgic.SFV;
        break;
      case "SFC":
        celebracio = anyliturgic.SFC;
        break;
      case "SoD":
        celebracio = anyliturgic.SoD;
        break;
      case "SoV":
        celebracio = anyliturgic.SoV;
        break;
      case "SoC":
        celebracio = anyliturgic.SoC;
        break;
      case "TaD":
        celebracio = anyliturgic.TaD;
        break;
      case "TaV":
        celebracio = anyliturgic.TaV;
        break;
      case "TaC":
        celebracio = anyliturgic.TaC;
        break;
      case "TeD":
        celebracio = anyliturgic.TeD;
        break;
      case "TeV":
        celebracio = anyliturgic.TeV;
        break;
      case "TeC":
        celebracio = anyliturgic.TeC;
        break;
      case "ToD":
        celebracio = anyliturgic.ToD;
        break;
      case "ToV":
        celebracio = anyliturgic.ToV;
        break;
      case "ToC":
        celebracio = anyliturgic.ToC;
        break;
      case "UrD":
        celebracio = anyliturgic.UrD;
        break;
      case "UrV":
        celebracio = anyliturgic.UrV;
        break;
      case "UrC":
        celebracio = anyliturgic.UrC;
        break;
      case "ViD":
        celebracio = anyliturgic.ViD;
        break;
      case "ViV":
        celebracio = anyliturgic.ViV;
        break;
      case "ViC":
        celebracio = anyliturgic.ViC;
        break;
      case "Andorra":
        celebracio = anyliturgic.Andorra;
        break;
    }

    return(celebracio);
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
   resizeMode: 'cover',
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
    fontSize: 14,
    fontWeight: '300'
  },
  liturgiaContainer: {
    flex: 9,
    marginVertical: 10,
    marginHorizontal: 10,
  },
})

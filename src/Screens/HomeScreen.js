import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  BackAndroid,
  TouchableOpacity
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

/*
O_ORDINARI
Q_CENDRA
Q_SETMANES
Q_DIUM_RAMS
Q_SET_SANTA
Q_TRIDU
Q_DIUM_PASQUA
P_OCTAVA
P_SETMANES
A_SETMANES
A_FERIES
N_OCTAVA
N_ABANS
*/
export default class HomeScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      LITURGIA: null,
      ofici: null,
      diocesis: '',
      invitatori: '',
      santPressed: false,
      memoria: false,
      celebracio: '',
      anyliturgic: '',
      anyliturgic2: '',
      monthDay: '',
      month: '',
      year: '',
      hour: '',
      weekDay: '',
      LT: '',
      cicle: '',
      setmana: '',
      ABC: '',
      LT2: '',
      cicle2: '',
      setmana2: '',
      ABC2: '',
    }

    SettingsManager.getSettingDiocesis((r) => this.setState({diocesis: r}));
    SettingsManager.getSettingInvitatori((r) => this.setState({invitatori: r}));

    this.today = new Date();
    //today.setDate(18); //1-31
    //today.setMonth(0); //0-11
    //today.setFullYear(2017); //XXXX

    acceso = new DBAdapter();
    acceso.getAnyLiturgic(
      this.today.getFullYear(),
      this.today.getMonth(),
      this.today.getDate(),
      (current, tomorrow) => {
        var cel = this.celebracio("BaD", current); //TODO: HC, cal agafarho de settings
        this.setState({
          monthDay: this.today.getDate(), //1-31
          month: this.today.getMonth(), //0-11
          year: this.today.getFullYear(), //xxxx
          hour: this.today.getHours(), //0-23
          weekDay: this.today.getDay(), //0-6 (diumenge-dissabte)
          anyliturgic: current,
          celebracio: cel,
          LT: current.temps,
          cicle: current.cicle, //1-4
          setmana: current.NumSet, //Ordinari: 1-34, pasqua: 2-7 i quaresma: 1-5 o 2-7
          ABC: current.anyABC,
          anyliturgic2: tomorrow,
          LT2: tomorrow.temps,
          cicle2: tomorrow.cicle,
          setmana2: tomorrow.NumSet,
          ABC2: tomorrow.anyABC,
        });

        new SOUL(this.state, this);
      }
    );
  }

  setSoul(LITURGIA){
    this.setState({ LITURGIA: LITURGIA });
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      this.props.navigator.pop();
      return true;
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../img/bg/fons4.jpg')} style={styles.backgroundImage}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Diòcesi de {this.state.diocesis} - {this.state.monthDay < 10 ? `0${this.state.monthDay}` : this.state.monthDay}/{this.state.month+1 < 10 ? `0${this.state.month+1}` : this.state.month+1}/{this.state.year}</Text>
          </View>
          <View style={styles.diaLiturgicContainer}>
            <Text style={styles.diaLiturgicText}>{this.weekDayName(this.state.weekDay)}{this.state.anyliturgic.NumSet !== 0 ? " de la setmana" : null}
              {this.state.anyliturgic.NumSet !== 0 ? <Text style={{color: '#c0392b'}}> {this.romanize(this.state.anyliturgic.NumSet)}</Text> : null }</Text>
            <Text style={styles.diaLiturgicText}>Temps de
              <Text style={{color: '#c0392b'}}> {this.state.anyliturgic.tempsespecific}</Text></Text>
            <Text style={styles.diaLiturgicText}>Setmana
              <Text style={{color: '#c0392b'}}> {this.romanize(this.state.anyliturgic.cicle)} </Text>
              del cicle litúrgic, any
                <Text style={{color: '#c0392b'}}> {this.state.ABC}</Text></Text>
          </View>
          <View style={styles.santContainer}>
            <TouchableOpacity activeOpacity={1.0} style={styles.buttonSantContainer} onPress={this.onSantPress.bind(this)}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 20, justifyContent: 'center'}}>
                  <Text style={styles.santText}>{this.state.LITURGIA === null ? "NO - " : "YES - "}{"Santa Perpètua i Santa Felicitat"}</Text>
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

          {this.state.santPressed ?
            <View style={styles.liturgiaContainer}>
              <Text style={styles.santExText}>Les santes Perpètua i Felicitat (mort a Cartago, 7 de març de 203) eren dues noies cristianes que van morir màrtir sota l'imperi de Septimi Sever (193 - 211) juntament amb Satur, Revocat, Sadurní i Secundí. Tots sis són venerats com a sants en certes branques de la cristiandat.</Text>
              <Text style={styles.santExText}/>
              <Liturgia navigator={this.props.navigator}
                        hour={this.state.hour}
                        weekDay={this.state.weekDay}
                        monthDay={this.state.monthDay}
                        month={this.state.month}
                        year={this.state.year}
                        cicle={this.state.cicle}
                        setmana={this.state.setmana}
                        LT={this.state.LT}
                        ABC={this.state.ABC}
                        cicle2={this.state.cicle2}
                        setmana2={this.state.setmana2}
                        LT2={this.state.LT2}
                        ABC2={this.state.ABC2}
                        LITURGIA={this.state.LITURGIA}/>
            </View>
            :
            <View style={styles.liturgiaContainer}>
              <Liturgia navigator={this.props.navigator}
                        hour={this.state.hour}
                        weekDay={this.state.weekDay}
                        monthDay={this.state.monthDay}
                        month={this.state.month}
                        year={this.state.year}
                        cicle={this.state.cicle}
                        setmana={this.state.setmana}
                        LT={this.state.LT}
                        ABC={this.state.ABC}
                        cicle2={this.state.cicle2}
                        setmana2={this.state.setmana2}
                        LT2={this.state.LT2}
                        ABC2={this.state.ABC2}
                        LITURGIA={this.state.LITURGIA}/>
            </View>
          }
        </Image>
      </View>
    )
  }

  onSantPress(){
    this.setState({santPressed: !this.state.santPressed});
  }

  celebracio(diocesis, anyliturgic){
    switch (diocesis) {
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

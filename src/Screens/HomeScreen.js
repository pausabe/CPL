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
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      this.props.navigator.pop();
      return true;
    });
  }

  constructor(props) {
    super(props)

    var today = new Date();
    //today.setDate(4); //1-31
    //today.setMonth(5); //0-11
    //today.setFullYear(2017); //XXXX

    this.variables = {
      diocesi: '',
      celType: '',
      invitatori: '',
      date: today,
    }

    this.liturgicProps = {
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
    }

    this.acceso = new DBAdapter();

    this.refresh = false;
    this.refreshEverything(today);

  }

  refreshEverything(date){
    //settings > anyliturgic > soul > render
    Promise.all([
      SettingsManager.getSettingDiocesis((r) => this.variables.diocesi = r),
      SettingsManager.getSettingInvitatori((r) => this.variables.invitatori = r),
    ]).then(results => {
      this.refreshDate(date);
    });
  }

  shouldComponentUpdate(){
    console.log("should render here but I don't want it");

    if(this.refresh){
      this.refreshEverything(this.variables.date);
    }

    this.refresh = !this.refresh;

    return false;
  }

  refreshDate(newDay){
    this.acceso.getAnyLiturgic(
      newDay.getFullYear(),
      newDay.getMonth(),
      newDay.getDate(),
      (current, tomorrow) => {
        var celType = this.getCelType("BaD", current); //TODO: HC, cal agafarho de settings
        this.variables.celType = celType;
        this.variables.date = newDay;

        this.liturgicProps.LITURGIA = null;

        this.liturgicProps.tempsespecific = current.tempsespecific;
        this.liturgicProps.LT = current.temps;
        this.liturgicProps.cicle = current.cicle; //1-4
        this.liturgicProps.setmana = current.NumSet; //Ordinari: 1-34, pasqua: 2-7 i quaresma: 1-5 o 2-7
        this.liturgicProps.ABC = current.anyABC;

        this.liturgicProps.tempsespecific2 = tomorrow.tempsespecific;
        this.liturgicProps.LT2 = tomorrow.temps;
        this.liturgicProps.cicle2 = tomorrow.cicle; //1-4
        this.liturgicProps.setmana2 = tomorrow.NumSet; //Ordinari: 1-34, pasqua: 2-7 i quaresma: 1-5 o 2-7
        this.liturgicProps.ABC2 = tomorrow.anyABC;

        if(this.SOUL === undefined)
          this.SOUL = new SOUL(this.variables, this.liturgicProps, this);
        else
          this.SOUL.makeQueryies(newDay, this.liturgicProps, this.variables.invitatori, this);
      }
    );
  }

  setSoul(liturgia){
    this.liturgicProps.LITURGIA = liturgia;
    this.forceUpdate();
  }

  render() {
    console.log("RENDER!!!");
    return (
      <View style={styles.container}>
        <Image source={require('../img/bg/fons4.jpg')} style={styles.backgroundImage}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Diòcesi de {this.variables.diocesi} - {this.variables.date.getDate() < 10 ? `0${this.variables.date.getDate()}` : this.variables.date.getDate()}/{this.variables.date.getMonth()+1 < 10 ? `0${this.variables.date.getMonth()+1}` : this.variables.date.getMonth()+1}/{this.variables.date.getFullYear()}</Text>
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
          <View style={styles.santContainer}>
            <TouchableOpacity activeOpacity={1.0} style={styles.buttonSantContainer} onPress={this.onSantPress.bind(this)}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 20, justifyContent: 'center'}}>
                  <Text style={styles.santText}>{"Santa Perpètua i Santa Felicitat"}</Text>
                </View>
                <View style={{flex: 1, paddingRight: 10, justifyContent: 'center'}}>
                  {/*this.state.santPressed*/ false ?
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

          {/*this.state.santPressed*/ false ?
            <View style={styles.liturgiaContainer}>
              <Text style={styles.santExText}>Les santes Perpètua i Felicitat (mort a Cartago, 7 de març de 203) eren dues noies cristianes que van morir màrtir sota l'imperi de Septimi Sever (193 - 211) juntament amb Satur, Revocat, Sadurní i Secundí. Tots sis són venerats com a sants en certes branques de la cristiandat.</Text>
              <Text style={styles.santExText}/>
              {this.liturgiaComponent.bind(this)}
            </View>
            :
            <View style={styles.liturgiaContainer}>
              <Liturgia
                navigator={this.props.navigator}
                date={this.variables.date}
                liturgicProps={this.liturgicProps}
              />
            </View>
          }
        </Image>
      </View>
    )
  }

  liturgiaComponent(){
    return(
      <Liturgia
        navigator={this.props.navigator}
        date={this.variables.date}
        liturgicProps={this.liturgicProps}
      />
    )
  }

  onSantPress(){
    var newDay = new Date();
    newDay.setDate(this.variables.date.getDate()-1); //1-31
    //this.setState({santPressed: !this.state.santPressed});
    this.refreshDate(newDay);
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

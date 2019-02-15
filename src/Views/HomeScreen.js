import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Switch
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import GLOBAL from "../Globals/Globals";

function paddingBar() {
  /*if(Platform.OS === 'ios'){
    var DeviceInfo = require('react-native-device-info');
    var iosVer = parseInt(DeviceInfo.getSystemVersion());
    if(iosVer>=11) return 44;
    return 64;
  }*/
  return 0; //54;
}

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.switchValue = G_VALUES.lliures;
  }

  tempsName(t) {
    try {
      if (!t) return "";
      if (t === 'Ordinari') {
        return "Durant l'any";
      }
      return t;
    }
    catch (error) {
      console.log("[Error]", error);
      return null;
    }
  }

  liturgicPaint(string, color) {
    try {
      switch (color) {
        case 'B':
          return (<Text style={{ color: 'rgb(242, 242, 242)' }}>{string}</Text>);
          break;
        case 'V':
          return (<Text style={{ color: 'rgb(0, 102, 0)' }}>{string}</Text>);
          break;
        case 'R':
          return (<Text style={{ color: 'rgb(192, 57, 43)' }}>{string}</Text>);
          break;
        case 'M':
          return (<Text style={{ color: 'rgb(134, 45, 134)' }}>{string}</Text>);
          break;
        default:
          return (<Text style={{ color: '#c0392b' }}>{string}</Text>);
      }
    }
    catch (error) {
      console.log("[Error]", error);
      return null;
    }
  }

  romanize(num) {
    try {
      if (!+num)
        return false;
      var digits = String(+num).split(""),
        key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
          "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
          "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
        roman = "",
        i = 3;
      while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
      return Array(+digits.join("") + 1).join("M") + roman;
    }
    catch (error) {
      console.log("[Error]", error);
      return null;
    }
  }

  transfromCelTypeName(CT, t) {
    try {
      memLliureColor = '#333333';
      if ((this.props.ViewData.celebracio.type === 'L' || this.props.ViewData.celebracio.type === 'V') && !G_VALUES.lliures) memLliureColor = '#595959';

      switch (CT) {
        case 'F':
          return (<Text style={styles.celebracioType}>{"Festa"}</Text>);
          break;
        case 'S':
          return (<Text style={styles.celebracioType}>{"Solemnitat"}</Text>);
          break;
        case 'M':
          if (t === 'Quaresma')
            return (<Text style={styles.celebracioType}>{"Commemoració"}</Text>);
          return (<Text style={styles.celebracioType}>{"Memòria obligatòria"}</Text>);
          break;
        case 'V':
        case 'L':
          if (t === 'Quaresma')
            return (<Text style={{
              textAlign: 'center',
              color: memLliureColor,
              fontSize: 13,
              fontWeight: '300'
            }}>
              {"Commemoració"}</Text>);
          return (<Text style={{
            textAlign: 'center',
            color: memLliureColor,
            fontSize: 13,
            fontWeight: '300'
          }}>
            {"Memòria lliure"}</Text>);
          break;
      }
      return null;
    }
    catch (error) {
      console.log("[Error]", error);
      return null;
    }
  }

  weekDayName(num) {
    try {
      switch (num) {
        case 0:
          return ("Diumenge");
          break;
        case 1:
          return ("Dilluns");
          break;
        case 2:
          return ("Dimarts");
          break;
        case 3:
          return ("Dimecres");
          break;
        case 4:
          return ("Dijous");
          break;
        case 5:
          return ("Divendres");
          break;
        case 6:
          return ("Dissabte");
          break;
      }
    }
    catch (error) {
      console.log("[Error]", error);
      return null;
    }
  }

  onSwitchValueChange(value) {
    try {
      this.switchValue = value;
      this.forceUpdate();
      this.props.lliureCB(value);
    }
    catch (error) {
      console.log("[Error]", error);
      return null;
    }
  }

  On_Give_Press() {
    try {
      console.log("Give pressed");
    }
    catch (error) {
      console.log("[Error]", error);
      return null;
    }
  }

  On_Comment_Press() {
    try {
      console.log("Comment pressed");
    }
    catch (error) {
      console.log("[Error]", error);
      return null;
    }
  }

  /*whole return:
        <View style={styles.container}>
          <ImageBackground source={require('../Globals/img/bg/currentbg.jpg')} style={styles.backgroundImage}>
            {this.Top_Info(date_getdate, date_getmonth, date_getfullyear)}
            {this.Info_Liturgica(date_getday)}
            {this.Cel_Info()}
          </ImageBackground>
        </View>
  */

  render() {
    try {
      var date_getdate = G_VALUES.date.getDate();
      var date_getmonth = G_VALUES.date.getMonth();
      var date_getfullyear = G_VALUES.date.getFullYear();
      var date_getday = G_VALUES.date.getDay();
      this.switchValue = G_VALUES.lliures;
      return (
        <View style={styles.container}>
          {this.Top_Info(date_getdate, date_getmonth, date_getfullyear)}
          {this.Info_Liturgica(date_getday)}
          {this.Cel_Info()}
        </View>
      )
    }
    catch (error) {
      console.log("[Error]", error);
      return null;
    }
  }

  Top_Info(date_getdate, date_getmonth, date_getfullyear) {
    try {
      return (
        <View style={this.props.ViewData.celebracio.titol !== '-' ? styles.infoContainer_cel : styles.infoContainer}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
            <Text style={styles.infoText}>{this.props.ViewData.lloc.diocesiName}{" ("}{this.props.ViewData.lloc.lloc}{")"}
              {" - "}<Text style={styles.infoText}>{date_getdate < 10 ? `0${date_getdate}` : date_getdate}/{date_getmonth + 1 < 10 ? `0${date_getmonth + 1}` : date_getmonth + 1}/{date_getfullyear}</Text>
            </Text>
          </View>
        </View>
      )
    }
    catch (error) {
      console.log("[Error]", error);
      return null;
    }
  }

  Info_Liturgica(date_getday) {
    try {
      return (
        <View style={styles.diaLiturgicContainer}>
          <Text style={styles.diaLiturgicText}>
            {
              this.props.ViewData.setmana !== '0' && this.props.ViewData.setmana !== '.' ?
                this.weekDayName(date_getday) + " de la setmana "
                :
                null
            }
            {
              this.props.ViewData.setmana !== '0' && this.props.ViewData.setmana !== '.' ?
                this.liturgicPaint(this.romanize(this.props.ViewData.setmana), this.props.ViewData.color)
                :
                null
            }
          </Text>
          <Text style={styles.diaLiturgicText}>
            {"Temps - "}
            {this.liturgicPaint(this.tempsName(this.props.ViewData.temps), this.props.ViewData.color)}
          </Text>
          <Text style={styles.diaLiturgicText}>
            {
              this.props.ViewData.setCicle !== '0' && this.props.ViewData.setCicle !== '.' ?
                "Setmana "
                :
                null
            }
            {
              this.props.ViewData.setCicle !== '0' && this.props.ViewData.setCicle !== '.' ?
                this.liturgicPaint(this.romanize(this.props.ViewData.setCicle), this.props.ViewData.color)
                :
                null
            }
            {
              this.props.ViewData.setCicle !== '0' && this.props.ViewData.setCicle !== '.' ?
                " del cicle litúrgic, any "
                :
                null
            }
            {
              this.props.ViewData.setCicle !== '0' && this.props.ViewData.setCicle !== '.' ?
                this.liturgicPaint(this.props.ViewData.anyABC, this.props.ViewData.color)
                :
                null
            }
          </Text>
        </View>
      )
    }
    catch (error) {
      console.log("[Error]", error);
      return null;
    }
  }

  Cel_Info() {
    try {
      arrowWidth = 35;
      auxPadding = 10;
      if ((this.props.ViewData.celebracio.type === 'L' || this.props.ViewData.celebracio.type === 'V')) {
        arrowWidth = 65;
        auxPadding = 0;
      }

      santTextColor = 'black';
      arrowColor = 'black';
      santContainerOpa = 0.8;
      if ((this.props.ViewData.celebracio.type === 'L' || this.props.ViewData.celebracio.type === 'V') && !G_VALUES.lliures) {
        santTextColor = '#404040';
        arrowColor = '#595959';
        santContainerOpa = 0.75;
      }

      return (
        <View style={styles.cel_container}>
          {this.props.ViewData.ready && this.props.ViewData.celebracio.titol !== '-' ?
            <View style={{ paddingBottom: 5 }}>
              {this.transfromCelTypeName(this.props.ViewData.celebracio.type, this.props.ViewData.temps)}
            </View>
            : null
          }

          {this.props.ViewData.ready && this.props.ViewData.celebracio.titol !== '-' ?
            <View style={{
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
              opacity: santContainerOpa,
            }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                {(this.props.ViewData.celebracio.type === 'L' || this.props.ViewData.celebracio.type === 'V') ?
                  <View style={{ flex: 1, minWidth: 45, justifyContent: 'center', alignItems: 'center' }}>
                    <Switch
                      onValueChange={this.onSwitchValueChange.bind(this)}
                      value={this.switchValue}
                      onTintColor={GLOBAL.switchColor}
                    />
                  </View>
                  : null
                }
                <TouchableOpacity activeOpacity={1.0} style={{ flex: 20, flexDirection: 'row' }} onPress={this.props.santCB}>
                  {this.props.ViewData.celebracio.text !== '-' && this.props.ViewData.celebracio.type !== 'L' ?
                    <View style={{ width: arrowWidth }} />
                    : null}
                  <View style={{ flex: 1, justifyContent: 'center', paddingRight: auxPadding }}>
                    <Text numberOfLines={2} style={{
                      color: santTextColor,
                      textAlign: 'center',
                      fontSize: 17,
                      fontWeight: '300'
                    }}>
                      {this.props.ViewData.celebracio.titol}</Text>
                  </View>
                  {this.props.ViewData.celebracio.text !== '-' ?
                    <View style={{ width: arrowWidth, justifyContent: 'center', alignItems: 'center' }}>
                      {this.props.santPressed ?
                        <Icon
                          name="ios-arrow-down"
                          size={25}
                          color={arrowColor} />
                        :
                        <Icon
                          name="ios-arrow-forward-outline"
                          size={25}
                          iconStyle={{ padding: 50 }}
                          color={arrowColor} />
                      }
                    </View>
                    :
                    <View>
                      {(this.props.ViewData.celebracio.type === 'L' || this.props.ViewData.celebracio.type === 'V') ?
                        <View style={{ width: 45 }}></View>
                        : null
                      }
                    </View>
                  }
                </TouchableOpacity>
              </View>
            </View>

            : null}

          {this.props.santPressed && this.props.ViewData.celebracio.text !== '-' ?
            <View style={styles.liturgiaContainer}>
              <ScrollView>
                <Text style={{
                  textAlign: 'center',
                  color: santTextColor,
                  fontSize: 17,
                  fontWeight: '300'
                }}>
                  {this.props.ViewData.celebracio.text}</Text>
                <Text />
              </ScrollView>
            </View>
            :
            <View style={styles.liturgiaContainer}>
              {this.Two_Buttons()}
            </View>
          }
        </View>
      )
    }
    catch (error) {
      console.log("[Error]", error);
      return null;
    }
  }

  Two_Buttons() {
    try {
      return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <TouchableOpacity style={styles.two_buttons} onPress={this.On_Comment_Press.bind(this)}>
              <Icon
                name="ios-mail-outline"
                size={90}
                color={'#424242'} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <TouchableOpacity style={styles.two_buttons} onPress={this.On_Give_Press.bind(this)}>
              <Icon
                name="ios-card-outline"
                size={90}
                color={'#424242'} />
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    catch (error) {
      console.log("[Error]", error);
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: paddingBar(),
    backgroundColor: 'white'//GLOBAL.backgroundColor,
  },
  /*backgroundImage: {
    flex: 1,
    backgroundColor: 'transparent',
    width: null,
    height: null,
  },*/







  infoContainer: {
    flex: 1.3, //0.3 ok per festa
    justifyContent: 'flex-end',
    paddingTop: 5,
    //backgroundColor: 'red',
  },
  infoContainer_cel: {
    flex: 0.3,
    justifyContent: 'flex-end',
    paddingTop: 5,
    //backgroundColor: 'red',
  },
  diaLiturgicContainer: {
    flex: 1,
    justifyContent: 'center',
    shadowOpacity: 0.3,
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 10
    },
    //backgroundColor: 'silver',
  },
  cel_container: {
    flex: 2.5,
    justifyContent: 'flex-end',
    paddingTop: 5,
    //backgroundColor: 'blue',
  },




  two_buttons: {
    shadowOpacity: 0.2,
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 10
    },
  },
  diaLiturgicText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: '300'
  },
  infoText: {
    textAlign: 'center',
    color: '#424242',
    fontSize: 17,
    fontStyle: 'italic',
    fontWeight: '300'
  },
  celebracioType: {
    textAlign: 'center',
    color: '#333333',
    //fontStyle: 'italic',
    fontSize: 16,
    fontWeight: '300'
  },
  liturgiaContainer: {
    flex: 4,
    marginBottom: 10,
    marginHorizontal: 10,
  },
});

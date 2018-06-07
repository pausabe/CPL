import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Switch
 } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from 'react-native-modal-datetime-picker';

import LHButtons from './LHButtons';
import GLOBAL from "../../Globals/Globals";

function paddingBar(){
  if(Platform.OS === 'ios'){
    var DeviceInfo = require('react-native-device-info');
    var iosVer = parseInt(DeviceInfo.getSystemVersion());
    if(iosVer>=11) return 44;
    return 64;
  }
  return 0; //54;
}

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.switchValue = props.variables.lliures;
  }

  dacordString(){
    return "D'acord";
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

  romanize(num){
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

  transfromCelTypeName(CT, t){
    memLliureColor = '#333333';
    if((this.props.ViewData.celebracio.type==='L' || this.props.ViewData.celebracio.type==='V') && !this.props.variables.lliures) memLliureColor = '#595959';

    switch (CT) {
      case 'F':
        return (<Text style={styles.celebracioType}>{"Festa"}</Text>);
        break;
      case 'S':
        return (<Text style={styles.celebracioType}>{"Solemnitat"}</Text>);
        break;
      case 'M':
        if(t === 'Quaresma')
          return (<Text style={styles.celebracioType}>{"Commemoració"}</Text>);
        return (<Text style={styles.celebracioType}>{"Memòria obligatòria"}</Text>);
        break;
      case 'V':
      case 'L':
        if(t === 'Quaresma')
          return (<Text style={{
                        textAlign: 'center',
                        color: memLliureColor,
                        fontSize: 13,
                        fontWeight: '300'}}>
                  {"Commemoració"}</Text>);
        return (<Text style={{
                      textAlign: 'center',
                      color: memLliureColor,
                      fontSize: 13,
                      fontWeight: '300'}}>
                  {"Memòria lliure"}</Text>);
        break;
    }
    return null;
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

  onSwitchValueChange(value){
    this.switchValue = value;
    this.forceUpdate();
    this.props.lliureCB(value);
  }

  render() {
    this.switchValue = this.props.variables.lliures;

    arrowWidth = 35;
    auxPadding = 10;
    if((this.props.ViewData.celebracio.type==='L' || this.props.ViewData.celebracio.type==='V')){
      arrowWidth = 65;
      auxPadding = 0;
    }

    santTextColor = 'black';
    arrowColor = 'black';
    santContainerOpa = 0.8;
    if((this.props.ViewData.celebracio.type==='L' || this.props.ViewData.celebracio.type==='V') && !this.props.variables.lliures){
      santTextColor = '#404040';
      arrowColor = '#595959';
      santContainerOpa = 0.75;
    }
    return (
      <View style={styles.container}>
       <ImageBackground source={require('../../Globals/img/bg/currentbg.jpg')} style={styles.backgroundImage}>
         <View style={styles.infoContainer}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center',}}>
              <Text style={styles.infoText}>{this.props.ViewData.lloc.diocesiName}{" ("}{this.props.ViewData.lloc.lloc}{")"}
                {" - "}<Text style={styles.infoText}>{this.props.ViewData.data.getDate() < 10 ? `0${this.props.ViewData.data.getDate()}` : this.props.ViewData.data.getDate()}/{this.props.ViewData.data.getMonth()+1 < 10 ? `0${this.props.ViewData.data.getMonth()+1}` : this.props.ViewData.data.getMonth()+1}/{this.props.ViewData.data.getFullYear()}</Text>
              </Text>
            </View>
         </View>
         <View style={styles.diaLiturgicContainer}>
           <Text style={styles.diaLiturgicText}>
             {
               this.props.ViewData.setmana !== '0' && this.props.ViewData.setmana !== '.'?
                 this.weekDayName(this.props.ViewData.data.getDay())+" de la setmana "
               :
                 null
             }
             {
               this.props.ViewData.setmana !== '0'  && this.props.ViewData.setmana !== '.'?
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
              this.props.ViewData.setCicle !== '0' && this.props.ViewData.setCicle !== '.'?
                "Setmana "
              :
                null
            }
            {
              this.props.ViewData.setCicle !== '0' && this.props.ViewData.setCicle !== '.'?
                this.liturgicPaint(this.romanize(this.props.ViewData.setCicle), this.props.ViewData.color)
              :
                null
            }
            {
              this.props.ViewData.setCicle !== '0' && this.props.ViewData.setCicle !== '.'?
                " del cicle litúrgic, any "
              :
                null
            }
            {
              this.props.ViewData.setCicle !== '0' && this.props.ViewData.setCicle !== '.'?
              this.liturgicPaint(this.props.ViewData.anyABC, this.props.ViewData.color)
              :
                null
            }
          </Text>
         </View>
         {this.props.ViewData.ready && this.props.ViewData.celebracio.titol !== '-' ?
         <View style={{paddingBottom: 5}}>
           {this.transfromCelTypeName(this.props.ViewData.celebracio.type, this.props.ViewData.temps)}
         </View>
         : null}

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
             <View style={{flex: 1, flexDirection: 'row'}}>
               {(this.props.ViewData.celebracio.type==='L' || this.props.ViewData.celebracio.type==='V')?
                 <View style={{flex:1, minWidth: 45, justifyContent: 'center', alignItems: 'center'}}>
                   <Switch
                     onValueChange={this.onSwitchValueChange.bind(this)}
                     value={this.switchValue}
                     onTintColor={GLOBAL.switchColor}
                   />
                 </View>
                 : null
               }
               <TouchableOpacity activeOpacity={1.0} style={{flex: 20, flexDirection: 'row'}} onPress={this.props.santCB}>
                  {this.props.ViewData.celebracio.text !== '-' && this.props.ViewData.celebracio.type !== 'L'?
                    <View style={{width: arrowWidth}}/>
                  :null}
                   <View style={{flex: 1, justifyContent: 'center', paddingRight: auxPadding}}>
                     <Text numberOfLines={2} style={{
                                              color: santTextColor,
                                              textAlign: 'center',
                                              fontSize: 16,
                                              fontWeight: '300'}}>
                              {this.props.ViewData.celebracio.titol}</Text>
                   </View>
                   {this.props.ViewData.celebracio.text !== '-' ?
                    <View style={{width: arrowWidth, justifyContent: 'center', alignItems: 'center'}}>
                      {this.props.santPressed ?
                        <Icon
                          name="ios-arrow-down"
                          size={25}
                          color={arrowColor}/>
                        :
                        <Icon
                          name="ios-arrow-forward-outline"
                          size={25}
                          iconStyle={{padding: 50}}
                          color={arrowColor}/>
                      }
                    </View>
                    :
                    <View>
                      {(this.props.ViewData.celebracio.type==='L' || this.props.ViewData.celebracio.type==='V')?
                        <View style={{width:45}}></View>
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
                     fontSize: 16,
                     fontWeight: '300'
                   }}>
               {this.props.ViewData.celebracio.text}</Text>
             <Text />
            </ScrollView>
           </View>
           :
           <View style={styles.liturgiaContainer}>
             <LHButtons
               ViewData={this.props.ViewData}
               variables={this.props.variables}
               oficiCB={this.props.oficiCB}
               laudesCB={this.props.laudesCB}
               terciaCB={this.props.terciaCB}
               sextaCB={this.props.sextaCB}
               nonaCB={this.props.nonaCB}
               vespresCB={this.props.vespresCB}
               completesCB={this.props.completesCB}/>
           </View>
         }
       </ImageBackground>
     </View>
    )
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

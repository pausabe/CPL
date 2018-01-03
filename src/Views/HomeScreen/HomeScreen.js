import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  ImageBackground,
  BackAndroid,
  ScrollView,
  TouchableOpacity,
 } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from 'react-native-modal-datetime-picker';

import LHButtons from './LHButtons';
import GLOBAL from "../../Globals/Globals";

function paddingBar(){
  if(Platform.OS === 'ios'){
    return 64;
  }
  return 0; //54;
}

export default class HomeScreen extends Component {
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

  render() {
    auxPadding = 5;
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
           <Text style={styles.diaLiturgicText}>{this.weekDayName(this.props.ViewData.data.getDay())}{this.props.ViewData.setmana !== '0' ? " de la setmana " : null}
             {this.props.ViewData.setmana !== '0' ? this.liturgicPaint(this.romanize(this.props.ViewData.setmana), this.props.ViewData.color) : null }</Text>
           <Text style={styles.diaLiturgicText}>{"Temps - "}{this.liturgicPaint(this.tempsName(this.props.ViewData.temps), this.props.ViewData.color)}</Text>
           <Text style={styles.diaLiturgicText}>{"Setmana "}{this.liturgicPaint(this.romanize(this.props.ViewData.setCicle), this.props.ViewData.color)}
            {" del cicle litúrgic, any "}{this.liturgicPaint(this.props.ViewData.anyABC, this.props.ViewData.color)}</Text>
         </View>
         {this.props.ViewData.ready && this.props.ViewData.celebracio.titol !== '-' ?
         <View style={{paddingBottom: 5}}>
           {this.transfromCelTypeName(this.props.ViewData.celebracio.type, this.props.ViewData.temps)}
         </View>
         : null}
         {this.props.ViewData.ready && this.props.ViewData.celebracio.titol !== '-' ?
           <View style={styles.santContainer}>
             <TouchableOpacity activeOpacity={1.0} style={styles.buttonSantContainer} onPress={this.props.santCB}>
               <View style={{flex: 1, flexDirection: 'row', paddingRight: auxPadding}}>
                 <View style={{flex: 20, justifyContent: 'center', paddingRight: (auxPadding*2)}}>
                   <Text numberOfLines={2} style={styles.santText}>{this.props.ViewData.celebracio.titol}</Text>
                 </View>
                 <View style={{flex: 1, justifyContent: 'center'}}>
                 {this.props.ViewData.celebracio.text !== '-' ?
                  <View>
                  {this.props.santPressed ?
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

          {this.props.santPressed && this.props.ViewData.celebracio.text !== '-' ?
           <View style={styles.liturgiaContainer}>
            <ScrollView>
             <Text style={styles.santExText}>{this.props.ViewData.celebracio.text}</Text>
             <Text style={styles.santExText}/>
            </ScrollView>
           </View>
           :
           <View style={styles.liturgiaContainer}>
             <LHButtons
               ViewData={this.props.ViewData}
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

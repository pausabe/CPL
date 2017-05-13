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

    var today = new Date();

    this.state = {
      santPressed: false,
      monthDay: 7,//today.getDate(), //1-31
      month: 2,//today.getMonth(), //0-11
      year: 2017,//today.getFullYear(), //xxxx
      hour: 7,//today.getHours(), //0-23
      LT: 'Q_CENDRA', //TODO: pensar com ferho x les vespres (potser: els dissabtes vespres sóndel temps del diumenge seguent)
      weekDay: 0,//today.getDay(), //0-6 (diumenge-dissabte)
      cicle: 3, //HC 1-4 TODO: SOLUCIONAR: vespres dissabte és setmana X o X-1??
      ordinariWeek: 15, //HC 1-34
      pasquaWeek: 5, //HC 2-7
      quaresmaWeek: 3, //HC 1-5 o 2-7
      ABC: 'A',
    }
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
            <Text style={styles.infoText}>Bisbat de Terrassa - 07/03/2017</Text>
          </View>
          <View style={styles.diaLiturgicContainer}>
            <Text style={styles.diaLiturgicText}>Dimarts de la setmana
              <Text style={{color: '#c0392b'}}> I</Text></Text>
            <Text style={styles.diaLiturgicText}>Temps de
              <Text style={{color: '#c0392b'}}> Quaresma</Text></Text>
            <Text style={styles.diaLiturgicText}>Setmana
              <Text style={{color: '#c0392b'}}> I </Text>
              del cicle litúrgic, any
                <Text style={{color: '#c0392b'}}> A</Text></Text>
          </View>
          <View style={styles.santContainer}>
            <TouchableOpacity activeOpacity={1.0} style={styles.buttonSantContainer} onPress={this.onSantPress.bind(this)}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 20, justifyContent: 'center'}}>
                  <Text style={styles.santText}>Santa Perpètua i Santa Felicitat</Text>
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
                        ordinariWeek={this.state.ordinariWeek}
                        pasquaWeek={this.state.pasquaWeek}
                        quaresmaWeek={this.state.quaresmaWeek}
                        LT={this.state.LT}
                        ABC={this.state.ABC}/>
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
                        ordinariWeek={this.state.ordinariWeek}
                        pasquaWeek={this.state.pasquaWeek}
                        quaresmaWeek={this.state.quaresmaWeek}
                        LT={this.state.LT}
                        ABC={this.state.ABC}/>
            </View>
          }
        </Image>
      </View>
    )
  }

  onSantPress(){
    this.setState({santPressed: !this.state.santPressed});
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
  }
})

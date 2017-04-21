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

 import Liturgia from '../Components/Liturgia'
 import Icon from 'react-native-vector-icons/Ionicons'

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

    this.state = {
      santPressed: false,
      hour: today.getHours(),
      day: today.getDay(),
      month: today.getMonth(),
      year: today.getFullYear(),
      cicle: '1',
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
                        day={this.state.day}
                        month={this.state.month}
                        year={this.state.year}/>
            </View>
            :
            <View style={styles.liturgiaContainer}>
              <Liturgia navigator={this.props.navigator}
                        hour={this.state.hour}
                        day={this.state.day}
                        month={this.state.month}
                        year={this.state.year}/>
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

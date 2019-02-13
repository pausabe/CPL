import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import EventEmitter from 'EventEmitter';

import HR from '../../Components/HRComponent';

export default class LDScreen extends Component {
  componentWillMount() {
    this.eventEmitter = new EventEmitter();
  }

  //Callbacks
  On_Button_Pressed(prayer_type, need_lectura2) {
    var params = {
      title: prayer_type,
      props: {
        type: prayer_type,
        emitShareCB: this.emitShare.bind(this),
        events: this.eventEmitter,
        need_lectura2: need_lectura2
      },
    }
    this.props.navigation.navigate('LDDisplay', params);
  }

  emitShare() {
    console.log("emitShare");
  }

  //RENDER
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../Globals/img/bg/currentbg.jpg')} style={styles.backgroundImage}>
          <View style={styles.liturgiaContainer}>
            {this.Buttons(true)}
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  Buttons(need_lectura2) {
    try {
      return (
        <View style={styles.buttons_container}>
          <TouchableOpacity style={styles.buttonContainer} onPress={this.On_Button_Pressed.bind(this, "1Lect", need_lectura2)}>
            <Text style={styles.buttonText}>{"Primera lectura"}</Text>
          </TouchableOpacity>
          <HR />
          <TouchableOpacity style={styles.buttonContainer} onPress={this.On_Button_Pressed.bind(this, "Salm", need_lectura2)}>
            <Text style={styles.buttonText}>{"Salm"}</Text>
          </TouchableOpacity>
          <HR />
          {need_lectura2 ?
            <View style={{ flex: 1 }}>
              <TouchableOpacity style={styles.buttonContainer} onPress={this.On_Button_Pressed.bind(this, "2Lect", need_lectura2)}>
                <Text style={styles.buttonText}>{"Segona lectura"}</Text>
              </TouchableOpacity>
              <HR />
            </View>
            : null}
          <TouchableOpacity style={styles.buttonContainer} onPress={this.On_Button_Pressed.bind(this, "Evangeli", need_lectura2)}>
            <Text style={styles.buttonText}>{"Evangeli"}</Text>
          </TouchableOpacity>
        </View>
      )
    }
    catch (error) {
      console.log("Error: ", error);
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  liturgiaContainer: {
    flex: 6,
    /*marginBottom: 10,
    marginHorizontal: 10,*/
    margin: 30,
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: 'transparent',
    width: null,
    height: null,
    //resizeMode: 'cover',
  },
  buttons_container: {
    flex: 1,
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 10
    },
    backgroundColor: 'white',
    opacity: 0.75,
    borderRadius: 15
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 18,
    fontWeight: 'normal'
  },
  buttonTextBold: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 17,
    fontWeight: 'bold',
  },
  horaMenorText: {
    textAlign: 'center',
    color: '#595959',
    fontSize: 16,
    fontWeight: 'normal'
  },
  horaMenorTextBold: {
    textAlign: 'center',
    color: '#595959',
    fontSize: 16,
    fontWeight: 'bold'
  },
  hrstyle: {
    backgroundColor: '#263238',
    height: 4
  },
  redCenter: {
    color: '#FF0000',
    fontSize: 14,
    textAlign: 'center'
  },
})

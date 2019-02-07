import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import HR from '../../Components/HRComponent';

export default class LDScreen extends Component {

  //Callbacks
  On_Button_Pressed(prayer_type){
    console.log("Pressed " + prayer_type + " prayer");
  }

  //RENDER
  render() {
    return (
      <View style={styles.container}>
        <Text>{"Litúrgia diària"}</Text>
        {this.Buttons(true)}
      </View>
    );
  }

  Buttons(need_2lectura) {
    return (
      <View style={styles.buttons_container}>
        <TouchableOpacity style={styles.buttonContainer} onPress={this.On_Button_Pressed.bind(this, "1Lect")}>
          <Text style={styles.buttonText}>{"Primera lectura"}</Text>
        </TouchableOpacity>
        <HR />
        <TouchableOpacity style={styles.buttonContainer} onPress={this.On_Button_Pressed.bind(this, "Salm")}>
          <Text style={styles.buttonText}>{"Salm"}</Text>
        </TouchableOpacity>
        <HR />
        {need_2lectura ?
          <View style={{flex: 1}}>
            <TouchableOpacity style={styles.buttonContainer} onPress={this.On_Button_Pressed.bind(this, "2Lect")}>
              <Text style={styles.buttonText}>{"Segona lectura"}</Text>
            </TouchableOpacity>
            <HR />
          </View>
          : null}
          <TouchableOpacity style={styles.buttonContainer} onPress={this.On_Button_Pressed.bind(this, "Evangeli")}>
          <Text style={styles.buttonText}>{"Evangeli"}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

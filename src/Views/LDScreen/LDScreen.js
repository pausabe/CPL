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
          <View style={styles.liturgiaContainer}>
            {this.Buttons(true)}
          </View>
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
          <HR margin_horizontal={20}/>
          <TouchableOpacity style={styles.buttonContainer} onPress={this.On_Button_Pressed.bind(this, "Salm", need_lectura2)}>
            <Text style={styles.buttonText}>{"Salm"}</Text>
          </TouchableOpacity>
          <HR margin_horizontal={20}/>
          {need_lectura2 ?
            <View style={{ flex: 1 }}>
              <TouchableOpacity style={styles.buttonContainer} onPress={this.On_Button_Pressed.bind(this, "2Lect", need_lectura2)}>
                <Text style={styles.buttonText}>{"Segona lectura"}</Text>
              </TouchableOpacity>
              <HR margin_horizontal={20}/>
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
    backgroundColor:'white',
    //backgroundColor: 'rgb(215, 215, 215)'
  },
  liturgiaContainer: {
    flex: 6,
    marginVertical: 70,
    marginHorizontal: 30,
  },
  /*backgroundImage: {
    flex: 1,
    backgroundColor: 'transparent',
    width: null,
    height: null,
  },*/
  buttons_container: {
    flex: 1,
    /*shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 10
    },
    opacity: 0.75,*/
    backgroundColor: 'white',
    borderRadius: 15,
    borderColor: '#424242',
    borderWidth: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: 'normal'
  },
})

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

const VESPERS_SELECTOR_TYPES = {
  NORMAL: 'normal',
  VESPERS: 'vespers'
}

export default class LDScreen extends Component {
  //PREVIEWS --------------------------------------------------------------------------
  componentWillMount() {
    this.eventEmitter = new EventEmitter();
  }

  componentDidMount() {
    this.props.navigation.setParams({
      Refresh_LD: this.Refresh_Layout.bind(this),
    });
  }

  Refresh_Layout() {
    this.setState({
      need_lectura2: !LD_VALUES.VetllaPasqua && (!LD_VALUES.Vespers && LD_VALUES.Lectura2 != '-' || (LD_VALUES.Vespers && G_VALUES.date.getHours() >= 18 && LD_VALUES.Lectura2Vespers != '-'))
    });

    this.CURRENT_VESPERS_SELECTOR = !LD_VALUES.VetllaPasqua && (LD_VALUES.Vespers && G_VALUES.date.getHours() >= 18 && LD_VALUES.Lectura2Vespers != '-');
  }

  //CONSTRUCTOR --------------------------------------------------------------------------
  constructor(props) {
    super(props);

  }

  //CALLBACKS ----------------------------------------------------------------------------
  On_Button_Pressed(prayer_type, need_lectura2) {
    var title = prayer_type;

    switch (prayer_type) {
      case "VetllaPasquaLecturesSalms":
        title = "Lectures i salms";
        break;
      case "VetllaPasquaEvangeli":
        title = "Evangeli";
        break;
      case "Rams":
        title = "Benedicció dels Rams";
        break;
      case "1Lect":
        title = "Primera lectura";
        break;
      case "2Lect":
        title = "Segona lectura";
        break;
    }

    var params = {
      title: title,
      props: {
        type: prayer_type,
        emitShareCB: this.emitShare.bind(this),
        events: this.eventEmitter,
        need_lectura2: need_lectura2,
        useVespersTexts: this.CURRENT_VESPERS_SELECTOR == VESPERS_SELECTOR_TYPES.VESPERS
      },
    }
    this.props.navigation.navigate('LDDisplay', params);
  }

  emitShare() {
    console.log("emitShare");
  }

  //RENDER -------------------------------------------------------------------------------
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../Globals/img/bg/home_background.jpg')} style={styles.backgroundImage} blurRadius={5}>
          {LD_VALUES.Vespers == undefined ?
            null :
            <View style={{ flex: 1 }}>
              {this.VespersSelector()}
              <View style={this.state.need_lectura2 ? styles.liturgiaContainer_need_lectura2 : styles.liturgiaContainer}>
                {this.Buttons(this.state.need_lectura2)}
              </View>
            </View>
          }
        </ImageBackground>
      </SafeAreaView>
    );
  }

  VespersSelector() {
    try {
      if (LD_VALUES.Vespers) {
        return (
          <View style={{ flex: 2, flexDirection: 'row' }}>
            <TouchableOpacity onPress={this.OnNormalPressed.bind(this)}>
              <Text style={styles.buttonText}>{"Normal   "}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.OnVespersPressed.bind(this)}>
              <Text style={styles.buttonText}>{"   Vespres"}</Text>
            </TouchableOpacity>
          </View>
        );
      }
      else {
        return null;
      }
    }
    catch (error) {
      console.log("Error: ", error);
      return null;
    }
  }

  OnNormalPressed() {
    try {
      this.CURRENT_VESPERS_SELECTOR = VESPERS_SELECTOR_TYPES.NORMAL;
      this.setState({ need_lectura2: LD_VALUES.Lectura2 != '-' })
    }
    catch (error) {
      console.log("Error: ", error);
      return null;
    }
  }

  OnVespersPressed() {
    try {
      this.CURRENT_VESPERS_SELECTOR = VESPERS_SELECTOR_TYPES.VESPERS;
      this.setState({ need_lectura2: LD_VALUES.Lectura2Vespers != '-' })
    }
    catch (error) {
      console.log("Error: ", error);
      return null;
    }
  }

  Buttons(need_lectura2) {
    try {
      return (
        <View style={styles.buttons_container}>
          {LD_VALUES.VetllaPasqua ?
            <View style={{ flex: 1 }}>
              <TouchableOpacity style={styles.buttonContainer} onPress={this.On_Button_Pressed.bind(this, "VetllaPasquaLecturesSalms", need_lectura2)}>
                <Text style={styles.buttonText}>{"Lectures i salms"}</Text>
              </TouchableOpacity>
              <HR margin_horizontal={20} />
              <TouchableOpacity style={styles.buttonContainer} onPress={this.On_Button_Pressed.bind(this, "VetllaPasquaEvangeli", need_lectura2)}>
                <Text style={styles.buttonText}>{"Evangeli"}</Text>
              </TouchableOpacity>
              <HR margin_horizontal={20} />
            </View>
            :
            <View style={{ flex: 1 }}>
              {G_VALUES.LT == 'Q_DIUM_RAMS' ?
                <View style={{ flex: 1 }}>
                  <TouchableOpacity style={styles.buttonContainer} onPress={this.On_Button_Pressed.bind(this, "Rams", need_lectura2)}>
                    <Text style={styles.buttonText}>{"Benedicció dels Rams"}</Text>
                  </TouchableOpacity>
                  <HR margin_horizontal={20} />
                </View>
                :
                null}
              <TouchableOpacity style={styles.buttonContainer} onPress={this.On_Button_Pressed.bind(this, "1Lect", need_lectura2)}>
                <Text style={styles.buttonText}>{"Primera lectura"}</Text>
              </TouchableOpacity>
              <HR margin_horizontal={20} />
              <TouchableOpacity style={styles.buttonContainer} onPress={this.On_Button_Pressed.bind(this, "Salm", need_lectura2)}>
                <Text style={styles.buttonText}>{"Salm"}</Text>
              </TouchableOpacity>
              <HR margin_horizontal={20} />
              {need_lectura2 ?
                <View style={{ flex: 1 }}>
                  <TouchableOpacity style={styles.buttonContainer} onPress={this.On_Button_Pressed.bind(this, "2Lect", need_lectura2)}>
                    <Text style={styles.buttonText}>{"Segona lectura"}</Text>
                  </TouchableOpacity>
                  <HR margin_horizontal={20} />
                </View>
                : null}
              <TouchableOpacity style={styles.buttonContainer} onPress={this.On_Button_Pressed.bind(this, "Evangeli", need_lectura2)}>
                <Text style={styles.buttonText}>{"Evangeli"}</Text>
              </TouchableOpacity>
            </View>
          }
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
    backgroundColor: 'white',
    //backgroundColor: 'rgb(215, 215, 215)'
  },
  liturgiaContainer: {
    flex: 6,
    marginVertical: 100,
    marginHorizontal: 30,
  },
  liturgiaContainer_need_lectura2: {
    flex: 6,
    marginVertical: 70,
    marginHorizontal: 30,
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: 'rgb(5, 169, 176)',
    width: null,
    height: null,
  },
  buttons_container: {
    flex: 1,
    /*shadowOpacity: 0.4,
    shadowRadius: 5,
shadowOffset: {
      width: 0,
    height: 10
  },
  */
    opacity: 0.75,
    backgroundColor: 'white',
    borderRadius: 15,
    //borderColor: '#424242',
    //borderWidth: 1,
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

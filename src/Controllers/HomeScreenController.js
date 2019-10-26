import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  SafeAreaView
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';
import PopupDialog, {
  DialogTitle,
} from 'react-native-popup-dialog';
import HomeScreen from '../Views/HomeScreen';
import GLOBALS from "../Globals/Globals";
import GF from "../Globals/GlobalFunctions";
import { Reload_All_Data } from './Classes/Data/DataManager.js';
import { TEST_MODE_ON, Reload_All_Data_TestMode, Force_Stop_Test } from '../Tests/TestsManager';

export default class HomeScreenController extends Component {
  UNSAFE_componentWillMount() {
    Icon.getImageSource('ios-share', 30).then((source) => this.setState({ shareIcon: source }));
  }

  componentDidMount() {
    this.props.navigation.setParams({
      calPres: this.calendarPressed.bind(this),
      Refresh_Date: this.Refresh_Date.bind(this),
    });
    BackHandler.addEventListener('hardwareBackPress', this.androidBack.bind(this));
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.androidBack.bind(this));
  }

  androidBack() {
    if (this.state.santPressed && this.state.ViewData.celebracio.text !== '-') {
      this.setState({ santPressed: false });
      return true;
    }
    return false;
  }

  static navigationOptions = ({ navigation }) => ({
    headerLeft: <TouchableOpacity
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}
      onPress={() => navigation.state.params.calPres()}>
      <View style={{ flex: 1, paddingLeft: 10, alignItems: 'center', justifyContent: 'center' }}>
        <Icon
          name="ios-calendar"
          size={30}
          color="#FFFFFF" />
      </View>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}
      onPress={() => navigation.navigate('Settings', { Refresh_Date: navigation.state.params.Refresh_Date })}>
      <View style={{ flex: 1, paddingRight: 10, alignItems: 'center', justifyContent: 'center' }}>
        <Icon
          name="ios-settings"
          size={30}
          color="#FFFFFF" />
      </View>
    </TouchableOpacity>,
  });

  Refresh_Date(date) {
    if (date === null || date === undefined)
      date = G_VALUES.date;

    Reload_All_Data(new Date(date), this.Refresh_Date_Callback.bind(this));
  }

  calendarPressed() {
    this.last_datePickerIOS_selected = undefined
    this.setState({ isDateTimePickerVisible: true });
  }

  constructor(props) {
    super(props);

    if (TEST_MODE_ON) {

      //Hide Splash Screen
      SplashScreen.hide();

      this.state = {
        testInformation: "Starting test"
      }

      //First initialization
      Reload_All_Data_TestMode(this.Test_Information_Callback.bind(this));
    }
    else {
      this.state = {
        santPressed: false,
        isDateTimePickerVisible: false,
        shareIcon: null,
        PopupDialog_ShowLate: this.Is_Late_Prayer(),
        ViewData: {
          ready: false,
          lloc: {
            diocesiName: '',
            lloc: '',
          },
          setmana: '',
          temps: '',
          setCicle: '',
          anyABC: '',
          color: '',
          celebracio: {
            typeText: '',
            titol: '',
            text: '',
          },
          primVespres: false,
          santPressed: false,
        }
      }

      Reload_All_Data(new Date(/*2019, 9, 23*/), this.Init_Everything.bind(this));
    }
  }

  Test_Information_Callback(informationText) {
    this.setState({ testInformation: informationText });
  }

  Init_Everything() {
    //Set data to show on Home Screen
    this.setState({
      santPressed: false,
      ViewData: {
        ready: true,
        lloc: {
          diocesiName: G_VALUES.diocesiName,
          lloc: G_VALUES.lloc,
        },
        data: G_VALUES.date,
        setmana: G_VALUES.setmana,
        temps: G_VALUES.tempsespecific,
        setCicle: G_VALUES.cicle,
        anyABC: G_VALUES.ABC,
        color: G_VALUES.litColor,
        celebracio: {
          type: G_VALUES.info_cel.typeCel,
          titol: G_VALUES.info_cel.nomCel,
          text: G_VALUES.info_cel.infoCel,
        },
      }
    });

    //Hide Splash Screen
    SplashScreen.hide();

    //Set santPress variable to 0
    this.santPress = 0;
  }

  Refresh_Date_Callback() {
    //Set data to show on Home Screen
    this.setState({
      santPressed: false,
      ViewData: {
        ready: true,
        lloc: {
          diocesiName: G_VALUES.diocesiName,
          lloc: G_VALUES.lloc,
        },
        data: G_VALUES.date,
        setmana: G_VALUES.setmana,
        temps: G_VALUES.tempsespecific,
        setCicle: G_VALUES.cicle,
        anyABC: G_VALUES.ABC,
        color: G_VALUES.litColor,
        celebracio: {
          type: G_VALUES.info_cel.typeCel,
          titol: G_VALUES.info_cel.nomCel,
          text: G_VALUES.info_cel.infoCel,
        },
      }
    });

    //Set santPress variable to 0
    this.santPress = 0;
  }

  Is_Late_Prayer() {
    var h = new Date().getHours();
    if (h >= 0 && h < 3)
      return true;

    return false;
  }

  eventManager(args) {
    switch (args.type) {
      case 'settingsPressed':
        break;
      case 'pickerPressed':
        break;
      case 'okPicker':
        if (args.newDate !== G_VALUES.date) {
          this.props(rgs.newDate);
        }
        break;
    }
  }

  datePickerChange(event, date) {
    if (Platform.OS == "ios") { 
        this.last_datePickerIOS_selected = date
    }
    else {
      this.setState({ isDateTimePickerVisible: false });

      if (date !== G_VALUES.date) {
        this.showThisDate(date)
      }
    }
  }

  datePickerIOS_Accept() {
    this.setState({ isDateTimePickerVisible: false });

    if (this.last_datePickerIOS_selected !== G_VALUES.date) {
      this.showThisDate(this.last_datePickerIOS_selected)
    }
  }

  datePickerIOS_Cancel() {
    this.setState({ isDateTimePickerVisible: false });
  }

  datePickerIOS_Today() {
    this.setState({ isDateTimePickerVisible: false });

    var now = new Date();
    if (now !== G_VALUES.date) {
      this.showThisDate(now)
    }
  }

  showThisDate(date) {
    this.Refresh_Date(date);
  }

  onSantPressCB() {
    if (G_VALUES.info_cel.infoCel !== '-') {

      if (this.santPress === 0) this.santPress = 1;
      else if (this.santPress === 1) this.santPress = 2;
      this.setState({ santPressed: !this.state.santPressed });
    }
  }

  onYestPress(yesterday) {
    this.showThisDate(yesterday);
    this.setState({ PopupDialog_ShowLate: false });
  }

  onTodayPress() {
    this.setState({ PopupDialog_ShowLate: false });
  }

  onSwitchLliurePress(value) {
    if (value) {
      stringData = G_VALUES.date.getDate() + ':' +
        G_VALUES.date.getMonth() + ':' +
        G_VALUES.date.getFullYear();
      AsyncStorage.setItem("lliureDate", stringData);
    }
    else {
      AsyncStorage.setItem("lliureDate", 'none');
    }

    G_VALUES.lliures = value;
    this.Refresh_Date(G_VALUES.date);
  }

  render() {
    if (!this.state.shareIcon) {
      return false;
    }

    if (TEST_MODE_ON) {
      return (
        <View style={{ flex: 1 }}>
          <Text style={{ textAlign: 'center' }}>{"\nTEST INFORMATION\n"}</Text>
          <Text style={{ textAlign: 'center' }}>{this.state.testInformation}{"\n\n"}</Text>
          <TouchableOpacity style={{ backgroundColor: 'rgba(20,47,43,0.3)', marginHorizontal: 100, paddingVertical: 10 }} onPress={Force_Stop_Test.bind(this, this.Test_Information_Callback.bind(this))}>
            <Text style={{ textAlign: 'center' }}>{"STOP TEST"}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    else {
      var yesterday = new Date(G_VALUES.date.getFullYear(), G_VALUES.date.getMonth());
      yesterday.setDate(G_VALUES.date.getDate() - 1);
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <HomeScreen
            ViewData={this.state.ViewData}
            santPressed={this.state.santPressed}
            santCB={this.onSantPressCB.bind(this)}
            lliureCB={this.onSwitchLliurePress.bind(this)}
            navigation={this.props.navigation} />
              <View>
                { Platform.OS == 'ios'?
                  <PopupDialog
                    visible={this.state.isDateTimePickerVisible}
                    width={0.9}
                    height={300}
                    onTouchOutside={this.datePickerIOS_Cancel.bind(this)}
                    dialogStyle={{ backgroundColor: 'white' }}
                    dialogTitle={
                      <DialogTitle title="Selecciona un dia" />} >
                        <View>
                          <DateTimePicker
                            mode={"date"}
                            display={"default"} // default, spinner, calendar
                            onChange={this.datePickerChange.bind(this)}
                            value={G_VALUES.date}
                            minimumDate={GLOBALS.minDatePicker}
                            maximumDate={GLOBALS.maxDatePicker}
                            />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                          <TouchableOpacity style={{ flex: 1, alignItems: 'center'}} onPress={this.datePickerIOS_Cancel.bind(this)}>
                              <Text style={{fontSize: 17, color: 'rgb(14,122,254)'}}>{'Cancel·la'}</Text>
                          </TouchableOpacity >
                          <TouchableOpacity style={{ flex: 1, alignItems: 'center'}} onPress={this.datePickerIOS_Today.bind(this)}>
                              <Text style={{fontSize: 17, color: 'rgb(14,122,254)'}}>{'Avui'}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={{ flex: 1, alignItems: 'center'}} onPress={this.datePickerIOS_Accept.bind(this)}>
                              <Text style={{fontSize: 17, color: 'rgb(14,122,254)'}}>{'Canvia'}</Text>
                          </TouchableOpacity>
                        </View>
                    </PopupDialog>
                :
                    <View>
                      {this.state.isDateTimePickerVisible &&
                          <DateTimePicker
                            mode={"date"}
                            display={"default"} // default, spinner, calendar
                            onChange={this.datePickerChange.bind(this)}
                            value={G_VALUES.date}
                            minimumDate={GLOBALS.minDatePicker}
                            maximumDate={GLOBALS.maxDatePicker}
                          />
                      }
                    </View>
                }
              </View> 
              
          <PopupDialog
            visible={this.state.PopupDialog_ShowLate}
            onTouchOutside={this.onTodayPress.bind(this)}
            width={0.9}
            height={250}
            dialogStyle={{ backgroundColor: 'white' }}
            dialogTitle={<DialogTitle titleTextStyle={{ fontSize: 19, color: 'black' }} title="És més tard de les 12 de la nit!" />} >
            <View style={{ flex: 1, paddingHorizontal: 10, justifyContent: 'center' }}>
              <Text style={{ color: 'grey', fontSize: 18, textAlign: 'center', }}>{"Ja estem a dia " + G_VALUES.date.getDate() + " de " + GF.getMonthText(G_VALUES.date.getMonth()) + "."}</Text>
              <Text style={{ color: 'grey', fontSize: 18, textAlign: 'center', }}>{"Vols la litúrgia d’ahir dia " + yesterday.getDate() + " de " + GF.getMonthText(yesterday.getMonth()) + "?"}</Text>
            </View>
            <View style={{ justifyContent: 'flex-end', borderRadius: 15, paddingHorizontal: 10, paddingBottom: 10, flexDirection: 'row', backgroundColor: 'white' }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <TouchableOpacity onPress={this.onYestPress.bind(this, yesterday)}>
                  <Text style={{ color: 'rgb(14, 122, 254)', fontSize: 17, fontWeight: '600', textAlign: 'center', }}>{"Sí, la d'ahir dia"}</Text>
                  <Text style={{ color: 'rgb(14, 122, 254)', fontSize: 17, fontWeight: '600', textAlign: 'center', }}>{yesterday.getDate() + "/" + (yesterday.getMonth() + 1) + "/" + yesterday.getFullYear()}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <TouchableOpacity onPress={this.onTodayPress.bind(this)}>
                  <Text style={{ color: 'rgb(14, 122, 254)', fontSize: 17, textAlign: 'center', }}>{"No, la d'avui dia"}</Text>
                  <Text style={{ color: 'rgb(14, 122, 254)', fontSize: 17, textAlign: 'center', }}>{G_VALUES.date.getDate() + "/" + (G_VALUES.date.getMonth() + 1) + "/" + G_VALUES.date.getFullYear()}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </PopupDialog>
        </SafeAreaView>
      );
    }
  }
}

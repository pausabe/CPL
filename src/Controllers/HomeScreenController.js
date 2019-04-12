import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  AsyncStorage,
  SafeAreaView,
  Platform
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import PopupDialog, {
  DialogTitle,
} from 'react-native-popup-dialog';
import HomeScreen from '../Views/HomeScreen';
import GLOBAL from "../Globals/Globals";
import GF from "../Globals/GlobalFunctions";
import { Reload_All_Data } from './Classes/Data/DataManager.js';

export default class HomeScreenController extends Component {
  componentWillMount() {
    Icon.getImageSource('ios-share-outline', 30).then((source) => this.setState({ shareIcon: source }));
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
          name="ios-calendar-outline"
          size={30}
          color="#FFFFFF" />
      </View>
    </TouchableOpacity>,
    headerRight: <TouchableOpacity
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}
      onPress={() => navigation.navigate('Settings', { Refresh_Date: navigation.state.params.Refresh_Date })}>
      <View style={{ flex: 1, paddingRight: 10, alignItems: 'center', justifyContent: 'center' }}>
        <Icon
          name="ios-settings-outline"
          size={30}
          color="#FFFFFF" />
      </View>
    </TouchableOpacity>,
  });

  Refresh_Date(date) {
    if(date === null || date === undefined)
      date = G_VALUES.date;

    Reload_All_Data(new Date(date), this.Refresh_Date_Callback.bind(this));
  }

  calendarPressed() {
    this.setState({ isDateTimePickerVisible: true });
  }

  constructor(props) {
    super(props);

    //DataPicker limit
    this.minDatePicker = new Date(2017, 0, 2);
    this.maxDatePicker = new Date(2019, 11, 28);

    this.state = {
      testInfo: 'testing correctly',
      stateTestInfo: '',
      testInfoBegins: "Starts at: ",// + G_VALUES.date,
      santPressed: false,
      isDateTimePickerVisible: false,
      shareIcon: null,

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

    //First initialization
    Reload_All_Data(new Date(/*2019, 4, 15*/), this.Init_Everything.bind(this));
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

    //Show late prayer popup if necessary
    if (this.Is_Late_Prayer())
      this.popupDialog.show();

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

  datePickerOK(newDate) {
    this.setState({ isDateTimePickerVisible: false });

    if (newDate !== G_VALUES.date) {
      this.showThisDate(newDate)
    }
  }

  showThisDate(date) {
    this.Refresh_Date(date);
  }

  datePickerCANCEL() {
    this.setState({ isDateTimePickerVisible: false });
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
    this.popupDialog.dismiss();
  }

  onTodayPress() {
    this.popupDialog.dismiss();
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

  dacordString() {
    return "D'acord";
  }

  render() {
    if (!this.state.shareIcon) {
      return false;
    }

    var yesterday = new Date(G_VALUES.date.getFullYear(), G_VALUES.date.getMonth());
    yesterday.setDate(G_VALUES.date.getDate() - 1);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <HomeScreen
          ViewData={this.state.ViewData}
          santPressed={this.state.santPressed}
          santCB={this.onSantPressCB.bind(this)}
          lliureCB={this.onSwitchLliurePress.bind(this)} 
          navigation={this.props.navigation}/>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          titleIOS={'Canvia el dia'}
          cancelTextIOS={'Cancel·la'}
          confirmTextIOS={this.dacordString()}
          date={G_VALUES.date}
          minimumDate={this.minDatePicker}
          maximumDate={this.maxDatePicker}
          onConfirm={this.datePickerOK.bind(this)}
          onCancel={this.datePickerCANCEL.bind(this)} />
        <PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog }}
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








      /*************** TEST THINGS - START *******************/
    /*this.testing = false;
    this.stateTest = this.testing && false; //Force true in isDarkHimn() -> GlobalFunctions
    this.superTest = this.testing && false;
    if (this.stateTest) {
      this.TA = new TA();
      this.stateArr = [];
      this.stateArrIndex = 0;

      //Abans posava 500
      //Si poso -1 es farà un arxiu per cada diòcesi
      this.maxStateIndex = -1;//500;
    }
    this.renderTest = this.testing;
    this.initialDayTest = { //pot funcionar malament per culpa dels PASS DAYS
      day: 2, //1-31 (s'inclou en el test)
      month: 0, //0-11
      year: 2017,
    }
    this.finalDayTest = { //no pot ser el mateix qe l'initial
      day: 31, //1-31 (no s'inclou en el test)
      month: 0, //0-11
      year: 2019,
    }

    if (this.testing) {
      var today = new Date(this.initialDayTest.year, this.initialDayTest.month, this.initialDayTest.day);
      this.initalDiocesiIndex = 0; //0-30 (s'inclou en el test)
      this.finalDiocesiIndex = 30; //0-30 (s'inclou en el test)
      this.diocesiTest = GF.nextDiocesi(this.initalDiocesiIndex);
      this.diocesiNameTest = GF.nextDiocesiName(this.initalDiocesiIndex);
      this.llocTest = GF.nextLloc(this.initalDiocesiIndex);
      this.idTest = this.initalDiocesiIndex;
      this.maxIdTest = this.finalDiocesiIndex;
      console.log("TestLog. -------------------------------->>>TEST BEGINS<<<--------------------------------");
      console.log("TestLog. --------------------------------:::" + this.idTest + " -> " + this.diocesiTest + ":::--------------------------------");
      console.log("TestLog. -----------------------------------" + this.initialDayTest.day + "/" + this.initialDayTest.month + "/" + this.initialDayTest.year + " -> " + this.finalDayTest.day + "/" + this.finalDayTest.month + "/" + this.finalDayTest.year + "-----------------------------------");
    }
    /*************** TEST THINGS - END *******************/

      /*************** TEST THINGS - START *******************/
  /*else {
    return (
      <View >
        <Text>{"\n\n\n\n\n\n"}</Text>
        <Text>{this.state.testInfoBegins}</Text>
        <Text>{this.state.testInfo}</Text>
        <Text>{this.idTest}</Text>
        <Text>{this.diocesiTest}</Text>
        <Text>{this.variables.date.getDate() < 10 ? `0${this.variables.date.getDate()}` : this.variables.date.getDate()}/{this.variables.date.getMonth() + 1 < 10 ? `0${this.variables.date.getMonth() + 1}` : this.variables.date.getMonth() + 1}/{this.variables.date.getFullYear()}</Text>
        <Text>{this.state.stateTestInfo}</Text>
      </View>
    );
  }*/
  /*************** TEST THINGS - END *******************/
  //}


  /*************** CREATING THE LITURGIA - END ***************/

  /*************** TEST THINGS - START *******************/
  /*nextDayTest() {
    if (this.testing) {
      console.log("PlaceLog. NEXT DAY");
      if (this.variables.celType === 'L' && this.variables.lliures === false) {
        //Tornem a passar el dia però amb lliures activades
        console.log("TestLog. -----------REPTERIR per mem lliure---------" + this.idTest + " -> " + this.diocesiTest + ": " + this.variables.date + "-----------------------------");
        this.variables.lliures = true;
        this.refreshEverything(this.variables.date);
        this.setState({ testInfo: "Testing correctly *" });
      }
      else {
        this.variables.lliures = false;

        var nextDay = this.variables.date;
        nextDay.setDate(nextDay.getDate() + 1);
        if (nextDay.getFullYear() === this.finalDayTest.year &&
          nextDay.getMonth() === this.finalDayTest.month &&
          nextDay.getDate() === this.finalDayTest.day) {
          if (this.idTest === this.maxIdTest) {
            if (this.stateTest) {
              setTimeout(() => {
                this.TA.writeState(this.stateArr, this.initialDayTest, this.finalDayTest, this.initalDiocesiIndex, this.finalDiocesiIndex, this.saveStateCB.bind(this), true);
              }, 1000);
            }
            var rightNow = new Date();
            this.setState({ testInfo: "Test ended correctly at: " + rightNow });
            console.log("TestLog. -------------------------------->>>TEST ENDS<<<--------------------------------");
          }
          else {
            if (this.maxStateIndex === -1) this.writePart();
            firstDay = new Date(this.initialDayTest.year, this.initialDayTest.month, this.initialDayTest.day);
            this.idTest += 1;
            this.diocesiTest = GF.nextDiocesi(this.idTest);
            this.diocesiNameTest = GF.nextDiocesiName(this.idTest);
            this.llocTest = GF.nextLloc(this.idTest);
            auxTomorrow = new Date();
            auxTomorrow.setFullYear(this.initialDayTest.year);
            auxTomorrow.setMonth(this.initialDayTest.month);
            auxTomorrow.setDate(this.initialDayTest.day + 1);
            this.dataTomorrow.date = auxTomorrow;
            this.refreshEverything(firstDay);
            this.setState({ testInfo: "Testing correctly" });
            console.log("TestLog. --------------------------------:::NEXT DIÒCESI: " + this.idTest + " -> " + this.diocesiTest + " - " + firstDay + ":::--------------------------------");
          }
        }
        else {
          dtDay = this.dataTomorrow.date.getDate();
          dtMonth = this.dataTomorrow.date.getMonth();
          dtYear = this.dataTomorrow.date.getFullYear();
          auxTomorrow = new Date(dtYear, dtMonth, dtDay);
          auxTomorrow.setDate(auxTomorrow.getDate() + 1);
          this.dataTomorrow.date = auxTomorrow;
          while (GF.passDayTest(this.diocesiNameTest, nextDay)) {
            console.log("TestLog. -----------------------------------" + this.idTest + " -> " + this.diocesiTest + " - PASS DAY: " + nextDay + "-----------------------------------");
            nextDay.setDate(nextDay.getDate() + 1);
            auxTomorrow = this.dataTomorrow.date;
            auxTomorrow.setDate(auxTomorrow.getDate() + 1);
            this.dataTomorrow.date = auxTomorrow;
          }
          console.log("TestLog. -----------------------------------" + this.idTest + " -> " + this.diocesiTest + " - NEXT DAY: " + nextDay + "-----------------------------------");
          this.refreshEverything(nextDay);
          this.setState({ testInfo: "Testing correctly" });
        }
      }
    }
  }

  setLiturgiaStateTest() {
    var auxLIT = Object.assign({}, this.liturgicProps.LITURGIA);
    stateDayStructure = {
      date: {
        day: this.variables.date.getDate(),
        month: (this.variables.date.getMonth() + 1),
        year: this.variables.date.getFullYear(),
      },
      diocesi: this.variables.diocesi,
      LIT: auxLIT,
    }
    this.stateArr[this.stateArrIndex] = stateDayStructure;
    this.stateArrIndex += 1;

    if (this.stateArrIndex === this.maxStateIndex) this.writePart();
  }

  writePart() {
    var auxArr = Object.assign({}, this.stateArr)
    setTimeout(() => {
      this.TA.writeState(auxArr, this.initialDayTest, this.finalDayTest, this.initalDiocesiIndex, this.finalDiocesiIndex, this.saveStateCB.bind(this), false);
    }, 1000);
    this.stateArr = [];
    this.stateArrIndex = 0;
  }

  saveStateCB(text) {
    this.setState({ stateTestInfo: text });
  }

  error() {
    this.setState({ testInfo: "something went wrong (bad calls)" });
    console.log("InfoLog. super error (bad calls)");
    this.testing = false;
  }

  openOracions(oracioType) {
    //this.LHButtonCB(oracioType, true);
  }*/

  /*************** TEST THINGS - END *******************/

  /*shouldComponentUpdate() {
    if (Platform.OS === 'ios') {
      if (this.testing) {
        return true;
      }
      else if (this.refEv) {
        console.log("ShouldLog. YES, després de refreshEverything");
        this.refEv = false;
        return true;
      }
      else if (this.setPres) {
        console.log("ShouldLog. NO, estic anant a Settings");
        this.inSet = true;
        this.setPres = false;
        return false;
      }
      else if (this.santPress === 1) {
        console.log("ShouldLog. YES, estic obrint Sant");
        return true;
      }
      else if (this.santPress === 2) {
        console.log("ShouldLog. YES, estic tancant Sant");
        this.santPress = 0;
        return true;
      }
      else if (this.inLit) {
        console.log("ShouldLog. YES, estic tornant de Liturgia");
        this.inLit = false;
        return true;
      }
      else if (this.inSet) {
        console.log("ShouldLog. NO, estic tornant de Settings");
        this.inSet = false;
        this.refreshEverything(this.variables.date);
        return false;
      }
      else if (this.calPres) {
        console.log("ShouldLog. YES, obrint Picker");
        this.calPres = false;
        return true;
      }
      else {
        console.log("ShouldLog. YES, coses del Picker");
        return true;
      }
    }
    else {
      return true;
    }
  }*/
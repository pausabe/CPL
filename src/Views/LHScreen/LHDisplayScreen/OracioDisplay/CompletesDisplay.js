import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Share
} from 'react-native';
import HR from '../../../../Components/HRComponent';
import GLOBAL from '../../../../Globals/Globals';
import GF from '../../../../Globals/GlobalFunctions';
import SettingsManager from '../../../../Controllers/Classes/SettingsManager';

export default class CompletesDisplay extends Component {
  componentDidMount(){
    //this.props.events.addListener('shareButtonPressed_Completes', this.sharePressed.bind(this));
  }

  componentWillUnmount(){
    //this.props.events.removeListener('shareButtonPressed_Completes', this.sharePressed.bind(this));
  }

  /*sharePressed(){
    console.log("PlaceLog. Completes Share Pressed");
    Share.share({
      message: this.shareText,
      url: 'https://mescpl.cpl.es/donacions/',
      subject: 'Completes',
      title: 'Completes'
    },
    {
      // Android only:
      dialogTitle: 'Comparteix tot el text',
    })
  }*/

  constructor(props){
    super(props);

    console.log("PlaceLog. CompletesDisplay");

    var textSize = G_VALUES.textSize;

    this.styles = {
      black: {
        color: '#000000',
        fontSize: GF.convertTextSize(textSize),
      },
      blackBold: {
        color: '#000000',
        fontSize: GF.convertTextSize(textSize),
        fontWeight: 'bold',
      },
      blackItalic:{
        color: '#000000',
        fontSize: GF.convertTextSize(textSize),
        fontStyle: 'italic'
      },
      blackSmallItalicRight: {
        color: '#000000',
        fontSize: GF.convertTextSize(textSize)-2,
        fontStyle: 'italic',
        textAlign: 'right'
      },
      textAntMareButton: {
        color: 'grey',
        fontSize: GF.convertTextSize(textSize) > 17? 17 : GF.convertTextSize(textSize)-3,
      },
      textAntMareButtonBold: {
        color: 'grey',
        fontSize: GF.convertTextSize(textSize) > 17? 17 : GF.convertTextSize(textSize)-3,
        fontWeight: 'bold',
      },
      red: {
        color: '#FF0000',
        fontSize: GF.convertTextSize(textSize),
      },
      redCenter: {
        color: '#FF0000',
        fontSize: GF.convertTextSize(textSize),
        textAlign: 'center'
      },
      redCenterBold: {
        color: '#FF0000',
        fontSize: GF.convertTextSize(textSize),
        textAlign: 'center',
        fontWeight: 'bold',
      },
      redSmallItalicRight: {
        color: '#FF0000',
        fontSize: GF.convertTextSize(textSize)-2,
        fontStyle: 'italic',
        textAlign: 'right'
      },
    }

    var auxNumAntMare = G_VALUES.numAntMare;

    //console.log("wtf1.1",auxNumAntMare);
    //console.log("wtf1.2",G_VALUES.tempsespecific);

    if(G_VALUES.tempsespecific === 'Pasqua' && auxNumAntMare !== '5'){
      auxNumAntMare = '5';
      props.setNumAntMare('5');
      SettingsManager.setSettingNumAntMare('5');
      //console.log("wtf2",auxNumAntMare);
    }
    else if(!(G_VALUES.tempsespecific === 'Pasqua') && auxNumAntMare === '5'){
      auxNumAntMare = '1';
      props.setNumAntMare('1');
      SettingsManager.setSettingNumAntMare('1');
      //console.log("wtf3",auxNumAntMare);
    }

    this.state = {
      numAntMare: auxNumAntMare
    }

    this.COMPLETES = LH_VALUES.completes;
    this.superTestMode = props.superTestMode;
    this.testErrorCB = props.testErrorCB;
    this.setNumAntMare = props.setNumAntMare;

    //this.shareText = "";
  }

  _onAntMarePress(numAntMare){
    this.setState({numAntMare: numAntMare});
    this.setNumAntMare(numAntMare);
    SettingsManager.setSettingNumAntMare(numAntMare);
  }

  antMareComp(numAntMare){
    var ant1Style = this.styles.textAntMareButton;
    var ant2Style = this.styles.textAntMareButton;
    var ant3Style = this.styles.textAntMareButton;
    var ant4Style = this.styles.textAntMareButton;
    var ant5Style = this.styles.textAntMareButton;

    switch (numAntMare) {
      case '1':
        antMare = GF.rs(this.COMPLETES.antMare1, this.superTestMode, this.testErrorCB.bind(this));
        ant1Style = this.styles.textAntMareButtonBold;
        break;
      case '2':
        antMare = GF.rs(this.COMPLETES.antMare2, this.superTestMode, this.testErrorCB.bind(this));
        ant2Style = this.styles.textAntMareButtonBold;
        break;
      case '3':
        antMare = GF.rs(this.COMPLETES.antMare3, this.superTestMode, this.testErrorCB.bind(this));
        ant3Style = this.styles.textAntMareButtonBold;
        break;
      case '4':
        antMare = GF.rs(this.COMPLETES.antMare4, this.superTestMode, this.testErrorCB.bind(this));
        ant4Style = this.styles.textAntMareButtonBold;
        break;
      case '5':
        antMare = GF.rs(this.COMPLETES.antMare5, this.superTestMode, this.testErrorCB.bind(this));
        ant5Style = this.styles.textAntMareButtonBold;
        break;
    }

    /*this.shareText += antMare + '\n\n';

    if(Platform.OS === 'ios'){
      this.shareText += "_____\nCol·labora fent un donatiu:";
    }*/

    return(
      <View>
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row',paddingVertical: 10}}>
            {!(G_VALUES.tempsespecific === 'Pasqua')?
              <TouchableOpacity onPress={this._onAntMarePress.bind(this,'1')}>
                <Text style={ant1Style}>{"Ant. 1  "}</Text>
              </TouchableOpacity>
            :
              null
            }
            {!(G_VALUES.tempsespecific === 'Pasqua')?
              <TouchableOpacity onPress={this._onAntMarePress.bind(this,'2')}>
                <Text style={ant2Style}>{"  Ant. 2  "}</Text>
              </TouchableOpacity>
            :
              null
            }
            {!(G_VALUES.tempsespecific === 'Pasqua')?
              <TouchableOpacity onPress={this._onAntMarePress.bind(this,'3')}>
                <Text style={ant3Style}>{"  Ant. 3  "}</Text>
              </TouchableOpacity>
            :
              null
            }
            {!(G_VALUES.tempsespecific === 'Pasqua')?
              <TouchableOpacity onPress={this._onAntMarePress.bind(this,'4')}>
                <Text style={ant4Style}>{"  Ant. 4"}</Text>
              </TouchableOpacity>
            :
              null
            }
          </View>
        </View>

        <Text selectable={true} style={this.styles.black}>{antMare}</Text>
      </View>
    );
  }

  render() {
    try {
      //this.shareText = "";

      if(this.COMPLETES !== null){
        const gloriaStringIntro = "Glòria al Pare i al Fill\ni a l’Esperit Sant.\nCom era al principi, ara i sempre\ni pels segles dels segles. Amén.";
        var is_special_initial_message = G_VALUES.LT === GLOBAL.Q_TRIDU && G_VALUES.date.getDay() === 6;
        var aux_special_initial_message = "Avui, només han de dir aquestes Completes els qui no participen en la Vetlla pasqual.";
        var aux_sigueu = "Sigueu amb nosaltres, Déu nostre.";
        var aux_veniu = "Senyor, veniu a ajudar-nos.";
        var is_aleluia = G_VALUES.LT !== GLOBAL.Q_CENDRA && G_VALUES.LT !== GLOBAL.Q_SETMANES
          && G_VALUES.LT !== GLOBAL.Q_DIUM_RAMS && G_VALUES.LT !== GLOBAL.Q_SET_SANTA
          && G_VALUES.LT !== GLOBAL.Q_TRIDU;
        var aux_lloable = "És lloable que aquí es faci examen de consciència.";
        var aux_acte_pen = this.COMPLETES.actePen;
        var aux_himne = GF.rs(this.COMPLETES.himne, this.superTestMode, this.testErrorCB.bind(this));
        var is_dos_salms = this.COMPLETES.dosSalms === "1";
        var has_distint_ant = this.COMPLETES.antifones;
        var aux_ant1 = GF.rs(this.COMPLETES.ant1, this.superTestMode, this.testErrorCB.bind(this));
        var aux_titol1 = GF.rs(this.COMPLETES.titol1, this.superTestMode, this.testErrorCB.bind(this));
        var has_com1 = this.COMPLETES.com1 !== '-';
        var aux_com1 = has_com1? GF.rs(this.COMPLETES.com1, this.superTestMode, this.testErrorCB.bind(this)) : "";
        var aux_salm1 = this.salm(GF.rs(this.COMPLETES.salm1, this.superTestMode, this.testErrorCB.bind(this)));
        if(is_dos_salms){
          var aux_ant2 = has_distint_ant? GF.rs(this.COMPLETES.ant2, this.superTestMode, this.testErrorCB.bind(this)) : "";
          var aux_titol2 = GF.rs(this.COMPLETES.titol2, this.superTestMode, this.testErrorCB.bind(this));
          var has_com2 = this.COMPLETES.com2 !== '-';
          var aux_com2 = has_com2? GF.rs(this.COMPLETES.com2, this.superTestMode, this.testErrorCB.bind(this)) : "";
          var aux_salm2 = this.salm(GF.rs(this.COMPLETES.salm2, this.superTestMode, this.testErrorCB.bind(this)));
        }
        var aux_vers = GF.rs(this.COMPLETES.vers, this.superTestMode, this.testErrorCB.bind(this));
        var aux_lectura_breu = GF.rs(this.COMPLETES.lecturaBreu, this.superTestMode, this.testErrorCB.bind(this));
        var is_normal_resp = this.COMPLETES.antRespEspecial === "-";
        if(is_normal_resp){
          var aux_resp_1_2 = GF.respTogether(GF.rs(this.COMPLETES.respBreu1, this.superTestMode, this.testErrorCB.bind(this)),GF.rs(this.COMPLETES.respBreu2, this.superTestMode, this.testErrorCB.bind(this)));
          var aux_resp_3 = GF.rs(this.COMPLETES.respBreu3, this.superTestMode, this.testErrorCB.bind(this));
          var aux_resp_2 = GF.rs(this.COMPLETES.respBreu2, this.superTestMode, this.testErrorCB.bind(this));
        }
        else{
          var aux_ant_special = GF.rs(this.COMPLETES.antRespEspecial, this.superTestMode, this.testErrorCB.bind(this));
        }
        var aux_gloria_half = " Glòria al Pare i al Fill i a l'Esperit Sant.";
        var aux_ant_cantic = GF.rs(this.COMPLETES.antCantic, this.superTestMode, this.testErrorCB.bind(this));
        var aux_titol_cantic = "Càntic\nLc 2, 29-32\nCrist, llum de les nacions i glòria d'Israel";
        var aux_cantic = this.salm(GF.rs(this.COMPLETES.cantic, this.superTestMode, this.testErrorCB.bind(this)));
        var aux_gloria_cantic = "Glòria.";
        var aux_oracio = GF.rs(this.COMPLETES.oracio, this.superTestMode, this.testErrorCB.bind(this));
        var aux_fi_benaurada = "Que el Senyor totpoderós ens concedeixi una nit tranquil·la i una fi benaurada.";
        var aux_benediccio = 'Que el Senyor ens beneeixi i ens guardi de tot mal, i ens dugui a la vida eterna.';
        var aux_antifona_final = "Antífona final de la Mare de Déu";

        /*if(is_special_initial_message)
          this.shareText += aux_special_initial_message + '\n\n';
        this.shareText += 'V. ' + aux_sigueu + '\n';
        this.shareText += 'R. ' + aux_veniu + '\n\n';
        this.shareText += gloriaStringIntro;
        this.shareText += is_aleluia? " Al·leluia\n\n" : "\n\n";
        this.shareText += aux_lloable + '\n\n' + aux_acte_pen + '\n\n';
        this.shareText += 'HIMNE' + '\n\n';
        this.shareText += aux_himne + '\n\n';
        this.shareText += 'SALMÒDIA' + '\n\n';
        if(is_dos_salms){
          this.shareText += has_distint_ant? "Ant. 1. " : "Ant. ";
          this.shareText += aux_ant1 + '\n\n';
          this.shareText += aux_titol1 + '\n\n';
          if(has_com1)
            this.shareText += aux_com1 + '\n\n';
          this.shareText += aux_salm1 + '\n\n';
          this.shareText += aux_gloria1 + '\n\n';
          this.shareText += has_distint_ant? "Ant. 1. " + aux_ant1 + '\n\n' : "";
          this.shareText += has_distint_ant? "Ant. 2. " + aux_ant2 + '\n\n' : "";
          this.shareText += aux_titol2 + '\n\n';
          if(has_com2)
            this.shareText += aux_com2 + '\n\n';
          this.shareText += aux_salm2 + '\n\n';
          this.shareText += aux_gloria2 + '\n\n';
          this.shareText += has_distint_ant? "Ant. 2. " + aux_ant2 + '\n\n' : "Ant. " + aux_ant1 + '\n\n';
        }
        else{
          this.shareText += "Ant. ";
          this.shareText += aux_ant1 + '\n\n';
          this.shareText += aux_titol1 + '\n\n';
          if(has_com1)
            this.shareText += aux_com1 + '\n\n';
          this.shareText += aux_salm1 + '\n\n';
          this.shareText += aux_gloria1 + '\n\n';
          this.shareText += "Ant. " + aux_ant1 + '\n\n';
        }
        this.shareText += 'LECTURA BREU' + '\n\n';
        this.shareText += aux_vers + '\n\n';
        this.shareText += aux_lectura_breu + '\n\n';
        this.shareText += 'RESPONSORI BREU' + '\n\n';
        this.shareText += 'V. ' + aux_resp_1_2 + '\n';
        this.shareText += 'R. ' + aux_resp_1_2 + '\n\n';
        this.shareText += 'V. ' + aux_resp_3 + '\n';
        this.shareText += 'R. ' + aux_resp_2 + '\n\n';
        this.shareText += 'V. ' + aux_gloria_half + '\n';
        this.shareText += 'R. ' + aux_resp_1_2 + '\n\n';
        this.shareText += 'CÀNTIC DE SIMEÓ' + '\n\n';
        this.shareText += 'Ant. ' + aux_ant_cantic + '\n\n';
        this.shareText += aux_titol_cantic + '\n\n';
        this.shareText += aux_cantic + '\n\n';
        this.shareText += aux_gloria_cantic + '\n\n';
        this.shareText += 'Ant. ' + aux_ant_cantic + '\n\n';
        this.shareText += 'ORACIÓ' + '\n\n';
        this.shareText += 'Preguem.' + '\n';
        this.shareText += aux_oracio + '\n';
        this.shareText += 'R. Amén' + '\n\n';
        this.shareText += 'CONCLUSIÓ' + '\n\n';
        this.shareText += 'V. ' + aux_benediccio + '\n' + 'R. Amén.' + '\n\n';
        this.shareText += aux_antifona_final + '\n\n';*/

        return (
          <View>
            {is_special_initial_message?
              <View>
                <Text selectable={true} style={this.styles.redCenter}>{aux_special_initial_message}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <HR/>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
              </View>
              :
              null
            }
            <Text selectable={true} style={this.styles.red}>{"V. "}
              <Text selectable={true} style={this.styles.black}>{aux_sigueu}</Text>
            </Text>
            <Text selectable={true} style={this.styles.red}>{"R. "}
              <Text selectable={true} style={this.styles.black}>{aux_veniu}</Text>
            </Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.black}>{gloriaStringIntro}
            {is_aleluia ?
              <Text selectable={true} style={this.styles.black}>{" Al·leluia"}</Text> : null
            }
            </Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <HR/>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.redCenter}>{aux_lloable}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.black}>{aux_acte_pen}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <HR/>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>{"HIMNE"}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.black}>{aux_himne}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <HR/>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>{"SALMÒDIA"}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {is_dos_salms ?
              <View>
                {has_distint_ant ?
                  <Text selectable={true} style={this.styles.red}>{"Ant. 1. "}
                    <Text selectable={true} style={this.styles.black}>{aux_ant1}</Text>
                  </Text>
                :
                  <Text selectable={true} style={this.styles.red}>{"Ant. "}
                    <Text selectable={true} style={this.styles.black}>{aux_ant1}</Text>
                  </Text>
                }
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.redCenter}>{aux_titol1}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                {has_com1 ?
                  <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
                  <Text selectable={true} style={this.styles.blackSmallItalicRight}>{aux_com1}</Text>
                  {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
                <Text selectable={true} style={this.styles.black}>{aux_salm1}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                {this.COMPLETES.gloria1 == "1"?
                <Text selectable={true} style={this.styles.blackItalic}>{"Glòria."}</Text>
                :
                <Text selectable={true} style={this.styles.redItalic}>{"S'omet el Glòria."}</Text>}
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                {has_distint_ant ?
                  <View>
                    <Text selectable={true} style={this.styles.red}>{"Ant. 1. "}
                      <Text selectable={true} style={this.styles.black}>{aux_ant1}</Text>
                    </Text>
                    {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                    <Text selectable={true} style={this.styles.red}>{"Ant. 2. "}
                      <Text selectable={true} style={this.styles.black}>{aux_ant2}</Text>
                    </Text>
                    {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                  </View>
                : null
                }
                <Text selectable={true} style={this.styles.redCenter}>{aux_titol2}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                {has_com2 !== '-' ?
                  <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
                  <Text selectable={true} style={this.styles.blackSmallItalicRight}>{aux_com2}</Text>
                  {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
                <Text selectable={true} style={this.styles.black}>{aux_salm2}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                {this.COMPLETES.gloria2 == "1"?
                <Text selectable={true} style={this.styles.blackItalic}>{"Glòria."}</Text>
                :
                <Text selectable={true} style={this.styles.redItalic}>{"S'omet el Glòria."}</Text>}
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                {has_distint_ant ?
                  <View>
                    <Text selectable={true} style={this.styles.red}>{"Ant. 2. "}
                      <Text selectable={true} style={this.styles.black}>{aux_ant2}</Text>
                    </Text>
                  </View>
                :
                  <View>
                    <Text selectable={true} style={this.styles.red}>{"Ant. "}
                      <Text selectable={true} style={this.styles.black}>{aux_ant1}</Text>
                    </Text>
                  </View>
                }
              </View>
            :
              <View>
                <Text selectable={true} style={this.styles.red}>{"Ant. "}
                  <Text selectable={true} style={this.styles.black}>{aux_ant1}</Text>
                </Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.redCenter}>{aux_titol1}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                {has_com1 !== '-' ?
                  <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
                  <Text selectable={true} style={this.styles.blackSmallItalicRight}>{aux_com1}</Text>
                  {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
                <Text selectable={true} style={this.styles.black}>{aux_salm1}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                {this.COMPLETES.gloria1 == "1"?
                <Text selectable={true} style={this.styles.blackItalic}>{"Glòria."}</Text>
                :
                <Text selectable={true} style={this.styles.redItalic}>{"S'omet el Glòria."}</Text>}
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.red}>{"Ant. "}
                  <Text selectable={true} style={this.styles.black}>{aux_ant1}</Text>
                </Text>
              </View>
            }
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <HR/>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>{"LECTURA BREU"}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>{aux_vers}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.black}>{aux_lectura_breu}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <HR/>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>{"RESPONSORI BREU"}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {is_normal_resp ?
              <View>
                <Text selectable={true} style={this.styles.red}>{"V. "}
                  <Text selectable={true} style={this.styles.black}>{aux_resp_1_2}</Text>
                </Text>
                <Text selectable={true} style={this.styles.red}>{"R. "}
                  <Text selectable={true} style={this.styles.black}>{aux_resp_1_2}</Text>
                </Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.red}>{"V. "}
                  <Text selectable={true} style={this.styles.black}>{aux_resp_3}</Text>
                </Text>
                <Text selectable={true} style={this.styles.red}>{"R. "}
                  <Text selectable={true} style={this.styles.black}>{aux_resp_2}</Text>
                </Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.red}>{"V. "}
                  <Text selectable={true} style={this.styles.black}>{aux_gloria_half}</Text>
                </Text>
                <Text selectable={true} style={this.styles.red}>{"R. "}
                  <Text selectable={true} style={this.styles.black}>{aux_resp_1_2}</Text>
                </Text>
              </View>
            :
              <View>
                <Text selectable={true} style={this.styles.red}>{"Ant. "}
                  <Text selectable={true} style={this.styles.black}>{aux_ant_special}</Text>
                </Text>
              </View>
            }
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <HR/>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>{"CÀNTIC DE SIMEÓ"}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>{"Ant. "}
              <Text selectable={true} style={this.styles.black}>{aux_ant_cantic}</Text>
            </Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.redCenter}>{aux_titol_cantic}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.black}>{aux_cantic}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.blackItalic}>{aux_gloria_cantic}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>{"Ant. "}
              <Text selectable={true} style={this.styles.black}>{aux_ant_cantic}</Text>
            </Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <HR/>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>{"ORACIÓ"}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.blackBold}>{"Preguem."}</Text>
            <Text selectable={true} style={this.styles.black}>{aux_oracio}</Text>
            <Text selectable={true} style={this.styles.red}>{"R. "}
              <Text selectable={true} style={this.styles.black}>{"Amén."}</Text>
            </Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <HR/>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>{"CONCLUSIÓ"}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>{"V. "}
              <Text selectable={true} style={this.styles.black}>{aux_fi_benaurada}</Text>
            </Text>
            <Text selectable={true} style={this.styles.red}>{"R. "}
              <Text selectable={true} style={this.styles.black}>{"Amén."}</Text>
            </Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <HR/>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.redCenter}>{aux_antifona_final}</Text>
            {this.antMareComp(this.state.numAntMare)}
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {Platform.OS === 'android' ? null : <Text />}
          </View>
        );
      }
      else{
        console.log("wierd error....... this.props:",this.props);
        console.log("G_VALUES.LITURGIA.completes doesen't exists");
        return null;
      }
    } catch (e) {
      console.log(e);
      if(this.superTestMode) this.testErrorCB();
      return(null);
    }
  }

  salm(salm){
    if(!salm) return "";

    if(true){
      salm = salm.replace(/    [*]/g,'');
      salm = salm.replace(/   [*]/g,'');
      salm = salm.replace(/  [*]/g,'');
      salm = salm.replace(/ [*]/g,'');
      salm = salm.replace(/    [†]/g,'');
      salm = salm.replace(/   [†]/g,'');
      salm = salm.replace(/  [†]/g,'');
      salm = salm.replace(/ [†]/g,'');
    }
    return salm;
  }

}

AppRegistry.registerComponent('CompletesDisplay', () => CompletesDisplay);

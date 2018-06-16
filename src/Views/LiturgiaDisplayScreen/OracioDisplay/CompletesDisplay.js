import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Platform,
  TouchableOpacity
} from 'react-native';
import HR from '../../../Components/HRComponent';
import GLOBAL from '../../../Globals/Globals';
import GF from '../../../Globals/GlobalFunctions';
import SettingsManager from '../../../Controllers/Classes/SettingsManager';

export default class CompletesDisplay extends Component {
  constructor(props){
    super(props);

    console.log("PlaceLog. CompletesDisplay");

    var textSize = props.variables.textSize;

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

    var auxNumAntMare = props.variables.numAntMare;

    //console.log("wtf1.1",auxNumAntMare);
    //console.log("wtf1.2",props.liturgicProps.tempsespecific);

    if(props.liturgicProps.tempsespecific === 'Pasqua' && auxNumAntMare !== '5'){
      auxNumAntMare = '5';
      props.setNumAntMare('5');
      SettingsManager.setSettingNumAntMare('5');
      //console.log("wtf2",auxNumAntMare);
    }
    else if(!(props.liturgicProps.tempsespecific === 'Pasqua') && auxNumAntMare === '5'){
      auxNumAntMare = '1';
      props.setNumAntMare('1');
      SettingsManager.setSettingNumAntMare('1');
      //console.log("wtf3",auxNumAntMare);
    }

    this.state = {
      numAntMare: auxNumAntMare
    }

    this.COMPLETES = props.liturgicProps.LITURGIA.completes;
    this.liturgicProps = props.liturgicProps;
    this.variables = props.variables;
    this.superTestMode = props.superTestMode;
    this.testErrorCB = props.testErrorCB;
    this.setNumAntMare = props.setNumAntMare;

    this.shareText = "";
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

    return(
      <View>

        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row',paddingVertical: 10}}>
            {!(this.liturgicProps.tempsespecific === 'Pasqua')?
              <TouchableOpacity onPress={this._onAntMarePress.bind(this,'1')}>
                <Text style={ant1Style}>{"Ant. 1  "}</Text>
              </TouchableOpacity>
            :
              null
            }
            {!(this.liturgicProps.tempsespecific === 'Pasqua')?
              <TouchableOpacity onPress={this._onAntMarePress.bind(this,'2')}>
                <Text style={ant2Style}>{"  Ant. 2  "}</Text>
              </TouchableOpacity>
            :
              null
            }
            {!(this.liturgicProps.tempsespecific === 'Pasqua')?
              <TouchableOpacity onPress={this._onAntMarePress.bind(this,'3')}>
                <Text style={ant3Style}>{"  Ant. 3  "}</Text>
              </TouchableOpacity>
            :
              null
            }
            {!(this.liturgicProps.tempsespecific === 'Pasqua')?
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
    if(this.COMPLETES !== null){

      const gloriaStringIntro = "Glòria al Pare i al Fill\ni a l’Esperit Sant.\nCom era al principi, ara i sempre\ni pels segles dels segles. Amén.";
      return (
        <View>
          {this.liturgicProps.LT === GLOBAL.Q_TRIDU && this.variables.date.getDay() === 6?
            <View>
              <Text selectable={true} style={this.styles.redCenter}>{"Avui, només han de dir aquestes Completes els qui no participen en la Vetlla pasqual."}</Text>
              {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
              <HR/>
              {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            </View>
            :
            null
          }
          <Text selectable={true} style={this.styles.red}>V.
            <Text selectable={true} style={this.styles.black}>{" Sigueu amb nosaltres, Déu nostre."}</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>R.
            <Text selectable={true} style={this.styles.black}>{" Senyor, veniu a ajudar-nos."}</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.black}>{gloriaStringIntro}
          {this.liturgicProps.LT !== GLOBAL.Q_CENDRA && this.liturgicProps.LT !== GLOBAL.Q_SETMANES
            && this.liturgicProps.LT !== GLOBAL.Q_DIUM_RAMS && this.liturgicProps.LT !== GLOBAL.Q_SET_SANTA
            && this.liturgicProps.LT !== GLOBAL.Q_TRIDU ?
            <Text selectable={true} style={this.styles.black}>{" Al·leluia"}</Text> : null
          }
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <HR/>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.redCenter}>{"És lloable que aquí es faci examen de consciència."}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.black}>{this.COMPLETES.actePen}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <HR/>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>{"HIMNE"}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.black}>{GF.rs(this.COMPLETES.himne, this.superTestMode, this.testErrorCB.bind(this))}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <HR/>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>{"SALMÒDIA"}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          {this.COMPLETES.dosSalms === "1" ?
            <View>
              {this.COMPLETES.antifones ?
                <Text selectable={true} style={this.styles.red}>{"Ant. 1."}
                  <Text selectable={true} style={this.styles.black}> {GF.rs(this.COMPLETES.ant1, this.superTestMode, this.testErrorCB.bind(this))}</Text>
                </Text>
              :
                <Text selectable={true} style={this.styles.red}>{"Ant."}
                  <Text selectable={true} style={this.styles.black}> {GF.rs(this.COMPLETES.ant1, this.superTestMode, this.testErrorCB.bind(this))}</Text>
                </Text>
              }
              {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
              <Text selectable={true} style={this.styles.redCenter}>{GF.rs(this.COMPLETES.titol1, this.superTestMode, this.testErrorCB.bind(this))}</Text>
              {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
              {this.COMPLETES.com1 !== '-' ?
                <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
                <Text selectable={true} style={this.styles.blackSmallItalicRight}>{GF.rs(this.COMPLETES.com1, this.superTestMode, this.testErrorCB.bind(this))}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
              {this.salm(GF.rs(this.COMPLETES.salm1, this.superTestMode, this.testErrorCB.bind(this)))}
              {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
              {this.gloria(this.COMPLETES.gloria1)}
              {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
              {this.COMPLETES.antifones ?
                <View>
                  <Text selectable={true} style={this.styles.red}>{"Ant. 1."}
                    <Text selectable={true} style={this.styles.black}> {GF.rs(this.COMPLETES.ant1, this.superTestMode, this.testErrorCB.bind(this))}</Text>
                  </Text>
                  {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                  <Text selectable={true} style={this.styles.red}>{"Ant. 2."}
                    <Text selectable={true} style={this.styles.black}> {GF.rs(this.COMPLETES.ant2, this.superTestMode, this.testErrorCB.bind(this))}</Text>
                  </Text>
                  {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                </View>
              : null
              }
              <Text selectable={true} style={this.styles.redCenter}>{GF.rs(this.COMPLETES.titol2, this.superTestMode, this.testErrorCB.bind(this))}</Text>
              {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
              {this.COMPLETES.com2 !== '-' ?
                <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
                <Text selectable={true} style={this.styles.blackSmallItalicRight}>{GF.rs(this.COMPLETES.com2, this.superTestMode, this.testErrorCB.bind(this))}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
              {this.salm(GF.rs(this.COMPLETES.salm2, this.superTestMode, this.testErrorCB.bind(this)))}
              {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
              {this.gloria(this.COMPLETES.gloria2)}
              {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
              {this.COMPLETES.antifones ?
                <View>
                  <Text selectable={true} style={this.styles.red}>{"Ant. 2."}
                    <Text selectable={true} style={this.styles.black}> {GF.rs(this.COMPLETES.ant2, this.superTestMode, this.testErrorCB.bind(this))}</Text>
                  </Text>
                </View>
              :
                <View>
                  <Text selectable={true} style={this.styles.red}>{"Ant."}
                    <Text selectable={true} style={this.styles.black}> {GF.rs(this.COMPLETES.ant1, this.superTestMode, this.testErrorCB.bind(this))}</Text>
                  </Text>
                </View>
              }
            </View>
          :
            <View>
              <Text selectable={true} style={this.styles.red}>{"Ant."}
                <Text selectable={true} style={this.styles.black}> {GF.rs(this.COMPLETES.ant1, this.superTestMode, this.testErrorCB.bind(this))}</Text>
              </Text>
              {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
              <Text selectable={true} style={this.styles.redCenter}>{GF.rs(this.COMPLETES.titol1, this.superTestMode, this.testErrorCB.bind(this))}</Text>
              {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
              {this.COMPLETES.com1 !== '-' ?
                <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
                <Text selectable={true} style={this.styles.blackSmallItalicRight}>{GF.rs(this.COMPLETES.com1, this.superTestMode, this.testErrorCB.bind(this))}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
              <Text selectable={true} style={this.styles.black}>{this.salm(GF.rs(this.COMPLETES.salm1, this.superTestMode, this.testErrorCB.bind(this)))}</Text>
              {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
              {this.gloria(this.COMPLETES.gloria1)}
              {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
              <Text selectable={true} style={this.styles.red}>{"Ant."}
                <Text selectable={true} style={this.styles.black}> {GF.rs(this.COMPLETES.ant1, this.superTestMode, this.testErrorCB.bind(this))}</Text>
              </Text>
            </View>
          }
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <HR/>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>{"LECTURA BREU"}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>{GF.rs(this.COMPLETES.vers, this.superTestMode, this.testErrorCB.bind(this), this.superTestMode, this.testErrorCB.bind(this))}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.black}>{GF.rs(this.COMPLETES.lecturaBreu, this.superTestMode, this.testErrorCB.bind(this))}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <HR/>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>{"RESPONSORI BREU"}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          {this.COMPLETES.antRespEspecial === "-" ?
            <View>
              <Text selectable={true} style={this.styles.red}>V.
                <Text selectable={true} style={this.styles.black}> {GF.respTogether(GF.rs(this.COMPLETES.respBreu1, this.superTestMode, this.testErrorCB.bind(this)),GF.rs(this.COMPLETES.respBreu2, this.superTestMode, this.testErrorCB.bind(this)))}</Text>
              </Text>
              <Text selectable={true} style={this.styles.red}>R.
                <Text selectable={true} style={this.styles.black}> {GF.respTogether(GF.rs(this.COMPLETES.respBreu1, this.superTestMode, this.testErrorCB.bind(this)),GF.rs(this.COMPLETES.respBreu2, this.superTestMode, this.testErrorCB.bind(this)))}</Text>
              </Text>
              {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
              <Text selectable={true} style={this.styles.red}>V.
                <Text selectable={true} style={this.styles.black}> {GF.rs(this.COMPLETES.respBreu3, this.superTestMode, this.testErrorCB.bind(this))}</Text>
              </Text>
              <Text selectable={true} style={this.styles.red}>R.
                <Text selectable={true} style={this.styles.black}> {GF.rs(this.COMPLETES.respBreu2, this.superTestMode, this.testErrorCB.bind(this))}</Text>
              </Text>
              {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
              <Text selectable={true} style={this.styles.red}>V.
                <Text selectable={true} style={this.styles.black}>{" Glòria al Pare i al Fill i a l'Esperit Sant."}</Text>
              </Text>
              <Text selectable={true} style={this.styles.red}>R.
                <Text selectable={true} style={this.styles.black}> {GF.respTogether(GF.rs(this.COMPLETES.respBreu1, this.superTestMode, this.testErrorCB.bind(this)),GF.rs(this.COMPLETES.respBreu2, this.superTestMode, this.testErrorCB.bind(this)))}</Text>
              </Text>
            </View>
          :
            <View>
              <Text selectable={true} style={this.styles.red}>{"Ant."}
                <Text selectable={true} style={this.styles.black}> {GF.rs(this.COMPLETES.antRespEspecial, this.superTestMode, this.testErrorCB.bind(this))}</Text>
              </Text>
            </View>
          }
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <HR/>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>{"CÀNTIC SIMEÓ"}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>{"Ant."}
            <Text selectable={true} style={this.styles.black}> {GF.rs(this.COMPLETES.antCantic, this.superTestMode, this.testErrorCB.bind(this))}</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.redCenter}>{"Càntic\nLc 2, 29-32\nCrist, llum de les nacions i glòria d'Israel"}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.black}>{this.salm(GF.rs(this.COMPLETES.cantic, this.superTestMode, this.testErrorCB.bind(this)))}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          {this.gloria('1')}
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>{"Ant."}
            <Text selectable={true} style={this.styles.black}> {GF.rs(this.COMPLETES.antCantic)}</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <HR/>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>{"ORACIÓ"}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.blackBold}>{"Preguem."}</Text>
          <Text selectable={true} style={this.styles.black}>{GF.rs(this.COMPLETES.oracio, this.superTestMode, this.testErrorCB.bind(this))}</Text>
          <Text selectable={true} style={this.styles.red}>{"R."}
            <Text selectable={true} style={this.styles.black}>{" Amén."}</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <HR/>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>{"CONCLUSIÓ"}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>{"V."}
            <Text selectable={true} style={this.styles.black}>{" Que el Senyor totpoderós ens concedeixi una nit tranquil·la i una fi benaurada."}</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>{"R."}
            <Text selectable={true} style={this.styles.black}>{" Amén."}</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <HR/>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.redCenter}>{"Antífona final de la Mare de Déu"}</Text>
          {this.antMareComp(this.state.numAntMare)}
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          {Platform.OS === 'android' ? null : <Text />}
        </View>
      );
    }
    else{
      console.log("wierd error....... this.props:",this.props);
      console.log("this.liturgicProps.LITURGIA.completes doesen't exists");
      return null;
    }
  }

  salm(salm){
    if(!salm) return null;

    if(this.variables.cleanSalm === 'false'){
      salm = salm.replace(/    [*]/g,'');
      salm = salm.replace(/   [*]/g,'');
      salm = salm.replace(/  [*]/g,'');
      salm = salm.replace(/ [*]/g,'');
      salm = salm.replace(/    [†]/g,'');
      salm = salm.replace(/   [†]/g,'');
      salm = salm.replace(/  [†]/g,'');
      salm = salm.replace(/ [†]/g,'');
    }
    return (<Text selectable={true} style={this.styles.black}>{salm}</Text>);
  }

  gloria(g){
    if(!g || !(g==='0'||g==='1')) {
      if(this.superTestMode){
        this.testErrorCB();
      }
      return null;
    }
    var gloriaString = "Glòria al Pare i al Fill    *\ni a l’Esperit Sant.\nCom era al principi, ara i sempre    *\ni pels segles dels segles. Amén.";
    if(this.variables.cleanSalm === 'false')
      gloriaString = "Glòria al Pare i al Fill    \ni a l’Esperit Sant.\nCom era al principi, ara i sempre    \ni pels segles dels segles. Amén.";

    if(g === '1'){
      if(this.variables.gloria === 'false'){
        return(<Text selectable={true} style={this.styles.blackItalic}>Glòria.</Text>);
      }
      else{
        return(<Text selectable={true} style={this.styles.blackItalic}>{gloriaString}</Text>);
      }
    }
    else{
      if(g==='0'){
        return(<Text selectable={true} style={this.styles.blackItalic}>S'omet el Glòria.</Text>);
      }
    }
  }
}

AppRegistry.registerComponent('CompletesDisplay', () => CompletesDisplay);

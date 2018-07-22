import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Platform,
  Share
} from 'react-native';
import HR from '../../../Components/HRComponent';
import GLOBAL from '../../../Globals/Globals';
import GF from '../../../Globals/GlobalFunctions';

export default class HoraMenorDisplay extends Component {
  componentDidMount(){
    this.props.events.addListener('shareButtonPressed', this.sharePressed.bind(this));
  }

  componentWillUnmount(){
    this.props.events.removeListener('shareButtonPressed', this.sharePressed.bind(this));
  }

  sharePressed(){
    Share.share({
      message: this.shareText,
      url: 'https://mescpl.cpl.es/donacions/',
      title: 'Text de la Litúrgia de les Hores'
    },
    {
      // Android only:
      dialogTitle: 'Comparteix tot el text',
    })
  }

  constructor(props){
    super(props);

    console.log("PlaceLog. HoraMenorDisplay");

    var textSize = this.props.variables.textSize;

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
      }
    }

    this.shareText = "";
  }

  render() {
    try {
      this.shareText = "";

      const gloriaStringIntro = "Glòria al Pare i al Fill\ni a l’Esperit Sant.\nCom era al principi, ara i sempre\ni pels segles dels segles. Amén.";
      var aux_isAleluia = this.props.liturgicProps.LT !== GLOBAL.Q_CENDRA && this.props.liturgicProps.LT !== GLOBAL.Q_SETMANES && this.props.liturgicProps.LT !== GLOBAL.Q_DIUM_RAMS && this.props.liturgicProps.LT !== GLOBAL.Q_SET_SANTA && this.props.liturgicProps.LT !== GLOBAL.Q_TRIDU; //TODO: tenir en compte si és o no Quaresma

      this.shareText += "V. Sigueu amb nosaltres, Déu nostre.\n";
      this.shareText += "R. Senyor, veniu a ajudar-nos.\n\n";
      this.shareText += gloriaStringIntro +  (aux_isAleluia? "\nAl·leluia" : "");
      this.shareText += '\n\n';

      return (
        <View>
          <Text selectable={true} style={this.styles.red}>{'V. '}
            <Text selectable={true} style={this.styles.black}>{'Sigueu amb nosaltres, Déu nostre.'}</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>{'R. '}
            <Text selectable={true} style={this.styles.black}>{'Senyor, veniu a ajudar-nos.'}</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.black}>{gloriaStringIntro}
          {aux_isAleluia?
            <Text selectable={true} style={this.styles.black}>{" Al·leluia"}</Text> : null
          }
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <HR/>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>{'HIMNE'}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          {this.himne(this.props.liturgicProps.LT, this.props.variables.date.getDay(), this.props.liturgicProps.setmana, this.props.HM)}
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <HR/>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>{'SALMÒDIA'}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          {this.salmodia(this.props.liturgicProps.LT, this.props.liturgicProps.setmana, this.props.variables.date.getDay(), this.props.HM)}
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <HR/>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>{'LECTURA BREU'}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          {this.lecturaBreuResp(this.props.liturgicProps.LT, this.props.HM)}
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <HR/>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>{'ORACIÓ'}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.blackBold}>{'Preguem.'}</Text>
          {this.oracio(this.props.liturgicProps.LT, this.props.variables.date.getDay(), this.props.HM)}
          <Text selectable={true} style={this.styles.red}>{'R. '}
            <Text selectable={true} style={this.styles.black}>{'Amén.'}</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <HR/>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>{'CONCLUSIÓ'}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>{'V. '}
            <Text selectable={true} style={this.styles.black}>{'Beneïm el Senyor.'}</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>{'R. '}
            <Text selectable={true} style={this.styles.black}>{'Donem gràcies a Déu.'}</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          {Platform.OS === 'android' ? null : <Text />}
        </View>
      );
    }
    catch (e) {
      console.log(e);
      return null;
    }
  }

  salm(salm){
    if(!salm) return "";

    if(this.props.variables.cleanSalm === 'false'){
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

  gloria(g){
    if(!g || !(g==='0'||g==='1')) {
      if(this.superTestMode){
        this.testErrorCB();
      }
      return "";
    }
    var gloriaString = "Glòria al Pare i al Fill    *\ni a l’Esperit Sant.\nCom era al principi, ara i sempre    *\ni pels segles dels segles. Amén.";
    if(this.props.variables.cleanSalm === 'false')
      gloriaString = "Glòria al Pare i al Fill    \ni a l’Esperit Sant.\nCom era al principi, ara i sempre    \ni pels segles dels segles. Amén.";

    if(g === '1'){
      if(this.props.variables.gloria === 'false'){
        return 'Glòria.';
      }
      else{
        return gloriaString;
      }
    }
    else{
      if(g==='0'){
        return "S'omet el Glòria.";
      }
    }
  }

  himne(LT, weekDay, setmana, HM){
    var aux_himne = GF.rs(this.props.HORA_MENOR.himne, this.props.superTestMode, this.props.testErrorCB.bind(this));

    this.shareText += 'HIMNE\n\n';
    this.shareText += aux_himne + '\n\n';

    return(<Text selectable={true} style={this.styles.black}>{aux_himne}</Text>);
  }

  salmodia(LT, setmana, weekDay, HM){
    var aux_antifones = this.props.HORA_MENOR.antifones;
    var aux_ant1 = GF.rs(this.props.HORA_MENOR.ant1, this.props.superTestMode, this.props.testErrorCB.bind(this));
    var aux_ant = GF.rs(this.props.HORA_MENOR.ant, this.props.superTestMode, this.props.testErrorCB.bind(this));
    var aux_titol1 = GF.rs(this.props.HORA_MENOR.titol1, this.props.superTestMode, this.props.testErrorCB.bind(this));
    var aux_has_com1 = this.props.HORA_MENOR.com1 !== '-';
    var aux_com1 = GF.rs(this.props.HORA_MENOR.com1, this.props.superTestMode, this.props.testErrorCB.bind(this));
    var aux_salm1 = this.salm(GF.rs(this.props.HORA_MENOR.salm1, this.props.superTestMode, this.props.testErrorCB.bind(this)));
    var aux_gloria1 = this.gloria(this.props.HORA_MENOR.gloria1);
    var aux_ant2 = GF.rs(this.props.HORA_MENOR.ant2, this.props.superTestMode, this.props.testErrorCB.bind(this));
    var aux_titol2 = GF.rs(this.props.HORA_MENOR.titol2, this.props.superTestMode, this.props.testErrorCB.bind(this));
    var aux_has_com2 = this.props.HORA_MENOR.com2 !== '-';
    var aux_com2 = GF.rs(this.props.HORA_MENOR.com2, this.props.superTestMode, this.props.testErrorCB.bind(this));
    var aux_salm2 = this.salm(GF.rs(this.props.HORA_MENOR.salm2, this.props.superTestMode, this.props.testErrorCB.bind(this)));
    var aux_gloria2 = this.gloria(this.props.HORA_MENOR.gloria2);
    var aux_ant3 = GF.rs(this.props.HORA_MENOR.ant3, this.props.superTestMode, this.props.testErrorCB.bind(this));
    var aux_titol3 = GF.rs(this.props.HORA_MENOR.titol3, this.props.superTestMode, this.props.testErrorCB.bind(this));
    var aux_has_com3 = this.props.HORA_MENOR.com3 !== '-';
    var aux_com3 = GF.rs(this.props.HORA_MENOR.com3, this.props.superTestMode, this.props.testErrorCB.bind(this));
    var aux_salm3 = this.salm(GF.rs(this.props.HORA_MENOR.salm3, this.props.superTestMode, this.props.testErrorCB.bind(this)));
    var aux_gloria3 = this.gloria(this.props.HORA_MENOR.gloria3);

    this.shareText += 'SALMÒDIA\n\n';
    this.shareText += (aux_antifones? ('Ant. 1. ' + aux_ant1) : ('Ant. ' + aux_ant)) + '\n\n';
    this.shareText += aux_titol1 + '\n\n';
    if(aux_has_com1) this.shareText += aux_com1 + '\n\n';
    this.shareText += aux_salm1 + '\n\n';
    this.shareText += aux_gloria1 + '\n\n';
    this.shareText += (aux_antifones? ('Ant. 1. ' + aux_ant1 + '\n\n') : "");
    this.shareText += (aux_antifones? ('Ant. 2. ' + aux_ant2 + '\n\n') : "");
    this.shareText += aux_titol2 + '\n\n';
    if(aux_has_com2) this.shareText += aux_com2 + '\n\n';
    this.shareText += aux_salm2 + '\n\n';
    this.shareText += aux_gloria2 + '\n\n';
    this.shareText += (aux_antifones? ('Ant. 2. ' + aux_ant2 + '\n\n') : "");
    this.shareText += (aux_antifones? ('Ant. 3. ' + aux_ant3 + '\n\n') : "");
    this.shareText += aux_titol3 + '\n\n';
    if(aux_has_com3) this.shareText += aux_com3 + '\n\n';
    this.shareText += aux_salm3 + '\n\n';
    this.shareText += aux_gloria3 + '\n\n';
    this.shareText += (aux_antifones? ('Ant. 3. ' + aux_ant3) : ('Ant. ' + aux_ant)) + '\n\n';

    return(
      <View>
        {aux_antifones?
          <View>
            <Text selectable={true} style={this.styles.red}>{'Ant. 1. '}
              <Text selectable={true} style={this.styles.black}>{aux_ant1}</Text>
            </Text>
          </View>
        :
          <View>
            <Text selectable={true} style={this.styles.red}>{'Ant. '}
              <Text selectable={true} style={this.styles.black}>{aux_ant}</Text>
            </Text>
          </View>
        }
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{aux_titol1}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {aux_has_com1 ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{aux_com1}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
        <Text selectable={true} style={this.styles.black}>{aux_salm1}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackItalic}>{aux_gloria1}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {aux_antifones ?
          <View>
            <Text selectable={true} style={this.styles.red}>{'Ant. 1. '}
              <Text selectable={true} style={this.styles.black}>{aux_ant1}</Text>
            </Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>{'Ant. 2. '}
              <Text selectable={true} style={this.styles.black}>{aux_ant2}</Text>
            </Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          </View>
        : null }
        <Text selectable={true} style={this.styles.redCenter}>{aux_titol2}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {aux_has_com2 ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{aux_com2}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
        <Text selectable={true} style={this.styles.black}>{aux_salm2}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackItalic}>{aux_gloria2}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {aux_antifones ?
          <View>
            <Text selectable={true} style={this.styles.red}>{'Ant. 2. '}
              <Text selectable={true} style={this.styles.black}>{aux_ant2}</Text>
            </Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>{'Ant. 3. '}
              <Text selectable={true} style={this.styles.black}>{aux_ant3}</Text>
            </Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          </View>
        : null }
        <Text selectable={true} style={this.styles.redCenter}>{aux_titol3}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {aux_has_com3 ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{aux_com3}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
        <Text selectable={true} style={this.styles.black}>{aux_salm3}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackItalic}>{aux_gloria3}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {aux_antifones ?
          <View>
            <Text selectable={true} style={this.styles.red}>{'Ant. 3. '}
              <Text selectable={true} style={this.styles.black}>{aux_ant3}</Text>
            </Text>
          </View>
        :
          <View>
            <Text selectable={true} style={this.styles.red}>{'Ant. '}
              <Text selectable={true} style={this.styles.black}>{aux_ant}</Text>
            </Text>
          </View>
        }
      </View>
    );
  }

  lecturaBreuResp(LT, HM){
    var aux_vers = GF.rs(this.props.HORA_MENOR.vers, this.props.superTestMode, this.props.testErrorCB.bind(this));
    var aux_lecturaBreu = GF.rs(this.props.HORA_MENOR.lecturaBreu, this.props.superTestMode, this.props.testErrorCB.bind(this));
    var aux_respV = GF.rs(this.props.HORA_MENOR.respV, this.props.superTestMode, this.props.testErrorCB.bind(this));
    var aux_respR = GF.rs(this.props.HORA_MENOR.respR, this.props.superTestMode, this.props.testErrorCB.bind(this));

    this.shareText += "LECTURA BREU\n\n";
    this.shareText += aux_vers + '\n\n';
    this.shareText += 'V. ' + aux_respV + '\n';
    this.shareText += 'R. ' + aux_respR + '\n\n';

    return(
      <View>
        <Text selectable={true} style={this.styles.red}>{aux_vers}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.black}>{aux_lecturaBreu}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'V. '}
          <Text selectable={true} style={this.styles.black}>{aux_respV}</Text>
        </Text>
        <Text selectable={true} style={this.styles.red}>{'R. '}
          <Text selectable={true} style={this.styles.black}>{aux_respR}</Text>
        </Text>
      </View>
    )
  }

  oracio(LT, weekDay, HM){
    var aux_oracio = GF.completeOracio(GF.rs(this.props.HORA_MENOR.oracio, this.props.superTestMode, this.props.testErrorCB.bind(this)),true);
    this.shareText += "ORACIÓ\n\nPreguem.\n";
    this.shareText += aux_oracio + '\n\n';

    this.shareText += 'CONCLUSIÓ\n\n';
    this.shareText += 'V. Beneïm el Senyor.\nR. Donem gràcies a Déu.' + '\n\n';

    if(Platform.OS === 'ios'){
      this.shareText += "_____\nCol·labora fent un donatiu:";
    }

    return(<Text selectable={true} style={this.styles.black}>{aux_oracio}</Text>);
  }
}

AppRegistry.registerComponent('HoraMenorDisplay', () => HoraMenorDisplay);

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

export default class LaudesDisplay extends Component {
  componentDidMount(){
    console.log("Did mount");

    this.props.saveShareTextCB(this.shareText);
  }

  constructor(props){
    super(props);

    console.log("PlaceLog. LaudesDisplay");

    var textSize = props.variables.textSize;

    var auxNumSalmInv = props.variables.numSalmInv;

    if(!GF.salmInvExists(auxNumSalmInv,props.titols)){
      auxNumSalmInv = '94';
      props.setNumSalmInv('94');
      SettingsManager.setSettingNumSalmInv('94');
    }

    this.state = {
      invitatori: props.superTestMode,
      numSalmInv: auxNumSalmInv,
    }

    this.styles = {
      black: {
        color: '#000000',
        fontSize: GF.convertTextSize(textSize),
      },
      invitatoriButton: {
        color: 'grey',
        fontSize: GF.convertTextSize(textSize)-3,
      },
      texSalmInvButton: {
        color: 'grey',
        fontSize: GF.convertTextSize(textSize) > 17? 17 : GF.convertTextSize(textSize)-3,
      },
      texSalmInvButtonBold: {
        color: 'grey',
        fontSize: GF.convertTextSize(textSize) > 17? 17 : GF.convertTextSize(textSize)-3,
        fontWeight: 'bold',
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
      redItalic:{
        color: '#FF0000',
        fontSize: GF.convertTextSize(textSize),
        fontStyle: 'italic'
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

    this.LAUDES = props.liturgicProps.LITURGIA.laudes;
    this.liturgicProps = props.liturgicProps;
    this.variables = props.variables;
    this.superTestMode = props.superTestMode;
    this.testErrorCB = props.testErrorCB;
    this.setNumSalmInv = props.setNumSalmInv;
    this.titols = props.titols;

    this.shareText = "";
  }

  _onSalmInvPress(numSalm){
    this.setState({numSalmInv:numSalm});
    this.setNumSalmInv(numSalm);
    SettingsManager.setSettingNumSalmInv(numSalm);
  }

  salmInvitatori(numSalm, salm94, salm99, salm66, salm23){
    var style94 = this.styles.texSalmInvButton;
    var style99 = this.styles.texSalmInvButton;
    var style66 = this.styles.texSalmInvButton;
    var style23 = this.styles.texSalmInvButton;

    switch (numSalm) {
      case '94':
        titolSalm = "Salm 94\nInvitació a lloar Déu";
        refSalm = "Mentre repetim aquell «avui», exhortem-nos cada dia els uns als altres (He 3, 13)";
        salm = salm94;
        style94 = this.styles.texSalmInvButtonBold;
        break;
      case '99':
        titolSalm = "Salm 99\nInvitació a lloar Déu en el seu temple";
        refSalm = "El Senyor vol que els redimits cantin himnes de victòria (St. Atanasi)";
        salm = salm99;
        style99 = this.styles.texSalmInvButtonBold;
        break;
      case '66':
        titolSalm = "Salm 66\nInvitació als pobles a lloar Déu";
        refSalm = "Sapigueu que el missatge de la salvació de Déu ha estat enviat a tots els pobles (Fets 28, 28)";
        salm = salm66;
        style66 = this.styles.texSalmInvButtonBold;
        break;
      case '23':
        titolSalm = "Salm 23\nEntrada del Senyor al santuari";
        refSalm = "Les portes del cel s'obriren a Crist quan hi fou endut amb la seva humanitat (St. Ireneu)";
        salm = salm23;
        style23 = this.styles.texSalmInvButtonBold;
        break;
    }

    var estrofes = salm.split("\n\n");
    var antifona = GF.rs(this.LAUDES.antInvitatori, this.superTestMode, this.testErrorCB.bind(this));
    var gloriaString = "Glòria al Pare i al Fill    \ni a l’Esperit Sant.\nCom era al principi, ara i sempre    \ni pels segles dels segles. Amén.";

    return(
      <View>

        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row',paddingVertical: 10}}>
            <TouchableOpacity onPress={this._onSalmInvPress.bind(this,'94')}>
              <Text style={style94}>{"Salm 94  "}</Text>
            </TouchableOpacity>
            {GF.salmInvExists('99',this.titols)?
              <TouchableOpacity onPress={this._onSalmInvPress.bind(this,'99')}>
                <Text style={style99}>{"  Salm 99  "}</Text>
              </TouchableOpacity>
            :
              null
            }
            {GF.salmInvExists('66',this.titols)?
              <TouchableOpacity onPress={this._onSalmInvPress.bind(this,'66')}>
                <Text style={style66}>{"  Salm 66  "}</Text>
              </TouchableOpacity>
            :
              null
            }
            {GF.salmInvExists('23',this.titols)?
              <TouchableOpacity onPress={this._onSalmInvPress.bind(this,'23')}>
                <Text style={style23}>{"  Salm 23"}</Text>
              </TouchableOpacity>
            :
              null
            }
          </View>
        </View>

        <Text selectable={true} style={this.styles.red}>{"Ant."}
          <Text selectable={true} style={this.styles.black}> {antifona}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{titolSalm}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
        <Text selectable={true} style={this.styles.blackSmallItalicRight}>{refSalm}</Text></View></View>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.black}>{estrofes[0]}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{"Ant."}
          <Text selectable={true} style={this.styles.black}> {antifona}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.black}>{estrofes[1]}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{"Ant."}
          <Text selectable={true} style={this.styles.black}> {antifona}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.black}>{estrofes[2]}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{"Ant."}
          <Text selectable={true} style={this.styles.black}> {antifona}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.black}>{estrofes[3]}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{"Ant."}
          <Text selectable={true} style={this.styles.black}> {antifona}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {estrofes.length > 4?
          <View>
            <Text selectable={true} style={this.styles.black}>{estrofes[4]}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>{"Ant."}
              <Text selectable={true} style={this.styles.black}> {antifona}</Text>
            </Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          </View>
        : null}
        {estrofes.length > 5?
          <View>
            <Text selectable={true} style={this.styles.black}>{estrofes[5]}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>{"Ant."}
              <Text selectable={true} style={this.styles.black}> {antifona}</Text>
            </Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          </View>
        : null}
        {estrofes.length > 6?
          <View>
            <Text selectable={true} style={this.styles.black}>{estrofes[6]}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>{"Ant."}
              <Text selectable={true} style={this.styles.black}> {antifona}</Text>
            </Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          </View>
        : null}
        <Text selectable={true} style={this.styles.black}>{gloriaString}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{"Ant."}
          <Text selectable={true} style={this.styles.black}> {antifona}</Text>
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.introduccio(this.liturgicProps.LT, this.liturgicProps.setmana, this.LAUDES.salm94,
                            this.LAUDES.salm99, this.LAUDES.salm66, this.LAUDES.salm23)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'HIMNE'}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.himne(this.liturgicProps.LT, this.variables.date.getDay(), this.liturgicProps.setmana)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'SALMÒDIA'}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.salmodia(this.liturgicProps.LT, this.liturgicProps.setmana, this.variables.date.getDay())}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'LECTURA BREU'}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.lecturaBreu(this.liturgicProps.LT)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'RESPONSORI BREU'}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.responsori(this.liturgicProps.LT)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'CÀNTIC DE ZACARIES'}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.cantic(this.liturgicProps.LT, this.variables.date.getDay(), this.liturgicProps.ABC)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'PREGÀRIES'}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.pregaries(this.liturgicProps.LT)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'ORACIÓ'}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.oracio(this.liturgicProps.LT, this.variables.date.getDay())}
        <Text selectable={true} style={this.styles.red}>{'R.'}
          <Text selectable={true} style={this.styles.black}>{' Amén.'}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'CONCLUSIÓ'}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'V.'}
          <Text selectable={true} style={this.styles.black}>{' Que el Senyor ens beneeixi i ens guardi de tot mal, i ens dugui a la vida eterna.'}</Text>
        </Text>
        <Text selectable={true} style={this.styles.red}>{'R.'}
          <Text selectable={true} style={this.styles.black}>{' Amén.'}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {Platform.OS === 'android' ? null : <Text />}
      </View>
    );
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
    if(this.variables.cleanSalm === 'false')
      gloriaString = "Glòria al Pare i al Fill    \ni a l’Esperit Sant.\nCom era al principi, ara i sempre    \ni pels segles dels segles. Amén.";

    if(g === '1'){
      if(true === true){ //TODO: tenir en compte els ajustaments
        return('Glòria.');
      }
      else{
        return(gloriaString);
      }
    }
    else{
      if(g==='0'){
        return("S'omet el Glòria.");
      }
    }
  }

  _invitatoriButton(){
    return(
      <View>
        <TouchableOpacity onPress={() => this.setState({invitatori: !this.state.invitatori})}>
          <View style={{alignItems: 'center',paddingVertical: 10}}>
            <Text style={this.styles.invitatoriButton}>{this.state.invitatori?"Amagar":"Començar amb"}{" l'invitatori"}</Text>
          </View>
        </TouchableOpacity>
        {this.state.invitatori?
          <View>
            <Text selectable={true} style={this.styles.red}>{"INVITATORI"}</Text>
              {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          </View>
          :null
        }
      </View>
    );
  }

  introduccio(LT, setmana, salm94, salm99, salm66, salm23){
    const gloriaStringIntro = "Glòria al Pare i al Fill\ni a l’Esperit Sant.\nCom era al principi, ara i sempre\ni pels segles dels segles. Amén.";

    if(!this.LAUDES.diumPasqua && !this.state.invitatori){//this.LAUDES.invitatori !== "Laudes"){
      return(
        <View>
          {this._invitatoriButton()}
          <Text selectable={true} style={this.styles.red}>{'V.'}
            <Text selectable={true} style={this.styles.black}>{' Sigueu amb nosaltres, Déu nostre.'}</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>{'R.'}
            <Text selectable={true} style={this.styles.black}>{' Senyor, veniu a ajudar-nos.'}</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.black}>{gloriaStringIntro}
            {this.liturgicProps.LT !== GLOBAL.Q_CENDRA && this.liturgicProps.LT !== GLOBAL.Q_SETMANES && this.liturgicProps.LT !== GLOBAL.Q_DIUM_RAMS && this.liturgicProps.LT !== GLOBAL.Q_SET_SANTA && this.liturgicProps.LT !== GLOBAL.Q_TRIDU ?
              <Text selectable={true} style={this.styles.black}>{' Al·leluia'}</Text> : null
            }
          </Text>
        </View>
      )
    }
    else{
      return(
        <View>
          {!this.LAUDES.diumPasqua?
            <View>{this._invitatoriButton()}</View>
            : null
          }
          <Text selectable={true} style={this.styles.red}>{'V.'}
            <Text selectable={true} style={this.styles.black}>{' Obriu-me els llavis, Senyor.'}</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>{'R.'}
            <Text selectable={true} style={this.styles.black}>{' I proclamaré la vostra lloança.'}</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <HR/>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          {this.salmInvitatori(this.state.numSalmInv, salm94, salm99, salm66, salm23)}
        </View>
      )
    }
  }
  himne(LT, weekDay, setmana){
    var aux_himne = GF.rs(this.LAUDES.himne, this.superTestMode, this.testErrorCB.bind(this));

    this.shareText += 'HIMNE\n';
    this.shareText += aux_himne + '\n\n';
    return(<Text selectable={true} style={this.styles.black}>{aux_himne}</Text>);
  }

  salmodia(LT, setmana, weekDay){
    var aux_ant1 = GF.rs(this.LAUDES.ant1, this.superTestMode, this.testErrorCB.bind(this));
    var aux_titol1 = GF.rs(this.LAUDES.titol1, this.superTestMode, this.testErrorCB.bind(this));
    var aux_com1 = "";
    if(this.LAUDES.com1 !== '-')
      aux_com1 = GF.rs(this.LAUDES.com1, this.superTestMode, this.testErrorCB.bind(this));
    var aux_salm1 = this.salm(GF.rs(this.LAUDES.salm1, this.superTestMode, this.testErrorCB.bind(this)));
    var aux_gloria1 = this.gloria(this.LAUDES.gloria1);
    var aux_ant2 = GF.rs(this.LAUDES.ant2, this.superTestMode, this.testErrorCB.bind(this));
    var aux_titol2 = GF.canticSpace(GF.rs(this.LAUDES.titol2, this.superTestMode, this.testErrorCB.bind(this)));
    var aux_com2 = "";
    if(this.LAUDES.com2 !== '-')
      aux_com2 = GF.rs(this.LAUDES.com2, this.superTestMode, this.testErrorCB.bind(this));
    var aux_salm2 = this.salm(GF.rs(this.LAUDES.salm2, this.superTestMode, this.testErrorCB.bind(this)));
    var aux_gloria2 = this.gloria(this.LAUDES.gloria2);
    var aux_ant3 = GF.rs(this.LAUDES.ant3, this.superTestMode, this.testErrorCB.bind(this));
    var aux_titol3 = GF.canticSpace(GF.rs(this.LAUDES.titol3, this.superTestMode, this.testErrorCB.bind(this)));
    var aux_com3 = "";
    if(this.LAUDES.com3 !== '-')
      aux_com3 = GF.rs(this.LAUDES.com3, this.superTestMode, this.testErrorCB.bind(this));
    var aux_salm3 = this.salm(GF.rs(this.LAUDES.salm3, this.superTestMode, this.testErrorCB.bind(this)));
    var aux_gloria3 = this.gloria(this.LAUDES.gloria3);

    this.shareText += 'SALMÒDIA\n';
    this.shareText += 'Ant. 1. ';
    this.shareText += aux_ant1 + '\n';
    this.shareText += aux_titol1 + '\n\n';
    this.shareText += aux_com1 + '\n';
    this.shareText += aux_salm1 + '\n\n';
    this.shareText += aux_gloria1 + '\n\n';
    this.shareText += 'Ant. 1. ';
    this.shareText += aux_ant1 + '\n\n';
    this.shareText += 'Ant. 2. ';
    this.shareText += aux_ant2 + '\n';
    this.shareText += aux_titol2 + '\n\n';
    this.shareText += aux_com2 + '\n';
    this.shareText += aux_salm2 + '\n\n';
    this.shareText += aux_gloria2 + '\n\n';
    this.shareText += 'Ant. 2. ';
    this.shareText += aux_ant2 + '\n\n';
    this.shareText += 'Ant. 3. ';
    this.shareText += aux_ant3 + '\n';
    this.shareText += aux_titol3 + '\n\n';
    this.shareText += aux_com3 + '\n';
    this.shareText += aux_salm3 + '\n\n';
    this.shareText += aux_gloria3 + '\n\n';
    this.shareText += 'Ant. 3. ';
    this.shareText += aux_ant3 + '\n\n';

    return(
      <View>
        <Text selectable={true} style={this.styles.red}>{'Ant. 1.'}
          <Text selectable={true} style={this.styles.black}> {aux_ant1}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{aux_titol1}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.LAUDES.com1 !== '-' ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{aux_com1}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
        <Text selectable={true} style={this.styles.black}>{aux_salm1}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackItalic}>{aux_gloria1}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'Ant. 1.'}
          <Text selectable={true} style={this.styles.black}> {aux_ant1}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'Ant. 2.'}
          <Text selectable={true} style={this.styles.black}> {aux_ant2}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{aux_titol2}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.LAUDES.com2 !== '-' ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{aux_com2}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
        <Text selectable={true} style={this.styles.black}>{aux_salm2}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackItalic}>{aux_gloria2}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'Ant. 2.'}
          <Text selectable={true} style={this.styles.black}> {aux_ant2}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'Ant. 3.'}
          <Text selectable={true} style={this.styles.black}> {aux_ant3}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{aux_titol3}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.LAUDES.com3 !== '-' ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{aux_com3}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
        <Text selectable={true} style={this.styles.black}>{aux_salm3}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackItalic}>{aux_gloria3}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'Ant. 3.'}
          <Text selectable={true} style={this.styles.black}> {aux_ant3}</Text>
        </Text>
      </View>
    );
  }

  lecturaBreu(LT){
    return(
      <View>
        <Text selectable={true} style={this.styles.red}>{GF.rs(this.LAUDES.vers, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.black}>{GF.rs(this.LAUDES.lecturaBreu, this.superTestMode, this.testErrorCB.bind(this))}</Text>
      </View>
    )
  }

  responsori(LT){
    if(this.LAUDES.calAntEspecial){
      return(
        <View>
          <Text selectable={true} style={this.styles.red}>{'Ant.'}
            <Text selectable={true} style={this.styles.black}> {GF.rs(this.LAUDES.antEspecialLaudes, this.superTestMode, this.testErrorCB.bind(this))}</Text>
          </Text>
        </View>
      )
    }
    else{
      return(
        <View>
          <Text selectable={true} style={this.styles.red}>{'V.'}
            <Text selectable={true} style={this.styles.black}> {GF.respTogether(GF.rs(this.LAUDES.respBreu1, this.superTestMode, this.testErrorCB.bind(this)),GF.rs(this.LAUDES.respBreu2, this.superTestMode, this.testErrorCB.bind(this)))}</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>{'R.'}
            <Text selectable={true} style={this.styles.black}> {GF.respTogether(GF.rs(this.LAUDES.respBreu1, this.superTestMode, this.testErrorCB.bind(this)),GF.rs(this.LAUDES.respBreu2, this.superTestMode, this.testErrorCB.bind(this)))}</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>{'V.'}
            <Text selectable={true} style={this.styles.black}> {GF.rs(this.LAUDES.respBreu3, this.superTestMode, this.testErrorCB.bind(this))}</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>{'R.'}
            <Text selectable={true} style={this.styles.black}> {GF.rs(this.LAUDES.respBreu2, this.superTestMode, this.testErrorCB.bind(this))}</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>{'V.'}
            <Text selectable={true} style={this.styles.black}>{" Glòria al Pare i al Fill i a l'Esperit Sant."}</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>{'R.'}
            <Text selectable={true} style={this.styles.black}> {GF.respTogether(GF.rs(this.LAUDES.respBreu1, this.superTestMode, this.testErrorCB.bind(this)),GF.rs(this.LAUDES.respBreu2, this.superTestMode, this.testErrorCB.bind(this)))}</Text>
          </Text>
        </View>
      )
    }
  }

  cantic(LT, weekDay, litYear){
    return(
      <View>
        <Text selectable={true} style={this.styles.red}>{'Ant.'}
          <Text selectable={true} style={this.styles.black}> {GF.rs(this.LAUDES.antCantic, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{"Càntic\nLc 1, 68-79\nEl Messies i el seu Precursor"}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.black}>{this.salm(this.LAUDES.cantic)}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackItalic}>{this.gloria('1')}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'Ant.'}
          <Text selectable={true} style={this.styles.black}> {GF.rs(this.LAUDES.antCantic, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        </Text>
      </View>
    );
  }

  convertN(pregs,papa,bisbe){ //desconec si a Laudes existeix aquest cas
    if(pregs.search("papa N.") !== -1){
      pregs = pregs.replace("papa N.","papa "+papa);
    }
    else if(pregs.search("Papa N.") !== -1){
      pregs = pregs.replace("Papa N.","papa "+papa);
    }
    if(pregs.search("bisbe N.") !== -1){
      pregs = pregs.replace("bisbe N.","bisbe "+bisbe);
    }
    return pregs;
  }

  pregaries(LT){
    var allPregs = GF.rs(this.LAUDES.pregaries, this.superTestMode, this.testErrorCB.bind(this));

    if(allPregs === null || allPregs === undefined || allPregs === '' || allPregs === '-')
      return(<Text selectable={true} style={this.styles.black}>{"-"}</Text>);

      allPregs = this.convertN(allPregs, this.LAUDES.papa, this.LAUDES.bisbe);

      if(allPregs.match(/—/g, "")) var numGuio = allPregs.match(/—/g, "").length;
      else return(<Text selectable={true} style={this.styles.black}>{allPregs}</Text>);
      if(allPregs.match(/\n/g, "")) var numEnter = allPregs.match(/\n/g, "").length;
      else return(<Text selectable={true} style={this.styles.black}>{allPregs}</Text>);

    if(numEnter !== numGuio*3+3){//every prayer have 3 spaces and intro have 3 more
      console.log("InfoLog. incorrect spaces in pregaries");
      return(<Text selectable={true} style={this.styles.black}>{allPregs}</Text>);
    }
    else{
      var introPregs = allPregs.split(":")[0];
      // console.log("introPregs: " + introPregs);
      // console.log("allPregs:\n" + allPregs);
      if(allPregs.search(introPregs+':') !== -1){
        var pregsNoIntro = allPregs.replace(introPregs+':','');
        if(pregsNoIntro !== ''){
          while(pregsNoIntro.charAt(0) === '\n' || pregsNoIntro.charAt(0) === ' '){
            pregsNoIntro = pregsNoIntro.substring(1,pregsNoIntro.length);
          }
        }
      }
      else{
        console.log("InfoLog. something incorrect. Pregaries 1");
        return(<Text selectable={true} style={this.styles.black}>{allPregs}</Text>);
      }

      var respPregs = pregsNoIntro.split("\n")[0];
      if(pregsNoIntro.search(respPregs+'\n\n') !== -1){
        var pregaries = pregsNoIntro.replace(respPregs+'\n\n','');
      }
      else{
        console.log("InfoLog. something incorrect. Pregaries 2");
        return(<Text selectable={true} style={this.styles.black}>{allPregs}</Text>);
      }

      if(pregaries.search(": Pare nostre.") !== -1){
        pregaries = pregaries.replace(": Pare nostre.",':');
      }
      else{
        console.log("InfoLog. something incorrect. Pregaries 3");
        return(<Text selectable={true} style={this.styles.black}>{allPregs}</Text>);
      }

      var pregsFinalPart = pregaries.split("—")[numGuio].split(".\n\n")[1];
      if(pregaries.search('\n\n'+pregsFinalPart) !== -1){
        pregaries = pregaries.replace('\n\n'+pregsFinalPart,'');
      }
      else{
        console.log("InfoLog. something incorrect. Pregaries 4");
        return(<Text selectable={true} style={this.styles.black}>{allPregs}</Text>);
      }
    }

    return(
      <View>
        <Text selectable={true} style={this.styles.black}>{introPregs}{':'}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackItalic}>{respPregs}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.black}>{pregaries}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redItalic}>{"Aquí es poden afegir altres intencions."}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.black}>{pregsFinalPart}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackItalic}>{"Pare nostre."}</Text>
      </View>
    );
  }

  oracio(LT, weekDay){
    return(<Text selectable={true} style={this.styles.black}>{GF.completeOracio(GF.rs(this.LAUDES.oracio, this.superTestMode, this.testErrorCB.bind(this)),false,LT)}</Text>);
  }
}

AppRegistry.registerComponent('LaudesDisplay', () => LaudesDisplay);

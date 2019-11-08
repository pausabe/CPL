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

export default class OficiDisplay extends Component {
  componentDidMount(){
    //this.props.events.addListener('shareButtonPressed_Ofici', this.sharePressed.bind(this));
  }

  componentWillUnmount(){
    //this.props.events.removeListener('shareButtonPressed_Ofici', this.sharePressed.bind(this));
  }

  /*sharePressed(){
    console.log("PlaceLog. Ofici Share Pressed");
    Share.share({
      message: this.shareText,
      url: 'https://mescpl.cpl.es/donacions/',
      title: 'Ofici de lectura',
      subject: 'Ofici de lectura'
    },
    {
      // Android only:
      dialogTitle: 'Comparteix tot el text',
    })
  }*/

  constructor(props){
    super(props);

    console.log("PlaceLog. OficiDisplay");

    var textSize = G_VALUES.textSize;
    var auxNumSalmInv = G_VALUES.numSalmInv;

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
      blackJustified:{
        color: '#000000',
        fontSize: GF.convertTextSize(textSize),
        textAlign: Platform.OS == 'ios'? 'justify' : 'auto',
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

    this.OFICI = LH_VALUES.ofici;
    
    this.superTestMode = props.superTestMode;
    this.testErrorCB = props.testErrorCB;
    this.setNumSalmInv = props.setNumSalmInv;
    this.titols = props.titols;

    //this.shareText = "";
  }

  render() {
    try {
      //this.shareText = "";

      if(!this.OFICI.diumPasqua){
        return (
          <View>
            {this.introduccio(G_VALUES.LT, G_VALUES.setmana, this.OFICI.salm94,
                                this.OFICI.salm99, this.OFICI.salm66, this.OFICI.salm23)}
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <HR/>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>{"HIMNE"}{(G_VALUES.LT===GLOBAL.O_ORDINARI && GF.isDarkHimn())? " (nit)" : " (dia)"}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {this.himne(G_VALUES.LT, G_VALUES.date.getDay(), false, G_VALUES.setmana)}
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <HR/>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>{'SALMÒDIA'}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {this.salmodia(G_VALUES.LT, G_VALUES.setmana, G_VALUES.date.getDay(), G_VALUES.cicle)}
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <HR/>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>{'VERS'}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {this.vers(G_VALUES.LT)}
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <HR/>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>{'LECTURES'}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {this.lectures(G_VALUES.LT)}
            {this.himneOhDeu(G_VALUES.LT, G_VALUES.date.getDay())}
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <HR/>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>{'ORACIÓ'}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.blackBold}>{'Preguem.'}</Text>
            {this.oracio(G_VALUES.LT, G_VALUES.date.getDay())}
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
      else{
        var aux_vetlla = "La Vetlla pasqual substitueix avui l'Ofici de lectura.";
        var aux_participen = "Els qui no participen en la solemne Vetlla pasqual n'escolliran almenys quatre lectures, amb els corresponents salms responsorials i oracions. Les lectures més adients són les que segueixen."
        var aux_comença = "L'Ofici comença directament per les lectures.";

        //this.shareText += aux_vetlla + '\n' + aux_participen + '\n' + aux_comença + '\n\n';

        return (
          <View>
            <Text selectable={true} style={this.styles.redCenter}>{aux_vetlla}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.redCenter}>{aux_participen}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.redCenter}>{aux_comença}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <HR/>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {this.lecturesDiumPasqua(G_VALUES.LT)}
            {this.himneOhDeu(G_VALUES.LT, G_VALUES.date.getDay())}
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <HR/>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>{'ORACIÓ'}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.blackBold}>{'Preguem.'}</Text>
            {this.oracio(G_VALUES.LT, G_VALUES.date.getDay())}
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
    }
    catch (e) {
      console.log(e);
      if(this.superTestMode) this.testErrorCB();
      return null;
    }
  }

  _onSalmInvPress(numSalm){
    this.setState({ numSalmInv: numSalm });
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
    var antifona = GF.rs(this.OFICI.antInvitatori, this.superTestMode, this.testErrorCB.bind(this));
    var gloriaString = "Glòria al Pare i al Fill    \ni a l’Esperit Sant.\nCom era al principi, ara i sempre    \ni pels segles dels segles. Amén.";

    /*this.shareText += "Ant. " + antifona + '\n\n' + titolSalm + '\n\n' + refSalm + '\n\n';
    for(i = 0; i < estrofes.length; i++){
      this.shareText += estrofes[i] + '\n\n';
      this.shareText += "Ant. " + antifona + '\n\n';
    }
    this.shareText += gloriaString + '\n\n';
    this.shareText += "Ant. " + antifona + '\n\n';*/

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
    )

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

  _invitatoriButton(){
    return(
      <View>
        <TouchableOpacity onPress={()=>this.setState({invitatori:!this.state.invitatori})}>
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

    if(!this.state.invitatori/*this.OFICI.invitatori !== "Ofici"*/){

      var aux_sigueu = 'Sigueu amb nosaltres, Déu nostre.';
      var aux_senyor_veniu = 'Senyor, veniu a ajudar-nos.';
      var aux_isAleluia = G_VALUES.LT !== GLOBAL.Q_CENDRA && G_VALUES.LT !== GLOBAL.Q_SETMANES && G_VALUES.LT !== GLOBAL.Q_DIUM_RAMS && G_VALUES.LT !== GLOBAL.Q_SET_SANTA && G_VALUES.LT !== GLOBAL.Q_TRIDU;

      /*this.shareText += 'V. ' + aux_sigueu + '\n';
      this.shareText += 'R. ' + aux_senyor_veniu + '\n\n';
      this.shareText += gloriaStringIntro + (aux_isAleluia? " Al·leluia" : "");
      this.shareText += '\n\n';*/

      return(
        <View>
          {this._invitatoriButton()}
          <Text selectable={true} style={this.styles.red}>{'V. '}
            <Text selectable={true} style={this.styles.black}>{aux_sigueu}</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>{'R. '}
            <Text selectable={true} style={this.styles.black}>{aux_senyor_veniu}</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.black}>{gloriaStringIntro}
            {aux_isAleluia ?
              <Text selectable={true} style={this.styles.black}>{' Al·leluia'}</Text> : null
            }
          </Text>
        </View>
      )
    }
    else{
      var aux_obriume = 'Obriu-me els llavis, Senyor.';
      var aux_proclamare = 'I proclamaré la vostra lloança.';

      /*this.shareText += 'V. ' + aux_obriume + '\n';
      this.shareText += 'R. ' + aux_proclamare + '\n\n';*/

      return(
        <View>
          {this._invitatoriButton()}
          <Text selectable={true} style={this.styles.red}>{'V. '}
            <Text selectable={true} style={this.styles.black}>{aux_obriume}</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>{'R. '}
            <Text selectable={true} style={this.styles.black}>{aux_proclamare}</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <HR/>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          {this.salmInvitatori(this.state.numSalmInv, salm94, salm99, salm66, salm23)}
        </View>
      )
    }
  }

  himne(LT, weekDay, nit, setmana){
    var aux_himne = GF.rs(this.OFICI.himne, this.superTestMode, this.testErrorCB.bind(this));

    /*this.shareText += 'HIMNE\n\n';
    this.shareText += aux_himne + '\n\n';*/

    return(<Text selectable={true} style={this.styles.black}>{aux_himne}</Text>);
  }

  salmodia(LT, setmana, weekDay, cicle){
    var aux_ant1 = GF.rs(this.OFICI.ant1, this.superTestMode, this.testErrorCB.bind(this));
    var aux_titol1 = GF.rs(this.OFICI.titol1, this.superTestMode, this.testErrorCB.bind(this));
    var aux_has_com1 = this.OFICI.com1 !== '-';
    var aux_com1 = aux_has_com1? GF.rs(this.OFICI.com1, this.superTestMode, this.testErrorCB.bind(this)) : "";
    var aux_salm1 = this.salm(GF.rs(this.OFICI.salm1, this.superTestMode, this.testErrorCB.bind(this)));
    var aux_ant2 = GF.rs(this.OFICI.ant2, this.superTestMode, this.testErrorCB.bind(this));
    var aux_titol2 = GF.rs(this.OFICI.titol2, this.superTestMode, this.testErrorCB.bind(this));
    var aux_has_com2 = this.OFICI.com2 !== '-';
    var aux_com2 = aux_has_com2? GF.rs(this.OFICI.com2, this.superTestMode, this.testErrorCB.bind(this)) : "";
    var aux_salm2 = this.salm(GF.rs(this.OFICI.salm2, this.superTestMode, this.testErrorCB.bind(this)));
    var aux_ant3 = GF.rs(this.OFICI.ant3, this.superTestMode, this.testErrorCB.bind(this));
    var aux_titol3 = GF.rs(this.OFICI.titol3, this.superTestMode, this.testErrorCB.bind(this));
    var aux_has_com3 = this.OFICI.com3 !== '-';
    var aux_com3 = aux_has_com3? GF.rs(this.OFICI.com3, this.superTestMode, this.testErrorCB.bind(this)) : "";
    var aux_salm3 = this.salm(GF.rs(this.OFICI.salm3, this.superTestMode, this.testErrorCB.bind(this)));

    /*this.shareText += 'SALMÒDIA\n\n';
    this.shareText += 'Ant. 1. ' + aux_ant1 + '\n\n';
    this.shareText += aux_titol1 + '\n\n';
    if(aux_has_com1) this.shareText += aux_com1 + '\n\n';
    this.shareText += aux_salm1 + '\n\n';
    this.shareText += aux_gloria1 + '\n\n';
    this.shareText += 'Ant. 1. ' + aux_ant1 + '\n\n';
    this.shareText += 'Ant. 2. ' + aux_ant2 + '\n\n';
    this.shareText += aux_titol2 + '\n\n';
    if(aux_has_com2) this.shareText += aux_com2 + '\n\n';
    this.shareText += aux_salm2 + '\n\n';
    this.shareText += aux_gloria2 + '\n\n';
    this.shareText += 'Ant. 2. ' + aux_ant2 + '\n\n';
    this.shareText += 'Ant. 3. ' + aux_ant3 + '\n\n';
    this.shareText += aux_titol3 + '\n\n';
    if(aux_has_com3) this.shareText += aux_com3 + '\n\n';
    this.shareText += aux_salm3 + '\n\n';
    this.shareText += aux_gloria3 + '\n\n';
    this.shareText += 'Ant. 3. ' + aux_ant3 + '\n\n';*/

    return(
      <View>
        <Text selectable={true} style={this.styles.red}>{'Ant. 1. '}
          <Text selectable={true} style={this.styles.black}>{aux_ant1}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{aux_titol1}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {aux_has_com1 ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{aux_com1}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
        <Text selectable={true} style={this.styles.black}>{aux_salm1}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.OFICI.gloria1 == "1"?
          <Text selectable={true} style={this.styles.blackItalic}>{"Glòria."}</Text>
          :
          <Text selectable={true} style={this.styles.redItalic}>{"S'omet el Glòria."}</Text>}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'Ant. 1. '}
          <Text selectable={true} style={this.styles.black}>{aux_ant1}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'Ant. 2. '}
          <Text selectable={true} style={this.styles.black}>{aux_ant2}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{aux_titol2}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {aux_has_com2 ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{aux_com2}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
        <Text selectable={true} style={this.styles.black}>{aux_salm2}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.OFICI.gloria2 == "1"?
          <Text selectable={true} style={this.styles.blackItalic}>{"Glòria."}</Text>
          :
          <Text selectable={true} style={this.styles.redItalic}>{"S'omet el Glòria."}</Text>}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'Ant. 2. '}
          <Text selectable={true} style={this.styles.black}>{aux_ant2}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'Ant. 3. '}
          <Text selectable={true} style={this.styles.black}>{aux_ant3}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{aux_titol3}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {aux_has_com3 ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{aux_com3}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
        <Text selectable={true} style={this.styles.black}>{aux_salm3}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.OFICI.gloria3 == "1"?
          <Text selectable={true} style={this.styles.blackItalic}>{"Glòria."}</Text>
          :
          <Text selectable={true} style={this.styles.redItalic}>{"S'omet el Glòria."}</Text>}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'Ant. 3. '}
          <Text selectable={true} style={this.styles.black}>{aux_ant3}</Text>
        </Text>
      </View>
    );
  }

  vers(LT){
    var aux_respV = GF.rs(this.OFICI.respV, this.superTestMode, this.testErrorCB.bind(this));
    var aux_respR = GF.rs(this.OFICI.respR, this.superTestMode, this.testErrorCB.bind(this));

    /*this.shareText += 'VERS\n\n';
    this.shareText += 'V. ' + aux_respV + '\n';
    this.shareText += 'R. ' + aux_respR + '\n\n';*/

    return(
      <View>
        <Text selectable={true} style={this.styles.red}>{'V. '}
          <Text selectable={true} style={this.styles.black}>{aux_respV}</Text>
        </Text>
        <Text selectable={true} style={this.styles.red}>{'R. '}
          <Text selectable={true} style={this.styles.black}>{aux_respR}</Text>
        </Text>
      </View>
    );
  }

  lectures(LT){
    try {
      var aux_referencia1 = GF.rs(this.OFICI.referencia1, this.superTestMode, this.testErrorCB.bind(this));
      var aux_titol_lectura1 = GF.rs(this.OFICI.titolLectura1, this.superTestMode, this.testErrorCB.bind(this));
      var aux_has_cita1 = this.OFICI.cita1 !== '-';
      var aux_cita1 = aux_has_cita1 ? GF.rs(this.OFICI.cita1, this.superTestMode, this.testErrorCB.bind(this)) : "";
      var aux_lectura1 = GF.rs(this.OFICI.lectura1, this.superTestMode, this.testErrorCB.bind(this));
      var aux_has_citaResp1 = this.OFICI.citaResp1 !== '-';
      var aux_cita_resp1 = aux_has_citaResp1? GF.rs(this.OFICI.citaResp1, this.superTestMode, this.testErrorCB.bind(this)) : "";
      var aux_resp1_1_2 = GF.respTogether(GF.rs(this.OFICI.resp1Part1, this.superTestMode, this.testErrorCB.bind(this)),GF.rs(this.OFICI.resp1Part2, this.superTestMode, this.testErrorCB.bind(this)));
      var aux_resp1_3 = GF.rs(this.OFICI.resp1Part3, this.superTestMode, this.testErrorCB.bind(this));
      var aux_resp1_2 = GF.rs(this.OFICI.resp1Part2, this.superTestMode, this.testErrorCB.bind(this));
      var aux_referencia2 = GF.rs(this.OFICI.referencia2, this.superTestMode, this.testErrorCB.bind(this));
      var aux_titol_lectura2 = GF.rs(this.OFICI.titolLectura2, this.superTestMode, this.testErrorCB.bind(this));
      var aux_has_cita2 = this.OFICI.cita2 != null && this.OFICI.cita2 !== '-';
      var aux_cita2 = aux_has_cita2? GF.rs(this.OFICI.cita2, this.superTestMode, this.testErrorCB.bind(this)) : "";
      var aux_lectura2 = GF.rs(this.OFICI.lectura2, this.superTestMode, this.testErrorCB.bind(this));
      var aux_has_vers2 = this.OFICI.versResp2 !== '-';
      var aux_vers2 = aux_has_vers2? GF.rs(this.OFICI.versResp2, this.superTestMode, this.testErrorCB.bind(this)) : "";
      var aux_resp2_1_2 = GF.respTogether(GF.rs(this.OFICI.resp2Part1, this.superTestMode, this.testErrorCB.bind(this)),GF.rs(this.OFICI.resp2Part2, this.superTestMode, this.testErrorCB.bind(this)));
      var aux_resp2_3 = GF.rs(this.OFICI.resp2Part3, this.superTestMode, this.testErrorCB.bind(this));
      var aux_resp2_2 = GF.rs(this.OFICI.resp2Part2, this.superTestMode, this.testErrorCB.bind(this));

      /*this.shareText += 'LECTURES\n\n';
      this.shareText += 'Lectura primera\n\n';
      this.shareText += aux_referencia1 + '\n\n';
      if(aux_has_cita1) this.shareText += aux_cita1 + '\n\n';
      this.shareText += aux_titol_lectura1 + '\n\n';
      this.shareText += aux_lectura1 + '\n\n';
      this.shareText += 'Responsori\n\n';
      if(aux_has_citaResp1) this.shareText += aux_cita_resp1 + '\n\n';
      this.shareText += 'R. ' + aux_resp1_1_2 + '\n';
      this.shareText += 'V. ' + aux_resp1_3 + '\n';
      this.shareText += 'R. ' + aux_resp1_2 + '\n\n';
      this.shareText += 'Lectura segona\n\n';
      this.shareText += aux_referencia2 + '\n\n';
      this.shareText += aux_titol_lectura2 + '\n\n';
      this.shareText += aux_lectura2 + '\n\n';
      this.shareText += 'Responsori\n\n';
      if(aux_has_vers2) this.shareText += aux_vers2 + '\n\n';
      this.shareText += 'R. ' + aux_resp2_1_2 + '\n';
      this.shareText += 'V. ' + aux_resp2_3 + '\n';
      this.shareText += 'R. ' + aux_resp2_2 + '\n\n';*/

      return(
        <View>
          <Text selectable={true} style={this.styles.red}>{'Lectura primera'}</Text>
          <Text selectable={true} style={this.styles.black}>{aux_referencia1}</Text>
          {aux_has_cita1 ? <Text selectable={true} style={this.styles.red}>{aux_cita1}</Text> : null}
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.redCenterBold}>{aux_titol_lectura1}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.blackJustified}>{aux_lectura1}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>{'Responsori'}</Text>
          {aux_has_citaResp1 ? <Text selectable={true} style={this.styles.red}>{aux_cita_resp1}</Text> : null}
          <Text selectable={true} style={this.styles.red}>{'R. '}
            <Text selectable={true} style={this.styles.black}>{aux_resp1_1_2}</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>{'V. '}
            <Text selectable={true} style={this.styles.black}>{aux_resp1_3}</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>{'R. '}
            <Text selectable={true} style={this.styles.black}>{aux_resp1_2}</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>{'Lectura segona'}</Text>
          <Text selectable={true} style={this.styles.black}>{aux_referencia2}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.redCenterBold}>{aux_titol_lectura2}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.blackJustified}>{aux_lectura2}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>{'Responsori'}</Text>
          {aux_has_vers2 ? <Text selectable={true} style={this.styles.red}>{aux_vers2}</Text> : null}
          <Text selectable={true} style={this.styles.red}>{'R. '}
            <Text selectable={true} style={this.styles.black}>{aux_resp2_1_2}</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>{'V. '}
            <Text selectable={true} style={this.styles.black}>{aux_resp2_3}</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>{'R. '}
            <Text selectable={true} style={this.styles.black}>{aux_resp2_2}</Text>
          </Text>
        </View>
      )
    }
    catch (e) {
      console.log("Error", e);
      return null;
    }
  }

  lecturesDiumPasqua(LT){
    var aux_referencia1 = GF.rs(this.OFICI.referencia1, this.superTestMode, this.testErrorCB.bind(this));
    var aux_titol_lectura1 = GF.rs(this.OFICI.titolLectura1, this.superTestMode, this.testErrorCB.bind(this));
    var aux_has_cita1 = this.OFICI.cita1 !== '-';
    var aux_cita1 = aux_has_cita1? GF.rs(this.OFICI.cita1, this.superTestMode, this.testErrorCB.bind(this)) : "";
    var aux_lectura1 = GF.rs(this.OFICI.lectura1, this.superTestMode, this.testErrorCB.bind(this));
    var aux_ant1 = GF.rs(this.OFICI.ant1, this.superTestMode, this.testErrorCB.bind(this));
    var aux_titol1 = GF.rs(this.OFICI.titol1, this.superTestMode, this.testErrorCB.bind(this))
    var aux_salm1 = this.salm(GF.rs(this.OFICI.salm1, this.superTestMode, this.testErrorCB.bind(this)));
    var aux_gloria1 = "Glòria.";
    var aux_oracio1 = GF.rs(this.OFICI.oracio1, this.superTestMode, this.testErrorCB.bind(this));
    var aux_referencia2 = GF.rs(this.OFICI.referencia2, this.superTestMode, this.testErrorCB.bind(this));
    var aux_titol_lectura2 = GF.rs(this.OFICI.titolLectura2, this.superTestMode, this.testErrorCB.bind(this));
    var aux_has_cita2 = this.OFICI.cita2 !== '-';
    var aux_cita2 = aux_has_cita2? GF.rs(this.OFICI.cita2, this.superTestMode, this.testErrorCB.bind(this)) : "";
    var aux_lectura2 = GF.rs(this.OFICI.lectura2, this.superTestMode, this.testErrorCB.bind(this));
    var aux_ant2 = GF.rs(this.OFICI.ant2, this.superTestMode, this.testErrorCB.bind(this));
    var aux_titol2 = GF.rs(this.OFICI.titol2, this.superTestMode, this.testErrorCB.bind(this))
    var aux_salm2 = this.salm(GF.rs(this.OFICI.salm2, this.superTestMode, this.testErrorCB.bind(this)));
    var aux_gloria2 = "Glòria.";
    var aux_oracio2 = GF.rs(this.OFICI.oracio2, this.superTestMode, this.testErrorCB.bind(this));
    var aux_referencia3 = GF.rs(this.OFICI.referencia3, this.superTestMode, this.testErrorCB.bind(this));
    var aux_titol_lectura3 = GF.rs(this.OFICI.titolLectura3, this.superTestMode, this.testErrorCB.bind(this));
    var aux_has_cita3 = this.OFICI.cita3 !== '-';
    var aux_cita3 = aux_has_cita3? GF.rs(this.OFICI.cita3, this.superTestMode, this.testErrorCB.bind(this)) : "";
    var aux_lectura3 = GF.rs(this.OFICI.lectura3, this.superTestMode, this.testErrorCB.bind(this));
    var aux_ant3 = GF.rs(this.OFICI.ant3, this.superTestMode, this.testErrorCB.bind(this));
    var aux_titol3 = GF.rs(this.OFICI.titol3, this.superTestMode, this.testErrorCB.bind(this))
    var aux_salm3 = this.salm(GF.rs(this.OFICI.salm3, this.superTestMode, this.testErrorCB.bind(this)));
    var aux_gloria3 = "Glòria.";
    var aux_oracio3 = GF.rs(this.OFICI.oracio3, this.superTestMode, this.testErrorCB.bind(this));
    var aux_referencia4 = GF.rs(this.OFICI.referencia4, this.superTestMode, this.testErrorCB.bind(this));
    var aux_titol_lectura4 = GF.rs(this.OFICI.titolLectura4, this.superTestMode, this.testErrorCB.bind(this));
    var aux_has_cita4 = this.OFICI.cita4 !== '-';
    var aux_cita4 = aux_has_cita4? GF.rs(this.OFICI.cita4, this.superTestMode, this.testErrorCB.bind(this)) : "";
    var aux_lectura4 = GF.rs(this.OFICI.lectura4, this.superTestMode, this.testErrorCB.bind(this));

    /*this.shareText += 'Lectura primera\n\n';
    this.shareText += aux_referencia1 + '\n\n';
    if(aux_has_cita1) this.shareText += aux_cita1 + '\n\n';
    this.shareText += aux_titol_lectura1 + '\n\n';
    this.shareText += aux_lectura1 + '\n\n';
    this.shareText += 'Ant. ' + aux_ant1 + '\n\n';
    this.shareText += aux_titol1 + '\n\n';
    this.shareText += aux_salm1 + '\n\n';
    this.shareText += aux_gloria1 + '\n\n';
    this.shareText += 'Ant. ' + aux_ant1 + '\n\n';
    this.shareText += 'Preguem.\n' + aux_oracio1 + '\nR. Amén.\n\n';
    this.shareText += 'Lectura segona\n\n';
    this.shareText += aux_referencia2 + '\n\n';
    if(aux_has_cita2) this.shareText += aux_cita2 + '\n\n';
    this.shareText += aux_titol_lectura2 + '\n\n';
    this.shareText += aux_lectura2 + '\n\n';
    this.shareText += 'Ant. ' + aux_ant2 + '\n\n';
    this.shareText += aux_titol2 + '\n\n';
    this.shareText += aux_salm2 + '\n\n';
    this.shareText += aux_gloria2 + '\n\n';
    this.shareText += 'Ant. ' + aux_ant2 + '\n\n';
    this.shareText += 'Preguem.\n' + aux_oracio2 + '\nR. Amén.\n\n';
    this.shareText += 'Lectura tercera\n\n';
    this.shareText += aux_referencia3 + '\n\n';
    if(aux_has_cita3) this.shareText += aux_cita3 + '\n\n';
    this.shareText += aux_titol_lectura3 + '\n\n';
    this.shareText += aux_lectura3 + '\n\n';
    this.shareText += 'Ant. ' + aux_ant3 + '\n\n';
    this.shareText += aux_titol3 + '\n\n';
    this.shareText += aux_salm3 + '\n\n';
    this.shareText += aux_gloria3 + '\n\n';
    this.shareText += 'Ant. ' + aux_ant3 + '\n\n';
    this.shareText += 'Preguem.\n' + aux_oracio3 + '\nR. Amén.\n\n';
    this.shareText += 'Lectura quarta\n\n';
    this.shareText += aux_referencia4 + '\n\n';
    if(aux_has_cita4) this.shareText += aux_cita4 + '\n\n';
    this.shareText += aux_titol_lectura4 + '\n\n';
    this.shareText += aux_lectura4 + '\n\n';*/

    return(
      <View>
        <Text selectable={true} style={this.styles.red}>{'Lectura primera'}</Text>
        <Text selectable={true} style={this.styles.black}>{aux_referencia1}</Text>
        {aux_has_cita1 ? <Text selectable={true} style={this.styles.red}>{aux_cita1}</Text> : null}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenterBold}>{aux_titol_lectura1}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackJustified}>{aux_lectura1}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'Ant. '}
          <Text selectable={true} style={this.styles.black}>{aux_ant1}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{aux_titol1}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.black}>{aux_salm1}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackItalic}>{aux_gloria1}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'Ant. '}
          <Text selectable={true} style={this.styles.black}>{aux_ant1}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackBold}>{'Preguem.'}</Text>
        <Text selectable={true} style={this.styles.black}>{aux_oracio1}</Text>
        <Text selectable={true} style={this.styles.red}>{'R. '}
          <Text selectable={true} style={this.styles.black}>{'Amén.'}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'Lectura segona'}</Text>
        <Text selectable={true} style={this.styles.black}>{aux_referencia2}</Text>
        {aux_has_cita2 !== '-' ? <Text selectable={true} style={this.styles.red}>{aux_cita2}</Text> : null}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenterBold}>{aux_titol_lectura2}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackJustified}>{aux_lectura2}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'Ant. '}
          <Text selectable={true} style={this.styles.black}>{aux_ant2}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{aux_titol2}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.black}>{aux_salm2}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackItalic}>{aux_gloria2}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'Ant. '}
          <Text selectable={true} style={this.styles.black}>{aux_ant2}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackBold}>{'Preguem.'}</Text>
        <Text selectable={true} style={this.styles.black}>{aux_oracio2}</Text>
        <Text selectable={true} style={this.styles.red}>{'R. '}
          <Text selectable={true} style={this.styles.black}>{'Amén.'}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'Lectura tercera'}</Text>
        <Text selectable={true} style={this.styles.black}>{aux_referencia3}</Text>
        {aux_has_cita3 ? <Text selectable={true} style={this.styles.red}>{aux_cita3}</Text> : null}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenterBold}>{aux_titol_lectura3}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackJustified}>{aux_lectura3}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'Ant. '}
          <Text selectable={true} style={this.styles.black}> aux_ant3}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{aux_titol3}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.black}>{aux_salm3}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackItalic}>{aux_gloria3}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'Ant. '}
          <Text selectable={true} style={this.styles.black}>{aux_ant3}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{'Lectura quarta'}</Text>
        <Text selectable={true} style={this.styles.black}>{aux_referencia4}</Text>
        {aux_has_cita4!== '-' ? <Text selectable={true} style={this.styles.red}>{aux_cita4}</Text> : null}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenterBold}>{aux_titol_lectura4}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackJustified}>{aux_lectura4}</Text>
      </View>
    )
  }

  himneOhDeu(LT, weekDay){
    if(this.OFICI.himneOhDeuBool){
      /*this.shareText += 'HIMNE\n\n';
      this.shareText += this.OFICI.himneOhDeu + '\n\n';*/

      var aux0 = this.OFICI.himneOhDeu.split("\n\n[")[0];
      var aux1 = this.OFICI.himneOhDeu.split("\n\n[")[1];
      var himnePart1 = aux0;
      var himnePart2 = aux1.split("]")[0];
      return(
        <View>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <HR/>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>HIMNE</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.black}>{himnePart1}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : null}
          <Text selectable={true} style={this.styles.redItalic}>{"Aquesta última part es pot ometre:\n"}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : null}
          <Text selectable={true} style={this.styles.black}>{himnePart2}</Text>
        </View>
      )
    }
  }

  oracio(LT, weekDay){
    var aux_oracio = GF.completeOracio(GF.rs(this.OFICI.oracio, this.superTestMode, this.testErrorCB.bind(this)),false);
    /*this.shareText += "ORACIÓ\n\nPreguem.\n";
    this.shareText += aux_oracio + '\n\n';

    this.shareText += 'CONCLUSIÓ\n\n';
    this.shareText += 'V. Beneïm el Senyor.\nR. Donem gràcies a Déu.' + '\n\n';

    if(Platform.OS === 'ios'){
      this.shareText += "_____\nCol·labora fent un donatiu:";
    }*/

    return(<Text selectable={true} style={this.styles.black}>{aux_oracio}</Text>);
  }
}

AppRegistry.registerComponent('OficiDisplay', () => OficiDisplay);

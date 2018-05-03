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

export default class OficiDisplay extends Component {

  constructor(props){
    super(props);

    console.log("PlaceLog. OficiDisplay");

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
      blackJustified:{
        color: '#000000',
        fontSize: GF.convertTextSize(textSize),
        textAlign: 'justify',
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

    this.OFICI = props.liturgicProps.LITURGIA.ofici;
    this.liturgicProps = props.liturgicProps;
    this.variables = props.variables;
    this.superTestMode = props.superTestMode;
    this.testErrorCB = props.testErrorCB;
    this.cicle = props.cicle;
    this.setNumSalmInv = props.setNumSalmInv;
    this.titols = props.titols;
  }

  render() {
    if(!this.OFICI.diumPasqua){
      return (
        <View>
          {this.introduccio(this.liturgicProps.LT, this.liturgicProps.setmana, this.OFICI.salm94,
                              this.OFICI.salm99, this.OFICI.salm66, this.OFICI.salm23)}
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <HR/>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>{"HIMNE"}{(this.liturgicProps.LT===GLOBAL.O_ORDINARI && GF.isDarkHimn())? " (nit)" : " (dia)"}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          {this.himne(this.liturgicProps.LT, this.variables.date.getDay(), false, this.liturgicProps.setmana)}
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <HR/>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>SALMÒDIA</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          {this.salmodia(this.liturgicProps.LT, this.liturgicProps.setmana, this.variables.date.getDay(), this.cicle)}
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <HR/>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>VERS</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          {this.vers(this.liturgicProps.LT)}
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <HR/>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>LECTURES</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          {this.lectures(this.liturgicProps.LT)}
          {this.himneOhDeu(this.liturgicProps.LT, this.variables.date.getDay())}
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <HR/>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>ORACIÓ</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.blackBold}>Preguem.</Text>
          {this.oracio(this.liturgicProps.LT, this.variables.date.getDay())}
          <Text selectable={true} style={this.styles.red}>R.
            <Text selectable={true} style={this.styles.black}> Amén.</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <HR/>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>CONCLUSIÓ</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>V.
            <Text selectable={true} style={this.styles.black}> Beneïm el Senyor.</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>R.
            <Text selectable={true} style={this.styles.black}> Donem gràcies a Déu.</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          {Platform.OS === 'android' ? null : <Text />}
        </View>
      );
    }
    else{
      return (
        <View>
          <Text selectable={true} style={this.styles.redCenter}>{"La Vetlla pasqual substitueix avui l'Ofici de lectura."}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.redCenter}>{"Els qui no participen en la solemne Vetlla pasqual n'escolliran almenys quatre lectures, amb els corresponents salms responsorials i oracions. Les lectures més adients són les que segueixen."}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.redCenter}>{"L'Ofici comença directament per les lectures."}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <HR/>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          {this.lecturesDiumPasqua(this.liturgicProps.LT)}
          {this.himneOhDeu(this.liturgicProps.LT, this.variables.date.getDay())}
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <HR/>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>ORACIÓ</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.blackBold}>Preguem.</Text>
          {this.oracio(this.liturgicProps.LT, this.variables.date.getDay())}
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <HR/>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>CONCLUSIÓ</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>V.
            <Text selectable={true} style={this.styles.black}> Beneïm el Senyor.</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>R.
            <Text selectable={true} style={this.styles.black}> Donem gràcies a Déu.</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          {Platform.OS === 'android' ? null : <Text />}
        </View>
      );
    }
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
    var antifona = GF.rs(this.OFICI.antInvitatori, this.superTestMode, this.testErrorCB.bind(this));
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
    )

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
      return(
        <View>
          {this._invitatoriButton()}
          <Text selectable={true} style={this.styles.red}>V.
            <Text selectable={true} style={this.styles.black}> Sigueu amb nosaltres, Déu nostre.</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>R.
            <Text selectable={true} style={this.styles.black}> Senyor, veniu a ajudar-nos.</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.black}>{gloriaStringIntro}
            {this.liturgicProps.LT !== GLOBAL.Q_CENDRA && this.liturgicProps.LT !== GLOBAL.Q_SETMANES && this.liturgicProps.LT !== GLOBAL.Q_DIUM_RAMS && this.liturgicProps.LT !== GLOBAL.Q_SET_SANTA && this.liturgicProps.LT !== GLOBAL.Q_TRIDU ?
              <Text selectable={true} style={this.styles.black}> Al·leluia</Text> : null
            }
          </Text>
        </View>
      )
    }
    else{
      return(
        <View>
          {this._invitatoriButton()}
          <Text selectable={true} style={this.styles.red}>V.
            <Text selectable={true} style={this.styles.black}> Obriu-me els llavis, Senyor.</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>R.
            <Text selectable={true} style={this.styles.black}> I proclamaré la vostra lloança.</Text>
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
    return(<Text selectable={true} style={this.styles.black}>{GF.rs(this.OFICI.himne, this.superTestMode, this.testErrorCB.bind(this))}</Text>);
  }

  salmodia(LT, setmana, weekDay, cicle){
    return(
      <View>
        <Text selectable={true} style={this.styles.red}>Ant. 1.
          <Text selectable={true} style={this.styles.black}> {GF.rs(this.OFICI.ant1, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{GF.rs(this.OFICI.titol1, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.OFICI.com1 !== '-' ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{GF.rs(this.OFICI.com1, this.superTestMode, this.testErrorCB.bind(this))}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
        {this.salm(GF.rs(this.OFICI.salm1, this.superTestMode, this.testErrorCB.bind(this)))}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria(this.OFICI.gloria1)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 1.
          <Text selectable={true} style={this.styles.black}> {GF.rs(this.OFICI.ant1, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 2.
          <Text selectable={true} style={this.styles.black}> {GF.rs(this.OFICI.ant2, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{GF.rs(this.OFICI.titol2, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.OFICI.com2 !== '-' ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{GF.rs(this.OFICI.com2, this.superTestMode, this.testErrorCB.bind(this))}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
        {this.salm(GF.rs(this.OFICI.salm2, this.superTestMode, this.testErrorCB.bind(this)))}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria(this.OFICI.gloria2)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 2.
          <Text selectable={true} style={this.styles.black}> {GF.rs(this.OFICI.ant2, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 3.
          <Text selectable={true} style={this.styles.black}> {GF.rs(this.OFICI.ant3, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{GF.rs(this.OFICI.titol3, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.OFICI.com3 !== '-' ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{GF.rs(this.OFICI.com3, this.superTestMode, this.testErrorCB.bind(this))}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
        {this.salm(GF.rs(this.OFICI.salm3, this.superTestMode, this.testErrorCB.bind(this)))}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria(this.OFICI.gloria3)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 3.
          <Text selectable={true} style={this.styles.black}> {GF.rs(this.OFICI.ant3, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        </Text>
      </View>
    );
  }

  vers(LT){
    return(
      <View>
        <Text selectable={true} style={this.styles.red}>V.
          <Text selectable={true} style={this.styles.black}> {GF.rs(this.OFICI.respV, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        </Text>
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> {GF.rs(this.OFICI.respR, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        </Text>
      </View>
    );
  }

  lectures(LT){
    return(
      <View>
        <Text selectable={true} style={this.styles.red}>Lectura primera</Text>
        <Text selectable={true} style={this.styles.black}>{GF.rs(this.OFICI.referencia1, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        {this.OFICI.cita1 !== '-' ? <Text selectable={true} style={this.styles.red}>{GF.rs(this.OFICI.cita1, this.superTestMode, this.testErrorCB.bind(this))}</Text> : null}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenterBold}>{GF.rs(this.OFICI.titolLectura1, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackJustified}>{GF.rs(this.OFICI.lectura1, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Responsori</Text>
        {this.OFICI.citaResp1 !== '-' ? <Text selectable={true} style={this.styles.red}>{GF.rs(this.OFICI.citaResp1, this.superTestMode, this.testErrorCB.bind(this))}</Text> : null}
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> {GF.respTogether(GF.rs(this.OFICI.resp1Part1, this.superTestMode, this.testErrorCB.bind(this)),GF.rs(this.OFICI.resp1Part2, this.superTestMode, this.testErrorCB.bind(this)))}</Text>
        </Text>
        <Text selectable={true} style={this.styles.red}>V.
          <Text selectable={true} style={this.styles.black}> {GF.rs(this.OFICI.resp1Part3, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        </Text>
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> {GF.rs(this.OFICI.resp1Part2, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Lectura segona</Text>
        <Text selectable={true} style={this.styles.black}>{GF.rs(this.OFICI.referencia2, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenterBold}>{GF.rs(this.OFICI.titolLectura2, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackJustified}>{GF.rs(this.OFICI.lectura2, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Responsori</Text>
        {this.OFICI.versResp2 !== '-' ? <Text selectable={true} style={this.styles.red}>{GF.rs(this.OFICI.versResp2, this.superTestMode, this.testErrorCB.bind(this))}</Text> : null}
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> {GF.respTogether(GF.rs(this.OFICI.resp2Part1, this.superTestMode, this.testErrorCB.bind(this)),GF.rs(this.OFICI.resp2Part2, this.superTestMode, this.testErrorCB.bind(this)))}</Text>
        </Text>
        <Text selectable={true} style={this.styles.red}>V.
          <Text selectable={true} style={this.styles.black}> {GF.rs(this.OFICI.resp2Part3, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        </Text>
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> {GF.rs(this.OFICI.resp2Part2, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        </Text>
      </View>
    )
  }

  lecturesDiumPasqua(LT){
    return(
      <View>
        <Text selectable={true} style={this.styles.red}>Lectura primera</Text>
        <Text selectable={true} style={this.styles.black}>{GF.rs(this.OFICI.referencia1, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        {this.OFICI.cita1 !== '-' ? <Text selectable={true} style={this.styles.red}>{GF.rs(this.OFICI.cita1, this.superTestMode, this.testErrorCB.bind(this))}</Text> : null}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenterBold}>{GF.rs(this.OFICI.titolLectura1, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackJustified}>{GF.rs(this.OFICI.lectura1, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {GF.rs(this.OFICI.ant1, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{GF.rs(this.OFICI.titol1, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.salm(GF.rs(this.OFICI.salm1, this.superTestMode, this.testErrorCB.bind(this)))}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria('1')}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {GF.rs(this.OFICI.ant1, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackBold}>Preguem.</Text>
        <Text selectable={true} style={this.styles.black}>{GF.rs(this.OFICI.oracio1, this.superTestMode, this.testErrorCB.bind(this),false,LT)}</Text>
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> Amén.</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Lectura segona</Text>
        <Text selectable={true} style={this.styles.black}>{GF.rs(this.OFICI.referencia2, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        {this.OFICI.cita2 !== '-' ? <Text selectable={true} style={this.styles.red}>{GF.rs(this.OFICI.cita2, this.superTestMode, this.testErrorCB.bind(this))}</Text> : null}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenterBold}>{GF.rs(this.OFICI.titolLectura2, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackJustified}>{GF.rs(this.OFICI.lectura2, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {GF.rs(this.OFICI.ant2, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{GF.rs(this.OFICI.titol2, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.salm(GF.rs(this.OFICI.salm2, this.superTestMode, this.testErrorCB.bind(this)))}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria('1')}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {GF.rs(this.OFICI.ant2, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackBold}>Preguem.</Text>
        <Text selectable={true} style={this.styles.black}>{GF.rs(this.OFICI.oracio2, this.superTestMode, this.testErrorCB.bind(this),false,LT)}</Text>
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> Amén.</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Lectura tercera</Text>
        <Text selectable={true} style={this.styles.black}>{GF.rs(this.OFICI.referencia3, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        {this.OFICI.cita3 !== '-' ? <Text selectable={true} style={this.styles.red}>{GF.rs(this.OFICI.cita3, this.superTestMode, this.testErrorCB.bind(this))}</Text> : null}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenterBold}>{GF.rs(this.OFICI.titolLectura3, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackJustified}>{GF.rs(this.OFICI.lectura3, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {GF.rs(this.OFICI.ant3, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{GF.rs(this.OFICI.titol3, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.salm(GF.rs(this.OFICI.salm3, this.superTestMode, this.testErrorCB.bind(this)))}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria('1')}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {GF.rs(this.OFICI.ant3, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Lectura quarta</Text>
        <Text selectable={true} style={this.styles.black}>{GF.rs(this.OFICI.referencia4, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        {this.OFICI.cita4 !== '-' ? <Text selectable={true} style={this.styles.red}>{GF.rs(this.OFICI.cita4, this.superTestMode, this.testErrorCB.bind(this))}</Text> : null}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenterBold}>{GF.rs(this.OFICI.titolLectura4, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackJustified}>{GF.rs(this.OFICI.lectura4, this.superTestMode, this.testErrorCB.bind(this))}</Text>
      </View>
    )
  }

  himneOhDeu(LT, weekDay){
    if(this.OFICI.himneOhDeuBool){
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
    return(<Text selectable={true} style={this.styles.black}>{GF.completeOracio(GF.rs(this.OFICI.oracio, this.superTestMode, this.testErrorCB.bind(this)),false,LT)}</Text>);
  }
}

AppRegistry.registerComponent('OficiDisplay', () => OficiDisplay);

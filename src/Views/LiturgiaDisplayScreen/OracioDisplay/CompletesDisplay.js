import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Platform
} from 'react-native';
import HR from '../../../Components/HRComponent';
import GLOBAL from '../../../Globals/Globals';
import GF from '../../../Globals/GlobalFunctions';

export default class CompletesDisplay extends Component {
  constructor(props){
    super(props);

    console.log("PlaceLog. CompletesDisplay");

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
  }

  render() {
    COMPLETES = this.props.liturgicProps.LITURGIA.completes;

    const gloriaStringIntro = "Glòria al Pare i al Fill\ni a l’Esperit Sant.\nCom era al principi, ara i sempre\ni pels segles dels segles. Amén.";
    return (
      <View>
        <Text selectable={true} style={this.styles.red}>V.
          <Text selectable={true} style={this.styles.black}> Sigueu amb nosaltres, Déu nostre.</Text>
        </Text>
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> Senyor, veniu a ajudar-nos.</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.black}>{gloriaStringIntro}
        {this.props.liturgicProps.LT !== GLOBAL.Q_CENDRA && this.props.liturgicProps.LT !== GLOBAL.Q_SETMANES
          && this.props.liturgicProps.LT !== GLOBAL.Q_DIUM_RAMS && this.props.liturgicProps.LT !== GLOBAL.Q_SET_SANTA
          && this.props.liturgicProps.LT !== GLOBAL.Q_TRIDU ?
          <Text selectable={true} style={this.styles.black}> Al·leluia</Text> : null
        }
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{"És lloable que aquí es faci examen de consciència, que, en la celebració comunitària, pot integrar-se en un acte penitencial com els que figuren en l'Ordre de la missa."}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>HIMNE</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.black}>{GF.rs(COMPLETES.himne, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>SALMÒDIA</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {COMPLETES.dosSalms === "1" ?
          <View>
            {COMPLETES.antifones ?
              <Text selectable={true} style={this.styles.red}>Ant. 1.
                <Text selectable={true} style={this.styles.black}> {GF.rs(COMPLETES.ant1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
              </Text>
            :
              <Text selectable={true} style={this.styles.red}>Ant.
                <Text selectable={true} style={this.styles.black}> {GF.rs(COMPLETES.ant1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
              </Text>
            }
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.redCenter}>{GF.rs(COMPLETES.titol1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {COMPLETES.com1 !== '-' ?
              <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
              <Text selectable={true} style={this.styles.blackSmallItalicRight}>{GF.rs(COMPLETES.com1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
              {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
            {this.salm(GF.rs(COMPLETES.salm1, this.props.superTestMode, this.props.testErrorCB.bind(this)))}
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {this.gloria(COMPLETES.gloria1)}
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {COMPLETES.antifones ?
              <View>
                <Text selectable={true} style={this.styles.red}>Ant. 1.
                  <Text selectable={true} style={this.styles.black}> {GF.rs(COMPLETES.ant1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
                </Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.red}>Ant. 2.
                  <Text selectable={true} style={this.styles.black}> {GF.rs(COMPLETES.ant2, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
                </Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
              </View>
            : null
            }
            <Text selectable={true} style={this.styles.redCenter}>{GF.rs(COMPLETES.titol2, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {COMPLETES.com2 !== '-' ?
              <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
              <Text selectable={true} style={this.styles.blackSmallItalicRight}>{GF.rs(COMPLETES.com2, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
              {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
            {this.salm(GF.rs(COMPLETES.salm2, this.props.superTestMode, this.props.testErrorCB.bind(this)))}
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {this.gloria(COMPLETES.gloria2)}
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {COMPLETES.antifones ?
              <View>
                <Text selectable={true} style={this.styles.red}>Ant. 2.
                  <Text selectable={true} style={this.styles.black}> {GF.rs(COMPLETES.ant2, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
                </Text>
              </View>
            :
              <View>
                <Text selectable={true} style={this.styles.red}>Ant.
                  <Text selectable={true} style={this.styles.black}> {GF.rs(COMPLETES.ant1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
                </Text>
              </View>
            }
          </View>
        :
          <View>
            <Text selectable={true} style={this.styles.red}>Ant.
              <Text selectable={true} style={this.styles.black}> {GF.rs(COMPLETES.ant1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
            </Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.redCenter}>{GF.rs(COMPLETES.titol1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {COMPLETES.com1 !== '-' ?
              <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
              <Text selectable={true} style={this.styles.blackSmallItalicRight}>{GF.rs(COMPLETES.com1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
              {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
            <Text selectable={true} style={this.styles.black}>{this.salm(GF.rs(COMPLETES.salm1, this.props.superTestMode, this.props.testErrorCB.bind(this)))}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {this.gloria(COMPLETES.gloria1)}
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>Ant.
              <Text selectable={true} style={this.styles.black}> {GF.rs(COMPLETES.ant1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
            </Text>
          </View>
        }
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>LECTURA BREU</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{GF.rs(COMPLETES.vers, this.props.superTestMode, this.props.testErrorCB.bind(this), this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.black}>{GF.rs(COMPLETES.lecturaBreu, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>RESPONSORI BREU</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {COMPLETES.antRespEspecial === "-" ?
          <View>
            <Text selectable={true} style={this.styles.red}>V.
              <Text selectable={true} style={this.styles.black}> {GF.respTogether(GF.rs(COMPLETES.respBreu1, this.props.superTestMode, this.props.testErrorCB.bind(this)),GF.rs(COMPLETES.respBreu2, this.props.superTestMode, this.props.testErrorCB.bind(this)))}</Text>
            </Text>
            <Text selectable={true} style={this.styles.red}>R.
              <Text selectable={true} style={this.styles.black}> {GF.respTogether(GF.rs(COMPLETES.respBreu1, this.props.superTestMode, this.props.testErrorCB.bind(this)),GF.rs(COMPLETES.respBreu2, this.props.superTestMode, this.props.testErrorCB.bind(this)))}</Text>
            </Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>V.
              <Text selectable={true} style={this.styles.black}> {GF.rs(COMPLETES.respBreu3, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
            </Text>
            <Text selectable={true} style={this.styles.red}>R.
              <Text selectable={true} style={this.styles.black}> {GF.rs(COMPLETES.respBreu2, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
            </Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>V.
              <Text selectable={true} style={this.styles.black}>{" Glòria al Pare i al Fill i a l'Esperit Sant."}</Text>
            </Text>
            <Text selectable={true} style={this.styles.red}>R.
              <Text selectable={true} style={this.styles.black}> {GF.respTogether(GF.rs(COMPLETES.respBreu1, this.props.superTestMode, this.props.testErrorCB.bind(this)),GF.rs(COMPLETES.respBreu2, this.props.superTestMode, this.props.testErrorCB.bind(this)))}</Text>
            </Text>
          </View>
        :
          <View>
            <Text selectable={true} style={this.styles.red}>Ant.
              <Text selectable={true} style={this.styles.black}> {GF.rs(COMPLETES.antRespEspecial, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
            </Text>
          </View>
        }
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>CÀNTIC SIMEÓ</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {GF.rs(COMPLETES.antCantic, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{"Càntic\nLc 2, 29-32\nCrist, llum de les nacions i glòria d'Israel"}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.black}>{this.salm(GF.rs(COMPLETES.cantic, this.props.superTestMode, this.props.testErrorCB.bind(this)))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria('1')}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {GF.rs(COMPLETES.antCantic)}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>ORACIÓ</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackBold}>Preguem.</Text>
        <Text selectable={true} style={this.styles.black}>{GF.rs(COMPLETES.oracio, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> Amén.</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>CONCLUSIÓ</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>V.
          <Text selectable={true} style={this.styles.black}>{" Que el Senyor totpoderós ens concedeixi una nit tranquil·la i una fi benaurada."}</Text>
        </Text>
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> Amén.</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.black}>{GF.rs(COMPLETES.antMare, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
      </View>
    );
  }

  salm(salm){
    if(!salm) return null;

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
    return (<Text selectable={true} style={this.styles.black}>{salm}</Text>);
  }

  gloria(g){
    if(!g) return null;
    var gloriaString = "Glòria al Pare i al Fill    *\ni a l’Esperit Sant.\nCom era al principi, ara i sempre    *\ni pels segles dels segles. Amén.";
    if(this.props.variables.cleanSalm === 'false')
      gloriaString = "Glòria al Pare i al Fill    \ni a l’Esperit Sant.\nCom era al principi, ara i sempre    \ni pels segles dels segles. Amén.";

    if(g === '1'){
      if(this.props.variables.gloria === 'false'){
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

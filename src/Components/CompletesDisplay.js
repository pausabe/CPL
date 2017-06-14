import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Platform
} from 'react-native';
import Hr from 'react-native-hr';
import GLOBAL from '../Globals/Globals';

export default class CompletesDisplay extends Component {
  constructor(props){
    super(props);

    //console.log("testing Completes: " + this.convertTextSize());

    this.styles = {
      black: {
        color: '#000000',
        fontSize: this.convertTextSize(),
      },
      blackBold: {
        color: '#000000',
        fontSize: this.convertTextSize(),
        fontWeight: 'bold',
      },
      blackItalic:{
        color: '#000000',
        fontSize: this.convertTextSize(),
        fontStyle: 'italic'
      },
      blackSmallItalicRight: {
        color: '#000000',
        fontSize: this.convertTextSize()-2,
        fontStyle: 'italic',
        textAlign: 'right'
      },
      red: {
        color: '#FF0000',
        fontSize: this.convertTextSize(),
      },
      redCenter: {
        color: '#FF0000',
        fontSize: this.convertTextSize(),
        textAlign: 'center'
      },
      redCenterBold: {
        color: '#FF0000',
        fontSize: this.convertTextSize(),
        textAlign: 'center',
        fontWeight: 'bold',
      },
      redSmallItalicRight: {
        color: '#FF0000',
        fontSize: this.convertTextSize(),
        fontStyle: 'italic',
        textAlign: 'right'
      }
    }
  }

  convertTextSize(){
    switch (this.props.variables.textSize) {
      case '1':
        return GLOBAL.size1;
        break;
      case '2':
        return GLOBAL.size2;
        break;
      case '3':
        return GLOBAL.size3;
        break;
      case '4':
        return GLOBAL.size4;
        break;
      case '5':
        return GLOBAL.size5;
        break;
    }
  }

  render() {
    COMPLETES = this.props.liturgicProps.LITURGIA.completes;

    COMPLETES.oracio = this.completeOracio(COMPLETES.oracio);

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
        <Hr lineColor='#CFD8DC' />
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{"És lloable que aquí es faci examen de consciència, que, en la celebració comunitària, pot integrar-se en un acte penitencial com els que figuren en l'Ordre de la missa."}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Hr lineColor='#CFD8DC' />
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>HIMNE</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.black}>{COMPLETES.himne}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Hr lineColor='#CFD8DC' />
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>SALMÒDIA</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {COMPLETES.dosSalms === "1" ?
          <View>
            {COMPLETES.antifones ?
              <Text selectable={true} style={this.styles.red}>Ant. 1.
                <Text selectable={true} style={this.styles.black}> {COMPLETES.ant1}</Text>
              </Text>
            :
              <Text selectable={true} style={this.styles.red}>Ant.
                <Text selectable={true} style={this.styles.black}> {COMPLETES.ant1}</Text>
              </Text>
            }
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.redCenter}>{COMPLETES.titol1}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {COMPLETES.com1 !== '-' ?
              <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
              <Text selectable={true} style={this.styles.blackSmallItalicRight}>{COMPLETES.com1}</Text>
              {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
            {this.salm(COMPLETES.salm1)}
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {this.gloria(COMPLETES.gloria1)}
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {COMPLETES.antifones ?
              <View>
                <Text selectable={true} style={this.styles.red}>Ant. 1.
                  <Text selectable={true} style={this.styles.black}> {COMPLETES.ant1}</Text>
                </Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.red}>Ant. 2.
                  <Text selectable={true} style={this.styles.black}> {COMPLETES.ant2}</Text>
                </Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
              </View>
            : null
            }
            <Text selectable={true} style={this.styles.redCenter}>{COMPLETES.titol2}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {COMPLETES.com2 !== '-' ?
              <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
              <Text selectable={true} style={this.styles.blackSmallItalicRight}>{COMPLETES.com2}</Text>
              {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
            {this.salm(COMPLETES.salm2)}
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {this.gloria(COMPLETES.gloria2)}
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {COMPLETES.antifones ?
              <View>
                <Text selectable={true} style={this.styles.red}>Ant. 2.
                  <Text selectable={true} style={this.styles.black}> {COMPLETES.ant2}</Text>
                </Text>
              </View>
            :
              <View>
                <Text selectable={true} style={this.styles.red}>Ant.
                  <Text selectable={true} style={this.styles.black}> {COMPLETES.ant1}</Text>
                </Text>
              </View>
            }
          </View>
        :
          <View>
            <Text selectable={true} style={this.styles.red}>Ant.
              <Text selectable={true} style={this.styles.black}> {COMPLETES.ant1}</Text>
            </Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.redCenter}>{COMPLETES.titol1}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {COMPLETES.com1 !== '-' ?
              <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
              <Text selectable={true} style={this.styles.blackSmallItalicRight}>{COMPLETES.com1}</Text>
              {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
            <Text selectable={true} style={this.styles.black}>{this.salm(COMPLETES.salm1)}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {this.gloria(COMPLETES.gloria1)}
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>Ant.
              <Text selectable={true} style={this.styles.black}> {COMPLETES.ant1}</Text>
            </Text>
          </View>
        }
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Hr lineColor='#CFD8DC' />
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>LECTURA BREU</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{COMPLETES.vers}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.black}>{COMPLETES.lecturaBreu}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Hr lineColor='#CFD8DC' />
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>RESPONSORI BREU</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {COMPLETES.antRespEspecial === "-" ?
          <View>
            <Text selectable={true} style={this.styles.red}>V.
              <Text selectable={true} style={this.styles.black}> {COMPLETES.respBreu1} {COMPLETES.respBreu2}</Text>
            </Text>
            <Text selectable={true} style={this.styles.red}>R.
              <Text selectable={true} style={this.styles.black}> {COMPLETES.respBreu1} {COMPLETES.respBreu2}</Text>
            </Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>V.
              <Text selectable={true} style={this.styles.black}> {COMPLETES.respBreu3}</Text>
            </Text>
            <Text selectable={true} style={this.styles.red}>R.
              <Text selectable={true} style={this.styles.black}> {COMPLETES.respBreu2}</Text>
            </Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>V.
              <Text selectable={true} style={this.styles.black}>{" Glòria al Pare i al Fill i a l'Esperit Sant."}</Text>
            </Text>
            <Text selectable={true} style={this.styles.red}>R.
              <Text selectable={true} style={this.styles.black}> {COMPLETES.respBreu1} {COMPLETES.respBreu2}</Text>
            </Text>
          </View>
        :
          <View>
            <Text selectable={true} style={this.styles.red}>Ant.
              <Text selectable={true} style={this.styles.black}> {COMPLETES.antRespEspecial}</Text>
            </Text>
          </View>
        }
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Hr lineColor='#CFD8DC' />
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>CÀNTIC SIMEÓ</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {COMPLETES.antCantic}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.black}>{this.salm(COMPLETES.cantic)}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria('1')}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {COMPLETES.antCantic}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Hr lineColor='#CFD8DC' />
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>ORACIÓ</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackBold}>Preguem.</Text>
        <Text selectable={true} style={this.styles.black}>{COMPLETES.oracio}</Text>
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> Amén.</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Hr lineColor='#CFD8DC' />
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>CONCLUSIÓ</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>V.
          <Text selectable={true} style={this.styles.black}>{" Que el Senyor totpoderós ens concedeixi una nit tranquil·la i una fi beneurada."}</Text>
        </Text>
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> Amén.</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Hr lineColor='#CFD8DC' />
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.black}>{COMPLETES.antMare}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
      </View>
    );
  }

  completeOracio(oracio){
    var form1 = "Per nostre Senyor Jesucrist";
    var bigf1 = "Per nostre Senyor Jesucrist, el vostre Fill, que amb vós viu i regna en la unitat de l'Esperit Sant, Déu, pels segles dels segles";
    var form2 = "Vós, que viviu i regneu pels segles dels segles";
    var bigf2 = "Vós, que viviu i regneu amb Déu Pare en la unitat de l'Esperit Sant, Déu, pels segles dels segles";
    var form3 = "Que viu i regna pels segles dels segles";
    var form4 = "Ell, que viu i regna pels segles dels segles";
    var bigf4 = "Ell, que amb vós viu i regna en la unitat de l'Esperit Sant, Déu, pels segles dels segles";

    oAux = oracio;
    //console.log(oAux);
    if(oAux.search(form1) !== -1)
      return oAux.replace(form1, bigf1);
    if(oAux.search(form2) !== -1)
      return oAux.replace(form2, bigf2);
    if(oAux.search(form3) !== -1)
      return oAux.replace(form3, bigf4);
    if(oAux.search(form4) !== -1)
      return oAux.replace(form4, bigf4);

    return oracio;
  }


  salm(salm){
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

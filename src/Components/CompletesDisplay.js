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

    console.log("CompletesDisplay");

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
        fontSize: this.convertTextSize()-2,
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
      case '6':
        return GLOBAL.size6;
        break;
      case '7':
        return GLOBAL.size7;
        break;
      case '8':
        return GLOBAL.size8;
        break;
      case '9':
        return GLOBAL.size9;
        break;
      case '10':
        return GLOBAL.size10;
        break;
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
        <Hr lineColor='#CFD8DC' />
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{"És lloable que aquí es faci examen de consciència, que, en la celebració comunitària, pot integrar-se en un acte penitencial com els que figuren en l'Ordre de la missa."}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Hr lineColor='#CFD8DC' />
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>HIMNE</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.black}>{this.rs(COMPLETES.himne)}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Hr lineColor='#CFD8DC' />
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>SALMÒDIA</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {COMPLETES.dosSalms === "1" ?
          <View>
            {COMPLETES.antifones ?
              <Text selectable={true} style={this.styles.red}>Ant. 1.
                <Text selectable={true} style={this.styles.black}> {this.rs(COMPLETES.ant1)}</Text>
              </Text>
            :
              <Text selectable={true} style={this.styles.red}>Ant.
                <Text selectable={true} style={this.styles.black}> {this.rs(COMPLETES.ant1)}</Text>
              </Text>
            }
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.redCenter}>{this.rs(COMPLETES.titol1)}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {COMPLETES.com1 !== '-' ?
              <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
              <Text selectable={true} style={this.styles.blackSmallItalicRight}>{this.rs(COMPLETES.com1)}</Text>
              {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
            {this.salm(this.rs(COMPLETES.salm1))}
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {this.gloria(COMPLETES.gloria1)}
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {COMPLETES.antifones ?
              <View>
                <Text selectable={true} style={this.styles.red}>Ant. 1.
                  <Text selectable={true} style={this.styles.black}> {this.rs(COMPLETES.ant1)}</Text>
                </Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.red}>Ant. 2.
                  <Text selectable={true} style={this.styles.black}> {this.rs(COMPLETES.ant2)}</Text>
                </Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
              </View>
            : null
            }
            <Text selectable={true} style={this.styles.redCenter}>{this.rs(COMPLETES.titol2)}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {COMPLETES.com2 !== '-' ?
              <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
              <Text selectable={true} style={this.styles.blackSmallItalicRight}>{this.rs(COMPLETES.com2)}</Text>
              {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
            {this.salm(this.rs(COMPLETES.salm2))}
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {this.gloria(COMPLETES.gloria2)}
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {COMPLETES.antifones ?
              <View>
                <Text selectable={true} style={this.styles.red}>Ant. 2.
                  <Text selectable={true} style={this.styles.black}> {this.rs(COMPLETES.ant2)}</Text>
                </Text>
              </View>
            :
              <View>
                <Text selectable={true} style={this.styles.red}>Ant.
                  <Text selectable={true} style={this.styles.black}> {this.rs(COMPLETES.ant1)}</Text>
                </Text>
              </View>
            }
          </View>
        :
          <View>
            <Text selectable={true} style={this.styles.red}>Ant.
              <Text selectable={true} style={this.styles.black}> {this.rs(COMPLETES.ant1)}</Text>
            </Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.redCenter}>{this.rs(COMPLETES.titol1)}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {COMPLETES.com1 !== '-' ?
              <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
              <Text selectable={true} style={this.styles.blackSmallItalicRight}>{this.rs(COMPLETES.com1)}</Text>
              {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
            <Text selectable={true} style={this.styles.black}>{this.salm(this.rs(COMPLETES.salm1))}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            {this.gloria(COMPLETES.gloria1)}
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>Ant.
              <Text selectable={true} style={this.styles.black}> {this.rs(COMPLETES.ant1)}</Text>
            </Text>
          </View>
        }
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Hr lineColor='#CFD8DC' />
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>LECTURA BREU</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>{this.rs(COMPLETES.vers)}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.black}>{this.rs(COMPLETES.lecturaBreu)}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Hr lineColor='#CFD8DC' />
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>RESPONSORI BREU</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {COMPLETES.antRespEspecial === "-" ?
          <View>
            <Text selectable={true} style={this.styles.red}>V.
              <Text selectable={true} style={this.styles.black}> {this.respTogether(this.rs(COMPLETES.respBreu1),this.rs(COMPLETES.respBreu2))}</Text>
            </Text>
            <Text selectable={true} style={this.styles.red}>R.
              <Text selectable={true} style={this.styles.black}> {this.respTogether(this.rs(COMPLETES.respBreu1),this.rs(COMPLETES.respBreu2))}</Text>
            </Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>V.
              <Text selectable={true} style={this.styles.black}> {this.rs(COMPLETES.respBreu3)}</Text>
            </Text>
            <Text selectable={true} style={this.styles.red}>R.
              <Text selectable={true} style={this.styles.black}> {this.rs(COMPLETES.respBreu2)}</Text>
            </Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.red}>V.
              <Text selectable={true} style={this.styles.black}>{" Glòria al Pare i al Fill i a l'Esperit Sant."}</Text>
            </Text>
            <Text selectable={true} style={this.styles.red}>R.
              <Text selectable={true} style={this.styles.black}> {this.respTogether(this.rs(COMPLETES.respBreu1),this.rs(COMPLETES.respBreu2))}</Text>
            </Text>
          </View>
        :
          <View>
            <Text selectable={true} style={this.styles.red}>Ant.
              <Text selectable={true} style={this.styles.black}> {this.rs(COMPLETES.antRespEspecial)}</Text>
            </Text>
          </View>
        }
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Hr lineColor='#CFD8DC' />
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>CÀNTIC SIMEÓ</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {this.rs(COMPLETES.antCantic)}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.black}>{this.salm(this.rs(COMPLETES.cantic))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria('1')}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {this.rs(COMPLETES.antCantic)}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Hr lineColor='#CFD8DC' />
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>ORACIÓ</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackBold}>Preguem.</Text>
        <Text selectable={true} style={this.styles.black}>{this.rs(COMPLETES.oracio)}</Text>
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> Amén.</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Hr lineColor='#CFD8DC' />
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
        <Hr lineColor='#CFD8DC' />
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.black}>{this.rs(COMPLETES.antMare)}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
      </View>
    );
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

  rs(text){
    var length = text.length;
    var lastChar = text.charAt(length-1);
    if(lastChar === ' ' || lastChar === '\n') return text.slice(0,length-1);
    return text;
  }

  respTogether(r1,r2){
    var lastCharacter = r1.charAt(r1.length-1);
    var firstWord = r2.split(" ")[0];

    var result = r1 + ' ' + r2;

    if(lastCharacter !== '.' && firstWord !== 'Senyor' && firstWord !== 'Déu'
      && firstWord !== 'Vós')
      result = r1 + ' ' + r2.charAt(0).toLowerCase() + r2.slice(1);

    return result;
  }
}

AppRegistry.registerComponent('CompletesDisplay', () => CompletesDisplay);

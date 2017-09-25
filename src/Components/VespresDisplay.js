import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Platform
} from 'react-native';
import Hr from 'react-native-hr';
import GLOBAL from '../Globals/Globals';

export default class VespresDisplay extends Component {
  constructor(props){
    super(props);

    console.log("VespresDisplay");

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
    }
  }


  render() {
    VESPRES = this.props.liturgicProps.LITURGIA.vespres;
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
        {this.props.liturgicProps.LT !== GLOBAL.Q_CENDRA && this.props.liturgicProps.LT !== GLOBAL.Q_SETMANES && this.props.liturgicProps.LT !== GLOBAL.Q_DIUM_RAMS && this.props.liturgicProps.LT !== GLOBAL.Q_SET_SANTA && this.props.liturgicProps.LT !== GLOBAL.Q_TRIDU ?
          <Text selectable={true} style={this.styles.black}> Al·leluia</Text> : null
        }
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Hr lineColor='#CFD8DC' />
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>HIMNE</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.himne(this.props.liturgicProps.LT, this.props.variables.date.getDay(), this.props.liturgicProps.setmana, VESPRES)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Hr lineColor='#CFD8DC' />
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>SALMÒDIA</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.salmodia(this.props.liturgicProps.LT, this.props.liturgicProps.setmana, this.props.variables.date.getDay(), VESPRES)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Hr lineColor='#CFD8DC' />
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>LECTURA BREU</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.lecturaBreu(this.props.liturgicProps.LT, VESPRES)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Hr lineColor='#CFD8DC' />
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>RESPONSORI BREU</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.responsori(this.props.liturgicProps.LT, this.props.variables.date.getDay(), VESPRES)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Hr lineColor='#CFD8DC' />
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>CÀNTIC DE MARIA</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.cantic(this.props.liturgicProps.LT, this.props.variables.date.getDay(), this.props.ABC, VESPRES)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Hr lineColor='#CFD8DC' />
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>PREGÀRIES</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.pregaries(this.props.liturgicProps.LT, this.props.variables.date.getDay(), VESPRES)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Hr lineColor='#CFD8DC' />
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>ORACIÓ</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.oracio(this.props.liturgicProps.LT, this.props.variables.date.getDay(), VESPRES)}
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> Amén.</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Hr lineColor='#CFD8DC' />
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>CONCLUSIÓ</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>V.
          <Text selectable={true} style={this.styles.black}> Que el Senyor ens beneeixi i ens guardi de tot mal, i ens dugui a la vida eterna.</Text>
        </Text>
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> Amén.</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
      </View>
    );
  }

  salm(salm){
    if(this.props.variables.cleanSalm === 'false'){
      //console.log("super salm: " + salm);
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

  himne(LT, weekDay, setmana, VESPRES){
    return(<Text selectable={true} style={this.styles.black}>{VESPRES.himne}</Text>);
  }

  salmodia(LT, setmana, weekDay, VESPRES){
    return(
      <View>
        <Text selectable={true} style={this.styles.red}>Ant. 1.
          <Text selectable={true} style={this.styles.black}> {VESPRES.ant1}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{VESPRES.titol1}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {VESPRES.com1 !== '-' ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{VESPRES.com1}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
        {this.salm(VESPRES.salm1)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria(VESPRES.gloria1)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 1.
          <Text selectable={true} style={this.styles.black}> {VESPRES.ant1}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 2.
          <Text selectable={true} style={this.styles.black}> {VESPRES.ant2}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{VESPRES.titol2}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {VESPRES.com2 !== '-' ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{VESPRES.com2}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
        {this.salm(VESPRES.salm2)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria(VESPRES.gloria2)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 2.
          <Text selectable={true} style={this.styles.black}> {VESPRES.ant2}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 3.
          <Text selectable={true} style={this.styles.black}> {VESPRES.ant3}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{VESPRES.titol3}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {VESPRES.com3 !== '-' ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{VESPRES.com3}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
        {this.salm(VESPRES.salm3)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria(VESPRES.gloria3)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 3.
          <Text selectable={true} style={this.styles.black}> {VESPRES.ant3}</Text>
        </Text>
      </View>
    );
  }

  lecturaBreu(LT, VESPRES){
    return(
      <View>
        <Text selectable={true} style={this.styles.red}>{VESPRES.vers}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.black}>{VESPRES.lecturaBreu}</Text>
      </View>
    )
  }

  responsori(LT, weekDay, VESPRES){
    if(VESPRES.calAntEspecial){
      return(
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {VESPRES.antEspecialVespres}</Text>
        </Text>
      )
    }
    else{
      return(
        <View>
          <Text selectable={true} style={this.styles.red}>V.
            <Text selectable={true} style={this.styles.black}> {VESPRES.respBreu1} {VESPRES.respBreu2}</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>R.
            <Text selectable={true} style={this.styles.black}> {VESPRES.respBreu1} {VESPRES.respBreu2}</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>V.
            <Text selectable={true} style={this.styles.black}> {VESPRES.respBreu3}</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>R.
            <Text selectable={true} style={this.styles.black}> {VESPRES.respBreu2}</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>V.
            <Text selectable={true} style={this.styles.black}> Glòria al Pare i al Fill i a l'Esperit Sant.</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>R.
            <Text selectable={true} style={this.styles.black}> {VESPRES.respBreu1} {VESPRES.respBreu2}</Text>
          </Text>
        </View>
      )
    }
  }

  cantic(LT, weekDay, litYear, VESPRES){
    return(
      <View>
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {VESPRES.antCantic}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.salm(VESPRES.cantic)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria('1')}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {VESPRES.antCantic}</Text>
        </Text>
      </View>
    );
  }

  pregaries(LT, weekDay, VESPRES){
    var pregaries = VESPRES.pregaries;
    if(pregaries.search(": Pare nostre.") !== -1){
      pregaries = pregaries.replace(": Pare nostre.",':');
      return(
          <View>
            <Text selectable={true} style={this.styles.black}>{pregaries}</Text>
            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            <Text selectable={true} style={this.styles.blackItalic}>{"Pare nostre."}</Text>
          </View>
      );
    }
    else{
      return(<Text selectable={true} style={this.styles.black}>{pregaries}</Text>);
    }
  }

  oracio(LT, weekDay, VESPRES){
    return(<Text selectable={true} style={this.styles.black}>{this.completeOracio(VESPRES.oracio)}</Text>);
  }

  completeOracio(oracio){
    console.log("oracio!: " + oracio);
    var form1 = "Per nostre Senyor Jesucrist";
    var bigf1 = "Per nostre Senyor Jesucrist, el vostre Fill, que amb vós viu i regna en la unitat de l'Esperit Sant, Déu, pels segles dels segles";
    var form2 = "Vós, que viviu i regneu pels segles dels segles";
    var bigf2 = "Vós, que viviu i regneu amb Déu Pare en la unitat de l'Esperit Sant, Déu, pels segles dels segles";
    var form3 = "Que viu i regna pels segles dels segles";
    var form4 = "Ell, que viu i regna pels segles dels segles";
    var form5 = "Ell, que amb vós viu i regna";
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
    if(oAux.search(form5) !== -1)
      return oAux.replace(form5, bigf4);

    return oracio;
  }

  rs(text){
    var length = text.length;
    if(text.charAt(length-1) === ' ') return text.slice(0,length-1);
    return text;
  }

  respTogether(r1,r2){
    r1=this.rs(r1);

    var lastCharacter = r1.charAt(r1.length-1);
    var firstWord = r2.split(" ")[0];

    var result = r1 + ' ' + r2;

    if(lastCharacter !== '.' && firstWord !== 'Senyor' && firstWord !== 'Déu')
      result = r1 + ' ' + r2.charAt(0).toLowerCase() + r2.slice(1);

    return result;
  }
}

AppRegistry.registerComponent('VespresDisplay', () => VespresDisplay);

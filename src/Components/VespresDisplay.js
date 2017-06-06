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
      blackSmallItalic:{
        color: '#000000',
        fontSize: this.convertTextSize(),
        fontStyle: 'italic'
      },
      blackSmallItalicRight: {
        color: '#000000',
        fontSize: this.convertTextSize(),
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
    VESPRES = this.props.liturgicProps.LITURGIA.vespres;
    const gloriaStringIntro = "Glòria al Pare i al Fill\ni a l’Esperit Sant.\nCom era al principi, ara i sempre\ni pels segles dels segles. Amén.";
    return (
      <View>
        <Text style={this.styles.red}>V.
          <Text style={this.styles.black}> Sigueu amb nosaltres, Déu nostre.</Text>
        </Text>
        <Text style={this.styles.red}>R.
          <Text style={this.styles.black}> Senyor, veniu a ajudar-nos.</Text>
        </Text>
        <Text />
        <Text style={this.styles.black}>{gloriaStringIntro}
        {this.props.liturgicProps.LT !== GLOBAL.Q_CENDRA && this.props.liturgicProps.LT !== GLOBAL.Q_SETMANES && this.props.liturgicProps.LT !== GLOBAL.Q_DIUM_RAMS && this.props.liturgicProps.LT !== GLOBAL.Q_SET_SANTA && this.props.liturgicProps.LT !== GLOBAL.Q_TRIDU ?
          <Text style={this.styles.black}> Al·leluia</Text> : null
        }
        </Text>
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={this.styles.red}>HIMNE</Text>
        <Text />
        {this.himne(this.props.liturgicProps.LT, this.props.variables.date.getDay(), this.props.liturgicProps.setmana, VESPRES)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={this.styles.red}>SALMÒDIA</Text>
        <Text />
        {this.salmodia(this.props.liturgicProps.LT, this.props.liturgicProps.setmana, this.props.variables.date.getDay(), VESPRES)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={this.styles.red}>LECTURA BREU</Text>
        <Text />
        {this.lecturaBreu(this.props.liturgicProps.LT, VESPRES)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={this.styles.red}>RESPONSORI BREU</Text>
        <Text />
        {this.responsori(this.props.liturgicProps.LT, this.props.variables.date.getDay(), VESPRES)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={this.styles.red}>CÀNTIC DE MARIA</Text>
        <Text />
        {this.cantic(this.props.liturgicProps.LT, this.props.variables.date.getDay(), this.props.ABC, VESPRES)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={this.styles.red}>PREGÀRIES</Text>
        <Text />
        {this.pregaries(this.props.liturgicProps.LT, this.props.variables.date.getDay(), VESPRES)}
        <Text />
        <Text style={this.styles.red}>ORACIÓ</Text>
        <Text />
        <Text style={this.styles.blackBold}>Preguem.</Text>
        {this.oracio(this.props.liturgicProps.LT, this.props.variables.date.getDay(), VESPRES)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={this.styles.red}>CONCLUSIÓ</Text>
        <Text />
        <Text style={this.styles.red}>V.
          <Text style={this.styles.black}> Que el Senyor ens beneeixi i ens guardi de tot mal, i ens dugui a la vida eterna.</Text>
        </Text>
        <Text style={this.styles.red}>R.
          <Text style={this.styles.black}> Amén.</Text>
        </Text>
        <Text />
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
    return (<Text style={this.styles.black}>{salm}</Text>);
  }

  gloria(g){
    var gloriaString = "Glòria al Pare i al Fill    *\ni a l’Esperit Sant.\nCom era al principi, ara i sempre    *\ni pels segles dels segles. Amén.";
    if(this.props.variables.cleanSalm === 'false')
      gloriaString = "Glòria al Pare i al Fill    \ni a l’Esperit Sant.\nCom era al principi, ara i sempre    \ni pels segles dels segles. Amén.";

    if(g === '1'){
      if(this.props.variables.gloria === 'false'){
        return(<Text style={this.styles.black}>Glòria.</Text>);
      }
      else{
        return(<Text style={this.styles.black}>{gloriaString}</Text>);
      }
    }
    else{
      if(g==='0'){
        return(<Text style={this.styles.black}>S'omet el Glòria.</Text>);
      }
    }
  }

  himne(LT, weekDay, setmana, VESPRES){
    return(<Text style={this.styles.black}>{VESPRES.himne}</Text>);
  }

  salmodia(LT, setmana, weekDay, VESPRES){
    return(
      <View>
        <Text style={this.styles.red}>Ant. 1.
          <Text style={this.styles.black}> {VESPRES.ant1}</Text>
        </Text>
        <Text />
        <Text style={this.styles.redCenter}>{VESPRES.titol1}</Text>
        <Text />
        {VESPRES.com1 !== '-' ?
          <View><Text style={this.styles.blackSmallItalicRight}>{VESPRES.com1}</Text><Text /></View> : null}
        {this.salm(salm1)}
        <Text />
        {this.gloria(VESPRES.gloria1)}
        <Text />
        <Text style={this.styles.red}>Ant. 1.
          <Text style={this.styles.black}> {VESPRES.ant1}</Text>
        </Text>
        <Text />
        <Text style={this.styles.red}>Ant. 2.
          <Text style={this.styles.black}> {VESPRES.ant2}</Text>
        </Text>
        <Text />
        <Text style={this.styles.redCenter}>{VESPRES.titol2}</Text>
        <Text />
        {VESPRES.com2 !== '-' ?
          <View><Text style={this.styles.blackSmallItalicRight}>{VESPRES.com2}</Text><Text /></View> : null}
        {this.salm(salm2)}
        <Text />
        {this.gloria(VESPRES.gloria2)}
        <Text />
        <Text style={this.styles.red}>Ant. 2.
          <Text style={this.styles.black}> {VESPRES.ant2}</Text>
        </Text>
        <Text />
        <Text style={this.styles.red}>Ant. 3.
          <Text style={this.styles.black}> {VESPRES.ant3}</Text>
        </Text>
        <Text />
        <Text style={this.styles.redCenter}>{VESPRES.titol3}</Text>
        <Text />
        {VESPRES.com3 !== '-' ?
          <View><Text style={this.styles.blackSmallItalicRight}>{VESPRES.com3}</Text><Text /></View> : null}
        {this.salm(salm3)}
        <Text />
        {this.gloria(VESPRES.gloria3)}
        <Text />
        <Text style={this.styles.red}>Ant. 3.
          <Text style={this.styles.black}> {VESPRES.ant3}</Text>
        </Text>
      </View>
    );
  }

  lecturaBreu(LT, VESPRES){
    return(
      <View>
        <Text style={this.styles.red}>{VESPRES.vers}</Text>
        <Text />
        <Text style={this.styles.black}>{VESPRES.lecturaBreu}</Text>
      </View>
    )
  }

  responsori(LT, weekDay, VESPRES){
    if(VESPRES.calAntEspecial){
      return(<Text style={this.styles.black}> {VESPRES.antEspecialVespres}</Text>)
    }
    else{
      return(
        <View>
          <Text style={this.styles.red}>V.
            <Text style={this.styles.black}> {VESPRES.respBreu1} {VESPRES.respBreu2}</Text>
          </Text>
          <Text style={this.styles.red}>R.
            <Text style={this.styles.black}> {VESPRES.respBreu1} {VESPRES.respBreu2}</Text>
          </Text>
          <Text />
          <Text style={this.styles.red}>V.
            <Text style={this.styles.black}> {VESPRES.respBreu3}</Text>
          </Text>
          <Text style={this.styles.red}>R.
            <Text style={this.styles.black}> {VESPRES.respBreu2}</Text>
          </Text>
          <Text />
          <Text style={this.styles.red}>V.
            <Text style={this.styles.black}> Glòria al Pare i al Fill i a l'Esperit Sant.</Text>
          </Text>
          <Text style={this.styles.red}>R.
            <Text style={this.styles.black}> {VESPRES.respBreu1} {VESPRES.respBreu2}</Text>
          </Text>
        </View>
      )
    }
  }

  cantic(LT, weekDay, litYear, VESPRES){
    return(
      <View>
        <Text style={this.styles.red}>Ant.
          <Text style={this.styles.black}> {VESPRES.antCantic}</Text>
        </Text>
        <Text />
        {this.salm(VESPRES.cantic)}
        <Text />
        {this.gloria('1')}
        <Text />
        <Text style={this.styles.red}>Ant.
          <Text style={this.styles.black}> {VESPRES.antCantic}</Text>
        </Text>
      </View>
    );
  }

  pregaries(LT, weekDay, VESPRES){
    return(<Text style={this.styles.black}> {VESPRES.pregaries}</Text>);
  }

  oracio(LT, weekDay, VESPRES){
    return(<Text style={this.styles.black}>{VESPRES.oracio}</Text>);
  }
}

AppRegistry.registerComponent('VespresDisplay', () => VespresDisplay);

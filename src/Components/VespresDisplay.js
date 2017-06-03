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
  render() {
    VESPRES = this.props.liturgicProps.LITURGIA.vespres;
    const gloriaStringIntro = "Glòria al Pare i al Fill\ni a l’Esperit Sant.\nCom era al principi, ara i sempre\ni pels segles dels segles. Amén.";
    return (
      <View>
        <Text style={GLOBAL.styles.red}>V.
          <Text style={GLOBAL.styles.black}> Sigueu amb nosaltres, Déu nostre.</Text>
        </Text>
        <Text style={GLOBAL.styles.red}>R.
          <Text style={GLOBAL.styles.black}> Senyor, veniu a ajudar-nos.</Text>
        </Text>
        <Text />
        <Text style={GLOBAL.styles.black}>{gloriaStringIntro}
        {this.props.liturgicProps.LT !== GLOBAL.Q_CENDRA && this.props.liturgicProps.LT !== GLOBAL.Q_SETMANES && this.props.liturgicProps.LT !== GLOBAL.Q_DIUM_RAMS && this.props.liturgicProps.LT !== GLOBAL.Q_SET_SANTA && this.props.liturgicProps.LT !== GLOBAL.Q_TRIDU ?
          <Text style={GLOBAL.styles.black}> Al·leluia</Text> : null
        }
        </Text>
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>HIMNE</Text>
        <Text />
        {this.himne(this.props.liturgicProps.LT, this.props.variables.date.getDay(), this.props.liturgicProps.setmana, VESPRES)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>SALMÒDIA</Text>
        <Text />
        {this.salmodia(this.props.liturgicProps.LT, this.props.liturgicProps.setmana, this.props.variables.date.getDay(), VESPRES)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>LECTURA BREU</Text>
        <Text />
        {this.lecturaBreu(this.props.liturgicProps.LT, VESPRES)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>RESPONSORI BREU</Text>
        <Text />
        {this.responsori(this.props.liturgicProps.LT, this.props.variables.date.getDay(), VESPRES)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>CÀNTIC DE MARIA</Text>
        <Text />
        {this.cantic(this.props.liturgicProps.LT, this.props.variables.date.getDay(), this.props.ABC, VESPRES)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>PREGÀRIES</Text>
        <Text />
        {this.pregaries(this.props.liturgicProps.LT, this.props.variables.date.getDay(), VESPRES)}
        <Text />
        <Text style={GLOBAL.styles.red}>ORACIÓ</Text>
        <Text />
        <Text style={GLOBAL.styles.blackBold}>Preguem.</Text>
        {this.oracio(this.props.liturgicProps.LT, this.props.variables.date.getDay(), VESPRES)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>CONCLUSIÓ</Text>
        <Text />
        <Text style={GLOBAL.styles.red}>V.
          <Text style={GLOBAL.styles.black}> Que el Senyor ens beneeixi i ens guardi de tot mal, i ens dugui a la vida eterna.</Text>
        </Text>
        <Text style={GLOBAL.styles.red}>R.
          <Text style={GLOBAL.styles.black}> Amén.</Text>
        </Text>
        <Text />
      </View>
    );
  }

  gloria(g){
    const gloriaString = "Glòria al Pare i al Fill    *\ni a l’Esperit Sant.\nCom era al principi, ara i sempre    *\ni pels segles dels segles. Amén.";

    if(g === '1'){
      if(this.props.variables.gloria === 'false'){
        return(<Text style={GLOBAL.styles.black}>Glòria.</Text>);
      }
      else{
        return(<Text style={GLOBAL.styles.black}>{gloriaString}</Text>);
      }
    }
    else{
      if(g==='0'){
        return(<Text style={GLOBAL.styles.black}>S'omet el Glòria.</Text>);
      }
    }
  }

  himne(LT, weekDay, setmana, VESPRES){
    return(<Text style={GLOBAL.styles.black}>{VESPRES.himne}</Text>);
  }

  salmodia(LT, setmana, weekDay, VESPRES){
    return(
      <View>
        <Text style={GLOBAL.styles.red}>Ant. 1.
          <Text style={GLOBAL.styles.black}> {VESPRES.ant1}</Text>
        </Text>
        <Text />
        <Text style={GLOBAL.styles.redCenter}>{VESPRES.titol1}</Text>
        <Text />
        {VESPRES.com1 !== '-' ?
          <View><Text style={GLOBAL.styles.blackSmallItalicRight}>{VESPRES.com1}</Text><Text /></View> : null}
        <Text style={GLOBAL.styles.black}>{VESPRES.salm1}</Text>
        <Text />
        {this.gloria(VESPRES.gloria1)}
        <Text />
        <Text style={GLOBAL.styles.red}>Ant. 1.
          <Text style={GLOBAL.styles.black}> {VESPRES.ant1}</Text>
        </Text>
        <Text />
        <Text style={GLOBAL.styles.red}>Ant. 2.
          <Text style={GLOBAL.styles.black}> {VESPRES.ant2}</Text>
        </Text>
        <Text />
        <Text style={GLOBAL.styles.redCenter}>{VESPRES.titol2}</Text>
        <Text />
        {VESPRES.com2 !== '-' ?
          <View><Text style={GLOBAL.styles.blackSmallItalicRight}>{VESPRES.com2}</Text><Text /></View> : null}
        <Text style={GLOBAL.styles.black}>{VESPRES.salm2}</Text>
        <Text />
        {this.gloria(VESPRES.gloria2)}
        <Text />
        <Text style={GLOBAL.styles.red}>Ant. 2.
          <Text style={GLOBAL.styles.black}> {VESPRES.ant2}</Text>
        </Text>
        <Text />
        <Text style={GLOBAL.styles.red}>Ant. 3.
          <Text style={GLOBAL.styles.black}> {VESPRES.ant3}</Text>
        </Text>
        <Text />
        <Text style={GLOBAL.styles.redCenter}>{VESPRES.titol3}</Text>
        <Text />
        {VESPRES.com3 !== '-' ?
          <View><Text style={GLOBAL.styles.blackSmallItalicRight}>{VESPRES.com3}</Text><Text /></View> : null}
        <Text style={GLOBAL.styles.black}>{VESPRES.salm3}</Text>
        <Text />
        {this.gloria(VESPRES.gloria3)}
        <Text />
        <Text style={GLOBAL.styles.red}>Ant. 3.
          <Text style={GLOBAL.styles.black}> {VESPRES.ant3}</Text>
        </Text>
      </View>
    );
  }

  lecturaBreu(LT, VESPRES){
    return(
      <View>
        <Text style={GLOBAL.styles.red}>{VESPRES.vers}</Text>
        <Text />
        <Text style={GLOBAL.styles.black}>{VESPRES.lecturaBreu}</Text>
      </View>
    )
  }

  responsori(LT, weekDay, VESPRES){
    if(VESPRES.calAntEspecial){
      return(<Text style={GLOBAL.styles.black}> {VESPRES.antEspecialVespres}</Text>)
    }
    else{
      return(
        <View>
          <Text style={GLOBAL.styles.red}>V.
            <Text style={GLOBAL.styles.black}> {VESPRES.respBreu1} {VESPRES.respBreu2}</Text>
          </Text>
          <Text style={GLOBAL.styles.red}>R.
            <Text style={GLOBAL.styles.black}> {VESPRES.respBreu1} {VESPRES.respBreu2}</Text>
          </Text>
          <Text />
          <Text style={GLOBAL.styles.red}>V.
            <Text style={GLOBAL.styles.black}> {VESPRES.respBreu3}</Text>
          </Text>
          <Text style={GLOBAL.styles.red}>R.
            <Text style={GLOBAL.styles.black}> {VESPRES.respBreu2}</Text>
          </Text>
          <Text />
          <Text style={GLOBAL.styles.red}>V.
            <Text style={GLOBAL.styles.black}> Glòria al Pare i al Fill i a l'Esperit Sant.</Text>
          </Text>
          <Text style={GLOBAL.styles.red}>R.
            <Text style={GLOBAL.styles.black}> {VESPRES.respBreu1} {VESPRES.respBreu2}</Text>
          </Text>
        </View>
      )
    }
  }

  cantic(LT, weekDay, litYear, VESPRES){
    return(
      <View>
        <Text style={GLOBAL.styles.red}>Ant.
          <Text style={GLOBAL.styles.black}> {VESPRES.antCantic}</Text>
        </Text>
        <Text />
        <Text style={GLOBAL.styles.black}>{VESPRES.cantic}</Text>
        <Text />
        {this.gloria('1')}
        <Text />
        <Text style={GLOBAL.styles.red}>Ant.
          <Text style={GLOBAL.styles.black}> {VESPRES.antCantic}</Text>
        </Text>
      </View>
    );
  }

  pregaries(LT, weekDay, VESPRES){
    return(<Text style={GLOBAL.styles.black}> {VESPRES.pregaries}</Text>);
  }

  oracio(LT, weekDay, VESPRES){
    return(<Text style={GLOBAL.styles.black}>{VESPRES.oracio}</Text>);
  }
}

AppRegistry.registerComponent('VespresDisplay', () => VespresDisplay);

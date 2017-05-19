import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Platform
} from 'react-native';
import Hr from 'react-native-hr';

const O_ORDINARI = 'O_ORDINAR';
const Q_CENDRA = 'Q_CENDRA';
const Q_SETMANES = 'Q_SETMANES';
const Q_DIUM_RAMS = 'Q_DIUM_RAMS';
const Q_SET_SANTA = 'Q_SET_SANTA';
const Q_TRIDU = 'Q_TRIDU';
const Q_DIUM_PASQUA = 'Q_DIUM_PASQUA';
const P_OCTAVA = 'P_OCTAVA';
const P_SETMANES = 'P_SETMANES';
const A_SETMANES = 'A_SETMANES';
const A_FERIES = 'A_FERIES';
const N_OCTAVA = 'N_OCTAVA';
const N_ABANS = 'N_ABANS';

import GLOBAL from '../Globals/Globals';

export default class VespresDisplay extends Component {
  render() {
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
        {this.props.LT !== Q_CENDRA && this.props.LT !== Q_SETMANES && this.props.LT !== Q_DIUM_RAMS && this.props.LT !== Q_SET_SANTA && this.props.LT !== Q_TRIDU ? //TODO: tenir en compte si és o no Quaresma
          <Text style={GLOBAL.styles.black}> Al·leluia</Text> : null
        }
        </Text>
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>HIMNE</Text>
        <Text />
        {this.himne(this.props.LT, this.props.weekDay, this.props.setmana)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>SALMÒDIA</Text>
        <Text />
        {this.salmodia(this.props.LT, this.props.setmana, this.props.weekDay)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>LECTURA BREU</Text>
        <Text />
        {this.lecturaBreu(this.props.LT)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>RESPONSORI BREU</Text>
        <Text />
        {this.responsori(this.props.LT, this.props.weekDay)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>CÀNTIC DE MARIA</Text>
        <Text />
        {this.cantic(this.props.LT, this.props.weekDay, this.props.ABC)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>PREGÀRIES</Text>
        <Text />
        {this.pregaries(this.props.LT, this.props.weekDay)}
        <Text />
        <Text style={GLOBAL.styles.red}>ORACIÓ</Text>
        <Text />
        <Text style={GLOBAL.styles.blackBold}>Preguem.</Text>
        {this.oracio(this.props.LT, this.props.weekDay)}
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
      if(true === true){ //TODO: tenir en compte els ajustaments
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

  himne(LT, weekDay, setmana){
    return(<Text style={GLOBAL.styles.black}>{this.props.VESPRES.himne}</Text>);
  }

  salmodia(LT, setmana, weekDay){
    return(
      <View>
        <Text style={GLOBAL.styles.red}>Ant. 1.
          <Text style={GLOBAL.styles.black}> {this.props.VESPRES.ant1}</Text>
        </Text>
        <Text />
        <Text style={GLOBAL.styles.redCenter}>{this.props.VESPRES.titol1}</Text>
        <Text />
        {this.props.VESPRES.com1 !== '-' ?
          <View><Text style={GLOBAL.styles.blackSmallItalicRight}>{this.props.VESPRES.com1}</Text><Text /></View> : null}
        <Text style={GLOBAL.styles.black}>{this.props.VESPRES.salm1}</Text>
        <Text />
        {this.gloria(this.props.VESPRES.gloria1)}
        <Text />
        <Text style={GLOBAL.styles.red}>Ant. 1.
          <Text style={GLOBAL.styles.black}> {this.props.VESPRES.ant1}</Text>
        </Text>
        <Text />
        <Text style={GLOBAL.styles.red}>Ant. 2.
          <Text style={GLOBAL.styles.black}> {this.props.VESPRES.ant2}</Text>
        </Text>
        <Text />
        <Text style={GLOBAL.styles.redCenter}>{this.props.VESPRES.titol2}</Text>
        <Text />
        {this.props.VESPRES.com2 !== '-' ?
          <View><Text style={GLOBAL.styles.blackSmallItalicRight}>{this.props.VESPRES.com2}</Text><Text /></View> : null}
        <Text style={GLOBAL.styles.black}>{this.props.VESPRES.salm2}</Text>
        <Text />
        {this.gloria(this.props.VESPRES.gloria2)}
        <Text />
        <Text style={GLOBAL.styles.red}>Ant. 2.
          <Text style={GLOBAL.styles.black}> {this.props.VESPRES.ant2}</Text>
        </Text>
        <Text />
        <Text style={GLOBAL.styles.red}>Ant. 3.
          <Text style={GLOBAL.styles.black}> {this.props.VESPRES.ant3}</Text>
        </Text>
        <Text />
        <Text style={GLOBAL.styles.redCenter}>{this.props.VESPRES.titol3}</Text>
        <Text />
        {this.props.VESPRES.com3 !== '-' ?
          <View><Text style={GLOBAL.styles.blackSmallItalicRight}>{this.props.VESPRES.com3}</Text><Text /></View> : null}
        <Text style={GLOBAL.styles.black}>{this.props.VESPRES.salm3}</Text>
        <Text />
        {this.gloria(this.props.VESPRES.gloria3)}
        <Text />
        <Text style={GLOBAL.styles.red}>Ant. 3.
          <Text style={GLOBAL.styles.black}> {this.props.VESPRES.ant3}</Text>
        </Text>
      </View>
    );
  }

  lecturaBreu(LT, weekDay){
    return(
      <View>
        <Text style={GLOBAL.styles.red}>{this.props.VESPRES.vers}</Text>
        <Text />
        <Text style={GLOBAL.styles.black}>{this.props.VESPRES.lecturaBreu}</Text>
      </View>
    )
  }

  responsori(LT, weekDay){
    if(this.props.VESPRES.calAntEspecial){
      return(<Text style={GLOBAL.styles.black}> {this.props.VESPRES.antEspecialVespres}</Text>)
    }
    else{
      return(
        <View>
          <Text style={GLOBAL.styles.red}>V.
            <Text style={GLOBAL.styles.black}> {this.props.VESPRES.respBreu1} {this.props.VESPRES.respBreu2}</Text>
          </Text>
          <Text style={GLOBAL.styles.red}>R.
            <Text style={GLOBAL.styles.black}> {this.props.VESPRES.respBreu1} {this.props.VESPRES.respBreu2}</Text>
          </Text>
          <Text />
          <Text style={GLOBAL.styles.red}>V.
            <Text style={GLOBAL.styles.black}> {this.props.VESPRES.respBreu3}</Text>
          </Text>
          <Text style={GLOBAL.styles.red}>R.
            <Text style={GLOBAL.styles.black}> {this.props.VESPRES.respBreu2}</Text>
          </Text>
          <Text />
          <Text style={GLOBAL.styles.red}>V.
            <Text style={GLOBAL.styles.black}> Glòria al Pare i al Fill i a l'Esperit Sant.</Text>
          </Text>
          <Text style={GLOBAL.styles.red}>R.
            <Text style={GLOBAL.styles.black}> {this.props.VESPRES.respBreu1} {this.props.VESPRES.respBreu2}</Text>
          </Text>
        </View>
      )
    }
  }

  cantic(LT, weekDay, litYear){
    return(
      <View>
        <Text style={GLOBAL.styles.red}>Ant.
          <Text style={GLOBAL.styles.black}> {this.props.VESPRES.antCantic}</Text>
        </Text>
        <Text />
        <Text style={GLOBAL.styles.black}>{this.props.VESPRES.cantic}</Text>
        <Text />
        {this.gloria('1')}
        <Text />
        <Text style={GLOBAL.styles.red}>Ant.
          <Text style={GLOBAL.styles.black}> {this.props.VESPRES.antCantic}</Text>
        </Text>
      </View>
    );
  }

  pregaries(LT, weekDay){
    return(<Text style={GLOBAL.styles.black}> {this.props.VESPRES.pregaries}</Text>);
  }

  oracio(LT, weekDay){
    return(<Text style={GLOBAL.styles.black}>{this.props.VESPRES.oracio}</Text>);
  }
}

AppRegistry.registerComponent('VespresDisplay', () => VespresDisplay);

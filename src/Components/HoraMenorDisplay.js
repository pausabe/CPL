import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Platform
} from 'react-native';
import Hr from 'react-native-hr';
import GLOBAL from '../Globals/Globals';

export default class HoraMenorDisplay extends Component {
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
        {this.props.LT !== GLOBAL.Q_CENDRA && this.props.LT !== GLOBAL.Q_SETMANES && this.props.LT !== GLOBAL.Q_DIUM_RAMS && this.props.LT !== GLOBAL.Q_SET_SANTA && this.props.LT !== GLOBAL.Q_TRIDU ? //TODO: tenir en compte si és o no Quaresma
          <Text style={GLOBAL.styles.black}> Al·leluia</Text> : null
        }
        </Text>
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>HIMNE</Text>
        <Text />
        {this.himne(this.props.LT, this.props.weekDay, this.props.setmana, this.props.HM)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>SALMÒDIA</Text>
        <Text />
        {this.salmodia(this.props.LT, this.props.setmana, this.props.weekDay, this.props.HM)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>LECTURA BREU</Text>
        <Text />
        {this.lecturaBreuResp(this.props.LT, this.props.HM)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>ORACIÓ</Text>
        <Text />
        <Text style={GLOBAL.styles.blackBold}>Preguem.</Text>
        {this.oracio(this.props.LT, this.props.weekDay, this.props.HM)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>CONCLUSIÓ</Text>
        <Text />
        <Text style={GLOBAL.styles.red}>V.
          <Text style={GLOBAL.styles.black}> Beneïm al Senyor.</Text>
        </Text>
        <Text style={GLOBAL.styles.red}>R.
          <Text style={GLOBAL.styles.black}> Donem gràcies a Déu.</Text>
        </Text>
        <Text />
      </View>
    );
  }

  gloria(g){
    const gloriaString = "Glòria al Pare i al Fill    *\ni a l’Esperit Sant.\nCom era al principi, ara i sempre    *\ni pels segles dels segles. Amén.";
    if(g === '1'){
      if(true === false){ //TODO: tenir en compte els ajustaments
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

  himne(LT, weekDay, setmana, HM){
    return(<Text style={GLOBAL.styles.black}>{this.props.HORA_MENOR.himne}</Text>);
  }

  salmodia(LT, setmana, weekDay, HM){
    return(
      <View>
        {this.props.HORA_MENOR.antifones ?
          <View>
            <Text style={GLOBAL.styles.red}>Ant. 1.
              <Text style={GLOBAL.styles.black}> {this.props.HORA_MENOR.ant1}</Text>
            </Text>
          </View>
        :
          <View>
            <Text style={GLOBAL.styles.red}>Ant.
              <Text style={GLOBAL.styles.black}> {this.props.HORA_MENOR.ant}</Text>
            </Text>
          </View>
        }
        <Text />
        <Text style={GLOBAL.styles.redCenter}>{this.props.HORA_MENOR.titol1}</Text>
        <Text />
        {this.props.HORA_MENOR.com1 !== '-' ?
          <View><Text style={GLOBAL.styles.blackSmallItalicRight}>{this.props.HORA_MENOR.com1}</Text><Text /></View> : null}
        <Text style={GLOBAL.styles.black}>{this.props.HORA_MENOR.salm1}</Text>
        <Text />
        {this.gloria(this.props.HORA_MENOR.gloria1)}
        <Text />
        {this.props.HORA_MENOR.antifones ?
          <View>
            <Text style={GLOBAL.styles.red}>Ant. 1.
              <Text style={GLOBAL.styles.black}> {this.props.HORA_MENOR.ant1}</Text>
            </Text>
            <Text />
            <Text style={GLOBAL.styles.red}>Ant. 2.
              <Text style={GLOBAL.styles.black}> {this.props.HORA_MENOR.ant2}</Text>
            </Text>
            <Text />
          </View>
        : null }
        <Text style={GLOBAL.styles.redCenter}>{this.props.HORA_MENOR.titol2}</Text>
        <Text />
        {this.props.HORA_MENOR.com2 !== '-' ?
          <View><Text style={GLOBAL.styles.blackSmallItalicRight}>{this.props.HORA_MENOR.com2}</Text><Text /></View> : null}
        <Text style={GLOBAL.styles.black}>{this.props.HORA_MENOR.salm2}</Text>
        <Text />
        {this.gloria(this.props.HORA_MENOR.gloria2)}
        <Text />
        {this.props.HORA_MENOR.antifones ?
          <View>
            <Text style={GLOBAL.styles.red}>Ant. 2.
              <Text style={GLOBAL.styles.black}> {this.props.HORA_MENOR.ant2}</Text>
            </Text>
            <Text />
            <Text style={GLOBAL.styles.red}>Ant. 3.
              <Text style={GLOBAL.styles.black}> {this.props.HORA_MENOR.ant3}</Text>
            </Text>
            <Text />
          </View>
        : null }
        <Text style={GLOBAL.styles.redCenter}>{this.props.HORA_MENOR.titol3}</Text>
        <Text />
        {this.props.HORA_MENOR.com3 !== '-' ?
          <View><Text style={GLOBAL.styles.blackSmallItalicRight}>{this.props.HORA_MENOR.com3}</Text><Text /></View> : null}
        <Text style={GLOBAL.styles.black}>{this.props.HORA_MENOR.salm3}</Text>
        <Text />
        {this.gloria(this.props.HORA_MENOR.gloria3)}
        <Text />
        {this.props.HORA_MENOR.antifones ?
          <View>
            <Text style={GLOBAL.styles.red}>Ant. 3.
              <Text style={GLOBAL.styles.black}> {this.props.HORA_MENOR.ant3}</Text>
            </Text>
          </View>
        :
          <View>
            <Text style={GLOBAL.styles.red}>Ant.
              <Text style={GLOBAL.styles.black}> {this.props.HORA_MENOR.ant}</Text>
            </Text>
          </View>
        }
      </View>
    );
  }

  lecturaBreuResp(LT, HM){
    return(
      <View>
        <Text style={GLOBAL.styles.red}>{this.props.HORA_MENOR.vers}</Text>
        <Text />
        <Text style={GLOBAL.styles.black}>{this.props.HORA_MENOR.lecturaBreu}</Text>
        <Text />
        <Text style={GLOBAL.styles.red}>V.
          <Text style={GLOBAL.styles.black}> {this.props.HORA_MENOR.respV}</Text>
        </Text>
        <Text style={GLOBAL.styles.red}>R.
          <Text style={GLOBAL.styles.black}> {this.props.HORA_MENOR.respR}</Text>
        </Text>
      </View>
    )
  }

  oracio(LT, weekDay, HM){
    return(<Text style={GLOBAL.styles.black}>{this.props.HORA_MENOR.oracio}</Text>);
  }
}

AppRegistry.registerComponent('HoraMenorDisplay', () => HoraMenorDisplay);

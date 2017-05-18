import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
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

export default class OficiDisplay extends Component {
  render() {
    return (
      <View>
        {this.introduccio(this.props.LT, this.props.setmana)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>HIMNE</Text>
        <Text />
        {this.himne(this.props.LT, this.props.weekDay, false, this.props.setmana)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>SALMÒDIA</Text>
        <Text />
        {this.salmodia(this.props.LT, this.props.setmana, this.props.weekDay, this.props.cicle)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>VERS</Text>
        <Text />
        {this.vers(this.props.LT)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>LECTURES</Text>
        <Text />
        {this.lectures(this.props.LT)}
        {this.himneOhDeu(this.props.LT, this.props.weekDay)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>ORACIÓ</Text>
        <Text />
        <Text style={styles.blackBold}>Preguem.</Text>
        {this.oracio(this.props.LT, this.props.weekDay)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>CONCLUSIÓ</Text>
        <Text />
        <Text style={styles.red}>V.
          <Text style={styles.black}> Beneïm al Senyor.</Text>
        </Text>
        <Text style={styles.red}>R.
          <Text style={styles.black}> Donem gràcies a Déu.</Text>
        </Text>
        <Text />
      </View>
    );
  }

  gloria(g){
    const gloriaString = "Glòria al Pare i al Fill    *\ni a l’Esperit Sant.\nCom era al principi, ara i sempre    *\ni pels segles dels segles. Amén.";

    if(g === '1'){
      if(true === true){ //TODO: tenir en compte els ajustaments
        return(<Text style={styles.black}>Glòria.</Text>);
      }
      else{
        return(<Text style={styles.black}>{gloriaString}</Text>);
      }
    }
    else{
      if(g==='0'){
        return(<Text style={styles.black}>S'omet el Glòria.</Text>);
      }
    }
  }

  introduccio(LT, setmana){
    const gloriaStringIntro = "Glòria al Pare i al Fill\ni a l’Esperit Sant.\nCom era al principi, ara i sempre\ni pels segles dels segles. Amén.";

    if(true){ //TODO: todo
      return(
        <View>
          <Text style={styles.red}>V.
            <Text style={styles.black}> Sigueu amb nosaltres, Déu nostre.</Text>
          </Text>
          <Text style={styles.red}>R.
            <Text style={styles.black}> Senyor, veniu a ajudar-nos.</Text>
          </Text>
          <Text />
          <Text style={styles.black}>{gloriaStringIntro}
            {this.props.LT !== Q_CENDRA && this.props.LT !== Q_SETMANES && this.props.LT !== Q_DIUM_RAMS && this.props.LT !== Q_SET_SANTA && this.props.LT !== Q_TRIDU ? //TODO: tenir en compte si és o no Quaresma
              <Text style={styles.black}> Al·leluia</Text> : null
            }
          </Text>
        </View>
      )
    }
    else{
      return(
        <View>
          <Text style={styles.red}>V.
            <Text style={styles.black}> Obriu-me els llavis, Senyor.</Text>
          </Text>
          <Text style={styles.red}>R.
            <Text style={styles.black}> I proclamaré la vostra lloança.</Text>
          </Text>
          <Text />
          <Hr lineColor='#CFD8DC' />
          <Text />
          <Text style={styles.red}>Ant.
            <Text style={styles.black}> {this.props.OFICI.antInvitatori}</Text>
          </Text>
          <Text />
          <Text style={styles.redCenter}>{"Salm 94\nInvitació a lloar Déu"}</Text>
          <Text />
          <Text style={styles.blackSmallItalicRight}>{"Mentre repetim aquell «avui», exhortem-nos cada dia els uns als altres (He 3, 13)"}</Text>
          <Text />
          <Text style={styles.black}>{this.props.OFICI.salm94}</Text>
          <Text />
          {this.gloria('1')}
          <Text />
          <Text style={styles.red}>Ant.
            <Text style={styles.black}> {this.props.OFICI.antInvitatori}</Text>
          </Text>
        </View>
      )
    }
  }

  himne(LT, weekDay, nit, setmana){
    return(<Text style={styles.black}>{this.props.OFICI.himne}</Text>);
  }

  salmodia(LT, setmana, weekDay, cicle){
    return(
      <View>
        <Text style={styles.red}>Ant. 1.
          <Text style={styles.black}> {this.props.OFICI.ant1}</Text>
        </Text>
        <Text />
        <Text style={styles.redCenter}>{this.props.OFICI.titol1}</Text>
        <Text />
        {this.props.OFICI.com1 !== '-' ?
          <View><Text style={styles.blackSmallItalicRight}>{this.props.OFICI.com1}</Text><Text /></View> : null}
        <Text style={styles.black}>{this.props.OFICI.salm1}</Text>
        <Text />
        {this.gloria(this.props.OFICI.gloria1)}
        <Text />
        <Text style={styles.red}>Ant. 1.
          <Text style={styles.black}> {this.props.OFICI.ant1}</Text>
        </Text>
        <Text />
        <Text style={styles.red}>Ant. 2.
          <Text style={styles.black}> {this.props.OFICI.ant2}</Text>
        </Text>
        <Text />
        <Text style={styles.redCenter}>{this.props.OFICI.titol2}</Text>
        <Text />
        {this.props.OFICI.com2 !== '-' ?
          <View><Text style={styles.blackSmallItalicRight}>{this.props.OFICI.com2}</Text><Text /></View> : null}
        <Text style={styles.black}>{this.props.OFICI.salm2}</Text>
        <Text />
        {this.gloria(this.props.OFICI.gloria2)}
        <Text />
        <Text style={styles.red}>Ant. 2.
          <Text style={styles.black}> {this.props.OFICI.ant2}</Text>
        </Text>
        <Text />
        <Text style={styles.red}>Ant. 3.
          <Text style={styles.black}> {this.props.OFICI.ant3}</Text>
        </Text>
        <Text />
        <Text style={styles.redCenter}>{this.props.OFICI.titol3}</Text>
        <Text />
        {this.props.OFICI.com3 !== '-' ?
          <View><Text style={styles.blackSmallItalicRight}>{this.props.OFICI.com3}</Text><Text /></View> : null}
        <Text style={styles.black}>{this.props.OFICI.salm3}</Text>
        <Text />
        {this.gloria(this.props.OFICI.gloria3)}
        <Text />
        <Text style={styles.red}>Ant. 3.
          <Text style={styles.black}> {this.props.OFICI.ant3}</Text>
        </Text>
      </View>
    );
  }

  vers(LT){
    return(
      <View>
        <Text style={styles.red}>V.
          <Text style={styles.black}> {this.props.OFICI.respV}</Text>
        </Text>
        <Text style={styles.red}>R.
          <Text style={styles.black}> {this.props.OFICI.respR}</Text>
        </Text>
      </View>
    );
  }

  lectures(LT){
    return(
      <View>
        <Text style={styles.red}>Primera lectura</Text>
        <Text style={styles.black}>{this.props.OFICI.referencia1}
          <Text style={styles.red}> {this.props.OFICI.cita1}</Text></Text>
        <Text />
        <Text style={styles.redCenterBold}>{this.props.OFICI.titol1}</Text>
        <Text />
        <Text style={styles.black}>{this.props.OFICI.lectura1}</Text>
        <Text />
        <Text style={styles.red}>Responsori
          <Text style={styles.redSmallItalicRight}> {this.props.OFICI.citaResp1}</Text>
        </Text>
        <Text style={styles.red}>R.
          <Text style={styles.black}> {this.props.OFICI.resp1Part1} {this.props.OFICI.resp1Part2}</Text>
        </Text>
        <Text style={styles.red}>V.
          <Text style={styles.black}> {this.props.OFICI.resp1Part3} {this.props.OFICI.resp1Part2}</Text>
        </Text>
        <Text />
        <Text style={styles.red}>Segona lectura</Text>
        <Text style={styles.black}>{this.props.OFICI.referencia2}
          <Text style={styles.red}> {this.props.OFICI.cita2}</Text></Text>
        <Text />
        <Text style={styles.redCenterBold}>{this.props.OFICI.titol2}</Text>
        <Text />
        <Text style={styles.black}>{this.props.OFICI.lectura2}</Text>
        <Text />
        <Text style={styles.red}>Responsori
          <Text style={styles.redSmallItalicRight}>  {this.props.OFICI.versResp2}</Text>
        </Text>
        <Text style={styles.red}>R.
          <Text style={styles.black}> {this.props.OFICI.resp2Part1} {this.props.OFICI.resp2Part2}</Text>
        </Text>
        <Text style={styles.red}>V.
          <Text style={styles.black}>  {this.props.OFICI.resp2Part3} {this.props.OFICI.resp2Part2}</Text>
        </Text>
      </View>
    )
  }

  himneOhDeu(LT, weekDay){
    if(this.props.OFICI.himneOhDeuBool){
      return(
        <View>
          <Hr lineColor='#CFD8DC' />
          <Text />
          <Text style={styles.red}>HIMNE</Text>
          <Text />
          <Text style={styles.black}>{this.props.OFICI.himneOhDeu}</Text>
          <Text />
        </View>
      )
    }
  }

  oracio(LT, weekDay){
    return(<Text style={styles.black}>{this.props.OFICI.oracio}</Text>);
  }
}

const styles = StyleSheet.create({
  black: {
    color: '#000000',
    fontSize: GLOBAL.normalTextSize,
  },
  blackBold: {
    color: '#000000',
    fontSize: GLOBAL.normalTextSize,
    fontWeight: 'bold',
  },
  blackSmallItalic:{
    color: '#000000',
    fontSize: GLOBAL.smallTextSize,
    fontStyle: 'italic'
  },
  blackSmallItalicRight: {
    color: '#000000',
    fontSize: GLOBAL.smallTextSize,
    fontStyle: 'italic',
    textAlign: 'right'
  },
  red: {
    color: '#FF0000',
    fontSize: GLOBAL.normalTextSize,
  },
  redCenter: {
    color: '#FF0000',
    fontSize: GLOBAL.normalTextSize,
    textAlign: 'center'
  },
  redCenterBold: {
    color: '#FF0000',
    fontSize: GLOBAL.normalTextSize,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  redSmallItalicRight: {
    color: '#FF0000',
    fontSize: GLOBAL.smallTextSize,
    fontStyle: 'italic',
    textAlign: 'right'
  }
});

AppRegistry.registerComponent('OficiDisplay', () => OficiDisplay);

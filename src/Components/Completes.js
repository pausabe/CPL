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

import DBAdapter from '../SQL/DBAdapter';
import GLOBAL from '../Globals/Globals';

export default class Completes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      salteriComuCompletes: '',
      cantic: '',
      himneLlati: '',
      himneCat: '',
      antMare: '',
    }

    this.queryRows = {
      salteriComuCompletes: '',
    }

    this.count = 2; //number of queryies

    acceso = new DBAdapter();

    {props.weekDay === 6 ? id = 1 : id = props.weekDay + 2}
    acceso.getLiturgia("salteriComuCompletes", id, (result) => { this.queryRows.salteriComuCompletes = result; this.dataReceived(); });

    id = -1;
    acceso.getLiturgia("diversos", id, (result) => { this.queryRows.diversos = result; this.dataReceived(); });
  }

  dataReceived(){
    this.count -= 1;

    if(this.count === 0){
      //console.log("test: " + this.queryRows.diversos.item(0).concepte);
      this.setState({
        salteriComuCompletes: this.queryRows.salteriComuCompletes,
        cantic: this.queryRows.diversos.item(22).oracio,
        himneLlati: this.queryRows.diversos.item(20).oracio, //TODO: opto per la fórmula 2, fer seleccionable?
        himneCat: this.queryRows.diversos.item(21).oracio,
        antMare: this.queryRows.diversos.item(30).oracio, //TODO: opto per aqesta, fer seleccionable? Tb en llati?
      })
    }
  }

  render() {
    const gloriaStringIntro = "Glòria al Pare i al Fill\ni a l’Esperit Sant.\nCom era al principi, ara i sempre\ni pels segles dels segles. Amén.";

    himneLlati = this.state.himneLlati;
    himneCat = this.state.himneCat;

    antifones = true;
    ant1 = this.state.salteriComuCompletes.ant1;
    titol1 = this.state.salteriComuCompletes.titol1;
    com1 = this.state.salteriComuCompletes.com1
    salm1 = this.state.salteriComuCompletes.salm1;
    gloria1 = this.state.salteriComuCompletes.gloria1;
    dosSalms = this.state.salteriComuCompletes.dosSalms;
    ant2 = this.state.salteriComuCompletes.ant2;
    titol2 = this.state.salteriComuCompletes.titol2;
    com2 = this.state.salteriComuCompletes.com2;
    salm2 = this.state.salteriComuCompletes.salm2;
    gloria2 = this.state.salteriComuCompletes.gloria2;

    vers = this.state.salteriComuCompletes.versetLB;
    lecturaBreu = this.state.salteriComuCompletes.lecturaBreu;

    antRespEspecial = "-";
    respBreu1 = "A les vostes mans, Senyor,";
    respBreu2 = "Encomano el meu esperit.";
    respBreu3 = "Vós, Déu fidel, ens heu redimit.";

    antCantic = "Salveu-nos, Senyor, durant el dia, guardeu-nos durant la nit, perquè sigui amb Crist la nostra vetlla i amb Crist el nostre descans."; //TODO: omplir!
    cantic = this.state.cantic;

    oracio = this.state.salteriComuCompletes.oraFi;

    switch (this.props.LT) {
      case P_OCTAVA: //TODO: l'oració final és com diumenge??
        antifones = false;
        ant1 = "Al·leluia, al·leluia, al·leluia.";
        antRespEspecial = "Avui és el dia en què ha obrat el Senyor: alegrem-nos i celebrem-lo, al·leluia.";
        antCantic = "Salveu-nos, Senyor, durant el dia, guardeu-nos durant la nit, perquè sigui amb Crist la nostra vetlla i amb Crist el nostre descans. Al·leluia.";
        break;
      case P_SETMANES:
        antifones = false;
        ant1 = "Al·leluia, al·leluia, al·leluia.";
        respBreu1 = "A les vostes mans, Senyor, encomano el meu esperit,";
        respBreu2 = "Al·leluia, al·leluia.";
        respBreu3 = "Vós, Déu fidel, ens heu redimit.";
        antCantic = "Salveu-nos, Senyor, durant el dia, guardeu-nos durant la nit, perquè sigui amb Crist la nostra vetlla i amb Crist el nostre descans. Al·leluia.";
      case Q_TRIDU:
        if(this.props.weekDay === 6){ //primeres vespres diumenge de pasqua
          antRespEspecial = "Avui és el dia en què ha obrat el Senyor: alegrem-nos i celebrem-lo, al·leluia.";
        }
        break;
    }

    return (
      <View>
        <Text style={styles.red}>V.
          <Text style={styles.black}> Sigueu amb nosaltres, Déu nostre.</Text>
        </Text>
        <Text style={styles.red}>R.
          <Text style={styles.black}> Senyor, veniu a ajudar-nos.</Text>
        </Text>
        <Text />
        <Text style={styles.black}>{gloriaStringIntro}
        {this.props.LT !== Q_CENDRA && this.props.LT !== Q_SETMANES && this.props.LT !== Q_DIUM_RAMS && this.props.LT !== Q_SET_SANTA && this.props.LT !== Q_TRIDU ?
          <Text style={styles.black}> Al·leluia</Text> : null
        }
        </Text>
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.redCenter}>És lloable que aquí es faci examen de consciència, que, en la celebració comunitària, pot integrar-se en un acte penitencial com els que figuren en l'Ordre de la missa.</Text>
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>HIMNE</Text>
        <Text />
        {false ? <Text style={styles.black}>{himneLlati}</Text> : <Text style={styles.black}>{himneCat}</Text>}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>SALMÒDIA</Text>
        <Text />
        {dosSalms === "1" ?
          <View>
            {antifones ?
              <Text style={styles.red}>Ant. 1.
                <Text style={styles.black}> {ant1}</Text>
              </Text>
            :
              <Text style={styles.red}>Ant.
                <Text style={styles.black}> {ant1}</Text>
              </Text>
            }
            <Text />
            <Text style={styles.redCenter}>{titol1}</Text>
            <Text />
            {com1 !== '-' ?
              <View><Text style={styles.blackSmallItalicRight}>{com1}</Text><Text /></View> : null}
            <Text style={styles.black}>{salm1}</Text>
            <Text />
            {this.gloria(gloria1)}
            <Text />
            {antifones ?
              <View>
                <Text style={styles.red}>Ant. 1.
                  <Text style={styles.black}> {ant1}</Text>
                </Text>
                <Text />
                <Text style={styles.red}>Ant. 2.
                  <Text style={styles.black}> {ant2}</Text>
                </Text>
                <Text />
              </View>
            : null
            }
            <Text style={styles.redCenter}>{titol2}</Text>
            <Text />
            {com2 !== '-' ?
              <View><Text style={styles.blackSmallItalicRight}>{com2}</Text><Text /></View> : null}
            <Text style={styles.black}>{salm2}</Text>
            <Text />
            {this.gloria(gloria2)}
            <Text />
            {antifones ?
              <View>
                <Text style={styles.red}>Ant. 2.
                  <Text style={styles.black}> {ant2}</Text>
                </Text>
              </View>
            :
              <View>
                <Text style={styles.red}>Ant.
                  <Text style={styles.black}> {ant1}</Text>
                </Text>
              </View>
            }
          </View>
        :
          <View>
            <Text style={styles.red}>Ant.
              <Text style={styles.black}> {ant1}</Text>
            </Text>
            <Text />
            <Text style={styles.redCenter}>{titol1}</Text>
            <Text />
            {com1 !== '-' ?
              <View><Text style={styles.blackSmallItalicRight}>{com1}</Text><Text /></View> : null}
            <Text style={styles.black}>{salm1}</Text>
            <Text />
            {this.gloria(gloria1)}
            <Text />
            <Text style={styles.red}>Ant.
              <Text style={styles.black}> {ant1}</Text>
            </Text>
          </View>
        }
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>LECTURA BREU</Text>
        <Text />
        <Text style={styles.red}>{vers}</Text>
        <Text />
        <Text style={styles.black}>{lecturaBreu}</Text>
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>RESPONSORI BREU</Text>
        <Text />
        {antRespEspecial === "-" ?
          <View>
            <Text style={styles.red}>V.
              <Text style={styles.black}> {respBreu1} {respBreu2}</Text>
            </Text>
            <Text style={styles.red}>R.
              <Text style={styles.black}> {respBreu1} {respBreu2}</Text>
            </Text>
            <Text />
            <Text style={styles.red}>V.
              <Text style={styles.black}> {respBreu3}</Text>
            </Text>
            <Text style={styles.red}>R.
              <Text style={styles.black}> {respBreu2}</Text>
            </Text>
            <Text />
            <Text style={styles.red}>V.
              <Text style={styles.black}> Glòria al Pare i al Fill i a l'Esperit Sant.</Text>
            </Text>
            <Text style={styles.red}>R.
              <Text style={styles.black}> {respBreu1} {respBreu2}</Text>
            </Text>
          </View>
        :
          <View>
            <Text style={styles.red}>Ant.
              <Text style={styles.black}> {antRespEspecial}</Text>
            </Text>
          </View>
        }
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>CÀNTIC SIMEÓ</Text>
        <Text />
        <Text style={styles.red}>Ant.
          <Text style={styles.black}> {antCantic}</Text>
        </Text>
        <Text />
        <Text style={styles.black}>{cantic}</Text>
        <Text />
        {this.gloria('1')}
        <Text />
        <Text style={styles.red}>Ant.
          <Text style={styles.black}> {antCantic}</Text>
        </Text>
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>ORACIÓ</Text>
        <Text />
        <Text style={styles.blackBold}>Preguem.</Text>
        <Text style={styles.black}>{oracio}</Text>
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>CONCLUSIÓ</Text>
        <Text />
        <Text style={styles.red}>V.
          <Text style={styles.black}> Que el Senyor totpoderós ens concedeixi una nit tranquil·la i una fi beneurada.</Text>
        </Text>
        <Text style={styles.red}>R.
          <Text style={styles.black}> Amén.</Text>
        </Text>
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.black}>{this.state.antMare}</Text>
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

AppRegistry.registerComponent('Completes', () => Completes);

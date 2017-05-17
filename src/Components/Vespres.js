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

export default class Vespres extends Component {
  constructor(props) {
    super(props)

    this.state = {
      nit: null,
      salteriComuVespres: '',
      tempsOrdinariOracions: '',
      tempsQuaresmaComuFV: '',
      tempsQuaresmaCendra: '',
      tempsQuaresmaVSetmanes: '',
      tempsQuaresmaVSetmanesDium: '',
      tempsQuaresmaComuSS: '',
      tempsQuaresmaRams: '',
      tempsQuaresmaSetSanta: '',
      tempsQuaresmaTridu: '',
      tempsQuaresmaDiumPasq: '',
      tempsPasquaAA: '',
      tempsPasquaOct: '',
      tempsPasquaDA: '',
      tempsPasquaSetmanes: '',
      tempsPasquaSetmanesDium: '',
      tempsAdventNadalComu: '',
      tempsAdventSetmanes: '',
      tempsAdventSetmanesDium: '',
      tempsAdventFeries: '',
      tempsNadalOctava: '',
      tempsNadalAbansEpifania: '',
      tempsSolemnitatsFestes: '',
      salteriComuEspPasqua: '',
      magnificat: '',
    }

    this.queryRows = {
      salteriComuVespres: '',
      tempsOrdinariOracions: '',
      tempsQuaresmaComuFV: '',
      tempsQuaresmaCendra: '',
      tempsQuaresmaVSetmanes: '',
      tempsQuaresmaVSetmanesDium: '',
      tempsQuaresmaComuSS: '',
      tempsQuaresmaRams: '',
      tempsQuaresmaSetSanta: '',
      tempsQuaresmaTridu: '',
      tempsQuaresmaDiumPasq: '',
      tempsPasquaAA: '',
      tempsPasquaOct: '',
      tempsPasquaDA: '',
      tempsPasquaSetmanes: '',
      tempsPasquaSetmanesDium: '',
      tempsAdventNadalComu: '',
      tempsAdventSetmanes: '',
      tempsAdventSetmanesDium: '',
      tempsAdventFeries: '',
      tempsNadalOctava: '',
      tempsNadalAbansEpifania: '',
      tempsSolemnitatsFestes: '',
      salteriComuEspPasqua: '',
      diversos: '',
    }

    this.count = 25; //number of queryies

    {props.weekDay === 0 ? weekDayNormal = 7 : weekDayNormal = props.weekDay}

    {props.weekDay === 6 ? weekDayNormalVESPRES = 1 : weekDayNormalVESPRES = props.weekDay + 2}

    acceso = new DBAdapter();

    console.log("2nes vespres. dia: " + props.monthDay + " cicle: " + props.cicle + " LT: " + props.LT);

    id = (props.cicle-1)*7 + weekDayNormalVESPRES;
    acceso.getLiturgia("salteriComuVespres", id, (result) => { this.queryRows.salteriComuVespres = result; this.dataReceived(); });

    id = props.setmana;
    acceso.getLiturgia("tempsOrdinariOracions", id, (result) => { this.queryRows.tempsOrdinariOracions = result; this.dataReceived(); });

    id = 1;
    acceso.getLiturgia("tempsQuaresmaComuFV", id, (result) => { this.queryRows.tempsQuaresmaComuFV = result; this.dataReceived(); });

    id = props.weekDay-2; //dimecres = 1, dijous = 2, ...
    acceso.getLiturgia("tempsQuaresmaCendra", id, (result) => { this.queryRows.tempsQuaresmaCendra = result; this.dataReceived(); });

    id = (props.setmana-1)*7 + (props.weekDay+1);
    acceso.getLiturgia("tempsQuaresmaVSetmanes", id, (result) => { this.queryRows.tempsQuaresmaVSetmanes = result; this.dataReceived(); });

    id = props.setmana;
    acceso.getLiturgia("tempsQuaresmaVSetmanesDium", id, (result) => { this.queryRows.tempsQuaresmaVSetmanesDium = result; this.dataReceived(); });

    id = 1;
    acceso.getLiturgia("tempsQuaresmaComuSS", id, (result) => { this.queryRows.tempsQuaresmaComuSS = result; this.dataReceived(); });

    id = 1;
    acceso.getLiturgia("tempsQuaresmaRams", id, (result) => { this.queryRows.tempsQuaresmaRams = result; this.dataReceived(); });

    id = props.weekDay; //dilluns = 1, dimarts = 2, dimecres = 3 i dijous = 4
    acceso.getLiturgia("tempsQuaresmaSetSanta", id, (result) => { this.queryRows.tempsQuaresmaSetSanta = result; this.dataReceived(); });

    id = props.weekDay-3; //dijous = 1, divendres = 2 i dissabte = 3
    acceso.getLiturgia("tempsQuaresmaTridu", id, (result) => { this.queryRows.tempsQuaresmaTridu = result; this.dataReceived(); });

    id = 1;
    acceso.getLiturgia("tempsQuaresmaDiumPasq", id, (result) => { this.queryRows.tempsQuaresmaDiumPasq = result; this.dataReceived(); });

    id = 1;
    acceso.getLiturgia("tempsPasquaAA", id, (result) => { this.queryRows.tempsPasquaAA = result; this.dataReceived(); });

    id = weekDayNormal;
    acceso.getLiturgia("tempsPasquaOct", id, (result) => { this.queryRows.tempsPasquaOct = result; this.dataReceived(); });

    id = 1;
    acceso.getLiturgia("tempsPasquaDA", id, (result) => { this.queryRows.tempsPasquaDA = result; this.dataReceived(); });

    id = (props.setmana-2)*7 + weekDayNormal;
    acceso.getLiturgia("tempsPasquaSetmanes", id, (result) => { this.queryRows.tempsPasquaSetmanes = result; this.dataReceived(); });

    id = props.setmana;
    acceso.getLiturgia("tempsPasquaSetmanesDium", id, (result) => { this.queryRows.tempsPasquaSetmanesDium = result; this.dataReceived(); });

    switch (this.props.LT) {
      case A_SETMANES:
        id = 1;
      break;
      case A_FERIES:
        id = 2;
      break;
      case N_OCTAVA:
        id = 3;
      break;
      case N_ABANS:
        if(props.monthDay <= 7){ id = 3; }
        else{ id = 4; }
      break;
      default: id = 1;
    }
    acceso.getLiturgia("tempsAdventNadalComu", id, (result) => { this.queryRows.tempsAdventNadalComu = result; this.dataReceived(); });

    //Week begins with saturday
    {props.weekDay === 6 ? auxDay = 1 : auxDay = props.weekDay + 2}
    id = (props.cicle-1)*7 + auxDay;
    acceso.getLiturgia("tempsAdventSetmanes", id, (result) => { this.queryRows.tempsAdventSetmanes = result; this.dataReceived(); });

    id = props.cicle;
    acceso.getLiturgia("tempsAdventSetmanesDium", id, (result) => { this.queryRows.tempsAdventSetmanesDium = result; this.dataReceived(); });

    id = props.monthDay-16;
    acceso.getLiturgia("tempsAdventFeries", id, (result) => { this.queryRows.tempsAdventFeries = result; this.dataReceived(); });

    id = props.monthDay-25;
    acceso.getLiturgia("tempsNadalOctava", id, (result) => { this.queryRows.tempsNadalOctava = result; this.dataReceived(); });

    {props.monthDay < 6 ? id = props.monthDay-1 : id = props.monthDay-2}
    acceso.getLiturgia("tempsNadalAbansEpifania", id, (result) => { this.queryRows.tempsNadalAbansEpifania = result; this.dataReceived(); });

    id = 1; //En Vespres només necessito Nadal (1) per N_OCTAVA
    acceso.getLiturgia("tempsSolemnitatsFestes", id, (result) => { this.queryRows.tempsSolemnitatsFestes = result; this.dataReceived(); });

    id = (props.cicle-1)*6 + (props.weekDay);
    acceso.getLiturgia("salteriComuEspPasqua", id, (result) => { this.queryRows.salteriComuEspPasqua = result; this.dataReceived(); });

    id = -1;
    acceso.getLiturgia("diversos", id, (result) => { this.queryRows.diversos = result; this.dataReceived(); });
  }

  dataReceived(){
    this.count -= 1;

    if(this.count === 0){
      nit = false; //TODO: HC
      this.setState({
        nit: nit,
        salteriComuVespres: this.queryRows.salteriComuVespres,
        tempsOrdinariOracions: this.queryRows.tempsOrdinariOracions,
        tempsQuaresmaComuFV: this.queryRows.tempsQuaresmaComuFV,
        tempsQuaresmaCendra: this.queryRows.tempsQuaresmaCendra,
        tempsQuaresmaVSetmanes: this.queryRows.tempsQuaresmaVSetmanes,
        tempsQuaresmaVSetmanesDium: this.queryRows.tempsQuaresmaVSetmanesDium,
        tempsQuaresmaComuSS: this.queryRows.tempsQuaresmaComuSS,
        tempsQuaresmaRams: this.queryRows.tempsQuaresmaRams,
        tempsQuaresmaSetSanta: this.queryRows.tempsQuaresmaSetSanta,
        tempsQuaresmaTridu: this.queryRows.tempsQuaresmaTridu,
        tempsQuaresmaDiumPasq: this.queryRows.tempsQuaresmaDiumPasq,
        tempsPasquaAA: this.queryRows.tempsPasquaAA,
        tempsPasquaOct: this.queryRows.tempsPasquaOct,
        tempsPasquaDA: this.queryRows.tempsPasquaDA,
        tempsPasquaSetmanes: this.queryRows.tempsPasquaSetmanes,
        tempsPasquaSetmanesDium: this.queryRows.tempsPasquaSetmanesDium,
        tempsAdventNadalComu: this.queryRows.tempsAdventNadalComu,
        tempsAdventSetmanes: this.queryRows.tempsAdventSetmanes,
        tempsAdventSetmanesDium: this.queryRows.tempsAdventSetmanesDium,
        tempsAdventFeries: this.queryRows.tempsAdventFeries,
        tempsNadalOctava: this.queryRows.tempsNadalOctava,
        tempsNadalAbansEpifania: this.queryRows.tempsNadalAbansEpifania,
        tempsSolemnitatsFestes: this.queryRows.tempsSolemnitatsFestes,
        salteriComuEspPasqua: this.queryRows.salteriComuEspPasqua,
        magnificat: this.queryRows.diversos.item(5).oracio,
      });
    }
  }

  render() {
    const gloriaString = "Glòria al Pare i al Fill i a l'Esperit Sant. Com era al principi, ara i sempre i pels segles dels segles. Amén.";
    return (
      <View>
        <Text style={styles.red}>V.
          <Text style={styles.black}> Sigueu amb nosaltres, Déu nostre.</Text>
        </Text>
        <Text style={styles.red}>R.
          <Text style={styles.black}> Senyor, veniu a ajudar-nos.</Text>
        </Text>
        <Text />
        <Text style={styles.black}>{gloriaString}
        {this.props.LT !== Q_CENDRA && this.props.LT !== Q_SETMANES && this.props.LT !== Q_DIUM_RAMS && this.props.LT !== Q_SET_SANTA && this.props.LT !== Q_TRIDU ? //TODO: tenir en compte si és o no Quaresma
          <Text style={styles.black}> Al·leluia</Text> : null
        }
        </Text>
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>HIMNE</Text>
        <Text />
        {this.himne(this.props.LT, this.props.weekDay, this.state.nit, this.props.setmana)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>SALMÒDIA</Text>
        <Text />
        {this.salmodia(this.props.LT, this.props.setmana, this.props.weekDay)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>LECTURA BREU</Text>
        <Text />
        {this.lecturaBreu(this.props.LT)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>RESPONSORI BREU</Text>
        <Text />
        {this.responsori(this.props.LT, this.props.weekDay)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>CÀNTIC DE MARIA</Text>
        <Text />
        {this.cantic(this.props.LT, this.props.weekDay, this.props.ABC)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>PREGÀRIES</Text>
        <Text />
        {this.pregaries(this.props.LT, this.props.weekDay)}
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
          <Text style={styles.black}> Que el Senyor ens beneeixi i ens guardi de tot mal, i ens dugui a la vida eterna.</Text>
        </Text>
        <Text style={styles.red}>R.
          <Text style={styles.black}> Amén.</Text>
        </Text>
        <Text />
      </View>
    );
  }

  gloria(g){
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

  himne(LT, weekDay, nit, setmana){
    switch(LT){
      case O_ORDINARI:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          himne = this.state.salteriComuVespres.himneLlati;
        }
        else{
          himne = this.state.salteriComuVespres.himneCat;
        }
        break;
      case Q_CENDRA:
      case Q_SETMANES:
        if(weekDay===0 || weekDay===6){ //vespres de diumenge
          if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
            himne = this.state.tempsQuaresmaComuFV.himneVespresLlatiDom;
          }
          else{
            himne = this.state.tempsQuaresmaComuFV.himneVespresCatDom;
          }
        }
        else{//ferial
          if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
            himne = this.state.tempsQuaresmaComuFV.himneVespresLlatiFer;
          }
          else{
            himne = this.state.tempsQuaresmaComuFV.himneVespresCatFer;
          }
        }
        break;
      case Q_DIUM_RAMS:
      case Q_SET_SANTA:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          himne = this.state.tempsQuaresmaComuSS.himneVespresLlati;
        }
        else{
          himne = this.state.tempsQuaresmaComuSS.himneVespresCat;
        }
        break;
      case Q_TRIDU:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          himne = this.state.tempsQuaresmaTridu.himneDSOVespresllati;
        }
        else{
          himne = this.state.tempsQuaresmaTridu.himneDSOVespresCat;
        }
        break;
      case P_OCTAVA:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          himne = this.state.tempsPasquaAA.himneVespresLlati1;
        }
        else{
          himne = this.state.tempsPasquaAA.himneVespresCat1;
        }
        break;
      case P_SETMANES:
        if(setmana === 7){
          if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
            himne = this.state.tempsPasquaDA.himneVespresLlati;
          }
          else{
            himne = this.state.tempsPasquaDA.himneVespresCat;
          }
        }
        else{
          if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
            himne = this.state.tempsPasquaAA.himneVespresLlati2;
          }
          else{
            himne = this.state.tempsPasquaAA.himneVespresCat2;
          }
        }
        break;
      case A_SETMANES:
      case A_FERIES:
      case N_ABANS:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          himne = this.state.tempsAdventNadalComu.himneVespresLlati;
        }
        else{
          himne = this.state.tempsAdventNadalComu.himneVespresCat;
        }
        break;
      case N_OCTAVA:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          himne = this.state.tempsSolemnitatsFestes.himneVespres2Llati;
        }
        else{
          himne = this.state.tempsSolemnitatsFestes.himneVespres2Cat;
        }
        break;
    }

    return(<Text style={styles.black}>{himne}</Text>);
  }

  salmodia(LT, setmana, weekDay){
    switch(LT){
      case O_ORDINARI:
      case Q_CENDRA:
      case A_FERIES:
      case N_ABANS:
        ant1 = this.state.salteriComuVespres.ant1;
        titol1 = this.state.salteriComuVespres.titol1;
        com1 = this.state.salteriComuVespres.com1;
        salm1 = this.state.salteriComuVespres.salm1;
        gloria1 = this.state.salteriComuVespres.gloria1;
        ant2 = this.state.salteriComuVespres.ant2;
        titol2 = this.state.salteriComuVespres.titol2;
        com2 = this.state.salteriComuVespres.com2;
        salm2 = this.state.salteriComuVespres.salm2;
        gloria2 = this.state.salteriComuVespres.gloria2;
        ant3 = this.state.salteriComuVespres.ant3;
        titol3 = this.state.salteriComuVespres.titol3;
        com3 = this.state.salteriComuVespres.com3;
        salm3 = this.state.salteriComuVespres.salm3;
        gloria3 = this.state.salteriComuVespres.gloria3;
        break;
        case Q_SETMANES:
          ant1 = this.state.salteriComuVespres.ant1;
          titol1 = this.state.salteriComuVespres.titol1;
          com1 = this.state.salteriComuVespres.com1;
          salm1 = this.state.salteriComuVespres.salm1;
          gloria1 = this.state.salteriComuVespres.gloria1;
          ant2 = this.state.salteriComuVespres.ant2;
          titol2 = this.state.salteriComuVespres.titol2;
          com2 = this.state.salteriComuVespres.com2;
          salm2 = this.state.salteriComuVespres.salm2;
          gloria2 = this.state.salteriComuVespres.gloria2;
          ant3 = this.state.salteriComuVespres.ant3;
          titol3 = this.state.salteriComuVespres.titol3;
          com3 = this.state.salteriComuVespres.com3;
          salm3 = this.state.salteriComuVespres.salm3;
          gloria3 = this.state.salteriComuVespres.gloria3;
          if(weekDay === 6){ //primeres vespres de diumenge
            ant1 = this.state.tempsQuaresmaVSetmanesDium.ant1Vespres1;
            ant2 = this.state.tempsQuaresmaVSetmanesDium.ant2Vespres1;
            ant3 = this.state.tempsQuaresmaVSetmanesDium.ant3Vespres1;
          }
          else if(weekDay === 0){ //segones vespres de diumenge
            ant1 = this.state.tempsQuaresmaVSetmanesDium.ant1Vespres2;
            ant2 = this.state.tempsQuaresmaVSetmanesDium.ant2Vespres2;
            ant3 = this.state.tempsQuaresmaVSetmanesDium.ant3Vespres2;
          }
          break;
      case Q_DIUM_RAMS:
        ant1 = this.state.salteriComuVespres.ant1;
        titol1 = this.state.salteriComuVespres.titol1;
        com1 = this.state.salteriComuVespres.com1;
        salm1 = this.state.salteriComuVespres.salm1;
        gloria1 = this.state.salteriComuVespres.gloria1;
        ant2 = this.state.salteriComuVespres.ant2;
        titol2 = this.state.salteriComuVespres.titol2;
        com2 = this.state.salteriComuVespres.com2;
        salm2 = this.state.salteriComuVespres.salm2;
        gloria2 = this.state.salteriComuVespres.gloria2;
        ant3 = this.state.salteriComuVespres.ant3;
        titol3 = this.state.salteriComuVespres.titol3;
        com3 = this.state.salteriComuVespres.com3;
        salm3 = this.state.salteriComuVespres.salm3;
        gloria3 = this.state.salteriComuVespres.gloria3;
        if(weekDay === 6){ //primeres vespres de diumenge
          ant1 = this.state.tempsQuaresmaRams.ant1Vespres1;
          ant2 = this.state.tempsQuaresmaRams.ant2Vespres1;
          ant3 = this.state.tempsQuaresmaRams.ant3Vespres1;
        }
        else if(weekDay === 0){ //segones vespres de diumenge
          ant1 = this.state.tempsQuaresmaRams.ant1Vespres2;
          ant2 = this.state.tempsQuaresmaRams.ant2Vespres2;
          ant3 = this.state.tempsQuaresmaRams.ant3Vespres2;
        }
        break;
      case Q_SET_SANTA:
        ant1 = this.state.salteriComuVespres.ant1;
        titol1 = this.state.salteriComuVespres.titol1;
        com1 = this.state.salteriComuVespres.com1;
        salm1 = this.state.salteriComuVespres.salm1;
        gloria1 = this.state.salteriComuVespres.gloria1;
        ant2 = this.state.salteriComuVespres.ant2;
        titol2 = this.state.salteriComuVespres.titol2;
        com2 = this.state.salteriComuVespres.com2;
        salm2 = this.state.salteriComuVespres.salm2;
        gloria2 = this.state.salteriComuVespres.gloria2;
        ant3 = this.state.salteriComuVespres.ant3;
        titol3 = this.state.salteriComuVespres.titol3;
        com3 = this.state.salteriComuVespres.com3;
        salm3 = this.state.salteriComuVespres.salm3;
        gloria3 = this.state.salteriComuVespres.gloria3;

        ant1 = this.state.tempsQuaresmaSetSanta.ant1Vespres;
        ant2 = this.state.tempsQuaresmaSetSanta.ant2Vespres;
        ant3 = this.state.tempsQuaresmaSetSanta.ant3Vespres;

      break;
      case Q_TRIDU:
        ant1 = this.state.tempsQuaresmaTridu.ant1Vespres;
        titol1 = this.state.tempsQuaresmaTridu.titol1Vespres;
        com1 = "-";
        salm1 = this.state.tempsQuaresmaTridu.salm1Vespres;
        gloria1 = this.state.tempsQuaresmaTridu.gloriaVespres1;
        ant2 = this.state.tempsQuaresmaTridu.ant2Vespres;
        titol2 = this.state.tempsQuaresmaTridu.titol2Vespres;
        com2 = "-";
        salm2 = this.state.tempsQuaresmaTridu.salm2Vespres;
        gloria2 = this.state.tempsQuaresmaTridu.gloriaVespres2;
        ant3 = this.state.tempsQuaresmaTridu.ant3Vespres;
        titol3 = this.state.tempsQuaresmaTridu.titol3Vespres;
        com3 = "-";
        salm3 = this.state.tempsQuaresmaTridu.salm3Vespres;
        gloria3 = this.state.tempsQuaresmaTridu.gloriaVespres3;
        break;
      case P_OCTAVA:
        ant1 = this.state.tempsQuaresmaDiumPasq.ant1Vespres;
        titol1 = this.state.tempsQuaresmaDiumPasq.titol1Vespres;
        com1 = "-";
        salm1 = this.state.tempsQuaresmaDiumPasq.text1Vespres;
        gloria1 = this.state.tempsQuaresmaDiumPasq.gloria1Vespres;
        ant2 = this.state.tempsQuaresmaDiumPasq.ant2Vespres;
        titol2 = this.state.tempsQuaresmaDiumPasq.titol2Vespres;
        com2 = "-";
        salm2 = this.state.tempsQuaresmaDiumPasq.text2Vespres;
        gloria2 = this.state.tempsQuaresmaDiumPasq.gloria2Vespres;
        ant3 = this.state.tempsQuaresmaDiumPasq.ant3Vespres;
        titol3 = this.state.tempsQuaresmaDiumPasq.titol3Vespres;
        com3 = "-";
        salm3 = this.state.tempsQuaresmaDiumPasq.text3Vespres;
        gloria3 = this.state.tempsQuaresmaDiumPasq.gloria3Vespres;
        break;
      case P_SETMANES:
        titol1 = this.state.salteriComuVespres.titol1;
        com1 = this.state.salteriComuVespres.com1;
        salm1 = this.state.salteriComuVespres.salm1;
        gloria1 = this.state.salteriComuVespres.gloria1;
        titol2 = this.state.salteriComuVespres.titol2;
        com2 = this.state.salteriComuVespres.com2;
        salm2 = this.state.salteriComuVespres.salm2;
        gloria2 = this.state.salteriComuVespres.gloria2;
        titol3 = this.state.salteriComuVespres.titol3;
        com3 = this.state.salteriComuVespres.com3;
        salm3 = this.state.salteriComuVespres.salm3;
        gloria3 = this.state.salteriComuVespres.gloria3;

        if(weekDay === 6){ //primeres vespres de diumenge
          ant1 = this.state.tempsPasquaSetmanesDium.ant1Vespres1;
          ant2 = this.state.tempsPasquaSetmanesDium.ant2Vespres1;
          ant3 = this.state.tempsPasquaSetmanesDium.ant3Vespres1;
        }
        else if(weekDay === 0){ //segones vespres de diumenge
          ant1 = this.state.tempsPasquaSetmanesDium.ant1Vespres2;
          ant2 = this.state.tempsPasquaSetmanesDium.ant2Vespres2;
          ant3 = this.state.tempsPasquaSetmanesDium.ant3Vespres2;
        }
        else{ //feria, normal
          ant1 = this.state.salteriComuEspPasqua.ant1Vespres;
          ant2 = this.state.salteriComuEspPasqua.ant2Vespres;
          ant3 = this.state.salteriComuEspPasqua.ant3Vespres;
        }
        break;
      case A_SETMANES:
        ant1 = this.state.salteriComuVespres.ant1;
        titol1 = this.state.salteriComuVespres.titol1;
        com1 = this.state.salteriComuVespres.com1;
        salm1 = this.state.salteriComuVespres.salm1;
        gloria1 = this.state.salteriComuVespres.gloria1;
        ant2 = this.state.salteriComuVespres.ant2;
        titol2 = this.state.salteriComuVespres.titol2;
        com2 = this.state.salteriComuVespres.com2;
        salm2 = this.state.salteriComuVespres.salm2;
        gloria2 = this.state.salteriComuVespres.gloria2;
        ant3 = this.state.salteriComuVespres.ant3;
        titol3 = this.state.salteriComuVespres.titol3;
        com3 = this.state.salteriComuVespres.com3;
        salm3 = this.state.salteriComuVespres.salm3;
        gloria3 = this.state.salteriComuVespres.gloria3;
        if(weekDay === 6){ //primeres vespres de diumenge
          ant1 = this.state.tempsAdventSetmanesDium.ant1Vespres;
          ant2 = this.state.tempsAdventSetmanesDium.ant2Vespres;
          ant3 = this.state.tempsAdventSetmanesDium.ant3Vespres;
        }
        else if(weekDay === 0){ //segones vespres de diumenge
          ant1 = this.state.tempsAdventSetmanesDium.ant1Vespres2;
          ant2 = this.state.tempsAdventSetmanesDium.ant2Vespres2;
          ant3 = this.state.tempsAdventSetmanesDium.ant3Vespres2;
        }
        break;
      case N_OCTAVA:
        ant1 = this.state.tempsSolemnitatsFestes.ant1Vespres2;
        titol1 = this.state.tempsSolemnitatsFestes.titol1Vespres2;
        com1 = this.state.tempsSolemnitatsFestes.cita1Vespres2;
        salm1 = this.state.tempsSolemnitatsFestes.text1Vespres2;
        gloria1 = "1";
        ant2 = this.state.tempsSolemnitatsFestes.ant2Vespres2;
        titol2 = this.state.tempsSolemnitatsFestes.titol2Vespres2;
        com2 = this.state.tempsSolemnitatsFestes.cita2Vespres2;
        salm2 = this.state.tempsSolemnitatsFestes.text2Vespres2;
        gloria2 = "1";
        ant3 = this.state.tempsSolemnitatsFestes.ant3Vespres2;
        titol3 = this.state.tempsSolemnitatsFestes.titol3Vespres2;
        com3 = this.state.tempsSolemnitatsFestes.cita3Vespres2;
        salm3 = this.state.tempsSolemnitatsFestes.text3Vespres2;
        gloria3 = "1";
        break;
    }

    return(
      <View>
        <Text style={styles.red}>Ant. 1.
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
        <Text style={styles.red}>Ant. 1.
          <Text style={styles.black}> {ant1}</Text>
        </Text>
        <Text />
        <Text style={styles.red}>Ant. 2.
          <Text style={styles.black}> {ant2}</Text>
        </Text>
        <Text />
        <Text style={styles.redCenter}>{titol2}</Text>
        <Text />
        {com2 !== '-' ?
          <View><Text style={styles.blackSmallItalicRight}>{com2}</Text><Text /></View> : null}
        <Text style={styles.black}>{salm2}</Text>
        <Text />
        {this.gloria(gloria2)}
        <Text />
        <Text style={styles.red}>Ant. 2.
          <Text style={styles.black}> {ant2}</Text>
        </Text>
        <Text />
        <Text style={styles.red}>Ant. 3.
          <Text style={styles.black}> {ant3}</Text>
        </Text>
        <Text />
        <Text style={styles.redCenter}>{titol3}</Text>
        <Text />
        {com3 !== '-' ?
          <View><Text style={styles.blackSmallItalicRight}>{com3}</Text><Text /></View> : null}
        <Text style={styles.black}>{salm3}</Text>
        <Text />
        {this.gloria(gloria3)}
        <Text />
        <Text style={styles.red}>Ant. 3.
          <Text style={styles.black}> {ant3}</Text>
        </Text>
      </View>
    );
  }

  lecturaBreu(LT, weekDay){
    switch(LT){
      case O_ORDINARI:
        vers = this.state.salteriComuVespres.versetLB;
        lecturaBreu = this.state.salteriComuVespres.lecturaBreu;
        break;
      case Q_CENDRA:
        vers = this.state.tempsQuaresmaCendra.citaLBVespres;
        lecturaBreu = this.state.tempsQuaresmaCendra.lecturaBreuVespres;
        break;
      case Q_SETMANES:
        vers = this.state.tempsQuaresmaVSetmanes.citaLBVespres;
        lecturaBreu = this.state.tempsQuaresmaVSetmanes.lecturaBreuVespres;
        break;
      case Q_DIUM_RAMS:
        if(weekDay === 6){ //Primeres vespres
          vers = this.state.tempsQuaresmaRams.citaLBVespres;
          lecturaBreu = this.state.tempsQuaresmaRams.lecturaBreuVespres;
        }
        else{ //Segones vespres
          vers = this.state.tempsQuaresmaRams.citaLBVespres2;
          lecturaBreu = this.state.tempsQuaresmaRams.lecturaBreuVespres2;
        }
        break;
      case Q_SET_SANTA:
        vers = this.state.tempsQuaresmaSetSanta.citaLBVespres;
        lecturaBreu = this.state.tempsQuaresmaSetSanta.lecturaBreuVespres;
        break;
      case Q_TRIDU:
        vers = this.state.tempsQuaresmaTridu.citaLBVespres;
        lecturaBreu = this.state.tempsQuaresmaTridu.lecturaBreuVespres;
        break;
      case P_OCTAVA:
        vers = this.state.tempsPasquaOct.citaLBVespres;
        lecturaBreu = this.state.tempsPasquaOct.lecturaBreuVespres;
        break;
      case P_SETMANES:
        vers = this.state.tempsPasquaSetmanes.citaLBVespres;
        lecturaBreu = this.state.tempsPasquaSetmanes.lecturaBreuVespres;
        break;
      case A_SETMANES:
        vers = this.state.tempsAdventSetmanes.citaLBVespres;
        lecturaBreu = this.state.tempsAdventSetmanes.lecturaBreuVespres;
        break;
      case A_FERIES:
        vers = this.state.tempsAdventFeries.citaLBVespres;
        lecturaBreu = this.state.tempsAdventFeries.lecturaBreuVespres;
        break;
      case N_OCTAVA:
        vers = this.state.tempsNadalOctava.citaLBVespres;
        lecturaBreu = this.state.tempsNadalOctava.lecturaBreuVespres;
        break;
      case N_ABANS:
        vers = this.state.tempsNadalAbansEpifania.citaLBVespres;
        lecturaBreu = this.state.tempsNadalAbansEpifania.lecturaBreuVespres;
        break;
    }
    return(
      <View>
        <Text style={styles.red}>{vers}</Text>
        <Text />
        <Text style={styles.black}>{lecturaBreu}</Text>
      </View>
    )
  }

  responsori(LT, weekDay){
    switch(LT){
      case O_ORDINARI:
        respBreu1 = this.state.salteriComuVespres.respBreu1
        respBreu2 = this.state.salteriComuVespres.respBreu2
        respBreu3 = this.state.salteriComuVespres.respBreu3
        break;
      case Q_CENDRA:
        respBreu1 = this.state.tempsQuaresmaCendra.respBreuVespres1
        respBreu2 = this.state.tempsQuaresmaCendra.respBreuVespres2
        respBreu3 = this.state.tempsQuaresmaCendra.respBreuVespres3
        break;
      case Q_SETMANES:
        respBreu1 = this.state.tempsQuaresmaVSetmanes.respBreuVespres1
        respBreu2 = this.state.tempsQuaresmaVSetmanes.respBreuVespres2
        respBreu3 = this.state.tempsQuaresmaVSetmanes.respBreuVespres3
        break;
      case Q_DIUM_RAMS:
        if(weekDay === 6){ //Primeres vespres
          respBreu1 = this.state.tempsQuaresmaRams.respBreuVespres1
          respBreu2 = this.state.tempsQuaresmaRams.respBreuVespres2
          respBreu3 = this.state.tempsQuaresmaRams.respBreuVespres3
        }
        else{ //Segones vespres
          respBreu1 = this.state.tempsQuaresmaRams.respBreuVespres12
          respBreu2 = this.state.tempsQuaresmaRams.respBreuVespres22
          respBreu3 = this.state.tempsQuaresmaRams.respBreuVespres32
        }
        break;
      case Q_SET_SANTA:
        respBreu1 = this.state.tempsQuaresmaSetSanta.respBreuVespres1
        respBreu2 = this.state.tempsQuaresmaSetSanta.respBreuVespres2
        respBreu3 = this.state.tempsQuaresmaSetSanta.respBreuVespres3
        break;
      case P_SETMANES:
        respBreu1 = this.state.tempsPasquaSetmanes.respBreuVespres1
        respBreu2 = this.state.tempsPasquaSetmanes.respBreuVespres2
        respBreu3 = this.state.tempsPasquaSetmanes.respBreuVespres3
        break;
      case A_SETMANES:
        respBreu1 = this.state.tempsAdventSetmanes.respBreuVespres1
        respBreu2 = this.state.tempsAdventSetmanes.respBreuVespres2
        respBreu3 = this.state.tempsAdventSetmanes.respBreuVespres3
        break;
      case A_FERIES:
        respBreu1 = this.state.tempsAdventFeries.respBreuVespres1
        respBreu2 = this.state.tempsAdventFeries.respBreuVespres2
        respBreu3 = this.state.tempsAdventFeries.respBreuVespres3
        break;
      case N_OCTAVA:
        respBreu1 = this.state.tempsNadalOctava.respBreuVespres1Part1
        respBreu2 = this.state.tempsNadalOctava.respBreuVespres1Part2
        respBreu3 = this.state.tempsNadalOctava.respBreuVespres1Part3
        break;
      case N_ABANS:
        respBreu1 = this.state.tempsNadalAbansEpifania.respBreuVespres1
        respBreu2 = this.state.tempsNadalAbansEpifania.respBreuVespres2
        respBreu3 = this.state.tempsNadalAbansEpifania.respBreuVespres3
        break;
    }
    if(LT === Q_TRIDU){
      return(
        <View>
          <Text style={styles.red}>Ant.
            <Text style={styles.black}> {this.state.tempsQuaresmaTridu.antifonaEspecialVespres}</Text>
          </Text>
        </View>
      )
    }
    else if(LT === P_OCTAVA){
      return(
        <View>
          <Text style={styles.red}>Ant.
            <Text style={styles.black}> {this.state.tempsPasquaOct.antEspecialVespres}</Text>
          </Text>
        </View>
      )
    }
    else{
      return(
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
      )
    }
  }

  cantic(LT, weekDay, litYear){
    switch(LT){
      case O_ORDINARI:
        if(weekDay !== 0 && weekDay !== 6){ ///no vespres de diumenge
          antCantic = this.state.salteriComuVespres.antEvangelic;
        }
        else{ //1res i 2nes de diumenge
          if(weekDay === 6){ //dissabte, 1res Vespres
            switch (litYear) {
              case 'A':
                antCantic = this.state.tempsOrdinariOracions.antMaria1A;
                break;
              case 'B':
                antCantic = this.state.tempsOrdinariOracions.antMaria1B;
                break;
              case 'C':
                antCantic = this.state.tempsOrdinariOracions.antMaria1C;
                break;
            }
          }
          else{ //diumnge, 2nes Vespres
            switch (litYear) {
              case 'A':
                antCantic = this.state.tempsOrdinariOracions.antMaria2A;
                break;
              case 'B':
                antCantic = this.state.tempsOrdinariOracions.antMaria2B;
                break;
              case 'C':
                antCantic = this.state.tempsOrdinariOracions.antMaria2C;
                break;
            }
          }
        }
        break;
      case Q_CENDRA:
        antCantic = this.state.tempsQuaresmaCendra.antMaria;
        break;
      case Q_SETMANES:
        if(weekDay !== 0 && weekDay !== 6){ ///no vespres de diumenge
          antCantic = this.state.salteriComuVespres.antEvangelic;
        }
        else{ //1res i 2nes de diumenge
          if(weekDay === 6){ //dissabte, 1res Vespres
            switch (litYear) {
              case 'A':
                antCantic = this.state.tempsQuaresmaVSetmanesDium.antMaria1A;
                break;
              case 'B':
                antCantic = this.state.tempsQuaresmaVSetmanesDium.antMaria1B;
                break;
              case 'C':
                antCantic = this.state.tempsQuaresmaVSetmanesDium.antMaria1C;
                break;
            }
          }
          else{ //diumnge, 2nes Vespres
            switch (litYear) {
              case 'A':
                antCantic = this.state.tempsQuaresmaVSetmanesDium.antMaria2A;
                break;
              case 'B':
                antCantic = this.state.tempsQuaresmaVSetmanesDium.antMaria2B;
                break;
              case 'C':
                antCantic = this.state.tempsQuaresmaVSetmanesDium.antMaria2C;
                break;
            }
          }
        }
        break;
      case Q_DIUM_RAMS:
        if(weekDay === 6){ //dissabte, 1res Vespres
          switch (litYear) {
            case 'A':
              antCantic = this.state.tempsQuaresmaRams.antMaria1A;
              break;
            case 'B':
              antCantic = this.state.tempsQuaresmaRams.antMaria1B;
              break;
            case 'C':
              antCantic = this.state.tempsQuaresmaRams.antMaria1C;
              break;
          }
        }
        else{ //diumnge, 2nes Vespres
          switch (litYear) {
            case 'A':
              antCantic = this.state.tempsQuaresmaRams.antMaria1A2;
              break;
            case 'B':
              antCantic = this.state.tempsQuaresmaRams.antMaria1B2;
              break;
            case 'C':
              antCantic = this.state.tempsQuaresmaRams.antMaria1C2;
              break;
          }
        }
        break;
      case Q_SET_SANTA:
          antCantic = this.state.tempsQuaresmaSetSanta.antMaria;
        break;
      case Q_TRIDU:
          antCantic = this.state.tempsQuaresmaTridu.antMaria;
        break;
      case P_OCTAVA:
          antCantic = this.state.tempsPasquaOct.antMaria;
        break;
      case P_SETMANES:
        if(weekDay !== 6 && weekDay !== 0){ ///no vespres de diumenge
          antCantic = this.state.tempsPasquaSetmanes.antMaria;
        }
        else{ //vespres de diumenge
          if(weekDay === 6){ //primeres vespres
            switch (litYear) {
              case 'A':
                antCantic = this.state.tempsPasquaSetmanesDium.antMaria1A;
                break;
              case 'B':
                antCantic = this.state.tempsPasquaSetmanesDium.antMaria1B;
                break;
              case 'C':
                antCantic = this.state.tempsPasquaSetmanesDium.antMaria1C;
                break;
            }
          }
          else{ //segones vespres
            switch (litYear) {
              case 'A':
                antCantic = this.state.tempsPasquaSetmanesDium.antMaria2A;
                break;
              case 'B':
                antCantic = this.state.tempsPasquaSetmanesDium.antMaria2B;
                break;
              case 'C':
                antCantic = this.state.tempsPasquaSetmanesDium.antMaria2C;
                break;
            }
          }
        }
        break;
      case A_SETMANES:
        if(weekDay !== 6 && weekDay !==0){ ///no vespres de diumenge
          antCantic = this.state.tempsAdventSetmanes.antMaria;
        }
        else{ //vespres de diumenge
          if(weekDay === 6){ //primeres vespres
            switch (litYear) {
              case 'A':
                antCantic = this.state.tempsAdventSetmanesDium.antMaria1A;
                break;
              case 'B':
                antCantic = this.state.tempsAdventSetmanesDium.antMaria1B;
                break;
              case 'C':
                antCantic = this.state.tempsAdventSetmanesDium.antMaria1C;
                break;
            }
          }
          else{ //segones vespres
            switch (litYear) {
              case 'A':
                antCantic = this.state.tempsAdventSetmanesDium.antMaria2A;
                break;
              case 'B':
                antCantic = this.state.tempsAdventSetmanesDium.antMaria2B;
                break;
              case 'C':
                antCantic = this.state.tempsAdventSetmanesDium.antMaria2C;
                break;
            }
          }
        }
        break;
      case A_FERIES:
        antCantic = this.state.tempsAdventFeries.antMaria;
        break;
      case N_OCTAVA:
        antCantic = this.state.tempsNadalOctava.antMaria;
        break;
      case N_ABANS:
        antCantic = this.state.tempsNadalAbansEpifania.antMaria;
        break;
    }

    cantic = this.state.magnificat;

    return(
      <View>
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
      </View>
    );
  }

  pregaries(LT, weekDay){
    switch(LT){
      case O_ORDINARI:
        pregaries = this.state.salteriComuVespres.pregaries;
        break;
      case Q_CENDRA:
        pregaries = this.state.tempsQuaresmaCendra.pregariesVespres;
        break;
      case Q_SETMANES:
        pregaries = this.state.tempsQuaresmaVSetmanes.pregariesVespres;
        break;
      case Q_DIUM_RAMS:
          if(weekDay === 6){ //Primeres vespres
            pregaries = this.state.tempsQuaresmaRams.pregariesVespres1;
          }
          else{ //Segones vespres
            pregaries = this.state.tempsQuaresmaRams.pregariesVespres12;
          }
        break;
      case Q_SET_SANTA:
          pregaries = this.state.tempsQuaresmaSetSanta.pregariesVespres;
        break;
      case Q_TRIDU:
          pregaries = this.state.tempsQuaresmaTridu.pregariesVespres;
        break;
      case P_OCTAVA:
          pregaries = this.state.tempsPasquaOct.pregariesVespres;
        break;
      case P_SETMANES:
          pregaries = this.state.tempsPasquaSetmanes.pregariesVespres;
        break;
      case A_SETMANES:
          pregaries = this.state.tempsAdventSetmanes.pregariesVespres;
        break;
      case A_FERIES:
          pregaries = this.state.tempsAdventFeries.pregariesVespres;
        break;
      case N_OCTAVA:
          pregaries = this.state.tempsNadalOctava.pregariesVespres;
        break;
      case N_ABANS:
        pregaries = this.state.tempsNadalAbansEpifania.pregariesVespres;
        break;
    }

    return(
        <Text style={styles.black}> {pregaries}</Text>
    );
  }

  oracio(LT, weekDay){
    switch(LT){
      case O_ORDINARI:
        if(weekDay !== 0 && weekDay !== 6){ ///no vespres de diumenge
          oracio = this.state.salteriComuVespres.oraFi;
        }
        else{ // vespres de 1res o 2nes diumenge
          oracio = this.state.tempsOrdinariOracions.oracio;
        }
        break;
      case Q_CENDRA:
        oracio = this.state.tempsQuaresmaCendra.oraFiVespres;
        break;
      case Q_SETMANES:
        oracio = this.state.tempsQuaresmaVSetmanes.oraFiVespres;
        break;
      case Q_DIUM_RAMS:
        if(weekDay === 6){ //Primeres vespres
          oracio = this.state.tempsQuaresmaRams.oraFiVespres1;
        }
        else{ //Segones vespres
          oracio = this.state.tempsQuaresmaRams.oraFiVespres12;
        }
        break;
      case Q_SET_SANTA:
        oracio = this.state.tempsQuaresmaSetSanta.oraFiVespres;
        break;
      case Q_TRIDU:
        oracio = this.state.tempsQuaresmaTridu.oraFiVespres;
        break;
      case P_OCTAVA:
        oracio = this.state.tempsPasquaOct.oraFiVespres;
        break;
      case P_SETMANES:
        oracio = this.state.tempsPasquaSetmanes.oraFiVespres;
        break;
      case A_SETMANES:
        oracio = this.state.tempsAdventSetmanes.oraFiVespres;
        break;
      case A_FERIES:
        oracio = this.state.tempsAdventFeries.oraFiVespres;
        break;
      case N_OCTAVA:
        oracio = this.state.tempsNadalOctava.oraFiVespres;
        break;
      case N_ABANS:
        oracio = this.state.tempsNadalAbansEpifania.oraFiVespres;
        break;
    }
    return(<Text style={styles.black}>{oracio}</Text>);
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
    fontSize: GLOBAL.normalTextSize,
    fontStyle: 'italic'
  },
  blackSmallItalicRight: {
    color: '#000000',
    fontSize: GLOBAL.normalTextSize,
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
    fontSize: GLOBAL.normalTextSize,
    fontStyle: 'italic',
    textAlign: 'right'
  }
});

AppRegistry.registerComponent('Vespres', () => Vespres);

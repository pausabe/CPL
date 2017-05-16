import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';
import Hr from 'react-native-hr';

const O_ORDINARI = 'O_ORDINARI';
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

export default class Laudes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      nit: null,
      salteriComuLaudes: '',
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
    }

    this.queryRows = {
      salteriComuLaudes: '',
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
    }

    this.count = 23; //number of queryies

    {props.weekDay === 0 ? weekDayNormal = 7 : weekDayNormal = props.weekDay}

    acceso = new DBAdapter();

    id = (props.cicle-1)*7 + (props.weekDay+1);
    acceso.getLiturgia("salteriComuLaudes", id, (result) => { this.queryRows.salteriComuLaudes = result; this.dataReceived(); });

    id = props.ordinariWeek;
    acceso.getLiturgia("tempsOrdinariOracions", id, (result) => { this.queryRows.tempsOrdinariOracions = result; this.dataReceived(); });

    id = 1;
    acceso.getLiturgia("tempsQuaresmaComuFV", id, (result) => { this.queryRows.tempsQuaresmaComuFV = result; this.dataReceived(); });

    id = props.weekDay-2; //dimecres = 1, dijous = 2, ...
    acceso.getLiturgia("tempsQuaresmaCendra", id, (result) => { this.queryRows.tempsQuaresmaCendra = result; this.dataReceived(); });

    id = (props.quaresmaWeek-1)*7 + (props.weekDay+1);
    acceso.getLiturgia("tempsQuaresmaVSetmanes", id, (result) => { this.queryRows.tempsQuaresmaVSetmanes = result; this.dataReceived(); });

    id = props.quaresmaWeek;
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

    id = (props.pasquaWeek-2)*7 + weekDayNormal;
    acceso.getLiturgia("tempsPasquaSetmanes", id, (result) => { this.queryRows.tempsPasquaSetmanes = result; this.dataReceived(); });

    id = props.pasquaWeek;
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

    id = 1; //En Laudes només necessito Nadal (1) per N_OCTAVA
    acceso.getLiturgia("tempsSolemnitatsFestes", id, (result) => { this.queryRows.tempsSolemnitatsFestes = result; this.dataReceived(); });
  }

  dataReceived(){
    this.count -= 1;

    if(this.count === 0){
      nit = false; //TODO: HC
      this.setState({
        nit: nit,
        salteriComuLaudes: this.queryRows.salteriComuLaudes,
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
      });
    }
  }

  render() {
    const gloriaString = "Glòria al Pare i al Fill i a l'Esperit Sant. Com era al principi, ara i sempre i pels segles dels segles. Amén.";
    return (
      <View>
        <Text style={styles.red}>V.
          <Text style={styles.black}> Obriu-me els llavis, Senyor.</Text>
        </Text>
        <Text style={styles.red}>R.
          <Text style={styles.black}> I proclamaré la vostra lloança.</Text>
        </Text>
        <Text />
        <Text style={styles.black}>{gloriaString}
        {false === true ? //TODO: tenir en compte si és o no Quaresma
          <Text style={styles.black}> Al·leluia</Text> : null
        }
        </Text>
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>HIMNE</Text>
        <Text />
        {this.himne(this.props.LT, this.props.weekDay, this.state.nit, this.props.pasquaWeek)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>SALMÒDIA</Text>
        <Text />
        {this.salmodia(this.props.LT, this.props.pasquaWeek, this.props.weekDay)}
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
        {this.responsori(this.props.LT)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>CÀNTIC DE ZACARIES</Text>
        {this.cantic(this.props.LT, this.props.weekDay, this.props.ABC)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>PREGÀRIES</Text>
        {this.pregaries(this.props.LT)}
        <Text />
        <Text style={styles.red}>ORACIÓ</Text>
        <Text />
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

  himne(LT, weekDay, nit, pasquaWeek){
    switch(LT){
      case O_ORDINARI:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          himne = this.state.salteriComuLaudes.himneLlati;
        }
        else{
          himne = this.state.salteriComuLaudes.himneCat;
        }
        break;
      case Q_CENDRA:
      case Q_SETMANES:
        if(weekDay===0){ //diumenge
          if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
            himne = this.state.tempsQuaresmaComuFV.himneLaudesLlatiDom;
          }
          else{
            himne = this.state.tempsQuaresmaComuFV.himneLaudesCatDom;
          }
        }
        else{//ferial
          if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
            himne = this.state.tempsQuaresmaComuFV.himneLaudesLlatiFer;
          }
          else{
            himne = this.state.tempsQuaresmaComuFV.himneLaudesCatFer;
          }
        }
        break;
      case Q_DIUM_RAMS:
      case Q_SET_SANTA:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          himne = this.state.tempsQuaresmaComuSS.himneLaudesLlati;
        }
        else{
          himne = this.state.tempsQuaresmaComuSS.himneLaudesCat;
        }
        break;
      case Q_TRIDU:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          himne = this.state.tempsQuaresmaTridu.himneDSOLaudesllati;
        }
        else{
          himne = this.state.tempsQuaresmaTridu.himneDSOLaudescat;
        }
        break;
      case P_OCTAVA:
        if(true){ //TODO: triar si fórmula 1 o 2, hardcoded
          if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
            himne = this.state.tempsPasquaAA.himneLaudesLlati1;
          }
          else{
            himne = this.state.tempsPasquaAA.himneLaudesCat1;
          }
        }
        else{//fórmula 2
          if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
            himne = this.state.tempsPasquaAA.himneLaudesLlati2;
          }
          else{
            himne = this.state.tempsPasquaAA.himneLaudesCat2;
          }
        }
        break;
      case P_SETMANES:
        if(pasquaWeek === 7){
          if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
            himne = this.state.tempsPasquaDA.himneLaudesLlati;
          }
          else{
            himne = this.state.tempsPasquaDA.himneLaudesCat;
          }
        }
        else{
          if(true){ //TODO: triar si fórmula 1 o 2, hardcoded
            if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
              himne = this.state.tempsPasquaAA.himnelaudesLlati1;
            }
            else{
              himne = this.state.tempsPasquaAA.himneLaudesCat1;
            }
          }
          else{//fórmula 2
            if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
              himne = this.state.tempsPasquaAA.himneLaudesLlati2;
            }
            else{
              himne = this.state.tempsPasquaAA.himneLaudesCat2;
            }
          }
        }
        break;
      case A_SETMANES:
      case A_FERIES:
      case N_ABANS:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          himne = this.state.tempsAdventNadalComu.himneLaudesLlati;
        }
        else{
          himne = this.state.tempsAdventNadalComu.himneLaudesCat;
        }
        break;
      case N_OCTAVA:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          himne = this.state.tempsSolemnitatsFestes.himneLaudesLlati;
        }
        else{
          himne = this.state.tempsSolemnitatsFestes.himneLaudesCat;
        }
        break;
    }

    return(<Text style={styles.black}>{himne}</Text>);
  }

  salmodia(LT, pasquaWeek, weekDay){
    switch(LT){
      case O_ORDINARI:
      case Q_CENDRA:
      case A_FERIES:
      case N_ABANS:
        ant1 = this.state.salteriComuLaudes.ant1;
        titol1 = this.state.salteriComuLaudes.titol1;
        com1 = this.state.salteriComuLaudes.com1;
        salm1 = this.state.salteriComuLaudes.salm1;
        gloria1 = this.state.salteriComuLaudes.gloria1;
        ant2 = this.state.salteriComuLaudes.ant2;
        titol2 = this.state.salteriComuLaudes.titol2;
        com2 = this.state.salteriComuLaudes.com2;
        salm2 = this.state.salteriComuLaudes.salm2;
        gloria2 = this.state.salteriComuLaudes.gloria2;
        ant3 = this.state.salteriComuLaudes.ant3;
        titol3 = this.state.salteriComuLaudes.titol3;
        com3 = this.state.salteriComuLaudes.com3;
        salm3 = this.state.salteriComuLaudes.salm3;
        gloria3 = this.state.salteriComuLaudes.gloria3;
        break;
        case Q_SETMANES:
          ant1 = this.state.salteriComuLaudes.ant1;
          titol1 = this.state.salteriComuLaudes.titol1;
          com1 = this.state.salteriComuLaudes.com1;
          salm1 = this.state.salteriComuLaudes.salm1;
          gloria1 = this.state.salteriComuLaudes.gloria1;
          ant2 = this.state.salteriComuLaudes.ant2;
          titol2 = this.state.salteriComuLaudes.titol2;
          com2 = this.state.salteriComuLaudes.com2;
          salm2 = this.state.salteriComuLaudes.salm2;
          gloria2 = this.state.salteriComuLaudes.gloria2;
          ant3 = this.state.salteriComuLaudes.ant3;
          titol3 = this.state.salteriComuLaudes.titol3;
          com3 = this.state.salteriComuLaudes.com3;
          salm3 = this.state.salteriComuLaudes.salm3;
          gloria3 = this.state.salteriComuLaudes.gloria3;
          if(weekDay === 0){ //diumenge
              ant1 = this.state.tempsQuaresmaVSetmanesDium.ant1Laudes;
              ant2 = this.state.tempsQuaresmaVSetmanesDium.ant2Laudes;
              ant3 = this.state.tempsQuaresmaVSetmanesDium.ant3Laudes;
            }
          break;
      case Q_DIUM_RAMS:
        ant1 = this.state.salteriComuLaudes.ant1;
        titol1 = this.state.salteriComuLaudes.titol1;
        com1 = this.state.salteriComuLaudes.com1;
        salm1 = this.state.salteriComuLaudes.salm1;
        gloria1 = this.state.salteriComuLaudes.gloria1;
        ant2 = this.state.salteriComuLaudes.ant2;
        titol2 = this.state.salteriComuLaudes.titol2;
        com2 = this.state.salteriComuLaudes.com2;
        salm2 = this.state.salteriComuLaudes.salm2;
        gloria2 = this.state.salteriComuLaudes.gloria2;
        ant3 = this.state.salteriComuLaudes.ant3;
        titol3 = this.state.salteriComuLaudes.titol3;
        com3 = this.state.salteriComuLaudes.com3;
        salm3 = this.state.salteriComuLaudes.salm3;
        gloria3 = this.state.salteriComuLaudes.gloria3;
        if(weekDay === 0){ //diumenge
            ant1 = this.state.tempsQuaresmaRams.ant1Laudes;
            ant2 = this.state.tempsQuaresmaRams.ant2Laudes;
            ant3 = this.state.tempsQuaresmaRams.ant3Laudes;
          }
        break;
      case Q_SET_SANTA:
        ant1 = this.state.salteriComuLaudes.ant1;
        titol1 = this.state.salteriComuLaudes.titol1;
        com1 = this.state.salteriComuLaudes.com1;
        salm1 = this.state.salteriComuLaudes.salm1;
        gloria1 = this.state.salteriComuLaudes.gloria1;
        ant2 = this.state.salteriComuLaudes.ant2;
        titol2 = this.state.salteriComuLaudes.titol2;
        com2 = this.state.salteriComuLaudes.com2;
        salm2 = this.state.salteriComuLaudes.salm2;
        gloria2 = this.state.salteriComuLaudes.gloria2;
        ant3 = this.state.salteriComuLaudes.ant3;
        titol3 = this.state.salteriComuLaudes.titol3;
        com3 = this.state.salteriComuLaudes.com3;
        salm3 = this.state.salteriComuLaudes.salm3;
        gloria3 = this.state.salteriComuLaudes.gloria3;

        ant1 = this.state.tempsQuaresmaSetSanta.ant1Laudes;
        ant2 = this.state.tempsQuaresmaSetSanta.ant2Laudes;
        ant3 = this.state.tempsQuaresmaSetSanta.ant3Laudes;

      break;
      case Q_TRIDU:
        ant1 = this.state.tempsQuaresmaTridu.ant1Laudes;
        titol1 = this.state.tempsQuaresmaTridu.titol1Laudes;
        com1 = "-";
        salm1 = this.state.tempsQuaresmaTridu.salm1Laudes;
        gloria1 = this.state.tempsQuaresmaTridu.gloriaLaudes1;
        ant2 = this.state.tempsQuaresmaTridu.ant2Laudes;
        titol2 = this.state.tempsQuaresmaTridu.titol2Laudes;
        com2 = "-";
        salm2 = this.state.tempsQuaresmaTridu.salm2Laudes;
        gloria2 = this.state.tempsQuaresmaTridu.gloriaLaudes2;
        ant3 = this.state.tempsQuaresmaTridu.ant3Laudes;
        titol3 = this.state.tempsQuaresmaTridu.titol3Laudes;
        com3 = "-";
        salm3 = this.state.tempsQuaresmaTridu.salm3Laudes;
        gloria3 = this.state.tempsQuaresmaTridu.gloriaLaudes3;
        break;
      case P_OCTAVA:
        ant1 = this.state.tempsQuaresmaDiumPasq.ant1Laudes;
        titol1 = this.state.tempsQuaresmaDiumPasq.titol1Laudes;
        com1 = "-";
        salm1 = this.state.tempsQuaresmaDiumPasq.text1Laudes;
        gloria1 = this.state.tempsQuaresmaDiumPasq.gloria1Laudes;
        ant2 = this.state.tempsQuaresmaDiumPasq.ant2Laudes;
        titol2 = this.state.tempsQuaresmaDiumPasq.titol2Laudes;
        com2 = "-";
        salm2 = this.state.tempsQuaresmaDiumPasq.text2Laudes;
        gloria2 = this.state.tempsQuaresmaDiumPasq.gloria2Laudes;
        ant3 = this.state.tempsQuaresmaDiumPasq.ant3Laudes;
        titol3 = this.state.tempsQuaresmaDiumPasq.titol3Laudes;
        com3 = "-";
        salm3 = this.state.tempsQuaresmaDiumPasq.text3Laudes;
        gloria3 = this.state.tempsQuaresmaDiumPasq.gloria3Laudes;
        break;
      case P_SETMANES:
        titol1 = this.state.salteriComuLaudes.titol1;
        com1 = this.state.salteriComuLaudes.com1;
        salm1 = this.state.salteriComuLaudes.salm1;
        gloria1 = this.state.salteriComuLaudes.gloria1;
        titol2 = this.state.salteriComuLaudes.titol2;
        com2 = this.state.salteriComuLaudes.com2;
        salm2 = this.state.salteriComuLaudes.salm2;
        gloria2 = this.state.salteriComuLaudes.gloria2;
        titol3 = this.state.salteriComuLaudes.titol3;
        com3 = this.state.salteriComuLaudes.com3;
        salm3 = this.state.salteriComuLaudes.salm3;
        gloria3 = this.state.salteriComuLaudes.gloria3;

        if(weekDay === 0){ //diumenge
          ant1 = this.state.tempsPasquaSetmanesDium.ant1Laudes;
          ant2 = this.state.tempsPasquaSetmanesDium.ant2Laudes;
          ant3 = this.state.tempsPasquaSetmanesDium.ant3Laudes;
        }
        else{
          ant1 = this.state.salteriComuLaudes.ant1;
          ant2 = this.state.salteriComuLaudes.ant2;
          ant3 = this.state.salteriComuLaudes.ant3;
        }
        break;
      case A_SETMANES:
        titol1 = this.state.salteriComuLaudes.titol1;
        com1 = this.state.salteriComuLaudes.com1;
        salm1 = this.state.salteriComuLaudes.salm1;
        gloria1 = this.state.salteriComuLaudes.gloria1;
        titol2 = this.state.salteriComuLaudes.titol2;
        com2 = this.state.salteriComuLaudes.com2;
        salm2 = this.state.salteriComuLaudes.salm2;
        gloria2 = this.state.salteriComuLaudes.gloria2;
        titol3 = this.state.salteriComuLaudes.titol3;
        com3 = this.state.salteriComuLaudes.com3;
        salm3 = this.state.salteriComuLaudes.salm3;
        gloria3 = this.state.salteriComuLaudes.gloria3;

        if(weekDay === 0){ //diumenge
          ant1 = this.state.tempsAdventSetmanesDium.ant1Laudes;
          ant2 = this.state.tempsAdventSetmanesDium.ant2Laudes;
          ant3 = this.state.tempsAdventSetmanesDium.ant3Laudes;
        }
        else{
          ant1 = this.state.salteriComuLaudes.ant1;
          ant2 = this.state.salteriComuLaudes.ant2;
          ant3 = this.state.salteriComuLaudes.ant3;
        }
        break;
      case N_OCTAVA:
        ant1 = this.state.salteriComuLaudes.ant1;
        titol1 = this.state.salteriComuLaudes.titol1;
        com1 = this.state.salteriComuLaudes.com1;
        salm1 = this.state.salteriComuLaudes.salm1;
        gloria1 = this.state.salteriComuLaudes.gloria1;
        ant2 = this.state.salteriComuLaudes.ant2;
        titol2 = this.state.salteriComuLaudes.titol2;
        com2 = this.state.salteriComuLaudes.com2;
        salm2 = this.state.salteriComuLaudes.salm2;
        gloria2 = this.state.salteriComuLaudes.gloria2;
        ant3 = this.state.salteriComuLaudes.ant3;
        titol3 = this.state.salteriComuLaudes.titol3;
        com3 = this.state.salteriComuLaudes.com3;
        salm3 = this.state.salteriComuLaudes.salm3;
        gloria3 = this.state.salteriComuLaudes.gloria3;

        ant1 = this.state.tempsSolemnitatsFestes.ant1Laudes;
        ant2 = this.state.tempsSolemnitatsFestes.ant2Laudes;
        ant3 = this.state.tempsSolemnitatsFestes.ant3Laudes;
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

  lecturaBreu(LT){
    switch(LT){
      case O_ORDINARI:
        vers = this.state.salteriComuLaudes.versetLB;
        lecturaBreu = this.state.salteriComuLaudes.lecturaBreu;
        break;
      case Q_CENDRA:
        vers = this.state.tempsQuaresmaCendra.citaLBLaudes;
        lecturaBreu = this.state.tempsQuaresmaCendra.lecturaBreuLaudes;
        break;
      case Q_SETMANES:
        vers = this.state.tempsQuaresmaVSetmanes.citaLBLaudes;
        lecturaBreu = this.state.tempsQuaresmaVSetmanes.lecturaBreuLaudes;
        break;
      case Q_DIUM_RAMS:
        vers = this.state.tempsQuaresmaRams.citaLBLaudes;
        lecturaBreu = this.state.tempsQuaresmaRams.lecturaBreuLaudes;
        break;
      case Q_SET_SANTA:
        vers = this.state.tempsQuaresmaSetSanta.citaLBLaudes;
        lecturaBreu = this.state.tempsQuaresmaSetSanta.lecturaBreuLaudes;
        break;
      case Q_TRIDU:
        vers = this.state.tempsQuaresmaTridu.citaLBLaudes;
        lecturaBreu = this.state.tempsQuaresmaTridu.lecturaBreuLaudes;
        break;
      case P_OCTAVA:
        vers = this.state.tempsPasquaOct.citaLBLaudes;
        lecturaBreu = this.state.tempsPasquaOct.lecturaBreuLaudes;
        break;
      case P_SETMANES:
        vers = this.state.tempsPasquaSetmanes.citaLBLaudes;
        lecturaBreu = this.state.tempsPasquaSetmanes.lecturaBreuLaudes;
        break;
      case A_SETMANES:
        vers = this.state.tempsAdventSetmanes.citaLBLaudes;
        lecturaBreu = this.state.tempsAdventSetmanes.lecturaBreuLaudes;
        break;
      case A_FERIES:
        vers = this.state.tempsAdventFeries.citaLBLaudes;
        lecturaBreu = this.state.tempsAdventFeries.lecturaBreuLaudes;
        break;
      case N_OCTAVA:
        vers = this.state.tempsNadalOctava.citaLBLaudes;
        lecturaBreu = this.state.tempsNadalOctava.lecturaBreuLaudes;
        break;
      case N_ABANS:
        vers = this.state.tempsNadalAbansEpifania.citaLBLaudes;
        lecturaBreu = this.state.tempsNadalAbansEpifania.lecturaBreuLaudes;
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

  responsori(LT){
    switch(LT){
      case O_ORDINARI:
        respBreu1 = this.state.salteriComuLaudes.respBreu1
        respBreu2 = this.state.salteriComuLaudes.respBreu2
        respBreu3 = this.state.salteriComuLaudes.respBreu3
        break;
      case Q_CENDRA:
        respBreu1 = this.state.tempsQuaresmaCendra.respBreuLaudes1
        respBreu2 = this.state.tempsQuaresmaCendra.respBreuLaudes2
        respBreu3 = this.state.tempsQuaresmaCendra.respBreuLaudes3
        break;
      case Q_SETMANES:
        respBreu1 = this.state.tempsQuaresmaVSetmanes.respBreuLaudes1
        respBreu2 = this.state.tempsQuaresmaVSetmanes.respBreuLaudes2
        respBreu3 = this.state.tempsQuaresmaVSetmanes.respBreuLaudes3
        break;
      case Q_DIUM_RAMS:
        respBreu1 = this.state.tempsQuaresmaRams.respBreu1Laudes
        respBreu2 = this.state.tempsQuaresmaRams.respBreu2Laudes
        respBreu3 = this.state.tempsQuaresmaRams.respBreu3Laudes
        break;
      case Q_SET_SANTA:
        respBreu1 = this.state.tempsQuaresmaSetSanta.respBreu1Laudes
        respBreu2 = this.state.tempsQuaresmaSetSanta.respBreu2Laudes
        respBreu3 = this.state.tempsQuaresmaSetSanta.respBreu3Laudes
        break;
      case P_SETMANES:
        respBreu1 = this.state.tempsPasquaSetmanes.respBreuLaudes1
        respBreu2 = this.state.tempsPasquaSetmanes.respBreuLaudes2
        respBreu3 = this.state.tempsPasquaSetmanes.respBreuLaudes3
        break;
      case A_SETMANES:
        respBreu1 = this.state.tempsAdventSetmanes.respBreuLaudes1
        respBreu2 = this.state.tempsAdventSetmanes.respBreuLaudes2
        respBreu3 = this.state.tempsAdventSetmanes.respBreuLaudes3
        break;
      case A_FERIES:
        respBreu1 = this.state.tempsAdventFeries.respBreuLaudes1
        respBreu2 = this.state.tempsAdventFeries.respBreuLaudes2
        respBreu3 = this.state.tempsAdventFeries.respBreuLaudes3
        break;
      case N_OCTAVA:
        respBreu1 = this.state.tempsNadalOctava.resp2Breu1Laudes
        respBreu2 = this.state.tempsNadalOctava.resp2Breu2Laudes
        respBreu3 = this.state.tempsNadalOctava.resp2Breu3Laudes
        break;
      case N_ABANS:
        respBreu1 = this.state.tempsNadalAbansEpifania.respBreuLaudes1
        respBreu2 = this.state.tempsNadalAbansEpifania.respBreuLaudes2
        respBreu3 = this.state.tempsNadalAbansEpifania.respBreuLaudes3
        break;
    }
    if(LT === Q_TRIDU){
      return(
        <View>
          <Text style={styles.red}>Ant.
            <Text style={styles.black}> {this.state.tempsQuaresmaTridu.antEspecialLaudes}</Text>
          </Text>
        </View>
      )
    }
    else if(LT === P_OCTAVA){
      return(
        <View>
          <Text style={styles.red}>Ant.
            <Text style={styles.black}> {this.state.tempsPasquaOct.antEspecialLaudes}</Text>
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
        if(weekDay !== 0){ ///no diumenge
          antCantic = this.state.salteriComuLaudes.antEvangelic;
        }
        else{ //diumenge
          switch (litYear) {
            case 'A':
              antCantic = this.state.tempsOrdinariOracions.antZacariesA;
              break;
            case 'B':
              antCantic = this.state.tempsOrdinariOracions.antZacariesB;
              break;
            case 'C':
              antCantic = this.state.tempsOrdinariOracions.antZacariesC;
              break;
          }
        }
        break;
      case Q_CENDRA:
        antCantic = this.state.tempsQuaresmaCendra.antZacaries;
        break;
      case Q_SETMANES:
        if(weekDay !== 0){ ///no diumenge
          antCantic = this.state.tempsQuaresmaVSetmanesDium.antZacaries;
        }
        else{ //diumenge
          switch (litYear) {
            case 'A':
              antCantic = this.state.tempsQuaresmaVSetmanesDium.antZacariesA;
              break;
            case 'B':
              antCantic = this.state.tempsQuaresmaVSetmanesDium.antZacariesB;
              break;
            case 'C':
              antCantic = this.state.tempsQuaresmaVSetmanesDium.antZacariesC;
              break;
          }
        }
        break;
      case Q_DIUM_RAMS:
        switch (litYear) {
          case 'A':
            antCantic = this.state.tempsQuaresmaRams.antZacariesA;
            break;
          case 'B':
            antCantic = this.state.tempsQuaresmaRams.antZacariesB;
            break;
          case 'C':
            antCantic = this.state.tempsQuaresmaRams.antZacariesC;
            break;
        }
        break;
      case Q_SET_SANTA:
          antCantic = this.state.tempsQuaresmaSetSanta.antZacaries;
        break;
      case Q_TRIDU:
          antCantic = this.state.tempsQuaresmaTridu.antZacaries;
        break;
      case P_OCTAVA:
          antCantic = this.state.tempsPasquaOct.antZacaries;
        break;
      case P_SETMANES:
        if(weekDay !== 0){ ///no diumenge
          antCantic = this.state.tempsPasquaSetmanes.antZacaries;
        }
        else{ //diumenge
          switch (litYear) {
            case 'A':
              antCantic = this.state.tempsPasquaSetmanesDium.antZacariesA;
              break;
            case 'B':
              antCantic = this.state.tempsPasquaSetmanesDium.antZacariesB;
              break;
            case 'C':
              antCantic = this.state.tempsPasquaSetmanesDium.antZacariesC;
              break;
          }
        }
        break;
      case A_SETMANES:
        if(weekDay !== 0){ ///no diumenge
          antCantic = this.state.tempsAdventSetmanes.antZacaries;
        }
        else{ //diumenge
          switch (litYear) {
            case 'A':
              antCantic = this.state.tempsAdventSetmanesDium.antZacariesA;
              break;
            case 'B':
              antCantic = this.state.tempsAdventSetmanesDium.antZacariesB;
              break;
            case 'C':
              antCantic = this.state.tempsAdventSetmanesDium.antZacariesC;
              break;
          }
        }
        break;
      case A_FERIES:
        antCantic = this.state.tempsAdventFeries.antZacaries;
        break;
      case N_OCTAVA:
        antCantic = this.state.tempsNadalOctava.antZacaries;
        break;
      case N_ABANS:
        antCantic = this.state.tempsNadalAbansEpifania.antZacaries;
        break;
    }

    cantic = "Beneït.. etc"; //TODO: aha

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

  pregaries(LT){
    switch(LT){
      case O_ORDINARI:
        pregaries = this.state.salteriComuLaudes.pregaries;
        break;
      case Q_CENDRA:
        pregaries = this.state.tempsQuaresmaCendra.pregariesLaudes;
        break;
      case Q_SETMANES:
        pregaries = this.state.tempsQuaresmaVSetmanes.pregariesLaudes;
        break;
      case Q_DIUM_RAMS:
          pregaries = this.state.tempsQuaresmaRams.pregariesLaudes;
        break;
      case Q_SET_SANTA:
          pregaries = this.state.tempsQuaresmaSetSanta.pregariesLaudes;
        break;
      case Q_TRIDU:
          pregaries = this.state.tempsQuaresmaTridu.pregariesLaudes;
        break;
      case P_OCTAVA:
          pregaries = this.state.tempsPasquaOct.pregariesLaudes;
        break;
      case P_SETMANES:
          pregaries = this.state.tempsPasquaSetmanes.pregariesLaudes;
        break;
      case A_SETMANES:
          pregaries = this.state.tempsAdventSetmanes.pregariesLaudes;
        break;
      case A_FERIES:
          pregaries = this.state.tempsAdventFeries.pregariesLaudes;
        break;
      case N_OCTAVA:
          pregaries = this.state.tempsNadalOctava.pregariesLaudes;
        break;
      case N_ABANS:
        pregaries = this.state.tempsNadalAbansEpifania.pregariesLaudes;
        break;
    }

    return(
        <Text style={styles.black}> {pregaries}</Text>
    );
  }

  oracio(LT, weekDay){
    switch(LT){
      case O_ORDINARI:
        if(weekDay !== 0){ ///no diumenge
          oracio = this.state.salteriComuLaudes.oraFi;
        }
        else{ //diumenge
          oracio = this.state.tempsOrdinariOracions.oracio;
        }
        break;
      case Q_CENDRA:
        oracio = this.state.tempsQuaresmaCendra.oraFiLaudes;
        break;
      case Q_SETMANES:
        oracio = this.state.tempsQuaresmaVSetmanes.oraFiLaudes;
        break;
      case Q_DIUM_RAMS:
        oracio = this.state.tempsQuaresmaRams.oraFiLaudes;
        break;
      case Q_SET_SANTA:
        oracio = this.state.tempsQuaresmaSetSanta.oraFiLaudes;
        break;
      case Q_TRIDU:
        oracio = this.state.tempsQuaresmaTridu.oraFiLaudes;
        break;
      case P_OCTAVA:
        oracio = this.state.tempsPasquaOct.oraFiLaudes;
        break;
      case P_SETMANES:
        oracio = this.state.tempsPasquaSetmanes.oraFiLaudes;
        break;
      case A_SETMANES:
        oracio = this.state.tempsAdventSetmanes.oraFiLaudes;
        break;
      case A_FERIES:
        oracio = this.state.tempsAdventFeries.oraFiLaudes;
        break;
      case N_OCTAVA:
        oracio = this.state.tempsNadalOctava.oraFiLaudes;
        break;
      case N_ABANS:
        oracio = this.state.tempsNadalAbansEpifania.oraFiLaudes;
        break;
    }
    return(<Text style={styles.black}>{oracio}</Text>);
  }
}

const styles = StyleSheet.create({
  black: {
    color: '#000000',
    fontSize: 15,
  },
  blackSmallItalic:{
    color: '#000000',
    fontSize: 13,
    fontStyle: 'italic'
  },
  blackSmallItalicRight: {
    color: '#000000',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'right'
  },
  red: {
    color: '#FF0000',
    fontSize: 15,
  },
  redCenter: {
    color: '#FF0000',
    fontSize: 15,
    textAlign: 'center'
  },
  redCenterBold: {
    color: '#FF0000',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  redSmallItalicRight: {
    color: '#FF0000',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'right'
  }
});

AppRegistry.registerComponent('Laudes', () => Laudes);

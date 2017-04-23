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

import DBAdapter from './DBAdapter';

export default class Ofici extends Component {
  constructor(props) {
    super(props)

    this.state = {
      nit: false, //TODO: HC
      LT: 'N_ABANS', //TODO: HC
      salteriComuOfici: '',
      tempsOrdinariOfici: '',
      tempsOrdinariOracions: '',
      tempsQuaresmaComuFV: '',
      tempsQuaresmaCendra: '',
      tempsQuaresmaVSetmanes: '',
      tempsQuaresmaComuSS: '',
      tempsQuaresmaRams: '',
      tempsQuaresmaSetSanta: '',
      tempsQuaresmaTridu: '',
      tempsPasquaAA: '',
      tempsPasquaOct: '',
      tempsPasquaDA: '',
      tempsPasquaSetmanes: '',
      tempsAdventNadalComu: '',
      tempsAdventSetmanes: '',
      tempsAdventFeries: '',
      tempsNadalOctava: '',
      tempsNadalAbansEpifania: '',
      salteriComuEspPasquaDium: '',
      //tempsAdventSetmanesDium: '',
    }

    this.queryRows = {
      salteriComuOfici: '',
      tempsOrdinariOfici: '',
      tempsOrdinariOracions: '',
      tempsQuaresmaComuFV: '',
      tempsQuaresmaCendra: '',
      tempsQuaresmaVSetmanes: '',
      tempsQuaresmaComuSS: '',
      tempsQuaresmaRams: '',
      tempsQuaresmaSetSanta: '',
      tempsQuaresmaTridu: '',
      tempsPasquaAA: '',
      tempsPasquaOct: '',
      tempsPasquaDA: '',
      tempsPasquaSetmanes: '',
      tempsAdventNadalComu: '',
      tempsAdventSetmanes: '',
      tempsAdventFeries: '',
      tempsNadalOctava: '',
      tempsNadalAbansEpifania: '',
      salteriComuEspPasquaDium: '',
      //tempsAdventSetmanesDium: ''
    }

    this.count = 20; //number of queryies

    {props.weekDay === 0 ? weekDayNormal = 7 : weekDayNormal = props.weekDay}

    acceso = new DBAdapter();

    id = (props.cicle-1)*7 + (props.weekDay+1);
    acceso.getLiturgia("salteriComuOfici", id, (result) => { this.queryRows.salteriComuOfici = result; this.dataReceived(); });

    id = (props.ordinariWeek-1)*7  + (props.weekDay+1);
    acceso.getLiturgia("tempsOrdinariOfici", id, (result) => { this.queryRows.tempsOrdinariOfici = result; this.dataReceived(); });

    id = props.ordinariWeek;
    acceso.getLiturgia("tempsOrdinariOracions", id, (result) => { this.queryRows.tempsOrdinariOracions = result; this.dataReceived(); });

    id = 1;
    acceso.getLiturgia("tempsQuaresmaComuFV", id, (result) => { this.queryRows.tempsQuaresmaComuFV = result; this.dataReceived(); });

    id = props.weekDay-2; //dimecres = 1, dijous = 2, ...
    acceso.getLiturgia("tempsQuaresmaCendra", id, (result) => { this.queryRows.tempsQuaresmaCendra = result; this.dataReceived(); });

    id = (props.quaresmaWeek-1)*7 + (props.weekDay+1);
    acceso.getLiturgia("tempsQuaresmaVSetmanes", id, (result) => { this.queryRows.tempsQuaresmaVSetmanes = result; this.dataReceived(); });

    id = 1;
    acceso.getLiturgia("tempsQuaresmaComuSS", id, (result) => { this.queryRows.tempsQuaresmaComuSS = result; this.dataReceived(); });

    id = 1;
    acceso.getLiturgia("tempsQuaresmaRams", id, (result) => { this.queryRows.tempsQuaresmaRams = result; this.dataReceived(); });

    id = props.weekDay; //dilluns = 1, dimarts = 2, dimecres = 3 i dijous = 4
    acceso.getLiturgia("tempsQuaresmaSetSanta", id, (result) => { this.queryRows.tempsQuaresmaSetSanta = result; this.dataReceived(); });

    id = props.weekDay-3; //dijous = 1, divendres = 2 i dissabte = 3
    acceso.getLiturgia("tempsQuaresmaTridu", id, (result) => { this.queryRows.tempsQuaresmaTridu = result; this.dataReceived(); });

    id = 1;
    acceso.getLiturgia("tempsPasquaAA", id, (result) => { this.queryRows.tempsPasquaAA = result; this.dataReceived(); });

    id = weekDayNormal;
    acceso.getLiturgia("tempsPasquaOct", id, (result) => { this.queryRows.tempsPasquaOct = result; this.dataReceived(); });

    id = 1;
    acceso.getLiturgia("tempsPasquaDA", id, (result) => { this.queryRows.tempsPasquaDA = result; this.dataReceived(); });

    id = (props.pasquaWeek-2)*7 + weekDayNormal;
    acceso.getLiturgia("tempsPasquaSetmanes", id, (result) => { this.queryRows.tempsPasquaSetmanes = result; this.dataReceived(); });

    switch (this.state.LT) {
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
    console.log("YEAH: " + id);
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

    id = props.monthDay-1;
    acceso.getLiturgia("tempsNadalAbansEpifania", id, (result) => { this.queryRows.tempsNadalAbansEpifania = result; this.dataReceived(); });

    /*id=1;
    acceso.getLiturgia("salteriComuEspPasquaDium", id, (result) => { this.queryRows.salteriComuEspPasquaDium = result; this.dataReceived(); });*/
  }

  dataReceived(){
    this.count -= 1;

    if(this.count === 0){
      this.setState({
        salteriComuOfici: this.queryRows.salteriComuOfici,
        tempsOrdinariOfici: this.queryRows.tempsOrdinariOfici,
        tempsOrdinariOracions: this.queryRows.tempsOrdinariOracions,
        tempsQuaresmaComuFV: this.queryRows.tempsQuaresmaComuFV,
        tempsQuaresmaCendra: this.queryRows.tempsQuaresmaCendra,
        tempsQuaresmaVSetmanes: this.queryRows.tempsQuaresmaVSetmanes,
        tempsQuaresmaComuSS: this.queryRows.tempsQuaresmaComuSS,
        tempsQuaresmaRams: this.queryRows.tempsQuaresmaRams,
        tempsQuaresmaSetSanta: this.queryRows.tempsQuaresmaSetSanta,
        tempsQuaresmaTridu: this.queryRows.tempsQuaresmaTridu,
        tempsPasquaAA: this.queryRows.tempsPasquaAA,
        tempsPasquaOct: this.queryRows.tempsPasquaOct,
        tempsPasquaDA: this.queryRows.tempsPasquaDA,
        tempsPasquaSetmanes: this.queryRows.tempsPasquaSetmanes,
        tempsAdventNadalComu: this.queryRows.tempsAdventNadalComu,
        tempsAdventSetmanes: this.queryRows.tempsAdventSetmanes,
        tempsAdventFeries: this.queryRows.tempsAdventFeries,
        tempsNadalOctava: this.queryRows.tempsNadalOctava,
        tempsNadalAbansEpifania: this.queryRows.tempsNadalAbansEpifania,
        salteriComuEspPasquaDium: this.queryRows.salteriComuEspPasquaDium,
        //tempsAdventSetmanesDium: this.queryRows.tempsAdventSetmanesDium
      })
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
        {this.himne(this.state.LT, this.props.weekDay, this.state.nit, this.props.pasquaWeek)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>SALMÒDIA</Text>
        <Text />
        {this.salmodia(this.state.LT, this.props.pasquaWeek, this.props.weekDay)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>VERS</Text>
        <Text />
        {this.vers(this.state.LT)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>LECTURES</Text>
        <Text />
        {this.lectures(this.state.LT)}
        {this.himneOhDeu(this.state.LT, this.props.weekDay)}
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>ORACIÓ</Text>
        <Text />
        {this.oracio(this.state.LT, this.props.weekDay)}
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

  himne(LT, weekDay, nit, pasquaWeek, monthDay){
    switch(LT){
      case O_ORDINARI:
        if(nit){
          if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
            himne = this.state.salteriComuOfici.himneNitLlati;
          }
          else{
            himne = this.state.salteriComuOfici.himneNitCat;
          }
        }
        else{//dia
          if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
            himne = this.state.salteriComuOfici.himneDiaLlati;
          }
          else{
            himne = this.state.salteriComuOfici.himneDiaCat;
          }
        }
        break;
      case Q_CENDRA:
      case Q_SETMANES:
        if(weekDay===0){ //diumenge
          if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
            himne = this.state.tempsQuaresmaComuFV.himneOficiLlatiDom;
          }
          else{
            himne = this.state.tempsQuaresmaComuFV.himneOficiCatDom;
          }
        }
        else{//ferial
          if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
            himne = this.state.tempsQuaresmaComuFV.himneOficiLlatiFer;
          }
          else{
            himne = this.state.tempsQuaresmaComuFV.himneOficiCatFer;
          }
        }
        break;
      case Q_DIUM_RAMS:
      case Q_SET_SANTA:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          himne = this.state.tempsQuaresmaComuSS.himneOficiLlati;
        }
        else{
          himne = this.state.tempsQuaresmaComuSS.himneOficiCat;
        }
        break;
      case Q_TRIDU:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          himne = this.state.tempsQuaresmaTridu.himneDSOLLati;
        }
        else{
          himne = this.state.tempsQuaresmaTridu.himneDSOLCat;
        }
        break;
      case P_OCTAVA:
        if(true){ //TODO: triar si fórmula 1 o 2, hardcoded
          if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
            himne = this.state.tempsPasquaAA.himneOficiLlati1;
          }
          else{
            himne = this.state.tempsPasquaAA.himneOficiCat1;
          }
        }
        else{//fórmula 2
          if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
            himne = this.state.tempsPasquaAA.himneOficiLlati2;
          }
          else{
            himne = this.state.tempsPasquaAA.himneOficiCat2;
          }
        }
        break;
      case P_SETMANES:
        if(pasquaWeek === 7){
          if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
            himne = this.state.tempsPasquaDA.himneOficiLlati;
          }
          else{
            himne = this.state.tempsPasquaDA.himneOficiCat;
          }
        }
        else{
          if(true){ //TODO: triar si fórmula 1 o 2, hardcoded
            if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
              himne = this.state.tempsPasquaAA.himneOficiLlati1;
            }
            else{
              himne = this.state.tempsPasquaAA.himneOficiCat1;
            }
          }
          else{//fórmula 2
            if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
              himne = this.state.tempsPasquaAA.himneOficiLlati2;
            }
            else{
              himne = this.state.tempsPasquaAA.himneOficiCat2;
            }
          }
        }
        break;
      case A_SETMANES:
      case A_FERIES:
      case N_OCTAVA:
      case N_ABANS:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          himne = this.state.tempsAdventNadalComu.himneOficiLlati;
        }
        else{
          himne = this.state.tempsAdventNadalComu.himneOficiCat;
        }
        break;
    }

    return(<Text style={styles.black}>{himne}</Text>);
  }

  salmodia(LT, pasquaWeek, weekDay){
    switch(LT){
      case O_ORDINARI:
      case Q_CENDRA:
      case Q_SETMANES:
      case Q_DIUM_RAMS:
      case Q_SET_SANTA:
      case N_ABANS:
        ant1 = this.state.salteriComuOfici.ant1;
        titol1 = this.state.salteriComuOfici.titol1;
        com1 = this.state.salteriComuOfici.com1;
        salm1 = this.state.salteriComuOfici.salm1;
        gloria1 = this.state.salteriComuOfici.gloria1;
        ant2 = this.state.salteriComuOfici.ant2;
        titol2 = this.state.salteriComuOfici.titol2;
        com2 = this.state.salteriComuOfici.com2;
        salm2 = this.state.salteriComuOfici.salm2;
        gloria2 = this.state.salteriComuOfici.gloria2;
        ant3 = this.state.salteriComuOfici.ant3;
        titol3 = this.state.salteriComuOfici.titol3;
        com3 = this.state.salteriComuOfici.com3;
        salm3 = this.state.salteriComuOfici.salm3;
        gloria3 = this.state.salteriComuOfici.gloria3;
        break;
      case Q_TRIDU:
        ant1 = this.state.tempsQuaresmaTridu.ant1Ofici;
        titol1 = this.state.tempsQuaresmaTridu.titolSalm1Ofici;
        com1 = "-";
        salm1 = this.state.tempsQuaresmaTridu.salm1Ofici;
        gloria1 = this.state.tempsQuaresmaTridu.gloriaOfici1;
        ant2 = this.state.tempsQuaresmaTridu.ant2Ofici;
        titol2 = this.state.tempsQuaresmaTridu.titolSalm2Ofici;
        com2 = "-";
        salm2 = this.state.tempsQuaresmaTridu.salm2Ofici;
        gloria2 = this.state.tempsQuaresmaTridu.gloriaOfici2;
        ant3 = this.state.tempsQuaresmaTridu.ant3Ofici;
        titol3 = this.state.tempsQuaresmaTridu.titolSalm3Ofici;
        com3 = "-";
        salm3 = this.state.tempsQuaresmaTridu.salm3Ofici;
        gloria3 = this.state.tempsQuaresmaTridu.gloriaOfici3;
        break;
      case P_OCTAVA:
        ant1 = this.state.tempsPasquaOct.ant1Ofici;
        titol1 = this.state.tempsPasquaOct.titolSalm1Ofici;
        com1 = "-";
        salm1 = this.state.tempsPasquaOct.salm1Ofici;
        gloria1 = this.state.tempsPasquaOct.gloriaOfici1;
        ant2 = this.state.tempsPasquaOct.ant2Ofici;
        titol2 = this.state.tempsPasquaOct.titolSalm2Ofici;
        com2 = "-";
        salm2 = this.state.tempsPasquaOct.salm2Ofici;
        gloria2 = this.state.tempsPasquaOct.gloriaOfici2;
        ant3 = this.state.tempsPasquaOct.ant3Ofici;
        titol3 = this.state.tempsPasquaOct.titolSalm3Ofici;
        com3 = "-";
        salm3 = this.state.tempsPasquaOct.salm3Ofici;
        gloria3 = this.state.tempsPasquaOct.gloriaOfici3;
        break;
      case P_SETMANES:
        titol1 = this.state.salteriComuOfici.titol1;
        com1 = this.state.salteriComuOfici.com1;
        salm1 = this.state.salteriComuOfici.salm1;
        gloria1 = this.state.salteriComuOfici.gloria1;
        titol2 = this.state.salteriComuOfici.titol2;
        com2 = this.state.salteriComuOfici.com2;
        salm2 = this.state.salteriComuOfici.salm2;
        gloria2 = this.state.salteriComuOfici.gloria2;
        titol3 = this.state.salteriComuOfici.titol3;
        com3 = this.state.salteriComuOfici.com3;
        salm3 = this.state.salteriComuOfici.salm3;
        gloria3 = this.state.salteriComuOfici.gloria3;

        if(weekDay === 0){ //diumenge
          switch (pasquaWeek) { //TODO: check this with master table
            case 3:
              ant1 = this.state.salteriComuEspPasquaDium.ant1OficiDiumIII;
              ant2 = this.state.salteriComuEspPasquaDium.ant2OficiDiumIII;
              ant3 = this.state.salteriComuEspPasquaDium.ant3OficiDiumIII;
              break;
            case 4:
              ant1 = this.state.salteriComuEspPasquaDium.ant1OficiDiumIV;
              ant2 = this.state.salteriComuEspPasquaDium.ant2OficiDiumIV;
              ant3 = this.state.salteriComuEspPasquaDium.ant3OficiDiumIV;
              break;
            case 5:
              ant1 = this.state.salteriComuEspPasquaDium.ant1OficiDiumV;
              ant2 = this.state.salteriComuEspPasquaDium.ant2OficiDiumV;
              ant3 = this.state.salteriComuEspPasquaDium.ant3OficiDiumV;
              break;
            case 6:
              ant1 = this.state.salteriComuEspPasquaDium.ant1OficiDiumVI;
              ant2 = this.state.salteriComuEspPasquaDium.ant2OficiDiumVI;
              ant3 = this.state.salteriComuEspPasquaDium.ant3OficiDiumVI;
              break;
            case 7:
              ant1 = this.state.salteriComuEspPasquaDium.ant1OficiDiumVII;
              ant2 = this.state.salteriComuEspPasquaDium.ant2OficiDiumVII;
              ant3 = this.state.salteriComuEspPasquaDium.ant3OficiDiumVII;
              break;
          }
        }
        else{
          ant1 = this.state.salteriComuOfici.ant1;
          ant2 = this.state.salteriComuOfici.ant2;
          ant3 = this.state.salteriComuOfici.ant3;
        }
        break;
      case A_SETMANES:
      case A_FERIES:
        titol1 = this.state.salteriComuOfici.titol1;
        com1 = this.state.salteriComuOfici.com1;
        salm1 = this.state.salteriComuOfici.salm1;
        gloria1 = this.state.salteriComuOfici.gloria1;
        titol2 = this.state.salteriComuOfici.titol2;
        com2 = this.state.salteriComuOfici.com2;
        salm2 = this.state.salteriComuOfici.salm2;
        gloria2 = this.state.salteriComuOfici.gloria2;
        titol3 = this.state.salteriComuOfici.titol3;
        com3 = this.state.salteriComuOfici.com3;
        salm3 = this.state.salteriComuOfici.salm3;
        gloria3 = this.state.salteriComuOfici.gloria3;

        if(weekDay == 0){
            ant1 = this.state.tempsAdventSetmanesDium.Ant1Ofici; //TODO: change the field! A to a
            ant2 = this.state.tempsAdventSetmanesDium.Ant2Ofici; //TODO: change the field! A to a
            ant3 = this.state.tempsAdventSetmanesDium.Ant3Ofici; //TODO: change the field! A to a
        }
        else{
          ant1 = this.state.salteriComuOfici.ant1;
          ant2 = this.state.salteriComuOfici.ant2;
          ant3 = this.state.salteriComuOfici.ant3;
        }
        break;
      case N_OCTAVA:
        ant1 = this.state.tempsNadalOctava.ant1Ofici;
        titol1 = this.state.tempsNadalOctava.titolSalm1Ofici;
        com1 = "";
        salm1 = this.state.tempsNadalOctava.salm1Ofici;
        gloria1 = this.state.tempsNadalOctava.gloriaOfici1;
        ant2 = this.state.tempsNadalOctava.ant2Ofici;
        titol2 = this.state.tempsNadalOctava.titolSalm2Ofici;
        com2 = "-";
        salm2 = this.state.tempsNadalOctava.salm2Ofici;
        gloria2 = this.state.tempsNadalOctava.gloriaOfici2;
        ant3 = this.state.tempsNadalOctava.ant3Ofici;
        titol3 = this.state.tempsNadalOctava.titolSalm3Ofici;
        com3 = "-";
        salm3 = this.state.tempsNadalOctava.salm3Ofici;
        gloria3 = this.state.tempsNadalOctava.gloriaOfici3;
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

  vers(LT){
    switch(LT){
      case O_ORDINARI:
        respV = this.state.salteriComuOfici.respV;
        respR = this.state.salteriComuOfici.respR;
        break;
      case Q_CENDRA:
        respV = this.state.tempsQuaresmaCendra.respVOfici;
        respR = this.state.tempsQuaresmaCendra.respROfici;
        break;
      case Q_SETMANES:
        respV = this.state.tempsQuaresmaVSetmanes.respVOfici;
        respR = this.state.tempsQuaresmaVSetmanes.respROfici;
        break;
      case Q_DIUM_RAMS:
        respV = this.state.tempsQuaresmaRams.respVOfici;
        respR = this.state.tempsQuaresmaRams.respROfici;
        break;
      case Q_SET_SANTA:
        respV = this.state.tempsQuaresmaSetSanta.respVOfici;
        respR = this.state.tempsQuaresmaSetSanta.respROfici;
        break;
      case Q_TRIDU:
        respV = this.state.tempsQuaresmaTridu.respVOfici;
        respR = this.state.tempsQuaresmaTridu.respROfici;
        break;
      case P_OCTAVA:
        respV = this.state.tempsPasquaOct.respVOfici;
        respR = this.state.tempsPasquaOct.respROfici;
        break;
      case P_SETMANES:
        respV = this.state.tempsPasquaSetmanes.respVOfici;
        respR = this.state.tempsPasquaSetmanes.respROfici;
        break;
      case A_SETMANES:
        respV = this.state.tempsAdventSetmanes.respVOfici;
        respR = this.state.tempsAdventSetmanes.respROfici;
        break;
      case A_FERIES:
        respV = this.state.tempsAdventFeries.respVOfici;
        respR = this.state.tempsAdventFeries.respROfici;
        break;
      case N_OCTAVA:
        respV = this.state.tempsNadalOctava.respVOfici;
        respR = this.state.tempsNadalOctava.respROfici;
        break;
      case N_ABANS:
        respV = this.state.tempsNadalAbansEpifania.respVOfici;
        respR = this.state.tempsNadalAbansEpifania.respROfici;
        break;
    }

    return(
      <View>
        <Text style={styles.red}>V.
          <Text style={styles.black}> {respV}</Text>
        </Text>
        <Text style={styles.red}>R.
          <Text style={styles.black}> {respR}</Text>
        </Text>
      </View>
    );
  }

  lectures(LT){
    switch(LT){
      case O_ORDINARI:
        referencia1 = this.state.tempsOrdinariOfici.referencia1;
        cita1 = this.state.tempsOrdinariOfici.cita1;
        titol1 = this.state.tempsOrdinariOfici.titol1;
        lectura1 = this.state.tempsOrdinariOfici.lectura1;
        citaResp1 = this.state.tempsOrdinariOfici.citaResp1; //TODO: canviar nom de la variable??
        resp1Part1 = this.state.tempsOrdinariOfici.resp1Part1;
        resp1Part2 = this.state.tempsOrdinariOfici.resp1Part2;
        resp1Part3 = this.state.tempsOrdinariOfici.resp1Part3;
        referencia2 = this.state.tempsOrdinariOfici.referencia2;
        cita2 = this.state.tempsOrdinariOfici.cita2;
        titol2 = this.state.tempsOrdinariOfici.titol2;
        lectura2 = this.state.tempsOrdinariOfici.lectura2;
        versResp2 = this.state.tempsOrdinariOfici.versResp2; //TODO: canviar nom de la variable??
        resp2Part1 = this.state.tempsOrdinariOfici.resp2Part1;
        resp2Part2 = this.state.tempsOrdinariOfici.resp2Part2;
        resp2Part3 = this.state.tempsOrdinariOfici.resp2Part3;
        break;
      case Q_CENDRA:
        referencia1 = this.state.tempsQuaresmaCendra.referencia1;
        cita1 = this.state.tempsQuaresmaCendra.cita1;
        titol1 = this.state.tempsQuaresmaCendra.titol1;
        lectura1 = this.state.tempsQuaresmaCendra.lectura1;
        citaResp1 = this.state.tempsQuaresmaCendra.citaResp1; //TODO: canviar nom de la variable??
        resp1Part1 = this.state.tempsQuaresmaCendra.resp1Part1;
        resp1Part2 = this.state.tempsQuaresmaCendra.resp1Part2;
        resp1Part3 = this.state.tempsQuaresmaCendra.resp1Part3;
        referencia2 = this.state.tempsQuaresmaCendra.referencia2;
        cita2 = this.state.tempsQuaresmaCendra.cita2;
        titol2 = this.state.tempsQuaresmaCendra.titol2;
        lectura2 = this.state.tempsQuaresmaCendra.lectura2;
        versResp2 = this.state.tempsQuaresmaCendra.versResp2; //TODO: canviar nom de la variable??
        resp2Part1 = this.state.tempsQuaresmaCendra.resp2Part1;
        resp2Part2 = this.state.tempsQuaresmaCendra.resp2Part2;
        resp2Part3 = this.state.tempsQuaresmaCendra.resp2Part3;
        break;
      case Q_SETMANES:
        referencia1 = this.state.tempsQuaresmaVSetmanes.referencia1;
        cita1 = this.state.tempsQuaresmaVSetmanes.cita1;
        titol1 = this.state.tempsQuaresmaVSetmanes.titol1;
        lectura1 = this.state.tempsQuaresmaVSetmanes.lectura1;
        citaResp1 = this.state.tempsQuaresmaVSetmanes.citaResp1; //TODO: canviar nom de la variable??
        resp1Part1 = this.state.tempsQuaresmaVSetmanes.resp1Part1;
        resp1Part2 = this.state.tempsQuaresmaVSetmanes.resp1Part2;
        resp1Part3 = this.state.tempsQuaresmaVSetmanes.resp1Part3;
        referencia2 = this.state.tempsQuaresmaVSetmanes.referencia2;
        cita2 = this.state.tempsQuaresmaVSetmanes.cita2;
        titol2 = this.state.tempsQuaresmaVSetmanes.titol2;
        lectura2 = this.state.tempsQuaresmaVSetmanes.lectura2;
        versResp2 = this.state.tempsQuaresmaVSetmanes.versResp2; //TODO: canviar nom de la variable??
        resp2Part1 = this.state.tempsQuaresmaVSetmanes.resp2Part1;
        resp2Part2 = this.state.tempsQuaresmaVSetmanes.resp2Part2;
        resp2Part3 = this.state.tempsQuaresmaVSetmanes.resp2Part3;
        break;
      case Q_DIUM_RAMS:
        referencia1 = this.state.tempsQuaresmaRams.referencia1;
        cita1 = this.state.tempsQuaresmaRams.cita1;
        titol1 = this.state.tempsQuaresmaRams.titol1;
        lectura1 = this.state.tempsQuaresmaRams.lectura1;
        citaResp1 = this.state.tempsQuaresmaRams.citaResp1; //TODO: canviar nom de la variable??
        resp1Part1 = this.state.tempsQuaresmaRams.resp1Part1;
        resp1Part2 = this.state.tempsQuaresmaRams.resp1Part2;
        resp1Part3 = this.state.tempsQuaresmaRams.resp1Part3;
        referencia2 = this.state.tempsQuaresmaRams.referencia2;
        cita2 = this.state.tempsQuaresmaRams.cita2;
        titol2 = this.state.tempsQuaresmaRams.titol2;
        lectura2 = this.state.tempsQuaresmaRams.lectura2;
        versResp2 = this.state.tempsQuaresmaRams.versResp2; //TODO: canviar nom de la variable??
        resp2Part1 = this.state.tempsQuaresmaRams.resp2Part1;
        resp2Part2 = this.state.tempsQuaresmaRams.resp2Part2;
        resp2Part3 = this.state.tempsQuaresmaRams.resp2Part3;
        break;
      case Q_SET_SANTA:
        referencia1 = this.state.tempsQuaresmaSetSanta.referencia1;
        cita1 = this.state.tempsQuaresmaSetSanta.cita1;
        titol1 = this.state.tempsQuaresmaSetSanta.titol1;
        lectura1 = this.state.tempsQuaresmaSetSanta.lectura1;
        citaResp1 = this.state.tempsQuaresmaSetSanta.citaResp1; //TODO: canviar nom de la variable??
        resp1Part1 = this.state.tempsQuaresmaSetSanta.resp1Part1;
        resp1Part2 = this.state.tempsQuaresmaSetSanta.resp1Part2;
        resp1Part3 = this.state.tempsQuaresmaSetSanta.resp1Part3;
        referencia2 = this.state.tempsQuaresmaSetSanta.referencia2;
        cita2 = this.state.tempsQuaresmaSetSanta.cita2;
        titol2 = this.state.tempsQuaresmaSetSanta.titol2;
        lectura2 = this.state.tempsQuaresmaSetSanta.lectura2;
        versResp2 = this.state.tempsQuaresmaSetSanta.versResp2; //TODO: canviar nom de la variable??
        resp2Part1 = this.state.tempsQuaresmaSetSanta.resp2Part1;
        resp2Part2 = this.state.tempsQuaresmaSetSanta.resp2Part2;
        resp2Part3 = this.state.tempsQuaresmaSetSanta.resp2Part3;
        break;
      case Q_TRIDU:
        referencia1 = this.state.tempsQuaresmaTridu.referencia1; //TODO: canvair nom de la variable???
        cita1 = this.state.tempsQuaresmaTridu.citaLect1Ofici;
        titol1 = this.state.tempsQuaresmaTridu.titolLect1Ofici;
        lectura1 = this.state.tempsQuaresmaTridu.lectura1;
        citaResp1 = this.state.tempsQuaresmaTridu.citaResp1Ofici;
        resp1Part1 = this.state.tempsQuaresmaTridu.resp1Part1Ofici;
        resp1Part2 = this.state.tempsQuaresmaTridu.resp1Part2Ofici;
        resp1Part3 = this.state.tempsQuaresmaTridu.resp1Part3Ofici;
        referencia2 = this.state.tempsQuaresmaTridu.referencia2Ofici; //TODO: canvair nom de la variable???
        cita2 = this.state.tempsQuaresmaTridu.citaLect2Ofici;
        titol2 = this.state.tempsQuaresmaTridu.titolLect2Ofici;
        lectura2 = this.state.tempsQuaresmaTridu.lectura2;
        versResp2 = this.state.tempsQuaresmaTridu.citaResp2Ofici;
        resp2Part1 = this.state.tempsQuaresmaTridu.resp2Part1Ofici;
        resp2Part2 = this.state.tempsQuaresmaTridu.resp2Part2Ofici;
        resp2Part3 = this.state.tempsQuaresmaTridu.resp2Part3Ofici;
        break;
      case P_OCTAVA:
        referencia1 = this.state.tempsPasquaOct.referencia1; //TODO: canvair nom de la variable???
        cita1 = this.state.tempsPasquaOct.citaLect1Ofici;
        titol1 = this.state.tempsPasquaOct.titolLect1Ofici;
        lectura1 = this.state.tempsPasquaOct.lectura1;
        citaResp1 = this.state.tempsPasquaOct.citaResp1Ofici;
        resp1Part1 = this.state.tempsPasquaOct.resp1Part1Ofici;
        resp1Part2 = this.state.tempsPasquaOct.resp1Part2Ofici;
        resp1Part3 = this.state.tempsPasquaOct.resp1Part3Ofici;
        referencia2 = this.state.tempsPasquaOct.referencia2Ofici; //TODO: canvair nom de la variable???
        cita2 = this.state.tempsPasquaOct.citaLect2Ofici;
        titol2 = this.state.tempsPasquaOct.titolLect2Ofici;
        lectura2 = this.state.tempsPasquaOct.lectura2;
        versResp2 = this.state.tempsPasquaOct.citaResp2Ofici;
        resp2Part1 = this.state.tempsPasquaOct.resp2Part1Ofici;
        resp2Part2 = this.state.tempsPasquaOct.resp2Part2Ofici;
        resp2Part3 = this.state.tempsPasquaOct.resp2Part3Ofici;
        break;
      case P_SETMANES:
        referencia1 = this.state.tempsPasquaSetmanes.referencia1;
        cita1 = this.state.tempsPasquaSetmanes.cita1;
        titol1 = this.state.tempsPasquaSetmanes.titol1;
        lectura1 = this.state.tempsPasquaSetmanes.lectura1;
        citaResp1 = this.state.tempsPasquaSetmanes.citaResp1; //TODO: canviar nom de la variable??
        resp1Part1 = this.state.tempsPasquaSetmanes.resp1Part1;
        resp1Part2 = this.state.tempsPasquaSetmanes.resp1Part2;
        resp1Part3 = this.state.tempsPasquaSetmanes.resp1Part3;
        referencia2 = this.state.tempsPasquaSetmanes.referencia2;
        cita2 = this.state.tempsPasquaSetmanes.cita2;
        titol2 = this.state.tempsPasquaSetmanes.titol2;
        lectura2 = this.state.tempsPasquaSetmanes.lectura2;
        versResp2 = this.state.tempsPasquaSetmanes.versResp2; //TODO: canviar nom de la variable??
        resp2Part1 = this.state.tempsPasquaSetmanes.resp2Part1;
        resp2Part2 = this.state.tempsPasquaSetmanes.resp2Part2;
        resp2Part3 = this.state.tempsPasquaSetmanes.resp2Part3;
        break;
      case A_SETMANES:
        referencia1 = this.state.tempsAdventSetmanes.referencia1;
        cita1 = this.state.tempsAdventSetmanes.cita1;
        titol1 = this.state.tempsAdventSetmanes.titol1;
        lectura1 = this.state.tempsAdventSetmanes.lectura1;
        citaResp1 = this.state.tempsAdventSetmanes.citaResp1; //TODO: canviar nom de la variable??
        resp1Part1 = this.state.tempsAdventSetmanes.resp1Part1;
        resp1Part2 = this.state.tempsAdventSetmanes.resp1Part2;
        resp1Part3 = this.state.tempsAdventSetmanes.resp1Part3;
        referencia2 = this.state.tempsAdventSetmanes.referencia2;
        cita2 = this.state.tempsAdventSetmanes.cita2;
        titol2 = this.state.tempsAdventSetmanes.titol2;
        lectura2 = this.state.tempsAdventSetmanes.lectura2;
        versResp2 = this.state.tempsAdventSetmanes.versResp2; //TODO: canviar nom de la variable??
        resp2Part1 = this.state.tempsAdventSetmanes.resp2Part1;
        resp2Part2 = this.state.tempsAdventSetmanes.resp2Part2;
        resp2Part3 = this.state.tempsAdventSetmanes.resp2Part3;
        break;
      case A_FERIES:
        referencia1 = this.state.tempsAdventFeries.referencia1;
        cita1 = this.state.tempsAdventFeries.cita1;
        titol1 = this.state.tempsAdventFeries.titol1;
        lectura1 = this.state.tempsAdventFeries.lectura1;
        citaResp1 = this.state.tempsAdventFeries.citaResp1; //TODO: canviar nom de la variable??
        resp1Part1 = this.state.tempsAdventFeries.resp1Part1;
        resp1Part2 = this.state.tempsAdventFeries.resp1Part2;
        resp1Part3 = this.state.tempsAdventFeries.resp1Part3;
        referencia2 = this.state.tempsAdventFeries.referencia2;
        cita2 = this.state.tempsAdventFeries.cita2;
        titol2 = this.state.tempsAdventFeries.titol2;
        lectura2 = this.state.tempsAdventFeries.lectura2;
        versResp2 = this.state.tempsAdventFeries.versResp2; //TODO: canviar nom de la variable??
        resp2Part1 = this.state.tempsAdventFeries.resp2Part1;
        resp2Part2 = this.state.tempsAdventFeries.resp2Part2;
        resp2Part3 = this.state.tempsAdventFeries.resp2Part3;
        break;
      case N_OCTAVA:
        referencia1 = this.state.tempsNadalOctava.referencia1; //TODO: canvair nom de la variable???
        cita1 = this.state.tempsNadalOctava.citaLect1Ofici;
        titol1 = this.state.tempsNadalOctava.titolLect1Ofici;
        lectura1 = this.state.tempsNadalOctava.lectura1;
        citaResp1 = this.state.tempsNadalOctava.citaResp1Ofici;
        resp1Part1 = this.state.tempsNadalOctava.resp1Part1Ofici;
        resp1Part2 = this.state.tempsNadalOctava.resp1Part2Ofici;
        resp1Part3 = this.state.tempsNadalOctava.resp1Part3Ofici;
        referencia2 = this.state.tempsNadalOctava.referencia2Ofici; //TODO: canvair nom de la variable???
        cita2 = this.state.tempsNadalOctava.citaLect2Ofici;
        titol2 = this.state.tempsNadalOctava.titolLect2Ofici;
        lectura2 = this.state.tempsNadalOctava.lectura2;
        versResp2 = this.state.tempsNadalOctava.citaResp2Ofici;
        resp2Part1 = this.state.tempsNadalOctava.resp2Part1Ofici;
        resp2Part2 = this.state.tempsNadalOctava.resp2Part2Ofici;
        resp2Part3 = this.state.tempsNadalOctava.resp2Part3Ofici;
        break;
      case N_ABANS:
        referencia1 = this.state.tempsNadalAbansEpifania.referencia1;
        cita1 = this.state.tempsNadalAbansEpifania.cita1;
        titol1 = this.state.tempsNadalAbansEpifania.titol1;
        lectura1 = this.state.tempsNadalAbansEpifania.lectura1;
        citaResp1 = this.state.tempsNadalAbansEpifania.citaResp1; //TODO: canviar nom de la variable??
        resp1Part1 = this.state.tempsNadalAbansEpifania.resp1Part1;
        resp1Part2 = this.state.tempsNadalAbansEpifania.resp1Part2;
        resp1Part3 = this.state.tempsNadalAbansEpifania.resp1Part3;
        referencia2 = this.state.tempsNadalAbansEpifania.referencia2;
        cita2 = this.state.tempsNadalAbansEpifania.cita2;
        titol2 = this.state.tempsNadalAbansEpifania.titol2;
        lectura2 = this.state.tempsNadalAbansEpifania.lectura2;
        versResp2 = this.state.tempsNadalAbansEpifania.versResp2; //TODO: canviar nom de la variable??
        resp2Part1 = this.state.tempsNadalAbansEpifania.resp2Part1;
        resp2Part2 = this.state.tempsNadalAbansEpifania.resp2Part2;
        resp2Part3 = this.state.tempsNadalAbansEpifania.resp2Part3;
        break;
    }
    return(
      <View>
        <Text style={styles.red}>Primera lectura</Text>
        <Text style={styles.black}>{referencia1}
          <Text style={styles.red}> {cita1}</Text></Text>
        <Text />
        <Text style={styles.redCenterBold}>{titol1}</Text>
        <Text />
        <Text style={styles.black}>{lectura1}</Text>
        <Text />
        <Text style={styles.red}>Responsori
          <Text style={styles.redSmallItalicRight}> {citaResp1}</Text>
        </Text>
        <Text style={styles.red}>R.
          <Text style={styles.black}> {resp1Part1}
            <Text style={styles.red}>*</Text> {resp1Part2}</Text>
        </Text>
        <Text style={styles.red}>V.
          <Text style={styles.black}> {resp1Part3}
            <Text style={styles.red}>*</Text> {resp1Part2}</Text>
        </Text>
        <Text />
        <Text style={styles.red}>Segona lectura</Text>
        <Text style={styles.black}>{referencia2}
          <Text style={styles.red}> {cita2}</Text></Text>
        <Text />
        <Text style={styles.redCenterBold}>{titol2}</Text>
        <Text />
        <Text style={styles.black}>{lectura2}</Text>
        <Text />
        <Text style={styles.red}>Responsori
          <Text style={styles.redSmallItalicRight}>  {versResp2}</Text>
        </Text>
        <Text style={styles.red}>R.
          <Text style={styles.black}> {resp2Part1}
            <Text style={styles.red}>*</Text> {resp2Part2}</Text>
        </Text>
        <Text style={styles.red}>V.
          <Text style={styles.black}>  {resp2Part3}
            <Text style={styles.red}>*</Text> {resp2Part2}</Text>
        </Text>
      </View>
    )
  }

  himneOhDeu(LT, weekDay){
    var himne = false;
    switch(LT){
      case O_ORDINARI:
        if(weekDay == 0) himne = true; //diumenge
        break;
      case Q_CENDRA:
        break;
      case Q_SETMANES:
        break;
      case Q_DIUM_RAMS:
        break;
      case Q_SET_SANTA:
        break;
      case Q_TRIDU:
        break;
      case P_OCTAVA:
        himne = true;
        break;
      case P_SETMANES:
        if(weekDay == 0) himne = true; //diumenge
        break;
      case A_SETMANES:
        if(weekDay == 0) himne = true; //diumenge
        break;
      case A_FERIES:
        break;
      case N_OCTAVA:
        himne = true;
        break;
      case N_ABANS:
        if(weekDay == 0) himne = true; //diumenge
        break;
    }

    if(himne){
      return(
        <View>
          <Hr lineColor='#CFD8DC' />
          <Text />
          <Text style={styles.red}>HIMNE</Text>
          <Text />
          <Text style={styles.black}>Oh Déu, us lloem.</Text>
          <Text />
        </View>
      )
    }
  }

  oracio(LT, weekDay){
    switch(LT){
      case O_ORDINARI:
        oracio = this.state.tempsOrdinariOracions.oracio;
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
        oracio = this.state.tempsQuaresmaTridu.oraFiOfici;
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

AppRegistry.registerComponent('Ofici', () => Ofici);

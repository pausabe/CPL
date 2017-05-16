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

export default class HoraMenor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      nit: null,
      salteriComuHora: '',
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
    }

    this.queryRows = {
      salteriComuHora: '',
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
    }

    this.count = 19; //number of queryies

    {props.weekDay === 0 ? weekDayNormal = 7 : weekDayNormal = props.weekDay}

    acceso = new DBAdapter();

    id = (props.cicle-1)*7 + (props.weekDay+1);
    acceso.getLiturgia("salteriComuHora", id, (result) => { this.queryRows.salteriComuHora = result; this.dataReceived(); });

    id = props.setmana;
    acceso.getLiturgia("tempsOrdinariOracions", id, (result) => { this.queryRows.tempsOrdinariOracions = result; this.dataReceived(); });

    id = 1;
    acceso.getLiturgia("tempsQuaresmaComuFV", id, (result) => { this.queryRows.tempsQuaresmaComuFV = result; this.dataReceived(); });

    id = props.weekDay-2; //dimecres = 1, dijous = 2, ...
    acceso.getLiturgia("tempsQuaresmaCendra", id, (result) => { this.queryRows.tempsQuaresmaCendra = result; this.dataReceived(); });

    id = (props.setmana-1)*7 + (props.weekDay+1);
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

    id = (props.setmana-2)*7 + weekDayNormal;
    acceso.getLiturgia("tempsPasquaSetmanes", id, (result) => { this.queryRows.tempsPasquaSetmanes = result; this.dataReceived(); });

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
  }

  dataReceived(){
    this.count -= 1;

    if(this.count === 0){
      nit = false; //TODO: HC
      this.setState({
        nit: nit,
        salteriComuHora: this.queryRows.salteriComuHora,
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
        {this.himne(this.props.LT, this.props.weekDay, this.state.nit, this.props.setmana, this.props.HM)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>SALMÒDIA</Text>
        <Text />
        {this.salmodia(this.props.LT, this.props.setmana, this.props.weekDay, this.props.HM)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>LECTURA BREU</Text>
        <Text />
        {this.lecturaBreuResp(this.props.LT, this.props.HM)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>ORACIÓ</Text>
        <Text />
        {this.oracio(this.props.LT, this.props.weekDay, this.props.HM)}
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

  himne(LT, weekDay, nit, setmana, HM){
    switch(LT){
      case O_ORDINARI:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          himne = "Per fer! Esperant una taula nova";
        }
        else{
          himne = "Per fer! Esperant una taula nova";
        }
        break;
      case Q_CENDRA:
      case Q_SETMANES:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          switch (HM) {
            case 'Tèrcia':
              himne = this.state.tempsQuaresmaComuFV.himneTerciaLlati;
              break;
            case 'Sexta':
              himne = this.state.tempsQuaresmaComuFV.himneSextaLlati;
              break;
            case 'Nona':
              himne = this.state.tempsQuaresmaComuFV.himneNonaLlati;
              break;
          }
        }
        else{
          switch (HM) {
            case 'Tèrcia':
              himne = this.state.tempsQuaresmaComuFV.himneTerciaCat;
              break;
            case 'Sexta':
              himne = this.state.tempsQuaresmaComuFV.himneSextaCat;
              break;
            case 'Nona':
              himne = this.state.tempsQuaresmaComuFV.himneNonaCat;
              break;
          }
        }
        break;
      case Q_DIUM_RAMS:
      case Q_SET_SANTA:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          himne = this.state.tempsQuaresmaComuSS.himneHoraLlati;
        }
        else{
          himne = this.state.tempsQuaresmaComuSS.himneHoraCat;
        }
        break;
      case Q_TRIDU:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          switch (HM) {
            case 'Tèrcia':
              himne = this.state.tempsQuaresmaTridu.himneLlatiTercia;
              break;
            case 'Sexta':
              himne = this.state.tempsQuaresmaTridu.himneLlatiSexta;
              break;
            case 'Nona':
              himne = this.state.tempsQuaresmaTridu.himneLlatiNona;
              break;
          }
        }
        else{
          switch (HM) {
            case 'Tèrcia':
              himne = this.state.tempsQuaresmaTridu.himneCatTercia;
              break;
            case 'Sexta':
              himne = this.state.tempsQuaresmaTridu.himneCatSexta;
              break;
            case 'Nona':
              himne = this.state.tempsQuaresmaTridu.himneCatNona;
              break;
          }
        }
        break;
      case P_OCTAVA:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          switch (HM) {
            case 'Tèrcia':
              himne = this.state.tempsPasquaAA.himneTerciaLlati;
              break;
            case 'Sexta':
              himne = this.state.tempsPasquaAA.himneSextaLlati;
              break;
            case 'Nona':
              himne = this.state.tempsPasquaAA.himneNonaLlati;
              break;
          }
        }
        else{
          switch (HM) {
            case 'Tèrcia':
              himne = this.state.tempsPasquaAA.himneTerciaCat;
              break;
            case 'Sexta':
              himne = this.state.tempsPasquaAA.himneSextaCat;
              break;
            case 'Nona':
              himne = this.state.tempsPasquaAA.himneNonaCat;
              break;
          }
        }
        break;
      case P_SETMANES:
        if(setmana === 7){
          if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
            switch (HM) {
              case 'Tèrcia':
                himne = this.state.tempsPasquaDA.himneTerciaLlati;
                break;
              case 'Sexta':
                himne = this.state.tempsPasquaDA.himneSextaLlati;
                break;
              case 'Nona':
                himne = this.state.tempsPasquaDA.himneNonaLlati;
                break;
            }
          }
          else{
            switch (HM) {
              case 'Tèrcia':
                himne = this.state.tempsPasquaDA.himneTerciaCat;
                break;
              case 'Sexta':
                himne = this.state.tempsPasquaDA.himneSextaCat;
                break;
              case 'Nona':
                himne = this.state.tempsPasquaDA.himneNonaCat;
                break;
            }
          }
        }
        else{
          if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
            switch (HM) {
              case 'Tèrcia':
                himne = this.state.tempsPasquaAA.himneTerciaLlati;
                break;
              case 'Sexta':
                himne = this.state.tempsPasquaAA.himneSextaLlati;
                break;
              case 'Nona':
                himne = this.state.tempsPasquaAA.himneNonaLlati;
                break;
            }
          }
          else{
            switch (HM) {
              case 'Tèrcia':
                himne = this.state.tempsPasquaAA.himneTerciaCat;
                break;
              case 'Sexta':
                himne = this.state.tempsPasquaAA.himneSextaCat;
                break;
              case 'Nona':
                himne = this.state.tempsPasquaAA.himneNonaCat;
                break;
            }
          }
        }
        break;
      case A_SETMANES:
      case A_FERIES:
      case N_OCTAVA:
      case N_ABANS:
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          switch (HM) {
            case 'Tèrcia':
              himne = this.state.tempsAdventNadalComu.himneTerciaLlati;
              break;
            case 'Sexta':
              himne = this.state.tempsAdventNadalComu.himneSextaLlati;
              break;
            case 'Nona':
              himne = this.state.tempsAdventNadalComu.himneNonaLlati;
              break;
          }
        }
        else{
          switch (HM) {
            case 'Tèrcia':
              himne = this.state.tempsAdventNadalComu.himneTerciaCat;
              break;
            case 'Sexta':
              himne = this.state.tempsAdventNadalComu.himneSextaCat;
              break;
            case 'Nona':
              himne = this.state.tempsAdventNadalComu.himneNonaCat;
              break;
          }
        }
        break;
    }

    return(<Text style={styles.black}>{himne}</Text>);
  }

  salmodia(LT, setmana, weekDay, HM){
    antifones = true;
    switch(LT){
      case O_ORDINARI:
        ant1 = this.state.salteriComuHora.ant1;
        titol1 = this.state.salteriComuHora.titol1;
        com1 = this.state.salteriComuHora.com1;
        salm1 = this.state.salteriComuHora.salm1;
        gloria1 = this.state.salteriComuHora.gloria1;
        ant2 = this.state.salteriComuHora.ant2;
        titol2 = this.state.salteriComuHora.titol2;
        com2 = this.state.salteriComuHora.com2;
        salm2 = this.state.salteriComuHora.salm2;
        gloria2 = this.state.salteriComuHora.gloria2;
        ant3 = this.state.salteriComuHora.ant3;
        titol3 = this.state.salteriComuHora.titol3;
        com3 = this.state.salteriComuHora.com3;
        salm3 = this.state.salteriComuHora.salm3;
        gloria3 = this.state.salteriComuHora.gloria3;
        break;
      case Q_CENDRA:
      case Q_SETMANES:
        antifones = false;

        titol1 = this.state.salteriComuHora.titol1;
        com1 = this.state.salteriComuHora.com1;
        salm1 = this.state.salteriComuHora.salm1;
        gloria1 = this.state.salteriComuHora.gloria1;
        titol2 = this.state.salteriComuHora.titol2;
        com2 = this.state.salteriComuHora.com2;
        salm2 = this.state.salteriComuHora.salm2;
        gloria2 = this.state.salteriComuHora.gloria2;
        titol3 = this.state.salteriComuHora.titol3;
        com3 = this.state.salteriComuHora.com3;
        salm3 = this.state.salteriComuHora.salm3;
        gloria3 = this.state.salteriComuHora.gloria3;

        switch (HM) {
          case 'Tèrcia':
            ant = this.state.tempsQuaresmaComuFV.antTercia;
            break;
          case 'Sexta':
            ant = this.state.tempsQuaresmaComuFV.antSexta;
            break;
          case 'Nona':
            ant = this.state.tempsQuaresmaComuFV.antNona;
            break;
        }
        break;
      case Q_DIUM_RAMS:
      case Q_SET_SANTA:
        antifones = false;

        titol1 = this.state.salteriComuHora.titol1;
        com1 = this.state.salteriComuHora.com1;
        salm1 = this.state.salteriComuHora.salm1;
        gloria1 = this.state.salteriComuHora.gloria1;
        titol2 = this.state.salteriComuHora.titol2;
        com2 = this.state.salteriComuHora.com2;
        salm2 = this.state.salteriComuHora.salm2;
        gloria2 = this.state.salteriComuHora.gloria2;
        titol3 = this.state.salteriComuHora.titol3;
        com3 = this.state.salteriComuHora.com3;
        salm3 = this.state.salteriComuHora.salm3;
        gloria3 = this.state.salteriComuHora.gloria3;

        switch (HM) {
          case 'Tèrcia':
            ant = this.state.tempsQuaresmaComuSS.antTercia;
            break;
          case 'Sexta':
            ant = this.state.tempsQuaresmaComuSS.antSexta;
            break;
          case 'Nona':
            ant = this.state.tempsQuaresmaComuSS.antNona;
            break;
        }
        break;
      case Q_TRIDU:
        antifones = false;

        titol1 = this.state.tempsQuaresmaTridu.titolSalmMenor1;
        com1 = "-";
        salm1 = this.state.tempsQuaresmaTridu.salmMenor1;
        gloria1 = "1";
        titol2 = this.state.tempsQuaresmaTridu.titolSalmMenor2;
        com2 = "-";
        salm2 = this.state.tempsQuaresmaTridu.salmMenor2;
        gloria2 = "1";
        titol3 = this.state.tempsQuaresmaTridu.titolSalmMenor3;
        com3 = "-";
        salm3 = this.state.tempsQuaresmaTridu.salmMenor3;
        gloria3 = "1";

        switch (HM) {
          case 'Tèrcia':
            ant = this.state.tempsQuaresmaTridu.antTercia;
            break;
          case 'Sexta':
            ant = this.state.tempsQuaresmaTridu.antSexta;
            break;
          case 'Nona':
            ant = this.state.tempsQuaresmaTridu.antNona;
            break;
        }
        break;
      case P_OCTAVA:
        antifones = false;

        titol1 = this.state.tempsPasquaOct.titol1salm117;
        com1 = "-";
        salm1 = this.state.tempsPasquaOct.part1Salm117;
        gloria1 = this.state.tempsPasquaOct.gloria1salm117;
        titol2 = this.state.tempsPasquaOct.titol2salm117;
        com2 = "-";
        salm2 = this.state.tempsPasquaOct.part2Salm117;
        gloria2 = this.state.tempsPasquaOct.gloria2salm117;
        titol3 = this.state.tempsPasquaOct.titol3salm117;
        com3 = "-";
        salm3 = this.state.tempsPasquaOct.part3Salm117;
        gloria3 = this.state.tempsPasquaOct.gloria3salm117;

        switch (HM) {
          case 'Tèrcia':
            ant = this.state.tempsPasquaOct.antMenorTercia;
            break;
          case 'Sexta':
            ant = this.state.tempsPasquaOct.antMenorSexta;
            break;
          case 'Nona':
            ant = this.state.tempsPasquaOct.antMenorNona;
            break;
        }
        break;
      case P_SETMANES:
        antifones = false;

        titol1 = this.state.salteriComuHora.titol1;
        com1 = this.state.salteriComuHora.com1;
        salm1 = this.state.salteriComuHora.salm1;
        gloria1 = this.state.salteriComuHora.gloria1;
        titol2 = this.state.salteriComuHora.titol2;
        com2 = this.state.salteriComuHora.com2;
        salm2 = this.state.salteriComuHora.salm2;
        gloria2 = this.state.salteriComuHora.gloria2;
        titol3 = this.state.salteriComuHora.titol3;
        com3 = this.state.salteriComuHora.com3;
        salm3 = this.state.salteriComuHora.salm3;
        gloria3 = this.state.salteriComuHora.gloria3;

        ant = "Al·leluia, al·leluia, al·leluia."
        break;
      case A_SETMANES:
      case N_OCTAVA:
      case A_FERIES:
      case N_ABANS:
        antifones = false;

        titol1 = this.state.salteriComuHora.titol1;
        com1 = this.state.salteriComuHora.com1;
        salm1 = this.state.salteriComuHora.salm1;
        gloria1 = this.state.salteriComuHora.gloria1;
        titol2 = this.state.salteriComuHora.titol2;
        com2 = this.state.salteriComuHora.com2;
        salm2 = this.state.salteriComuHora.salm2;
        gloria2 = this.state.salteriComuHora.gloria2;
        titol3 = this.state.salteriComuHora.titol3;
        com3 = this.state.salteriComuHora.com3;
        salm3 = this.state.salteriComuHora.salm3;
        gloria3 = this.state.salteriComuHora.gloria3;

        switch (HM) {
          case 'Tèrcia':
            ant = this.state.tempsAdventNadalComu.antTercia;
            break;
          case 'Sexta':
            ant = this.state.tempsAdventNadalComu.antSexta;
            break;
          case 'Nona':
            ant = this.state.tempsAdventNadalComu.antNona;
            break;
        }
        break;
    }

    return(
      <View>
        {antifones ?
          <View>
            <Text style={styles.red}>Ant. 1.
              <Text style={styles.black}> {ant1}</Text>
            </Text>
          </View>
        :
          <View>
            <Text style={styles.red}>Ant.
              <Text style={styles.black}> {ant}</Text>
            </Text>
          </View>
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
        : null }
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
            <Text />
            <Text style={styles.red}>Ant. 3.
              <Text style={styles.black}> {ant3}</Text>
            </Text>
            <Text />
          </View>
        : null }
        <Text style={styles.redCenter}>{titol3}</Text>
        <Text />
        {com3 !== '-' ?
          <View><Text style={styles.blackSmallItalicRight}>{com3}</Text><Text /></View> : null}
        <Text style={styles.black}>{salm3}</Text>
        <Text />
        {this.gloria(gloria3)}
        <Text />
        {antifones ?
          <View>
            <Text style={styles.red}>Ant. 3.
              <Text style={styles.black}> {ant3}</Text>
            </Text>
          </View>
        :
          <View>
            <Text style={styles.red}>Ant.
              <Text style={styles.black}> {ant}</Text>
            </Text>
          </View>
        }
      </View>
    );
  }

  lecturaBreuResp(LT, HM){
    switch(LT){
      case O_ORDINARI:
        switch (HM) {
          case 'Tèrcia':
            vers = this.state.salteriComuHora.versetLBTercia;
            lecturaBreu = this.state.salteriComuHora.lecturaBreuTercia;
            respV = this.state.salteriComuHora.respTercia1;
            respR = this.state.salteriComuHora.respTercia2;
            break;
          case 'Sexta':
            vers = this.state.salteriComuHora.versetLBSexta;
            lecturaBreu = this.state.salteriComuHora.lecturaBreuSexta;
            respV = this.state.salteriComuHora.respSexta1;
            respR = this.state.salteriComuHora.respSexta2;
            break;
          case 'Nona':
            vers = this.state.salteriComuHora.versetLBNona;
            lecturaBreu = this.state.salteriComuHora.lecturaBreuNona;
            respV = this.state.salteriComuHora.respNona1;
            respR = this.state.salteriComuHora.respNona2;
            break;
        }
        break;
      case Q_CENDRA:
        switch (HM) {
          case 'Tèrcia':
            vers = this.state.tempsQuaresmaCendra.citaLBTercia;
            lecturaBreu = this.state.tempsQuaresmaCendra.lecturaBreuTercia;
            respV = this.state.tempsQuaresmaCendra.respVTercia;
            respR = this.state.tempsQuaresmaCendra.respRTercia;
            break;
          case 'Sexta':
            vers = this.state.tempsQuaresmaCendra.citaLBSexta;
            lecturaBreu = this.state.tempsQuaresmaCendra.lecturaBreuSexta;
            respV = this.state.tempsQuaresmaCendra.respVSexta;
            respR = this.state.tempsQuaresmaCendra.respRSexta;
            break;
          case 'Nona':
            vers = this.state.tempsQuaresmaCendra.citaLBNona;
            lecturaBreu = this.state.tempsQuaresmaCendra.lecturaBreuNona;
            respV = this.state.tempsQuaresmaCendra.respVNona;
            respR = this.state.tempsQuaresmaCendra.respRNona;
            break;
        }
        break;
      case Q_SETMANES:
        switch (HM) {
          case 'Tèrcia':
            vers = this.state.tempsQuaresmaVSetmanes.citaLBTercia;
            lecturaBreu = this.state.tempsQuaresmaVSetmanes.lecturaBreuTercia;
            respV = this.state.tempsQuaresmaVSetmanes.respVTercia;
            respR = this.state.tempsQuaresmaVSetmanes.respRTercia;
            break;
          case 'Sexta':
            vers = this.state.tempsQuaresmaVSetmanes.citaLBSexta;
            lecturaBreu = this.state.tempsQuaresmaVSetmanes.lecturaBreuSexta;
            respV = this.state.tempsQuaresmaVSetmanes.respVSexta;
            respR = this.state.tempsQuaresmaVSetmanes.respRSexta;
            break;
          case 'Nona':
            vers = this.state.tempsQuaresmaVSetmanes.citaLBNona;
            lecturaBreu = this.state.tempsQuaresmaVSetmanes.lecturaBreuNona;
            respV = this.state.tempsQuaresmaVSetmanes.respVNona;
            respR = this.state.tempsQuaresmaVSetmanes.respRNona;
            break;
        }
        break;
      case Q_DIUM_RAMS:
        switch (HM) {
          case 'Tèrcia':
            vers = this.state.tempsQuaresmaRams.citaLBTercia;
            lecturaBreu = this.state.tempsQuaresmaRams.lecturaBreuTercia;
            respV = this.state.tempsQuaresmaRams.respVTercia;
            respR = this.state.tempsQuaresmaRams.respRTercia;
            break;
          case 'Sexta':
            vers = this.state.tempsQuaresmaRams.citaLBSexta;
            lecturaBreu = this.state.tempsQuaresmaRams.lecturaBreuSexta;
            respV = this.state.tempsQuaresmaRams.respVSexta;
            respR = this.state.tempsQuaresmaRams.respRSexta;
            break;
          case 'Nona':
            vers = this.state.tempsQuaresmaRams.citaLBNona;
            lecturaBreu = this.state.tempsQuaresmaRams.lecturaBreuNona;
            respV = this.state.tempsQuaresmaRams.respVNona;
            respR = this.state.tempsQuaresmaRams.respRNona;
            break;
        }
        break;
      case Q_SET_SANTA:
        switch (HM) {
          case 'Tèrcia':
            vers = this.state.tempsQuaresmaSetSanta.citaLBTercia;
            lecturaBreu = this.state.tempsQuaresmaSetSanta.lecturaBreuTercia;
            respV = this.state.tempsQuaresmaSetSanta.respVTercia;
            respR = this.state.tempsQuaresmaSetSanta.respRTercia;
            break;
          case 'Sexta':
            vers = this.state.tempsQuaresmaSetSanta.citaLBSexta;
            lecturaBreu = this.state.tempsQuaresmaSetSanta.lecturaBreuSexta;
            respV = this.state.tempsQuaresmaSetSanta.respVSexta;
            respR = this.state.tempsQuaresmaSetSanta.respRSexta;
            break;
          case 'Nona':
            vers = this.state.tempsQuaresmaSetSanta.citaLBNona;
            lecturaBreu = this.state.tempsQuaresmaSetSanta.lecturaBreuNona;
            respV = this.state.tempsQuaresmaSetSanta.respVNona;
            respR = this.state.tempsQuaresmaSetSanta.respRNona;
            break;
        }
        break;
      case Q_TRIDU:
        switch (HM) {
          case 'Tèrcia':
            vers = this.state.tempsQuaresmaTridu.citaLecturaBreuTercia;
            lecturaBreu = this.state.tempsQuaresmaTridu.lecturaBreuTercia;
            respV = this.state.tempsQuaresmaTridu.respVTercia;
            respR = this.state.tempsQuaresmaTridu.respRTercia;
            break;
          case 'Sexta':
            vers = this.state.tempsQuaresmaTridu.citaLecturaBreuSexta;
            lecturaBreu = this.state.tempsQuaresmaTridu.lecturaBreuSexta;
            respV = this.state.tempsQuaresmaTridu.respVSexta;
            respR = this.state.tempsQuaresmaTridu.respRSexta;
            break;
          case 'Nona':
            vers = this.state.tempsQuaresmaTridu.citaLecturaBreuNona;
            lecturaBreu = this.state.tempsQuaresmaTridu.lecturaBreuNona;
            respV = this.state.tempsQuaresmaTridu.respVNona;
            respR = this.state.tempsQuaresmaTridu.respRNona;
            break;
        }
        break;
      case P_OCTAVA:
        respV = "Avui és el dia en què ha obrat el Senyor, al·leluia.";
        respR = "Alegrem-nos i celebrem-lo, al·leluia.";
        switch (HM) {
          case 'Tèrcia':
            vers = this.state.tempsPasquaOct.citaLBTercia;
            lecturaBreu = this.state.tempsPasquaOct.lecturaBreuTercia;
            break;
          case 'Sexta':
            vers = this.state.tempsPasquaOct.citaLBSexta;
            lecturaBreu = this.state.tempsPasquaOct.lecturaBreuSexta;
            break;
          case 'Nona':
            vers = this.state.tempsPasquaOct.citaLBNona;
            lecturaBreu = this.state.tempsPasquaOct.lecturaBreuNona;
            break;
        }
        break;
      case P_SETMANES:
        switch (HM) {
          case 'Tèrcia':
            vers = this.state.tempsPasquaSetmanes.citaLBTercia;
            lecturaBreu = this.state.tempsPasquaSetmanes.lecturaBreuTercia;
            respV = this.state.tempsPasquaSetmanes.respVTercia;
            respR = this.state.tempsPasquaSetmanes.respRTercia;
            break;
          case 'Sexta':
            vers = this.state.tempsPasquaSetmanes.citaLBSexta;
            lecturaBreu = this.state.tempsPasquaSetmanes.lecturaBreuSexta;
            respV = this.state.tempsPasquaSetmanes.respVSexta;
            respR = this.state.tempsPasquaSetmanes.respRSexta;
            break;
          case 'Nona':
            vers = this.state.tempsPasquaSetmanes.citaLBNona;
            lecturaBreu = this.state.tempsPasquaSetmanes.lecturaBreuNona;
            respV = this.state.tempsPasquaSetmanes.respVNona;
            respR = this.state.tempsPasquaSetmanes.respRNona;
            break;
        }
        break;
      case A_SETMANES:
        switch (HM) {
          case 'Tèrcia':
            vers = this.state.tempsAdventSetmanes.citaLBTercia;
            lecturaBreu = this.state.tempsAdventSetmanes.lecturaBreuTercia;
            respV = this.state.tempsAdventSetmanes.respVTercia;
            respR = this.state.tempsAdventSetmanes.respRTercia;
            break;
          case 'Sexta':
            vers = this.state.tempsAdventSetmanes.citaLBSexta;
            lecturaBreu = this.state.tempsAdventSetmanes.lecturaBreuSexta;
            respV = this.state.tempsAdventSetmanes.respVSexta;
            respR = this.state.tempsAdventSetmanes.respRSexta;
            break;
          case 'Nona':
            vers = this.state.tempsAdventSetmanes.citaLBNona;
            lecturaBreu = this.state.tempsAdventSetmanes.lecturaBreuNona;
            respV = this.state.tempsAdventSetmanes.respVNona;
            respR = this.state.tempsAdventSetmanes.respRNona;
            break;
        }
        break;
      case A_FERIES:
        switch (HM) {
          case 'Tèrcia':
            vers = this.state.tempsAdventFeries.citaLBTercia;
            lecturaBreu = this.state.tempsAdventFeries.lecturaBreuTercia;
            respV = this.state.tempsAdventFeries.respVTercia;
            respR = this.state.tempsAdventFeries.respRTercia;
            break;
          case 'Sexta':
            vers = this.state.tempsAdventFeries.citaLBSexta;
            lecturaBreu = this.state.tempsAdventFeries.lecturaBreuSexta;
            respV = this.state.tempsAdventFeries.respVSexta;
            respR = this.state.tempsAdventFeries.respRSexta;
            break;
          case 'Nona':
            vers = this.state.tempsAdventFeries.citaLBNona;
            lecturaBreu = this.state.tempsAdventFeries.lecturaBreuNona;
            respV = this.state.tempsAdventFeries.respVNona;
            respR = this.state.tempsAdventFeries.respRNona;
            break;
        }
        break;
      case N_OCTAVA:
        switch (HM) {
          case 'Tèrcia':
            vers = this.state.tempsNadalOctava.citaLectBreuTercia;
            lecturaBreu = this.state.tempsNadalOctava.lecturaBreuTercia;
            respV = this.state.tempsNadalOctava.respVTercia;
            respR = this.state.tempsNadalOctava.respRTercia;
            break;
          case 'Sexta':
            vers = this.state.tempsNadalOctava.citaLectBreuSexta;
            lecturaBreu = this.state.tempsNadalOctava.lecturaBreuSexta;
            respV = this.state.tempsNadalOctava.respVSexta;
            respR = this.state.tempsNadalOctava.respRSexta;
            break;
          case 'Nona':
            vers = this.state.tempsNadalOctava.citaLectBreuNona;
            lecturaBreu = this.state.tempsNadalOctava.lecturaBreuNona;
            respV = this.state.tempsNadalOctava.respVNona;
            respR = this.state.tempsNadalOctava.respRNona;
            break;
        }
        break;
      case N_ABANS:
        switch (HM) {
          case 'Tèrcia':
            vers = this.state.tempsNadalAbansEpifania.citaLectBreuTercia;
            lecturaBreu = this.state.tempsNadalAbansEpifania.lecturaBreuTercia;
            respV = this.state.tempsNadalAbansEpifania.respVTercia;
            respR = this.state.tempsNadalAbansEpifania.respRTercia;
            break;
          case 'Sexta':
            vers = this.state.tempsNadalAbansEpifania.citaLectBreuSexta;
            lecturaBreu = this.state.tempsNadalAbansEpifania.lecturaBreuSexta;
            respV = this.state.tempsNadalAbansEpifania.respVSexta;
            respR = this.state.tempsNadalAbansEpifania.respRSexta;
            break;
          case 'Nona':
            vers = this.state.tempsNadalAbansEpifania.citaLectBreuNona;
            lecturaBreu = this.state.tempsNadalAbansEpifania.lecturaBreuNona;
            respV = this.state.tempsNadalAbansEpifania.respVNona;
            respR = this.state.tempsNadalAbansEpifania.respRNona;
            break;
        }
        break;
    }
    return(
      <View>
        <Text style={styles.red}>{vers}</Text>
        <Text />
        <Text style={styles.black}>{lecturaBreu}</Text>
        <Text />
        <Text style={styles.red}>V.
          <Text style={styles.black}> {respV}</Text>
        </Text>
        <Text style={styles.red}>R.
          <Text style={styles.black}> {respR}</Text>
        </Text>
      </View>
    )
  }

  oracio(LT, weekDay, HM){
    switch(LT){
      case O_ORDINARI:
        if(weekDay === 0){ //diumenge
          oracio = this.state.tempsOrdinariOracions.oracio;
        }
        else{ //no diumenge
          switch (HM) {
            case 'Tèrcia':
              oracio = this.state.salteriComuHora.oraTercia;
              break;
            case 'Sexta':
              oracio = this.state.salteriComuHora.oraSexta;
              break;
            case 'Nona':
              oracio = this.state.salteriComuHora.oraNona;
              break;
          }
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
        oracio = this.state.tempsQuaresmaTridu.oraFiMenor;
        break;
      case P_OCTAVA:
        oracio = this.state.tempsPasquaOct.oraFiMenor;
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

AppRegistry.registerComponent('HoraMenor', () => HoraMenor);

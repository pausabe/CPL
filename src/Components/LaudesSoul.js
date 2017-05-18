import {
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

export default class LaudesSoul {
  constructor(props, TABLES, HS, SOUL) {

    this.state = {
      salteriComuLaudes: TABLES.salteriComuLaudes,
      salteriComuInvitatori: TABLES.salteriComuInvitatori,
      tempsOrdinariOracions: TABLES.tempsOrdinariOracions,
      tempsQuaresmaComuFV: TABLES.tempsQuaresmaComuFV,
      tempsQuaresmaCendra: TABLES.tempsQuaresmaCendra,
      tempsQuaresmaVSetmanes: TABLES.tempsQuaresmaVSetmanes,
      tempsQuaresmaVSetmanesDium: TABLES.tempsQuaresmaVSetmanesDium,
      tempsQuaresmaComuSS: TABLES.tempsQuaresmaComuSS,
      tempsQuaresmaRams: TABLES.tempsQuaresmaRams,
      tempsQuaresmaSetSanta: TABLES.tempsQuaresmaSetSanta,
      tempsQuaresmaTridu: TABLES.tempsQuaresmaTridu,
      tempsQuaresmaDiumPasq: TABLES.tempsQuaresmaDiumPasq,
      tempsPasquaAA: TABLES.tempsPasquaAA,
      tempsPasquaOct: TABLES.tempsPasquaOct,
      tempsPasquaDA: TABLES.tempsPasquaDA,
      tempsPasquaSetmanes: TABLES.tempsPasquaSetmanes,
      tempsPasquaSetmanesDium: TABLES.tempsPasquaSetmanesDium,
      tempsAdventNadalComu: TABLES.tempsAdventNadalComu,
      tempsAdventSetmanes: TABLES.tempsAdventSetmanes,
      tempsAdventSetmanesDium: TABLES.tempsAdventSetmanesDium,
      tempsAdventFeries: TABLES.tempsAdventFeries,
      tempsNadalOctava: TABLES.tempsNadalOctava,
      tempsNadalAbansEpifania: TABLES.tempsNadalAbansEpifania,
      tempsSolemnitatsFestes: TABLES.tempsSolemnitatsFestes,
      salteriComuEspPasqua: TABLES.salteriComuEspPasqua,
      diversos: TABLES.diversos,
      benedictus: TABLES.diversos.item(3).oracio,
      salm94: TABLES.diversos.item(0).oracio,
    };

    this.LAUDES = { //24
      antInvitatori: '',
      salm94: '',
      himne: '',
      ant1: '',
      titol1: '',
      com1: '',
      salm1: '',
      gloria1: '',
      ant2: '',
      titol2: '',
      com2: '',
      salm2: '',
      gloria2: '',
      ant3: '',
      titol3: '',
      com3: '',
      salm3: '',
      gloria3: '',
      vers: '',
      lecturaBreu: '',
      cantic: '',
      antCantic: '',
      pregaries: '',
      oracio: '',
    }

    this.introduccio(props.LT, props.setmana);
    this.himne(props.LT, props.weekDay, props.setmana);
    this.salmodia(props.LT, props.setmana, props.weekDay, props.cicle);
    this.lecturaBreu(props.LT);
    this.responsori(props.LT);
    this.cantic(props.LT, props.weekDay, props.ABC);
    this.pregaries(props.LT);
    this.oracio(props.LT, props.weekDay);

    SOUL.setSoul(HS, "laudes", this.LAUDES);
  }

  introduccio(LT, setmana){
    switch(LT){
      case O_ORDINARI:
        antInvitatori = this.state.salteriComuInvitatori.ant;
        break;
      case Q_CENDRA:
      case Q_SETMANES:
        antInvitatori = this.state.tempsQuaresmaComuFV.antInvitatori1;
        break;
      case Q_DIUM_RAMS:
      case Q_SET_SANTA:
        antInvitatori = this.state.tempsQuaresmaComuSS.antInvitatori;
        break;
      case Q_TRIDU:
        antInvitatori = this.state.tempsQuaresmaTridu.antInvitatori;
        break;
      case P_OCTAVA:
        antInvitatori = this.state.tempsPasquaAA.antInvitatori;
        break;
      case P_SETMANES:
        if(setmana === 7){
          antInvitatori = this.state.tempsPasquaDA.antInvitatori;
        }
        else{
          antInvitatori = this.state.tempsPasquaAA.antInvitatori;
        }
        break;
      case A_SETMANES:
      case A_FERIES:
      case N_ABANS:
        antInvitatori = this.state.tempsAdventNadalComu.antInvitatori;
        break;
      case N_OCTAVA:
        antInvitatori = this.state.tempsSolemnitatsFestes.antInvitatori;
        break;
    }
    this.LAUDES.antInvitatori = antInvitatori;
    this.LAUDES.salm94 = this.state.salm94;
  }

  himne(LT, weekDay, setmana){
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
        if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
          himne = this.state.tempsPasquaAA.himneLaudesLlati1;
        }
        else{
          himne = this.state.tempsPasquaAA.himneLaudesCat1;
        }
        break;
      case P_SETMANES:
        if(setmana === 7){
          if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
            himne = this.state.tempsPasquaDA.himneLaudesLlati;
          }
          else{
            himne = this.state.tempsPasquaDA.himneLaudesCat;
          }
        }
        else{
          if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
            himne = this.state.tempsPasquaAA.himneLaudesLlati2;
          }
          else{
            himne = this.state.tempsPasquaAA.himneLaudesCat2;
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
    this.LAUDES.himne = himne;
  }

  salmodia(LT, setmana, weekDay){
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
          ant1 = this.state.salteriComuEspPasqua.ant1Laudes;
          ant2 = this.state.salteriComuEspPasqua.ant2Laudes;
          ant3 = this.state.salteriComuEspPasqua.ant3Laudes;
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
    this.LAUDES.ant1 = ant1;
    this.LAUDES.titol1 = titol1;
    this.LAUDES.com1 = com1;
    this.LAUDES.salm1 = salm1;
    this.LAUDES.gloria1 = gloria1;
    this.LAUDES.ant2 = ant2;
    this.LAUDES.titol2 = titol2;
    this.LAUDES.com2 = com2;
    this.LAUDES.salm2 = salm2;
    this.LAUDES.gloria2 = gloria2;
    this.LAUDES.ant3 = ant3;
    this.LAUDES.titol3 = titol3;
    this.LAUDES.com3 = com3;
    this.LAUDES.salm3 = salm3;
    this.LAUDES.gloria3 = gloria3;
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
    this.LAUDES.vers = vers;
    this.LAUDES.lecturaBreu = lecturaBreu;
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
      this.LAUDES.calAntEspecial = true;
      this.LAUDES.antEspecialLaudes = antEspecialLaudes;
    }
    else if(LT === P_OCTAVA){
      this.LAUDES.calAntEspecial = true;
      this.LAUDES.antEspecialLaudes = antEspecialLaudes;
    }
    else{
      this.LAUDES.calAntEspecial = false;
      this.LAUDES.respBreu1 = respBreu1;
      this.LAUDES.respBreu2 = respBreu2;
      this.LAUDES.respBreu3 = respBreu3;
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
    this.LAUDES.cantic = this.state.benedictus;
    this.LAUDES.antCantic = antCantic;
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
    this.LAUDES.pregaries = pregaries;
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
    this.LAUDES.oracio = oracio;
  }
}

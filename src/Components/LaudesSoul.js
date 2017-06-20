import {
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';
import Hr from 'react-native-hr';
import GLOBAL from '../Globals/Globals';

export default class LaudesSoul {
  constructor(variables, liturgicProps, TABLES, CEL, HS, SOUL) {
    console.log("Constructor LaudesSoul");
    this.makePrayer(variables.date, liturgicProps, TABLES, variables.invitatori, CEL, variables.llati, HS, SOUL);
  }

  makePrayer(date, liturgicProps, TABLES, invitatori, CEL, llati, HS, SOUL){
    console.log("MakePrayer LaudesSoul");
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

    this.LAUDES = { //30
      invitatori: invitatori,
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
      calAntEspecial: '',
      antEspecialLaudes: '',
      respBreu1: '',
      respBreu2: '',
      respBreu3: '',
      cantic: '',
      antCantic: '',
      pregaries: '',
      oracio: '',
    }

    if(CEL.diumPasqua) {
      this.LAUDES = CEL;
      this.LAUDES.cantic = this.state.benedictus;
      this.LAUDES.salm94 = this.state.salm94
    }
    else{
      this.introduccio(liturgicProps.LT, liturgicProps.setmana, CEL);
      this.himne(liturgicProps.LT, date.getDay(), liturgicProps.setmana, CEL, llati);
      this.salmodia(liturgicProps.LT, liturgicProps.setmana, date.getDay(), CEL);
      this.lecturaBreu(liturgicProps.LT, CEL);
      this.responsori(liturgicProps.LT, CEL);
      this.cantic(liturgicProps.LT, date.getDay(), liturgicProps.ABC, CEL);
      this.pregaries(liturgicProps.LT, CEL);
      this.oracio(liturgicProps.LT, date.getDay(), CEL);
    }

    SOUL.setSoul(HS, "laudes", this.LAUDES);
  }

  introduccio(LT, setmana, CEL){
    switch(LT){
      case GLOBAL.O_ORDINARI:
        antInvitatori = this.state.salteriComuInvitatori.ant;
        break;
      case GLOBAL.Q_CENDRA:
      case GLOBAL.Q_SETMANES:
        antInvitatori = this.state.tempsQuaresmaComuFV.antInvitatori1;
        break;
      case GLOBAL.Q_DIUM_RAMS:
      case GLOBAL.Q_SET_SANTA:
        antInvitatori = this.state.tempsQuaresmaComuSS.antInvitatori;
        break;
      case GLOBAL.Q_TRIDU:
        antInvitatori = this.state.tempsQuaresmaTridu.antInvitatori;
        break;
      case GLOBAL.P_OCTAVA:
        antInvitatori = this.state.tempsPasquaAA.antInvitatori;
        break;
      case GLOBAL.P_SETMANES:
        //console.log("Psetmanes: " + setmana);
        if(setmana === '7'){
          antInvitatori = this.state.tempsPasquaDA.antInvitatori;
        }
        else{
          antInvitatori = this.state.tempsPasquaAA.antInvitatori;
        }
        break;
      case GLOBAL.A_SETMANES:
      case GLOBAL.A_FERIES:
      case GLOBAL.N_ABANS:
        antInvitatori = this.state.tempsAdventNadalComu.antInvitatori;
        break;
      case GLOBAL.N_OCTAVA:
        antInvitatori = this.state.tempsSolemnitatsFestes.antInvitatori;
        break;
    }
    if(CEL.antInvitatori === '-')
      this.LAUDES.antInvitatori = antInvitatori;
    else this.LAUDES.antInvitatori = CEL.antInvitatori;

    this.LAUDES.salm94 = this.state.salm94;
  }

  himne(LT, weekDay, setmana, CEL, llati){
    switch(LT){
      case GLOBAL.O_ORDINARI:
        if(llati === 'true'){
          himne = this.state.salteriComuLaudes.himneLlati;
        }
        else{
          himne = this.state.salteriComuLaudes.himneCat;
        }
        break;
      case GLOBAL.Q_CENDRA:
      case GLOBAL.Q_SETMANES:
        if(weekDay===0){ //diumenge
          if(llati === 'true'){
            himne = this.state.tempsQuaresmaComuFV.himneLaudesLlatiDom;
          }
          else{
            himne = this.state.tempsQuaresmaComuFV.himneLaudesCatDom;
          }
        }
        else{//ferial
          if(llati === 'true'){
            himne = this.state.tempsQuaresmaComuFV.himneLaudesLlatiFer;
          }
          else{
            himne = this.state.tempsQuaresmaComuFV.himneLaudesCatFer;
          }
        }
        break;
      case GLOBAL.Q_DIUM_RAMS:
      case GLOBAL.Q_SET_SANTA:
        if(llati === 'true'){
          himne = this.state.tempsQuaresmaComuSS.himneLaudesLlati;
        }
        else{
          himne = this.state.tempsQuaresmaComuSS.himneLaudesCat;
        }
        break;
      case GLOBAL.Q_TRIDU:
        if(llati === 'true'){
          himne = this.state.tempsQuaresmaTridu.himneDSOLaudesllati;
        }
        else{
          himne = this.state.tempsQuaresmaTridu.himneDSOLaudescat;
        }
        break;
      case GLOBAL.P_OCTAVA:
        if(llati === 'true'){
          himne = this.state.tempsPasquaAA.himneLaudesLlati1;
        }
        else{
          himne = this.state.tempsPasquaAA.himneLaudesCat1;
        }
        break;
      case GLOBAL.P_SETMANES:
        if(setmana === '7'){
          if(llati === 'true'){
            himne = this.state.tempsPasquaDA.himneLaudesLlati;
          }
          else{
            himne = this.state.tempsPasquaDA.himneLaudesCat;
          }
        }
        else{
          if(weekDay === 6 || weekDay === 0){
            if(llati === 'true'){
              himne = this.state.tempsPasquaAA.himneLaudesLlati1;
            }
            else{
              himne = this.state.tempsPasquaAA.himneLaudesCat1;
            }
          }
          else{
            if(llati === 'true'){
              himne = this.state.tempsPasquaAA.himneLaudesLlati2;
            }
            else{
              himne = this.state.tempsPasquaAA.himneLaudesCat2;
            }
          }
        }
        break;
      case GLOBAL.A_SETMANES:
      case GLOBAL.A_FERIES:
      case GLOBAL.N_ABANS:
        if(llati === 'true'){
          himne = this.state.tempsAdventNadalComu.himneLaudesLlati;
        }
        else{
          himne = this.state.tempsAdventNadalComu.himneLaudesCat;
        }
        break;
      case GLOBAL.N_OCTAVA:
        if(llati === 'true'){
          himne = this.state.tempsSolemnitatsFestes.himneLaudesLlati;
        }
        else{
          himne = this.state.tempsSolemnitatsFestes.himneLaudesCat;
        }
        break;
    }
    if(CEL.himne === '-')
      this.LAUDES.himne = himne;
    else this.LAUDES.himne = CEL.himne;
  }

  salmodia(LT, setmana, weekDay, CEL){
    switch(LT){
      case GLOBAL.O_ORDINARI:
      case GLOBAL.Q_CENDRA:
      case GLOBAL.A_FERIES:
      case GLOBAL.N_ABANS:
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
        case GLOBAL.Q_SETMANES:
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
      case GLOBAL.Q_DIUM_RAMS:
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
      case GLOBAL.Q_SET_SANTA:
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
      case GLOBAL.Q_TRIDU:
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
      case GLOBAL.P_OCTAVA:
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
      case GLOBAL.P_SETMANES:
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
      case GLOBAL.A_SETMANES:
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
      case GLOBAL.N_OCTAVA:
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
    if(CEL.ant1 === '-')
      this.LAUDES.ant1 = ant1;
    else this.LAUDES.ant1 = CEL.ant1;
    if(CEL.titol1 === '-'){
      this.LAUDES.titol1 = titol1;
      this.LAUDES.com1 = com1;
    }
    else {
      this.LAUDES.titol1 = CEL.titol1;
      this.LAUDES.com1 = "-";
    }
    if(CEL.salm1 === '-')
      this.LAUDES.salm1 = salm1;
    else this.LAUDES.salm1 = CEL.salm1;
    if(CEL.gloria1 === '-')
      this.LAUDES.gloria1 = gloria1;
    else this.LAUDES.gloria1 = CEL.gloria1;
    if(CEL.ant2 === '-')
      this.LAUDES.ant2 = ant2;
    else this.LAUDES.ant2 = CEL.ant2;
    if(CEL.titol2 === '-'){
      this.LAUDES.titol2 = titol2;
      this.LAUDES.com2 = com2;
    }
    else {
      this.LAUDES.titol2 = CEL.titol2;
      this.LAUDES.com2 = "-";
    }
    if(CEL.salm2 === '-')
      this.LAUDES.salm2 = salm2;
    else this.LAUDES.salm2 = CEL.salm2;
    if(CEL.gloria2 === '-')
      this.LAUDES.gloria2 = gloria2;
    else this.LAUDES.gloria2 = CEL.gloria2;
    if(CEL.ant3 === '-')
      this.LAUDES.ant3 = ant3;
    else this.LAUDES.ant3 = CEL.ant3;
    if(CEL.titol3 === '-'){
      this.LAUDES.titol3 = titol3;
      this.LAUDES.com3 = com3;
    }
    else {
      this.LAUDES.titol3 = CEL.titol3;
      this.LAUDES.com3 = "-";
    }
    if(CEL.salm3 === '-')
      this.LAUDES.salm3 = salm3;
    else this.LAUDES.salm3 = CEL.salm3;
    if(CEL.gloria3 === '-')
      this.LAUDES.gloria3 = gloria3;
    else this.LAUDES.gloria3 = CEL.gloria3;
  }

  lecturaBreu(LT, CEL){
    switch(LT){
      case GLOBAL.O_ORDINARI:
        vers = this.state.salteriComuLaudes.versetLB;
        lecturaBreu = this.state.salteriComuLaudes.lecturaBreu;
        break;
      case GLOBAL.Q_CENDRA:
        vers = this.state.tempsQuaresmaCendra.citaLBLaudes;
        lecturaBreu = this.state.tempsQuaresmaCendra.lecturaBreuLaudes;
        break;
      case GLOBAL.Q_SETMANES:
        vers = this.state.tempsQuaresmaVSetmanes.citaLBLaudes;
        lecturaBreu = this.state.tempsQuaresmaVSetmanes.lecturaBreuLaudes;
        break;
      case GLOBAL.Q_DIUM_RAMS:
        vers = this.state.tempsQuaresmaRams.citaLBLaudes;
        lecturaBreu = this.state.tempsQuaresmaRams.lecturaBreuLaudes;
        break;
      case GLOBAL.Q_SET_SANTA:
        vers = this.state.tempsQuaresmaSetSanta.citaLBLaudes;
        lecturaBreu = this.state.tempsQuaresmaSetSanta.lecturaBreuLaudes;
        break;
      case GLOBAL.Q_TRIDU:
        vers = this.state.tempsQuaresmaTridu.citaLBLaudes;
        lecturaBreu = this.state.tempsQuaresmaTridu.lecturaBreuLaudes;
        break;
      case GLOBAL.P_OCTAVA:
        vers = this.state.tempsPasquaOct.citaLBLaudes;
        lecturaBreu = this.state.tempsPasquaOct.lecturaBreuLaudes;
        break;
      case GLOBAL.P_SETMANES:
        vers = this.state.tempsPasquaSetmanes.citaLBLaudes;
        lecturaBreu = this.state.tempsPasquaSetmanes.lecturaBreuLaudes;
        break;
      case GLOBAL.A_SETMANES:
        vers = this.state.tempsAdventSetmanes.citaLBLaudes;
        lecturaBreu = this.state.tempsAdventSetmanes.lecturaBreuLaudes;
        break;
      case GLOBAL.A_FERIES:
        vers = this.state.tempsAdventFeries.citaLBLaudes;
        lecturaBreu = this.state.tempsAdventFeries.lecturaBreuLaudes;
        break;
      case GLOBAL.N_OCTAVA:
        vers = this.state.tempsNadalOctava.citaLBLaudes;
        lecturaBreu = this.state.tempsNadalOctava.lecturaBreuLaudes;
        break;
      case GLOBAL.N_ABANS:
        vers = this.state.tempsNadalAbansEpifania.citaLBLaudes;
        lecturaBreu = this.state.tempsNadalAbansEpifania.lecturaBreuLaudes;
        break;
    }
    if(CEL.vers === '-')
      this.LAUDES.vers = vers;
    else this.LAUDES.vers = CEL.vers;
    if(CEL.lecturaBreu === '-')
      this.LAUDES.lecturaBreu = lecturaBreu;
    else this.LAUDES.lecturaBreu = CEL.lecturaBreu;
  }

  responsori(LT, CEL){
    switch(LT){
      case GLOBAL.O_ORDINARI:
        respBreu1 = this.state.salteriComuLaudes.respBreu1
        respBreu2 = this.state.salteriComuLaudes.respBreu2
        respBreu3 = this.state.salteriComuLaudes.respBreu3
        break;
      case GLOBAL.Q_CENDRA:
        respBreu1 = this.state.tempsQuaresmaCendra.respBreuLaudes1
        respBreu2 = this.state.tempsQuaresmaCendra.respBreuLaudes2
        respBreu3 = this.state.tempsQuaresmaCendra.respBreuLaudes3
        break;
      case GLOBAL.Q_SETMANES:
        respBreu1 = this.state.tempsQuaresmaVSetmanes.respBreuLaudes1
        respBreu2 = this.state.tempsQuaresmaVSetmanes.respBreuLaudes2
        respBreu3 = this.state.tempsQuaresmaVSetmanes.respBreuLaudes3
        break;
      case GLOBAL.Q_DIUM_RAMS:
        respBreu1 = this.state.tempsQuaresmaRams.respBreu1Laudes
        respBreu2 = this.state.tempsQuaresmaRams.respBreu2Laudes
        respBreu3 = this.state.tempsQuaresmaRams.respBreu3Laudes
        break;
      case GLOBAL.Q_SET_SANTA:
        respBreu1 = this.state.tempsQuaresmaSetSanta.respBreu1Laudes
        respBreu2 = this.state.tempsQuaresmaSetSanta.respBreu2Laudes
        respBreu3 = this.state.tempsQuaresmaSetSanta.respBreu3Laudes
        break;
      case GLOBAL.P_SETMANES:
        respBreu1 = this.state.tempsPasquaSetmanes.respBreuLaudes1
        respBreu2 = this.state.tempsPasquaSetmanes.respBreuLaudes2
        respBreu3 = this.state.tempsPasquaSetmanes.respBreuLaudes3
        break;
      case GLOBAL.A_SETMANES:
        respBreu1 = this.state.tempsAdventSetmanes.respBreuLaudes1
        respBreu2 = this.state.tempsAdventSetmanes.respBreuLaudes2
        respBreu3 = this.state.tempsAdventSetmanes.respBreuLaudes3
        break;
      case GLOBAL.A_FERIES:
        respBreu1 = this.state.tempsAdventFeries.respBreuLaudes1
        respBreu2 = this.state.tempsAdventFeries.respBreuLaudes2
        respBreu3 = this.state.tempsAdventFeries.respBreuLaudes3
        break;
      case GLOBAL.N_OCTAVA:
        respBreu1 = this.state.tempsNadalOctava.resp2Breu1Laudes
        respBreu2 = this.state.tempsNadalOctava.resp2Breu2Laudes
        respBreu3 = this.state.tempsNadalOctava.resp2Breu3Laudes
        break;
      case GLOBAL.N_ABANS:
        respBreu1 = this.state.tempsNadalAbansEpifania.respBreuLaudes1
        respBreu2 = this.state.tempsNadalAbansEpifania.respBreuLaudes2
        respBreu3 = this.state.tempsNadalAbansEpifania.respBreuLaudes3
        break;
    }
    if(CEL.diumPasqua){
      this.LAUDES.calAntEspecial = true;
      this.LAUDES.antEspecialLaudes = CEL.antEspecialLaudes;
    }
    else{
      if(CEL.respBreu1 === '-'){
        if(LT === GLOBAL.Q_TRIDU){
          this.LAUDES.calAntEspecial = true;
          this.LAUDES.antEspecialLaudes = this.state.tempsQuaresmaTridu.antEspecialLaudes;
        }
        else if(LT === GLOBAL.P_OCTAVA){
          this.LAUDES.calAntEspecial = true;
          this.LAUDES.antEspecialLaudes = this.state.tempsPasquaOct.antEspecialLaudes;
        }
        else{
          this.LAUDES.calAntEspecial = false;
          this.LAUDES.respBreu1 = respBreu1;
          this.LAUDES.respBreu2 = respBreu2;
          this.LAUDES.respBreu3 = respBreu3;
        }
      }
      else {
        this.LAUDES.calAntEspecial = false;
        this.LAUDES.respBreu1 = CEL.respBreu1;
        this.LAUDES.respBreu2 = CEL.respBreu2;
        this.LAUDES.respBreu3 = CEL.respBreu3;
      }
    }
  }

  cantic(LT, weekDay, litYear, CEL){
    switch(LT){
      case GLOBAL.O_ORDINARI:
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
      case GLOBAL.Q_CENDRA:
        antCantic = this.state.tempsQuaresmaCendra.antZacaries;
        break;
      case GLOBAL.Q_SETMANES:
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
      case GLOBAL.Q_DIUM_RAMS:
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
      case GLOBAL.Q_SET_SANTA:
          antCantic = this.state.tempsQuaresmaSetSanta.antZacaries;
        break;
      case GLOBAL.Q_TRIDU:
          antCantic = this.state.tempsQuaresmaTridu.antZacaries;
        break;
      case GLOBAL.P_OCTAVA:
          antCantic = this.state.tempsPasquaOct.antZacaries;
        break;
      case GLOBAL.P_SETMANES:
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
      case GLOBAL.A_SETMANES:
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
      case GLOBAL.A_FERIES:
        antCantic = this.state.tempsAdventFeries.antZacaries;
        break;
      case GLOBAL.N_OCTAVA:
        antCantic = this.state.tempsNadalOctava.antZacaries;
        break;
      case GLOBAL.N_ABANS:
        antCantic = this.state.tempsNadalAbansEpifania.antZacaries;
        break;
    }
    this.LAUDES.cantic = this.state.benedictus;

    if(CEL.antCantic === '-')
      this.LAUDES.antCantic = antCantic;
    else this.LAUDES.antCantic = CEL.antCantic;
  }

  pregaries(LT, CEL){
    switch(LT){
      case GLOBAL.O_ORDINARI:
        pregaries = this.state.salteriComuLaudes.pregaries;
        break;
      case GLOBAL.Q_CENDRA:
        pregaries = this.state.tempsQuaresmaCendra.pregariesLaudes;
        break;
      case GLOBAL.Q_SETMANES:
        pregaries = this.state.tempsQuaresmaVSetmanes.pregariesLaudes;
        break;
      case GLOBAL.Q_DIUM_RAMS:
          pregaries = this.state.tempsQuaresmaRams.pregariesLaudes;
        break;
      case GLOBAL.Q_SET_SANTA:
          pregaries = this.state.tempsQuaresmaSetSanta.pregariesLaudes;
        break;
      case GLOBAL.Q_TRIDU:
          pregaries = this.state.tempsQuaresmaTridu.pregariesLaudes;
        break;
      case GLOBAL.P_OCTAVA:
          pregaries = this.state.tempsPasquaOct.pregariesLaudes;
        break;
      case GLOBAL.P_SETMANES:
          pregaries = this.state.tempsPasquaSetmanes.pregariesLaudes;
        break;
      case GLOBAL.A_SETMANES:
          pregaries = this.state.tempsAdventSetmanes.pregariesLaudes;
        break;
      case GLOBAL.A_FERIES:
          pregaries = this.state.tempsAdventFeries.pregariesLaudes;
        break;
      case GLOBAL.N_OCTAVA:
          pregaries = this.state.tempsNadalOctava.pregariesLaudes;
        break;
      case GLOBAL.N_ABANS:
        pregaries = this.state.tempsNadalAbansEpifania.pregariesLaudes;
        break;
    }
    if(CEL.pregaries === '-')
      this.LAUDES.pregaries = pregaries;
    else this.LAUDES.pregaries = CEL.pregaries;
  }

  oracio(LT, weekDay, CEL){
    switch(LT){
      case GLOBAL.O_ORDINARI:
        if(weekDay !== 0){ ///no diumenge
          oracio = this.state.salteriComuLaudes.oraFi;
        }
        else{ //diumenge
          oracio = this.state.tempsOrdinariOracions.oracio;
        }
        break;
      case GLOBAL.Q_CENDRA:
        oracio = this.state.tempsQuaresmaCendra.oraFiLaudes;
        break;
      case GLOBAL.Q_SETMANES:
        oracio = this.state.tempsQuaresmaVSetmanes.oraFiLaudes;
        break;
      case GLOBAL.Q_DIUM_RAMS:
        oracio = this.state.tempsQuaresmaRams.oraFiLaudes;
        break;
      case GLOBAL.Q_SET_SANTA:
        oracio = this.state.tempsQuaresmaSetSanta.oraFiLaudes;
        break;
      case GLOBAL.Q_TRIDU:
        oracio = this.state.tempsQuaresmaTridu.oraFiLaudes;
        break;
      case GLOBAL.P_OCTAVA:
        oracio = this.state.tempsPasquaOct.oraFiLaudes;
        break;
      case GLOBAL.P_SETMANES:
        oracio = this.state.tempsPasquaSetmanes.oraFiLaudes;
        break;
      case GLOBAL.A_SETMANES:
        oracio = this.state.tempsAdventSetmanes.oraFiLaudes;
        break;
      case GLOBAL.A_FERIES:
        oracio = this.state.tempsAdventFeries.oraFiLaudes;
        break;
      case GLOBAL.N_OCTAVA:
        oracio = this.state.tempsNadalOctava.oraFiLaudes;
        break;
      case GLOBAL.N_ABANS:
        oracio = this.state.tempsNadalAbansEpifania.oraFiLaudes;
        break;
    }
    if(CEL.oracio === '-')
      this.LAUDES.oracio = oracio;
    else this.LAUDES.oracio = CEL.oracio;
  }
}

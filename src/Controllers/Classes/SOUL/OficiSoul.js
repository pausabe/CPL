import GLOBAL from '../../../Globals/Globals';
import GF from '../../../Globals/GlobalFunctions';

export default class OficiSoul {
  constructor(TABLES, CEL, Set_Soul_CB, SOUL) {
    console.log("PlaceLog. Constructor OficiSoul");
    this.makePrayer(TABLES, CEL, Set_Soul_CB, SOUL);
  }

  makePrayer(TABLES, CEL, Set_Soul_CB, SOUL){
    var llati = G_VALUES.llati;
    var date = G_VALUES.date;

    console.log("PlaceLog. MakePrayer OficiSoul");

        this.state = {
          salteriComuOfici: TABLES.salteriComuOfici,
          salteriComuInvitatori: TABLES.salteriComuInvitatori,
          tempsOrdinariOfici: TABLES.tempsOrdinariOfici,
          tempsOrdinariOracions: TABLES.tempsOrdinariOracions,
          tempsQuaresmaComuFV: TABLES.tempsQuaresmaComuFV,
          tempsQuaresmaCendra: TABLES.tempsQuaresmaCendra,
          tempsQuaresmaVSetmanes: TABLES.tempsQuaresmaVSetmanes,
          tempsQuaresmaComuSS: TABLES.tempsQuaresmaComuSS,
          tempsQuaresmaRams: TABLES.tempsQuaresmaRams,
          tempsQuaresmaSetSanta: TABLES.tempsQuaresmaSetSanta,
          tempsQuaresmaTridu: TABLES.tempsQuaresmaTridu,
          tempsPasquaAA: TABLES.tempsPasquaAA,
          tempsPasquaOct: TABLES.tempsPasquaOct,
          tempsPasquaDA: TABLES.tempsPasquaDA,
          tempsPasquaSetmanes: TABLES.tempsPasquaSetmanes,
          tempsAdventNadalComu: TABLES.tempsAdventNadalComu,
          tempsAdventSetmanes: TABLES.tempsAdventSetmanes,
          tempsAdventFeries: TABLES.tempsAdventFeries,
          tempsNadalOctava: TABLES.tempsNadalOctava,
          tempsNadalAbansEpifania: TABLES.tempsNadalAbansEpifania,
          salteriComuEspPasquaDium: TABLES.salteriComuEspPasquaDium,
          tempsAdventSetmanesDium: TABLES.tempsAdventSetmanesDium,
          tempsSolemnitatsFestes: TABLES.tempsSolemnitatsFestes,
          diversos: TABLES.diversos,
          ohDeu: TABLES.diversos.item(2).oracio, //TODO: opció en llati?
        };

        if(TABLES.salteriComuOficiTF !== ''){
          this.state.salteriComuOfici = TABLES.salteriComuOficiTF;
        }

        this.OFICI = { 
          antInvitatori: '',
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
          respV: '',
          respR: '',
          referencia1: '',
          cita1: '',
          titolLectura1: '',
          lectura1: '',
          citaResp1: '',
          resp1Part1: '',
          resp1Part2: '',
          resp1Part3: '',
          referencia2: '',
          cita2: '',
          titolLectura2: '',
          lectura2: '',
          versResp2: '',
          resp2Part1: '',
          resp2Part2: '',
          resp2Part3: '',
          himneOhDeu: '',
          himneOhDeuBool: '',
          oracio: '',
          salm94: TABLES.diversos.item(0).oracio,
          salm99: TABLES.diversos.item(34).oracio,
          salm66: TABLES.diversos.item(35).oracio,
          salm23: TABLES.diversos.item(36).oracio,
        }

    if(CEL.diumPasqua) {
      this.OFICI = CEL;
      this.OFICI.himneOhDeu = this.state.ohDeu;
    }
    else {
      this.introduccio(G_VALUES.LT, G_VALUES.setmana, CEL, date);
      this.himne(G_VALUES.LT, date.getDay(), G_VALUES.setmana, CEL, llati, date);
      this.salmodia(G_VALUES.LT, G_VALUES.setmana, date.getDay(), G_VALUES.cicle, CEL, date);
      this.vers(G_VALUES.LT, CEL, date);
      this.lectures(G_VALUES.LT, CEL, date);
      this.himneOhDeu(G_VALUES.LT, date.getDay(), CEL, date);
      this.oracio(G_VALUES.LT, date.getDay(), CEL, date);
    }

    SOUL.setSoul(Set_Soul_CB, "ofici", this.OFICI);
  }

  introduccio(LT, setmana, CEL, date){
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
        if(LT != GLOBAL.N_ABANS || (LT == GLOBAL.N_ABANS && date.getMonth() == 0 && date.getDate() != 13)){
          antInvitatori = this.state.tempsAdventNadalComu.antInvitatori;
        }
        break;
      case GLOBAL.N_OCTAVA:
        antInvitatori = this.state.tempsSolemnitatsFestes.antInvitatori;
        break;
    }
    if(CEL.antInvitatori === '-')
      this.OFICI.antInvitatori = antInvitatori;
    else this.OFICI.antInvitatori = CEL.antInvitatori;
  }

  himne(LT, weekDay, setmana, CEL, llati, date){
    switch(LT){
      case GLOBAL.O_ORDINARI:
        if(GF.isDarkHimn()){//matinada
          if(llati === 'true'){
            himne = this.state.salteriComuOfici.himneNitLlati;
          }
          else{
            himne = this.state.salteriComuOfici.himneNitCat;
          }
        }
        else{//dia
          if(llati === 'true'){
            himne = this.state.salteriComuOfici.himneDiaLlati;
          }
          else{
            himne = this.state.salteriComuOfici.himneDiaCat;
          }
        }
        break;
      case GLOBAL.Q_CENDRA:
      case GLOBAL.Q_SETMANES:
        if(weekDay===0){ //diumenge
          if(llati === 'true'){
            himne = this.state.tempsQuaresmaComuFV.himneOficiLlatiDom;
          }
          else{
            himne = this.state.tempsQuaresmaComuFV.himneOficiCatDom;
          }
        }
        else{//ferial
          if(llati === 'true'){
            himne = this.state.tempsQuaresmaComuFV.himneOficiLlatiFer;
          }
          else{
            himne = this.state.tempsQuaresmaComuFV.himneOficiCatFer;
          }
        }
        break;
      case GLOBAL.Q_DIUM_RAMS:
      case GLOBAL.Q_SET_SANTA:
        if(llati === 'true'){
          himne = this.state.tempsQuaresmaComuSS.himneOficiLlati;
        }
        else{
          himne = this.state.tempsQuaresmaComuSS.himneOficiCat;
        }
        break;
      case GLOBAL.Q_TRIDU:
        if(llati === 'true'){
          himne = this.state.tempsQuaresmaTridu.himneDSOLLlati;
        }
        else{
          himne = this.state.tempsQuaresmaTridu.himneDSOLCat;
        }
        break;
      case GLOBAL.P_OCTAVA:
        if(llati === 'true'){
          himne = this.state.tempsPasquaAA.himneOficiLlati1;
        }
        else{
          himne = this.state.tempsPasquaAA.himneOficiCat1;
        }
        break;
      case GLOBAL.P_SETMANES:
        if(setmana === '7'){
          if(llati === 'true'){
            himne = this.state.tempsPasquaDA.himneOficiLlati;
          }
          else{
            himne = this.state.tempsPasquaDA.himneOficiCat;
          }
        }
        else{
          if(weekDay === 6 || weekDay === 0){
            if(llati === 'true'){
              himne = this.state.tempsPasquaAA.himneOficiLlati1;
            }
            else{
              himne = this.state.tempsPasquaAA.himneOficiCat1;
            }
          }
          else{
            if(llati === 'true'){
              himne = this.state.tempsPasquaAA.himneOficiLlati2;
            }
            else{
              himne = this.state.tempsPasquaAA.himneOficiCat2;
            }
          }
        }
        break;
      case GLOBAL.A_SETMANES:
      case GLOBAL.A_FERIES:
      case GLOBAL.N_OCTAVA:
      case GLOBAL.N_ABANS:
        if(LT != GLOBAL.N_ABANS || (LT == GLOBAL.N_ABANS && date.getMonth() == 0 && date.getDate() != 13)){
          if(llati === 'true'){
            himne = this.state.tempsAdventNadalComu.himneOficiLlati;
          }
          else{
            himne = this.state.tempsAdventNadalComu.himneOficiCat;
          }
        }
        break;
    }
    if(CEL.himne === '-')
      this.OFICI.himne = himne;
    else
      this.OFICI.himne = CEL.himne;
  }

  salmodia(LT, setmana, weekDay, cicle, CEL, date){
    switch(LT){
      case GLOBAL.O_ORDINARI:
      case GLOBAL.Q_CENDRA:
      case GLOBAL.Q_SETMANES:
      case GLOBAL.Q_DIUM_RAMS:
      case GLOBAL.Q_SET_SANTA:
      case GLOBAL.N_ABANS:
        if(LT != GLOBAL.N_ABANS || (LT == GLOBAL.N_ABANS && date.getMonth() == 0 && date.getDate() != 13)){
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
          if(weekDay === 0 && (LT === GLOBAL.Q_SETMANES || LT === GLOBAL.Q_CENDRA || LT === GLOBAL.Q_DIUM_RAMS || LT === GLOBAL.Q_SET_SANTA)){//diumenge de Quaresma
            if(ant1.search(', al·leluia') !== -1){
              ant1 = ant1.replace(', al·leluia','');
            }
            if(ant2.search(', al·leluia') !== -1){
              ant2 = ant2.replace(', al·leluia','');
            }
            if(ant3.search(', al·leluia') !== -1){
              ant3 = ant3.replace(', al·leluia','');
            }
          }
        }
        break;
      case GLOBAL.Q_TRIDU:
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
      case GLOBAL.P_OCTAVA:
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
      case GLOBAL.P_SETMANES:
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
          switch (setmana) { //TODO: s'ha de modificar. Els noms de la database no estan bé
            case "3":
              ant1 = this.state.salteriComuEspPasquaDium.ant1OficiDiumVI;
              ant2 = this.state.salteriComuEspPasquaDium.ant2OficiDiumVI;
              ant3 = this.state.salteriComuEspPasquaDium.ant3OficiDiumVI;
              break;
            case "4":
              ant1 = this.state.salteriComuEspPasquaDium.ant1OficiDiumVI;
              ant2 = this.state.salteriComuEspPasquaDium.ant2OficiDiumVI;
              ant3 = this.state.salteriComuEspPasquaDium.ant3OficiDiumVI;
              break;
            case "5":
              ant1 = this.state.salteriComuEspPasquaDium.ant1OficiDiumIII;
              ant2 = this.state.salteriComuEspPasquaDium.ant2OficiDiumIII;
              ant3 = this.state.salteriComuEspPasquaDium.ant3OficiDiumIII;
              break;
            case "6":
              ant1 = this.state.salteriComuEspPasquaDium.ant1OficiDiumIV;
              ant2 = this.state.salteriComuEspPasquaDium.ant2OficiDiumIV;
              ant3 = this.state.salteriComuEspPasquaDium.ant3OficiDiumIV;
              break;
            case "7":
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
          if(!(cicle === '3' && weekDay === 4) && !(cicle === '4' && weekDay === 2) && !(cicle === '2' && weekDay === 1) && !(cicle === '2' && weekDay === 3) && !(cicle === '2' && weekDay === 5)){
            ant1 += " Al·leluia.";
          }
          if(!(cicle === '2' && weekDay === 3) && !(cicle === '2' && weekDay === 4) && !(cicle === '2' && weekDay === 6) && !(cicle === '3' && weekDay === 5) && !(cicle === '4' && weekDay === 1) && !(cicle === '4' && weekDay === 2)){
            ant2 += " Al·leluia.";
          }
          if(!(cicle === '4' && weekDay === 4)){
            ant3 += " Al·leluia.";
          }
        }
        break;
      case GLOBAL.A_SETMANES:
      case GLOBAL.A_FERIES:
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
          //console.log("WHAT: " + this.state.tempsAdventSetmanesDium);
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
      case GLOBAL.N_OCTAVA:
        ant1 = this.state.tempsNadalOctava.ant1Ofici;
        titol1 = this.state.tempsNadalOctava.titolSalm1Ofici;
        com1 = "-";
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
    if(CEL.ant1 === '-')
      this.OFICI.ant1 = ant1;
    else this.OFICI.ant1 = CEL.ant1;
    if(CEL.titol1 === '-'){
      this.OFICI.titol1 = titol1;
      this.OFICI.com1 = com1;
    }
    else {
      this.OFICI.titol1 = CEL.titol1;
      this.OFICI.com1 = '-';
    }
    if(CEL.salm1 === '-')
      this.OFICI.salm1 = salm1;
    else this.OFICI.salm1 = CEL.salm1;
    if(CEL.gloria1 === '-')
      this.OFICI.gloria1 = gloria1;
    else this.OFICI.gloria1 = CEL.gloria1;
    if(CEL.ant2 === '-')
      this.OFICI.ant2 = ant2;
    else this.OFICI.ant2 = CEL.ant2;
    if(CEL.titol2 === '-'){
      this.OFICI.titol2 = titol2;
      this.OFICI.com2 = com2;
    }
    else {
      this.OFICI.titol2 = CEL.titol2;
      this.OFICI.com2 = '-';
    }
    if(CEL.salm2 === '-')
      this.OFICI.salm2 = salm2;
    else this.OFICI.salm2 = CEL.salm2;
    if(CEL.gloria2 === '-')
      this.OFICI.gloria2 = gloria2;
    else this.OFICI.gloria2 = CEL.gloria2;
    if(CEL.ant3 === '-')
      this.OFICI.ant3 = ant3;
    else this.OFICI.ant3 = CEL.ant3;
    if(CEL.titol3 === '-'){
      this.OFICI.titol3 = titol3;
      this.OFICI.com3 = com3;
    }
    else {
      this.OFICI.titol3 = CEL.titol3;
      this.OFICI.com3 = '-';
    }
    if(CEL.salm3 === '-')
      this.OFICI.salm3 = salm3;
    else this.OFICI.salm3 = CEL.salm3;
    if(CEL.gloria3 === '-')
      this.OFICI.gloria3 = gloria3;
    else this.OFICI.gloria3 = CEL.gloria3;
  }

  vers(LT, CEL, date){
    switch(LT){
      case GLOBAL.O_ORDINARI:
        respV = this.state.salteriComuOfici.respV;
        respR = this.state.salteriComuOfici.respR;
        break;
      case GLOBAL.Q_CENDRA:
        respV = this.state.tempsQuaresmaCendra.respVOfici;
        respR = this.state.tempsQuaresmaCendra.respROfici;
        break;
      case GLOBAL.Q_SETMANES:
        respV = this.state.tempsQuaresmaVSetmanes.respVOfici;
        respR = this.state.tempsQuaresmaVSetmanes.respROfici;
        break;
      case GLOBAL.Q_DIUM_RAMS:
        respV = this.state.tempsQuaresmaRams.respVOfici;
        respR = this.state.tempsQuaresmaRams.respROfici;
        break;
      case GLOBAL.Q_SET_SANTA:
        respV = this.state.tempsQuaresmaSetSanta.respVOfici;
        respR = this.state.tempsQuaresmaSetSanta.respROfici;
        break;
      case GLOBAL.Q_TRIDU:
        respV = this.state.tempsQuaresmaTridu.respVOfici;
        respR = this.state.tempsQuaresmaTridu.respROfici;
        break;
      case GLOBAL.P_OCTAVA:
        respV = this.state.tempsPasquaOct.respVOfici;
        respR = this.state.tempsPasquaOct.respROfici;
        break;
      case GLOBAL.P_SETMANES:
        respV = this.state.tempsPasquaSetmanes.respVOfici;
        respR = this.state.tempsPasquaSetmanes.respROfici;
        break;
      case GLOBAL.A_SETMANES:
        respV = this.state.tempsAdventSetmanes.respVOfici;
        respR = this.state.tempsAdventSetmanes.respROfici;
        break;
      case GLOBAL.A_FERIES:
        respV = this.state.tempsAdventFeries.respVOfici;
        respR = this.state.tempsAdventFeries.respROfici;
        break;
      case GLOBAL.N_OCTAVA:
        respV = this.state.tempsNadalOctava.respVOfici;
        respR = this.state.tempsNadalOctava.respROfici;
        break;
      case GLOBAL.N_ABANS:
        if(date.getMonth() == 0 && date.getDate() != 13){
          respV = this.state.tempsNadalAbansEpifania.respVOfici;
          respR = this.state.tempsNadalAbansEpifania.respROfici;
        }
        break;
    }
    if(CEL.respV === '-')
      this.OFICI.respV = respV;
    else this.OFICI.respV = CEL.respV;
    if(CEL.respR === '-')
      this.OFICI.respR = respR;
    else this.OFICI.respR = CEL.respR;
  }

  lectures(LT, CEL, date){
    referencia1 = "";
    cita1 = "";
    titol1 = "";
    lectura1 = "";
    citaResp1 = "";
    resp1Part1 = "";
    resp1Part2 ="";
    resp1Part3 = "";
    referencia2 = "";
    cita2 = "";
    titol2 = "";
    lectura2 = "";
    versResp2 = "";
    resp2Part1 = "";
    resp2Part2 = "";
    resp2Part3 = "";

    switch(LT){
      case GLOBAL.O_ORDINARI:
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
      case GLOBAL.Q_CENDRA:
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
      case GLOBAL.Q_SETMANES:
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
      case GLOBAL.Q_DIUM_RAMS:
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
      case GLOBAL.Q_SET_SANTA:
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
      case GLOBAL.Q_TRIDU:
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
      case GLOBAL.P_OCTAVA:
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
      case GLOBAL.P_SETMANES:
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
      case GLOBAL.A_SETMANES:
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
      case GLOBAL.A_FERIES:
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
      case GLOBAL.N_OCTAVA:
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
      case GLOBAL.N_ABANS:
        if(date.getMonth() == 0 && date.getDate() != 13){
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
        }
        break;
    }
    if(CEL.referencia1 === '-')
      this.OFICI.referencia1 = referencia1;
    else this.OFICI.referencia1 = CEL.referencia1;
    if(CEL.cita1 === '-')
      this.OFICI.cita1 = cita1;
    else this.OFICI.cita1 = CEL.cita1;
    if(CEL.titolLectura1 === '-')
      this.OFICI.titolLectura1 = titol1;
    else this.OFICI.titolLectura1 = CEL.titolLectura1;
    if(CEL.lectura1 === '-')
      this.OFICI.lectura1 = lectura1;
    else this.OFICI.lectura1 = CEL.lectura1;
    if(CEL.resp1Part1 === '-'){
      this.OFICI.resp1Part1 = resp1Part1;
      this.OFICI.citaResp1 = citaResp1;
    }
    else {
      this.OFICI.resp1Part1 = CEL.resp1Part1;
      this.OFICI.citaResp1 = CEL.citaResp1;
    }
    if(CEL.resp1Part2 === '-')
      this.OFICI.resp1Part2 = resp1Part2;
    else this.OFICI.resp1Part2 = CEL.resp1Part2;
    if(CEL.resp1Part3 === '-')
      this.OFICI.resp1Part3 = resp1Part3;
    else this.OFICI.resp1Part3 = CEL.resp1Part3;
    if(CEL.referencia2 === '-')
      this.OFICI.referencia2 = referencia2;
    else this.OFICI.referencia2 = CEL.referencia2;
    if(CEL.cita2 === '-')
      this.OFICI.cita2 = cita2;
    else this.OFICI.cita2 = CEL.cita2;
    if(CEL.titolLectura2 === '-')
      this.OFICI.titolLectura2 = titol2;
    else this.OFICI.titolLectura2 = CEL.titolLectura2;
    if(CEL.lectura2 === '-')
      this.OFICI.lectura2 = lectura2;
    else this.OFICI.lectura2 = CEL.lectura2;
    if(CEL.resp2Part1 === '-'){
      this.OFICI.resp2Part1 = resp2Part1;
      this.OFICI.versResp2 = versResp2;
    }
    else {
      this.OFICI.resp2Part1 = CEL.resp2Part1;
      this.OFICI.versResp2 = CEL.versResp2;
    }
    if(CEL.resp2Part2 === '-')
      this.OFICI.resp2Part2 = resp2Part2;
    else this.OFICI.resp2Part2 = CEL.resp2Part2;
    if(CEL.resp2Part3 === '-')
      this.OFICI.resp2Part3 = resp2Part3;
    else this.OFICI.resp2Part3 = CEL.resp2Part3;
  }

  himneOhDeu(LT, weekDay, CEL, tempsEspecific, date){
    var himneOhDeuBool = false;
    switch(LT){
      case GLOBAL.O_ORDINARI:
        if(weekDay == 0) himneOhDeuBool = true; //diumenge
        break;
      case GLOBAL.P_OCTAVA:
        himneOhDeuBool = true;
        break;
      case GLOBAL.P_SETMANES:
        if(weekDay == 0) himneOhDeuBool = true; //diumenge
        break;
      case GLOBAL.A_SETMANES:
        if(weekDay == 0) himneOhDeuBool = true; //diumenge
        break;
      case GLOBAL.N_OCTAVA:
        himneOhDeuBool = true;
        break;
      case GLOBAL.N_ABANS:
        if(weekDay == 0) himneOhDeuBool = true; //diumenge
        break;
    }

    if(CEL.himneOhDeuBool === '-')
      this.OFICI.himneOhDeuBool = himneOhDeuBool;
    else this.OFICI.himneOhDeuBool = CEL.himneOhDeuBool;

    this.OFICI.himneOhDeu = this.state.ohDeu;
  }

  oracio(LT, weekDay, CEL, date){
    switch(LT){
      case GLOBAL.O_ORDINARI:
        oracio = this.state.tempsOrdinariOracions.oracio;
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
        oracio = this.state.tempsQuaresmaTridu.oraFiOfici;
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
        if(date.getMonth() == 0 && date.getDate() != 13){
          oracio = this.state.tempsNadalAbansEpifania.oraFiLaudes;
        }
        break;
    }
    if(CEL.oracio === '-')
      this.OFICI.oracio = oracio;
    else this.OFICI.oracio = CEL.oracio;
  }
}

import OficiSoul from '../Components/OficiSoul';
import LaudesSoul from '../Components/LaudesSoul';
import VespresSoul from '../Components/VespresSoul';
import HoraMenorSoul from '../Components/HoraMenorSoul';
import CompletesSoul from '../Components/CompletesSoul';
import CelebracioSoul from '../Components/CelebracioSoul';
import DBAdapter from '../SQL/DBAdapter';
import GLOBAL from '../Globals/Globals';

export default class SOUL {
  constructor(variables, liturgicProps, dataTomorrow, pentacosta, HS) {
    console.log("constructor SOUL");
    this.variables = variables;
    this.liturgicProps = liturgicProps;
    this.dataTomorrow = dataTomorrow;
    this.pentacosta = pentacosta;

    this.queryRows = {
      salteriComuOfici: '', //1
      salteriComuInvitatori: '', //2
      tempsOrdinariOfici: '', //3
      tempsOrdinariOracions: '', //4.1
      tempsOrdinariOracionsVespres1: '', //4.2
      tempsQuaresmaComuFV: '', //5
      tempsQuaresmaCendra: '', //6
      tempsQuaresmaVSetmanes: '', //7
      tempsQuaresmaComuSS: '', //8
      tempsQuaresmaRams: '', //9
      tempsQuaresmaSetSanta: '', //10
      tempsQuaresmaTridu: '', //11
      tempsPasquaAA: '', //12
      tempsPasquaOct: '', //13
      tempsPasquaDA: '', //14
      tempsPasquaSetmanes: '', //15
      tempsAdventNadalComu: '', //16
      tempsAdventSetmanes: '', //17
      tempsAdventSetmanesDium: '', //18.1
      tempsAdventSetmanesDiumVespres1: '', //18.2
      tempsAdventFeries: '', //19
      tempsNadalOctava: '', //20
      tempsNadalAbansEpifania: '', //21
      salteriComuEspPasquaDium: '', //22
      diversos: '', //23
      salteriComuLaudes: '', //24
      salteriComuEspPasqua: '', //25
      tempsPasquaSetmanesDium: '', //26.1
      tempsPasquaSetmanesDiumVespres1: '', //26.2
      tempsQuaresmaDiumPasq: '', //27
      tempsQuaresmaVSetmanesDium: '', //28.1
      tempsQuaresmaVSetmanesDiumVespres1: '', //28.2
      salteriComuVespres: '', //29
      tempsSolemnitatsFestes: '', //30
      salteriComuHora: '', //31
      salteriComuCompletes: '', //32
      salteriComuOficiTF: '', //33
      santsSolemnitats: '', //34.1
      santsSolemnitatsFVespres1: '', //34.2
      santsMemories: '', //35
      OficisComuns: null, //36
      diesespecials: '', //37
    }

    this.LITURGIA = { //8
      info_cel: null,
      ofici: null,
      laudes: null,
      vespres1: false,
      vespres: null,
      tercia: null,
      sexta: null,
      nona: null,
      completes: null,
    }

    this.firstAccessCel = true;
    this.countLit = 7;
    this.firstAccess = true;
    this.acceso = new DBAdapter();
    this.makeQueryies(variables, liturgicProps, dataTomorrow, pentacosta, HS);
  }

  makeQueryies(variables, liturgicProps, dataTomorrow, pentacosta, HS){
    celType = variables.celType;
    date = variables.date;
    console.log("datedate "+date);
    diocesi = variables.diocesi;
    invitatori = variables.invitatori;
    llati = variables.llati;

    console.log("makeQueryies SOUL");

    //console.log("dataTomorrow.mogut: " + dataTomorrow.mogut);

    this.CT = celType;
    console.log("In SOUL, celType: " + celType + ", diocesi: " + diocesi);
    idDE_aux = this.findDiesEspecials(date, liturgicProps.LT, liturgicProps.setmana, pentacosta, variables.diocesi);
    this.idDE = idDE_aux;
    console.log("idDE_aux: " + idDE_aux);
    //idDE_aux = -1;
    if(idDE_aux === -1)
      idTSF_aux = this.findTempsSolemnitatsFestes(date, liturgicProps.LT, liturgicProps.setmana, pentacosta);
    else idTSF_aux = -1;
    this.idTSF = idTSF_aux;
    console.log("idTSF_aux: " + idTSF_aux);
    //idTSF_aux = -1;
    var idTF = this.findTF(date, liturgicProps.LT, liturgicProps.setmana, pentacosta);
    console.log("idTF: " + idTF);

    this.tomorrowCal = '-';

    console.log("this.dataTomorrow.date " + this.dataTomorrow.date);
    this.tomorrowCal = this.tomorrowCalVespres1CEL(this.dataTomorrow.date, this.dataTomorrow.LT,
      this.dataTomorrow.setmana, this.pentacosta, diocesi);

    console.log("tomorrowCal --------> " + this.tomorrowCal);

    params = {
      date: date,
      liturgicProps: liturgicProps,
      celType: celType,
      diocesi: diocesi,
      invitatori: invitatori,
      llati: llati,
      idTSF: idTSF_aux,
      idDE: idDE_aux,
      HS: HS,
    }

    var c = 0;

    //taula 1 (#2): Ofici(1)
    if(liturgicProps.LT !== GLOBAL.Q_TRIDU && liturgicProps.LT !== GLOBAL.P_OCTAVA &&
      liturgicProps.LT !== GLOBAL.N_OCTAVA){
      c += 1;
      id = (parseInt(liturgicProps.cicle)-1)*7 + (date.getDay()+1);
      this.acceso.getLiturgia("salteriComuOfici", id, (result) => {
        this.queryRows.salteriComuOfici = result;
        this.dataReceived(params);
      });
    }

    //taula 2 (#1): Ofici(2), Laudes(1)
    if(liturgicProps.LT === GLOBAL.O_ORDINARI){
      c += 1;
      id = (parseInt(liturgicProps.cicle)-1)*7 + (date.getDay()+1);
      this.acceso.getLiturgia("salteriComuInvitatori", id, (result) => {
        this.queryRows.salteriComuInvitatori = result;
        this.dataReceived(params);
      });
    }

    //taula 3 (#10): Ofici(3)
    if(liturgicProps.LT === GLOBAL.O_ORDINARI){
      c += 1;
      id = (parseInt(liturgicProps.setmana)-1)*7  + (date.getDay()+1);
      this.acceso.getLiturgia("tempsOrdinariOfici", id, (result) => {
        this.queryRows.tempsOrdinariOfici = result;
        this.dataReceived(params);
      });
    }

    //taula 4.1 (#9): Ofici(4), Laudes(2), Vespres(1), HoraMenor(1)
    if(liturgicProps.LT === GLOBAL.O_ORDINARI){
      c += 1;
      id = parseInt(liturgicProps.setmana);
      this.acceso.getLiturgia("tempsOrdinariOracions", id, (result) => {
        this.queryRows.tempsOrdinariOracions = result;
        this.dataReceived(params);
      });
    }

    //taula 4.2 (#9): Ofici(4), Laudes(2), Vespres(1), HoraMenor(1)
    if(liturgicProps.LT === GLOBAL.O_ORDINARI){
      c += 1;
      id = parseInt(liturgicProps.setmana) + 1;
      this.acceso.getLiturgia("tempsOrdinariOracions", id, (result) => {
        this.queryRows.tempsOrdinariOracionsVespres1 = result;
        this.dataReceived(params);
      });
    }

    //taula 5 (#11): Ofici(5), Laudes(3), Vespres(2), HoraMenor(2)
    if(liturgicProps.LT === GLOBAL.Q_CENDRA || liturgicProps.LT === GLOBAL.Q_SETMANES){
      c += 1;
      id = 1;
      this.acceso.getLiturgia("tempsQuaresmaComuFV", id, (result) => {
        this.queryRows.tempsQuaresmaComuFV = result;
        this.dataReceived(params);
      });
    }

    //taula 6 (#12): Ofici(6), Laudes(4), Vespres(3), HoraMenor(3)
    if(liturgicProps.LT === GLOBAL.Q_CENDRA){
      c += 1;
      id = date.getDay()-2; //dimecres = 1, dijous = 2, ...
      this.acceso.getLiturgia("tempsQuaresmaCendra", id, (result) => {
        this.queryRows.tempsQuaresmaCendra = result;
        this.dataReceived(params);
      });
    }

    //taula 7 (#14): Ofici(7), Laudes(5), Vespres(4), HoraMenor(4)
    if(liturgicProps.LT === GLOBAL.Q_SETMANES){
      c += 1;
      id = (parseInt(liturgicProps.setmana)-1)*7 + (date.getDay()+1);
      this.acceso.getLiturgia("tempsQuaresmaVSetmanes", id, (result) => {
        this.queryRows.tempsQuaresmaVSetmanes = result;
        this.dataReceived(params);
      });
    }

    //taula 8 (#15): Ofici(8), Laudes(6), Vespres(5), HoraMenor(5)
    if(liturgicProps.LT === GLOBAL.Q_DIUM_RAMS || this.tomorrowCal === 'DR' || liturgicProps.LT === GLOBAL.Q_SET_SANTA){
      c += 1;
      id = 1;
      this.acceso.getLiturgia("tempsQuaresmaComuSS", id, (result) => {
        this.queryRows.tempsQuaresmaComuSS = result; this.dataReceived(params); });
    }

    //taula 9 (#16): Ofici(9), Laudes(7), Vespres(6), HoraMenor(6)
    if(liturgicProps.LT === GLOBAL.Q_DIUM_RAMS || this.tomorrowCal === 'DR'){
      c += 1;
      id = 1;
      this.acceso.getLiturgia("tempsQuaresmaRams", id, (result) => {
        this.queryRows.tempsQuaresmaRams = result; this.dataReceived(params); });
    }

    //taula 10 (#17): Ofici(10), Laudes(8), Vespres(7), HoraMenor(7)
    if(liturgicProps.LT === GLOBAL.Q_SET_SANTA){
      c += 1;
      id = date.getDay(); //dilluns = 1, dimarts = 2, dimecres = 3 i dijous = 4
      this.acceso.getLiturgia("tempsQuaresmaSetSanta", id, (result) => {
        this.queryRows.tempsQuaresmaSetSanta = result;
        this.dataReceived(params);
      });
    }

    //taula 11 (#18): Ofici(11), Laudes(9), Vespres(8), HoraMenor(8)
    if(this.tomorrowCal === 'T' || liturgicProps.LT === GLOBAL.Q_TRIDU){
      c += 1;
      id = date.getDay()-3; //dijous = 1, divendres = 2 i dissabte = 3
      this.acceso.getLiturgia("tempsQuaresmaTridu", id, (result) => {
        this.queryRows.tempsQuaresmaTridu = result;
        this.dataReceived(params);
      });
    }

    //taula 12 (#20): Ofici(12), Laudes(10), Vespres(9), HoraMenor(9)
    if(liturgicProps.LT === GLOBAL.P_OCTAVA || liturgicProps.LT === GLOBAL.P_SETMANES){
      c += 1;
      id = 1;
      this.acceso.getLiturgia("tempsPasquaAA", id, (result) => {
        this.queryRows.tempsPasquaAA = result;
        this.dataReceived(params);
      });
    }

    //taula 13 (#21): Ofici(13), Laudes(11), Vespres(10), HoraMenor(10)
    if(liturgicProps.LT === GLOBAL.P_OCTAVA){
      c += 1;
      {date.getDay() === 0 ? weekDayNormal = 7 : weekDayNormal = date.getDay()}
      id = weekDayNormal;
      this.acceso.getLiturgia("tempsPasquaOct", id, (result) => {
        this.queryRows.tempsPasquaOct = result;
        this.dataReceived(params);
      });
    }

    //taula 14 (#22): Ofici(14), Laudes(12), Vespres(11), HoraMenor(11)
    if(liturgicProps.LT === GLOBAL.P_SETMANES){
      c += 1;
      id = 1;
      this.acceso.getLiturgia("tempsPasquaDA", id, (result) => {
        this.queryRows.tempsPasquaDA = result;
        this.dataReceived(params);
      });
    }

    //taula 15 (#23): Ofici(15), Laudes(13), Vespres(12), HoraMenor(12)
    if(liturgicProps.LT === GLOBAL.P_SETMANES){
      c += 1;
      id = (parseInt(liturgicProps.setmana)-2)*7 + (date.getDay()+1);
      if(id === 43) //diumenge de pentacosta (no està dins tempsPasquaSetmanes). Apaño perquè no peti
        id = 1;

      this.acceso.getLiturgia("tempsPasquaSetmanes", id, (result) => {
        this.queryRows.tempsPasquaSetmanes = result;
        this.dataReceived(params);
      });
    }

    //taula 16 (#25): Ofici(16), Laudes(14), Vespres(13), HoraMenor(13)
    if(liturgicProps.LT === GLOBAL.A_SETMANES || liturgicProps.LT === GLOBAL.A_FERIES ||
       liturgicProps.LT === GLOBAL.N_OCTAVA || liturgicProps.LT === GLOBAL.N_ABANS ||
       this.tomorrowCal === 'A'){
      c += 1;
      switch (liturgicProps.LT) {
        case GLOBAL.A_SETMANES:
          id = 1;
        break;
        case GLOBAL.A_FERIES:
          id = 2;
        break;
        case GLOBAL.N_OCTAVA:
          id = 3;
        break;
        case GLOBAL.N_ABANS:
          if(date.getDate() <= 7){ id = 3; }
          else{ id = 4; }
        break;
        default: id = 1;
      }
      //console.log("himne " + id);
      this.acceso.getLiturgia("tempsAdventNadalComu", id, (result) => {
        this.queryRows.tempsAdventNadalComu = result;
        this.dataReceived(params);
      });
    }

    //taula 17 (#26): Ofici(17), Laudes(15), Vespres(14), HoraMenor(14)
    if(liturgicProps.LT === GLOBAL.A_SETMANES || this.tomorrowCal === 'A'){
      c += 1;
      //Week begins with saturday
      {date.getDay() === 6 ? auxDay = 1 : auxDay = date.getDay() + 2}
      auxCicle = liturgicProps.cicle;
      if(this.tomorrowCal === 'A'){
        auxCicle = 1;
        auxDay = 1;
      }
      id = (parseInt(auxCicle)-1)*7 + auxDay;
      this.acceso.getLiturgia("tempsAdventSetmanes", id, (result) => {
        this.queryRows.tempsAdventSetmanes = result;
        this.dataReceived(params);
      });
    }

    //taula 18.1 (#27): Ofici(18), Laudes(16), Vespres(15), HoraMenor(15)
    if(liturgicProps.LT === GLOBAL.A_SETMANES || liturgicProps.LT === GLOBAL.A_FERIES){
      c += 1;
      id = parseInt(liturgicProps.cicle);
      this.acceso.getLiturgia("tempsAdventSetmanesDium", id, (result) => {
        this.queryRows.tempsAdventSetmanesDium = result;
        this.dataReceived(params);
      });
    }

    //taula 18.2 (#27): Ofici(18), Laudes(16), Vespres(15), HoraMenor(15)
    if(liturgicProps.LT === GLOBAL.A_SETMANES || liturgicProps.LT === GLOBAL.A_FERIES || this.tomorrowCal === 'A'){
      c += 1;
      id = parseInt(liturgicProps.cicle) + 1;
      if(this.tomorrowCal === 'A') id=1;
      this.acceso.getLiturgia("tempsAdventSetmanesDium", id, (result) => {
        this.queryRows.tempsAdventSetmanesDiumVespres1 = result;
        this.dataReceived(params);
      });
    }

    //taula 19 (#28): Ofici(19), Laudes(17), Vespres(16), HoraMenor(16)
    if(liturgicProps.LT === GLOBAL.A_FERIES){
      c += 1;
      id = date.getDate()-16;
      this.acceso.getLiturgia("tempsAdventFeries", id, (result) => {
        this.queryRows.tempsAdventFeries = result;
        this.dataReceived(params);
      });
    }

    //taula 20 (#29): Ofici(20), Laudes(18), Vespres(17), HoraMenor(17)
    if(liturgicProps.LT === GLOBAL.N_OCTAVA && date.getDate() !== 25){
      c += 1;
      id = date.getDate()-25;
      this.acceso.getLiturgia("tempsNadalOctava", id, (result) => {
        this.queryRows.tempsNadalOctava = result;
        this.dataReceived(params);
      });
    }

    //taula 21 (#30): Ofici(21), Laudes(19), Vespres(18), HoraMenor(18)
    if(liturgicProps.LT === GLOBAL.N_ABANS){
      c += 1;
      {date.getDate() < 6 ? id = date.getDate()-1 : id = date.getDate()-2}
      this.acceso.getLiturgia("tempsNadalAbansEpifania", id, (result) => {
        this.queryRows.tempsNadalAbansEpifania = result;
        this.dataReceived(params);
      });
    }

    //taula 22 (#7): Ofici(22)
    if(liturgicProps.LT === GLOBAL.P_SETMANES){
      c += 1;
      id = 1;
      this.acceso.getLiturgia("salteriComuEspPasquaDium", id, (result) => {
        this.queryRows.salteriComuEspPasquaDium = result;
        this.dataReceived(params);
      });
    }

    //taula 23 (#?): Ofici(23), Laudes(20), Vespres(19), HoraMenor(19), Completes(1)
    if(true){
      c += 1;
      id = -1;
      this.acceso.getLiturgia("diversos", id, (result) => {
        this.queryRows.diversos = result;
        this.dataReceived(params);
      });
    }

    //taula 24 (#3): Laudes(21)
    if(liturgicProps.LT !== GLOBAL.Q_TRIDU && liturgicProps.LT !== GLOBAL.P_OCTAVA &&
      liturgicProps.LT !== GLOBAL.N_OCTAVA){
      c += 1;
      cicleAux = parseInt(liturgicProps.cicle);
      if(params.idTSF !== -1) {
        cicleAux = 1;
      }
      else {
        if(params.idTSF === 2) cicleAux = 2;
        if(celType === 'S' || celType === 'F') cicleAux = 1;
      }
      idLaudes = (cicleAux-1)*7 + (date.getDay()+1);
      this.acceso.getLiturgia("salteriComuLaudes", idLaudes, (result) => {
        this.queryRows.salteriComuLaudes = result;
        this.dataReceived(params);
      });
    }

    //taula 25 (#8): Laudes(22), Vespres(20)
    if(liturgicProps.LT === GLOBAL.P_SETMANES){
      c += 1;
      idLaudes = (parseInt(liturgicProps.cicle)-1)*6 + (date.getDay());
      this.acceso.getLiturgia("salteriComuEspPasqua", idLaudes, (result) => {
        this.queryRows.salteriComuEspPasqua = result;
        this.dataReceived(params);
      });
    }

    //taula 26.1 (#24): Laudes(23), Vespres(21)
    if(liturgicProps.LT === GLOBAL.P_SETMANES){
      c += 1;
      id = parseInt(liturgicProps.setmana)-1;
      if(id === 7) //diumenge de pentacosta. Apaño perquè no peti
        id = 6;
      this.acceso.getLiturgia("tempsPasquaSetmanesDium", id, (result) => {
        this.queryRows.tempsPasquaSetmanesDium = result;
        this.dataReceived(params);
      });
    }

    //taula 26.2 (#24): Laudes(23), Vespres(21)
    if(liturgicProps.LT === GLOBAL.P_SETMANES){
      c += 1;
      id = parseInt(liturgicProps.setmana);
      if(id === 7 || id === 8) //diumenge de pentacosta. Apaño perquè no peti
        id = 6;
      this.acceso.getLiturgia("tempsPasquaSetmanesDium", id, (result) => {
        this.queryRows.tempsPasquaSetmanesDiumVespres1 = result;
        this.dataReceived(params);
      });
    }

    //taula 27 (#19): Laudes(24), Vespres(22)
    if(liturgicProps.LT === GLOBAL.P_OCTAVA || liturgicProps.LT === GLOBAL.Q_DIUM_PASQUA){
      c += 1;
      id = 1;
      this.acceso.getLiturgia("tempsQuaresmaDiumPasq", id, (result) => {
        this.queryRows.tempsQuaresmaDiumPasq = result;
        this.dataReceived(params);
      });
    }

    //taula 28.1 (#13): Laudes(26), Vespres(23)
    if(liturgicProps.LT === GLOBAL.Q_SETMANES){
      c += 1;
      id = parseInt(liturgicProps.setmana);
      this.acceso.getLiturgia("tempsQuaresmaVSetmanesDium", id, (result) => {
        this.queryRows.tempsQuaresmaVSetmanesDium = result;
        this.dataReceived(params);
      });
    }

    //taula 28.2 (#13): Laudes(26), Vespres(23)
    if(liturgicProps.LT === GLOBAL.Q_SETMANES){
      c += 1;
      id = parseInt(liturgicProps.setmana) + 1;
      this.acceso.getLiturgia("tempsQuaresmaVSetmanesDium", id, (result) => {
        this.queryRows.tempsQuaresmaVSetmanesDiumVespres1 = result;
        this.dataReceived(params);
      });
    }

    //taula 29 (#5): Vespres(24)
    if(liturgicProps.LT !== GLOBAL.Q_TRIDU && liturgicProps.LT !== GLOBAL.P_OCTAVA){
      c += 1;
      { date.getDay() === 6 ? weekDayNormalVESPRES = 1 : weekDayNormalVESPRES = date.getDay() + 2 }
      var cicle = parseInt(liturgicProps.cicle);
      if(date.getDay() === 6){
        { cicle === 4 ? cicle = 1 : cicle += 1 }
      }
      if(this.tomorrowCal === 'A') cicle = 1;
      id = (cicle-1)*7 + weekDayNormalVESPRES;
      //console.log("ID----------------------------> weekDayNormalVESPRES: " + weekDayNormalVESPRES + ", liturgicProps.cicle: " + parseInt(liturgicProps.cicle) +", id: " + id);
      this.acceso.getLiturgia("salteriComuVespres", id, (result) => {
        this.queryRows.salteriComuVespres = result;
        this.dataReceived(params);
      });
    }

    //taula 30 (#31): -
    if(this.tomorrowCal === 'TSF' || params.idTSF !== -1 || liturgicProps.LT === GLOBAL.Q_TRIDU){
      c += 1;
      if(params.idTSF === -1){
        id = 1; //Només necessito Nadal (1) per N_OCTAVA
      }
      else{
        id = params.idTSF;
      }
      if(this.tomorrowCal === 'TSF') {
        id = this.idTSFTomorrow;
      }
      //console.log("OOOOOOOOOOO " + id);
      this.acceso.getLiturgia("tempsSolemnitatsFestes", id, (result) => {
        this.queryRows.tempsSolemnitatsFestes = result;
        this.dataReceived(params);
      });
    }

    //taula 31 (#4): HoraMenor(20)
    if(liturgicProps.LT !== GLOBAL.Q_TRIDU && liturgicProps.LT !== GLOBAL.P_OCTAVA){
      c += 1;
      id = (parseInt(liturgicProps.cicle)-1)*7 + (date.getDay()+1);
      this.acceso.getLiturgia("salteriComuHora", id, (result) => {
        this.queryRows.salteriComuHora = result;
        this.dataReceived(params);
      });
    }

    //taula 32 (#6): Completes(2)
    if(true){
      c += 1;
      {date.getDay() === 6 ? id = 1 : id = date.getDay() + 2}
      if(celType === 'S' || this.idTSF !== -1 || liturgicProps.LT === GLOBAL.P_OCTAVA) id = 2;
      this.acceso.getLiturgia("salteriComuCompletes", id, (result) => {
        this.queryRows.salteriComuCompletes = result;
        this.dataReceived(params);
      });
    }

    //taula 33 (#??): Ofici(24)
    if(idTF !== -1){
      c += 1;
      id = idTF;
      //console.log("salteriComuOficiTF");
      this.acceso.getLiturgia("salteriComuOficiTF", id, (result) => {
        this.queryRows.salteriComuOficiTF = result;
        this.dataReceived(params);
      });
    }

    //taula 34.1 (#32): - i //taula 36
    if(liturgicProps.LT !== GLOBAL.Q_DIUM_PASQUA && (this.tomorrowCal === 'S' || ((params.idTSF === -1 && params.idDE === -1) && (celType === 'S' || celType === 'F')))){
      c += 1;

      if(this.tomorrowCal === 'S' && dataTomorrow.mogut === '-') {
        if(celType === 'F'){
          var day = this.calculeDia(date, variables.mogut);
          this.acceso.getSolMem("santsSolemnitats", day, diocesi, variables.lloc, variables.diocesiName, this.liturgicProps.tempsespecific, (result) => {
            this.queryRows.santsSolemnitats = result;
            this.getOficisComuns(params, result);
          });
        }
        else{
          var day = this.calculeDia(this.dataTomorrow.date, '-');
          this.acceso.getSolMem("santsSolemnitats", day, diocesi, variables.lloc, variables.diocesiName, this.liturgicProps.tempsespecific, (result) => {
            this.queryRows.santsSolemnitats = result;
            this.getOficisComuns(params, result);
          });
        }
      }
      else{
        idDM = this.diesMov(date, liturgicProps.LT, liturgicProps.setmana, pentacosta, celType);
        console.log("idDM: " + idDM);
        if(idDM === -1){
          var day = this.calculeDia(date, variables.mogut);
          this.acceso.getSolMem("santsSolemnitats", day, diocesi, variables.lloc, variables.diocesiName, this.liturgicProps.tempsespecific, (result) => {
            this.queryRows.santsSolemnitats = result;
            this.getOficisComuns(params, result);
          });
        }
        else{
          this.acceso.getSolMemDiesMov("santsSolemnitats", idDM, (result) => {
            this.queryRows.santsSolemnitats = result;
            this.getOficisComuns(params, result);
          });
        }
      }
      //console.log("AAAAAAAAAAAAAAAAAAAAA: " + auxDate.getDate());
    }

    //taula 34.2 (#32): - i //taula 36
    if(this.tomorrowCal === 'S' && celType === 'F'){
      c += 1;
      console.log("santsSolemnitatsFVespres1");
      //TODO: conteplar dies movibles?
      var auxDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      auxDay.setDate(date.getDate()+1);
      var day = this.calculeDia(auxDay, '-');
      this.acceso.getSolMem("santsSolemnitats", day, diocesi, variables.lloc, variables.diocesiName, this.liturgicProps.tempsespecific, (result) => {
        this.queryRows.santsSolemnitatsFVespres1 = result;
        this.getOficisComuns(params, result);
      });
    }

    //taula 35 (#31): -  i //taula 36
    if(params.idTSF === -1 && (celType === 'M' || celType === 'L' || celType === 'V')){
      c += 1;

      idDM = this.diesMov(date, liturgicProps.LT, liturgicProps.setmana, pentacosta, 'S');
      console.log("idDM: " + idDM);


      if(celType === 'V' && idDM === -1){
        this.acceso.getV((result) => {
          this.queryRows.santsMemories = result;
          this.getOficisComuns(params, result);
        });
      }
      else{
        if(idDM === -1){
          var day = this.calculeDia(date, variables.mogut);
          this.acceso.getSolMem("santsMemories", day, diocesi, variables.lloc, variables.diocesiName, this.liturgicProps.tempsespecific, (result) => {
            this.queryRows.santsMemories = result;
            this.getOficisComuns(params, result);
          });
        }
        else{
          this.acceso.getSolMemDiesMov("santsMemories", idDM, (result) => {
            this.queryRows.santsMemories = result;
            this.getOficisComuns(params, result);
          });
        }
      }
    }

    //taula 37 (#?): -
    if(this.tomorrowCal === 'DE' || params.idDE !== -1){
      c += 1;
      id = params.idDE;
      if(this.tomorrowCal === 'DE') id = this.idDETomorrow;
      //console.log("UUUUUUUUUUUUUUUUUU: " + id);
      this.acceso.getLiturgia("diesespecials", id, (result) => {
        this.queryRows.diesespecials = result;
        this.dataReceived(params);
      });
    }

    this.count = c; //number of queryies
    console.log(c + " accessos.");
  }

  getOficisComuns(params, result){
    if(result){
      categoria = result.Categoria;
      console.log("Categoria: " + "." + categoria + ".");
      if(categoria !== '0000'){
        console.log("Més un accéss extra per OficisComuns");

        //taula 36 (#??): -
        this.acceso.getOC(categoria, (result) => {
          this.queryRows.OficisComuns = result; this.dataReceived(params);
        });
      }
      else{
        this.dataReceived(params);
      }
    }
    else { //Teòricament aquí van a parar aquelles Celebracions que no estaven contemplades
            //En teoria perquè s'han mogut per manternir les prioritats
            //Un exemple és Sant Jordi 2017. Pasa del dia 23 al 24 d'abril
      console.log("Error OC. No result from DB");
      params.HS.error();
      this.LITURGIA.info_cel.nomCel = '-';
      this.LITURGIA.info_cel.infoCel = '-';
      this.LITURGIA.info_cel.typeCel = '-';
      this.calls(params.HS);
    }
  }

  dataReceived(params){
    this.count -= 1;
    //console.log("Count: " + this.count);

    if(this.count === 0){
      if(this.firstAccessCel){
        this.firstAccessCel = false;
        this.CelebracioSoul = new CelebracioSoul(this.variables, params.liturgicProps,
          this.queryRows, params.idTSF, params.idDE, params.HS, this, params.llati, this.tomorrowCal);
      }
      else{
        this.CelebracioSoul.makePrayer(this.variables, params.liturgicProps, this.queryRows,
          params.idTSF, params.idDE, params.HS, this, params.llati, this.tomorrowCal);
      }
    }
  }

  setSoul(HS, type, pregaria){
    //console.log("COUNTLIT: " + this.countLit);
    switch (type) {
      case "ofici":
          this.countLit -= 1;
          this.LITURGIA.ofici = pregaria;
          console.log("setSoul OFICI");
        break;
      case "laudes":
          this.countLit -= 1;
          this.LITURGIA.laudes = pregaria;
          console.log("setSoul LAUDES");
        break;
      case "vespres":
          this.countLit -= 1;
          this.LITURGIA.vespres = pregaria;
          console.log("setSoul VESPRES");
        break;
      case "tercia":
          this.countLit -= 1;
          this.LITURGIA.tercia = pregaria;
          console.log("setSoul TERCIA");
        break;
      case "sexta":
          this.LITURGIA.sexta = pregaria;
          this.countLit -= 1;
          console.log("setSoul SEXTA");
        break;
      case "nona":
          this.countLit -= 1;
          this.LITURGIA.nona = pregaria;
          console.log("setSoul NONA");
        break;
      case "completes":
          this.countLit -= 1;
          this.LITURGIA.completes = pregaria;
          console.log("setSoul COMPLETES");
        break;
      case "celebracio":
        console.log("setSoul CELEBRACIO - " + pregaria.INFO_CEL.nomCel);
          this.CEL = pregaria;
          this.LITURGIA.info_cel = pregaria.INFO_CEL;

          this.calls(HS);
        break;
    }

    if(this.countLit === 0){
      this.countLit = 7;
      HS.setSoul(this.LITURGIA);
    }
  }

  calls(HS){
    this.setSomeInfo();

    console.log("calls");
    console.log("this.tomorrowCal: " + this.tomorrowCal);
    console.log("this.dataTomorrow.mogut: " + this.dataTomorrow.mogut);
    console.log("this.idTSF: " + this.idTSF);
    console.log("this.idDE: " + this.idDE);

    if(this.tomorrowCal === '-' || this.tomorrowCal === 'F' ||
      this.dataTomorrow.mogut !== '-' || this.idTSF !== -1 || this.idDE !== -1){
        console.log("calls vespres1 - 1");
        this.LITURGIA.vespres1 = false;
        vespresCelDEF = this.CEL.VESPRES;
        //console.log("Magdalena: " + this.CEL.VESPRES.himne + "\n\n......\n\n" + this.CEL.VESPRES1.himne);
    }
    else if(this.tomorrowCal === 'T'){
      console.log("calls vespres1 - 2");
      this.LITURGIA.vespres1 = false;
      vespresCelDEF = this.CEL.VESPRES1;
    }
    else{
      console.log("calls vespres1 - 3");
      this.LITURGIA.vespres1 = true;
      vespresCelDEF = this.CEL.VESPRES1;
    }

    if(this.firstAccess){
      this.firstAccess = false;
      this.OficiSoul = new OficiSoul(this.variables, this.liturgicProps,
        this.queryRows, this.CEL.OFICI, HS, this);
      this.LaudesSoul = new LaudesSoul(this.variables, this.liturgicProps,
        this.queryRows, this.CEL.LAUDES, HS, this);
      this.VespresSoul = new VespresSoul(this.variables, this.liturgicProps,
        this.queryRows, vespresCelDEF, HS, this);
      this.HoraMenorSoul = new HoraMenorSoul(this.variables, this.liturgicProps,
        this.queryRows, this.CEL.HORA_MENOR, HS, this);
      this.CompletesSoul = new CompletesSoul(this.variables, this.liturgicProps, this.queryRows, HS, this);
    }
    else{
      this.OficiSoul.makePrayer(this.variables.date, this.liturgicProps,
        this.queryRows, this.variables.invitatori, this.CEL.OFICI, this.variables.llati, HS, this);
      this.LaudesSoul.makePrayer(this.variables.date, this.liturgicProps,
        this.queryRows, this.variables.invitatori, this.CEL.LAUDES, this.variables.llati, HS, this);
      this.VespresSoul.makePrayer(this.variables.date, this.liturgicProps,
        this.queryRows, vespresCelDEF, this.variables.llati, HS, this);
      this.HoraMenorSoul.makePrayer(this.variables.date, this.liturgicProps,
        this.queryRows, this.CEL.HORA_MENOR, this.variables.llati, HS, this);
      this.CompletesSoul.makePrayer(this.variables.date, this.liturgicProps,
        this.queryRows, this.variables, HS, this);
    }
  }

  setSomeInfo(){
    if(this.liturgicProps.LT === GLOBAL.Q_DIUM_RAMS){
      this.LITURGIA.info_cel.nomCel = "Diumenge de Rams";
      this.LITURGIA.info_cel.infoCel = '-';
      this.LITURGIA.info_cel.typeCel = '-';
    }
    else if(this.LITURGIA.info_cel.nomCel === '-' && this.liturgicProps.LT === GLOBAL.Q_SET_SANTA){
      this.LITURGIA.info_cel.nomCel = "Setmana Santa";
      this.LITURGIA.info_cel.infoCel = '-';
      this.LITURGIA.info_cel.typeCel = '-';
    }
    else if(this.LITURGIA.info_cel.nomCel === '-' && this.liturgicProps.LT === GLOBAL.Q_TRIDU){
      this.LITURGIA.info_cel.nomCel = "Tridu Pasqual";
      this.LITURGIA.info_cel.infoCel = '-';
      this.LITURGIA.info_cel.typeCel = '-';
    }
    else if(this.LITURGIA.info_cel.nomCel === '-' && this.liturgicProps.LT === GLOBAL.P_OCTAVA){
      this.LITURGIA.info_cel.nomCel = "Octava de Pasqua";
      this.LITURGIA.info_cel.infoCel = '-';
      this.LITURGIA.info_cel.typeCel = '-';
    }
    else if(this.LITURGIA.info_cel.nomCel === '-' && this.liturgicProps.LT === GLOBAL.N_OCTAVA){
      this.LITURGIA.info_cel.nomCel = "Octava de Nadal";
      this.LITURGIA.info_cel.infoCel = '-';
      this.LITURGIA.info_cel.typeCel = '-';
    }
    else if(this.LITURGIA.info_cel.nomCel === '-' && this.liturgicProps.LT === GLOBAL.Q_CENDRA){
      this.LITURGIA.info_cel.nomCel = "Cendra";
      this.LITURGIA.info_cel.infoCel = '-';
      this.LITURGIA.info_cel.typeCel = '-';
    }
  }

  tomorrowCalVespres1CEL(date, LT, setmana, pentacosta, diocesi){
    if(LT !== GLOBAL.Q_DIUM_PASQUA){
      if(LT === GLOBAL.Q_DIUM_RAMS) return 'DR';

      if(date.getDay() === 5 && LT === GLOBAL.Q_TRIDU) return 'T';

      if(date.getDay() === 0 && setmana === '1' && LT === GLOBAL.A_SETMANES) return 'A';

      console.log("date1 " + date);

      this.idDETomorrow = this.findDiesEspecials(date, LT, setmana, pentacosta, diocesi);
      if(this.idDETomorrow !== -1 && this.idDETomorrow !== 1)
        return 'DE';

      this.idTSFTomorrow = this.findTempsSolemnitatsFestes(date, LT, setmana, pentacosta);
      if(this.idTSFTomorrow !== -1) {
        console.log("TOMORROW IS: " + this.idTSFTomorrow);
        return 'TSF';
      }

      if(this.dataTomorrow.celType === 'S') return 'S';
    }

    return '-';
  }

  /*
    Return id of #santsMemories or #santsSolemnitats or -1 if there isn't there
  */
  diesMov(date, LT, setmana, pentacosta, celType){
    console.log("diesMov " + celType);
    //santsMemories M - Dissabte de la tercera setmana després de Pentecosta (COR IMMACULAT DE LA BENAURADA VERGE MARIA)
    if(celType === 'M'){
      var corImmaculat = new Date(pentacosta.getFullYear(), pentacosta.getMonth(), pentacosta.getDate()+20);
      //console.log("corImmaculat: "+corImmaculat);
      if(date.getDate() === corImmaculat.getDate() && date.getMonth() === corImmaculat.getMonth() &&
          date.getFullYear() === corImmaculat.getFullYear())
          return 252;
    }

    //santsMemories M - Dissabte abans del primer diumenge de setembre (MARE DE DÉU DE LA CINTA)
    //santsSolemnitats S - Dissabte abans del primer diumenge de setembre (MARE DE DÉU DE LA CINTA)
    var auxDay = new Date(date.getFullYear(), 8, 2);
    var b = true;
    var dies = 0;
    while(b && dies < 7){
      if(auxDay.getDay()===0){
        b=false;
      }
      auxDay.setDate(auxDay.getDate()+1)
      dies += 1;
    }
    var cinta = new Date(date.getFullYear(), 8, dies);
    console.log(celType+" - CINTA: "+cinta);
    if(date.getDate() === cinta.getDate() && date.getMonth() === cinta.getMonth() &&
        date.getFullYear() === cinta.getFullYear()){
          if(celType === 'M') return 472;
          if(celType === 'S') return 83;
        }

    //santsSolemnitats F - Dijous després de Pentecosta (Jesucrist, gran sacerdot per sempre)
    if(celType === 'F'){
      var granSacerdot = new Date(pentacosta.getFullYear(), pentacosta.getMonth(), pentacosta.getDate()+4);
      //console.log("granSacerdot: "+granSacerdot);
      if(date.getDate() === granSacerdot.getDate() && date.getMonth() === granSacerdot.getMonth() &&
          date.getFullYear() === granSacerdot.getFullYear())
          return 58;
    }

    return -1;
  }

  /*
    Return id of #salteriComuOficiTF or -1 if there isn't there
  */
  findTF(date, LT, setmana, pentacosta){
    //1- Dissabte I Advent
    if(LT === GLOBAL.A_SETMANES && setmana === '1' && date.getDay() === 6){
      return 1;
    }

    //2- Dissabte II Advent
    if(LT === GLOBAL.A_SETMANES && setmana === '2' && date.getDay() === 6){
      return 2;
    }

    //3- Divendres IV Advent (si és el 23 de desembre)
    if(LT === GLOBAL.A_SETMANES && setmana === '4' && date.getDate() === 23 && date.getMonth() == 11 && date.getDay() == 5){
      return 3;
    }

    //4- Divendres IV Advent (si és el 24 de desembre)
    if(LT === GLOBAL.A_SETMANES && setmana === '4' && date.getDate() === 24 && date.getMonth() == 11 && date.getDay() == 5){
      return 4;
    }

    //5- Dissabte IV Advent (24 de desembre)
    if(LT === GLOBAL.A_SETMANES && setmana === '4' && date.getDate() === 24 && date.getMonth() == 11 && date.getDay() == 6){
      return 5;
    }

    //6- Dissabte I Nadal (si és el 2 de gener)
    if(LT === GLOBAL.N_ABANS && setmana === '1' && date.getDate() === 2 && date.getMonth() === 0 && date.getDay() == 6){
      return 6;
    }

    //7- Dissabte I Nadal (si és el 3 de gener)
    if(LT === GLOBAL.N_ABANS && setmana === '1' && date.getDate() === 3 && date.getMonth() === 0 && date.getDay() == 6){
      return 7;
    }

    //8- Dissabte I Nadal (si és el 4 de gener)
    if(LT === GLOBAL.N_ABANS && setmana === '1' && date.getDate() === 4 && date.getMonth() === 0 && date.getDay() == 6){
      return 8;
    }

    //9- Dissabte I Nadal (si és el 5 de gener)
    if(LT === GLOBAL.N_ABANS && setmana === '1' && date.getDate() === 5 && date.getMonth() === 0 && date.getDay() == 6){
      return 9;
    }

    //10- Dissabte II Nadal (si és el 7 de gener)
    if(LT === GLOBAL.N_ABANS && setmana === '2' && date.getDate() === 7 && date.getMonth() === 0 && date.getDay() == 6){
      return 10;
    }

    //11- Dissabte II Nadal (si és el 8 de gener)
    if(LT === GLOBAL.N_ABANS && setmana === '2' && date.getDate() === 8 && date.getMonth() === 0 && date.getDay() == 6){
      return 11;
    }

    //12- Dissabte II Nadal (si és el 9 de gener)
    if(LT === GLOBAL.N_ABANS && setmana === '2' && date.getDate() === 9 && date.getMonth() === 0 && date.getDay() == 6){
      return 12;
    }

    //13- Dissabte II Nadal (si és el 10 de gener)
    if(LT === GLOBAL.N_ABANS && setmana === '2' && date.getDate() === 10 && date.getMonth() === 0 && date.getDay() == 6){
      return 13;
    }

    //14- Dissabte II Nadal (si és el 11 de gener)
    if(LT === GLOBAL.N_ABANS && setmana === '2' && date.getDate() === 11 && date.getMonth() === 0 && date.getDay() == 6){
      return 14;
    }

    //15- Dissabte II Nadal (si és el 12 de gener)
    if(LT === GLOBAL.N_ABANS && setmana === '2' && date.getDate() === 12 && date.getMonth() === 0 && date.getDay() == 6){
      return 15;
    }

    //16- Divendres després de Cendra, Quaresma
    if(LT === GLOBAL.Q_CENDRA && date.getDay() === 5){
      return 16;
    }

    //17- Dissabte després de Cendra, Quaresma
    if(LT === GLOBAL.Q_CENDRA && date.getDay() === 6){
      return 17;
    }

    //18- Dissabte I Quaresma
    if(LT === GLOBAL.Q_SETMANES && setmana === '1' && date.getDay() === 6){
      return 18;
    }

    //19- Dissabte II Quaresma
    if(LT === GLOBAL.Q_SETMANES && setmana === '2' && date.getDay() === 6){
      return 19;
    }

    //20- Divendres IV Quaresma
    if(LT === GLOBAL.Q_SETMANES && setmana === '4' && date.getDay() === 5){
      return 20;
    }

    //21- Dissabte IV Quaresma
    if(LT === GLOBAL.Q_SETMANES && setmana === '4' && date.getDay() === 6){
      return 21;
    }

    //22- Dissabte V Quaresma
    if(LT === GLOBAL.Q_SETMANES && setmana === '5' && date.getDay() === 6){
      return 22;
    }

    //23- Dissabte II Pasqua
    if(LT === GLOBAL.P_SETMANES && setmana === '2' && date.getDay() === 6){
      return 23;
    }

    //24- Divendres IV Pasqua
    if(LT === GLOBAL.P_SETMANES && setmana === '4' && date.getDay() === 5){
      return 24;
    }

    //25- Dissabte IV Pasqua
    if(LT === GLOBAL.P_SETMANES && setmana === '4' && date.getDay() === 6){
      return 25;
    }

    //26- Dissabte V Pasqua
    if(LT === GLOBAL.P_SETMANES && setmana === '5' && date.getDay() === 6){
      return 26;
    }

    //27- Dissabte VI Pasqua
    if(LT === GLOBAL.P_SETMANES && setmana === '6' && date.getDay() === 6){
      return 27;
    }

    return -1;
  }

  /*
    Return id of #diesespecials or -1 if there isn't there
  */
  findDiesEspecials(date, LT, setmana, pentacosta, diocesi){
    //1- Sagrada Família quan és el 30 de desembre
    if(this.isSagradaFamilia(date) && date.getDate() === 30){
      return 1;
    }

    //2- Mare de Déu (1 gener) quan cau en diumenge
    if(date.getMonth() === 0 && date.getDate() === 1 && date.getDay() === 0){
      return 2;
    }

    var auxDay = new Date();
    auxDay.setFullYear(date.getFullYear());
    auxDay.setMonth(date.getMonth());
    auxDay.setDate(date.getDate()-7);

    //3- Diumenge II de Nadal, quan s’escau el dia 2 de gener
    if(this.isSagradaFamilia(auxDay) && date.getDate() === 2){
      return 3;
    }

    //4- Diumenge II de Nadal, quan s’escau el dia 3 de gener
    if(this.isSagradaFamilia(auxDay) && date.getDate() === 3){
      return 4;
    }

    //5- Diumenge II de Nadal, quan s’escau el dia 4 de gener
    if(this.isSagradaFamilia(auxDay) && date.getDate() === 4){
      return 5;
    }

    //6- Diumenge II de Nadal, quan s’escau el dia 5 de gener
    if(this.isSagradaFamilia(auxDay) && date.getDate() === 5){
      return 6;
    }

    //7- Baptisme del Senyor quan és 7 de gener
    if(this.isBaptisme(date) && date.getDate() === 7){
      return 7;
    }

    //8- Presentació del Senyor (2 febrer) quan cau en diumenge
    if(date.getMonth() === 1 && date.getDate() === 2 && date.getDay() === 0){
      return 8;
    }

    //9- Transfiguració del Senyor (6 agost) quan cau en diumenge
    if(date.getMonth() === 7 && date.getDate() === 6 && date.getDay() === 0){
      return 9;
    }

    //10- Exaltació Santa Creu (14 de setembre) quan cau en diumenge
    if(date.getMonth() === 8 && date.getDate() === 14 && date.getDay() === 0){
      return 10;
    }

    //11- Dedic. Sant Joan del Laterà (9 de novembre) quan cau en diumenge
    if(date.getMonth() === 10 && date.getDate() === 9 && date.getDay() === 0){
      return 11;
    }

    console.log("here1. " + diocesi + " " + date);
    //12- Santa Eulàlia (12 de febrer) quan cau en diumenge i és temps de durant l’any
    if((diocesi === 'BaV' || diocesi === 'BaC') && date.getMonth() === 1 &&
      date.getDate() === 12 && date.getDay() === 0 && LT === GLOBAL.O_ORDINARI){
        console.log("not here");
      return 12;
    }

    //13- Sant Joan (24 de juny) quan cau en diumenge
    if(date.getMonth() === 5 && date.getDate() === 24 && date.getDay() === 0){
      return 13;
    }

    //14- Sants Pere i Pau (29 de juny) quan cau en diumenge
    if(date.getMonth() === 5 && date.getDate() === 29 && date.getDay() === 0){
      return 14;
    }

    //15- Sant Jaume (25 de juliol) quan cau en diumenge
    if(date.getMonth() === 6 && date.getDate() === 25 && date.getDay() === 0){
      return 15;
    }

    //16- Assumpció Maria (15 d’agost) quan cau en diumenge
    if(date.getMonth() === 7 && date.getDate() === 15 && date.getDay() === 0){
      return 16;
    }

    //17- Sta. Tecla (23 setembre) quan cau en diumenge
    if((diocesi === 'TaV' || diocesi === 'TaD') && date.getMonth() === 8 &&
      date.getDate() === 23 && date.getDay() === 0){
      return 17;
    }

    //18- Mare de Déu de la Mercè (24 de setembre) quan cau en diumenge
    if((diocesi === 'BaD' || diocesi === 'SFD' || diocesi === 'TeD' ||
      diocesi === 'GiD' || diocesi === 'LlD' || diocesi === 'SoD' || diocesi === 'TaD'
       || diocesi === 'ToD' || diocesi === 'UrD' || diocesi === 'ViD') &&
      date.getMonth() === 8 && date.getDate() === 24 && date.getDay() === 0){
      return 18;
    }

    //19- Tots Sants (1 de novembre) quan cau en diumenge
    if(date.getMonth() === 10 && date.getDate() === 1 && date.getDay() === 0){
      return 19;
    }

    //20- Diumenge IV d’Advent, dia 18
    if(LT === GLOBAL.A_FERIES && setmana === '4' && date.getDate() === 18 && date.getDay() === 0){
      return 20;
    }

    //21- Diumenge IV d’Advent, dia 19
    if(LT === GLOBAL.A_FERIES && setmana === '4' && date.getDate() === 19 && date.getDay() === 0){
      return 21;
    }

    //22- Diumenge IV d’Advent, dia 20
    if(LT === GLOBAL.A_FERIES && setmana === '4' && date.getDate() === 20 && date.getDay() === 0){
      return 22;
    }

    //23- Diumenge IV d’Advent, dia 21
    if(LT === GLOBAL.A_FERIES && setmana === '4' && date.getDate() === 21 && date.getDay() === 0){
      return 23;
    }

    //24- Diumenge IV d’Advent, dia 22
    if(LT === GLOBAL.A_FERIES && setmana === '4' && date.getDate() === 22 && date.getDay() === 0){
      return 24;
    }

    //25- Diumenge IV d’Advent, dia 23
    //console.log("log: "  + LT);
    if(LT === GLOBAL.A_FERIES && setmana === '4' && date.getDate() === 23 && date.getDay() === 0){
      return 25;
    }

    //26- Diumenge IV d’Advent, dia 24
    if(LT === GLOBAL.A_FERIES && setmana === '4' && date.getDate() === 24 && date.getDay() === 0){
      return 26;
    }

    return -1;
  }

  /*
    Return id of #tempsSolemnitatsFestes or -1 if there isnt there
  */
  findTempsSolemnitatsFestes(date, LT, setmana, pentacosta){
    //1- Nadal
    if(date.getDate() === 25 && date.getMonth() === 11){
      return 1;
    }

    //2- Sagrada Família
    if(this.isSagradaFamilia(date)){
      return 2;
    }

    //3- Mare de Déu
    if(date.getDate() === 1 && date.getMonth() === 0){
      return 3;
    }

    //4- Epifania
    if(date.getDate() === 6 && date.getMonth() === 0){
      return 4;
    }

    //5- Baptisme
    if(this.isBaptisme(date)){
      return 5;
    }

    //6- Ascensió
    if(date.getDay() === 0 && LT === GLOBAL.P_SETMANES && setmana === '7'){
      return 6;
    }

    //7- Diumenge pentacosta
    //console.log('PENTACOSTA: ' + pentacosta.getDate()+'/'+pentacosta.getMonth()+'/'+pentacosta.getFullYear());
    if(date.getDate() === pentacosta.getDate() && date.getMonth() === pentacosta.getMonth() &&
        date.getFullYear() === pentacosta.getFullYear()){
      return 7;
    }

    //8- Santíssima trinitat
    var trinitat = new Date(pentacosta.getFullYear(), pentacosta.getMonth(), pentacosta.getDate()+7);
    //console.log('TRINITAT: ' + trinitat.getDate()+'/'+trinitat.getMonth()+'/'+trinitat.getFullYear());
    if(date.getDate() === trinitat.getDate() && date.getMonth() === trinitat.getMonth() &&
        date.getFullYear() === trinitat.getFullYear()){
      return 8;
    }

    //9- Santíssim cos i sang de crist
    var cosSang = new Date(trinitat.getFullYear(), trinitat.getMonth(), trinitat.getDate()+7);
    if(date.getDate() === cosSang.getDate() && date.getMonth() === cosSang.getMonth() &&
        date.getFullYear() === cosSang.getFullYear()){
      return 9;
    }

    //10- Sagrat cor de Jesús
    var sagratCor = new Date(cosSang.getFullYear(), cosSang.getMonth(), cosSang.getDate()+5);
    if(date.getDate() === sagratCor.getDate() && date.getMonth() === sagratCor.getMonth() &&
        date.getFullYear() === sagratCor.getFullYear()){
      return 10;
    }

    //11- Nostre senyor Jesucrist
    if(date.getDay() === 0 && LT === GLOBAL.O_ORDINARI && setmana === '34'){
      return 11;
    }

    return -1;
  }

  isSagradaFamilia(today){
    if(today.getMonth() !== 11) return false;
    if(today.getDay() !== 0) return false;
    if(today.getDate() < 26 || today.getDate() > 31) return false;
    return true;
  }

  isBaptisme(today){
    if(today.getMonth() !== 0) return false;
    if(today.getDay() !== 0) return false;
    if(today.getDate() < 7 || today.getDate() > 13) return false;
    return true;
  }

  calculeDia(date, mogut){
    if(mogut === '-'){
      switch (date.getMonth()) {
        case 0:
          mes = "ene";
          break;
        case 1:
          mes = "feb";
          break;
        case 2:
          mes = "mar";
          break;
        case 3:
          mes = "abr";
          break;
        case 4:
          mes = "may";
          break;
        case 5:
          mes = "jun";
          break;
        case 6:
          mes = "jul";
          break;
        case 7:
          mes = "ago";
          break;
        case 8:
          mes = "sep";
          break;
        case 9:
          mes = "oct";
          break;
        case 10:
          mes = "nov";
          break;
        case 11:
          mes = "dic";
          break;
      }
      if(date.getDate() < 10)
        dia = `0${date.getDate()}`;
      else dia = date.getDate();

      result = dia + "-" + mes;

      console.log("Dia NORMAL: " + result);
    }
    else{
      result = mogut;
      console.log("Dia MOGUT: " + result);
    }
    return result;
  }
}

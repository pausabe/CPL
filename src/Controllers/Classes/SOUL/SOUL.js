import OficiSoul from './OficiSoul';
import LaudesSoul from './LaudesSoul';
import VespresSoul from './VespresSoul';
import HoraMenorSoul from './HoraMenorSoul';
import CompletesSoul from './CompletesSoul';
import CelebracioSoul from './CelebracioSoul';
import DBAdapter from '../../../Adapters/DBAdapter';
import GLOBAL from '../../../Globals/Globals';
import GF from '../../../Globals/GlobalFunctions';

export default class SOUL {
  constructor(variables, liturgicProps, dataTomorrow, pentacosta, HS) {
    console.log("PlaceLog. Constructor SOUL");
    this.variables = variables;
    this.liturgicProps = liturgicProps;
    this.dataTomorrow = dataTomorrow;

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
      tempsSolemnitatsFestes: '', //30.1
      tempsSolemnitatsFestesVespres1: '', //30.2
      salteriComuHora: '', //31
      salteriComuCompletes: '', //32
      salteriComuOficiTF: '', //33
      santsSolemnitats: '', //34.1
      santsSolemnitatsFVespres1: '', //34.2
      santsMemories: '', //35
      OficisComuns: null, //36.1
      OficisComunsVespres1: null,
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
    console.log("PlaceLog. makeQueryies SOUL");

    celType = variables.celType;
    date = variables.date;
    this.LT = liturgicProps.LT;
    this.date = date;
    diocesi = variables.diocesi;
    invitatori = variables.invitatori;
    llati = variables.llati;


    this.prec = 22;
    if(date.getDay()===0){//diumenge
      this.prec = 9;
      if(liturgicProps.LT === GLOBAL.A_SETMANES ||
          liturgicProps.LT === GLOBAL.A_FERIES ||
          liturgicProps.LT === GLOBAL.Q_CENDRA ||
          liturgicProps.LT === GLOBAL.Q_SETMANES ||
          liturgicProps.LT === GLOBAL.Q_SET_SANTA ||
          liturgicProps.LT === GLOBAL.P_OCTAVA ||
          liturgicProps.LT === GLOBAL.P_SETMANES){
            this.prec = 2;
          }
    }
    console.log("InfoLog. Precedència inicial: "+this.prec);


    this.CT = celType;
    idDE_aux = this.findDiesEspecials(date, liturgicProps.LT, liturgicProps.setmana, pentacosta, variables.diocesi);
    this.idDE = idDE_aux;
    console.log("InfoLog. idDE_aux: " + idDE_aux);
    if(idDE_aux === -1)
      idTSF_aux = this.findTempsSolemnitatsFestes(date, liturgicProps.LT, liturgicProps.setmana, pentacosta);
    else idTSF_aux = -1;
    this.idTSF = idTSF_aux;
    console.log("InfoLog. idTSF_aux: " + idTSF_aux);
    var idTF = this.findTF(date, liturgicProps.LT, liturgicProps.setmana, pentacosta);
    console.log("InfoLog. idTF: " + idTF);

    this.tomorrowCal = '-';

    // console.log("this.dataTomorrow.date " + this.dataTomorrow.date);
    this.tomorrowCal = this.tomorrowCalVespres1CEL(this.dataTomorrow.date, this.dataTomorrow.LT,
      this.dataTomorrow.setmana, pentacosta, diocesi);

    console.log("InfoLog. tomorrowCal: " + this.tomorrowCal);

    params = {
      date: date,
      liturgicProps: liturgicProps,
      vespres1: false,
      celType: celType,
      diocesi: diocesi,
      invitatori: invitatori,
      llati: llati,
      idTSF: idTSF_aux,
      idDE: idDE_aux,
      HS: HS,
    }

    this.oficiComuCount = 0;

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
      // console.log("super day: " + date + " -> " + id);
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
          if(date.getDate() < 6){ id = 3; }
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
      //{date.getDay() === 6 ? auxDay = 1 : auxDay = date.getDay() + 2}
      auxCicle = liturgicProps.cicle;
      if(this.tomorrowCal === 'A'){
        auxCicle = 1;
        auxDay = 1;
      }
      if(liturgicProps.LT === GLOBAL.O_ORDINARI && dataTomorrow.LT === GLOBAL.A_SETMANES) id = 1;
      else id = (parseInt(auxCicle)-1)*7 + date.getDay()+2;
      // console.log("tempsAdventSetmanes ID " + id);
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
      if(date.getDate() === 1) id = 1; //poso 1 per posar algo, no importa. No llegirà res
      // console.log("im here");
      this.acceso.getLiturgia("tempsNadalOctava", id, (result) => {
        this.queryRows.tempsNadalOctava = result;
        // console.log("what? + " + result.ant1Ofici);
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
    if(liturgicProps.LT !== GLOBAL.Q_TRIDU && liturgicProps.LT !== GLOBAL.P_OCTAVA){
      c += 1;
      cicleAux = parseInt(liturgicProps.cicle);
      auxDay = date.getDay();
      if(params.idTSF !== -1 || celType === 'S' || celType === 'F' ||
        (date.getMonth() === 11 && (date.getDate() === 29 || date.getDate() === 30 || date.getDate() === 31)) ||
        (date.getMonth() === 0 && date.getDate() === 6)) {
          cicleAux = 1;
          auxDay = 0;
      }
      else if(params.idTSF === 2) cicleAux = 2;
      idLaudes = (cicleAux-1)*7 + (auxDay+1);
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
    if(liturgicProps.LT === GLOBAL.Q_SETMANES || liturgicProps.LT === GLOBAL.Q_CENDRA){
      c += 1;
      if(liturgicProps.LT === GLOBAL.Q_CENDRA) id = 1;
      else id = parseInt(liturgicProps.setmana) + 1;
      // console.log("hello?1");
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

    //taula 30.1 (#31): -
    if(/*this.tomorrowCal === 'TSF' ||*/ params.idTSF !== -1 || liturgicProps.LT === GLOBAL.Q_TRIDU || liturgicProps.LT === GLOBAL.N_OCTAVA){
      c += 1;
      // console.log("hereeee1");
      if(params.idTSF === -1 && liturgicProps.LT === GLOBAL.N_OCTAVA){
        id = 1; //Només necessito Nadal (1) per N_OCTAVA
      }
      else{
        id = params.idTSF;
      }
      // console.log("OOOOOOOOOOO1 " + id);
      this.acceso.getLiturgia("tempsSolemnitatsFestes", id, (result) => {
        this.queryRows.tempsSolemnitatsFestes = result;
        this.dataReceived(params);
      });
    }

    //taula 30.2 (#31): -
    if(this.tomorrowCal === 'TSF' || params.idTSF !== -1 || liturgicProps.LT === GLOBAL.Q_TRIDU || liturgicProps.LT === GLOBAL.N_OCTAVA){
      c += 1;
      if(params.idTSF === -1 && liturgicProps.LT === GLOBAL.N_OCTAVA){
        id = 1; //Només necessito Nadal (1) per N_OCTAVA
      }
      else{
        id = params.idTSF;
      }
      if(this.tomorrowCal === 'TSF') {
        id = this.idTSFTomorrow;
      }
      this.acceso.getLiturgia("tempsSolemnitatsFestes", id, (result) => {
        this.queryRows.tempsSolemnitatsFestesVespres1 = result;
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
      if((dataTomorrow.LT === GLOBAL.Q_DIUM_PASQUA || this.tomorrowCal === 'TSF' || this.tomorrowCal === 'S') && !(date.getDay() === 6 || date.getDay() === 0)) id = 8;
      if((celType === 'S' || this.idTSF !== -1) && !(date.getDay() === 6 || date.getDay() === 0)) id = 9;
      if(liturgicProps.LT === GLOBAL.P_OCTAVA) id = 2;
      if(liturgicProps.LT === GLOBAL.N_OCTAVA) id = 9;
      if(liturgicProps.LT === GLOBAL.Q_SET_SANTA && !(date.getDay() === 4 || date.getDay() === 5 || date.getDay() === 6)) id = 9;
      // console.log("COMPLETES ID: " + id);
      this.acceso.getLiturgia("salteriComuCompletes", id, (result) => {
        this.queryRows.salteriComuCompletes = result;
        this.dataReceived(params);
      });
    }

    //taula 33 (#??): Ofici(24)
    if(idTF !== -1){
      c += 1;
      id = idTF;
      // console.log("salteriComuOficiTF");
      this.acceso.getLiturgia("salteriComuOficiTF", id, (result) => {
        this.queryRows.salteriComuOficiTF = result;
        this.queryRows.salteriComuOficiTF.com2 = '-';
        this.queryRows.salteriComuOficiTF.com3 = '-';
        this.dataReceived(params);
      });
    }
    else{
      this.queryRows.salteriComuOficiTF = '';
    }

    //taula 34.1 (#32): - i //taula 36 (today)
    if(liturgicProps.LT !== GLOBAL.Q_DIUM_PASQUA && (((params.idTSF === -1 && params.idDE === -1) && (celType === 'S' || celType === 'F')))){
      console.log("Log#32. Inici: avui no és Q_DIUM_PASQUA i (avui no és TSF ni DE i avui és o S o F)");
      c += 1;

      idDM = this.diesMov(date, liturgicProps.LT, liturgicProps.setmana, pentacosta, celType);
      console.log("Log#32. idDM avui: " + idDM);
      if(idDM === -1){
        console.log("Log#32. Avui no és dia movible");
        var day = this.calculeDia(date, diocesi, variables.diaMogut, variables.diocesiMogut);
        console.log("Log#32. day: " + day);
        this.acceso.getSolMem("santsSolemnitats", day, diocesi, variables.lloc, variables.diocesiName, this.liturgicProps.tempsespecific, (result) => {
        this.queryRows.santsSolemnitats = result;
        this.getOficisComuns(params, result, false);
        });
      }
      else{
        console.log("Log#32. Avui és dia movible");
        this.acceso.getSolMemDiesMov("santsSolemnitats", idDM, (result) => {
          this.queryRows.santsSolemnitats = result;
          this.getOficisComuns(params, result, false);
        });
      }
    }

    //taula 34.2 (#32): - i //taula 36 (tomorrow!)
    if(this.tomorrowCal === 'S'){
      c += 1;
      console.log("Log#32. [Extra] Demà cal S i avui és diumenge de precedència menor a la S");
      idDM = this.diesMov(this.dataTomorrow.date, this.dataTomorrow.LT, this.dataTomorrow.setmana, pentacosta, this.dataTomorrow.celType);
      console.log("Log#32. [Extra] idDM de demà: " + idDM);
      if(idDM !== -1){
        console.log("Log#32. [Extra] Demà hi ha dia movible");
        params.vespres1 = true;
        this.acceso.getSolMemDiesMov("santsSolemnitats", idDM, (result) => {
          this.queryRows.santsSolemnitatsFVespres1 = result;
          this.getOficisComuns(params, result, true);
        });
      }
      else{
        console.log("Log#32. [Extra] Demà no hi ha dia movible");
        var day = '-';
        if(this.dataTomorrow.diaMogut !== '-' && this.isDiocesiMogut(diocesi, this.dataTomorrow.diocesiMogut))
          day = this.dataTomorrow.diaMogut;

        if(day === '-'){
          console.log("Log#32. [Extra] Demà no hi ha mogut i cal fer uns ajustaments");
          var auxDay = new Date();
          auxDay.setFullYear(date.getFullYear());
          auxDay.setMonth(date.getMonth());
          auxDay.setDate(date.getDate()+1);
          day = this.calculeDia(auxDay, diocesi, '-', '-');
        }
        console.log("Log#32. [Extra] day definitiu: " + day);
        params.vespres1 = true;
        this.acceso.getSolMem("santsSolemnitats", day, diocesi, variables.lloc, variables.diocesiName, this.liturgicProps.tempsespecific, (result) => {
          this.queryRows.santsSolemnitatsFVespres1 = result;
          this.getOficisComuns(params, result, true);
        });
      }
    }

    //taula 35 (#31): -  i //taula 36
    if(params.idTSF === -1 && (celType === 'M' || celType === 'L' || celType === 'V')){
      c += 1;

      idDM = this.diesMov(date, liturgicProps.LT, liturgicProps.setmana, pentacosta, celType);

      if(celType === 'V' && idDM === -1){
        this.acceso.getV((result) => {
          this.queryRows.santsMemories = result;
          this.getOficisComuns(params, result, false);
        });
      }
      else{
        if(idDM === -1){
          var day = this.calculeDia(date, diocesi, variables.diaMogut, variables.diocesiMogut);
          this.acceso.getSolMem("santsMemories", day, diocesi, variables.lloc, variables.diocesiName, this.liturgicProps.tempsespecific, (result) => {
            this.queryRows.santsMemories = result;
            this.getOficisComuns(params, result, false);
          });
        }
        else{
          this.acceso.getSolMemDiesMov("santsMemories", idDM, (result) => {
            this.queryRows.santsMemories = result;
            this.getOficisComuns(params, result, false);
          });
        }
      }
    }

    //taula 37 (#?): -
    if(this.tomorrowCal === 'DE' || params.idDE !== -1){
      c += 1;
      id = params.idDE;
      if(this.tomorrowCal === 'DE') id = this.idDETomorrow;
      this.acceso.getLiturgia("diesespecials", id, (result) => {
        this.queryRows.diesespecials = result;
        this.dataReceived(params);
      });
    }

    this.count = c; //number of queryies
    console.log("InfoLog. " + c + " accessos.");
  }

  getOficisComuns(params, result, isForVespres1){
    if(result){
      categoria = result.Categoria;
      console.log("InfoLog. Categoria: " + "." + categoria + ". ["+isForVespres1+"]");

      if(categoria !== '0000'){
        console.log("InfoLog. Més un accéss extra per OficisComuns");
        //taula 36 (#??): -
        this.acceso.getOC(categoria, (result, cat) => {
          if(params.vespres1 && isForVespres1){
            this.queryRows.OficisComunsVespres1 = result;
            // console.log("oficis comuns log 1 - " + cat);
          }
          else {
            this.queryRows.OficisComuns = result;
            // console.log("oficis comuns log 2 - " + cat);
          }
          this.dataReceived(params);
        });
      }

      else{
        this.dataReceived(params);
      }

    }
    else {
      console.log("InfoLog. Error OC. No result from DB");
      params.HS.error();
      this.creatingEmptyCEL();
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
    switch (type) {
      case "ofici":
          this.countLit -= 1;
          this.LITURGIA.ofici = pregaria;
        break;
      case "laudes":
          this.countLit -= 1;
          this.LITURGIA.laudes = pregaria;
        break;
      case "vespres":
          this.countLit -= 1;
          this.LITURGIA.vespres = pregaria;
        break;
      case "tercia":
          this.countLit -= 1;
          this.LITURGIA.tercia = pregaria;
        break;
      case "sexta":
          this.LITURGIA.sexta = pregaria;
          this.countLit -= 1;
        break;
      case "nona":
          this.countLit -= 1;
          this.LITURGIA.nona = pregaria;
        break;
      case "completes":
          this.countLit -= 1;
          this.LITURGIA.completes = pregaria;
        break;
      case "celebracio":
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

    console.log("PlaceLog. Calls");

    if(
        this.tomorrowCal === '-' || //demà no hi ha cap celebració
        this.tomorrowCal === 'F' || //demà hi ha Festa
        /*(this.dataTomorrow.diaMogut !== '-' && this.isDiocesiMogut(diocesi, this.dataTomorrow.diocesiMogut)) ||*/ //demà és mogut
        (this.idTSF !== -1 && this.tomorrowCal !== 'TSF') || //quan dues TSF seguides es fa Vespres1 de la segona TSF. Basicamen evito el conflicte de les Vespres de Sagrada Familia quan cau en 31/12 i l'andemà és Mare de Déi 1/1 (únic conflicte possible entre TSF)
        (this.idDE !== -1 && this.tomorrowCal === '-') || //avui és DE i demà no hi ha celebració
        (this.date.getDay()===0 && this.tomorrowCal==='S' && this.LT!==GLOBAL.O_ORDINARI) //Amb això generalitzo que DiumengeOrdinari>S i potser no és així
      )
    {
      console.log("InfoLog. Calls vespres1 - 1");
      this.LITURGIA.vespres1 = false;
      vespresCelDEF = this.CEL.VESPRES;
    }
    else if(this.tomorrowCal === 'T'){ //demà és divendres Sant
      console.log("InfoLog. Calls vespres1 - 2");
      this.LITURGIA.vespres1 = false;
      vespresCelDEF = this.CEL.VESPRES1;
    }
    else{
      console.log("InfoLog. Calls vespres1 - 3");
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
      this.LITURGIA.info_cel.nomCel = this.weekDayName(this.variables.date.getDay()) + " Sant";
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
    else if(this.LITURGIA.info_cel.nomCel === '-'
      && this.liturgicProps.LT === GLOBAL.N_OCTAVA
      && this.idTSF === -1 && this.idDE === -1){
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

  weekDayName(num){
    switch (num) {
      case 0:
        return("Diumenge");
        break;
      case 1:
        return("Dilluns");
        break;
      case 2:
        return("Dimarts");
        break;
      case 3:
        return("Dimecres");
        break;
      case 4:
        return("Dijous");
        break;
      case 5:
        return("Divendres");
        break;
      case 6:
        return("Dissabte");
        break;
    }
  }

  tomorrowCalVespres1CEL(date, LT, setmana, pentacosta, diocesi){
    console.log("PlaceLog. tomorrowCalVespres1CEL");
    // console.log("InfoLog. pentacosta: " + pentacosta);
    if(LT !== GLOBAL.Q_DIUM_PASQUA){
      console.log("InfoLog. tomorrowCalVespres1CEL: No és dium pasqua");
      if(LT === GLOBAL.Q_DIUM_RAMS) return 'DR';

      console.log("InfoLog. tomorrowCalVespres1CEL: No és dium rams");

      if(date.getDay() === 5 && LT === GLOBAL.Q_TRIDU) return 'T';

      console.log("InfoLog. tomorrowCalVespres1CEL: No és tridu");

      if(date.getDay() === 0 && setmana === '1' && LT === GLOBAL.A_SETMANES) return 'A';

      console.log("InfoLog. tomorrowCalVespres1CEL: No és dium de set 1 d'advent");

      // console.log("date1 " + date);

      this.idDETomorrow = this.findDiesEspecials(date, LT, setmana, pentacosta, diocesi);
      if(this.idDETomorrow !== -1 && this.idDETomorrow !== 1)
        return 'DE';

      console.log("InfoLog. tomorrowCalVespres1CEL: No és dia especial");

      this.idTSFTomorrow = this.findTempsSolemnitatsFestes(date, LT, setmana, pentacosta);
      console.log("InfoLog. tomorrowCalVespres1CEL: TOMORROW IS: " + this.idTSFTomorrow);
      if(this.idTSFTomorrow !== -1) {
        return 'TSF';
      }

      console.log("InfoLog. tomorrowCalVespres1CEL: No és TSF.. per tan és S (si demà realment és S)");

      if(this.dataTomorrow.celType === 'S') return 'S';
    }
    console.log("InfoLog. tomorrowCalVespres1CEL: És dium pasqua o demà no és re (ni S)");

    return '-';
  }

  /*
    Return id of #santsMemories or #santsSolemnitats or -1 if there isn't there
  */
  diesMov(date, LT, setmana, pentacosta, celType){
    //santsMemories M - Dissabte de la tercera setmana després de Pentecosta (COR IMMACULAT DE LA BENAURADA VERGE MARIA)
    if(celType === 'M'){
      var corImmaculat = new Date(pentacosta.getFullYear(), pentacosta.getMonth(), pentacosta.getDate()+20);
      console.log("corImmaculat: "+corImmaculat);
      if(date.getDate() === corImmaculat.getDate() && date.getMonth() === corImmaculat.getMonth() &&
          date.getFullYear() === corImmaculat.getFullYear()){
          var precAux = 10;
          if(precAux<this.prec) this.prec = precAux;
          return 252;
        }
    }

    //santsMemories M - Dissabte abans del primer diumenge de setembre (MARE DE DÉU DE LA CINTA)
    //santsSolemnitats S - Dissabte abans del primer diumenge de setembre (MARE DE DÉU DE LA CINTA)
    var auxDay = new Date();
    auxDay.setFullYear(date.getFullYear());
    auxDay.setMonth(8);
    auxDay.setDate(2);
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
    if(date.getDate() === cinta.getDate() && date.getMonth() === cinta.getMonth() &&
        date.getFullYear() === cinta.getFullYear()){
          if(celType === 'M') {
            var precAux = 10;
            if(precAux<this.prec) this.prec = precAux;
            return 472;
          }
          if(celType === 'S') {
            var precAux = 4;
            if(precAux<this.prec) this.prec = precAux;
            return 77;
          }
        }

    //santsSolemnitats F - Dijous després de Pentecosta (Jesucrist, gran sacerdot per sempre)
    if(celType === 'F'){
      var granSacerdot = new Date(pentacosta.getFullYear(), pentacosta.getMonth(), pentacosta.getDate()+4);
      console.log("InfoLog. granSacerdot: "+granSacerdot);
      if(date.getDate() === granSacerdot.getDate() && date.getMonth() === granSacerdot.getMonth() &&
          date.getFullYear() === granSacerdot.getFullYear()){
            var precAux = 8;
            if(precAux<this.prec) this.prec = precAux;
            return 52;
          }
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

    // console.log("here1. " + diocesi + " " + date);
    //12- Santa Eulàlia (12 de febrer) quan cau en diumenge i és temps de durant l’any
    if((diocesi === 'BaV' || diocesi === 'BaC') && date.getMonth() === 1 &&
      date.getDate() === 12 && date.getDay() === 0 && LT === GLOBAL.O_ORDINARI){
        // console.log("not here");
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

    //27- Diumenge III d'Advent, quan és fèria
    if(LT === GLOBAL.A_FERIES && setmana === '3' && date.getDay() === 0){
      return 27;
    }

    return -1;
  }

  /*
    Return id of #tempsSolemnitatsFestes or -1 if there isnt there
  */
  findTempsSolemnitatsFestes(date, LT, setmana, pentacosta){
    console.log("PlaceLog. findTempsSolemnitatsFestes");
    console.log("InfoLog. pentacosta: " + pentacosta);
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

  isDiocesiMogut(diocesi, diocesiMogut){
    if(!diocesi || diocesi === '' || diocesiMogut === '-' || diocesi === undefined)
      return false;
    if(diocesiMogut === '*') return true;
    if(diocesi === diocesiMogut) return true;
    if(diocesi.charAt(0) === diocesiMogut.charAt(0) &&
       diocesi.charAt(1) === diocesiMogut.charAt(1))
       return true;
    return false;
  }

  calculeDia(date, diocesi, diaMogut, diocesiMogut){
    if(diaMogut !== '-' && this.isDiocesiMogut(diocesi, diocesiMogut))
      return diaMogut;

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
    return result;
  }

  creatingEmptyCEL(){
    this.INFO_CEL = {
      nomCel: '-',
      infoCel: '-',
      typeCel: '-',
    }

    this.OFICI = { //60
      diumPasqua: false,
      invitatori: '-',
      antInvitatori: '-',
      salm94: '-',
      himne: '-',
      ant1: '-',
      titol1: '-',
      com1: '-',
      salm1: '-',
      gloria1: '-',
      ant2: '-',
      titol2: '-',
      com2: '-',
      salm2: '-',
      gloria2: '-',
      ant3: '-',
      titol3: '-',
      com3: '-',
      salm3: '-',
      gloria3: '-',
      respV: '-',
      respR: '-',
      referencia1: '-',
      cita1: '-',
      titolLectura1: '-',
      lectura1: '-',
      citaResp1: '-',
      resp1Part1: '-',
      resp1Part2: '-',
      resp1Part3: '-',
      referencia2: '-',
      cita2: '-',
      titolLectura2: '-',
      lectura2: '-',
      versResp2: '-',
      resp2Part1: '-',
      resp2Part2: '-',
      resp2Part3: '-',
      referencia3: '-',
      cita3: '-',
      titolLectura3: '-',
      lectura3: '-',
      versResp3: '-',
      resp3Part1: '-',
      resp3Part2: '-',
      resp3Part3: '-',
      referencia4: '-',
      cita4: '-',
      titolLectura4: '-',
      lectura4: '-',
      versResp4: '-',
      resp4Part1: '-',
      resp4Part2: '-',
      resp4Part3: '-',
      himneOhDeu: '-',
      himneOhDeuBool: '-',
      oracio: '-',
      oracio1: '-',
      oracio2: '-',
      oracio3: '-',
    }

    this.LAUDES = { //31
      diumPasqua: false,
      invitatori: '-',
      antInvitatori: '-',
      salm94: '-',
      himne: '-',
      ant1: '-',
      titol1: '-',
      com1: '-',
      salm1: '-',
      gloria1: '-',
      ant2: '-',
      titol2: '-',
      com2: '-',
      salm2: '-',
      gloria2: '-',
      ant3: '-',
      titol3: '-',
      com3: '-',
      salm3: '-',
      gloria3: '-',
      vers: '-',
      lecturaBreu: '-',
      calAntEspecial: '-',
      antEspecialLaudes: '-',
      respBreu1: '-',
      respBreu2: '-',
      respBreu3: '-',
      cantic: '-',
      antCantic: '-',
      pregaries: '-',
      oracio: '-',
    }

    this.TERCIA = { //24
      diumPasqua: false,
      himne: '-',
      antifones: '-',
      ant: '-',
      ant1: '-',
      titol1: '-',
      com1: '-',
      salm1: '-',
      gloria1: '-',
      ant2: '-',
      titol2: '-',
      com2: '-',
      salm2: '-',
      gloria2: '-',
      ant3: '-',
      titol3: '-',
      com3: '-',
      salm3: '-',
      gloria3: '-',
      vers: '-',
      lecturaBreu: '-',
      respV: '-',
      respR: '-',
      oracio: '-',
    }

    this.SEXTA = { //24
      diumPasqua: false,
      himne: '-',
      antifones: '-',
      ant: '-',
      ant1: '-',
      titol1: '-',
      com1: '-',
      salm1: '-',
      gloria1: '-',
      ant2: '-',
      titol2: '-',
      com2: '-',
      salm2: '-',
      gloria2: '-',
      ant3: '-',
      titol3: '-',
      com3: '-',
      salm3: '-',
      gloria3: '-',
      vers: '-',
      lecturaBreu: '-',
      respV: '-',
      respR: '-',
      oracio: '-',
    }

    this.NONA = { //24
      diumPasqua: false,
      himne: '-',
      antifones: '-',
      ant: '-',
      ant1: '-',
      titol1: '-',
      com1: '-',
      salm1: '-',
      gloria1: '-',
      ant2: '-',
      titol2: '-',
      com2: '-',
      salm2: '-',
      gloria2: '-',
      ant3: '-',
      titol3: '-',
      com3: '-',
      salm3: '-',
      gloria3: '-',
      vers: '-',
      lecturaBreu: '-',
      respV: '-',
      respR: '-',
      oracio: '-',
    }

    this.VESPRES1 = { //28
      diumPasqua: false,
      himne: '-',
      ant1: '-',
      titol1: '-',
      com1: '-',
      salm1: '-',
      gloria1: '-',
      ant2: '-',
      titol2: '-',
      com2: '-',
      salm2: '-',
      gloria2: '-',
      ant3: '-',
      titol3: '-',
      com3: '-',
      salm3: '-',
      gloria3: '-',
      vers: '-',
      lecturaBreu: '-',
      calAntEspecial: '-',
      antEspecialVespres: '-',
      respBreu1: '-',
      respBreu2: '-',
      respBreu3: '-',
      cantic: '-',
      antCantic: '-',
      pregaries: '-',
      oracio: '-',
    }

    this.VESPRES = { //28
      diumPasqua: false,
      himne: '-',
      ant1: '-',
      titol1: '-',
      com1: '-',
      salm1: '-',
      gloria1: '-',
      ant2: '-',
      titol2: '-',
      com2: '-',
      salm2: '-',
      gloria2: '-',
      ant3: '-',
      titol3: '-',
      com3: '-',
      salm3: '-',
      gloria3: '-',
      vers: '-',
      lecturaBreu: '-',
      calAntEspecial: '-',
      antEspecialVespres: '-',
      respBreu1: '-',
      respBreu2: '-',
      respBreu3: '-',
      cantic: '-',
      antCantic: '-',
      pregaries: '-',
      oracio: '-',
    }

    this.COMPLETES = { //24
      himneLlati: '-',
      himneCat: '-',
      antifones: '-',
      ant1: '-',
      titol1: '-',
      com1: '-',
      salm1: '-',
      gloria1: '-',
      ant2: '-',
      titol2: '-',
      com2: '-',
      salm2: '-',
      gloria2: '-',
      vers: '-',
      lecturaBreu: '-',
      antRespEspecial: '-',
      respBreu1: '-',
      respBreu2: '-',
      respBreu3: '-',
      respV: '-',
      respR: '-',
      antCantic: '-',
      cantic: '-',
      oracio: '-',
      antMare: '-',
    }

    this.CEL = {
      INFO_CEL: this.INFO_CEL,
      OFICI: this.OFICI,
      LAUDES: this.LAUDES,
      HORA_MENOR: {
        TERCIA: this.TERCIA,
        SEXTA: this.SEXTA,
        NONA: this.NONA,
      },
      VESPRES: this.VESPRES,
      VESPRES1: this.VESPRES1,
      COMPLETES: this.COMPLETES,
    }
  }
}

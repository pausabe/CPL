import OficiSoul from '../Components/OficiSoul';
import LaudesSoul from '../Components/LaudesSoul';
import DBAdapter from '../SQL/DBAdapter';

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

export default class SOUL {
  constructor(props, HS) {
    this.props = props;

    this.state = {
      nit: null,
      salteriComuOfici: '',
      salteriComuInvitatori: '',
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
      diversos: '',
      salteriComuLaudes: '',
      tempsPasquaSetmanesDium: '',
      tempsQuaresmaDiumPasq: '',
      tempsQuaresmaVSetmanesDium: '',
    }

    this.queryRows = {
      salteriComuOfici: '',
      salteriComuInvitatori: '',
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
      diversos: '',
      salteriComuLaudes: '',
      salteriComuEspPasqua: '',
      tempsPasquaSetmanesDium: '',
      tempsQuaresmaDiumPasq: '',
      tempsQuaresmaVSetmanesDium: '',
    }

    this.countLit = 2;
    this.LITURGIA = { //2
      ofici: null,
      laudes: null,
    }

    {props.weekDay === 0 ? weekDayNormal = 7 : weekDayNormal = props.weekDay}

    acceso = new DBAdapter();

    //taula 1: Ofici
    id = (props.cicle-1)*7 + (props.weekDay+1);
    acceso.getLiturgia("salteriComuOfici", id, (result) => { this.queryRows.salteriComuOfici = result; this.dataReceived(HS, SOUL); });

    //taula 2: Ofici, Laudes
    id = (props.cicle-1)*7 + (props.weekDay+1);
    acceso.getLiturgia("salteriComuInvitatori", id, (result) => { this.queryRows.salteriComuInvitatori = result; this.dataReceived(HS, SOUL); });

    //taula 3: Ofici
    id = (props.setmana-1)*7  + (props.weekDay+1);
    acceso.getLiturgia("tempsOrdinariOfici", id, (result) => { this.queryRows.tempsOrdinariOfici = result; this.dataReceived(HS, SOUL); });

    //taula 4: Ofici, Laudes
    id = props.setmana;
    acceso.getLiturgia("tempsOrdinariOracions", id, (result) => { this.queryRows.tempsOrdinariOracions = result; this.dataReceived(HS, SOUL); });

    //taula 5: Ofici, Laudes
    id = 1;
    acceso.getLiturgia("tempsQuaresmaComuFV", id, (result) => { this.queryRows.tempsQuaresmaComuFV = result; this.dataReceived(HS, SOUL); });

    //taula 6: Ofici, Laudes
    id = props.weekDay-2; //dimecres = 1, dijous = 2, ...
    acceso.getLiturgia("tempsQuaresmaCendra", id, (result) => { this.queryRows.tempsQuaresmaCendra = result; this.dataReceived(HS, SOUL); });

    //taula 7: Ofici, Laudes
    id = (props.setmana-1)*7 + (props.weekDay+1);
    acceso.getLiturgia("tempsQuaresmaVSetmanes", id, (result) => { this.queryRows.tempsQuaresmaVSetmanes = result; this.dataReceived(HS, SOUL); });

    //taula 8: Ofici, Laudes
    id = 1;
    acceso.getLiturgia("tempsQuaresmaComuSS", id, (result) => { this.queryRows.tempsQuaresmaComuSS = result; this.dataReceived(HS, SOUL); });

    //taula 9: Ofici, Laudes
    id = 1;
    acceso.getLiturgia("tempsQuaresmaRams", id, (result) => { this.queryRows.tempsQuaresmaRams = result; this.dataReceived(HS, SOUL); });

    //taula 10: Ofici, Laudes
    id = props.weekDay; //dilluns = 1, dimarts = 2, dimecres = 3 i dijous = 4
    acceso.getLiturgia("tempsQuaresmaSetSanta", id, (result) => { this.queryRows.tempsQuaresmaSetSanta = result; this.dataReceived(HS, SOUL); });

    //taula 11: Ofici, Laudes
    id = props.weekDay-3; //dijous = 1, divendres = 2 i dissabte = 3
    acceso.getLiturgia("tempsQuaresmaTridu", id, (result) => { this.queryRows.tempsQuaresmaTridu = result; this.dataReceived(HS, SOUL); });

    //taula 12: Ofici, Laudes
    id = 1;
    acceso.getLiturgia("tempsPasquaAA", id, (result) => { this.queryRows.tempsPasquaAA = result; this.dataReceived(HS, SOUL); });

    //taula 13: Ofici, Laudes
    id = weekDayNormal;
    acceso.getLiturgia("tempsPasquaOct", id, (result) => { this.queryRows.tempsPasquaOct = result; this.dataReceived(HS, SOUL); });

    //taula 14: Ofici, Laudes
    id = 1;
    acceso.getLiturgia("tempsPasquaDA", id, (result) => { this.queryRows.tempsPasquaDA = result; this.dataReceived(HS, SOUL); });

    //taula 15: Ofici, Laudes
    id = (props.setmana-2)*7 + (props.weekDay+1);
    acceso.getLiturgia("tempsPasquaSetmanes", id, (result) => { this.queryRows.tempsPasquaSetmanes = result; this.dataReceived(HS, SOUL); });

    //taula 16: Ofici, Laudes
    switch (props.LT) {
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
    acceso.getLiturgia("tempsAdventNadalComu", id, (result) => { this.queryRows.tempsAdventNadalComu = result; this.dataReceived(HS, SOUL); });

    //taula 17: Ofici, Laudes
    //Week begins with saturday
    {props.weekDay === 6 ? auxDay = 1 : auxDay = props.weekDay + 2}
    id = (props.cicle-1)*7 + auxDay;
    acceso.getLiturgia("tempsAdventSetmanes", id, (result) => { this.queryRows.tempsAdventSetmanes = result; this.dataReceived(HS, SOUL); });

    //taula 18: Ofici, Laudes
    id = props.cicle;
    acceso.getLiturgia("tempsAdventSetmanesDium", id, (result) => { this.queryRows.tempsAdventSetmanesDium = result; this.dataReceived(HS, SOUL); });

    //taula 19: Ofici, Laudes
    id = props.monthDay-16;
    acceso.getLiturgia("tempsAdventFeries", id, (result) => { this.queryRows.tempsAdventFeries = result; this.dataReceived(HS, SOUL); });

    //taula 20: Ofici, Laudes
    id = props.monthDay-25;
    acceso.getLiturgia("tempsNadalOctava", id, (result) => { this.queryRows.tempsNadalOctava = result; this.dataReceived(HS, SOUL); });

    //taula 21: Ofici, Laudes
    {props.monthDay < 6 ? id = props.monthDay-1 : id = props.monthDay-2}
    acceso.getLiturgia("tempsNadalAbansEpifania", id, (result) => { this.queryRows.tempsNadalAbansEpifania = result; this.dataReceived(HS, SOUL); });

    //taula 22: Ofici
    id = 1;
    acceso.getLiturgia("salteriComuEspPasquaDium", id, (result) => { this.queryRows.salteriComuEspPasquaDium = result; this.dataReceived(HS, SOUL); });

    //taula 23: Ofici, Laudes
    id = -1;
    acceso.getLiturgia("diversos", id, (result) => { this.queryRows.diversos = result; this.dataReceived(HS, SOUL); });

    //taula 24: Laudes
    idLaudes = (props.cicle-1)*7 + (props.weekDay+1);
    acceso.getLiturgia("salteriComuLaudes", idLaudes, (result) => { this.queryRows.salteriComuLaudes = result; this.dataReceived(HS, SOUL); });

    //taula 25: Laudes
    idLaudes = (props.cicle-1)*6 + (props.weekDay);
    acceso.getLiturgia("salteriComuEspPasqua", idLaudes, (result) => { this.queryRows.salteriComuEspPasqua = result; this.dataReceived(HS, SOUL); });

    //taula 26: Laudes
    id = props.setmana;
    acceso.getLiturgia("tempsPasquaSetmanesDium", id, (result) => { this.queryRows.tempsPasquaSetmanesDium = result; this.dataReceived(HS, SOUL); });

    //taula 27: Laudes
    id = 1;
    acceso.getLiturgia("tempsQuaresmaDiumPasq", id, (result) => { this.queryRows.tempsQuaresmaDiumPasq = result; this.dataReceived(HS, SOUL); });

    //taula 28: Laudes
    id = props.setmana;
    acceso.getLiturgia("tempsQuaresmaVSetmanesDium", id, (result) => { this.queryRows.tempsQuaresmaVSetmanesDium = result; this.dataReceived(HS, SOUL); });

    this.count = 28; //number of queryies
    }

    dataReceived(HS, SOUL){
      this.count -= 1;

      if(this.count === 0){
        nit = false; //TODO: HC
        this.state = {
          nit: nit,
          salteriComuOfici: this.queryRows.salteriComuOfici,
          salteriComuInvitatori: this.queryRows.salteriComuInvitatori,
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
          diversos: this.queryRows.diversos,
          salteriComuLaudes: this.queryRows.salteriComuLaudes,
          salteriComuEspPasqua: this.queryRows.salteriComuEspPasqua,
          tempsPasquaSetmanesDium: this.queryRows.tempsPasquaSetmanesDium,
          tempsQuaresmaDiumPasq: this.queryRows.tempsQuaresmaDiumPasq,
          tempsQuaresmaVSetmanesDium: this.queryRows.tempsQuaresmaVSetmanesDium,
        };

        new OficiSoul(this.props, this.state, HS, this);
        new LaudesSoul(this.props, this.state, HS, this);
      }
    }

    setSoul(HS, type, pregaria){
      switch (type) {
        case "ofici":
            this.countLit -= 1;
            this.LITURGIA.ofici = pregaria
          break;
        case "laudes":
            this.countLit -= 1;
            this.LITURGIA.laudes = pregaria
          break;
      }

      if(this.countLit === 0){
        HS.setSoul(this.LITURGIA);
      }
    }
}

import OficiSoul from '../Components/OficiSoul';
import LaudesSoul from '../Components/LaudesSoul';
import VespresSoul from '../Components/VespresSoul';
import HoraMenorSoul from '../Components/HoraMenorSoul';
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

    this.queryRows = {
      salteriComuOfici: '', //1
      salteriComuInvitatori: '', //2
      tempsOrdinariOfici: '', //3
      tempsOrdinariOracions: '', //4
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
      tempsAdventSetmanesDium: '', //18
      tempsAdventFeries: '', //19
      tempsNadalOctava: '', //20
      tempsNadalAbansEpifania: '', //21
      salteriComuEspPasquaDium: '', //22
      diversos: '', //23
      salteriComuLaudes: '', //24
      salteriComuEspPasqua: '', //25
      tempsPasquaSetmanesDium: '', //26
      tempsQuaresmaDiumPasq: '', //27
      tempsQuaresmaVSetmanesDium: '', //28
      salteriComuVespres: '', //29
      tempsSolemnitatsFestes: '', //30
      salteriComuHora: '', //31
    }

    this.countLit = 6;
    this.LITURGIA = { //7
      ofici: null,
      laudes: null,
      vespres: null,
      tercia: null,
      sexta: null,
      nona: null,
      completes: null,
    }

    acceso = new DBAdapter();

    //taula 1: Ofici(1)
    if(true){
      id = (props.cicle-1)*7 + (props.weekDay+1);
      acceso.getLiturgia("salteriComuOfici", id, (result) => { this.queryRows.salteriComuOfici = result; this.dataReceived(HS, SOUL); });
    }

    //taula 2: Ofici(2), Laudes(1)
    if(true){
      id = (props.cicle-1)*7 + (props.weekDay+1);
      acceso.getLiturgia("salteriComuInvitatori", id, (result) => { this.queryRows.salteriComuInvitatori = result; this.dataReceived(HS, SOUL); });
    }

    //taula 3: Ofici(3)
    if(true){
      id = (props.setmana-1)*7  + (props.weekDay+1);
      acceso.getLiturgia("tempsOrdinariOfici", id, (result) => { this.queryRows.tempsOrdinariOfici = result; this.dataReceived(HS, SOUL); });
    }

    //taula 4: Ofici(4), Laudes(2), Vespres(1), HoraMenor(1)
    if(true){
      id = props.setmana;
      acceso.getLiturgia("tempsOrdinariOracions", id, (result) => { this.queryRows.tempsOrdinariOracions = result; this.dataReceived(HS, SOUL); });
    }

    //taula 5: Ofici(5), Laudes(3), Vespres(2), HoraMenor(2)
    if(true){
      id = 1;
      acceso.getLiturgia("tempsQuaresmaComuFV", id, (result) => { this.queryRows.tempsQuaresmaComuFV = result; this.dataReceived(HS, SOUL); });
    }

    //taula 6: Ofici(6), Laudes(4), Vespres(3), HoraMenor(3)
    if(true){
      id = props.weekDay-2; //dimecres = 1, dijous = 2, ...
      acceso.getLiturgia("tempsQuaresmaCendra", id, (result) => { this.queryRows.tempsQuaresmaCendra = result; this.dataReceived(HS, SOUL); });
    }

    //taula 7: Ofici(7), Laudes(5), Vespres(4), HoraMenor(4)
    if(true){
      id = (props.setmana-1)*7 + (props.weekDay+1);
      acceso.getLiturgia("tempsQuaresmaVSetmanes", id, (result) => { this.queryRows.tempsQuaresmaVSetmanes = result; this.dataReceived(HS, SOUL); });
    }

    //taula 8: Ofici(8), Laudes(6), Vespres(5), HoraMenor(5)
    if(true){
      id = 1;
      acceso.getLiturgia("tempsQuaresmaComuSS", id, (result) => { this.queryRows.tempsQuaresmaComuSS = result; this.dataReceived(HS, SOUL); });
    }

    //taula 9: Ofici(9), Laudes(7), Vespres(6), HoraMenor(6)
    if(true){
      id = 1;
      acceso.getLiturgia("tempsQuaresmaRams", id, (result) => { this.queryRows.tempsQuaresmaRams = result; this.dataReceived(HS, SOUL); });
    }

    //taula 10: Ofici(10), Laudes(8), Vespres(7), HoraMenor(7)
    if(true){
      id = props.weekDay; //dilluns = 1, dimarts = 2, dimecres = 3 i dijous = 4
      acceso.getLiturgia("tempsQuaresmaSetSanta", id, (result) => { this.queryRows.tempsQuaresmaSetSanta = result; this.dataReceived(HS, SOUL); });
    }

    //taula 11: Ofici(11), Laudes(9), Vespres(8), HoraMenor(8)
    if(true){
      id = props.weekDay-3; //dijous = 1, divendres = 2 i dissabte = 3
      acceso.getLiturgia("tempsQuaresmaTridu", id, (result) => { this.queryRows.tempsQuaresmaTridu = result; this.dataReceived(HS, SOUL); });
    }

    //taula 12: Ofici(12), Laudes(10), Vespres(9), HoraMenor(9)
    if(true){
      id = 1;
      acceso.getLiturgia("tempsPasquaAA", id, (result) => { this.queryRows.tempsPasquaAA = result; this.dataReceived(HS, SOUL); });
    }

    //taula 13: Ofici(13), Laudes(11), Vespres(10), HoraMenor(10)
    if(true){
      {props.weekDay === 0 ? weekDayNormal = 7 : weekDayNormal = props.weekDay}
      id = weekDayNormal;
      acceso.getLiturgia("tempsPasquaOct", id, (result) => { this.queryRows.tempsPasquaOct = result; this.dataReceived(HS, SOUL); });
    }

    //taula 14: Ofici(14), Laudes(12), Vespres(11), HoraMenor(11)
    if(true){
      id = 1;
      acceso.getLiturgia("tempsPasquaDA", id, (result) => { this.queryRows.tempsPasquaDA = result; this.dataReceived(HS, SOUL); });
    }

    //taula 15: Ofici(15), Laudes(13), Vespres(12), HoraMenor(12)
    if(true){
      id = (props.setmana-2)*7 + (props.weekDay+1);
      acceso.getLiturgia("tempsPasquaSetmanes", id, (result) => { this.queryRows.tempsPasquaSetmanes = result; this.dataReceived(HS, SOUL); });
    }

    //taula 16: Ofici(16), Laudes(14), Vespres(13), HoraMenor(13)
    if(true){
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
    }

    //taula 17: Ofici(17), Laudes(15), Vespres(14), HoraMenor(14)
    if(true){
      //Week begins with saturday
      {props.weekDay === 6 ? auxDay = 1 : auxDay = props.weekDay + 2}
      id = (props.cicle-1)*7 + auxDay;
      acceso.getLiturgia("tempsAdventSetmanes", id, (result) => { this.queryRows.tempsAdventSetmanes = result; this.dataReceived(HS, SOUL); });
    }

    //taula 18: Ofici(18), Laudes(16), Vespres(15), HoraMenor(15)
    if(true){
      id = props.cicle;
      acceso.getLiturgia("tempsAdventSetmanesDium", id, (result) => { this.queryRows.tempsAdventSetmanesDium = result; this.dataReceived(HS, SOUL); });
    }

    //taula 19: Ofici(19), Laudes(17), Vespres(16), HoraMenor(16)
    if(true){
      id = props.monthDay-16;
      acceso.getLiturgia("tempsAdventFeries", id, (result) => { this.queryRows.tempsAdventFeries = result; this.dataReceived(HS, SOUL); });
    }

    //taula 20: Ofici(20), Laudes(18), Vespres(17), HoraMenor(17)
    if(true){
      id = props.monthDay-25;
      acceso.getLiturgia("tempsNadalOctava", id, (result) => { this.queryRows.tempsNadalOctava = result; this.dataReceived(HS, SOUL); });
    }

    //taula 21: Ofici(21), Laudes(19), Vespres(18), HoraMenor(18)
    if(true){
      {props.monthDay < 6 ? id = props.monthDay-1 : id = props.monthDay-2}
      acceso.getLiturgia("tempsNadalAbansEpifania", id, (result) => { this.queryRows.tempsNadalAbansEpifania = result; this.dataReceived(HS, SOUL); });
    }

    //taula 22: Ofici(22)
    if(true){
      id = 1;
      acceso.getLiturgia("salteriComuEspPasquaDium", id, (result) => { this.queryRows.salteriComuEspPasquaDium = result; this.dataReceived(HS, SOUL); });
    }

    //taula 23: Ofici(23), Laudes(20), Vespres(19), HoraMenor(19)
    if(true){
      id = -1;
      acceso.getLiturgia("diversos", id, (result) => { this.queryRows.diversos = result; this.dataReceived(HS, SOUL); });
    }

    //taula 24: Laudes(21)
    if(true){
      idLaudes = (props.cicle-1)*7 + (props.weekDay+1);
      acceso.getLiturgia("salteriComuLaudes", idLaudes, (result) => { this.queryRows.salteriComuLaudes = result; this.dataReceived(HS, SOUL); });
    }

    //taula 25: Laudes(22), Vespres(20)
    if(true){
      idLaudes = (props.cicle-1)*6 + (props.weekDay);
      acceso.getLiturgia("salteriComuEspPasqua", idLaudes, (result) => { this.queryRows.salteriComuEspPasqua = result; this.dataReceived(HS, SOUL); });
    }

    //taula 26: Laudes(23), Vespres(21)
    if(true){
      id = props.setmana;
      acceso.getLiturgia("tempsPasquaSetmanesDium", id, (result) => { this.queryRows.tempsPasquaSetmanesDium = result; this.dataReceived(HS, SOUL); });
    }

    //taula 27: Laudes(24), Vespres(22)
    if(true){
      id = 1;
      acceso.getLiturgia("tempsQuaresmaDiumPasq", id, (result) => { this.queryRows.tempsQuaresmaDiumPasq = result; this.dataReceived(HS, SOUL); });
    }

    //taula 28: Laudes(26), Vespres(23)
    if(true){
      id = props.setmana;
      acceso.getLiturgia("tempsQuaresmaVSetmanesDium", id, (result) => { this.queryRows.tempsQuaresmaVSetmanesDium = result; this.dataReceived(HS, SOUL); });
    }

    //taula 29: Vespres(24)
    if(true){
      {props.weekDay === 6 ? weekDayNormalVESPRES = 1 : weekDayNormalVESPRES = props.weekDay + 2}
      id = (props.cicle-1)*7 + weekDayNormalVESPRES;
      acceso.getLiturgia("salteriComuVespres", id, (result) => { this.queryRows.salteriComuVespres = result; this.dataReceived(HS, SOUL); });
    }

    //taula 30: Laudes(26), Vespres(25)
    if(true){
      id = 1; //Només necessito Nadal (1) per N_OCTAVA
      acceso.getLiturgia("tempsSolemnitatsFestes", id, (result) => { this.queryRows.tempsSolemnitatsFestes = result; this.dataReceived(HS, SOUL); });
    }

    //taula 31: HoraMenor(20)
    id = (props.cicle-1)*7 + (props.weekDay+1);
    acceso.getLiturgia("salteriComuHora", id, (result) => { this.queryRows.salteriComuHora = result; this.dataReceived(HS, SOUL); });

    this.count = 31; //number of queryies
  }

  dataReceived(HS, SOUL){
    this.count -= 1;

    if(this.count === 0){ //TODO: quan es canvia de dia s'han deliminar aqestes instancies
      new OficiSoul(this.props, this.queryRows, HS, this);
      new LaudesSoul(this.props, this.queryRows, HS, this);
      new VespresSoul(this.props, this.queryRows, HS, this);
      new HoraMenorSoul(this.props, this.queryRows, HS, this);
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
          this.countLit -= 1;
          this.LITURGIA.sexta = pregaria;
        break;
      case "nona":
          this.countLit -= 1;
          this.LITURGIA.nona = pregaria;
        break;
      case "completes":
          this.countLit -= 1;
          this.LITURGIA.completes = pregaria;
        break;
    }

    if(this.countLit === 0){
      HS.setSoul(this.LITURGIA);
    }
  }
}

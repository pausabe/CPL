import OficiSoul from '../Components/OficiSoul';
import LaudesSoul from '../Components/LaudesSoul';
import VespresSoul from '../Components/VespresSoul';
import HoraMenorSoul from '../Components/HoraMenorSoul';
import CompletesSoul from '../Components/CompletesSoul';
import DBAdapter from '../SQL/DBAdapter';
import GLOBAL from '../Globals/Globals';

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
      salteriComuCompletes: '', //32
    }

    this.countLit = 7;
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
    var c = 0;

    //taula 1 (#2): Ofici(1)
    if(props.liturgicProps.LT !== GLOBAL.Q_TRIDU && props.liturgicProps.LT !== GLOBAL.P_OCTAVA && props.liturgicProps.LT !== GLOBAL.N_OCTAVA){
      c += 1;
      id = (props.liturgicProps.cicle-1)*7 + (props.date.getDay()+1);
      acceso.getLiturgia("salteriComuOfici", id, (result) => { this.queryRows.salteriComuOfici = result; this.dataReceived(HS, SOUL); });
    }

    //taula 2 (#1): Ofici(2), Laudes(1)
    if(props.liturgicProps.LT === GLOBAL.O_ORDINARI){
      c += 1;
      id = (props.liturgicProps.cicle-1)*7 + (props.date.getDay()+1);
      acceso.getLiturgia("salteriComuInvitatori", id, (result) => { this.queryRows.salteriComuInvitatori = result; this.dataReceived(HS, SOUL); });
    }

    //taula 3 (#10): Ofici(3)
    if(props.liturgicProps.LT === GLOBAL.O_ORDINARI){
      c += 1;
      id = (props.liturgicProps.setmana-1)*7  + (props.date.getDay()+1);
      acceso.getLiturgia("tempsOrdinariOfici", id, (result) => { this.queryRows.tempsOrdinariOfici = result; this.dataReceived(HS, SOUL); });
    }

    //taula 4 (#9): Ofici(4), Laudes(2), Vespres(1), HoraMenor(1)
    if(props.liturgicProps.LT === GLOBAL.O_ORDINARI){
      c += 1;
      id = props.liturgicProps.setmana;
      acceso.getLiturgia("tempsOrdinariOracions", id, (result) => { this.queryRows.tempsOrdinariOracions = result; this.dataReceived(HS, SOUL); });
    }

    //taula 5 (#11): Ofici(5), Laudes(3), Vespres(2), HoraMenor(2)
    if(props.liturgicProps.LT === GLOBAL.Q_CENDRA || props.liturgicProps.LT === GLOBAL.Q_SETMANES){
      c += 1;
      id = 1;
      acceso.getLiturgia("tempsQuaresmaComuFV", id, (result) => { this.queryRows.tempsQuaresmaComuFV = result; this.dataReceived(HS, SOUL); });
    }

    //taula 6 (#12): Ofici(6), Laudes(4), Vespres(3), HoraMenor(3)
    if(props.liturgicProps.LT === GLOBAL.Q_CENDRA){
      c += 1;
      id = props.date.getDay()-2; //dimecres = 1, dijous = 2, ...
      acceso.getLiturgia("tempsQuaresmaCendra", id, (result) => { this.queryRows.tempsQuaresmaCendra = result; this.dataReceived(HS, SOUL); });
    }

    //taula 7 (#14): Ofici(7), Laudes(5), Vespres(4), HoraMenor(4)
    if(props.liturgicProps.LT === GLOBAL.Q_SETMANES){
      c += 1;
      id = (props.liturgicProps.setmana-1)*7 + (props.date.getDay()+1);
      acceso.getLiturgia("tempsQuaresmaVSetmanes", id, (result) => { this.queryRows.tempsQuaresmaVSetmanes = result; this.dataReceived(HS, SOUL); });
    }

    //taula 8 (#15): Ofici(8), Laudes(6), Vespres(5), HoraMenor(5)
    if(props.liturgicProps.LT === GLOBAL.Q_DIUM_RAMS || props.liturgicProps.LT === GLOBAL.Q_SET_SANTA){
      c += 1;
      id = 1;
      acceso.getLiturgia("tempsQuaresmaComuSS", id, (result) => { this.queryRows.tempsQuaresmaComuSS = result; this.dataReceived(HS, SOUL); });
    }

    //taula 9 (#16): Ofici(9), Laudes(7), Vespres(6), HoraMenor(6)
    if(props.liturgicProps.LT === GLOBAL.Q_DIUM_RAMS){
      c += 1;
      id = 1;
      acceso.getLiturgia("tempsQuaresmaRams", id, (result) => { this.queryRows.tempsQuaresmaRams = result; this.dataReceived(HS, SOUL); });
    }

    //taula 10 (#17): Ofici(10), Laudes(8), Vespres(7), HoraMenor(7)
    if(props.liturgicProps.LT === GLOBAL.Q_SET_SANTA){
      c += 1;
      id = props.date.getDay(); //dilluns = 1, dimarts = 2, dimecres = 3 i dijous = 4
      acceso.getLiturgia("tempsQuaresmaSetSanta", id, (result) => { this.queryRows.tempsQuaresmaSetSanta = result; this.dataReceived(HS, SOUL); });
    }

    //taula 11 (#18): Ofici(11), Laudes(9), Vespres(8), HoraMenor(8)
    if(props.liturgicProps.LT === GLOBAL.Q_TRIDU){
      c += 1;
      id = props.date.getDay()-3; //dijous = 1, divendres = 2 i dissabte = 3
      acceso.getLiturgia("tempsQuaresmaTridu", id, (result) => { this.queryRows.tempsQuaresmaTridu = result; this.dataReceived(HS, SOUL); });
    }

    //taula 12 (#20): Ofici(12), Laudes(10), Vespres(9), HoraMenor(9)
    if(props.liturgicProps.LT === GLOBAL.P_OCTAVA || props.liturgicProps.LT === GLOBAL.P_SETMANES){
      c += 1;
      id = 1;
      acceso.getLiturgia("tempsPasquaAA", id, (result) => { this.queryRows.tempsPasquaAA = result; this.dataReceived(HS, SOUL); });
    }

    //taula 13 (#21): Ofici(13), Laudes(11), Vespres(10), HoraMenor(10)
    if(props.liturgicProps.LT === GLOBAL.P_OCTAVA){
      c += 1;
      {props.date.getDay() === 0 ? weekDayNormal = 7 : weekDayNormal = props.date.getDay()}
      id = weekDayNormal;
      acceso.getLiturgia("tempsPasquaOct", id, (result) => { this.queryRows.tempsPasquaOct = result; this.dataReceived(HS, SOUL); });
    }

    //taula 14 (#22): Ofici(14), Laudes(12), Vespres(11), HoraMenor(11)
    if(props.liturgicProps.LT === GLOBAL.P_SETMANES){
      c += 1;
      id = 1;
      acceso.getLiturgia("tempsPasquaDA", id, (result) => { this.queryRows.tempsPasquaDA = result; this.dataReceived(HS, SOUL); });
    }

    //taula 15 (#23): Ofici(15), Laudes(13), Vespres(12), HoraMenor(12)
    if(props.liturgicProps.LT === GLOBAL.P_SETMANES){
      c += 1;
      id = (props.liturgicProps.setmana-2)*7 + (props.date.getDay()+1);
      acceso.getLiturgia("tempsPasquaSetmanes", id, (result) => { this.queryRows.tempsPasquaSetmanes = result; this.dataReceived(HS, SOUL); });
    }

    //taula 16 (#25): Ofici(16), Laudes(14), Vespres(13), HoraMenor(13)
    if(props.liturgicProps.LT === GLOBAL.A_SETMANES || props.liturgicProps.LT === GLOBAL.A_FERIES || props.liturgicProps.LT === GLOBAL.N_OCTAVA || props.liturgicProps.LT === GLOBAL.N_ABANS){
      c += 1;
      switch (props.liturgicProps.LT) {
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
          if(props.date.getDate() <= 7){ id = 3; }
          else{ id = 4; }
        break;
        default: id = 1;
      }
      acceso.getLiturgia("tempsAdventNadalComu", id, (result) => { this.queryRows.tempsAdventNadalComu = result; this.dataReceived(HS, SOUL); });
    }

    //taula 17 (#26): Ofici(17), Laudes(15), Vespres(14), HoraMenor(14)
    if(props.liturgicProps.LT === GLOBAL.A_SETMANES){
      c += 1;
      //Week begins with saturday
      {props.date.getDay() === 6 ? auxDay = 1 : auxDay = props.date.getDay() + 2}
      id = (props.liturgicProps.cicle-1)*7 + auxDay;
      acceso.getLiturgia("tempsAdventSetmanes", id, (result) => { this.queryRows.tempsAdventSetmanes = result; this.dataReceived(HS, SOUL); });
    }

    //taula 18 (#27): Ofici(18), Laudes(16), Vespres(15), HoraMenor(15)
    if(props.liturgicProps.LT === GLOBAL.A_SETMANES || props.liturgicProps.LT === GLOBAL.A_FERIES){
      c += 1;
      id = props.liturgicProps.cicle;
      acceso.getLiturgia("tempsAdventSetmanesDium", id, (result) => { this.queryRows.tempsAdventSetmanesDium = result; this.dataReceived(HS, SOUL); });
    }

    //taula 19 (#28): Ofici(19), Laudes(17), Vespres(16), HoraMenor(16)
    if(props.liturgicProps.LT === GLOBAL.A_FERIES){
      c += 1;
      id = props.date.getDate()-16;
      acceso.getLiturgia("tempsAdventFeries", id, (result) => { this.queryRows.tempsAdventFeries = result; this.dataReceived(HS, SOUL); });
    }

    //taula 20 (#29): Ofici(20), Laudes(18), Vespres(17), HoraMenor(17)
    if(props.liturgicProps.LT === GLOBAL.N_OCTAVA){
      c += 1;
      id = props.date.getDate()-25;
      acceso.getLiturgia("tempsNadalOctava", id, (result) => { this.queryRows.tempsNadalOctava = result; this.dataReceived(HS, SOUL); });
    }

    //taula 21 (#30): Ofici(21), Laudes(19), Vespres(18), HoraMenor(18)
    if(props.liturgicProps.LT === GLOBAL.N_ABANS){
      c += 1;
      {props.date.getDate() < 6 ? id = props.date.getDate()-1 : id = props.date.getDate()-2}
      acceso.getLiturgia("tempsNadalAbansEpifania", id, (result) => { this.queryRows.tempsNadalAbansEpifania = result; this.dataReceived(HS, SOUL); });
    }

    //taula 22 (#7): Ofici(22)
    if(props.liturgicProps.LT === GLOBAL.P_SETMANES){
      c += 1;
      id = 1;
      acceso.getLiturgia("salteriComuEspPasquaDium", id, (result) => { this.queryRows.salteriComuEspPasquaDium = result; this.dataReceived(HS, SOUL); });
    }

    //taula 23 (#?): Ofici(23), Laudes(20), Vespres(19), HoraMenor(19), Completes(1)
    if(true){
      c += 1;
      id = -1;
      acceso.getLiturgia("diversos", id, (result) => { this.queryRows.diversos = result; this.dataReceived(HS, SOUL); });
    }

    //taula 24 (#3): Laudes(21)
    if(props.liturgicProps.LT !== GLOBAL.Q_TRIDU && props.liturgicProps.LT !== GLOBAL.P_OCTAVA && props.liturgicProps.LT !== GLOBAL.N_OCTAVA){
      c += 1;
      idLaudes = (props.liturgicProps.cicle-1)*7 + (props.date.getDay()+1);
      acceso.getLiturgia("salteriComuLaudes", idLaudes, (result) => { this.queryRows.salteriComuLaudes = result; this.dataReceived(HS, SOUL); });
    }

    //taula 25 (#8): Laudes(22), Vespres(20)
    if(props.liturgicProps.LT === GLOBAL.P_SETMANES){
      c += 1;
      idLaudes = (props.liturgicProps.cicle-1)*6 + (props.date.getDay());
      acceso.getLiturgia("salteriComuEspPasqua", idLaudes, (result) => { this.queryRows.salteriComuEspPasqua = result; this.dataReceived(HS, SOUL); });
    }

    //taula 26 (#24): Laudes(23), Vespres(21)
    if(props.liturgicProps.LT === GLOBAL.P_SETMANES){
      c += 1;
      id = props.liturgicProps.setmana-1;
      acceso.getLiturgia("tempsPasquaSetmanesDium", id, (result) => { this.queryRows.tempsPasquaSetmanesDium = result; this.dataReceived(HS, SOUL); });
    }

    //taula 27 (#19): Laudes(24), Vespres(22)
    if(props.liturgicProps.LT === GLOBAL.P_OCTAVA){
      c += 1;
      id = 1;
      acceso.getLiturgia("tempsQuaresmaDiumPasq", id, (result) => { this.queryRows.tempsQuaresmaDiumPasq = result; this.dataReceived(HS, SOUL); });
    }

    //taula 28 (#13): Laudes(26), Vespres(23)
    if(props.liturgicProps.LT === GLOBAL.Q_SETMANES){
      c += 1;
      id = props.liturgicProps.setmana;
      acceso.getLiturgia("tempsQuaresmaVSetmanesDium", id, (result) => { this.queryRows.tempsQuaresmaVSetmanesDium = result; this.dataReceived(HS, SOUL); });
    }

    //taula 29 (#5): Vespres(24)
    if(props.liturgicProps.LT !== GLOBAL.Q_TRIDU && props.liturgicProps.LT !== GLOBAL.P_OCTAVA){
      c += 1;
      { props.date.getDay() === 6 ? weekDayNormalVESPRES = 1 : weekDayNormalVESPRES = props.date.getDay() + 2 }
      var cicle = parseInt(props.liturgicProps.cicle);
      if(props.date.getDay() === 6){
        { cicle === 4 ? cicle = 1 : cicle += 1 }
      }
      id = (cicle-1)*7 + weekDayNormalVESPRES;
      acceso.getLiturgia("salteriComuVespres", id, (result) => { this.queryRows.salteriComuVespres = result; this.dataReceived(HS, SOUL); });
    }

    //taula 30 (#31): Laudes(26), Vespres(25)
    if(props.liturgicProps.LT === GLOBAL.N_OCTAVA){
      c += 1;
      id = 1; //Només necessito Nadal (1) per N_OCTAVA
      acceso.getLiturgia("tempsSolemnitatsFestes", id, (result) => { this.queryRows.tempsSolemnitatsFestes = result; this.dataReceived(HS, SOUL); });
    }

    //taula 31 (#4): HoraMenor(20)
    if(props.liturgicProps.LT !== GLOBAL.Q_TRIDU && props.liturgicProps.LT !== GLOBAL.P_OCTAVA){
      c += 1;
      id = (props.liturgicProps.cicle-1)*7 + (props.date.getDay()+1);
      acceso.getLiturgia("salteriComuHora", id, (result) => { this.queryRows.salteriComuHora = result; this.dataReceived(HS, SOUL); });
    }

    //taula 32 (#6): Completes(2)
    if(true){
      c += 1;
      {props.date.getDay() === 6 ? id = 1 : id = props.date.getDay() + 2}
      acceso.getLiturgia("salteriComuCompletes", id, (result) => { this.queryRows.salteriComuCompletes = result; this.dataReceived(HS, SOUL); });
    }

    this.count = c; //number of queryies
    console.log(c + " accessos.");
  }

  dataReceived(HS, SOUL){
    this.count -= 1;

    if(this.count === 0){ //TODO: quan es canvia de dia s'han deliminar aqestes instancies
      new OficiSoul(this.props, this.queryRows, HS, this);
      new LaudesSoul(this.props, this.queryRows, HS, this);
      new VespresSoul(this.props, this.queryRows, HS, this);
      new HoraMenorSoul(this.props, this.queryRows, HS, this);
      new CompletesSoul(this.props, this.queryRows, HS, this);
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

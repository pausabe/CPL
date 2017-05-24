import OficiSoul from '../Components/OficiSoul';
import LaudesSoul from '../Components/LaudesSoul';
import VespresSoul from '../Components/VespresSoul';
import HoraMenorSoul from '../Components/HoraMenorSoul';
import CompletesSoul from '../Components/CompletesSoul';
import CelebracioSoul from '../Components/CelebracioSoul';
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
      salteriComuOficiTF: '', //33
      santsSolemnitats: '', //34
      santsMemories: '', //35
      OficisComuns: null, //36
    }

    this.LITURGIA = { //7
      info_cel: null,
      ofici: null,
      laudes: null,
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

    this.makeQueryies(props.date, props.liturgicProps, props.celType, props.diocesi, props.invitatori, HS);
  }

  makeQueryies(date, liturgicProps, celType, diocesi, invitatori, HS){
    //HC
    //celType = "L";
    //diocesi = "SFC";
    //HC
    console.log("SOUL, celyType: " + celType + ", diocesi: " + diocesi);

    params = {
      date: date,
      liturgicProps: liturgicProps,
      celType: celType,
      diocesi: diocesi,
      invitatori: invitatori,
      idTSF: this.findTempsSolemnitatsFestes,
      HS: HS,
    }

    var c = 0;

    //taula 1 (#2): Ofici(1)
    if(liturgicProps.LT !== GLOBAL.Q_TRIDU && liturgicProps.LT !== GLOBAL.P_OCTAVA && liturgicProps.LT !== GLOBAL.N_OCTAVA){
      c += 1;
      id = (liturgicProps.cicle-1)*7 + (date.getDay()+1);
      this.acceso.getLiturgia("salteriComuOfici", id, (result) => { this.queryRows.salteriComuOfici = result; this.dataReceived(params); });
    }

    //taula 2 (#1): Ofici(2), Laudes(1)
    if(liturgicProps.LT === GLOBAL.O_ORDINARI){
      c += 1;
      id = (liturgicProps.cicle-1)*7 + (date.getDay()+1);
      this.acceso.getLiturgia("salteriComuInvitatori", id, (result) => { this.queryRows.salteriComuInvitatori = result; this.dataReceived(params); });
    }

    //taula 3 (#10): Ofici(3)
    if(liturgicProps.LT === GLOBAL.O_ORDINARI){
      c += 1;
      id = (liturgicProps.setmana-1)*7  + (date.getDay()+1);
      this.acceso.getLiturgia("tempsOrdinariOfici", id, (result) => { this.queryRows.tempsOrdinariOfici = result; this.dataReceived(params); });
    }

    //taula 4 (#9): Ofici(4), Laudes(2), Vespres(1), HoraMenor(1)
    if(liturgicProps.LT === GLOBAL.O_ORDINARI){
      c += 1;
      id = liturgicProps.setmana;
      this.acceso.getLiturgia("tempsOrdinariOracions", id, (result) => { this.queryRows.tempsOrdinariOracions = result; this.dataReceived(params); });
    }

    //taula 5 (#11): Ofici(5), Laudes(3), Vespres(2), HoraMenor(2)
    if(liturgicProps.LT === GLOBAL.Q_CENDRA || liturgicProps.LT === GLOBAL.Q_SETMANES){
      c += 1;
      id = 1;
      this.acceso.getLiturgia("tempsQuaresmaComuFV", id, (result) => { this.queryRows.tempsQuaresmaComuFV = result; this.dataReceived(params); });
    }

    //taula 6 (#12): Ofici(6), Laudes(4), Vespres(3), HoraMenor(3)
    if(liturgicProps.LT === GLOBAL.Q_CENDRA){
      c += 1;
      id = date.getDay()-2; //dimecres = 1, dijous = 2, ...
      this.acceso.getLiturgia("tempsQuaresmaCendra", id, (result) => { this.queryRows.tempsQuaresmaCendra = result; this.dataReceived(params); });
    }

    //taula 7 (#14): Ofici(7), Laudes(5), Vespres(4), HoraMenor(4)
    if(liturgicProps.LT === GLOBAL.Q_SETMANES){
      c += 1;
      id = (liturgicProps.setmana-1)*7 + (date.getDay()+1);
      this.acceso.getLiturgia("tempsQuaresmaVSetmanes", id, (result) => { this.queryRows.tempsQuaresmaVSetmanes = result; this.dataReceived(params); });
    }

    //taula 8 (#15): Ofici(8), Laudes(6), Vespres(5), HoraMenor(5)
    if(liturgicProps.LT === GLOBAL.Q_DIUM_RAMS || liturgicProps.LT === GLOBAL.Q_SET_SANTA){
      c += 1;
      id = 1;
      this.acceso.getLiturgia("tempsQuaresmaComuSS", id, (result) => { this.queryRows.tempsQuaresmaComuSS = result; this.dataReceived(params); });
    }

    //taula 9 (#16): Ofici(9), Laudes(7), Vespres(6), HoraMenor(6)
    if(liturgicProps.LT === GLOBAL.Q_DIUM_RAMS){
      c += 1;
      id = 1;
      this.acceso.getLiturgia("tempsQuaresmaRams", id, (result) => { this.queryRows.tempsQuaresmaRams = result; this.dataReceived(params); });
    }

    //taula 10 (#17): Ofici(10), Laudes(8), Vespres(7), HoraMenor(7)
    if(liturgicProps.LT === GLOBAL.Q_SET_SANTA){
      c += 1;
      id = date.getDay(); //dilluns = 1, dimarts = 2, dimecres = 3 i dijous = 4
      this.acceso.getLiturgia("tempsQuaresmaSetSanta", id, (result) => { this.queryRows.tempsQuaresmaSetSanta = result; this.dataReceived(params); });
    }

    //taula 11 (#18): Ofici(11), Laudes(9), Vespres(8), HoraMenor(8)
    if(liturgicProps.LT === GLOBAL.Q_TRIDU){
      c += 1;
      id = date.getDay()-3; //dijous = 1, divendres = 2 i dissabte = 3
      this.acceso.getLiturgia("tempsQuaresmaTridu", id, (result) => { this.queryRows.tempsQuaresmaTridu = result; this.dataReceived(params); });
    }

    //taula 12 (#20): Ofici(12), Laudes(10), Vespres(9), HoraMenor(9)
    if(liturgicProps.LT === GLOBAL.P_OCTAVA || liturgicProps.LT === GLOBAL.P_SETMANES){
      c += 1;
      id = 1;
      this.acceso.getLiturgia("tempsPasquaAA", id, (result) => { this.queryRows.tempsPasquaAA = result; this.dataReceived(params); });
    }

    //taula 13 (#21): Ofici(13), Laudes(11), Vespres(10), HoraMenor(10)
    if(liturgicProps.LT === GLOBAL.P_OCTAVA){
      c += 1;
      {date.getDay() === 0 ? weekDayNormal = 7 : weekDayNormal = date.getDay()}
      id = weekDayNormal;
      this.acceso.getLiturgia("tempsPasquaOct", id, (result) => { this.queryRows.tempsPasquaOct = result; this.dataReceived(params); });
    }

    //taula 14 (#22): Ofici(14), Laudes(12), Vespres(11), HoraMenor(11)
    if(liturgicProps.LT === GLOBAL.P_SETMANES){
      c += 1;
      id = 1;
      this.acceso.getLiturgia("tempsPasquaDA", id, (result) => { this.queryRows.tempsPasquaDA = result; this.dataReceived(params); });
    }

    //taula 15 (#23): Ofici(15), Laudes(13), Vespres(12), HoraMenor(12)
    if(liturgicProps.LT === GLOBAL.P_SETMANES){
      c += 1;
      id = (liturgicProps.setmana-2)*7 + (date.getDay()+1);
      this.acceso.getLiturgia("tempsPasquaSetmanes", id, (result) => { this.queryRows.tempsPasquaSetmanes = result; this.dataReceived(params); });
    }

    //taula 16 (#25): Ofici(16), Laudes(14), Vespres(13), HoraMenor(13)
    if(liturgicProps.LT === GLOBAL.A_SETMANES || liturgicProps.LT === GLOBAL.A_FERIES || liturgicProps.LT === GLOBAL.N_OCTAVA || liturgicProps.LT === GLOBAL.N_ABANS){
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
      this.acceso.getLiturgia("tempsAdventNadalComu", id, (result) => { this.queryRows.tempsAdventNadalComu = result; this.dataReceived(params); });
    }

    //taula 17 (#26): Ofici(17), Laudes(15), Vespres(14), HoraMenor(14)
    if(liturgicProps.LT === GLOBAL.A_SETMANES){
      c += 1;
      //Week begins with saturday
      {date.getDay() === 6 ? auxDay = 1 : auxDay = date.getDay() + 2}
      id = (liturgicProps.cicle-1)*7 + auxDay;
      this.acceso.getLiturgia("tempsAdventSetmanes", id, (result) => { this.queryRows.tempsAdventSetmanes = result; this.dataReceived(params); });
    }

    //taula 18 (#27): Ofici(18), Laudes(16), Vespres(15), HoraMenor(15)
    if(liturgicProps.LT === GLOBAL.A_SETMANES || liturgicProps.LT === GLOBAL.A_FERIES){
      c += 1;
      id = liturgicProps.cicle;
      this.acceso.getLiturgia("tempsAdventSetmanesDium", id, (result) => { this.queryRows.tempsAdventSetmanesDium = result; this.dataReceived(params); });
    }

    //taula 19 (#28): Ofici(19), Laudes(17), Vespres(16), HoraMenor(16)
    if(liturgicProps.LT === GLOBAL.A_FERIES){
      c += 1;
      id = date.getDate()-16;
      this.acceso.getLiturgia("tempsAdventFeries", id, (result) => { this.queryRows.tempsAdventFeries = result; this.dataReceived(params); });
    }

    //taula 20 (#29): Ofici(20), Laudes(18), Vespres(17), HoraMenor(17)
    if(liturgicProps.LT === GLOBAL.N_OCTAVA){
      c += 1;
      id = date.getDate()-25;
      this.acceso.getLiturgia("tempsNadalOctava", id, (result) => { this.queryRows.tempsNadalOctava = result; this.dataReceived(params); });
    }

    //taula 21 (#30): Ofici(21), Laudes(19), Vespres(18), HoraMenor(18)
    if(liturgicProps.LT === GLOBAL.N_ABANS){
      c += 1;
      {date.getDate() < 6 ? id = date.getDate()-1 : id = date.getDate()-2}
      this.acceso.getLiturgia("tempsNadalAbansEpifania", id, (result) => { this.queryRows.tempsNadalAbansEpifania = result; this.dataReceived(params); });
    }

    //taula 22 (#7): Ofici(22)
    if(liturgicProps.LT === GLOBAL.P_SETMANES){
      c += 1;
      id = 1;
      this.acceso.getLiturgia("salteriComuEspPasquaDium", id, (result) => { this.queryRows.salteriComuEspPasquaDium = result; this.dataReceived(params); });
    }

    //taula 23 (#?): Ofici(23), Laudes(20), Vespres(19), HoraMenor(19), Completes(1)
    if(true){
      c += 1;
      id = -1;
      this.acceso.getLiturgia("diversos", id, (result) => { this.queryRows.diversos = result; this.dataReceived(params); });
    }

    //taula 24 (#3): Laudes(21)
    if(liturgicProps.LT !== GLOBAL.Q_TRIDU && liturgicProps.LT !== GLOBAL.P_OCTAVA && liturgicProps.LT !== GLOBAL.N_OCTAVA){
      c += 1;
      idLaudes = (liturgicProps.cicle-1)*7 + (date.getDay()+1);
      this.acceso.getLiturgia("salteriComuLaudes", idLaudes, (result) => { this.queryRows.salteriComuLaudes = result; this.dataReceived(params); });
    }

    //taula 25 (#8): Laudes(22), Vespres(20)
    if(liturgicProps.LT === GLOBAL.P_SETMANES){
      c += 1;
      idLaudes = (liturgicProps.cicle-1)*6 + (date.getDay());
      this.acceso.getLiturgia("salteriComuEspPasqua", idLaudes, (result) => { this.queryRows.salteriComuEspPasqua = result; this.dataReceived(params); });
    }

    //taula 26 (#24): Laudes(23), Vespres(21)
    if(liturgicProps.LT === GLOBAL.P_SETMANES){
      c += 1;
      id = liturgicProps.setmana-1;
      this.acceso.getLiturgia("tempsPasquaSetmanesDium", id, (result) => { this.queryRows.tempsPasquaSetmanesDium = result; this.dataReceived(params); });
    }

    //taula 27 (#19): Laudes(24), Vespres(22)
    if(liturgicProps.LT === GLOBAL.P_OCTAVA){
      c += 1;
      id = 1;
      this.acceso.getLiturgia("tempsQuaresmaDiumPasq", id, (result) => { this.queryRows.tempsQuaresmaDiumPasq = result; this.dataReceived(params); });
    }

    //taula 28 (#13): Laudes(26), Vespres(23)
    if(liturgicProps.LT === GLOBAL.Q_SETMANES){
      c += 1;
      id = liturgicProps.setmana;
      this.acceso.getLiturgia("tempsQuaresmaVSetmanesDium", id, (result) => { this.queryRows.tempsQuaresmaVSetmanesDium = result; this.dataReceived(params); });
    }

    //taula 29 (#5): Vespres(24)
    if(liturgicProps.LT !== GLOBAL.Q_TRIDU && liturgicProps.LT !== GLOBAL.P_OCTAVA){
      c += 1;
      { date.getDay() === 6 ? weekDayNormalVESPRES = 1 : weekDayNormalVESPRES = date.getDay() + 2 }
      var cicle = parseInt(liturgicProps.cicle);
      if(date.getDay() === 6){
        { cicle === 4 ? cicle = 1 : cicle += 1 }
      }
      id = (cicle-1)*7 + weekDayNormalVESPRES;
      this.acceso.getLiturgia("salteriComuVespres", id, (result) => { this.queryRows.salteriComuVespres = result; this.dataReceived(params); });
    }

    //taula 30 (#31): -
    if(params.idTSF !== -1 || liturgicProps.LT === GLOBAL.Q_TRIDU){
      c += 1;
      if(params.idTSF !== -1){
        id = 1; //Només necessito Nadal (1) per N_OCTAVA
      }
      else{
        id = params.idTSF;
      }
      this.acceso.getLiturgia("tempsSolemnitatsFestes", id, (result) => { this.queryRows.tempsSolemnitatsFestes = result; this.dataReceived(params); });
    }

    //taula 31 (#4): HoraMenor(20)
    if(liturgicProps.LT !== GLOBAL.Q_TRIDU && liturgicProps.LT !== GLOBAL.P_OCTAVA){
      c += 1;
      id = (liturgicProps.cicle-1)*7 + (date.getDay()+1);
      this.acceso.getLiturgia("salteriComuHora", id, (result) => { this.queryRows.salteriComuHora = result; this.dataReceived(params); });
    }

    //taula 32 (#6): Completes(2)
    if(true){
      c += 1;
      {date.getDay() === 6 ? id = 1 : id = date.getDay() + 2}
      this.acceso.getLiturgia("salteriComuCompletes", id, (result) => { this.queryRows.salteriComuCompletes = result; this.dataReceived(params); });
    }

    //taula 33 (#??): Ofici(24)
    if(liturgicProps.LT !== GLOBAL.Q_TRIDU && liturgicProps.LT !== GLOBAL.P_OCTAVA && liturgicProps.LT !== GLOBAL.N_OCTAVA){
      c += 1;
      id = (liturgicProps.cicle-1)*7 + (date.getDay()+1);
      this.acceso.getLiturgia("salteriComuOficiTF", id, (result) => { this.queryRows.salteriComuOficiTF = result; this.dataReceived(params); });
    }

    //taula 34 (#32): - i //taula 36
    if(celType === 'S' || celType === 'F'){
      c += 1;
      this.acceso.getSolMem("santsSolemnitats", date, diocesi, (result) => { this.queryRows.santsSolemnitats = result; this.getOficisComuns(params, result.Categoria); });
    }

    //taula 35 (#31): -  i //taula 36
    if(celType === 'M' || celType === 'L' || celType === 'V'){
      c += 1;
      this.acceso.getSolMem("santsMemories", date, diocesi, (result) => { this.queryRows.santsMemories = result; this.getOficisComuns(params, result.Categoria); });
    }

    this.count = c; //number of queryies
    console.log(c + " accessos.");
  }

  getOficisComuns(params, categoria){
    if(categoria !== '0000'){
      console.log("Més un accéss extra per OficisComuns. Categoria: " + categoria);

      //taula 36 (#??): -
      this.acceso.getOC(categoria, (result) => { this.queryRows.OficisComuns = result; this.dataReceived(params); });
    }
    else{
      this.dataReceived(params);
    }
  }

  dataReceived(params){
    this.count -= 1;
    //console.log("Count: " + this.count);

    if(this.count === 0){
      if(this.firstAccessCel){
        this.firstAccessCel = false;
        this.CelebracioSoul = new CelebracioSoul(this.props, this.queryRows, params.idTSF, params.HS, this);
      }
      else{
        this.CelebracioSoul.makePrayer(params.date, params.liturgicProps, this.queryRows, params.celType, params.diocesi, params.idTSF, params.HS, this);
      }
    }
  }

  setSoul(HS, type, pregaria){
    //console.log("COUNTLIT: " + this.countLit);
    switch (type) {
      case "ofici":
        //console.log("----> OFICI");
          this.countLit -= 1;
          this.LITURGIA.ofici = pregaria;
        break;
      case "laudes":
      //console.log("----> LAUDES");
          this.countLit -= 1;
          this.LITURGIA.laudes = pregaria;
        break;
      case "vespres":
      //console.log("----> VESPRES");
          this.countLit -= 1;
          this.LITURGIA.vespres = pregaria;
        break;
      case "tercia":
      //console.log("----> TERCIA");
          this.countLit -= 1;
          this.LITURGIA.tercia = pregaria;
        break;
      case "sexta":
      //console.log("----> SEXTA");
          this.countLit -= 1;
          this.LITURGIA.sexta = pregaria;
        break;
      case "nona":
      //console.log("----> NONA");
          this.countLit -= 1;
          this.LITURGIA.nona = pregaria;
        break;
      case "completes":
      //console.log("----> COMPLETES");
          this.countLit -= 1;
          this.LITURGIA.completes = pregaria;
        break;
      case "celebracio":
          this.CEL = pregaria;
          this.LITURGIA.info_cel = pregaria.INFO_CEL;

          if(this.firstAccess){
            this.firstAccess = false;
            console.log("CEL 1rst access: " + this.CEL.LAUDES.ant1);
            this.OficiSoul = new OficiSoul(this.props, this.queryRows, this.CEL.OFICI, HS, this);
            this.LaudesSoul = new LaudesSoul(this.props, this.queryRows, this.CEL.LAUDES, HS, this);
            this.VespresSoul = new VespresSoul(this.props, this.queryRows, this.CEL.VESPRES, HS, this);
            this.HoraMenorSoul = new HoraMenorSoul(this.props, this.queryRows, this.CEL.HORA_MENOR, HS, this);
            this.CompletesSoul = new CompletesSoul(this.props, this.queryRows, this.CEL.COMPLETES, HS, this);
          }
          else{
            console.log("CEL 2nd access: " + this.CEL.OFICI.himne);
            this.OficiSoul.makePrayer(this.props.date, this.props.liturgicProps, this.queryRows, this.props.invitatori, this.CEL.OFICI, HS, this);
            this.LaudesSoul.makePrayer(this.props.date, this.props.liturgicProps, this.queryRows, this.props.invitatori, this.CEL.LAUDES, HS, this);
            this.VespresSoul.makePrayer(this.props.date, this.props.liturgicProps, this.queryRows, this.CEL.VESPRES, HS, this);
            this.HoraMenorSoul.makePrayer(this.props.date, this.props.liturgicProps, this.queryRows, this.CEL.HORA_MENOR, HS, this);
            this.CompletesSoul.makePrayer(this.props.date, this.props.liturgicProps, this.queryRows, this.CEL.COMPLETES, HS, this);
          }
        break;
    }

    if(this.countLit === 0){
      this.countLit = 7;
      HS.setSoul(this.LITURGIA);
    }
  }

  /*
    Return id of #tempsSolemnitatsFestes or -1 if there isnt there
  */
  findTempsSolemnitatsFestes(tempsSolemnitatsFestes, date){

    return -1;
  }
}

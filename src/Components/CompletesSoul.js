import { Platform } from 'react-native';
import Hr from 'react-native-hr';
import GLOBAL from '../Globals/Globals';

export default class CompletesSoul{
  constructor(props, TABLES, HS, SOUL) {

    this.makePrayer(props.date, props.liturgicProps, TABLES, HS, SOUL);
  }

  makePrayer(date, liturgicProps, TABLES, HS, SOUL){
    this.state = {
      salteriComuCompletes: TABLES.salteriComuCompletes,
      diversos: TABLES.diversos,
      cantic: TABLES.diversos.item(22).oracio,
      himneLlati: TABLES.diversos.item(20).oracio, //TODO: opto per la fórmula 2, fer seleccionable?
      himneCat: TABLES.diversos.item(21).oracio,
      antMare: TABLES.diversos.item(30).oracio, //TODO: opto per aqesta, fer seleccionable? Tb en llati?
    }

    this.COMPLETES = { //24
      himneLlati: '',
      himneCat: '',
      antifones: '',
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
      vers: '',
      lecturaBreu: '',
      antRespEspecial: '',
      respBreu1: '',
      respBreu2: '',
      respBreu3: '',
      respV: '',
      respR: '',
      antCantic: '',
      cantic: '',
      oracio: '',
      antMare: this.state.antMare,
    }

    this.completes(liturgicProps.LT, date.getDay());

    SOUL.setSoul(HS, "completes", this.COMPLETES);
  }

  completes(LT, weekDay) {
    const gloriaStringIntro = "Glòria al Pare i al Fill\ni a l’Esperit Sant.\nCom era al principi, ara i sempre\ni pels segles dels segles. Amén.";

    this.COMPLETES.himneLlati = this.state.himneLlati;
    this.COMPLETES.himneCat = this.state.himneCat;

    this.COMPLETES.antifones = true;
    this.COMPLETES.ant1 = this.state.salteriComuCompletes.ant1;
    this.COMPLETES.titol1 = this.state.salteriComuCompletes.titol1;
    this.COMPLETES.com1 = this.state.salteriComuCompletes.com1
    this.COMPLETES.salm1 = this.state.salteriComuCompletes.salm1;
    this.COMPLETES.gloria1 = this.state.salteriComuCompletes.gloria1;
    this.COMPLETES.dosSalms = this.state.salteriComuCompletes.dosSalms;
    this.COMPLETES.ant2 = this.state.salteriComuCompletes.ant2;
    this.COMPLETES.titol2 = this.state.salteriComuCompletes.titol2;
    this.COMPLETES.com2 = this.state.salteriComuCompletes.com2;
    this.COMPLETES.salm2 = this.state.salteriComuCompletes.salm2;
    this.COMPLETES.gloria2 = this.state.salteriComuCompletes.gloria2;

    this.COMPLETES.vers = this.state.salteriComuCompletes.versetLB;
    this.COMPLETES.lecturaBreu = this.state.salteriComuCompletes.lecturaBreu;

    this.COMPLETES.antRespEspecial = "-";
    this.COMPLETES.respBreu1 = "A les vostes mans, Senyor,";
    this.COMPLETES.respBreu2 = "Encomano el meu esperit.";
    this.COMPLETES.respBreu3 = "Vós, Déu fidel, ens heu redimit.";

    this.COMPLETES.antCantic = "Salveu-nos, Senyor, durant el dia, guardeu-nos durant la nit, perquè sigui amb Crist la nostra vetlla i amb Crist el nostre descans."; //TODO: omplir!
    this.COMPLETES.cantic = this.state.cantic;

    this.COMPLETES.oracio = this.state.salteriComuCompletes.oraFi;

    switch (LT) {
      case GLOBAL.P_OCTAVA: //TODO: l'oració final és com diumenge??
        this.COMPLETES.antifones = false;
        this.COMPLETES.ant1 = "Al·leluia, al·leluia, al·leluia.";
        this.COMPLETES.antRespEspecial = "Avui és el dia en què ha obrat el Senyor: alegrem-nos i celebrem-lo, al·leluia.";
        this.COMPLETES.antCantic = "Salveu-nos, Senyor, durant el dia, guardeu-nos durant la nit, perquè sigui amb Crist la nostra vetlla i amb Crist el nostre descans. Al·leluia.";
        break;
      case GLOBAL.P_SETMANES:
        this.COMPLETES.antifones = false;
        this.COMPLETES.ant1 = "Al·leluia, al·leluia, al·leluia.";
        this.COMPLETES.respBreu1 = "A les vostes mans, Senyor, encomano el meu esperit,";
        this.COMPLETES.respBreu2 = "Al·leluia, al·leluia.";
        this.COMPLETES.respBreu3 = "Vós, Déu fidel, ens heu redimit.";
        this.COMPLETES.antCantic = "Salveu-nos, Senyor, durant el dia, guardeu-nos durant la nit, perquè sigui amb Crist la nostra vetlla i amb Crist el nostre descans. Al·leluia.";
        break;
      case GLOBAL.Q_TRIDU:
        if(weekDay === 6){ //primeres vespres diumenge de pasqua
          this.COMPLETES.antRespEspecial = "Avui és el dia en què ha obrat el Senyor: alegrem-nos i celebrem-lo, al·leluia.";
        }
        break;
    }
  }
}

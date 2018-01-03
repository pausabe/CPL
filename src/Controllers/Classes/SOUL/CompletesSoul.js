import { Platform } from 'react-native';

import GLOBAL from '../../../Globals/Globals';

export default class CompletesSoul{
  constructor(variables, liturgicProps, TABLES, HS, SOUL) {
    console.log("PlaceLog. Constructor CompletesSoul");
    this.makePrayer(variables.date, liturgicProps, TABLES, variables, HS, SOUL);
  }

  makePrayer(date, liturgicProps, TABLES, variables, HS, SOUL){
    console.log("PlaceLog. MakePrayer CompletesSoul");
    this.state = {
      salteriComuCompletes: TABLES.salteriComuCompletes,
      diversos: TABLES.diversos,
      cantic: TABLES.diversos.item(22).oracio,
      himneLlati1: TABLES.diversos.item(18).oracio,
      himneCat1: TABLES.diversos.item(19).oracio,
      himneLlati2: TABLES.diversos.item(20).oracio,
      himneCat2: TABLES.diversos.item(21).oracio,
      antMare: TABLES.diversos.item(30).oracio, //TODO: opto per aqesta, fer seleccionable? Tb en llati?
    }

    this.COMPLETES = { //24
      himne: '',
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
      antMare: '',
    }

    this.completes(liturgicProps, date.getDay(), variables);

    SOUL.setSoul(HS, "completes", this.COMPLETES);
  }

  completes(liturgicProps, weekDay, variables) {
    setmana = liturgicProps.setmana
    llati = variables.llati;
    const gloriaStringIntro = "Glòria al Pare i al Fill\ni a l’Esperit Sant.\nCom era al principi, ara i sempre\ni pels segles dels segles. Amén.";
    const himnePasqua = "Jesús, oh Verb del Déu excels,\nde tots els segles Redemtor,\nsou llum de llum que brilla al cel\ni sou dels homes bon Pastor.\n\nVós que heu creat tot l'univers,\nl'espai i el temps amb savi dit,\nel cos cansat reanimeu\namb el descans d'aquesta nit.\n\nAmb cor humil us supliquem,\noh Cirst, que sou el germà gran,\nque no pertorbi l'enemic\nels redimits amb vostra Sang.\n\nQue en el temps breu que dura el son,\n-sots vostres ales descansant-\nrecobri forces nostre cos\ni l'esperit vetlli, estimant.\n\nA vós, Jesús, glorifiquem\nque resplendiu vencent la mort,\namb l'etern Pare i l'Esperit,\nara i per segles sense fi.\nAmén";
    switch (liturgicProps.LT) {
      case GLOBAL.Q_SETMANES:
        if(liturgicProps.LT === GLOBAL.Q_SETMANES && setmana !== '4'){
          if(llati === 'true') this.COMPLETES.himne = this.state.himneLlati1;
          else this.COMPLETES.himne = this.state.himneCat1;
        }
        else{
          if(llati === 'true') this.COMPLETES.himne = this.state.himneLlati2;
          else this.COMPLETES.himne = this.state.himneCat2;
        }
        break;
      case GLOBAL.A_SETMANES:
      case GLOBAL.A_FERIES:
        if(llati === 'true') this.COMPLETES.himne = this.state.himneLlati1;
        else this.COMPLETES.himne = this.state.himneCat1;
        break;
      case GLOBAL.N_ABANS:
        if(variables.date.getDate() < 6){
          if(llati === 'true') this.COMPLETES.himne = this.state.himneLlati1;
          else this.COMPLETES.himne = this.state.himneCat1;
        }
        else{
          if(llati === 'true') this.COMPLETES.himne = this.state.himneLlati2;
          else this.COMPLETES.himne = this.state.himneCat2;
        }
        break;
      default:
        if(liturgicProps.tempsespecific === 'Pasqua'){
          this.COMPLETES.himne = himnePasqua;
        }
        else{
          if(llati === 'true') this.COMPLETES.himne = this.state.himneLlati2;
          else this.COMPLETES.himne = this.state.himneCat2;
        }
    }



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
    this.COMPLETES.respBreu1 = "A les vostres mans, Senyor,";
    this.COMPLETES.respBreu2 = "Encomano el meu esperit.";
    this.COMPLETES.respBreu3 = "Vós, Déu fidel, ens heu redimit.";

    this.COMPLETES.antCantic = "Salveu-nos, Senyor, durant el dia, guardeu-nos durant la nit, perquè sigui amb Crist la nostra vetlla i amb Crist el nostre descans."; //TODO: omplir!
    this.COMPLETES.cantic = this.state.cantic;

    this.COMPLETES.oracio = this.state.salteriComuCompletes.oraFi;

    switch (liturgicProps.LT) {
      case GLOBAL.P_SETMANES:
        this.COMPLETES.antifones = false;
        this.COMPLETES.ant1 = "Al·leluia, al·leluia, al·leluia.";
        this.COMPLETES.respBreu1 = "A les vostres mans, Senyor, encomano el meu esperit,";
        this.COMPLETES.respBreu2 = "Al·leluia, al·leluia.";
        this.COMPLETES.respBreu3 = "Vós, Déu fidel, ens heu redimit.";
        this.COMPLETES.antCantic = "Salveu-nos, Senyor, durant el dia, guardeu-nos durant la nit, perquè sigui amb Crist la nostra vetlla i amb Crist el nostre descans. Al·leluia.";
        break;
      case GLOBAL.Q_TRIDU:
        if(weekDay === 6){ //primeres vespres diumenge de pasqua
          //this.COMPLETES.antRespEspecial = "Avui és el dia en què ha obrat el Senyor: alegrem-nos i celebrem-lo, al·leluia.";
          this.COMPLETES.antRespEspecial = "Crist es féu per nosaltres obedient fins a la mort i una mort de creu. Per això Déu l'ha exalçat i li ha concedit aquell nom que està per damunt de tot altre nom."
        }
        break;
      default:
        if(liturgicProps.tempsespecific === 'Pasqua'){
          this.COMPLETES.antifones = false;
          this.COMPLETES.ant1 = "Al·leluia, al·leluia, al·leluia.";
          this.COMPLETES.antRespEspecial = "Avui és el dia en què ha obrat el Senyor: alegrem-nos i celebrem-lo, al·leluia.";
          this.COMPLETES.antCantic = "Salveu-nos, Senyor, durant el dia, guardeu-nos durant la nit, perquè sigui amb Crist la nostra vetlla i amb Crist el nostre descans. Al·leluia.";
        }
    }

    if(liturgicProps.tempsespecific === 'Pasqua')
      this.COMPLETES.antMare = "Reina del cel, alegreu-vos, al·leluia;\nperquè aquell que meresquèreu portar, al·leluia,\nha ressucitat tal com digué, al·leluia.\nPregueu Déu per nosaltres, al·leluia."
    else this.COMPLETES.antMare = this.state.antMare;
  }
}

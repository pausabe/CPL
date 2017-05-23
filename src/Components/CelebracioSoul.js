import GLOBAL from '../Globals/Globals';

export default class CelebracioSoul {
  constructor(props, TABLES, idTSF, HS, SOUL) {

    this.makePrayer(props.date, props.liturgicProps, TABLES, props.celType, props.diocesi, idTSF, HS, SOUL);
  }

  makePrayer(date, liturgicProps, TABLES, celType, diocesi, idTSF, HS, SOUL){
    console.log("celType: " + celType + ", diocesi: " + diocesi);
    //HC
    celType = "F";
    diocesi = "BaD";

    this.OFICI = { //40
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
      himneOhDeu: '-',
      himneOhDeuBool: '-',
      oracio: '-',
    }

    this.LAUDES = { //30
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

    this.TERCIA = { //23
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

    this.SEXTA = { //23
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

    this.TERCIA = { //23
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

    this.VESPRES = { //27
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

    if(idTSF !== -1){
      switch (celType) {
        case "S":
        case "F":
          this.createCel(TABLES, "SF", diocesi, -1);
          break;
        case "M":
        case "L":
          this.createCel(TABLES, "ML", diocesi, -1);
          break;
        case "V":
          this.createCel(TABLES, "V", diocesi, -1);
          break;
      }
    }
    else{
      this.createCel(TABLES, "TSF", diocesi, idTSF);
    }

    CEL = {
      OFICI: this.OFICI,
      LAUDES: this.LAUDES,
      HORA_MENOR: {
        TERCIA: this.TERCIA,
        SEXTA: this.SEXTA,
        TERCIA: this.TERCIA,
      },
      VESPRES: this.VESPRES,
      COMPLETES: this.COMPLETES,
    }

    SOUL.setSoul(HS, "celebracio", CEL);
  }

  createCel(TABLES, type, diocesi, idTSF){
    switch (type) {
      case "TSF":
      this.OFICI = { //40
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
        himneOhDeu: '-',
        himneOhDeuBool: '-',
        oracio: '-',
      }

        this.LAUDES.invitatori: '-',
        this.LAUDES.antInvitatori: '-',
        this.LAUDES.salm94: '-',
        this.LAUDES.himne: '-',
        this.LAUDES.ant1: '-',
        this.LAUDES.titol1: '-',
        this.LAUDES.com1: '-',
        this.LAUDES.salm1: '-',
        this.LAUDES.gloria1: '-',
        this.LAUDES.ant2: '-',
        this.LAUDES.titol2: '-',
        this.LAUDES.com2: '-',
        this.LAUDES.salm2: '-',
        this.LAUDES.gloria2: '-',
        this.LAUDES.ant3: '-',
        this.LAUDES.titol3: '-',
        this.LAUDES.com3: '-',
        this.LAUDES.salm3: '-',
        this.LAUDES.gloria3: '-',
        this.LAUDES.vers: '-',
        this.LAUDES.lecturaBreu: '-',
        this.LAUDES.calAntEspecial: '-',
        this.LAUDES.antEspecialLaudes: '-',
        this.LAUDES.respBreu1: '-',
        this.LAUDES.respBreu2: '-',
        this.LAUDES.respBreu3: '-',
        this.LAUDES.cantic: '-',
        this.LAUDES.antCantic: '-',
        this.LAUDES.pregaries: '-',
        this.LAUDES.oracio: '-',

        this.TERCIA.himne = ;
        this.TERCIA.antifones = ;
        this.TERCIA.ant = ;
        this.TERCIA.ant1 = ;
        this.TERCIA.titol1 = ;
        this.TERCIA.com1 = ;
        this.TERCIA.salm1 = ;
        this.TERCIA.gloria1 = ;
        this.TERCIA.ant2 = ;
        this.TERCIA.titol2 = ;
        this.TERCIA.com2 = ;
        this.TERCIA.salm2 = ;
        this.TERCIA.gloria2 = ;
        this.TERCIA.ant3 = ;
        this.TERCIA.titol3 = ;
        this.TERCIA.com3 = ;
        this.TERCIA.salm3 = ;
        this.TERCIA.gloria3 = ;
        this.TERCIA.vers = ;
        this.TERCIA.lecturaBreu = ;
        this.TERCIA.respV = ;
        this.TERCIA.respR = ;
        this.TERCIA.oracio = ;

        this.SEXTA.himne = ;
        this.SEXTA.antifones = ;
        this.SEXTA.ant = ;
        this.SEXTA.ant1 = ;
        this.SEXTA.titol1 = ;
        this.SEXTA.com1 = ;
        this.SEXTA.salm1 = ;
        this.SEXTA.gloria1 = ;
        this.SEXTA.ant2 = ;
        this.SEXTA.titol2 = ;
        this.SEXTA.com2 = ;
        this.SEXTA.salm2 = ;
        this.SEXTA.gloria2 = ;
        this.SEXTA.ant3 = ;
        this.SEXTA.titol3 = ;
        this.SEXTA.com3 = ;
        this.SEXTA.salm3 = ;
        this.SEXTA.gloria3 = ;
        this.SEXTA.vers = ;
        this.SEXTA.lecturaBreu = ;
        this.SEXTA.respV = ;
        this.SEXTA.respR = ;
        this.SEXTA.oracio = ;

        this.TERCIA.himne = ;
        this.TERCIA.antifones = ;
        this.TERCIA.ant = ;
        this.TERCIA.ant1 = ;
        this.TERCIA.titol1 = ;
        this.TERCIA.com1 = ;
        this.TERCIA.salm1 = ;
        this.TERCIA.gloria1 = ;
        this.TERCIA.ant2 = ;
        this.TERCIA.titol2 = ;
        this.TERCIA.com2 = ;
        this.TERCIA.salm2 = ;
        this.TERCIA.gloria2 = ;
        this.TERCIA.ant3 = ;
        this.TERCIA.titol3 = ;
        this.TERCIA.com3 = ;
        this.TERCIA.salm3 = ;
        this.TERCIA.gloria3 = ;
        this.TERCIA.vers = ;
        this.TERCIA.lecturaBreu = ;
        this.TERCIA.respV = ;
        this.TERCIA.respR = ;
        this.TERCIA.oracio = ;

        this.VESPRES.himne = ;
        this.VESPRES.ant1 = ;
        this.VESPRES.titol1 = ;
        this.VESPRES.com1 = ;
        this.VESPRES.salm1 = ;
        this.VESPRES.gloria1 = ;
        this.VESPRES.ant2 = ;
        this.VESPRES.titol2 = ;
        this.VESPRES.com2 = ;
        this.VESPRES.salm2 = ;
        this.VESPRES.gloria2 = ;
        this.VESPRES.ant3 = ;
        this.VESPRES.titol3 = ;
        this.VESPRES.com3 = ;
        this.VESPRES.salm3 = ;
        this.VESPRES.gloria3 = ;
        this.VESPRES.vers = ;
        this.VESPRES.lecturaBreu = ; = ;
        this.VESPRES.calAntEspecial = ;
        this.VESPRES.antEspecialVespres = ;
        this.VESPRES.respBreu1 = ;
        this.VESPRES.respBreu2 = ;
        this.VESPRES.respBreu3 = ;
        this.VESPRES.cantic = ;
        this.VESPRES.antCantic = ;
        this.VESPRES.pregaries = ;
        this.VESPRES.oracio = ;

        this.COMPLETES.himneLlati = ;
        this.COMPLETES.himneCat = ;
        this.COMPLETES.antifones = ;
        this.COMPLETES.ant1 = ;
        this.COMPLETES.titol1 = ;
        this.COMPLETES.com1 = ;
        this.COMPLETES.salm1 = ;
        this.COMPLETES.gloria1 = ;
        this.COMPLETES.ant2 = ;
        this.COMPLETES.titol2 = ;
        this.COMPLETES.com2 = ;
        this.COMPLETES.salm2 = ;
        this.COMPLETES.gloria2 = ;
        this.COMPLETES.vers = ;
        this.COMPLETES.lecturaBreu = ;
        this.COMPLETES.antRespEspecial = ;
        this.COMPLETES.respBreu1 = ;
        this.COMPLETES.respBreu2 = ;
        this.COMPLETES.respBreu3 = ;
        this.COMPLETES.respV = ;
        this.COMPLETES.respR = ;
        this.COMPLETES.antCantic = ;
        this.COMPLETES.cantic = ;
        this.COMPLETES.oracio = ;
        this.COMPLETES.antMare = ;
        break;
      case "SF":

        break;
      case  "ML":

        break;
      case "V":

        break;
    }
  }
}

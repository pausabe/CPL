import GLOBAL from '../Globals/Globals';

export default class CelebracioSoul {
  constructor(props, TABLES, idTSF, HS, SOUL) {

    this.makePrayer(props.date, props.liturgicProps, TABLES, props.celType, props.diocesi, idTSF, HS, SOUL);
  }

  makePrayer(date, liturgicProps, TABLES, celType, diocesi, idTSF, HS, SOUL){
    console.log("celType: " + celType + ", diocesi: " + diocesi);

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

    this.NONA = { //23
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
        case "V": //santsMemories entrada 457 o 458
          this.createCel(TABLES, "ML", diocesi, -1);
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
        NONA: this.NONA,
      },
      VESPRES: this.VESPRES,
      COMPLETES: this.COMPLETES,
    }


    SOUL.setSoul(HS, "celebracio", CEL);
  }

  createCel(TABLES, type, diocesi, idTSF, llati, anyABC){
    switch (type) {
      case "TSF":
        /*if(llati) this.VESPRES1.himne = TABLES.tempsSolemnitatsFestes.himneVespres1Llati;
        else this.VESPRES1.himne = TABLES.tempsSolemnitatsFestes.himneVespres1Cat;
        this.VESPRES1.ant1 = TABLES.tempsSolemnitatsFestes.ant1Vespres1;
        this.VESPRES1.titol1 = TABLES.tempsSolemnitatsFestes.titol1Vespres1;
        this.VESPRES1.com1 = ".";
        this.VESPRES1.salm1 = TABLES.tempsSolemnitatsFestes.text1Vespres1;
        this.VESPRES1.gloria1 = TABLES.tempsSolemnitatsFestes.gloria1Vespres1;
        this.VESPRES1.ant2 = TABLES.tempsSolemnitatsFestes.ant2Vespres1;
        this.VESPRES1.titol2 = TABLES.tempsSolemnitatsFestes.titol2Vespres1;
        this.VESPRES1.com2 = ".";
        this.VESPRES1.salm2 = TABLES.tempsSolemnitatsFestes.text2Vespres1;
        this.VESPRES1.gloria2 = TABLES.tempsSolemnitatsFestes.gloria2Vespres1;
        this.VESPRES1.ant3 = TABLES.tempsSolemnitatsFestes.ant3Vespres1;
        this.VESPRES1.titol3 = TABLES.tempsSolemnitatsFestes.titol3Vespres1;
        this.VESPRES1.com3 = ".";
        this.VESPRES1.salm3 = TABLES.tempsSolemnitatsFestes.text3Vespres1;
        this.VESPRES1.gloria3 = TABLES.tempsSolemnitatsFestes.gloria3Vespres1;
        this.VESPRES1.vers = TABLES.tempsSolemnitatsFestes.citaLBVespres1;
        this.VESPRES1.lecturaBreu = TABLES.tempsSolemnitatsFestes.lecturaBreuVespres1;
        this.VESPRES1.calAntEspecial = false;
        this.VESPRES1.respBreu1 = TABLES.tempsSolemnitatsFestes.respBreuVespres1Part1;
        this.VESPRES1.respBreu2 = TABLES.tempsSolemnitatsFestes.respBreuVespres1Part2;
        this.VESPRES1.respBreu3 = TABLES.tempsSolemnitatsFestes.respBreuVespres1Part3;
        switch (anyABC) {
          case "A":
            this.VESPRES1.antCantic = TABLES.tempsSolemnitatsFestes.antMaria1A;
            break;
          case "B":
            this.VESPRES1.antCantic = TABLES.tempsSolemnitatsFestes.antMaria1B;
            break;
          case "C":
            this.VESPRES1.antCantic = TABLES.tempsSolemnitatsFestes.antMaria1C;
            break;
        }
        this.VESPRES1.pregaries = TABLES.tempsSolemnitatsFestes.pregariesVespres1;
        this.VESPRES1.oracio = TABLES.tempsSolemnitatsFestes.oraFiVespres1;*/

        this.OFICI.antInvitatori = TABLES.tempsSolemnitatsFestes.antInvitatori;
        if(llati) this.OFICI.himne = TABLES.tempsSolemnitatsFestes.himneOficiLlati;
        else this.OFICI.himne = TABLES.tempsSolemnitatsFestes.himneOficiCat;
        this.OFICI.ant1 = TABLES.tempsSolemnitatsFestes.ant1Ofici;
        this.OFICI.titol1 = TABLES.tempsSolemnitatsFestes.titolSalm1Ofici;
        this.OFICI.com1 = ".";
        this.OFICI.salm1 = TABLES.tempsSolemnitatsFestes.salm1Ofici;
        this.OFICI.gloria1 = TABLES.tempsSolemnitatsFestes.gloriaOfici1;
        this.OFICI.ant2 = TABLES.tempsSolemnitatsFestes.ant2Ofici;
        this.OFICI.titol2 = TABLES.tempsSolemnitatsFestes.titolSalm2Ofici;
        this.OFICI.com2 = ".";
        this.OFICI.salm2 = TABLES.tempsSolemnitatsFestes.salm2Ofici;
        this.OFICI.gloria2 = TABLES.tempsSolemnitatsFestes.gloriaOfici2;
        this.OFICI.ant3 = TABLES.tempsSolemnitatsFestes.ant3Ofici;
        this.OFICI.titol3 = TABLES.tempsSolemnitatsFestes.titolSalm3Ofici;
        this.OFICI.com3 = ".";
        this.OFICI.salm3 = TABLES.tempsSolemnitatsFestes.salm3Ofici;
        this.OFICI.gloria3 = TABLES.tempsSolemnitatsFestes.gloriaOfici3;
        this.OFICI.respV = TABLES.tempsSolemnitatsFestes.respVOfici;
        this.OFICI.respR = TABLES.tempsSolemnitatsFestes.respROfici;
        this.OFICI.referencia1 = TABLES.tempsSolemnitatsFestes.referencia1;
        this.OFICI.cita1 = TABLES.tempsSolemnitatsFestes.citaLect1Ofici;
        this.OFICI.titolLectura1 = TABLES.tempsSolemnitatsFestes.titolLect1Ofici;
        this.OFICI.lectura1 = TABLES.tempsSolemnitatsFestes.lecture1;
        this.OFICI.citaResp1 = TABLES.tempsSolemnitatsFestes.citaResp1Ofici;
        this.OFICI.resp1Part1 = TABLES.tempsSolemnitatsFestes.resp1Part1Ofici;
        this.OFICI.resp1Part2 = TABLES.tempsSolemnitatsFestes.resp1Part2Ofici;
        this.OFICI.resp1Part3 = TABLES.tempsSolemnitatsFestes.resp1Part3Ofici;
        this.OFICI.referencia2 = TABLES.tempsSolemnitatsFestes.referencia2Ofici;
        this.OFICI.cita2 = TABLES.tempsSolemnitatsFestes.citaLect2Ofici;
        this.OFICI.titolLectura2 = TABLES.tempsSolemnitatsFestes.titolLect2Ofici;
        this.OFICI.lectura2 = TABLES.tempsSolemnitatsFestes.lectura2;
        this.OFICI.versResp2 = TABLES.tempsSolemnitatsFestes.citaResp2Ofici;
        this.OFICI.resp2Part1 = TABLES.tempsSolemnitatsFestes.resp2Part1Ofici;
        this.OFICI.resp2Part2 = TABLES.tempsSolemnitatsFestes.resp2Part2Ofici;
        this.OFICI.resp2Part3 = TABLES.tempsSolemnitatsFestes.resp3Part3Ofici;
        this.OFICI.himneOhDeu = TABLES.tempsSolemnitatsFestes.oraFiOfici;
        this.OFICI.himneOhDeuBool = true;
        this.OFICI.oracio = TABLES.tempsSolemnitatsFestes.oraFiOfici;

        this.LAUDES.antInvitatori = TABLES.tempsSolemnitatsFestes.antInvitatori;
        if(llati) this.LAUDES.himne = TABLES.tempsSolemnitatsFestes.himneLaudesLlati;
        else this.LAUDES.himne = TABLES.tempsSolemnitatsFestes.himneLaudesCat;
        this.LAUDES.ant1 = TABLES.tempsSolemnitatsFestes.ant1Laudes;
        this.LAUDES.ant2 = TABLES.tempsSolemnitatsFestes.ant2Laudes;
        this.LAUDES.ant3 = TABLES.tempsSolemnitatsFestes.ant3Laudes;
        this.LAUDES.vers = TABLES.tempsSolemnitatsFestes.citaLBLaudes;
        this.LAUDES.lecturaBreu = TABLES.tempsSolemnitatsFestes.lecturaBreuLaudes;
        this.LAUDES.calAntEspecial = false;
        this.LAUDES.respBreu1 = TABLES.tempsSolemnitatsFestes.resp2Part1Laudes;
        this.LAUDES.respBreu2 = TABLES.tempsSolemnitatsFestes.resp2Part2Laudes;
        this.LAUDES.respBreu3 = TABLES.tempsSolemnitatsFestes.resp2Part3Laudes;
        switch (anyABC) {
          case "A":
            this.LAUDES.antCantic = TABLES.tempsSolemnitatsFestes.antZacariesA;
            break;
          case "B":
            this.LAUDES.antCantic = TABLES.tempsSolemnitatsFestes.antZacariesB;
            break;
          case "C":
            this.LAUDES.antCantic = TABLES.tempsSolemnitatsFestes.antZacariesC;
            break;
        }

        this.LAUDES.pregaries = TABLES.tempsSolemnitatsFestes.pregariesLaudes;
        this.LAUDES.oracio = TABLES.tempsSolemnitatsFestes.oraFiLaudes;

        if(llati) this.TERCIA.himne = TABLES.tempsSolemnitatsFestes.himneLlatiTercia;
        else this.TERCIA.himne = TABLES.tempsSolemnitatsFestes.himneCatTercia;
        this.TERCIA.antifones = false;
        this.TERCIA.ant = TABLES.tempsSolemnitatsFestes.antMenorTercia;
        this.TERCIA.titol1 = TABLES.tempsSolemnitatsFestes.titolSalm1;
        this.TERCIA.com1 = ".";
        this.TERCIA.salm1 = TABLES.tempsSolemnitatsFestes.salm1Menor;
        this.TERCIA.gloria1 = TABLES.tempsSolemnitatsFestes.gloriaSalm1;
        this.TERCIA.titol2 = TABLES.tempsSolemnitatsFestes.titolSalm2;
        this.TERCIA.com2 = ".";
        this.TERCIA.salm2 = TABLES.tempsSolemnitatsFestes.salm2Menor;
        this.TERCIA.gloria2 = TABLES.tempsSolemnitatsFestes.gloriaSalm2;
        this.TERCIA.titol3 = TABLES.tempsSolemnitatsFestes.titolSalm3;
        this.TERCIA.com3 = ".";
        this.TERCIA.salm3 = TABLES.tempsSolemnitatsFestes.salm3Menor;
        this.TERCIA.gloria3 = TABLES.tempsSolemnitatsFestes.gloriaSalm3;
        this.TERCIA.vers = TABLES.tempsSolemnitatsFestes.citaLBTercia;
        this.TERCIA.lecturaBreu = TABLES.tempsSolemnitatsFestes.lecturaBreuTercia;
        this.TERCIA.respV = TABLES.tempsSolemnitatsFestes.responsoriVTercia;
        this.TERCIA.respR = TABLES.tempsSolemnitatsFestes.responsoriRTercia;
        this.TERCIA.oracio = TABLES.tempsSolemnitatsFestes.oraFiMenor;

        if(llati) this.SEXTA.himne = TABLES.tempsSolemnitatsFestes.himneLlatiTercia; //TODO: agafo himne de Tecia
        else this.SEXTA.himne = TABLES.tempsSolemnitatsFestes.himneCatTercia; //TODO: agafo himne de Tecia
        this.SEXTA.antifones = false;
        this.SEXTA.ant = TABLES.tempsSolemnitatsFestes.antMenorSexta;
        this.SEXTA.titol1 = TABLES.tempsSolemnitatsFestes.titolSalm1;
        this.SEXTA.com1 = ".";
        this.SEXTA.salm1 = TABLES.tempsSolemnitatsFestes.salm1Menor;
        this.SEXTA.gloria1 = TABLES.tempsSolemnitatsFestes.gloriaSalm1;
        this.SEXTA.titol2 = TABLES.tempsSolemnitatsFestes.titolSalm2;
        this.SEXTA.com2 = ".";
        this.SEXTA.salm2 = TABLES.tempsSolemnitatsFestes.salm2Menor;
        this.SEXTA.gloria2 = TABLES.tempsSolemnitatsFestes.gloriaSalm2;
        this.SEXTA.titol3 = TABLES.tempsSolemnitatsFestes.titolSalm3;
        this.SEXTA.com3 = ".";
        this.SEXTA.salm3 = TABLES.tempsSolemnitatsFestes.salm3Menor;
        this.SEXTA.gloria3 = TABLES.tempsSolemnitatsFestes.gloriaSalm3;
        this.SEXTA.vers = TABLES.tempsSolemnitatsFestes.citaLBSexta;
        this.SEXTA.lecturaBreu = TABLES.tempsSolemnitatsFestes.lecturaBreuSexta;
        this.SEXTA.respV = TABLES.tempsSolemnitatsFestes.responsoriVSexta;
        this.SEXTA.respR = TABLES.tempsSolemnitatsFestes.responsoriRSexta;
        this.SEXTA.oracio = TABLES.tempsSolemnitatsFestes.oraFiMenor;

        if(llati) this.NONA.himne = TABLES.tempsSolemnitatsFestes.himneLlatiTercia; //TODO: agafo himne de Tecia
        else this.NONA.himne = TABLES.tempsSolemnitatsFestes.himneCatTercia; //TODO: agafo himne de Tecia
        this.NONA.antifones = false;
        this.NONA.ant = TABLES.tempsSolemnitatsFestes.antMenorNona;
        this.NONA.titol1 = TABLES.tempsSolemnitatsFestes.titolSalm1;
        this.NONA.com1 = ".";
        this.NONA.salm1 = TABLES.tempsSolemnitatsFestes.salm1Menor;
        this.NONA.gloria1 = TABLES.tempsSolemnitatsFestes.gloriaSalm1;
        this.NONA.titol2 = TABLES.tempsSolemnitatsFestes.titolSalm2;
        this.NONA.com2 = ".";
        this.NONA.salm2 = TABLES.tempsSolemnitatsFestes.salm2Menor;
        this.NONA.gloria2 = TABLES.tempsSolemnitatsFestes.gloriaSalm2;
        this.NONA.titol3 = TABLES.tempsSolemnitatsFestes.titolSalm3;
        this.NONA.com3 = ".";
        this.NONA.salm3 = TABLES.tempsSolemnitatsFestes.salm3Menor;
        this.NONA.gloria3 = TABLES.tempsSolemnitatsFestes.gloriaSalm3;
        this.NONA.vers = TABLES.tempsSolemnitatsFestes.citaLBNona;
        this.NONA.lecturaBreu = TABLES.tempsSolemnitatsFestes.lecturaBreuNona;
        this.NONA.respV = TABLES.tempsSolemnitatsFestes.responsoriVNona;
        this.NONA.respR = TABLES.tempsSolemnitatsFestes.responsoriRNona;
        this.NONA.oracio = TABLES.tempsSolemnitatsFestes.oraFiMenor;

        if(llati) this.VESPRES.himne = TABLES.tempsSolemnitatsFestes.himneVespres2Llati;
        else this.VESPRES.himne = TABLES.tempsSolemnitatsFestes.himneVespres2Cat;
        this.VESPRES.ant1 = TABLES.tempsSolemnitatsFestes.ant1Vespres2;
        this.VESPRES.titol1 = TABLES.tempsSolemnitatsFestes.titol1Vespres2;
        this.VESPRES.com1 = ".";
        this.VESPRES.salm1 = TABLES.tempsSolemnitatsFestes.text1Vespres2;
        this.VESPRES.gloria1 = TABLES.tempsSolemnitatsFestes.gloria1Vespres2;
        this.VESPRES.ant2 = TABLES.tempsSolemnitatsFestes.ant2Vespres2;
        this.VESPRES.titol2 = TABLES.tempsSolemnitatsFestes.titol2Vespres2;
        this.VESPRES.com2 = ".";
        this.VESPRES.salm2 = TABLES.tempsSolemnitatsFestes.text2Vespres2;
        this.VESPRES.gloria2 = TABLES.tempsSolemnitatsFestes.gloria2Vespres2;
        this.VESPRES.ant3 = TABLES.tempsSolemnitatsFestes.ant3Vespres2;
        this.VESPRES.titol3 = TABLES.tempsSolemnitatsFestes.titol3Vespres2;
        this.VESPRES.com3 = ".";
        this.VESPRES.salm3 = TABLES.tempsSolemnitatsFestes.text3Vespres2;
        this.VESPRES.gloria3 = TABLES.tempsSolemnitatsFestes.gloria3Vespres2;
        this.VESPRES.vers = TABLES.tempsSolemnitatsFestes.citaLBVespres2;
        this.VESPRES.lecturaBreu = TABLES.tempsSolemnitatsFestes.lecturaBreuVespres2;
        this.VESPRES.calAntEspecial = false;
        this.VESPRES.respBreu1 = TABLES.tempsSolemnitatsFestes.respBreuVespres2Part1;
        this.VESPRES.respBreu2 = TABLES.tempsSolemnitatsFestes.respBreuVespres2Part2;
        this.VESPRES.respBreu3 = TABLES.tempsSolemnitatsFestes.respBreuVespres2Part3;
        switch (anyABC) {
          case "A":
            this.VESPRES.antCantic = TABLES.tempsSolemnitatsFestes.antMaria2A;
            break;
          case "B":
            this.VESPRES.antCantic = TABLES.tempsSolemnitatsFestes.antMaria2B;
            break;
          case "C":
            this.VESPRES.antCantic = TABLES.tempsSolemnitatsFestes.antMaria2C;
            break;
        }
        this.VESPRES.pregaries = TABLES.tempsSolemnitatsFestes.pregariesVespres2;
        this.VESPRES.oracio = TABLES.tempsSolemnitatsFestes.oraFiVespres2;
        break;
      case "SF":
        /*if(this.VESPRES1.himne = TABLES.santsSolemnitats.himneVespres1Llati !== '-'){
          if(llati) this.VESPRES1.himne = TABLES.santsSolemnitats.himneVespres1Llati;
          else this.VESPRES1.himne = TABLES.santsSolemnitats.himneVespres1Cat;
        }
        else if(TABLES.OficisComuns !== null){
          if(llati) this.VESPRES1.himne = TABLES.OficisComuns.himneVespres1Llati;
          else this.VESPRES1.himne = TABLES.OficisComuns.himneVespres1Cat;
        }
        if(TABLES.santsSolemnitats.ant1Vespres1 !== '-')
          this.VESPRES1.ant1 = TABLES.santsSolemnitats.ant1Vespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.ant1 = TABLES.OficisComuns.ant1Vespres1;
        if(TABLES.santsSolemnitats.titol1Vespres1 !== '-')
          this.VESPRES1.titol1 = TABLES.santsSolemnitats.titol1Vespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.titol1 = TABLES.OficisComuns.titol1Vespres1;
        this.VESPRES1.com1 = ".";
        if(TABLES.santsSolemnitats.text1Vespres1 !== '-')
          this.VESPRES1.salm1 = TABLES.santsSolemnitats.text1Vespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.salm1 = TABLES.OficisComuns.text1Vespres1;
        if(TABLES.santsSolemnitats.gloria1Vespres1 !== '-')
          this.VESPRES1.gloria1 = TABLES.santsSolemnitats.gloria1Vespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.gloria1 = TABLES.OficisComuns.gloria1Vespres1;
        if(TABLES.santsSolemnitats.ant2Vespres1 !== '-')
          this.VESPRES1.ant2 = TABLES.santsSolemnitats.ant2Vespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.ant2 = TABLES.OficisComuns.ant2Vespres1;
        if(TABLES.santsSolemnitats.titol2Vespres1 !== '-')
          this.VESPRES1.titol2 = TABLES.santsSolemnitats.titol2Vespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.titol2 = TABLES.OficisComuns.titol2Vespres1;
        this.VESPRES1.com2 = ".";
        if(TABLES.santsSolemnitats.text2Vespres1 !== '-')
          this.VESPRES1.salm2 = TABLES.santsSolemnitats.text2Vespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.salm2 = TABLES.OficisComuns.text2Vespres1;
        if(TABLES.santsSolemnitats.gloria2Vespres1 !== '-')
          this.VESPRES1.gloria2 = TABLES.santsSolemnitats.gloria2Vespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.gloria2 = TABLES.OficisComuns.gloria2Vespres1;
        if(TABLES.santsSolemnitats.ant3Vespres1 !== '-')
          this.VESPRES1.ant3 = TABLES.santsSolemnitats.ant3Vespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.ant3 = TABLES.OficisComuns.ant3Vespres1;
        if(TABLES.santsSolemnitats.titol3Vespres1 !== '-')
          this.VESPRES1.titol3 = TABLES.santsSolemnitats.titol3Vespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.titol3 = TABLES.OficisComuns.titol3Vespres1;
        this.VESPRES1.com3 = ".";
        if(TABLES.santsSolemnitats.text3Vespres1 !== '-')
          this.VESPRES1.salm3 = TABLES.santsSolemnitats.text3Vespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.salm3 = TABLES.OficisComuns.text3Vespres1;
        if(TABLES.santsSolemnitats.gloria3Vespres1 !== '-')
          this.VESPRES1.gloria3 = TABLES.santsSolemnitats.gloria3Vespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.gloria3 = TABLES.OficisComuns.gloria3Vespres1;
        if(TABLES.santsSolemnitats.citaLBVespres1 !== '-')
          this.VESPRES1.vers = TABLES.santsSolemnitats.citaLBVespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.vers = TABLES.OficisComuns.citaLBVespres1;
        if(TABLES.santsSolemnitats.lecturaBreuVespres1 !== '-')
          this.VESPRES1.lecturaBreu = TABLES.santsSolemnitats.lecturaBreuVespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.lecturaBreu = TABLES.OficisComuns.lecturaBreuVespres1;
        this.VESPRES1.calAntEspecial = false;
        if(TABLES.santsSolemnitats.respBreuVespres1Part1 !== '-')
          this.VESPRES1.respBreu1 = TABLES.santsSolemnitats.respBreuVespres1Part1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.respBreu1 = TABLES.OficisComuns.respBreuVespres1Part1;
        if(TABLES.santsSolemnitats.respBreuVespres1Part2 !== '-')
          this.VESPRES1.respBreu2 = TABLES.santsSolemnitats.respBreuVespres1Part2;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.respBreu2 = TABLES.OficisComuns.respBreuVespres1Part2;
        if(TABLES.santsSolemnitats.respBreuVespres1Part3 !== '-')
          this.VESPRES1.respBreu3 = TABLES.santsSolemnitats.respBreuVespres1Part3;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.respBreu3 = TABLES.OficisComuns.respBreuVespres1Part3;
        if(TABLES.santsSolemnitats.antMaria1 !== '-')
          this.VESPRES1.antCantic = TABLES.santsSolemnitats.antMaria1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.antCantic = TABLES.OficisComuns.antMaria1;
        if(TABLES.santsSolemnitats.pregariesVespres1 !== '-')
          this.VESPRES1.pregaries = TABLES.santsSolemnitats.pregariesVespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.pregaries = TABLES.OficisComuns.pregariesVespres1;
        if(TABLES.santsSolemnitats.oraFiVespres1 !== '-')
          this.VESPRES1.oracio = TABLES.santsSolemnitats.oraFiVespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.oracio = TABLES.OficisComuns.oraFiVespres1;*/

        if(TABLES.santsSolemnitats.antInvitatori !== '-')
          this.OFICI.antInvitatori = TABLES.santsSolemnitats.antInvitatori;
        else this.OFICI.antInvitatori = TABLES.OficisComuns.antInvitatori;
        if(TABLES.santsSolemnitats.himneOficiLlati !== '-'){
          if(llati) this.OFICI.himne = TABLES.santsSolemnitats.himneOficiLlati;
          else this.OFICI.himne = TABLES.santsSolemnitats.himneOficiCat;
        }
        else if(TABLES.OficisComuns !== null) {
          if(llati) this.OFICI.himne = TABLES.OficisComuns.himneOficiLlati;
          else this.OFICI.himne = TABLES.OficisComuns.himneOficiCat;
        }
        if(TABLES.santsSolemnitats.ant1Ofici !== '-')
          this.OFICI.ant1 = TABLES.santsSolemnitats.ant1Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.ant1 = TABLES.OficisComuns.ant1Ofici;
        if(TABLES.santsSolemnitats.titolSalm1Ofici !== '-')
          this.OFICI.titol1 = TABLES.santsSolemnitats.titolSalm1Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.titol1 = TABLES.OficisComuns.titolSalm1Ofici;
        this.OFICI.com1 = ".";
        if(TABLES.santsSolemnitats.salm1Ofici !== '-')
          this.OFICI.salm1 = TABLES.santsSolemnitats.salm1Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.salm1 = TABLES.OficisComuns.salm1Ofici;
        if(TABLES.santsSolemnitats.gloriaOfici1 !== '-')
          this.OFICI.gloria1 = TABLES.santsSolemnitats.gloriaOfici1;
        else if(TABLES.OficisComuns !== null) this.OFICI.gloria1 = TABLES.OficisComuns.gloriaOfici1;
        if(TABLES.santsSolemnitats.ant2Ofici !== '-')
          this.OFICI.ant2 = TABLES.santsSolemnitats.ant2Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.ant2 = TABLES.OficisComuns.ant2Ofici;
        if(TABLES.santsSolemnitats.titolSalm2Ofici !== '-')
          this.OFICI.titol2 = TABLES.santsSolemnitats.titolSalm2Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.titol2 = TABLES.OficisComuns.titolSalm2Ofici;
        this.OFICI.com2 = ".";
        if(TABLES.santsSolemnitats.salm2Ofici !== '-')
          this.OFICI.salm2 = TABLES.santsSolemnitats.salm2Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.salm2 = TABLES.OficisComuns.salm2Ofici;
        if(TABLES.santsSolemnitats.gloriaOfici2 !== '-')
          this.OFICI.gloria2 = TABLES.santsSolemnitats.gloriaOfici2;
        else if(TABLES.OficisComuns !== null) this.OFICI.gloria2 = TABLES.OficisComuns.gloriaOfici2;
        if(TABLES.santsSolemnitats.ant3Ofici !== '-')
          this.OFICI.ant3 = TABLES.santsSolemnitats.ant3Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.ant3 = TABLES.OficisComuns.ant3Ofici;
        if(TABLES.santsSolemnitats.titolSalm3Ofici !== '-')
          this.OFICI.titol3 = TABLES.santsSolemnitats.titolSalm3Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.titol3 = TABLES.OficisComuns.titolSalm3Ofici;
        this.OFICI.com3 = ".";
        if(TABLES.santsSolemnitats.salm3Ofici !== '-')
          this.OFICI.salm3 = TABLES.santsSolemnitats.salm3Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.salm3 = TABLES.OficisComuns.salm3Ofici;
        if(TABLES.santsSolemnitats.gloriaOfici3 !== '-')
          this.OFICI.gloria3 = TABLES.santsSolemnitats.gloriaOfici3;
        else if(TABLES.OficisComuns !== null) this.OFICI.gloria3 = TABLES.OficisComuns.gloriaOfici3;
        if(TABLES.santsSolemnitats.respVOfici !== '-')
          this.OFICI.respV = TABLES.santsSolemnitats.respVOfici;
        else if(TABLES.OficisComuns !== null) this.OFICI.respV = TABLES.OficisComuns.respVOfici;
        if(TABLES.santsSolemnitats.respROfici !== '-')
          this.OFICI.respR = TABLES.santsSolemnitats.respROfici;
        else if(TABLES.OficisComuns !== null) this.OFICI.respR = TABLES.OficisComuns.respROfici;
        if(TABLES.santsSolemnitats.referencia1 !== '-')
          this.OFICI.referencia1 = TABLES.santsSolemnitats.referencia1;
        else if(TABLES.OficisComuns !== null) this.OFICI.referencia1 = TABLES.OficisComuns.referencia1;
        if(TABLES.santsSolemnitats.citaLect1Ofici !== '-')
          this.OFICI.cita1 = TABLES.santsSolemnitats.citaLect1Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.cita1 = TABLES.OficisComuns.citaLect1Ofici;
        if(TABLES.santsSolemnitats.titolLect1Ofici !== '-')
          this.OFICI.titolLectura1 = TABLES.santsSolemnitats.titolLect1Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.titolLectura1 = TABLES.OficisComuns.titolLect1Ofici;
        if(TABLES.santsSolemnitats.lecture1 !== '-')
          this.OFICI.lectura1 = TABLES.santsSolemnitats.lecture1;
        else if(TABLES.OficisComuns !== null) this.OFICI.lectura1 = TABLES.OficisComuns.lecture1;
        if(TABLES.santsSolemnitats.citaResp1Ofici !== '-')
          this.OFICI.citaResp1 = TABLES.santsSolemnitats.citaResp1Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.citaResp1 = TABLES.OficisComuns.citaResp1Ofici;
        if(TABLES.santsSolemnitats.resp1Part1Ofici !== '-')
          this.OFICI.resp1Part1 = TABLES.santsSolemnitats.resp1Part1Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.resp1Part1 = TABLES.OficisComuns.resp1Part1Ofici;
        if(TABLES.santsSolemnitats.resp1Part2Ofici !== '-')
          this.OFICI.resp1Part2 = TABLES.santsSolemnitats.resp1Part2Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.resp1Part2 = TABLES.OficisComuns.resp1Part2Ofici;
        if(TABLES.santsSolemnitats.resp1Part3Ofici !== '-')
          this.OFICI.resp1Part3 = TABLES.santsSolemnitats.resp1Part3Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.resp1Part3 = TABLES.OficisComuns.resp1Part3Ofici;
        if(TABLES.santsSolemnitats.referencia2Ofici !== '-')
          this.OFICI.referencia2 = TABLES.santsSolemnitats.referencia2Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.referencia2 = TABLES.OficisComuns.referencia2Ofici;
        if(TABLES.santsSolemnitats.citaLect2Ofici !== '-')
          this.OFICI.cita2 = TABLES.santsSolemnitats.citaLect2Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.cita2 = TABLES.OficisComuns.citaLect2Ofici;
        if(TABLES.santsSolemnitats.titolLect2Ofici !== '-')
          this.OFICI.titolLectura2 = TABLES.santsSolemnitats.titolLect2Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.titolLectura2 = TABLES.OficisComuns.titolLect2Ofici;
        if(TABLES.santsSolemnitats.lectura2 !== '-')
          this.OFICI.lectura2 = TABLES.santsSolemnitats.lectura2;
        else if(TABLES.OficisComuns !== null) this.OFICI.lectura2 = TABLES.OficisComuns.lectura2;
        if(TABLES.santsSolemnitats.citaResp2Ofici !== '-')
          this.OFICI.versResp2 = TABLES.santsSolemnitats.citaResp2Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.versResp2 = TABLES.OficisComuns.citaResp2Ofici;
        if(TABLES.santsSolemnitats.resp2Part1Ofici !== '-')
          this.OFICI.resp2Part1 = TABLES.santsSolemnitats.resp2Part1Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.resp2Part1 = TABLES.OficisComuns.resp2Part1Ofici;
        if(TABLES.santsSolemnitats.resp2Part2Ofici !== '-')
          this.OFICI.resp2Part2 = TABLES.santsSolemnitats.resp2Part2Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.resp2Part2 = TABLES.OficisComuns.resp2Part2Ofici;
        if(TABLES.santsSolemnitats.resp3Part3Ofici !== '-')
          this.OFICI.resp2Part3 = TABLES.santsSolemnitats.resp3Part3Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.resp2Part3 = TABLES.OficisComuns.resp3Part3Ofici;
        if(TABLES.santsSolemnitats.oraFiOfici !== '-')
          this.OFICI.himneOhDeu = TABLES.santsSolemnitats.oraFiOfici;
        else if(TABLES.OficisComuns !== null) this.OFICI.himneOhDeu = TABLES.OficisComuns.oraFiOfici;
        this.OFICI.himneOhDeuBool = true;
        if(TABLES.santsSolemnitats.oraFiOfici !== '-')
          this.OFICI.oracio = TABLES.santsSolemnitats.oraFiOfici;
        else if(TABLES.OficisComuns !== null) this.OFICI.oracio = TABLES.OficisComuns.oraFiOfici;

        if(TABLES.santsSolemnitats.antInvitatori !== '-')
          this.LAUDES.antInvitatori = TABLES.santsSolemnitats.antInvitatori;
        else if(TABLES.OficisComuns !== null) this.LAUDES.antInvitatori = TABLES.OficisComuns.antInvitatori;
        if(TABLES.santsSolemnitats.himneLaudesLlati !== '-'){
          if(llati) this.LAUDES.himne = TABLES.santsSolemnitats.himneLaudesLlati;
          else this.LAUDES.himne = TABLES.santsSolemnitats.himneLaudesCat;
        }
        else if(TABLES.OficisComuns !== null){
          if(llati) this.LAUDES.himne = TABLES.OficisComuns.himneLaudesLlati;
          else this.LAUDES.himne = TABLES.OficisComuns.himneLaudesCat;
        }
        if(TABLES.santsSolemnitats.ant1Laudes !== '-')
          this.LAUDES.ant1 = TABLES.santsSolemnitats.ant1Laudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.ant1 = TABLES.OficisComuns.ant1Laudes;
        if(TABLES.santsSolemnitats.ant2Laudes !== '-')
          this.LAUDES.ant2 = TABLES.santsSolemnitats.ant2Laudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.ant2 = TABLES.OficisComuns.ant2Laudes;
        if(TABLES.santsSolemnitats.ant3Laudes !== '-')
          this.LAUDES.ant3 = TABLES.santsSolemnitats.ant3Laudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.ant3 = TABLES.OficisComuns.ant3Laudes;
        if(TABLES.santsSolemnitats.citaLBLaudes !== '-')
          this.LAUDES.vers = TABLES.santsSolemnitats.citaLBLaudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.vers = TABLES.OficisComuns.citaLBLaudes;
        if(TABLES.santsSolemnitats.lecturaBreuLaudes !== '-')
          this.LAUDES.lecturaBreu = TABLES.santsSolemnitats.lecturaBreuLaudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.lecturaBreu = TABLES.OficisComuns.lecturaBreuLaudes;
        this.LAUDES.calAntEspecial = false;
        if(TABLES.santsSolemnitats.resp2Part1Laudes !== '-')
          this.LAUDES.respBreu1 = TABLES.santsSolemnitats.resp2Part1Laudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.respBreu1 = TABLES.OficisComuns.resp2Part1Laudes;
        if(TABLES.santsSolemnitats.resp2Part2Laudes !== '-')
          this.LAUDES.respBreu2 = TABLES.santsSolemnitats.resp2Part2Laudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.respBreu2 = TABLES.OficisComuns.resp2Part2Laudes;
        if(TABLES.santsSolemnitats !== '-')
          this.LAUDES.respBreu3 = TABLES.santsSolemnitats.resp2Part3Laudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.respBreu3 = TABLES.OficisComuns.resp2Part3Laudes;
        if(TABLES.santsSolemnitats.antZacaries !== '-')
          this.LAUDES.antCantic = TABLES.santsSolemnitats.antZacaries;
        else if(TABLES.OficisComuns !== null) this.LAUDES.antCantic = TABLES.OficisComuns.antZacaries;
        if(TABLES.santsSolemnitats.pregariesLaudes !== '-')
          this.LAUDES.pregaries = TABLES.santsSolemnitats.pregariesLaudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.pregaries = TABLES.OficisComuns.pregariesLaudes;
        if(TABLES.santsSolemnitats.oraFiLaudes !== '-')
          this.LAUDES.oracio = TABLES.santsSolemnitats.oraFiLaudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.oracio = TABLES.OficisComuns.oraFiLaudes;

        this.TERCIA.antifones = false;
        if(TABLES.santsSolemnitats.antMenorTercia !== '-')
          this.TERCIA.ant = TABLES.santsSolemnitats.antMenorTercia;
        else if(TABLES.OficisComuns !== null) this.TERCIA.ant = TABLES.OficisComuns.antMenorTercia;
        if(TABLES.santsSolemnitats.titolSalm1 !== '-')
          this.TERCIA.titol1 = TABLES.santsSolemnitats.titolSalm1;
        else if(TABLES.OficisComuns !== null) this.TERCIA.titol1 = TABLES.OficisComuns.titolSalm1;
        this.TERCIA.com1 = ".";
        if(TABLES.santsSolemnitats.salm1Menor !== '-')
          this.TERCIA.salm1 = TABLES.santsSolemnitats.salm1Menor;
        else if(TABLES.OficisComuns !== null) this.TERCIA.salm1 = TABLES.OficisComuns.salm1Menor;
        if(TABLES.santsSolemnitats.gloriaSalm1 !== '-')
          this.TERCIA.gloria1 = TABLES.santsSolemnitats.gloriaSalm1;
        else if(TABLES.OficisComuns !== null) this.TERCIA.gloria1 = TABLES.OficisComuns.gloriaSalm1;
        if(TABLES.santsSolemnitats.titolSalm2 !== '-')
          this.TERCIA.titol2 = TABLES.santsSolemnitats.titolSalm2;
        else if(TABLES.OficisComuns !== null) this.TERCIA.titol2 = TABLES.OficisComuns.titolSalm2;
        this.TERCIA.com2 = ".";
        if(TABLES.santsSolemnitats.salm2Menor !== '-')
          this.TERCIA.salm2 = TABLES.santsSolemnitats.salm2Menor;
        else if(TABLES.OficisComuns !== null) this.TERCIA.salm2 = TABLES.OficisComuns.salm2Menor;
        if(TABLES.santsSolemnitats.gloriaSalm2 !== '-')
          this.TERCIA.gloria2 = TABLES.santsSolemnitats.gloriaSalm2;
        else if(TABLES.OficisComuns !== null) this.TERCIA.gloria2 = TABLES.OficisComuns.gloriaSalm2;
        if(TABLES.santsSolemnitats.titolSalm3 !== '-')
          this.TERCIA.titol3 = TABLES.santsSolemnitats.titolSalm3;
        else if(TABLES.OficisComuns !== null) this.TERCIA.titol3 = TABLES.OficisComuns.titolSalm3;
        this.TERCIA.com3 = ".";
        if(TABLES.santsSolemnitats.salm3Menor !== '-')
          this.TERCIA.salm3 = TABLES.santsSolemnitats.salm3Menor;
        else if(TABLES.OficisComuns !== null) this.TERCIA.salm3 = TABLES.OficisComuns.salm3Menor;
        if(TABLES.santsSolemnitats.gloriaSalm3 !== '-')
          this.TERCIA.gloria3 = TABLES.santsSolemnitats.gloriaSalm3;
        else if(TABLES.OficisComuns !== null) this.TERCIA.gloria3 = TABLES.OficisComuns.gloriaSalm3;
        if(TABLES.santsSolemnitats.citaLBTercia !== '-')
          this.TERCIA.vers = TABLES.santsSolemnitats.citaLBTercia;
        else if(TABLES.OficisComuns !== null) this.TERCIA.vers = TABLES.OficisComuns.citaLBTercia;
        if(TABLES.santsSolemnitats.lecturaBreuTercia !== '-')
          this.TERCIA.lecturaBreu = TABLES.santsSolemnitats.lecturaBreuTercia;
        else if(TABLES.OficisComuns !== null) this.TERCIA.lecturaBreu = TABLES.OficisComuns.lecturaBreuTercia;
        if(TABLES.santsSolemnitats.responsoriVTercia !== '-')
          this.TERCIA.respV = TABLES.santsSolemnitats.responsoriVTercia;
        else if(TABLES.OficisComuns !== null) this.TERCIA.respV = TABLES.OficisComuns.responsoriVTercia;
        if(TABLES.santsSolemnitats.responsoriRTercia !== '-')
          this.TERCIA.respR = TABLES.santsSolemnitats.responsoriRTercia;
        else if(TABLES.OficisComuns !== null) this.TERCIA.respR = TABLES.OficisComuns.responsoriRTercia;
        if(TABLES.santsSolemnitats.oraFiMenor !== '-')
          this.TERCIA.oracio = TABLES.santsSolemnitats.oraFiMenor;
        else if(TABLES.OficisComuns !== null) this.TERCIA.oracio = TABLES.OficisComuns.oraFiMenor;

        this.SEXTA.antifones = false;
        if(TABLES.santsSolemnitats.antMenorSexta !== '-')
          this.SEXTA.ant = TABLES.santsSolemnitats.antMenorSexta;
        else if(TABLES.OficisComuns !== null) this.SEXTA.ant = TABLES.OficisComuns.antMenorSexta;
        if(TABLES.santsSolemnitats.titolSalm1 !== '-')
          this.SEXTA.titol1 = TABLES.santsSolemnitats.titolSalm1;
        else if(TABLES.OficisComuns !== null) this.SEXTA.titol1 = TABLES.OficisComuns.titolSalm1;
        this.SEXTA.com1 = ".";
        if(TABLES.santsSolemnitats.salm1Menor !== '-')
          this.SEXTA.salm1 = TABLES.santsSolemnitats.salm1Menor;
        else if(TABLES.OficisComuns !== null) this.SEXTA.salm1 = TABLES.OficisComuns.salm1Menor;
        if(TABLES.santsSolemnitats.gloriaSalm1 !== '-')
          this.SEXTA.gloria1 = TABLES.santsSolemnitats.gloriaSalm1;
        else if(TABLES.OficisComuns !== null) this.SEXTA.gloria1 = TABLES.OficisComuns.gloriaSalm1;
        if(TABLES.santsSolemnitats.titolSalm2 !== '-')
          this.SEXTA.titol2 = TABLES.santsSolemnitats.titolSalm2;
        else if(TABLES.OficisComuns !== null) this.SEXTA.titol2 = TABLES.OficisComuns.titolSalm2;
        this.SEXTA.com2 = ".";
        if(TABLES.santsSolemnitats.salm2Menor !== '-')
          this.SEXTA.salm2 = TABLES.santsSolemnitats.salm2Menor;
        else if(TABLES.OficisComuns !== null) this.SEXTA.salm2 = TABLES.OficisComuns.salm2Menor;
        if(TABLES.santsSolemnitats.gloriaSalm2 !== '-')
          this.SEXTA.gloria2 = TABLES.santsSolemnitats.gloriaSalm2;
        else if(TABLES.OficisComuns !== null) this.SEXTA.gloria2 = TABLES.OficisComuns.gloriaSalm2;
        if(TABLES.santsSolemnitats.titolSalm3 !== '-')
          this.SEXTA.titol3 = TABLES.santsSolemnitats.titolSalm3;
        else if(TABLES.OficisComuns !== null) this.SEXTA.titol3 = TABLES.OficisComuns.titolSalm3;
        this.SEXTA.com3 = ".";
        if(TABLES.santsSolemnitats.salm3Menor !== '-')
          this.SEXTA.salm3 = TABLES.santsSolemnitats.salm3Menor;
        else if(TABLES.OficisComuns !== null) this.SEXTA.salm3 = TABLES.OficisComuns.salm3Menor;
        if(TABLES.santsSolemnitats.gloriaSalm3 !== '-')
          this.SEXTA.gloria3 = TABLES.santsSolemnitats.gloriaSalm3;
        else if(TABLES.OficisComuns !== null) this.SEXTA.gloria3 = TABLES.OficisComuns.gloriaSalm3;
        if(TABLES.santsSolemnitats.citaLBSexta !== '-')
          this.SEXTA.vers = TABLES.santsSolemnitats.citaLBSexta;
        else if(TABLES.OficisComuns !== null) this.SEXTA.vers = TABLES.OficisComuns.citaLBSexta;
        if(TABLES.santsSolemnitats.lecturaBreuSexta !== '-')
          this.SEXTA.lecturaBreu = TABLES.santsSolemnitats.lecturaBreuSexta;
        else if(TABLES.OficisComuns !== null) this.SEXTA.lecturaBreu = TABLES.OficisComuns.lecturaBreuSexta;
        if(TABLES.santsSolemnitats.responsoriVSexta !== '-')
          this.SEXTA.respV = TABLES.santsSolemnitats.responsoriVSexta;
        else if(TABLES.OficisComuns !== null) this.SEXTA.respV = TABLES.OficisComuns.responsoriVSexta;
        if(TABLES.santsSolemnitats.responsoriRSexta !== '-')
          this.SEXTA.respR = TABLES.santsSolemnitats.responsoriRSexta;
        else if(TABLES.OficisComuns !== null) this.SEXTA.respR = TABLES.OficisComuns.responsoriRSexta;
        if(TABLES.santsSolemnitats.oraFiMenor !== '-')
          this.SEXTA.oracio = TABLES.santsSolemnitats.oraFiMenor;
        else if(TABLES.OficisComuns !== null) this.SEXTA.oracio = TABLES.OficisComuns.oraFiMenor;

        this.NONA.antifones = false;
        if(TABLES.santsSolemnitats.antMenorNona !== '-')
          this.NONA.ant = TABLES.santsSolemnitats.antMenorNona;
        else if(TABLES.OficisComuns !== null) this.NONA.ant = TABLES.OficisComuns.antMenorNona;
        if(TABLES.santsSolemnitats.titolSalm1 !== '-')
          this.NONA.titol1 = TABLES.santsSolemnitats.titolSalm1;
        else if(TABLES.OficisComuns !== null) this.NONA.titol1 = TABLES.OficisComuns.titolSalm1;
        this.NONA.com1 = ".";
        if(TABLES.santsSolemnitats.salm1Menor !== '-')
          this.NONA.salm1 = TABLES.santsSolemnitats.salm1Menor;
        else if(TABLES.OficisComuns !== null) this.NONA.salm1 = TABLES.OficisComuns.salm1Menor;
        if(TABLES.santsSolemnitats.gloriaSalm1 !== '-')
          this.NONA.gloria1 = TABLES.santsSolemnitats.gloriaSalm1;
        else if(TABLES.OficisComuns !== null) this.NONA.gloria1 = TABLES.OficisComuns.gloriaSalm1;
        if(TABLES.santsSolemnitats.titolSalm2 !== '-')
          this.NONA.titol2 = TABLES.santsSolemnitats.titolSalm2;
        else if(TABLES.OficisComuns !== null) this.NONA.titol2 = TABLES.OficisComuns.titolSalm2;
        this.NONA.com2 = ".";
        if(TABLES.santsSolemnitats.salm2Menor !== '-')
          this.NONA.salm2 = TABLES.santsSolemnitats.salm2Menor;
        else if(TABLES.OficisComuns !== null) this.NONA.salm2 = TABLES.OficisComuns.salm2Menor;
        if(TABLES.santsSolemnitats.gloriaSalm2 !== '-')
          this.NONA.gloria2 = TABLES.santsSolemnitats.gloriaSalm2;
        else if(TABLES.OficisComuns !== null) this.NONA.gloria2 = TABLES.OficisComuns.gloriaSalm2;
        if(TABLES.santsSolemnitats.titolSalm3 !== '-')
          this.NONA.titol3 = TABLES.santsSolemnitats.titolSalm3;
        else if(TABLES.OficisComuns !== null) this.NONA.titol3 = TABLES.OficisComuns.titolSalm3;
        this.NONA.com3 = ".";
        if(TABLES.santsSolemnitats.salm3Menor !== '-')
          this.NONA.salm3 = TABLES.santsSolemnitats.salm3Menor;
        else if(TABLES.OficisComuns !== null) this.NONA.salm3 = TABLES.OficisComuns.salm3Menor;
        if(TABLES.santsSolemnitats.gloriaSalm3 !== '-')
          this.NONA.gloria3 = TABLES.santsSolemnitats.gloriaSalm3;
        else if(TABLES.OficisComuns !== null) this.NONA.gloria3 = TABLES.OficisComuns.gloriaSalm3;
        if(TABLES.santsSolemnitats.citaLBNona !== '-')
          this.NONA.vers = TABLES.santsSolemnitats.citaLBNona;
        else if(TABLES.OficisComuns !== null) this.NONA.vers = TABLES.OficisComuns.citaLBNona;
        if(TABLES.santsSolemnitats.lecturaBreuNona !== '-')
          this.NONA.lecturaBreu = TABLES.santsSolemnitats.lecturaBreuNona;
        else if(TABLES.OficisComuns !== null) this.NONA.lecturaBreu = TABLES.OficisComuns.lecturaBreuNona;
        if(TABLES.santsSolemnitats.responsoriVNona !== '-')
          this.NONA.respV = TABLES.santsSolemnitats.responsoriVNona;
        else if(TABLES.OficisComuns !== null) this.NONA.respV = TABLES.OficisComuns.responsoriVNona;
        if(TABLES.santsSolemnitats.responsoriRNona !== '-')
          this.NONA.respR = TABLES.santsSolemnitats.responsoriRNona;
        else if(TABLES.OficisComuns !== null) this.NONA.respR = TABLES.OficisComuns.responsoriRNona;
        if(TABLES.santsSolemnitats.oraFiMenor !== '-')
          this.NONA.oracio = TABLES.santsSolemnitats.oraFiMenor;
        else if(TABLES.OficisComuns !== null) this.NONA.oracio = TABLES.OficisComuns.oraFiMenor;

        if(TABLES.santsSolemnitats.himneVespresLlati !== '-'){
          if(llati) this.VESPRES.himne = TABLES.santsSolemnitats.himneVespresLlati;
          else this.VESPRES.himne = TABLES.santsSolemnitats.himneVespresCat;
        }
        else if(TABLES.OficisComuns !== null){
          if(llati) this.VESPRES.himne = TABLES.OficisComuns.himneVespresLlati;
          else this.VESPRES.himne = TABLES.OficisComuns.himneVespresCat;
        }
        if(TABLES.santsSolemnitats.ant1Vespres !== '-')
          this.VESPRES.ant1 = TABLES.santsSolemnitats.ant1Vespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.ant1 = TABLES.OficisComuns.ant1Vespres;
        if(TABLES.santsSolemnitats.titol1Vespres !== '-')
          this.VESPRES.titol1 = TABLES.santsSolemnitats.titol1Vespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.titol1 = TABLES.OficisComuns.titol1Vespres;
        this.VESPRES.com1 = ".";
        if(TABLES.santsSolemnitats.Salm1Vespres !== '-')
          this.VESPRES.salm1 = TABLES.santsSolemnitats.Salm1Vespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.salm1 = TABLES.OficisComuns.Salm1Vespres;
        if(TABLES.santsSolemnitats.gloria1Vespres !== '-')
          this.VESPRES.gloria1 = TABLES.santsSolemnitats.gloria1Vespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.gloria1 = TABLES.OficisComuns.gloria1Vespres;
        if(TABLES.santsSolemnitats.ant2Vespres !== '-')
          this.VESPRES.ant2 = TABLES.santsSolemnitats.ant2Vespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.ant2 = TABLES.OficisComuns.ant2Vespres;
        if(TABLES.santsSolemnitats.titol2Vespres !== '-')
          this.VESPRES.titol2 = TABLES.santsSolemnitats.titol2Vespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.titol2 = TABLES.OficisComuns.titol2Vespres;
        this.VESPRES.com2 = ".";
        if(TABLES.santsSolemnitats.Salm2Vespres !== '-')
          this.VESPRES.salm2 = TABLES.santsSolemnitats.Salm2Vespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.salm2 = TABLES.OficisComuns.Salm2Vespres;
        if(TABLES.santsSolemnitats.gloria2Vespres !== '-')
          this.VESPRES.gloria2 = TABLES.santsSolemnitats.gloria2Vespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.gloria2 = TABLES.OficisComuns.gloria2Vespres;
        if(TABLES.santsSolemnitats.ant3Vespres !== '-')
          this.VESPRES.ant3 = TABLES.santsSolemnitats.ant3Vespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.ant3 = TABLES.OficisComuns.ant3Vespres;
        if(TABLES.santsSolemnitats.titol3Vespres !== '-')
          this.VESPRES.titol3 = TABLES.santsSolemnitats.titol3Vespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.titol3 = TABLES.OficisComuns.titol3Vespres;
        this.VESPRES.com3 = ".";
        if(TABLES.santsSolemnitats.Salm3Vespres !== '-')
          this.VESPRES.salm3 = TABLES.santsSolemnitats.Salm3Vespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.salm3 = TABLES.OficisComuns.Salm3Vespres;
        if(TABLES.santsSolemnitats.gloria3Vespres !== '-')
          this.VESPRES.gloria3 = TABLES.santsSolemnitats.gloria3Vespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.gloria3 = TABLES.OficisComuns.gloria3Vespres;
        if(TABLES.santsSolemnitats.citaLBVespres !== '-')
          this.VESPRES.vers = TABLES.santsSolemnitats.citaLBVespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.vers = TABLES.OficisComuns.citaLBVespres;
        if(TABLES.santsSolemnitats.lecturaBreuVespres !== '-')
          this.VESPRES.lecturaBreu = TABLES.santsSolemnitats.lecturaBreuVespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.lecturaBreu = TABLES.OficisComuns.lecturaBreuVespres;
        this.VESPRES.calAntEspecial = false;
        if(TABLES.santsSolemnitats.respBreuVespres1 !== '-')
          this.VESPRES.respBreu1 = TABLES.santsSolemnitats.respBreuVespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES.respBreu1 = TABLES.OficisComuns.respBreuVespres1;
        if(TABLES.santsSolemnitats.respBreuVespres2 !== '-')
          this.VESPRES.respBreu2 = TABLES.santsSolemnitats.respBreuVespres2;
        else if(TABLES.OficisComuns !== null) this.VESPRES.respBreu2 = TABLES.OficisComuns.respBreuVespres2;
        if(TABLES.santsSolemnitats.respBreuVespres3 !== '-')
          this.VESPRES.respBreu3 = TABLES.santsSolemnitats.respBreuVespres3;
        else if(TABLES.OficisComuns !== null) this.VESPRES.respBreu3 = TABLES.OficisComuns.respBreuVespres3;
        if(TABLES.santsSolemnitats.antMaria !== '-')
          this.VESPRES.antCantic = TABLES.santsSolemnitats.antMaria;
        else if(TABLES.OficisComuns !== null) this.VESPRES.antCantic = TABLES.OficisComuns.antMaria;
        if(TABLES.santsSolemnitats.pregariesVespres2 !== '-')
          this.VESPRES.pregaries = TABLES.santsSolemnitats.pregariesVespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.pregaries = TABLES.OficisComuns.pregariesVespres;
        this.VESPRES.oracio = TABLES.santsSolemnitats.oraFi;
        break;
      case  "ML":
      console.log("ML");
        /*if(this.VESPRES1.himne = TABLES.santsMemories.himneVespres1Llati !== '-'){
          if(llati) this.VESPRES1.himne = TABLES.santsMemories.himneVespres1Llati;
          else this.VESPRES1.himne = TABLES.santsMemories.himneVespres1Cat;
        }
        else if(TABLES.OficisComuns !== null){
          if(llati) this.VESPRES1.himne = TABLES.OficisComuns.himneVespres1Llati;
          else this.VESPRES1.himne = TABLES.OficisComuns.himneVespres1Cat;
        }
        if(TABLES.santsMemories.ant1Vespres1 !== '-')
          this.VESPRES1.ant1 = TABLES.santsMemories.ant1Vespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.ant1 = TABLES.OficisComuns.ant1Vespres1;
        if(TABLES.santsMemories.titol1Vespres1 !== '-')
          this.VESPRES1.titol1 = TABLES.santsMemories.titol1Vespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.titol1 = TABLES.OficisComuns.titol1Vespres1;
        this.VESPRES1.com1 = ".";
        if(TABLES.santsMemories.text1Vespres1 !== '-')
          this.VESPRES1.salm1 = TABLES.santsMemories.text1Vespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.salm1 = TABLES.OficisComuns.text1Vespres1;
        if(TABLES.santsMemories.gloria1Vespres1 !== '-')
          this.VESPRES1.gloria1 = TABLES.santsMemories.gloria1Vespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.gloria1 = TABLES.OficisComuns.gloria1Vespres1;
        if(TABLES.santsMemories.ant2Vespres1 !== '-')
          this.VESPRES1.ant2 = TABLES.santsMemories.ant2Vespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.ant2 = TABLES.OficisComuns.ant2Vespres1;
        if(TABLES.santsMemories.titol2Vespres1 !== '-')
          this.VESPRES1.titol2 = TABLES.santsMemories.titol2Vespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.titol2 = TABLES.OficisComuns.titol2Vespres1;
        this.VESPRES1.com2 = ".";
        if(TABLES.santsMemories.text2Vespres1 !== '-')
          this.VESPRES1.salm2 = TABLES.santsMemories.text2Vespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.salm2 = TABLES.OficisComuns.text2Vespres1;
        if(TABLES.santsMemories.gloria2Vespres1 !== '-')
          this.VESPRES1.gloria2 = TABLES.santsMemories.gloria2Vespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.gloria2 = TABLES.OficisComuns.gloria2Vespres1;
        if(TABLES.santsMemories.ant3Vespres1 !== '-')
          this.VESPRES1.ant3 = TABLES.santsMemories.ant3Vespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.ant3 = TABLES.OficisComuns.ant3Vespres1;
        if(TABLES.santsMemories.titol3Vespres1 !== '-')
          this.VESPRES1.titol3 = TABLES.santsMemories.titol3Vespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.titol3 = TABLES.OficisComuns.titol3Vespres1;
        this.VESPRES1.com3 = ".";
        if(TABLES.santsMemories.text3Vespres1 !== '-')
          this.VESPRES1.salm3 = TABLES.santsMemories.text3Vespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.salm3 = TABLES.OficisComuns.text3Vespres1;
        if(TABLES.santsMemories.gloria3Vespres1 !== '-')
          this.VESPRES1.gloria3 = TABLES.santsMemories.gloria3Vespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.gloria3 = TABLES.OficisComuns.gloria3Vespres1;
        if(TABLES.santsMemories.citaLBVespres1 !== '-')
          this.VESPRES1.vers = TABLES.santsMemories.citaLBVespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.vers = TABLES.OficisComuns.citaLBVespres1;
        if(TABLES.santsMemories.lecturaBreuVespres1 !== '-')
          this.VESPRES1.lecturaBreu = TABLES.santsMemories.lecturaBreuVespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.lecturaBreu = TABLES.OficisComuns.lecturaBreuVespres1;
        this.VESPRES1.calAntEspecial = false;
        if(TABLES.santsMemories.respBreuVespres1Part1 !== '-')
          this.VESPRES1.respBreu1 = TABLES.santsMemories.respBreuVespres1Part1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.respBreu1 = TABLES.OficisComuns.respBreuVespres1Part1;
        if(TABLES.santsMemories.respBreuVespres1Part2 !== '-')
          this.VESPRES1.respBreu2 = TABLES.santsMemories.respBreuVespres1Part2;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.respBreu2 = TABLES.OficisComuns.respBreuVespres1Part2;
        if(TABLES.santsMemories.respBreuVespres1Part3 !== '-')
          this.VESPRES1.respBreu3 = TABLES.santsMemories.respBreuVespres1Part3;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.respBreu3 = TABLES.OficisComuns.respBreuVespres1Part3;
        if(TABLES.santsMemories.antMaria1 !== '-')
          this.VESPRES1.antCantic = TABLES.santsMemories.antMaria1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.antCantic = TABLES.OficisComuns.antMaria1;
        if(TABLES.santsMemories.pregariesVespres1 !== '-')
          this.VESPRES1.pregaries = TABLES.santsMemories.pregariesVespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.pregaries = TABLES.OficisComuns.pregariesVespres1;
        if(TABLES.santsMemories.oraFiVespres1 !== '-')
          this.VESPRES1.oracio = TABLES.santsMemories.oraFiVespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES1.oracio = TABLES.OficisComuns.oraFiVespres1;*/

        if(TABLES.santsMemories.antInvitatori !== '-')
          this.OFICI.antInvitatori = TABLES.santsMemories.antInvitatori;
        else if(TABLES.OficisComuns !== null) this.OFICI.antInvitatori = TABLES.OficisComuns.antInvitatori;
        if(TABLES.santsMemories.himneOficiLlati !== '-'){
          if(llati) this.OFICI.himne = TABLES.santsMemories.himneOficiLlati;
          else this.OFICI.himne = TABLES.santsMemories.himneOficiCat;
        }
        else if(TABLES.OficisComuns !== null) {
          if(llati) this.OFICI.himne = TABLES.OficisComuns.himneOficiLlati;
          else this.OFICI.himne = TABLES.OficisComuns.himneOficiCat;
        }
        if(TABLES.santsMemories.ant1Ofici !== '-')
          this.OFICI.ant1 = TABLES.santsMemories.ant1Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.ant1 = TABLES.OficisComuns.ant1Ofici;
        if(TABLES.santsMemories.titolSalm1Ofici !== '-')
          this.OFICI.titol1 = TABLES.santsMemories.titolSalm1Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.titol1 = TABLES.OficisComuns.titolSalm1Ofici;
        this.OFICI.com1 = ".";
        if(TABLES.santsMemories.salm1Ofici !== '-')
          this.OFICI.salm1 = TABLES.santsMemories.salm1Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.salm1 = TABLES.OficisComuns.salm1Ofici;
        if(TABLES.santsMemories.gloriaOfici1 !== '-')
          this.OFICI.gloria1 = TABLES.santsMemories.gloriaOfici1;
        else if(TABLES.OficisComuns !== null) this.OFICI.gloria1 = TABLES.OficisComuns.gloriaOfici1;
        if(TABLES.santsMemories.ant2Ofici !== '-')
          this.OFICI.ant2 = TABLES.santsMemories.ant2Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.ant2 = TABLES.OficisComuns.ant2Ofici;
        if(TABLES.santsMemories.titolSalm2Ofici !== '-')
          this.OFICI.titol2 = TABLES.santsMemories.titolSalm2Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.titol2 = TABLES.OficisComuns.titolSalm2Ofici;
        this.OFICI.com2 = ".";
        if(TABLES.santsMemories.salm2Ofici !== '-')
          this.OFICI.salm2 = TABLES.santsMemories.salm2Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.salm2 = TABLES.OficisComuns.salm2Ofici;
        if(TABLES.santsMemories.gloriaOfici2 !== '-')
          this.OFICI.gloria2 = TABLES.santsMemories.gloriaOfici2;
        else if(TABLES.OficisComuns !== null) this.OFICI.gloria2 = TABLES.OficisComuns.gloriaOfici2;
        if(TABLES.santsMemories.ant3Ofici !== '-')
          this.OFICI.ant3 = TABLES.santsMemories.ant3Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.ant3 = TABLES.OficisComuns.ant3Ofici;
        if(TABLES.santsMemories.titolSalm3Ofici !== '-')
          this.OFICI.titol3 = TABLES.santsMemories.titolSalm3Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.titol3 = TABLES.OficisComuns.titolSalm3Ofici;
        this.OFICI.com3 = ".";
        if(TABLES.santsMemories.salm3Ofici !== '-')
          this.OFICI.salm3 = TABLES.santsMemories.salm3Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.salm3 = TABLES.OficisComuns.salm3Ofici;
        if(TABLES.santsMemories.gloriaOfici3 !== '-')
          this.OFICI.gloria3 = TABLES.santsMemories.gloriaOfici3;
        else if(TABLES.OficisComuns !== null) this.OFICI.gloria3 = TABLES.OficisComuns.gloriaOfici3;
        if(TABLES.santsMemories.respVOfici !== '-')
          this.OFICI.respV = TABLES.santsMemories.respVOfici;
        else if(TABLES.OficisComuns !== null) this.OFICI.respV = TABLES.OficisComuns.respVOfici;
        if(TABLES.santsMemories.respROfici !== '-')
          this.OFICI.respR = TABLES.santsMemories.respROfici;
        else if(TABLES.OficisComuns !== null) this.OFICI.respR = TABLES.OficisComuns.respROfici;
        if(TABLES.santsMemories.referencia1 !== '-')
          this.OFICI.referencia1 = TABLES.santsMemories.referencia1;
        else if(TABLES.OficisComuns !== null) this.OFICI.referencia1 = TABLES.OficisComuns.referencia1;
        if(TABLES.santsMemories.citaLect1Ofici !== '-')
          this.OFICI.cita1 = TABLES.santsMemories.citaLect1Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.cita1 = TABLES.OficisComuns.citaLect1Ofici;
        if(TABLES.santsMemories.titolLect1Ofici !== '-')
          this.OFICI.titolLectura1 = TABLES.santsMemories.titolLect1Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.titolLectura1 = TABLES.OficisComuns.titolLect1Ofici;
        if(TABLES.santsMemories.lecture1 !== '-')
          this.OFICI.lectura1 = TABLES.santsMemories.lecture1;
        else if(TABLES.OficisComuns !== null) this.OFICI.lectura1 = TABLES.OficisComuns.lecture1;
        if(TABLES.santsMemories.citaResp1Ofici !== '-')
          this.OFICI.citaResp1 = TABLES.santsMemories.citaResp1Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.citaResp1 = TABLES.OficisComuns.citaResp1Ofici;
        if(TABLES.santsMemories.resp1Part1Ofici !== '-')
          this.OFICI.resp1Part1 = TABLES.santsMemories.resp1Part1Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.resp1Part1 = TABLES.OficisComuns.resp1Part1Ofici;
        if(TABLES.santsMemories.resp1Part2Ofici !== '-')
          this.OFICI.resp1Part2 = TABLES.santsMemories.resp1Part2Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.resp1Part2 = TABLES.OficisComuns.resp1Part2Ofici;
        if(TABLES.santsMemories.resp1Part3Ofici !== '-')
          this.OFICI.resp1Part3 = TABLES.santsMemories.resp1Part3Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.resp1Part3 = TABLES.OficisComuns.resp1Part3Ofici;
        if(TABLES.santsMemories.referencia2Ofici !== '-')
          this.OFICI.referencia2 = TABLES.santsMemories.referencia2Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.referencia2 = TABLES.OficisComuns.referencia2Ofici;
        if(TABLES.santsMemories.citaLect2Ofici !== '-')
          this.OFICI.cita2 = TABLES.santsMemories.citaLect2Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.cita2 = TABLES.OficisComuns.citaLect2Ofici;
        if(TABLES.santsMemories.titolLect2Ofici !== '-')
          this.OFICI.titolLectura2 = TABLES.santsMemories.titolLect2Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.titolLectura2 = TABLES.OficisComuns.titolLect2Ofici;
        if(TABLES.santsMemories.lectura2 !== '-')
          this.OFICI.lectura2 = TABLES.santsMemories.lectura2;
        else if(TABLES.OficisComuns !== null) this.OFICI.lectura2 = TABLES.OficisComuns.lectura2;
        if(TABLES.santsMemories.citaResp2Ofici !== '-')
          this.OFICI.versResp2 = TABLES.santsMemories.citaResp2Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.versResp2 = TABLES.OficisComuns.citaResp2Ofici;
        if(TABLES.santsMemories.resp2Part1Ofici !== '-')
          this.OFICI.resp2Part1 = TABLES.santsMemories.resp2Part1Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.resp2Part1 = TABLES.OficisComuns.resp2Part1Ofici;
        if(TABLES.santsMemories.resp2Part2Ofici !== '-')
          this.OFICI.resp2Part2 = TABLES.santsMemories.resp2Part2Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.resp2Part2 = TABLES.OficisComuns.resp2Part2Ofici;
        if(TABLES.santsMemories.resp3Part3Ofici !== '-')
          this.OFICI.resp2Part3 = TABLES.santsMemories.resp3Part3Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.resp2Part3 = TABLES.OficisComuns.resp3Part3Ofici;
        if(TABLES.santsMemories.oraFiOfici !== '-')
          this.OFICI.himneOhDeu = TABLES.santsMemories.oraFiOfici;
        else if(TABLES.OficisComuns !== null) this.OFICI.himneOhDeu = TABLES.OficisComuns.oraFiOfici;
        this.OFICI.himneOhDeuBool = true;
        if(TABLES.santsMemories.oraFiOfici !== '-')
          this.OFICI.oracio = TABLES.santsMemories.oraFiOfici;
        else if(TABLES.OficisComuns !== null) this.OFICI.oracio = TABLES.OficisComuns.oraFiOfici;

        if(TABLES.santsMemories.antInvitatori !== '-')
          this.LAUDES.antInvitatori = TABLES.santsMemories.antInvitatori;
        else if(TABLES.OficisComuns !== null) this.LAUDES.antInvitatori = TABLES.OficisComuns.antInvitatori;
        if(TABLES.santsMemories.himneLaudesLlati !== '-'){
          if(llati) this.LAUDES.himne = TABLES.santsMemories.himneLaudesLlati;
          else this.LAUDES.himne = TABLES.santsMemories.himneLaudesCat;
        }
        else if(TABLES.OficisComuns !== null){
          if(llati) this.LAUDES.himne = TABLES.OficisComuns.himneLaudesLlati;
          else this.LAUDES.himne = TABLES.OficisComuns.himneLaudesCat;
        }
        if(TABLES.santsMemories.ant1Laudes !== '-')
          this.LAUDES.ant1 = TABLES.santsMemories.ant1Laudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.ant1 = TABLES.OficisComuns.ant1Laudes;
        if(TABLES.santsMemories.ant2Laudes !== '-')
          this.LAUDES.ant2 = TABLES.santsMemories.ant2Laudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.ant2 = TABLES.OficisComuns.ant2Laudes;
        if(TABLES.santsMemories.ant3Laudes !== '-')
          this.LAUDES.ant3 = TABLES.santsMemories.ant3Laudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.ant3 = TABLES.OficisComuns.ant3Laudes;
        if(TABLES.santsMemories.citaLBLaudes !== '-')
          this.LAUDES.vers = TABLES.santsMemories.citaLBLaudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.vers = TABLES.OficisComuns.citaLBLaudes;
        if(TABLES.santsMemories.lecturaBreuLaudes !== '-')
          this.LAUDES.lecturaBreu = TABLES.santsMemories.lecturaBreuLaudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.lecturaBreu = TABLES.OficisComuns.lecturaBreuLaudes;
        this.LAUDES.calAntEspecial = false;
        if(TABLES.santsMemories.resp2Part1Laudes !== '-')
          this.LAUDES.respBreu1 = TABLES.santsMemories.resp2Part1Laudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.respBreu1 = TABLES.OficisComuns.resp2Part1Laudes;
        if(TABLES.santsMemories.resp2Part2Laudes !== '-')
          this.LAUDES.respBreu2 = TABLES.santsMemories.resp2Part2Laudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.respBreu2 = TABLES.OficisComuns.resp2Part2Laudes;
        if(TABLES.santsMemories !== '-')
          this.LAUDES.respBreu3 = TABLES.santsMemories.resp2Part3Laudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.respBreu3 = TABLES.OficisComuns.resp2Part3Laudes;
        if(TABLES.santsMemories.antZacaries !== '-')
          this.LAUDES.antCantic = TABLES.santsMemories.antZacaries;
        else if(TABLES.OficisComuns !== null) this.LAUDES.antCantic = TABLES.OficisComuns.antZacaries;
        if(TABLES.santsMemories.pregariesLaudes !== '-')
          this.LAUDES.pregaries = TABLES.santsMemories.pregariesLaudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.pregaries = TABLES.OficisComuns.pregariesLaudes;
        if(TABLES.santsMemories.oraFiLaudes !== '-')
          this.LAUDES.oracio = TABLES.santsMemories.oraFiLaudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.oracio = TABLES.OficisComuns.oraFiLaudes;

        this.TERCIA.antifones = false;
        if(TABLES.santsMemories.antMenorTercia !== '-')
          this.TERCIA.ant = TABLES.santsMemories.antMenorTercia;
        else if(TABLES.OficisComuns !== null) this.TERCIA.ant = TABLES.OficisComuns.antMenorTercia;
        if(TABLES.santsMemories.titolSalm1 !== '-')
          this.TERCIA.titol1 = TABLES.santsMemories.titolSalm1;
        else if(TABLES.OficisComuns !== null) this.TERCIA.titol1 = TABLES.OficisComuns.titolSalm1;
        this.TERCIA.com1 = ".";
        if(TABLES.santsMemories.salm1Menor !== '-')
          this.TERCIA.salm1 = TABLES.santsMemories.salm1Menor;
        else if(TABLES.OficisComuns !== null) this.TERCIA.salm1 = TABLES.OficisComuns.salm1Menor;
        if(TABLES.santsMemories.gloriaSalm1 !== '-')
          this.TERCIA.gloria1 = TABLES.santsMemories.gloriaSalm1;
        else if(TABLES.OficisComuns !== null) this.TERCIA.gloria1 = TABLES.OficisComuns.gloriaSalm1;
        if(TABLES.santsMemories.titolSalm2 !== '-')
          this.TERCIA.titol2 = TABLES.santsMemories.titolSalm2;
        else if(TABLES.OficisComuns !== null) this.TERCIA.titol2 = TABLES.OficisComuns.titolSalm2;
        this.TERCIA.com2 = ".";
        if(TABLES.santsMemories.salm2Menor !== '-')
          this.TERCIA.salm2 = TABLES.santsMemories.salm2Menor;
        else if(TABLES.OficisComuns !== null) this.TERCIA.salm2 = TABLES.OficisComuns.salm2Menor;
        if(TABLES.santsMemories.gloriaSalm2 !== '-')
          this.TERCIA.gloria2 = TABLES.santsMemories.gloriaSalm2;
        else if(TABLES.OficisComuns !== null) this.TERCIA.gloria2 = TABLES.OficisComuns.gloriaSalm2;
        if(TABLES.santsMemories.titolSalm3 !== '-')
          this.TERCIA.titol3 = TABLES.santsMemories.titolSalm3;
        else if(TABLES.OficisComuns !== null) this.TERCIA.titol3 = TABLES.OficisComuns.titolSalm3;
        this.TERCIA.com3 = ".";
        if(TABLES.santsMemories.salm3Menor !== '-')
          this.TERCIA.salm3 = TABLES.santsMemories.salm3Menor;
        else if(TABLES.OficisComuns !== null) this.TERCIA.salm3 = TABLES.OficisComuns.salm3Menor;
        if(TABLES.santsMemories.gloriaSalm3 !== '-')
          this.TERCIA.gloria3 = TABLES.santsMemories.gloriaSalm3;
        else if(TABLES.OficisComuns !== null) this.TERCIA.gloria3 = TABLES.OficisComuns.gloriaSalm3;
        if(TABLES.santsMemories.citaLBTercia !== '-')
          this.TERCIA.vers = TABLES.santsMemories.citaLBTercia;
        else if(TABLES.OficisComuns !== null) this.TERCIA.vers = TABLES.OficisComuns.citaLBTercia;
        if(TABLES.santsMemories.lecturaBreuTercia !== '-')
          this.TERCIA.lecturaBreu = TABLES.santsMemories.lecturaBreuTercia;
        else if(TABLES.OficisComuns !== null) this.TERCIA.lecturaBreu = TABLES.OficisComuns.lecturaBreuTercia;
        if(TABLES.santsMemories.responsoriVTercia !== '-')
          this.TERCIA.respV = TABLES.santsMemories.responsoriVTercia;
        else if(TABLES.OficisComuns !== null) this.TERCIA.respV = TABLES.OficisComuns.responsoriVTercia;
        if(TABLES.santsMemories.responsoriRTercia !== '-')
          this.TERCIA.respR = TABLES.santsMemories.responsoriRTercia;
        else if(TABLES.OficisComuns !== null) this.TERCIA.respR = TABLES.OficisComuns.responsoriRTercia;
        if(TABLES.santsMemories.oraFiMenor !== '-')
          this.TERCIA.oracio = TABLES.santsMemories.oraFiMenor;
        else if(TABLES.OficisComuns !== null) this.TERCIA.oracio = TABLES.OficisComuns.oraFiMenor;

        this.SEXTA.antifones = false;
        if(TABLES.santsMemories.antMenorSexta !== '-')
          this.SEXTA.ant = TABLES.santsMemories.antMenorSexta;
        else if(TABLES.OficisComuns !== null) this.SEXTA.ant = TABLES.OficisComuns.antMenorSexta;
        if(TABLES.santsMemories.titolSalm1 !== '-')
          this.SEXTA.titol1 = TABLES.santsMemories.titolSalm1;
        else if(TABLES.OficisComuns !== null) this.SEXTA.titol1 = TABLES.OficisComuns.titolSalm1;
        this.SEXTA.com1 = ".";
        if(TABLES.santsMemories.salm1Menor !== '-')
          this.SEXTA.salm1 = TABLES.santsMemories.salm1Menor;
        else if(TABLES.OficisComuns !== null) this.SEXTA.salm1 = TABLES.OficisComuns.salm1Menor;
        if(TABLES.santsMemories.gloriaSalm1 !== '-')
          this.SEXTA.gloria1 = TABLES.santsMemories.gloriaSalm1;
        else if(TABLES.OficisComuns !== null) this.SEXTA.gloria1 = TABLES.OficisComuns.gloriaSalm1;
        if(TABLES.santsMemories.titolSalm2 !== '-')
          this.SEXTA.titol2 = TABLES.santsMemories.titolSalm2;
        else if(TABLES.OficisComuns !== null) this.SEXTA.titol2 = TABLES.OficisComuns.titolSalm2;
        this.SEXTA.com2 = ".";
        if(TABLES.santsMemories.salm2Menor !== '-')
          this.SEXTA.salm2 = TABLES.santsMemories.salm2Menor;
        else if(TABLES.OficisComuns !== null) this.SEXTA.salm2 = TABLES.OficisComuns.salm2Menor;
        if(TABLES.santsMemories.gloriaSalm2 !== '-')
          this.SEXTA.gloria2 = TABLES.santsMemories.gloriaSalm2;
        else if(TABLES.OficisComuns !== null) this.SEXTA.gloria2 = TABLES.OficisComuns.gloriaSalm2;
        if(TABLES.santsMemories.titolSalm3 !== '-')
          this.SEXTA.titol3 = TABLES.santsMemories.titolSalm3;
        else if(TABLES.OficisComuns !== null) this.SEXTA.titol3 = TABLES.OficisComuns.titolSalm3;
        this.SEXTA.com3 = ".";
        if(TABLES.santsMemories.salm3Menor !== '-')
          this.SEXTA.salm3 = TABLES.santsMemories.salm3Menor;
        else if(TABLES.OficisComuns !== null) this.SEXTA.salm3 = TABLES.OficisComuns.salm3Menor;
        if(TABLES.santsMemories.gloriaSalm3 !== '-')
          this.SEXTA.gloria3 = TABLES.santsMemories.gloriaSalm3;
        else if(TABLES.OficisComuns !== null) this.SEXTA.gloria3 = TABLES.OficisComuns.gloriaSalm3;
        if(TABLES.santsMemories.citaLBSexta !== '-')
          this.SEXTA.vers = TABLES.santsMemories.citaLBSexta;
        else if(TABLES.OficisComuns !== null) this.SEXTA.vers = TABLES.OficisComuns.citaLBSexta;
        if(TABLES.santsMemories.lecturaBreuSexta !== '-')
          this.SEXTA.lecturaBreu = TABLES.santsMemories.lecturaBreuSexta;
        else if(TABLES.OficisComuns !== null) this.SEXTA.lecturaBreu = TABLES.OficisComuns.lecturaBreuSexta;
        if(TABLES.santsMemories.responsoriVSexta !== '-')
          this.SEXTA.respV = TABLES.santsMemories.responsoriVSexta;
        else if(TABLES.OficisComuns !== null) this.SEXTA.respV = TABLES.OficisComuns.responsoriVSexta;
        if(TABLES.santsMemories.responsoriRSexta !== '-')
          this.SEXTA.respR = TABLES.santsMemories.responsoriRSexta;
        else if(TABLES.OficisComuns !== null) this.SEXTA.respR = TABLES.OficisComuns.responsoriRSexta;
        if(TABLES.santsMemories.oraFiMenor !== '-')
          this.SEXTA.oracio = TABLES.santsMemories.oraFiMenor;
        else if(TABLES.OficisComuns !== null) this.SEXTA.oracio = TABLES.OficisComuns.oraFiMenor;

        this.NONA.antifones = false;
                console.log("EVEN HERE");
        if(TABLES.santsMemories.antMenorNona !== '-')
          this.NONA.ant = TABLES.santsMemories.antMenorNona;
        else if(TABLES.OficisComuns !== null) this.NONA.ant = TABLES.OficisComuns.antMenorNona;
        if(TABLES.santsMemories.titolSalm1 !== '-')
          this.NONA.titol1 = TABLES.santsMemories.titolSalm1;
        else if(TABLES.OficisComuns !== null) this.NONA.titol1 = TABLES.OficisComuns.titolSalm1;
        this.NONA.com1 = ".";
        if(TABLES.santsMemories.salm1Menor !== '-')
          this.NONA.salm1 = TABLES.santsMemories.salm1Menor;
        else if(TABLES.OficisComuns !== null) this.NONA.salm1 = TABLES.OficisComuns.salm1Menor;
        if(TABLES.santsMemories.gloriaSalm1 !== '-')
          this.NONA.gloria1 = TABLES.santsMemories.gloriaSalm1;
        else if(TABLES.OficisComuns !== null) this.NONA.gloria1 = TABLES.OficisComuns.gloriaSalm1;
        if(TABLES.santsMemories.titolSalm2 !== '-')
          this.NONA.titol2 = TABLES.santsMemories.titolSalm2;
        else if(TABLES.OficisComuns !== null) this.NONA.titol2 = TABLES.OficisComuns.titolSalm2;
        this.NONA.com2 = ".";
        if(TABLES.santsMemories.salm2Menor !== '-')
          this.NONA.salm2 = TABLES.santsMemories.salm2Menor;
        else if(TABLES.OficisComuns !== null) this.NONA.salm2 = TABLES.OficisComuns.salm2Menor;
        if(TABLES.santsMemories.gloriaSalm2 !== '-')
          this.NONA.gloria2 = TABLES.santsMemories.gloriaSalm2;
        else if(TABLES.OficisComuns !== null) this.NONA.gloria2 = TABLES.OficisComuns.gloriaSalm2;
        if(TABLES.santsMemories.titolSalm3 !== '-')
          this.NONA.titol3 = TABLES.santsMemories.titolSalm3;
        else if(TABLES.OficisComuns !== null) this.NONA.titol3 = TABLES.OficisComuns.titolSalm3;
        this.NONA.com3 = ".";
        if(TABLES.santsMemories.salm3Menor !== '-')
          this.NONA.salm3 = TABLES.santsMemories.salm3Menor;
        else if(TABLES.OficisComuns !== null) this.NONA.salm3 = TABLES.OficisComuns.salm3Menor;
        if(TABLES.santsMemories.gloriaSalm3 !== '-')
          this.NONA.gloria3 = TABLES.santsMemories.gloriaSalm3;
        else if(TABLES.OficisComuns !== null) this.NONA.gloria3 = TABLES.OficisComuns.gloriaSalm3;
        if(TABLES.santsMemories.citaLBNona !== '-')
          this.NONA.vers = TABLES.santsMemories.citaLBNona;
        else if(TABLES.OficisComuns !== null) this.NONA.vers = TABLES.OficisComuns.citaLBNona;
        if(TABLES.santsMemories.lecturaBreuNona !== '-')
          this.NONA.lecturaBreu = TABLES.santsMemories.lecturaBreuNona;
        else if(TABLES.OficisComuns !== null) this.NONA.lecturaBreu = TABLES.OficisComuns.lecturaBreuNona;
        if(TABLES.santsMemories.responsoriVNona !== '-')
          this.NONA.respV = TABLES.santsMemories.responsoriVNona;
        else if(TABLES.OficisComuns !== null) this.NONA.respV = TABLES.OficisComuns.responsoriVNona;
        if(TABLES.santsMemories.responsoriRNona !== '-')
          this.NONA.respR = TABLES.santsMemories.responsoriRNona;
        else if(TABLES.OficisComuns !== null) this.NONA.respR = TABLES.OficisComuns.responsoriRNona;
        if(TABLES.santsMemories.oraFiMenor !== '-')
          this.NONA.oracio = TABLES.santsMemories.oraFiMenor;
        else if(TABLES.OficisComuns !== null) this.NONA.oracio = TABLES.OficisComuns.oraFiMenor;

        if(TABLES.santsMemories.himneVespresLlati !== '-'){
          if(llati) this.VESPRES.himne = TABLES.santsMemories.himneVespresLlati;
          else this.VESPRES.himne = TABLES.santsMemories.himneVespresCat;
        }
        else if(TABLES.OficisComuns !== null){
          if(llati) this.VESPRES.himne = TABLES.OficisComuns.himneVespresLlati;
          else this.VESPRES.himne = TABLES.OficisComuns.himneVespresCat;
        }
        if(TABLES.santsMemories.ant1Vespres !== '-')
          this.VESPRES.ant1 = TABLES.santsMemories.ant1Vespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.ant1 = TABLES.OficisComuns.ant1Vespres;
        if(TABLES.santsMemories.titol1Vespres !== '-')
          this.VESPRES.titol1 = TABLES.santsMemories.titol1Vespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.titol1 = TABLES.OficisComuns.titol1Vespres;
        this.VESPRES.com1 = ".";
        if(TABLES.santsMemories.Salm1Vespres !== '-')
          this.VESPRES.salm1 = TABLES.santsMemories.Salm1Vespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.salm1 = TABLES.OficisComuns.Salm1Vespres;
        if(TABLES.santsMemories.gloria1Vespres !== '-')
          this.VESPRES.gloria1 = TABLES.santsMemories.gloria1Vespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.gloria1 = TABLES.OficisComuns.gloria1Vespres;
        if(TABLES.santsMemories.ant2Vespres !== '-')
          this.VESPRES.ant2 = TABLES.santsMemories.ant2Vespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.ant2 = TABLES.OficisComuns.ant2Vespres;
        if(TABLES.santsMemories.titol2Vespres !== '-')
          this.VESPRES.titol2 = TABLES.santsMemories.titol2Vespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.titol2 = TABLES.OficisComuns.titol2Vespres;
        this.VESPRES.com2 = ".";
        if(TABLES.santsMemories.Salm2Vespres !== '-')
          this.VESPRES.salm2 = TABLES.santsMemories.Salm2Vespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.salm2 = TABLES.OficisComuns.Salm2Vespres;
        if(TABLES.santsMemories.gloria2Vespres !== '-')
          this.VESPRES.gloria2 = TABLES.santsMemories.gloria2Vespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.gloria2 = TABLES.OficisComuns.gloria2Vespres;
        if(TABLES.santsMemories.ant3Vespres !== '-')
          this.VESPRES.ant3 = TABLES.santsMemories.ant3Vespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.ant3 = TABLES.OficisComuns.ant3Vespres;
        if(TABLES.santsMemories.titol3Vespres !== '-')
          this.VESPRES.titol3 = TABLES.santsMemories.titol3Vespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.titol3 = TABLES.OficisComuns.titol3Vespres;
        this.VESPRES.com3 = ".";
        if(TABLES.santsMemories.Salm3Vespres !== '-')
          this.VESPRES.salm3 = TABLES.santsMemories.Salm3Vespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.salm3 = TABLES.OficisComuns.Salm3Vespres;
        if(TABLES.santsMemories.gloria3Vespres !== '-')
          this.VESPRES.gloria3 = TABLES.santsMemories.gloria3Vespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.gloria3 = TABLES.OficisComuns.gloria3Vespres;
        if(TABLES.santsMemories.citaLBVespres !== '-')
          this.VESPRES.vers = TABLES.santsMemories.citaLBVespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.vers = TABLES.OficisComuns.citaLBVespres;
        if(TABLES.santsMemories.lecturaBreuVespres !== '-')
          this.VESPRES.lecturaBreu = TABLES.santsMemories.lecturaBreuVespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.lecturaBreu = TABLES.OficisComuns.lecturaBreuVespres;
        this.VESPRES.calAntEspecial = false;
        if(TABLES.santsMemories.respBreuVespres1 !== '-')
          this.VESPRES.respBreu1 = TABLES.santsMemories.respBreuVespres1;
        else if(TABLES.OficisComuns !== null) this.VESPRES.respBreu1 = TABLES.OficisComuns.respBreuVespres1;
        if(TABLES.santsMemories.respBreuVespres2 !== '-')
          this.VESPRES.respBreu2 = TABLES.santsMemories.respBreuVespres2;
        else if(TABLES.OficisComuns !== null) this.VESPRES.respBreu2 = TABLES.OficisComuns.respBreuVespres2;
        if(TABLES.santsMemories.respBreuVespres3 !== '-')
          this.VESPRES.respBreu3 = TABLES.santsMemories.respBreuVespres3;
        else if(TABLES.OficisComuns !== null) this.VESPRES.respBreu3 = TABLES.OficisComuns.respBreuVespres3;
        if(TABLES.santsMemories.antMaria !== '-')
          this.VESPRES.antCantic = TABLES.santsMemories.antMaria;
        else if(TABLES.OficisComuns !== null) this.VESPRES.antCantic = TABLES.OficisComuns.antMaria;
        if(TABLES.santsMemories.pregariesVespres2 !== '-')
          this.VESPRES.pregaries = TABLES.santsMemories.pregariesVespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.pregaries = TABLES.OficisComuns.pregariesVespres;
        this.VESPRES.oracio = TABLES.santsMemories.oraFi;
        break;
    }
  }
}

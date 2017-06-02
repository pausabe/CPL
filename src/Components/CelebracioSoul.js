import GLOBAL from '../Globals/Globals';

export default class CelebracioSoul {
  constructor(variabales, liturgicProps, TABLES, idTSF, idDE, HS, SOUL, llati) {
    console.log("Constructor CelebracioSoul");
    this.makePrayer(variabales.date, liturgicProps, TABLES, variabales.celType, variabales.diocesi, idTSF, idDE, HS, SOUL, llati);
  }

  makePrayer(date, liturgicProps, TABLES, celType, diocesi, idTSF, idDE, HS, SOUL, llati){
    console.log("MakePrayer CelebracioSoul");
    this.INFO_CEL = {
      nomCel: '-',
      infoCel: '-',
      typeCel: '-',
    }

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

    if(idDE === -1){
      if(idTSF === -1){
        switch (celType) {
          case "S":
            this.createCel(TABLES, "SF", diocesi, -1, llati, liturgicProps.ABC);
            break;
          case "F":
            if(date.getDay() !== 0) this.createCel(TABLES, "SF", diocesi, llati, liturgicProps.ABC);
            break;
          case "M":
          case "L":
          case "V": //santsMemories entrada 457 o 458, alternativament
            if(date.getDay() !== 0) this.createCel(TABLES, "ML", diocesi, llati, liturgicProps.ABC);
            break;
        }
      }
      else{
        this.createCel(TABLES, "TSF", diocesi, llati, liturgicProps.ABC);
      }
    }
    else{
      this.createCel(TABLES, "DE", diocesi, llati, liturgicProps.ABC);
    }

    CEL = {
      INFO_CEL: this.INFO_CEL,
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

  createCel(TABLES, type, diocesi, llati, anyABC){
    console.log("CelbracioSoul - createCel: " + type);
    switch (type) {
      case "TSF":
        //::::::>>>>>TSF<<<<<::::::
        //::::::TSF-INFO_CEL::::::
        this.INFO_CEL.nomCel = TABLES.tempsSolemnitatsFestes.nomMemoria;
        this.INFO_CEL.infoCel = '-';
        this.INFO_CEL.typeCel = TABLES.tempsSolemnitatsFestes.Cat;


        //::::::TSF-VESPRES1::::::
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

        //::::::TSF-OFICI::::::
        //TSF-OFICI -> INVITATORI
        this.OFICI.antInvitatori = TABLES.tempsSolemnitatsFestes.antInvitatori;
        //TSF-OFICI -> HIMNE
        if(llati) this.OFICI.himne = TABLES.tempsSolemnitatsFestes.himneOficiLlati;
        else this.OFICI.himne = TABLES.tempsSolemnitatsFestes.himneOficiCat;
        //TSF-OFICI -> SALMÒDIA
        //S1
        this.OFICI.ant1 = TABLES.tempsSolemnitatsFestes.ant1Ofici;
        this.OFICI.titol1 = TABLES.tempsSolemnitatsFestes.titolSalm1Ofici;
        this.OFICI.com1 = ".";
        this.OFICI.salm1 = TABLES.tempsSolemnitatsFestes.salm1Ofici;
        this.OFICI.gloria1 = TABLES.tempsSolemnitatsFestes.gloriaOfici1;
        //S2
        this.OFICI.ant2 = TABLES.tempsSolemnitatsFestes.ant2Ofici;
        this.OFICI.titol2 = TABLES.tempsSolemnitatsFestes.titolSalm2Ofici;
        this.OFICI.com2 = ".";
        this.OFICI.salm2 = TABLES.tempsSolemnitatsFestes.salm2Ofici;
        this.OFICI.gloria2 = TABLES.tempsSolemnitatsFestes.gloriaOfici2;
        //S3
        this.OFICI.ant3 = TABLES.tempsSolemnitatsFestes.ant3Ofici;
        this.OFICI.titol3 = TABLES.tempsSolemnitatsFestes.titolSalm3Ofici;
        this.OFICI.com3 = ".";
        this.OFICI.salm3 = TABLES.tempsSolemnitatsFestes.salm3Ofici;
        this.OFICI.gloria3 = TABLES.tempsSolemnitatsFestes.gloriaOfici3;
        //TSF-OFICI -> RESPONSORI
        this.OFICI.respV = TABLES.tempsSolemnitatsFestes.respVOfici;
        this.OFICI.respR = TABLES.tempsSolemnitatsFestes.respROfici;
        //TSF-OFICI -> LECTURA1
        this.OFICI.referencia1 = TABLES.tempsSolemnitatsFestes.referencia1;
        this.OFICI.cita1 = TABLES.tempsSolemnitatsFestes.citaLect1Ofici;
        this.OFICI.titolLectura1 = TABLES.tempsSolemnitatsFestes.titolLect1Ofici;
        this.OFICI.lectura1 = TABLES.tempsSolemnitatsFestes.lectura1;
        if(TABLES.tempsSolemnitatsFestes.citaResp1Ofici !== '-')
          this.OFICI.citaResp1 = TABLES.tempsSolemnitatsFestes.citaResp1Ofici;
        else this.OFICI.citaResp1 = '';
        this.OFICI.resp1Part1 = TABLES.tempsSolemnitatsFestes.resp1Part1Ofici;
        this.OFICI.resp1Part2 = TABLES.tempsSolemnitatsFestes.resp1Part2Ofici;
        this.OFICI.resp1Part3 = TABLES.tempsSolemnitatsFestes.resp1Part3Ofici;
        //TSF-OFICI -> LECTURA2
        this.OFICI.referencia2 = TABLES.tempsSolemnitatsFestes.referencia2Ofici;
        if(TABLES.tempsSolemnitatsFestes.citaResp2Ofici !== '-')
          this.OFICI.citaResp2 = TABLES.tempsSolemnitatsFestes.citaResp2Ofici;
        else this.OFICI.citaResp2 = '';
        this.OFICI.titolLectura2 = TABLES.tempsSolemnitatsFestes.titolLect2Ofici;
        this.OFICI.lectura2 = TABLES.tempsSolemnitatsFestes.lectura2;
        this.OFICI.versResp2 = TABLES.tempsSolemnitatsFestes.citaResp2Ofici;
        this.OFICI.resp2Part1 = TABLES.tempsSolemnitatsFestes.resp2Part1Ofici;
        this.OFICI.resp2Part2 = TABLES.tempsSolemnitatsFestes.resp2Part2Ofici;
        this.OFICI.resp2Part3 = TABLES.tempsSolemnitatsFestes.resp2Part3Ofici;
        //TSF-OFICI -> ORACIÓ
        this.OFICI.himneOhDeuBool = true;
        this.OFICI.oracio = TABLES.tempsSolemnitatsFestes.oraFiOfici;


        //::::::TSF-LAUDES::::::
        //TSF-LAUDES -> INVITATORI
        this.LAUDES.antInvitatori = TABLES.tempsSolemnitatsFestes.antInvitatori;
        //TSF-LAUDES -> HIMNE
        if(llati) this.LAUDES.himne = TABLES.tempsSolemnitatsFestes.himneLaudesLlati;
        else this.LAUDES.himne = TABLES.tempsSolemnitatsFestes.himneLaudesCat;
        //TSF-LAUDES -> SALMÒDIA
        this.LAUDES.ant1 = TABLES.tempsSolemnitatsFestes.ant1Laudes;
        this.LAUDES.ant2 = TABLES.tempsSolemnitatsFestes.ant2Laudes;
        this.LAUDES.ant3 = TABLES.tempsSolemnitatsFestes.ant3Laudes;
        //TSF-LAUDES -> LECTURA BREU
        this.LAUDES.vers = TABLES.tempsSolemnitatsFestes.citaLBLaudes;
        this.LAUDES.lecturaBreu = TABLES.tempsSolemnitatsFestes.lecturaBreuLaudes;
        //TSF-LAUDES -> RESPONSORI
        this.LAUDES.calAntEspecial = false;
        this.LAUDES.respBreu1 = TABLES.tempsSolemnitatsFestes.resp2Part1Laudes;
        this.LAUDES.respBreu2 = TABLES.tempsSolemnitatsFestes.resp2Part2Laudes;
        this.LAUDES.respBreu3 = TABLES.tempsSolemnitatsFestes.resp2Part3Laudes;
        //TSF-LAUDES -> CÀNTIC
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
        //TSF-LAUDES -> PREGÀRIES
        this.LAUDES.pregaries = TABLES.tempsSolemnitatsFestes.pregariesLaudes;
        //TSF-LAUDES -> ORACIÓ
        this.LAUDES.oracio = TABLES.tempsSolemnitatsFestes.oraFiLaudes;


        //::::::TSF-TERCIA::::::
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


        //::::::TSF-SEXTA::::::
        this.SEXTA.himne = '-';
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


        //::::::TSF-NONA::::::
        this.NONA.himne = '-';
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


        //::::::TSF-NONA::::::
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

      case "DE":
        //::::::>>>>>DE<<<<<::::::
        //::::::DE-INFO_CEL::::::
        this.INFO_CEL.nomCel = TABLES.diesespecials.nomMemoria;
        this.INFO_CEL.infoCel = TABLES.diesespecials.infoMemoria;


        //::::::DE-VESPRES1::::::
        /*if(llati) this.VESPRES1.himne = TABLES.diesespecials.himneVespres1Llati;
        else this.VESPRES1.himne = TABLES.diesespecials.himneVespres1Cat;
        this.VESPRES1.ant1 = TABLES.diesespecials.ant1Vespres1;
        this.VESPRES1.titol1 = TABLES.diesespecials.titol1Vespres1;
        this.VESPRES1.com1 = ".";
        this.VESPRES1.salm1 = TABLES.diesespecials.text1Vespres1;
        this.VESPRES1.gloria1 = TABLES.diesespecials.gloria1Vespres1;
        this.VESPRES1.ant2 = TABLES.diesespecials.ant2Vespres1;
        this.VESPRES1.titol2 = TABLES.diesespecials.titol2Vespres1;
        this.VESPRES1.com2 = ".";
        this.VESPRES1.salm2 = TABLES.diesespecials.text2Vespres1;
        this.VESPRES1.gloria2 = TABLES.diesespecials.gloria2Vespres1;
        this.VESPRES1.ant3 = TABLES.diesespecials.ant3Vespres1;
        this.VESPRES1.titol3 = TABLES.diesespecials.titol3Vespres1;
        this.VESPRES1.com3 = ".";
        this.VESPRES1.salm3 = TABLES.diesespecials.text3Vespres1;
        this.VESPRES1.gloria3 = TABLES.diesespecials.gloria3Vespres1;
        this.VESPRES1.vers = TABLES.diesespecials.citaLBVespres1;
        this.VESPRES1.lecturaBreu = TABLES.diesespecials.lecturaBreuVespres1;
        this.VESPRES1.calAntEspecial = false;
        this.VESPRES1.respBreu1 = TABLES.diesespecials.respBreuVespres1Part1;
        this.VESPRES1.respBreu2 = TABLES.diesespecials.respBreuVespres1Part2;
        this.VESPRES1.respBreu3 = TABLES.diesespecials.respBreuVespres1Part3;
        this.VESPRES1.antCantic = TABLES.diesespecials.antMaria1A;
        this.VESPRES1.pregaries = TABLES.diesespecials.pregariesVespres1;
        this.VESPRES1.oracio = TABLES.diesespecials.oraFiVespres1;*/

        //::::::DE-OFICI::::::
        //DE-OFICI -> INVITATORI
        this.OFICI.antInvitatori = TABLES.diesespecials.antInvitatori;
        //DE-OFICI -> HIMNE
        if(llati) this.OFICI.himne = TABLES.diesespecials.himneOficiLlati;
        else this.OFICI.himne = TABLES.diesespecials.himneOficiCat;
        //DE-OFICI -> SALMÒDIA
        //S1
        this.OFICI.ant1 = TABLES.diesespecials.ant1Ofici;
        this.OFICI.titol1 = TABLES.diesespecials.titolSalm1Ofici;
        this.OFICI.com1 = ".";
        this.OFICI.salm1 = TABLES.diesespecials.salm1Ofici;
        this.OFICI.gloria1 = TABLES.diesespecials.gloriaOfici1;
        //S2
        this.OFICI.ant2 = TABLES.diesespecials.ant2Ofici;
        this.OFICI.titol2 = TABLES.diesespecials.titolSalm2Ofici;
        this.OFICI.com2 = ".";
        this.OFICI.salm2 = TABLES.diesespecials.salm2Ofici;
        this.OFICI.gloria2 = TABLES.diesespecials.gloriaOfici2;
        //S3
        this.OFICI.ant3 = TABLES.diesespecials.ant3Ofici;
        this.OFICI.titol3 = TABLES.diesespecials.titolSalm3Ofici;
        this.OFICI.com3 = ".";
        this.OFICI.salm3 = TABLES.diesespecials.salm3Ofici;
        this.OFICI.gloria3 = TABLES.diesespecials.gloriaOfici3;
        //DE-OFICI -> RESPONSORI
        this.OFICI.respV = TABLES.diesespecials.respVOfici;
        this.OFICI.respR = TABLES.diesespecials.respROfici;
        //DE-OFICI -> LECTURA1
        this.OFICI.referencia1 = TABLES.diesespecials.referencia1;
        this.OFICI.cita1 = TABLES.diesespecials.citaLect1Ofici;
        this.OFICI.titolLectura1 = TABLES.diesespecials.titolLect1Ofici;
        this.OFICI.lectura1 = TABLES.diesespecials.lectura1;
        if(TABLES.diesespecials.citaResp1Ofici !== '-')
          this.OFICI.citaResp1 = TABLES.diesespecials.citaResp1Ofici;
        else this.OFICI.citaResp1 = '';
        this.OFICI.resp1Part1 = TABLES.diesespecials.resp1Part1Ofici;
        this.OFICI.resp1Part2 = TABLES.diesespecials.resp1Part2Ofici;
        this.OFICI.resp1Part3 = TABLES.diesespecials.resp1Part3Ofici;
        //DE-OFICI -> LECTURA2
        this.OFICI.referencia2 = TABLES.diesespecials.referencia2Ofici;
        if(TABLES.diesespecials.citaLec2Ofici !== '-')
          this.OFICI.citaResp2 = TABLES.diesespecials.citaLec2Ofici;
        else this.OFICI.citaResp2 = '';
        this.OFICI.titolLectura2 = TABLES.diesespecials.titolLect2Ofici;
        this.OFICI.lectura2 = TABLES.diesespecials.lectura2;
        this.OFICI.versResp2 = TABLES.diesespecials.citaResp2Ofici;
        this.OFICI.resp2Part1 = TABLES.diesespecials.resp2Part1Ofici;
        this.OFICI.resp2Part2 = TABLES.diesespecials.resp2Part2Ofici;
        this.OFICI.resp2Part3 = TABLES.diesespecials.resp2Part3Ofici;
        //DE-OFICI -> ORACIÓ
        this.OFICI.himneOhDeuBool = true;
        this.OFICI.oracio = TABLES.diesespecials.OraFiOfici;


        //::::::DE-LAUDES::::::
        //DE-LAUDES -> INVITATORI
        this.LAUDES.antInvitatori = TABLES.diesespecials.antInvitatori;
        //DE-LAUDES -> HIMNE
        if(llati) this.LAUDES.himne = TABLES.diesespecials.himneLaudesLlati;
        else this.LAUDES.himne = TABLES.diesespecials.himneLaudesCat;
        //DE-LAUDES -> SALMÒDIA
        this.LAUDES.ant1 = TABLES.diesespecials.ant1Laudes;
        this.LAUDES.titol1 = TABLES.diesespecials.titol1Laudes;
        this.LAUDES.salm1 = TABLES.diesespecials.Salm1Laudes;
        this.LAUDES.gloria1 = TABLES.diesespecials.gloria1Laudes;
        this.LAUDES.ant2 = TABLES.diesespecials.ant2Laudes;
        this.LAUDES.titol2 = TABLES.diesespecials.titol2Laudes;
        this.LAUDES.salm2 = TABLES.diesespecials.Salm2Laudes;
        this.LAUDES.gloria2 = TABLES.diesespecials.gloria2Laudes;
        this.LAUDES.ant3 = TABLES.diesespecials.ant3Laudes;
        this.LAUDES.titol3 = TABLES.diesespecials.titol3Laudes;
        this.LAUDES.salm3 = TABLES.diesespecials.Salm3Laudes;
        this.LAUDES.gloria3 = TABLES.diesespecials.gloria3Laudes;
        //DE-LAUDES -> LECTURA BREU
        this.LAUDES.vers = TABLES.diesespecials.citaLBLaudes;
        this.LAUDES.lecturaBreu = TABLES.diesespecials.lecturaBreuLaudes;
        //DE-LAUDES -> RESPONSORI
        this.LAUDES.calAntEspecial = false;
        this.LAUDES.respBreu1 = TABLES.diesespecials.respBreuLaudes1;
        this.LAUDES.respBreu2 = TABLES.diesespecials.respBreuLaudes2;
        this.LAUDES.respBreu3 = TABLES.diesespecials.respBreuLaudes3;
        //DE-LAUDES -> CÀNTIC
        this.LAUDES.antCantic = TABLES.diesespecials.antZacaries;
        //DE-LAUDES -> PREGÀRIES
        this.LAUDES.pregaries = TABLES.diesespecials.pregariesLaudes;
        //DE-LAUDES -> ORACIÓ
        this.LAUDES.oracio = TABLES.diesespecials.OracioTercia;


        //::::::DE-TERCIA::::::
        if(llati) this.TERCIA.himne = TABLES.diesespecials.HimneMenorLlat;
        else this.TERCIA.himne = TABLES.diesespecials.HimneMenorCat;
        this.TERCIA.antifones = false;
        this.TERCIA.ant = TABLES.diesespecials.antMenorTer;
        this.TERCIA.titol1 = TABLES.diesespecials.titol1Menor;
        this.TERCIA.com1 = ".";
        this.TERCIA.salm1 = TABLES.diesespecials.salm1Menor;
        this.TERCIA.gloria1 = TABLES.diesespecials.gloria1Menor;
        this.TERCIA.titol2 = TABLES.diesespecials.titol2Menor;
        this.TERCIA.com2 = ".";
        this.TERCIA.salm2 = TABLES.diesespecials.salm2Menor;
        this.TERCIA.gloria2 = TABLES.diesespecials.gloria2Menor;
        this.TERCIA.titol3 = TABLES.diesespecials.titol3Menor;
        this.TERCIA.com3 = ".";
        this.TERCIA.salm3 = TABLES.diesespecials.salm3Menor;
        this.TERCIA.gloria3 = TABLES.diesespecials.gloria3Menor;
        this.TERCIA.vers = TABLES.diesespecials.citaLBTercia;
        this.TERCIA.lecturaBreu = TABLES.diesespecials.lecturaBreuTercia;
        this.TERCIA.respV = TABLES.diesespecials.respVTercia;
        this.TERCIA.respR = TABLES.diesespecials.respRTercia;
        this.TERCIA.oracio = TABLES.diesespecials.OracioSexta;


        //::::::DE-SEXTA::::::
        if(llati) this.SEXTA.himne = TABLES.diesespecials.HimneMenorLlat;
        else this.SEXTA.himne = TABLES.diesespecials.HimneMenorCat;
        this.SEXTA.antifones = false;
        this.SEXTA.ant = TABLES.diesespecials.antMenorSextA;
        this.SEXTA.titol1 = TABLES.diesespecials.titol1Menor;
        this.SEXTA.com1 = ".";
        this.SEXTA.salm1 = TABLES.diesespecials.salm1Menor;
        this.SEXTA.gloria1 = TABLES.diesespecials.gloria1Menor;
        this.SEXTA.titol2 = TABLES.diesespecials.titol2Menor;
        this.SEXTA.com2 = ".";
        this.SEXTA.salm2 = TABLES.diesespecials.salm2Menor;
        this.SEXTA.gloria2 = TABLES.diesespecials.gloria2Menor;
        this.SEXTA.titol3 = TABLES.diesespecials.titol3Menor;
        this.SEXTA.com3 = ".";
        this.SEXTA.salm3 = TABLES.diesespecials.salm3Menor;
        this.SEXTA.gloria3 = TABLES.diesespecials.gloria3Menor;
        this.SEXTA.vers = TABLES.diesespecials.citaLBSexta;
        this.SEXTA.lecturaBreu = TABLES.diesespecials.lecturaBreuSexta;
        this.SEXTA.respV = TABLES.diesespecials.respVSexta;
        this.SEXTA.respR = TABLES.diesespecials.respRSexta;
        this.SEXTA.oracio = TABLES.diesespecials.OracioNona;


        //::::::DE-NONA::::::
        if(llati) this.NONA.himne = TABLES.diesespecials.HimneMenorLlat;
        else this.NONA.himne = TABLES.diesespecials.HimneMenorCat;
        this.NONA.antifones = false;
        this.NONA.ant = TABLES.diesespecials.antMenorNona;
        this.NONA.titol1 = TABLES.diesespecials.titol1Menor;
        this.NONA.com1 = ".";
        this.NONA.salm1 = TABLES.diesespecials.salm1Menor;
        this.NONA.gloria1 = TABLES.diesespecials.gloria1Menor;
        this.NONA.titol2 = TABLES.diesespecials.titol2Menor;
        this.NONA.com2 = ".";
        this.NONA.salm2 = TABLES.diesespecials.salm2Menor;
        this.NONA.gloria2 = TABLES.diesespecials.gloria2Menor;
        this.NONA.titol3 = TABLES.diesespecials.titol3Menor;
        this.NONA.com3 = ".";
        this.NONA.salm3 = TABLES.diesespecials.salm3Menor;
        this.NONA.gloria3 = TABLES.diesespecials.gloria3Menor;
        this.NONA.vers = TABLES.diesespecials.citaLBNona;
        this.NONA.lecturaBreu = TABLES.diesespecials.lecturaBreuNona;
        this.NONA.respV = TABLES.diesespecials.respVNona;
        this.NONA.respR = TABLES.diesespecials.respRNona;
        this.NONA.oracio = TABLES.diesespecials.OracioNona;


        //::::::DE-VESPRES::::::
        if(llati) this.VESPRES.himne = TABLES.diesespecials.himneVespresLlati;
        else this.VESPRES.himne = TABLES.diesespecials.himneVespresCat;
        this.VESPRES.ant1 = TABLES.diesespecials.ant1Vespres;
        this.VESPRES.titol1 = TABLES.diesespecials.titol1Vespres;
        this.VESPRES.com1 = ".";
        this.VESPRES.salm1 = TABLES.diesespecials.Salm1Vespres;
        this.VESPRES.gloria1 = TABLES.diesespecials.gloria1Vespres;
        this.VESPRES.ant2 = TABLES.diesespecials.ant2Vespres;
        this.VESPRES.titol2 = TABLES.diesespecials.titol2Vespres;
        this.VESPRES.com2 = ".";
        this.VESPRES.salm2 = TABLES.diesespecials.Salm2Vespres;
        this.VESPRES.gloria2 = TABLES.diesespecials.gloria2Vespres;
        this.VESPRES.ant3 = TABLES.diesespecials.ant3Vespres;
        this.VESPRES.titol3 = TABLES.diesespecials.titol3Vespres;
        this.VESPRES.com3 = ".";
        this.VESPRES.salm3 = TABLES.diesespecials.Salm3Vespres;
        this.VESPRES.gloria3 = TABLES.diesespecials.gloria3Vespres;
        this.VESPRES.vers = TABLES.diesespecials.citaLBVespres;
        this.VESPRES.lecturaBreu = TABLES.diesespecials.lecturaBreuVespres;
        this.VESPRES.calAntEspecial = false;
        this.VESPRES.respBreu1 = TABLES.diesespecials.respBreuVespres1;
        this.VESPRES.respBreu2 = TABLES.diesespecials.respBreuVespres2;
        this.VESPRES.respBreu3 = TABLES.diesespecials.respBreuVespres3;
        this.VESPRES.antCantic = TABLES.diesespecials.antMaria;
        this.VESPRES.pregaries = TABLES.diesespecials.pregariesVespres;
        this.VESPRES.oracio = TABLES.diesespecials.oraFi;
        break;


      case "SF":
        //::::::>>>>>SF<<<<<::::::
        //::::::SF-INFO_CEL::::::
        this.INFO_CEL.nomCel = TABLES.santsSolemnitats.nomMemoria;
        this.INFO_CEL.infoCel = TABLES.santsSolemnitats.infoMemoria;
        this.INFO_CEL.typeCel = TABLES.santsSolemnitats.Cat;


        //::::::SF-VESPRES1::::::
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


        //::::::SF-OFICI::::::
        //SF-OFICI -> INVITATORI
        if(TABLES.santsSolemnitats.antInvitatori !== '-')
          this.OFICI.antInvitatori = TABLES.santsSolemnitats.antInvitatori;
        else this.OFICI.antInvitatori = TABLES.OficisComuns.antInvitatori;
        //SF-OFICI -> HIMNE
        if(TABLES.santsSolemnitats.himneOficiLlati !== '-'){
          if(llati) this.OFICI.himne = TABLES.santsSolemnitats.himneOficiLlati;
          else this.OFICI.himne = TABLES.santsSolemnitats.himneOficiCat;
        }
        else if(TABLES.OficisComuns !== null) {
          if(llati) this.OFICI.himne = TABLES.OficisComuns.himneOficiLlati;
          else this.OFICI.himne = TABLES.OficisComuns.himneOficiCat;
        }
        //SF-OFICI -> SALMÒDIA
        //S1
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
        //S2
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
        //S3
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
        //SF-OFICI -> RESPONSORI 1
        if(TABLES.santsSolemnitats.respVOfici !== '-')
          this.OFICI.respV = TABLES.santsSolemnitats.respVOfici;
        else if(TABLES.OficisComuns !== null) this.OFICI.respV = TABLES.OficisComuns.respVOfici;
        if(TABLES.santsSolemnitats.respROfici !== '-')
          this.OFICI.respR = TABLES.santsSolemnitats.respROfici;
        else if(TABLES.OficisComuns !== null) this.OFICI.respR = TABLES.OficisComuns.respROfici;
        //SF-OFICI -> LECTURA 1
        if(TABLES.santsSolemnitats.referencia1 !== '-')
          this.OFICI.referencia1 = TABLES.santsSolemnitats.referencia1;
        else if(TABLES.OficisComuns !== null) this.OFICI.referencia1 = TABLES.OficisComuns.referencia1;
        if(TABLES.santsSolemnitats.citaLect1Ofici !== '-')
          this.OFICI.cita1 = TABLES.santsSolemnitats.citaLect1Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.cita1 = TABLES.OficisComuns.citaLect1Ofici;
        if(TABLES.santsSolemnitats.titolLect1Ofici !== '-')
          this.OFICI.titolLectura1 = TABLES.santsSolemnitats.titolLect1Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.titolLectura1 = TABLES.OficisComuns.titolLect1Ofici;
        if(TABLES.santsSolemnitats.lectura1 !== '-')
          this.OFICI.lectura1 = TABLES.santsSolemnitats.lectura1;
        else if(TABLES.OficisComuns !== null) this.OFICI.lectura1 = TABLES.OficisComuns.lectura1;
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
        //SF-OFICI -> LECTURA 2
        if(TABLES.santsSolemnitats.referencia2Ofici !== '-')
          this.OFICI.referencia2 = TABLES.santsSolemnitats.referencia2Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.referencia2 = TABLES.OficisComuns.referencia2Ofici;
        if(TABLES.santsSolemnitats.citaLec2Ofici !== '-')
          this.OFICI.cita2 = TABLES.santsSolemnitats.citaLec2Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.cita2 = TABLES.OficisComuns.citaLec2Ofici;
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
        if(TABLES.santsSolemnitats.resp2Part3Ofici !== '-')
          this.OFICI.resp2Part3 = TABLES.santsSolemnitats.resp2Part3Ofici;
        else if(TABLES.OficisComuns !== null) this.OFICI.resp2Part3 = TABLES.OficisComuns.resp2Part3Ofici;
        //SF-OFICI -> ORACIÓ
        this.OFICI.himneOhDeuBool = true;
        this.OFICI.oracio = TABLES.santsSolemnitats.oraFiOfici;


        //::::::SF-LAUDES::::::
        //SF-LAUDES -> INVITATORI
        if(TABLES.santsSolemnitats.antInvitatori !== '-')
          this.LAUDES.antInvitatori = TABLES.santsSolemnitats.antInvitatori;
        else if(TABLES.OficisComuns !== null) this.LAUDES.antInvitatori = TABLES.OficisComuns.antInvitatori;
        //SF-LAUDES -> HIMNE
        if(TABLES.santsSolemnitats.himneLaudesLlati !== '-'){
          if(llati) this.LAUDES.himne = TABLES.santsSolemnitats.himneLaudesLlati;
          else this.LAUDES.himne = TABLES.santsSolemnitats.himneLaudesCat;
        }
        else if(TABLES.OficisComuns !== null){
          if(llati) this.LAUDES.himne = TABLES.OficisComuns.himneLaudesLlati;
          else this.LAUDES.himne = TABLES.OficisComuns.himneLaudesCat;
        }
        //SF-LAUDES -> SALMÒDIA
        if(TABLES.santsSolemnitats.ant1Laudes !== '-')
          this.LAUDES.ant1 = TABLES.santsSolemnitats.ant1Laudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.ant1 = TABLES.OficisComuns.ant1Laudes;
        if(TABLES.santsSolemnitats.ant2Laudes !== '-')
          this.LAUDES.ant2 = TABLES.santsSolemnitats.ant2Laudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.ant2 = TABLES.OficisComuns.ant2Laudes;
        if(TABLES.santsSolemnitats.ant3Laudes !== '-')
          this.LAUDES.ant3 = TABLES.santsSolemnitats.ant3Laudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.ant3 = TABLES.OficisComuns.ant3Laudes;
        if(TABLES.OficisComuns !== null){
          this.LAUDES.titol1 = TABLES.OficisComuns.titol1Laudes;
          this.LAUDES.com1 = '-';
          this.LAUDES.salm1 = TABLES.OficisComuns.Salm1Laudes;
          this.LAUDES.gloria1 = TABLES.OficisComuns.gloria1Laudes;
          this.LAUDES.titol2 = TABLES.OficisComuns.titol2Laudes;
          this.LAUDES.com2 = '-';
          this.LAUDES.salm2 = TABLES.OficisComuns.Salm2Laudes;
          this.LAUDES.gloria2 = TABLES.OficisComuns.gloria2Laudes;
          this.LAUDES.titol3 = TABLES.OficisComuns.titol3Laudes;
          this.LAUDES.com3 = '-';
          this.LAUDES.salm3 = TABLES.OficisComuns.Salm3Laudes;
          this.LAUDES.gloria3 = TABLES.OficisComuns.gloria3Laudes;
        }
        //SF-LAUDES -> LECTURA BREU
        if(TABLES.santsSolemnitats.citaLBLaudes !== '-')
          this.LAUDES.vers = TABLES.santsSolemnitats.citaLBLaudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.vers = TABLES.OficisComuns.citaLBLaudes;
        if(TABLES.santsSolemnitats.lecturaBreuLaudes !== '-')
          this.LAUDES.lecturaBreu = TABLES.santsSolemnitats.lecturaBreuLaudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.lecturaBreu = TABLES.OficisComuns.lecturaBreuLaudes;
        //SF-LAUDES -> RESPONSORI
        this.LAUDES.calAntEspecial = false;
        if(TABLES.santsSolemnitats.resp2Part1Laudes !== '-')
          this.LAUDES.respBreu1 = TABLES.santsSolemnitats.resp2Part1Laudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.respBreu1 = TABLES.OficisComuns.respBreuLaudes1;
        if(TABLES.santsSolemnitats.resp2Part2Laudes !== '-')
          this.LAUDES.respBreu2 = TABLES.santsSolemnitats.resp2Part2Laudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.respBreu2 = TABLES.OficisComuns.respBreuLaudes2;
        if(TABLES.santsSolemnitats.resp2Part3Laudes !== '-')
          this.LAUDES.respBreu3 = TABLES.santsSolemnitats.resp2Part3Laudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.respBreu3 = TABLES.OficisComuns.respBreuLaudes3;
        //SF-LAUDES -> CÀNTIC
        if(TABLES.santsSolemnitats.antZacaries !== '-')
          this.LAUDES.antCantic = TABLES.santsSolemnitats.antZacaries;
        else if(TABLES.OficisComuns !== null) this.LAUDES.antCantic = TABLES.OficisComuns.antZacaries;
        //SF-LAUDES -> PREGÀRIES
        if(TABLES.santsSolemnitats.pregariesLaudes !== '-')
          this.LAUDES.pregaries = TABLES.santsSolemnitats.pregariesLaudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.pregaries = TABLES.OficisComuns.pregariesLaudes;
        //SF-LAUDES -> ORACIÓ
        if(TABLES.santsSolemnitats.oraFiLaudes !== '-')
          this.LAUDES.oracio = TABLES.santsSolemnitats.oraFiLaudes;
        else if(TABLES.OficisComuns !== null) this.LAUDES.oracio = TABLES.OficisComuns.oraFiLaudes;


        //::::::SF-TÈRCIA::::::
        //SF-TÈRCIA -> SALMÒDIA
        //ANT
        this.TERCIA.antifones = false;
        if(TABLES.santsSolemnitats.antMenorTercia !== '-')
          this.TERCIA.ant = TABLES.santsSolemnitats.antMenorTercia;
        else if(TABLES.OficisComuns !== null) this.TERCIA.ant = TABLES.OficisComuns.antMenorTer;
        //S1
        this.TERCIA.titol1 = TABLES.santsSolemnitats.titolSalm1;
        this.TERCIA.com1 = ".";
        this.TERCIA.salm1 = TABLES.santsSolemnitats.salm1Menor;
        this.TERCIA.gloria1 = TABLES.santsSolemnitats.gloriaSalm1;
        //S2
        this.TERCIA.titol2 = TABLES.santsSolemnitats.titolSalm2;
        this.TERCIA.com2 = ".";
        this.TERCIA.salm2 = TABLES.santsSolemnitats.salm2Menor;
        this.TERCIA.gloria2 = TABLES.santsSolemnitats.gloriaSalm2;
        //S3
        this.TERCIA.titol3 = TABLES.santsSolemnitats.titolSalm3;
        this.TERCIA.com3 = ".";
        this.TERCIA.salm3 = TABLES.santsSolemnitats.salm3Menor;
        this.TERCIA.gloria3 = TABLES.santsSolemnitats.gloriaSalm3;
        //SF-TÈRCIA -> LECTURA BREU
        if(TABLES.santsSolemnitats.citaLBTercia !== '-')
          this.TERCIA.vers = TABLES.santsSolemnitats.citaLBTercia;
        else if(TABLES.OficisComuns !== null) this.TERCIA.vers = TABLES.OficisComuns.citaLBTercia;
        if(TABLES.santsSolemnitats.lecturaBreuTercia !== '-')
          this.TERCIA.lecturaBreu = TABLES.santsSolemnitats.lecturaBreuTercia;
        else if(TABLES.OficisComuns !== null) this.TERCIA.lecturaBreu = TABLES.OficisComuns.lecturaBreuTercia;
        //SF-TÈRCIA -> RESPONSORI
        if(TABLES.santsSolemnitats.responsoriVTercia !== '-')
          this.TERCIA.respV = TABLES.santsSolemnitats.responsoriVTercia;
        else if(TABLES.OficisComuns !== null) this.TERCIA.respV = TABLES.OficisComuns.respVTercia;
        if(TABLES.santsSolemnitats.responsoriRTercia !== '-')
          this.TERCIA.respR = TABLES.santsSolemnitats.responsoriRTercia;
        else if(TABLES.OficisComuns !== null) this.TERCIA.respR = TABLES.OficisComuns.respRTercia;
        //SF-TÈRCIA -> ORACIÓ
        if(TABLES.santsSolemnitats.oraFiMenor !== '-')
          this.TERCIA.oracio = TABLES.santsSolemnitats.oraFiMenor;
        else if(TABLES.OficisComuns !== null) this.TERCIA.oracio = TABLES.OficisComuns.oraFiMenor;


        //::::::SF-SEXTA::::::
        //SF-SEXTA -> SALMÒDIA
        //ANT
        this.SEXTA.antifones = false;
        if(TABLES.santsSolemnitats.antMenorSexta !== '-')
          this.SEXTA.ant = TABLES.santsSolemnitats.antMenorSexta;
        else if(TABLES.OficisComuns !== null) this.SEXTA.ant = TABLES.OficisComuns.antMenorSextA;
        //S1
        this.SEXTA.titol1 = TABLES.santsSolemnitats.titolSalm1;
        this.SEXTA.com1 = ".";
        this.SEXTA.salm1 = TABLES.santsSolemnitats.salm1Menor;
        this.SEXTA.gloria1 = TABLES.santsSolemnitats.gloriaSalm1;
        //S2
        this.SEXTA.titol2 = TABLES.santsSolemnitats.titolSalm2;
        this.SEXTA.com2 = ".";
        this.SEXTA.salm2 = TABLES.santsSolemnitats.salm2Menor;
        this.SEXTA.gloria2 = TABLES.santsSolemnitats.gloriaSalm2;
        //S3
        this.SEXTA.titol3 = TABLES.santsSolemnitats.titolSalm3;
        this.SEXTA.com3 = ".";
        this.SEXTA.salm3 = TABLES.santsSolemnitats.salm3Menor;
        this.SEXTA.gloria3 = TABLES.santsSolemnitats.gloriaSalm3;
        //SF-SEXTA -> LECTURA BREU
        if(TABLES.santsSolemnitats.citaLBSexta !== '-')
          this.SEXTA.vers = TABLES.santsSolemnitats.citaLBSexta;
        else if(TABLES.OficisComuns !== null) this.SEXTA.vers = TABLES.OficisComuns.citaLBSexta;
        if(TABLES.santsSolemnitats.lecturaBreuSexta !== '-')
          this.SEXTA.lecturaBreu = TABLES.santsSolemnitats.lecturaBreuSexta;
        else if(TABLES.OficisComuns !== null) this.SEXTA.lecturaBreu = TABLES.OficisComuns.lecturaBreuSexta;
        //SF-SEXTA -> RESPONSORI BREU
        if(TABLES.santsSolemnitats.responsoriVSexta !== '-')
          this.SEXTA.respV = TABLES.santsSolemnitats.responsoriVSexta;
        else if(TABLES.OficisComuns !== null) this.SEXTA.respV = TABLES.OficisComuns.respVSexta;
        if(TABLES.santsSolemnitats.responsoriRSexta !== '-')
          this.SEXTA.respR = TABLES.santsSolemnitats.responsoriRSexta;
        else if(TABLES.OficisComuns !== null) this.SEXTA.respR = TABLES.OficisComuns.respRSexta;
        //SF-SEXTA -> ORACIÓ
        if(TABLES.santsSolemnitats.oraFiMenor !== '-')
          this.SEXTA.oracio = TABLES.santsSolemnitats.oraFiMenor;
        else if(TABLES.OficisComuns !== null) this.SEXTA.oracio = TABLES.OficisComuns.oraFiMenor;


        //::::::SF-NONA::::::
        //SF-NONA -> SALMÒDIA
        //ANT
        this.NONA.antifones = false;
        if(TABLES.santsSolemnitats.antMenorNona !== '-')
          this.NONA.ant = TABLES.santsSolemnitats.antMenorNona;
        else if(TABLES.OficisComuns !== null) this.NONA.ant = TABLES.OficisComuns.antMenorNona;
        //S1
        this.NONA.titol1 = TABLES.santsSolemnitats.titolSalm1;
        this.NONA.com1 = ".";
        this.NONA.salm1 = TABLES.santsSolemnitats.salm1Menor;
        this.NONA.gloria1 = TABLES.santsSolemnitats.gloriaSalm1;
        //S2
        this.NONA.titol2 = TABLES.santsSolemnitats.titolSalm2;
        this.NONA.com2 = ".";
        this.NONA.salm2 = TABLES.santsSolemnitats.salm2Menor;
        this.NONA.gloria2 = TABLES.santsSolemnitats.gloriaSalm2;
        //S3
        this.NONA.titol3 = TABLES.santsSolemnitats.titolSalm3;
        this.NONA.com3 = ".";
        this.NONA.salm3 = TABLES.santsSolemnitats.salm3Menor;
        this.NONA.gloria3 = TABLES.santsSolemnitats.gloriaSalm3;
        //SF-NONA -> LECTURA BREU
        if(TABLES.santsSolemnitats.citaLBNona !== '-')
          this.NONA.vers = TABLES.santsSolemnitats.citaLBNona;
        else if(TABLES.OficisComuns !== null) this.NONA.vers = TABLES.OficisComuns.citaLBNona;
        if(TABLES.santsSolemnitats.lecturaBreuNona !== '-')
          this.NONA.lecturaBreu = TABLES.santsSolemnitats.lecturaBreuNona;
        else if(TABLES.OficisComuns !== null) this.NONA.lecturaBreu = TABLES.OficisComuns.lecturaBreuNona;
        //SF-NONA -> RESPONSORI
        if(TABLES.santsSolemnitats.responsoriVNona !== '-')
          this.NONA.respV = TABLES.santsSolemnitats.responsoriVNona;
        else if(TABLES.OficisComuns !== null) this.NONA.respV = TABLES.OficisComuns.respVNona;
        if(TABLES.santsSolemnitats.responsoriRNona !== '-')
          this.NONA.respR = TABLES.santsSolemnitats.responsoriRNona;
        else if(TABLES.OficisComuns !== null) this.NONA.respR = TABLES.OficisComuns.respRNona;
        //SF-NONA -> ORACIÓ
        if(TABLES.santsSolemnitats.oraFiMenor !== '-')
          this.NONA.oracio = TABLES.santsSolemnitats.oraFiMenor;
        else if(TABLES.OficisComuns !== null) this.NONA.oracio = TABLES.OficisComuns.oraFiMenor;


        //::::::SF-VESPRES2::::::
        //SF-VESPRES2 -> HIMNE
        if(TABLES.santsSolemnitats.himneVespres2Llati !== '-'){
          if(llati) this.VESPRES.himne = TABLES.santsSolemnitats.himneVespres2Llati;
          else this.VESPRES.himne = TABLES.santsSolemnitats.himneVespres2Cat;
        }
        else if(TABLES.OficisComuns !== null){
          if(llati) this.VESPRES.himne = TABLES.OficisComuns.himneVespresLlati;
          else this.VESPRES.himne = TABLES.OficisComuns.himneVespresCat;
        }
        //SF-VESPRES2 -> SALMÒDIA
        //S1
        if(TABLES.santsSolemnitats.ant1Vespres2 !== '-')
          this.VESPRES.ant1 = TABLES.santsSolemnitats.ant1Vespres2;
        else if(TABLES.OficisComuns !== null) this.VESPRES.ant1 = TABLES.OficisComuns.ant1Vespres;
        if(TABLES.santsSolemnitats.titol1Vespres2 !== '-')
          this.VESPRES.titol1 = TABLES.santsSolemnitats.titol1Vespres2;
        else if(TABLES.OficisComuns !== null) this.VESPRES.titol1 = TABLES.OficisComuns.titol1Vespres;
        this.VESPRES.com1 = ".";
        if(TABLES.santsSolemnitats.text1Vespres2 !== '-')
          this.VESPRES.salm1 = TABLES.santsSolemnitats.text1Vespres2;
        else if(TABLES.OficisComuns !== null) this.VESPRES.salm1 = TABLES.OficisComuns.Salm1Vespres;
        if(TABLES.santsSolemnitats.gloria1Vespres2 !== '-')
          this.VESPRES.gloria1 = TABLES.santsSolemnitats.gloria1Vespres2;
        else if(TABLES.OficisComuns !== null) this.VESPRES.gloria1 = TABLES.OficisComuns.gloria1Vespres;
        //S2
        if(TABLES.santsSolemnitats.ant2Vespres2 !== '-')
          this.VESPRES.ant2 = TABLES.santsSolemnitats.ant2Vespres2;
        else if(TABLES.OficisComuns !== null) this.VESPRES.ant2 = TABLES.OficisComuns.ant2Vespres;
        if(TABLES.santsSolemnitats.titol2Vespres2 !== '-')
          this.VESPRES.titol2 = TABLES.santsSolemnitats.titol2Vespres2;
        else if(TABLES.OficisComuns !== null) this.VESPRES.titol2 = TABLES.OficisComuns.titol2Vespres;
        this.VESPRES.com2 = ".";
        if(TABLES.santsSolemnitats.text2Vespres2 !== '-')
          this.VESPRES.salm2 = TABLES.santsSolemnitats.text2Vespres2;
        else if(TABLES.OficisComuns !== null) this.VESPRES.salm2 = TABLES.OficisComuns.Salm2Vespres;
        if(TABLES.santsSolemnitats.gloria2Vespres2 !== '-')
          this.VESPRES.gloria2 = TABLES.santsSolemnitats.gloria2Vespres2;
        else if(TABLES.OficisComuns !== null) this.VESPRES.gloria2 = TABLES.OficisComuns.gloria2Vespres;
        //S3
        if(TABLES.santsSolemnitats.ant3Vespres2 !== '-')
          this.VESPRES.ant3 = TABLES.santsSolemnitats.ant3Vespres2;
        else if(TABLES.OficisComuns !== null) this.VESPRES.ant3 = TABLES.OficisComuns.ant3Vespres;
        if(TABLES.santsSolemnitats.titol3Vespres2 !== '-')
          this.VESPRES.titol3 = TABLES.santsSolemnitats.titol3Vespres2;
        else if(TABLES.OficisComuns !== null) this.VESPRES.titol3 = TABLES.OficisComuns.titol3Vespres;
        this.VESPRES.com3 = ".";
        if(TABLES.santsSolemnitats.text3Vespres2 !== '-')
          this.VESPRES.salm3 = TABLES.santsSolemnitats.text3Vespres2;
        else if(TABLES.OficisComuns !== null) this.VESPRES.salm3 = TABLES.OficisComuns.Salm3Vespres;
        if(TABLES.santsSolemnitats.gloria3Vespres !== '-')
          this.VESPRES.gloria3 = TABLES.santsSolemnitats.gloria3Vespres;
        else if(TABLES.OficisComuns !== null) this.VESPRES.gloria3 = TABLES.OficisComuns.gloria3Vespres;
        //SF-VESPRES2 -> LECTURA BREU
        if(TABLES.santsSolemnitats.citaLBVespres2 !== '-')
          this.VESPRES.vers = TABLES.santsSolemnitats.citaLBVespres2;
        else if(TABLES.OficisComuns !== null) this.VESPRES.vers = TABLES.OficisComuns.citaLBVespres;
        if(TABLES.santsSolemnitats.lecturaBreuVespres2 !== '-')
          this.VESPRES.lecturaBreu = TABLES.santsSolemnitats.lecturaBreuVespres2;
        else if(TABLES.OficisComuns !== null) this.VESPRES.lecturaBreu = TABLES.OficisComuns.lecturaBreuVespres;
        //SF-VESPRES2 -> RESPONSORI
        this.VESPRES.calAntEspecial = false;
        if(TABLES.santsSolemnitats.respBreuVespres2Part1 !== '-')
          this.VESPRES.respBreu1 = TABLES.santsSolemnitats.respBreuVespres2Part1;
        else if(TABLES.OficisComuns !== null) this.VESPRES.respBreu1 = TABLES.OficisComuns.respBreuVespres1;
        if(TABLES.santsSolemnitats.respBreuVespres2Part2 !== '-')
          this.VESPRES.respBreu2 = TABLES.santsSolemnitats.respBreuVespres2Part2;
        else if(TABLES.OficisComuns !== null) this.VESPRES.respBreu2 = TABLES.OficisComuns.respBreuVespres2;
        if(TABLES.santsSolemnitats.respBreuVespres2Part3 !== '-')
          this.VESPRES.respBreu3 = TABLES.santsSolemnitats.respBreuVespres2Part3;
        else if(TABLES.OficisComuns !== null) this.VESPRES.respBreu3 = TABLES.OficisComuns.respBreuVespres3;
        //SF-VESPRES2 -> CÀNTIC
        if(TABLES.santsSolemnitats.antMaria2 !== '-')
          this.VESPRES.antCantic = TABLES.santsSolemnitats.antMaria2;
        else if(TABLES.OficisComuns !== null) this.VESPRES.antCantic = TABLES.OficisComuns.antMaria;
        //SF-VESPRES2 -> PREGÀRIES
        if(TABLES.santsSolemnitats.pregariesVespres2 !== '-')
          this.VESPRES.pregaries = TABLES.santsSolemnitats.pregariesVespres2;
        else if(TABLES.OficisComuns !== null) this.VESPRES.pregaries = TABLES.OficisComuns.pregariesVespres;
        //SF-VESPRES2 -> ORACIÓ
        this.VESPRES.oracio = TABLES.santsSolemnitats.oraFiVespres2;
        break;

      case  "ML":
      //::::::>>>>>ML<<<<<::::::
      //::::::INFO_CEL::::::
      this.INFO_CEL.nomCel = TABLES.santsMemories.nomMemoria;
      this.INFO_CEL.infoCel = TABLES.santsMemories.infoMemoria;

      //::::::ML-OFICI::::::
      if(TABLES.santsMemories.Invitatori !== '-')
        this.OFICI.antInvitatori = TABLES.santsMemories.Invitatori;
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
      if(TABLES.santsMemories.titol1Ofici !== '-')
        this.OFICI.titol1 = TABLES.santsMemories.titol1Ofici;
      else if(TABLES.OficisComuns !== null) this.OFICI.titol1 = TABLES.OficisComuns.titolSalm1Ofici;
      this.OFICI.com1 = ".";
      if(TABLES.santsMemories.Salm1Ofici !== '-')
        this.OFICI.salm1 = TABLES.santsMemories.Salm1Ofici;
      else if(TABLES.OficisComuns !== null) this.OFICI.salm1 = TABLES.OficisComuns.salm1Ofici;
      if(TABLES.santsMemories.gloriaOfici1 !== '-')
        this.OFICI.gloria1 = TABLES.santsMemories.gloriaOfici1;
      else if(TABLES.OficisComuns !== null) this.OFICI.gloria1 = TABLES.OficisComuns.gloriaOfici1;
      if(TABLES.santsMemories.ant2Ofici !== '-')
        this.OFICI.ant2 = TABLES.santsMemories.ant2Ofici;
      else if(TABLES.OficisComuns !== null) this.OFICI.ant2 = TABLES.OficisComuns.ant2Ofici;
      if(TABLES.santsMemories.titol2Ofici !== '-')
        this.OFICI.titol2 = TABLES.santsMemories.titol2Ofici;
      else if(TABLES.OficisComuns !== null) this.OFICI.titol2 = TABLES.OficisComuns.titolSalm2Ofici;
      this.OFICI.com2 = ".";
      if(TABLES.santsMemories.Salm2Ofici !== '-')
        this.OFICI.salm2 = TABLES.santsMemories.Salm2Ofici;
      else if(TABLES.OficisComuns !== null) this.OFICI.salm2 = TABLES.OficisComuns.salm2Ofici;
      if(TABLES.santsMemories.gloriaOfici2 !== '-')
        this.OFICI.gloria2 = TABLES.santsMemories.gloriaOfici2;
      else if(TABLES.OficisComuns !== null) this.OFICI.gloria2 = TABLES.OficisComuns.gloriaOfici2;
      if(TABLES.santsMemories.ant3Ofici !== '-')
        this.OFICI.ant3 = TABLES.santsMemories.ant3Ofici;
      else if(TABLES.OficisComuns !== null) this.OFICI.ant3 = TABLES.OficisComuns.ant3Ofici;
      if(TABLES.santsMemories.titol3Ofici !== '-')
        this.OFICI.titol3 = TABLES.santsMemories.titol3Ofici;
      else if(TABLES.OficisComuns !== null) this.OFICI.titol3 = TABLES.OficisComuns.titolSalm3Ofici;
      this.OFICI.com3 = ".";
      if(TABLES.santsMemories.Salm3Ofici !== '-')
        this.OFICI.salm3 = TABLES.santsMemories.Salm3Ofici;
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
      if(TABLES.santsMemories.lectura1 !== '-')
        this.OFICI.lectura1 = TABLES.santsMemories.lectura1;
      else if(TABLES.OficisComuns !== null) this.OFICI.lectura1 = TABLES.OficisComuns.lectura1;
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
      if(TABLES.santsMemories.citaLec2Ofici !== '-')
        this.OFICI.cita2 = TABLES.santsMemories.citaLec2Ofici;
      else if(TABLES.OficisComuns !== null) this.OFICI.cita2 = TABLES.OficisComuns.citaLec2Ofici;
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
      if(TABLES.santsMemories.resp2Part3Ofici !== '-')
        this.OFICI.resp2Part3 = TABLES.santsMemories.resp2Part3Ofici;
      else if(TABLES.OficisComuns !== null) this.OFICI.resp2Part3 = TABLES.OficisComuns.resp2Part3Ofici;
      if(TABLES.santsMemories.oraFiOfici !== '-')
        this.OFICI.himneOhDeu = TABLES.santsMemories.oraFiOfici;
      else if(TABLES.OficisComuns !== null) this.OFICI.himneOhDeu = TABLES.OficisComuns.oraFiOfici;
      this.OFICI.himneOhDeuBool = true; //TODO: si??


      //:::::::ML LAUDES:::::::
      //ML LAUDES -> INVITATORI
      if(TABLES.santsMemories.Invitatori !== '-')
        this.LAUDES.antInvitatori = TABLES.santsMemories.Invitatori;
      else if(TABLES.OficisComuns !== null) this.LAUDES.antInvitatori = TABLES.OficisComuns.antInvitatori;
      //ML LAUDES -> HIMNE
      if(TABLES.santsMemories.himneLaudesLlati !== '-'){
        if(llati) this.LAUDES.himne = TABLES.santsMemories.himneLaudesLlati;
        else this.LAUDES.himne = TABLES.santsMemories.himneLaudesCat;
      }
      else if(TABLES.OficisComuns !== null){
        if(llati) this.LAUDES.himne = TABLES.OficisComuns.himneLaudesLlati;
        else this.LAUDES.himne = TABLES.OficisComuns.himneLaudesCat;
      }
      //ML LAUDES -> SALMÒDIA
      //ML LAUDES -> S1
      if(TABLES.santsMemories.ant1Laudes !== '-')
        this.LAUDES.ant1 = TABLES.santsMemories.ant1Laudes;
      else if(TABLES.OficisComuns !== null) this.LAUDES.ant1 = TABLES.OficisComuns.ant1Laudes;
      if(TABLES.santsMemories.titol1Laudes !== '-')
        this.LAUDES.titol1 = TABLES.santsMemories.titol1Laudes;
      else if(TABLES.OficisComuns !== null) this.LAUDES.titol1 = TABLES.OficisComuns.titol1Laudes;
      if(TABLES.santsMemories.Salm1Laudes !== '-')
        this.LAUDES.salm1 = TABLES.santsMemories.Salm1Laudes;
      else if(TABLES.OficisComuns !== null) this.LAUDES.salm1 = TABLES.OficisComuns.Salm1Laudes;
      if(TABLES.santsMemories.gloria1Laudes !== '-')
        this.LAUDES.gloria1 = TABLES.santsMemories.gloria1Laudes;
      else if(TABLES.OficisComuns !== null) this.LAUDES.gloria1 = TABLES.OficisComuns.gloria1Laudes;
      //ML LAUDES -> S2
      if(TABLES.santsMemories.ant2Laudes !== '-')
        this.LAUDES.ant2 = TABLES.santsMemories.ant2Laudes;
      else if(TABLES.OficisComuns !== null) this.LAUDES.ant2 = TABLES.OficisComuns.ant2Laudes;
      if(TABLES.santsMemories.titol2Laudes !== '-')
        this.LAUDES.titol2 = TABLES.santsMemories.titol2Laudes;
      else if(TABLES.OficisComuns !== null) this.LAUDES.titol2 = TABLES.OficisComuns.titol2Laudes;
      if(TABLES.santsMemories.Salm2Laudes !== '-')
        this.LAUDES.salm2 = TABLES.santsMemories.Salm2Laudes;
      else if(TABLES.OficisComuns !== null) this.LAUDES.salm2 = TABLES.OficisComuns.Salm2Laudes;
      if(TABLES.santsMemories.gloria2Laudes !== '-')
        this.LAUDES.gloria2 = TABLES.santsMemories.gloria2Laudes;
      else if(TABLES.OficisComuns !== null) this.LAUDES.gloria2 = TABLES.OficisComuns.gloria2Laudes;
      //ML LAUDES -> LAUDES -> S3
      if(TABLES.santsMemories.ant3Laudes !== '-')
        this.LAUDES.ant3 = TABLES.santsMemories.ant3Laudes;
      else if(TABLES.OficisComuns !== null) this.LAUDES.ant3 = TABLES.OficisComuns.ant3Laudes;
      if(TABLES.santsMemories.titol3Laudes !== '-')
        this.LAUDES.titol3 = TABLES.santsMemories.titol3Laudes;
      else if(TABLES.OficisComuns !== null) this.LAUDES.titol3 = TABLES.OficisComuns.titol3Laudes;
      if(TABLES.santsMemories.Salm3Laudes !== '-')
        this.LAUDES.salm3 = TABLES.santsMemories.Salm3Laudes;
      else if(TABLES.OficisComuns !== null) this.LAUDES.salm3 = TABLES.OficisComuns.Salm3Laudes;
      if(TABLES.santsMemories.gloria3Laudes !== '-')
        this.LAUDES.gloria3 = TABLES.santsMemories.gloria3Laudes;
      else if(TABLES.OficisComuns !== null) this.LAUDES.gloria3 = TABLES.OficisComuns.gloria3Laudes;
      //ML LAUDES -> LECTURA BREU
      if(TABLES.santsMemories.citaLBLaudes !== '-')
        this.LAUDES.vers = TABLES.santsMemories.citaLBLaudes;
      else if(TABLES.OficisComuns !== null) this.LAUDES.vers = TABLES.OficisComuns.citaLBLaudes;
      if(TABLES.santsMemories.lecturaBreuLaudes !== '-')
        this.LAUDES.lecturaBreu = TABLES.santsMemories.lecturaBreuLaudes;
      else if(TABLES.OficisComuns !== null) this.LAUDES.lecturaBreu = TABLES.OficisComuns.lecturaBreuLaudes;
      //ML LAUDES -> RESPONSORI BREU
      this.LAUDES.calAntEspecial = false;
      if(TABLES.santsMemories.respBreuLaudes1 !== '-')
        this.LAUDES.respBreu1 = TABLES.santsMemories.respBreuLaudes1;
      else if(TABLES.OficisComuns !== null) this.LAUDES.respBreu1 = TABLES.OficisComuns.respBreuLaudes1;
      if(TABLES.santsMemories.respBreuLaudes2 !== '-')
        this.LAUDES.respBreu2 = TABLES.santsMemories.respBreuLaudes2;
      else if(TABLES.OficisComuns !== null) this.LAUDES.respBreu2 = TABLES.OficisComuns.respBreuLaudes2;
      if(TABLES.santsMemories.respBreuLaudes3 !== '-')
        this.LAUDES.respBreu3 = TABLES.santsMemories.respBreuLaudes3;
      else if(TABLES.OficisComuns !== null) this.LAUDES.respBreu3 = TABLES.OficisComuns.respBreuLaudes3;
      //ML LAUDES -> CANTIC
      if(TABLES.santsMemories.antZacaries !== '-')
        this.LAUDES.antCantic = TABLES.santsMemories.antZacaries;
      else if(TABLES.OficisComuns !== null) this.LAUDES.antCantic = TABLES.OficisComuns.antZacaries;
      //ML LAUDES -> PREGÀRIES
      if(TABLES.santsMemories.pregariesLaudes !== '-')
        this.LAUDES.pregaries = TABLES.santsMemories.pregariesLaudes;
      else if(TABLES.OficisComuns !== null) this.LAUDES.pregaries = TABLES.OficisComuns.pregariesLaudes;
      //ML LAUDES -> ORACIÓ
      if(TABLES.santsMemories.oraFi !== '-')
        this.LAUDES.oracio = TABLES.santsMemories.oraFi;


      //:::::::TÈRCIA:::::::
      //ML TÈRCIA -> HIMNE
      if(TABLES.santsMemories.HimneMenorLlat !== '-'){
        if(llati) this.TERCIA.himne = TABLES.santsMemories.HimneMenorLlat;
        else this.TERCIA.himne = TABLES.santsMemories.HimneMenorCat;
      }
      //ML TÈRCIA -> SALMÒDIA
      //ML TÈRCIA -> ant
      this.TERCIA.antifones = false;
      if(TABLES.santsMemories.antMenorTer !== '-')
        this.TERCIA.ant = TABLES.santsMemories.antMenorTer;
      else if(TABLES.OficisComuns !== null) this.TERCIA.ant = TABLES.OficisComuns.antMenorTer;
      this.TERCIA.titol1 = TABLES.santsMemories.titol1Menor;
      this.TERCIA.com1 = ".";
      this.TERCIA.salm1 = TABLES.santsMemories.salm1Menor;
      this.TERCIA.gloria1 = TABLES.santsMemories.gloria1Menor;
      this.TERCIA.titol2 = TABLES.santsMemories.titol2Menor;
      this.TERCIA.com2 = ".";
      this.TERCIA.salm2 = TABLES.santsMemories.salm2Menor;
      this.TERCIA.gloria2 = TABLES.santsMemories.gloria2Menor;
      this.TERCIA.titol3 = TABLES.santsMemories.titol3Menor;
      this.TERCIA.com3 = ".";
      this.TERCIA.salm3 = TABLES.santsMemories.salm3Menor;
      this.TERCIA.gloria3 = TABLES.santsMemories.gloria3Menor;
      //ML TÈRCIA -> LECTURA BREU
      if(TABLES.santsMemories.citaLBTercia !== '-')
        this.TERCIA.vers = TABLES.santsMemories.citaLBTercia;
      else if(TABLES.OficisComuns !== null) this.TERCIA.vers = TABLES.OficisComuns.citaLBTercia;
      if(TABLES.santsMemories.lecturaBreuTercia !== '-')
        this.TERCIA.lecturaBreu = TABLES.santsMemories.lecturaBreuTercia;
      else if(TABLES.OficisComuns !== null) this.TERCIA.lecturaBreu = TABLES.OficisComuns.lecturaBreuTercia;
      //ML TÈRCIA -> RESPONSORI
      if(TABLES.santsMemories.respVTercia !== '-')
        this.TERCIA.respV = TABLES.santsMemories.respVTercia;
      else if(TABLES.OficisComuns !== null) this.TERCIA.respV = TABLES.OficisComuns.respVTercia;
      if(TABLES.santsMemories.respRTercia !== '-')
        this.TERCIA.respR = TABLES.santsMemories.respRTercia;
      else if(TABLES.OficisComuns !== null) this.TERCIA.respR = TABLES.OficisComuns.respRTercia;
      //ML TÈRCIA -> ORACIÓ
      this.TERCIA.oracio = TABLES.santsMemories.OracioTercia;


      //:::::::SEXTA:::::::
      //ML SEXTA -> HIMNE
      if(TABLES.santsMemories.HimneMenorLlat !== '-'){
        if(llati) this.SEXTA.himne = TABLES.santsMemories.HimneMenorLlat;
        else this.SEXTA.himne = TABLES.santsMemories.HimneMenorCat;
      }
      //ML SEXTA -> SALMÒDIA
      //ML SEXTA -> s1
      this.SEXTA.antifones = false;
      if(TABLES.santsMemories.antMenorSextA !== '-')
        this.SEXTA.ant = TABLES.santsMemories.antMenorSextA;
      else if(TABLES.OficisComuns !== null) this.SEXTA.ant = TABLES.OficisComuns.antMenorSextA;
      this.SEXTA.titol1 = TABLES.santsMemories.titol1Menor;
      this.SEXTA.com1 = ".";
      this.SEXTA.salm1 = TABLES.santsMemories.salm1Menor;
      this.SEXTA.gloria1 = TABLES.santsMemories.gloria1Menor;
      this.SEXTA.titol2 = TABLES.santsMemories.titol2Menor;
      this.SEXTA.com2 = ".";
      this.SEXTA.salm2 = TABLES.santsMemories.salm2Menor;
      this.SEXTA.gloria2 = TABLES.santsMemories.gloria2Menor;
      this.SEXTA.titol3 = TABLES.santsMemories.titol3Menor;
      this.SEXTA.com3 = ".";
      this.SEXTA.salm3 = TABLES.santsMemories.salm3Menor;
      this.SEXTA.gloria3 = TABLES.santsMemories.gloria3Menor;
      //ML SEXTA -> LECTURA BREU
      if(TABLES.santsMemories.citaLBSexta !== '-')
        this.SEXTA.vers = TABLES.santsMemories.citaLBSexta;
      else if(TABLES.OficisComuns !== null) this.SEXTA.vers = TABLES.OficisComuns.citaLBSexta;
      if(TABLES.santsMemories.lecturaBreuSexta !== '-')
        this.SEXTA.lecturaBreu = TABLES.santsMemories.lecturaBreuSexta;
      else if(TABLES.OficisComuns !== null) this.SEXTA.lecturaBreu = TABLES.OficisComuns.lecturaBreuSexta;
      //ML SEXTA -> RESPONSORI
      if(TABLES.santsMemories.respVSexta !== '-')
        this.SEXTA.respV = TABLES.santsMemories.respVSexta;
      else if(TABLES.OficisComuns !== null) this.SEXTA.respV = TABLES.OficisComuns.respVSexta;
      if(TABLES.santsMemories.respRSexta !== '-')
        this.SEXTA.respR = TABLES.santsMemories.respRSexta;
      else if(TABLES.OficisComuns !== null) this.SEXTA.respR = TABLES.OficisComuns.respRSexta;
      //ML SEXTA -> ORACIÓ
      this.SEXTA.oracio = TABLES.santsMemories.OracioSexta;


      //:::::::NONA:::::::
      //ML NONA -> HIMNE
      if(TABLES.santsMemories.HimneMenorLlat !== '-'){
        if(llati) this.NONA.himne = TABLES.santsMemories.HimneMenorLlat;
        else this.NONA.himne = TABLES.santsMemories.HimneMenorCat;
      }
      //ML NONA -> SALMÒDIA
      //ML NONA -> s1
      this.NONA.antifones = false;
      if(TABLES.santsMemories.antMenorNona !== '-')
        this.NONA.ant = TABLES.santsMemories.antMenorNona;
      else if(TABLES.OficisComuns !== null) this.NONA.ant = TABLES.OficisComuns.antMenorNona;
      this.NONA.titol1 = TABLES.santsMemories.titol1Menor;
      this.NONA.com1 = ".";
      this.NONA.salm1 = TABLES.santsMemories.salm1Menor;
      this.NONA.gloria1 = TABLES.santsMemories.gloria1Menor;
      this.NONA.titol2 = TABLES.santsMemories.titol2Menor;
      this.NONA.com2 = ".";
      this.NONA.salm2 = TABLES.santsMemories.salm2Menor;
      this.NONA.gloria2 = TABLES.santsMemories.gloria2Menor;
      this.NONA.titol3 = TABLES.santsMemories.titol3Menor;
      this.NONA.com3 = ".";
      this.NONA.salm3 = TABLES.santsMemories.salm3Menor;
      this.NONA.gloria3 = TABLES.santsMemories.gloria3Menor;
      //ML NONA -> LECTURA BREU
      if(TABLES.santsMemories.citaLBNona !== '-')
        this.NONA.vers = TABLES.santsMemories.citaLBNona;
      else if(TABLES.OficisComuns !== null) this.NONA.vers = TABLES.OficisComuns.citaLBNona;
      if(TABLES.santsMemories.lecturaBreuNona !== '-')
        this.NONA.lecturaBreu = TABLES.santsMemories.lecturaBreuNona;
      else if(TABLES.OficisComuns !== null) this.NONA.lecturaBreu = TABLES.OficisComuns.lecturaBreuNona;
      //ML NONA -> RESPONSORI BREU
      if(TABLES.santsMemories.respVNona !== '-')
        this.NONA.respV = TABLES.santsMemories.respVNona;
      else if(TABLES.OficisComuns !== null) this.NONA.respV = TABLES.OficisComuns.respVNona;
      if(TABLES.santsMemories.respRNona !== '-')
        this.NONA.respR = TABLES.santsMemories.respRNona;
      else if(TABLES.OficisComuns !== null) this.NONA.respR = TABLES.OficisComuns.respRSexta;
      //ML NONA -> ORACIÓ
      this.NONA.oracio = TABLES.santsMemories.OracioNona;


      //:::::::ML-VESPRES:::::::
      //ML-VESPRES -> HIMNE
      if(TABLES.santsMemories.himneVespresLlati !== '-'){
        if(llati) this.VESPRES.himne = TABLES.santsMemories.himneVespresLlati;
        else this.VESPRES.himne = TABLES.santsMemories.himneVespresCat;
      }
      else if(TABLES.OficisComuns !== null){
        if(llati) this.VESPRES.himne = TABLES.OficisComuns.himneVespresLlati;
        else this.VESPRES.himne = TABLES.OficisComuns.himneVespresCat;
      }
      //ML-VESPRES -> SALMÒDIA
      //S1
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
      //S2
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
      //s3
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
      //ML-VESPRES -> LECTURA BREU
      if(TABLES.santsMemories.citaLBVespres !== '-')
        this.VESPRES.vers = TABLES.santsMemories.citaLBVespres;
      else if(TABLES.OficisComuns !== null) this.VESPRES.vers = TABLES.OficisComuns.citaLBVespres;
      if(TABLES.santsMemories.lecturaBreuVespres !== '-')
        this.VESPRES.lecturaBreu = TABLES.santsMemories.lecturaBreuVespres;
      else if(TABLES.OficisComuns !== null) this.VESPRES.lecturaBreu = TABLES.OficisComuns.lecturaBreuVespres;
      //ML-VESPRES -> RESPONSORI
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
      //ML-VESPRES -> CÀNTIC
      if(TABLES.santsMemories.antMaria !== '-')
        this.VESPRES.antCantic = TABLES.santsMemories.antMaria;
      else if(TABLES.OficisComuns !== null) this.VESPRES.antCantic = TABLES.OficisComuns.antMaria;
      //ML-VESPRES -> PREGÀRIES
      if(TABLES.santsMemories.pregariesVespres2 !== '-')
        this.VESPRES.pregaries = TABLES.santsMemories.pregariesVespres;
      else if(TABLES.OficisComuns !== null) this.VESPRES.pregaries = TABLES.OficisComuns.pregariesVespres;
      //ML-VESPRES -> ORACIÓ
      this.VESPRES.oracio = TABLES.santsMemories.oraFi;
      break;
    }
  }
}

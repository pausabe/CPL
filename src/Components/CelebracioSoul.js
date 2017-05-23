import GLOBAL from '../Globals/Globals';

export default class CelebracioSoul {
  constructor(props, TABLES, HS, SOUL) {
    this.TABLES = TABLES;

    this.makePrayer(props.date, props.liturgicProps, TABLES, HS, SOUL);
  }

  makePrayer(date, liturgicProps, TABLES, HS, SOUL){

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

    var idTempsSolemnitatsFestes = this.findTempsSolemnitatsFestes(date);

    if(idTempsSolemnitatsFestes !== -1){
      switch (celType) {
        case "-":
          return null;
          break;
        case "S":
        case "F":

          break;
        case "M":
        case "L":

          break;
        case "V":

          break;

      }
    }

    CEL = {
      OFICI: this.OFICI,
      LAUDES: this.LAUDES,
      TERCIA: this.TERCIA,
      SEXTA: this.SEXTA,
      NONA: this.NONA,
      VESPRES: this.VESPRES,
      COMPLETES: this.COMPLETES,
    }

    SOUL.setSoul(HS, "celebracio", CEL);
  }

  /*
    Return id of #tempsSolemnitatsFestes or -1 if there isnt there
  */
  findTempsSolemnitatsFestes(date){

    return -1;
  }
}

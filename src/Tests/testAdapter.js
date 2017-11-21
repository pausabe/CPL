export default class testAdapter {
  constructor(){
    // require the module
    this.RNFS = require('react-native-fs');

    // create a path you want to write to
    //this.path = this.RNFS.DocumentDirectoryPath + '/test.txt';
    this.path = '/Users/Pau/Calaix/Projectes/CPL/states/';

    this.filePart = 0;
  }

  writeState(stateArr,idt,fdt,iDt,fDt,cb,lastW){
    this.filePart++;
    var dataShow = this._transformData(stateArr);
    console.log("whatda2 "+ stateArr.length);

    console.log("Part: "+this.filePart+" - size: "+dataShow.length);

    // write the file
    var idtAux = idt.day+'_'+idt.month+'_'+idt.year;
    var fdtAux = fdt.day+'_'+fdt.month+'_'+fdt.year;
    var plusPath = "state["+idtAux+"-"+fdtAux+","+iDt+"-"+fDt+"]/";
    var name = "state["+idtAux+"-"+fdtAux+","+iDt+"-"+fDt+"]Part"+this.filePart+".txt";
    var totalPath = this.path + plusPath + name;
    this.RNFS.mkdir(this.path + plusPath)
      .then((success) => {
        this.RNFS.writeFile(totalPath, dataShow, 'utf8')
          .then((success) => {
            // console.log('FileLog. FILE WRITTEN!');
            if(lastW){
              cb("All parts saved correctly");
            }
            else{
              cb("File saved correctly. Part: "+this.filePart);
            }
          })
      })
      .catch((err) => {
        console.log('FileLog. Error: '+err.message);
        cb("File not saved... Error: "+err.message);
      });
  }

  _transformData(SA){
    //36.300 caracters per LITURGIA
    //0,0375MB per LITURGIA (un any, 365, 13,6MB)
    console.log("FileLog. SA.length: "+SA.length);
    var TD = "";
    var x;
    for(x in SA){
      console.log("FileLog. Part: "+this.filePart+". Saving the file: "+x+'/'+SA.length);
      TD += '>>>>>'+SA[x].date.day+'/'+SA[x].date.month+'/'+SA[x].date.year+' - '+SA[x].diocesi;
      TD += '\n>>>OFICI';
      TD += '\n';
      TD += '>antInvitatori: '+SA[x].LIT.ofici.antInvitatori;
      TD += '\n';
      TD += '>himne: '+SA[x].LIT.ofici.himne;
      TD += '\n';
      TD += '>ant1: '+SA[x].LIT.ofici.ant1;
      TD += '\n';
      TD += '>titol1: '+SA[x].LIT.ofici.titol1;
      TD += '\n';
      TD += '>com1: '+SA[x].LIT.ofici.com1;
      TD += '\n';
      TD += '>salm1: '+SA[x].LIT.ofici.salm1;
      TD += '\n';
      TD += '>gloria1: '+SA[x].LIT.ofici.gloria1;
      TD += '\n';
      TD += '>ant2: '+SA[x].LIT.ofici.ant2;
      TD += '\n';
      TD += '>titol2: '+SA[x].LIT.ofici.titol2;
      TD += '\n';
      TD += '>com2: '+SA[x].LIT.ofici.com2;
      TD += '\n';
      TD += '>salm2: '+SA[x].LIT.ofici.salm2;
      TD += '\n';
      TD += '>gloria2: '+SA[x].LIT.ofici.gloria2;
      TD += '\n';
      TD += '>ant3: '+SA[x].LIT.ofici.ant3;
      TD += '\n';
      TD += '>titol3: '+SA[x].LIT.ofici.titol3;
      TD += '\n';
      TD += '>com3: '+SA[x].LIT.ofici.com3;
      TD += '\n';
      TD += '>salm3: '+SA[x].LIT.ofici.salm3;
      TD += '\n';
      TD += '>gloria3: '+SA[x].LIT.ofici.gloria3;
      TD += '\n';
      TD += '>respV: '+SA[x].LIT.ofici.respV;
      TD += '\n';
      TD += '>respR: '+SA[x].LIT.ofici.respR;
      TD += '\n';
      TD += '>referencia1: '+SA[x].LIT.ofici.referencia1;
      TD += '\n';
      TD += '>cita1: '+SA[x].LIT.ofici.cita1;
      TD += '\n';
      TD += '>titolLectura1: '+SA[x].LIT.ofici.titolLectura1;
      TD += '\n';
      TD += '>lectura1: '+SA[x].LIT.ofici.lectura1;
      TD += '\n';
      TD += '>citaResp1: '+SA[x].LIT.ofici.citaResp1;
      TD += '\n';
      TD += '>resp1Part1: '+SA[x].LIT.ofici.resp1Part1;
      TD += '\n';
      TD += '>resp1Part2: '+SA[x].LIT.ofici.resp1Part2;
      TD += '\n';
      TD += '>resp1Part3: '+SA[x].LIT.ofici.resp1Part3;
      TD += '\n';
      TD += '>referencia2: '+SA[x].LIT.ofici.referencia2;
      TD += '\n';
      TD += '>cita2: '+SA[x].LIT.ofici.cita2;
      TD += '\n';
      TD += '>titolLectura2: '+SA[x].LIT.ofici.titolLectura2;
      TD += '\n';
      TD += '>lectura2: '+SA[x].LIT.ofici.lectura2;
      TD += '\n';
      TD += '>versResp2: '+SA[x].LIT.ofici.versResp2;
      TD += '\n';
      TD += '>resp2Part1: '+SA[x].LIT.ofici.resp2Part1;
      TD += '\n';
      TD += '>resp2Part2: '+SA[x].LIT.ofici.resp2Part2;
      TD += '\n';
      TD += '>resp2Part3: '+SA[x].LIT.ofici.resp2Part3;
      TD += '\n';
      TD += '>himneOhDeuBool: '+SA[x].LIT.ofici.himneOhDeuBool;
      TD += '\n';
      TD += '>oracio: '+SA[x].LIT.ofici.oracio;
      TD += '\n--------------------';
      TD += '\n>>>LAUDES';
      TD += '\n';
      TD += '>himne: '+SA[x].LIT.laudes.himne;
      TD += '\n';
      TD += '>ant1: '+SA[x].LIT.laudes.ant1;
      TD += '\n';
      TD += '>titol1: '+SA[x].LIT.laudes.titol1;
      TD += '\n';
      TD += '>com1: '+SA[x].LIT.laudes.com1;
      TD += '\n';
      TD += '>salm1: '+SA[x].LIT.laudes.salm1;
      TD += '\n';
      TD += '>gloria1: '+SA[x].LIT.laudes.gloria1;
      TD += '\n';
      TD += '>ant2: '+SA[x].LIT.laudes.ant2;
      TD += '\n';
      TD += '>titol2: '+SA[x].LIT.laudes.titol2;
      TD += '\n';
      TD += '>com2: '+SA[x].LIT.laudes.com2;
      TD += '\n';
      TD += '>salm2: '+SA[x].LIT.laudes.salm2;
      TD += '\n';
      TD += '>gloria2: '+SA[x].LIT.laudes.gloria2;
      TD += '\n';
      TD += '>ant3: '+SA[x].LIT.laudes.ant3;
      TD += '\n';
      TD += '>titol3: '+SA[x].LIT.laudes.titol3;
      TD += '\n';
      TD += '>com3: '+SA[x].LIT.laudes.com3;
      TD += '\n';
      TD += '>salm3: '+SA[x].LIT.laudes.salm3;
      TD += '\n';
      TD += '>gloria3: '+SA[x].LIT.laudes.gloria3;
      TD += '\n';
      TD += '>vers: '+SA[x].LIT.laudes.vers;
      TD += '\n';
      TD += '>lecturaBreu: '+SA[x].LIT.laudes.lecturaBreu;
      TD += '\n';
      TD += '>calAntEspecial: '+SA[x].LIT.laudes.calAntEspecial;
      TD += '\n';
      TD += '>antEspecialLaudes: '+SA[x].LIT.laudes.antEspecialLaudes;
      TD += '\n';
      TD += '>respBreu1: '+SA[x].LIT.laudes.respBreu1;
      TD += '\n';
      TD += '>respBreu2: '+SA[x].LIT.laudes.respBreu2;
      TD += '\n';
      TD += '>respBreu3: '+SA[x].LIT.laudes.respBreu3;
      TD += '\n';
      TD += '>antCantic: '+SA[x].LIT.laudes.antCantic;
      TD += '\n';
      TD += '>pregaries: '+SA[x].LIT.laudes.pregaries;
      TD += '\n';
      TD += '>oracio: '+SA[x].LIT.laudes.oracio;
      TD += '\n--------------------';
      TD += '\n>>>TERCIA';
      TD += '\n';
      TD += '>himne: '+SA[x].LIT.tercia.himne;
      TD += '\n';
      TD += '>antifones: '+SA[x].LIT.tercia.antifones;
      TD += '\n';
      TD += '>ant: '+SA[x].LIT.tercia.ant;
      TD += '\n';
      TD += '>ant1: '+SA[x].LIT.tercia.ant1;
      TD += '\n';
      TD += '>titol1: '+SA[x].LIT.tercia.titol1;
      TD += '\n';
      TD += '>com1: '+SA[x].LIT.tercia.com1;
      TD += '\n';
      TD += '>salm1: '+SA[x].LIT.tercia.salm1;
      TD += '\n';
      TD += '>gloria1: '+SA[x].LIT.tercia.gloria1;
      TD += '\n';
      TD += '>ant2: '+SA[x].LIT.tercia.ant2;
      TD += '\n';
      TD += '>titol2: '+SA[x].LIT.tercia.titol2;
      TD += '\n';
      TD += '>com2: '+SA[x].LIT.tercia.com2;
      TD += '\n';
      TD += '>salm2: '+SA[x].LIT.tercia.salm2;
      TD += '\n';
      TD += '>gloria2: '+SA[x].LIT.tercia.gloria2;
      TD += '\n';
      TD += '>ant3: '+SA[x].LIT.tercia.ant3;
      TD += '\n';
      TD += '>titol3: '+SA[x].LIT.tercia.titol3;
      TD += '\n';
      TD += '>com3: '+SA[x].LIT.tercia.com3;
      TD += '\n';
      TD += '>salm3: '+SA[x].LIT.tercia.salm3;
      TD += '\n';
      TD += '>gloria3: '+SA[x].LIT.tercia.gloria3;
      TD += '\n';
      TD += '>vers: '+SA[x].LIT.tercia.vers;
      TD += '\n';
      TD += '>lecturaBreu: '+SA[x].LIT.tercia.lecturaBreu;
      TD += '\n';
      TD += '>respV: '+SA[x].LIT.tercia.respV;
      TD += '\n';
      TD += '>respR: '+SA[x].LIT.tercia.respR;
      TD += '\n';
      TD += '>oracio: '+SA[x].LIT.tercia.oracio;
      TD += '\n--------------------';
      TD += '\n>>>SEXTA';
      TD += '\n';
      TD += '>himne: '+SA[x].LIT.sexta.himne;
      TD += '\n';
      TD += '>antifones: '+SA[x].LIT.sexta.antifones;
      TD += '\n';
      TD += '>ant: '+SA[x].LIT.sexta.ant;
      TD += '\n';
      TD += '>ant1: '+SA[x].LIT.sexta.ant1;
      TD += '\n';
      TD += '>titol1: '+SA[x].LIT.sexta.titol1;
      TD += '\n';
      TD += '>com1: '+SA[x].LIT.sexta.com1;
      TD += '\n';
      TD += '>salm1: '+SA[x].LIT.sexta.salm1;
      TD += '\n';
      TD += '>gloria1: '+SA[x].LIT.sexta.gloria1;
      TD += '\n';
      TD += '>ant2: '+SA[x].LIT.sexta.ant2;
      TD += '\n';
      TD += '>titol2: '+SA[x].LIT.sexta.titol2;
      TD += '\n';
      TD += '>com2: '+SA[x].LIT.sexta.com2;
      TD += '\n';
      TD += '>salm2: '+SA[x].LIT.sexta.salm2;
      TD += '\n';
      TD += '>gloria2: '+SA[x].LIT.sexta.gloria2;
      TD += '\n';
      TD += '>ant3: '+SA[x].LIT.sexta.ant3;
      TD += '\n';
      TD += '>titol3: '+SA[x].LIT.sexta.titol3;
      TD += '\n';
      TD += '>com3: '+SA[x].LIT.sexta.com3;
      TD += '\n';
      TD += '>salm3: '+SA[x].LIT.sexta.salm3;
      TD += '\n';
      TD += '>gloria3: '+SA[x].LIT.sexta.gloria3;
      TD += '\n';
      TD += '>vers: '+SA[x].LIT.sexta.vers;
      TD += '\n';
      TD += '>lecturaBreu: '+SA[x].LIT.sexta.lecturaBreu;
      TD += '\n';
      TD += '>respV: '+SA[x].LIT.sexta.respV;
      TD += '\n';
      TD += '>respR: '+SA[x].LIT.sexta.respR;
      TD += '\n';
      TD += '>oracio: '+SA[x].LIT.sexta.oracio;
      TD += '\n--------------------';
      TD += '\n>>>NONA';
      TD += '\n';
      TD += '>himne: '+SA[x].LIT.nona.himne;
      TD += '\n';
      TD += '>antifones: '+SA[x].LIT.nona.antifones;
      TD += '\n';
      TD += '>ant: '+SA[x].LIT.nona.ant;
      TD += '\n';
      TD += '>ant1: '+SA[x].LIT.nona.ant1;
      TD += '\n';
      TD += '>titol1: '+SA[x].LIT.nona.titol1;
      TD += '\n';
      TD += '>com1: '+SA[x].LIT.nona.com1;
      TD += '\n';
      TD += '>salm1: '+SA[x].LIT.nona.salm1;
      TD += '\n';
      TD += '>gloria1: '+SA[x].LIT.nona.gloria1;
      TD += '\n';
      TD += '>ant2: '+SA[x].LIT.nona.ant2;
      TD += '\n';
      TD += '>titol2: '+SA[x].LIT.nona.titol2;
      TD += '\n';
      TD += '>com2: '+SA[x].LIT.nona.com2;
      TD += '\n';
      TD += '>salm2: '+SA[x].LIT.nona.salm2;
      TD += '\n';
      TD += '>gloria2: '+SA[x].LIT.nona.gloria2;
      TD += '\n';
      TD += '>ant3: '+SA[x].LIT.nona.ant3;
      TD += '\n';
      TD += '>titol3: '+SA[x].LIT.nona.titol3;
      TD += '\n';
      TD += '>com3: '+SA[x].LIT.nona.com3;
      TD += '\n';
      TD += '>salm3: '+SA[x].LIT.nona.salm3;
      TD += '\n';
      TD += '>gloria3: '+SA[x].LIT.nona.gloria3;
      TD += '\n';
      TD += '>vers: '+SA[x].LIT.nona.vers;
      TD += '\n';
      TD += '>lecturaBreu: '+SA[x].LIT.nona.lecturaBreu;
      TD += '\n';
      TD += '>respV: '+SA[x].LIT.nona.respV;
      TD += '\n';
      TD += '>respR: '+SA[x].LIT.nona.respR;
      TD += '\n';
      TD += '>oracio: '+SA[x].LIT.nona.oracio;
      TD += '\n--------------------';
      TD += '\n>>>VESPRES';
      TD += '\n';
      TD += '>himne: '+SA[x].LIT.vespres.himne;
      TD += '\n';
      TD += '>ant1: '+SA[x].LIT.vespres.ant1;
      TD += '\n';
      TD += '>titol1: '+SA[x].LIT.vespres.titol1;
      TD += '\n';
      TD += '>com1: '+SA[x].LIT.vespres.com1;
      TD += '\n';
      TD += '>salm1: '+SA[x].LIT.vespres.salm1;
      TD += '\n';
      TD += '>gloria1: '+SA[x].LIT.vespres.gloria1;
      TD += '\n';
      TD += '>ant2: '+SA[x].LIT.vespres.ant2;
      TD += '\n';
      TD += '>titol2: '+SA[x].LIT.vespres.titol2;
      TD += '\n';
      TD += '>com2: '+SA[x].LIT.vespres.com2;
      TD += '\n';
      TD += '>salm2: '+SA[x].LIT.vespres.salm2;
      TD += '\n';
      TD += '>gloria2: '+SA[x].LIT.vespres.gloria2;
      TD += '\n';
      TD += '>ant3: '+SA[x].LIT.vespres.ant3;
      TD += '\n';
      TD += '>titol3: '+SA[x].LIT.vespres.titol3;
      TD += '\n';
      TD += '>com3: '+SA[x].LIT.vespres.com3;
      TD += '\n';
      TD += '>salm3: '+SA[x].LIT.vespres.salm3;
      TD += '\n';
      TD += '>gloria3: '+SA[x].LIT.vespres.gloria3;
      TD += '\n';
      TD += '>vers: '+SA[x].LIT.vespres.vers;
      TD += '\n';
      TD += '>lecturaBreu: '+SA[x].LIT.vespres.lecturaBreu;
      TD += '\n';
      TD += '>calAntEspecial: '+SA[x].LIT.vespres.calAntEspecial;
      TD += '\n';
      TD += '>antEspecialVespres: '+SA[x].LIT.vespres.antEspecialVespres;
      TD += '\n';
      TD += '>respBreu1: '+SA[x].LIT.vespres.respBreu1;
      TD += '\n';
      TD += '>respBreu2: '+SA[x].LIT.vespres.respBreu2;
      TD += '\n';
      TD += '>respBreu3: '+SA[x].LIT.vespres.respBreu3;
      TD += '\n';
      TD += '>antCantic: '+SA[x].LIT.vespres.antCantic;
      TD += '\n';
      TD += '>pregaries: '+SA[x].LIT.vespres.pregaries;
      TD += '\n';
      TD += '>oracio: '+SA[x].LIT.vespres.oracio;
      TD += '\n--------------------';
      TD += '\n>>>COMPLETES';
      TD += '\n';
      TD += '>himne: '+SA[x].LIT.vespres.himne;
      TD += '\n';
      TD += '>antifones: '+SA[x].LIT.vespres.antifones;
      TD += '\n';
      TD += '>ant1: '+SA[x].LIT.vespres.ant1;
      TD += '\n';
      TD += '>titol1: '+SA[x].LIT.vespres.titol1;
      TD += '\n';
      TD += '>com1: '+SA[x].LIT.vespres.com1;
      TD += '\n';
      TD += '>salm1: '+SA[x].LIT.vespres.salm1;
      TD += '\n';
      TD += '>gloria1: '+SA[x].LIT.vespres.gloria1;
      TD += '\n';
      TD += '>ant2: '+SA[x].LIT.vespres.ant2;
      TD += '\n';
      TD += '>titol2: '+SA[x].LIT.vespres.titol2;
      TD += '\n';
      TD += '>com2: '+SA[x].LIT.vespres.com2;
      TD += '\n';
      TD += '>salm2: '+SA[x].LIT.vespres.salm2;
      TD += '\n';
      TD += '>gloria2: '+SA[x].LIT.vespres.gloria2;
      TD += '\n';
      TD += '>vers: '+SA[x].LIT.vespres.vers;
      TD += '\n';
      TD += '>lecturaBreu: '+SA[x].LIT.vespres.lecturaBreu;
      TD += '\n';
      TD += '>antRespEspecial: '+SA[x].LIT.vespres.antRespEspecial;
      TD += '\n';
      TD += '>respBreu1: '+SA[x].LIT.vespres.respBreu1;
      TD += '\n';
      TD += '>respBreu2: '+SA[x].LIT.vespres.respBreu2;
      TD += '\n';
      TD += '>respBreu3: '+SA[x].LIT.vespres.respBreu3;
      TD += '\n';
      TD += '>antCantic: '+SA[x].LIT.vespres.antCantic;
      TD += '\n';
      TD += '>oracio: '+SA[x].LIT.vespres.oracio;
      TD += '\n::---------------------------------------------------::\n';
    }
    console.log("FileLog. TD.length: " + TD.length);
    return TD;
  }
}

/*writeState(SA,idt,fdt,iDt,fDt,cb){
  //36.300 caracters per LITURGIA
  //0,0375MB per LITURGIA (un any, 365, 13,6MB)
  var TD = "";
  var x;
  var i = 0;
  var iMAX = 100;//3500;
  var iFilePart = 1;
  var iMaxFilePart = Math.ceil(SA.length/iMAX);
  for(x=0;x<SA.length;x++){
    console.log("FileLog. "+x+'/'+SA.length);
    TD += this._textLIT(SA,x);
    i++;
    if(i===iMAX||x==SA.length-1){
      console.log("FileLog. Part "+iFilePart+"/"+iMaxFilePart);
      // write the file
      var idtAux = idt.day+'_'+idt.month+'_'+idt.year;
      var fdtAux = fdt.day+'_'+fdt.month+'_'+fdt.year;
      var name = "state["+idtAux+"-"+fdtAux+","+iDt+"-"+fDt+"]part"+iFilePart+".txt";
      var totalPath = this.path+name;
      this.RNFS.writeFile(totalPath, TD, 'utf8')
        .then((success) => {
          if(iFilePart===iMaxFilePart){
            cb("All parts saved correctly");
          }
        })
        .catch((err) => {
          console.log('FileLog. Error: '+err.message);
          cb("File part ("+iFilePart+"/"+iMaxFilePart+") not saved... Error: "+err.message);
        });

      //reset variables
      i=0;
      iFilePart++;
      TD = "";
    }
  }
}

_textLIT(SA,x){
  var TD="";
  TD += '>>>>>'+SA[x].date.day+'/'+SA[x].date.month+'/'+SA[x].date.year+' - '+SA[x].diocesi;
  TD += '\n>>>OFICI';
  TD += '\n';
  TD += '>antInvitatori: '+SA[x].LIT.ofici.antInvitatori;
  TD += '\n';
  TD += '>himne: '+SA[x].LIT.ofici.himne;
  TD += '\n';
  TD += '>ant1: '+SA[x].LIT.ofici.ant1;
  TD += '\n';
  TD += '>titol1: '+SA[x].LIT.ofici.titol1;
  TD += '\n';
  TD += '>com1: '+SA[x].LIT.ofici.com1;
  TD += '\n';
  TD += '>salm1: '+SA[x].LIT.ofici.salm1;
  TD += '\n';
  TD += '>gloria1: '+SA[x].LIT.ofici.gloria1;
  TD += '\n';
  TD += '>ant2: '+SA[x].LIT.ofici.ant2;
  TD += '\n';
  TD += '>titol2: '+SA[x].LIT.ofici.titol2;
  TD += '\n';
  TD += '>com2: '+SA[x].LIT.ofici.com2;
  TD += '\n';
  TD += '>salm2: '+SA[x].LIT.ofici.salm2;
  TD += '\n';
  TD += '>gloria2: '+SA[x].LIT.ofici.gloria2;
  TD += '\n';
  TD += '>ant3: '+SA[x].LIT.ofici.ant3;
  TD += '\n';
  TD += '>titol3: '+SA[x].LIT.ofici.titol3;
  TD += '\n';
  TD += '>com3: '+SA[x].LIT.ofici.com3;
  TD += '\n';
  TD += '>salm3: '+SA[x].LIT.ofici.salm3;
  TD += '\n';
  TD += '>gloria3: '+SA[x].LIT.ofici.gloria3;
  TD += '\n';
  TD += '>respV: '+SA[x].LIT.ofici.respV;
  TD += '\n';
  TD += '>respR: '+SA[x].LIT.ofici.respR;
  TD += '\n';
  TD += '>referencia1: '+SA[x].LIT.ofici.referencia1;
  TD += '\n';
  TD += '>cita1: '+SA[x].LIT.ofici.cita1;
  TD += '\n';
  TD += '>titolLectura1: '+SA[x].LIT.ofici.titolLectura1;
  TD += '\n';
  TD += '>lectura1: '+SA[x].LIT.ofici.lectura1;
  TD += '\n';
  TD += '>citaResp1: '+SA[x].LIT.ofici.citaResp1;
  TD += '\n';
  TD += '>resp1Part1: '+SA[x].LIT.ofici.resp1Part1;
  TD += '\n';
  TD += '>resp1Part2: '+SA[x].LIT.ofici.resp1Part2;
  TD += '\n';
  TD += '>resp1Part3: '+SA[x].LIT.ofici.resp1Part3;
  TD += '\n';
  TD += '>referencia2: '+SA[x].LIT.ofici.referencia2;
  TD += '\n';
  TD += '>cita2: '+SA[x].LIT.ofici.cita2;
  TD += '\n';
  TD += '>titolLectura2: '+SA[x].LIT.ofici.titolLectura2;
  TD += '\n';
  TD += '>lectura2: '+SA[x].LIT.ofici.lectura2;
  TD += '\n';
  TD += '>versResp2: '+SA[x].LIT.ofici.versResp2;
  TD += '\n';
  TD += '>resp2Part1: '+SA[x].LIT.ofici.resp2Part1;
  TD += '\n';
  TD += '>resp2Part2: '+SA[x].LIT.ofici.resp2Part2;
  TD += '\n';
  TD += '>resp2Part3: '+SA[x].LIT.ofici.resp2Part3;
  TD += '\n';
  TD += '>himneOhDeuBool: '+SA[x].LIT.ofici.himneOhDeuBool;
  TD += '\n';
  TD += '>oracio: '+SA[x].LIT.ofici.oracio;
  TD += '\n--------------------';
  TD += '\n>>>LAUDES';
  TD += '\n';
  TD += '>himne: '+SA[x].LIT.laudes.himne;
  TD += '\n';
  TD += '>ant1: '+SA[x].LIT.laudes.ant1;
  TD += '\n';
  TD += '>titol1: '+SA[x].LIT.laudes.titol1;
  TD += '\n';
  TD += '>com1: '+SA[x].LIT.laudes.com1;
  TD += '\n';
  TD += '>salm1: '+SA[x].LIT.laudes.salm1;
  TD += '\n';
  TD += '>gloria1: '+SA[x].LIT.laudes.gloria1;
  TD += '\n';
  TD += '>ant2: '+SA[x].LIT.laudes.ant2;
  TD += '\n';
  TD += '>titol2: '+SA[x].LIT.laudes.titol2;
  TD += '\n';
  TD += '>com2: '+SA[x].LIT.laudes.com2;
  TD += '\n';
  TD += '>salm2: '+SA[x].LIT.laudes.salm2;
  TD += '\n';
  TD += '>gloria2: '+SA[x].LIT.laudes.gloria2;
  TD += '\n';
  TD += '>ant3: '+SA[x].LIT.laudes.ant3;
  TD += '\n';
  TD += '>titol3: '+SA[x].LIT.laudes.titol3;
  TD += '\n';
  TD += '>com3: '+SA[x].LIT.laudes.com3;
  TD += '\n';
  TD += '>salm3: '+SA[x].LIT.laudes.salm3;
  TD += '\n';
  TD += '>gloria3: '+SA[x].LIT.laudes.gloria3;
  TD += '\n';
  TD += '>vers: '+SA[x].LIT.laudes.vers;
  TD += '\n';
  TD += '>lecturaBreu: '+SA[x].LIT.laudes.lecturaBreu;
  TD += '\n';
  TD += '>calAntEspecial: '+SA[x].LIT.laudes.calAntEspecial;
  TD += '\n';
  TD += '>antEspecialLaudes: '+SA[x].LIT.laudes.antEspecialLaudes;
  TD += '\n';
  TD += '>respBreu1: '+SA[x].LIT.laudes.respBreu1;
  TD += '\n';
  TD += '>respBreu2: '+SA[x].LIT.laudes.respBreu2;
  TD += '\n';
  TD += '>respBreu3: '+SA[x].LIT.laudes.respBreu3;
  TD += '\n';
  TD += '>antCantic: '+SA[x].LIT.laudes.antCantic;
  TD += '\n';
  TD += '>pregaries: '+SA[x].LIT.laudes.pregaries;
  TD += '\n';
  TD += '>oracio: '+SA[x].LIT.laudes.oracio;
  TD += '\n--------------------';
  TD += '\n>>>TERCIA';
  TD += '\n';
  TD += '>himne: '+SA[x].LIT.tercia.himne;
  TD += '\n';
  TD += '>antifones: '+SA[x].LIT.tercia.antifones;
  TD += '\n';
  TD += '>ant: '+SA[x].LIT.tercia.ant;
  TD += '\n';
  TD += '>ant1: '+SA[x].LIT.tercia.ant1;
  TD += '\n';
  TD += '>titol1: '+SA[x].LIT.tercia.titol1;
  TD += '\n';
  TD += '>com1: '+SA[x].LIT.tercia.com1;
  TD += '\n';
  TD += '>salm1: '+SA[x].LIT.tercia.salm1;
  TD += '\n';
  TD += '>gloria1: '+SA[x].LIT.tercia.gloria1;
  TD += '\n';
  TD += '>ant2: '+SA[x].LIT.tercia.ant2;
  TD += '\n';
  TD += '>titol2: '+SA[x].LIT.tercia.titol2;
  TD += '\n';
  TD += '>com2: '+SA[x].LIT.tercia.com2;
  TD += '\n';
  TD += '>salm2: '+SA[x].LIT.tercia.salm2;
  TD += '\n';
  TD += '>gloria2: '+SA[x].LIT.tercia.gloria2;
  TD += '\n';
  TD += '>ant3: '+SA[x].LIT.tercia.ant3;
  TD += '\n';
  TD += '>titol3: '+SA[x].LIT.tercia.titol3;
  TD += '\n';
  TD += '>com3: '+SA[x].LIT.tercia.com3;
  TD += '\n';
  TD += '>salm3: '+SA[x].LIT.tercia.salm3;
  TD += '\n';
  TD += '>gloria3: '+SA[x].LIT.tercia.gloria3;
  TD += '\n';
  TD += '>vers: '+SA[x].LIT.tercia.vers;
  TD += '\n';
  TD += '>lecturaBreu: '+SA[x].LIT.tercia.lecturaBreu;
  TD += '\n';
  TD += '>respV: '+SA[x].LIT.tercia.respV;
  TD += '\n';
  TD += '>respR: '+SA[x].LIT.tercia.respR;
  TD += '\n';
  TD += '>oracio: '+SA[x].LIT.tercia.oracio;
  TD += '\n--------------------';
  TD += '\n>>>SEXTA';
  TD += '\n';
  TD += '>himne: '+SA[x].LIT.sexta.himne;
  TD += '\n';
  TD += '>antifones: '+SA[x].LIT.sexta.antifones;
  TD += '\n';
  TD += '>ant: '+SA[x].LIT.sexta.ant;
  TD += '\n';
  TD += '>ant1: '+SA[x].LIT.sexta.ant1;
  TD += '\n';
  TD += '>titol1: '+SA[x].LIT.sexta.titol1;
  TD += '\n';
  TD += '>com1: '+SA[x].LIT.sexta.com1;
  TD += '\n';
  TD += '>salm1: '+SA[x].LIT.sexta.salm1;
  TD += '\n';
  TD += '>gloria1: '+SA[x].LIT.sexta.gloria1;
  TD += '\n';
  TD += '>ant2: '+SA[x].LIT.sexta.ant2;
  TD += '\n';
  TD += '>titol2: '+SA[x].LIT.sexta.titol2;
  TD += '\n';
  TD += '>com2: '+SA[x].LIT.sexta.com2;
  TD += '\n';
  TD += '>salm2: '+SA[x].LIT.sexta.salm2;
  TD += '\n';
  TD += '>gloria2: '+SA[x].LIT.sexta.gloria2;
  TD += '\n';
  TD += '>ant3: '+SA[x].LIT.sexta.ant3;
  TD += '\n';
  TD += '>titol3: '+SA[x].LIT.sexta.titol3;
  TD += '\n';
  TD += '>com3: '+SA[x].LIT.sexta.com3;
  TD += '\n';
  TD += '>salm3: '+SA[x].LIT.sexta.salm3;
  TD += '\n';
  TD += '>gloria3: '+SA[x].LIT.sexta.gloria3;
  TD += '\n';
  TD += '>vers: '+SA[x].LIT.sexta.vers;
  TD += '\n';
  TD += '>lecturaBreu: '+SA[x].LIT.sexta.lecturaBreu;
  TD += '\n';
  TD += '>respV: '+SA[x].LIT.sexta.respV;
  TD += '\n';
  TD += '>respR: '+SA[x].LIT.sexta.respR;
  TD += '\n';
  TD += '>oracio: '+SA[x].LIT.sexta.oracio;
  TD += '\n--------------------';
  TD += '\n>>>NONA';
  TD += '\n';
  TD += '>himne: '+SA[x].LIT.nona.himne;
  TD += '\n';
  TD += '>antifones: '+SA[x].LIT.nona.antifones;
  TD += '\n';
  TD += '>ant: '+SA[x].LIT.nona.ant;
  TD += '\n';
  TD += '>ant1: '+SA[x].LIT.nona.ant1;
  TD += '\n';
  TD += '>titol1: '+SA[x].LIT.nona.titol1;
  TD += '\n';
  TD += '>com1: '+SA[x].LIT.nona.com1;
  TD += '\n';
  TD += '>salm1: '+SA[x].LIT.nona.salm1;
  TD += '\n';
  TD += '>gloria1: '+SA[x].LIT.nona.gloria1;
  TD += '\n';
  TD += '>ant2: '+SA[x].LIT.nona.ant2;
  TD += '\n';
  TD += '>titol2: '+SA[x].LIT.nona.titol2;
  TD += '\n';
  TD += '>com2: '+SA[x].LIT.nona.com2;
  TD += '\n';
  TD += '>salm2: '+SA[x].LIT.nona.salm2;
  TD += '\n';
  TD += '>gloria2: '+SA[x].LIT.nona.gloria2;
  TD += '\n';
  TD += '>ant3: '+SA[x].LIT.nona.ant3;
  TD += '\n';
  TD += '>titol3: '+SA[x].LIT.nona.titol3;
  TD += '\n';
  TD += '>com3: '+SA[x].LIT.nona.com3;
  TD += '\n';
  TD += '>salm3: '+SA[x].LIT.nona.salm3;
  TD += '\n';
  TD += '>gloria3: '+SA[x].LIT.nona.gloria3;
  TD += '\n';
  TD += '>vers: '+SA[x].LIT.nona.vers;
  TD += '\n';
  TD += '>lecturaBreu: '+SA[x].LIT.nona.lecturaBreu;
  TD += '\n';
  TD += '>respV: '+SA[x].LIT.nona.respV;
  TD += '\n';
  TD += '>respR: '+SA[x].LIT.nona.respR;
  TD += '\n';
  TD += '>oracio: '+SA[x].LIT.nona.oracio;
  TD += '\n--------------------';
  TD += '\n>>>VESPRES';
  TD += '\n';
  TD += '>himne: '+SA[x].LIT.vespres.himne;
  TD += '\n';
  TD += '>ant1: '+SA[x].LIT.vespres.ant1;
  TD += '\n';
  TD += '>titol1: '+SA[x].LIT.vespres.titol1;
  TD += '\n';
  TD += '>com1: '+SA[x].LIT.vespres.com1;
  TD += '\n';
  TD += '>salm1: '+SA[x].LIT.vespres.salm1;
  TD += '\n';
  TD += '>gloria1: '+SA[x].LIT.vespres.gloria1;
  TD += '\n';
  TD += '>ant2: '+SA[x].LIT.vespres.ant2;
  TD += '\n';
  TD += '>titol2: '+SA[x].LIT.vespres.titol2;
  TD += '\n';
  TD += '>com2: '+SA[x].LIT.vespres.com2;
  TD += '\n';
  TD += '>salm2: '+SA[x].LIT.vespres.salm2;
  TD += '\n';
  TD += '>gloria2: '+SA[x].LIT.vespres.gloria2;
  TD += '\n';
  TD += '>ant3: '+SA[x].LIT.vespres.ant3;
  TD += '\n';
  TD += '>titol3: '+SA[x].LIT.vespres.titol3;
  TD += '\n';
  TD += '>com3: '+SA[x].LIT.vespres.com3;
  TD += '\n';
  TD += '>salm3: '+SA[x].LIT.vespres.salm3;
  TD += '\n';
  TD += '>gloria3: '+SA[x].LIT.vespres.gloria3;
  TD += '\n';
  TD += '>vers: '+SA[x].LIT.vespres.vers;
  TD += '\n';
  TD += '>lecturaBreu: '+SA[x].LIT.vespres.lecturaBreu;
  TD += '\n';
  TD += '>calAntEspecial: '+SA[x].LIT.vespres.calAntEspecial;
  TD += '\n';
  TD += '>antEspecialVespres: '+SA[x].LIT.vespres.antEspecialVespres;
  TD += '\n';
  TD += '>respBreu1: '+SA[x].LIT.vespres.respBreu1;
  TD += '\n';
  TD += '>respBreu2: '+SA[x].LIT.vespres.respBreu2;
  TD += '\n';
  TD += '>respBreu3: '+SA[x].LIT.vespres.respBreu3;
  TD += '\n';
  TD += '>antCantic: '+SA[x].LIT.vespres.antCantic;
  TD += '\n';
  TD += '>pregaries: '+SA[x].LIT.vespres.pregaries;
  TD += '\n';
  TD += '>oracio: '+SA[x].LIT.vespres.oracio;
  TD += '\n--------------------';
  TD += '\n>>>COMPLETES';
  TD += '\n';
  TD += '>himne: '+SA[x].LIT.vespres.himne;
  TD += '\n';
  TD += '>antifones: '+SA[x].LIT.vespres.antifones;
  TD += '\n';
  TD += '>ant1: '+SA[x].LIT.vespres.ant1;
  TD += '\n';
  TD += '>titol1: '+SA[x].LIT.vespres.titol1;
  TD += '\n';
  TD += '>com1: '+SA[x].LIT.vespres.com1;
  TD += '\n';
  TD += '>salm1: '+SA[x].LIT.vespres.salm1;
  TD += '\n';
  TD += '>gloria1: '+SA[x].LIT.vespres.gloria1;
  TD += '\n';
  TD += '>ant2: '+SA[x].LIT.vespres.ant2;
  TD += '\n';
  TD += '>titol2: '+SA[x].LIT.vespres.titol2;
  TD += '\n';
  TD += '>com2: '+SA[x].LIT.vespres.com2;
  TD += '\n';
  TD += '>salm2: '+SA[x].LIT.vespres.salm2;
  TD += '\n';
  TD += '>gloria2: '+SA[x].LIT.vespres.gloria2;
  TD += '\n';
  TD += '>vers: '+SA[x].LIT.vespres.vers;
  TD += '\n';
  TD += '>lecturaBreu: '+SA[x].LIT.vespres.lecturaBreu;
  TD += '\n';
  TD += '>antRespEspecial: '+SA[x].LIT.vespres.antRespEspecial;
  TD += '\n';
  TD += '>respBreu1: '+SA[x].LIT.vespres.respBreu1;
  TD += '\n';
  TD += '>respBreu2: '+SA[x].LIT.vespres.respBreu2;
  TD += '\n';
  TD += '>respBreu3: '+SA[x].LIT.vespres.respBreu3;
  TD += '\n';
  TD += '>antCantic: '+SA[x].LIT.vespres.antCantic;
  TD += '\n';
  TD += '>oracio: '+SA[x].LIT.vespres.oracio;
  TD += '\n::---------------------------------------------------::\n';
  return TD;
}
}
*/

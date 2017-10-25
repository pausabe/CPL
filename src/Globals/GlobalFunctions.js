import GLOBAL from './Globals';

module.exports = {
  nextLloc(index){
    switch (index) {
      case 0:
      case 3:
      case 6:
      case 9:
      case 12:
      case 15:
      case 18:
      case 21:
      case 24:
      case 27:
      case 30:
        return 'Diòcesi';
        break;
      case 1:
      case 4:
      case 7:
      case 10:
      case 13:
      case 16:
      case 19:
      case 22:
      case 25:
      case 28:
        return 'Ciutat';
        break;
      case 2:
      case 5:
      case 8:
      case 11:
      case 14:
      case 17:
      case 20:
      case 23:
      case 26:
      case 29:
        return 'Catedral';
        break;
      }
  },

  passDayTest(diocesiNameTest, day){
    if((diocesiNameTest==='Solsona' || diocesiNameTest==='Urgell' || diocesiNameTest==='Tortosa') && (day.getDate()===28 || day.getDate()===29) && day.getMonth()===4 && (day.getFullYear()===2017 || day.getFullYear()===2018))
      return true;
    return false;
  },

  nextDiocesi(index){
    switch (index) {
      case 0:
        return 'BaD';
        break;
      case 1:
        return 'BaV';
        break;
      case 2:
        return 'BaC';
        break;
      case 3:
        return 'GiD';
        break;
      case 4:
        return 'GiV';
        break;
      case 5:
        return 'GiC';
        break;
      case 6:
        return 'LlD';
        break;
      case 7:
        return 'LlV';
        break;
      case 8:
        return 'LlC';
        break;
      case 9:
        return 'SFD';
        break;
      case 10:
        return 'SFV';
        break;
      case 11:
        return 'SFC';
        break;
      case 12:
        return 'SoD';
        break;
      case 13:
        return 'SoV';
        break;
      case 14:
        return 'SoC';
        break;
      case 15:
        return 'TaD';
        break;
      case 16:
        return 'TaV';
        break;
      case 17:
        return 'TaC';
        break;
      case 18:
        return 'TeD';
        break;
      case 19:
        return 'TeV';
        break;
      case 20:
        return 'TeC';
        break;
      case 21:
        return 'ToD';
        break;
      case 22:
        return 'ToV';
        break;
      case 23:
        return 'ToC';
        break;
      case 24:
        return 'UrD';
        break;
      case 25:
        return 'UrV';
        break;
      case 26:
        return 'UrC';
        break;
      case 27:
        return 'ViD';
        break;
      case 28:
        return 'ViV';
        break;
      case 29:
        return 'ViC';
        break;
      case 30:
        return 'Andorra';
        break;
      }
  },

  nextDiocesiName(index){
    switch (index) {
      case 0:
      case 1:
      case 2:
        return 'Barcelona';
        break;
      case 3:
      case 4:
      case 5:
        return 'Girona';
        break;
      case 6:
      case 7:
      case 8:
        return 'Lleida';
        break;
      case 9:
      case 10:
      case 11:
        return 'Sant Feliu de Llobregat';
        break;
      case 12:
      case 13:
      case 14:
        return 'Solsona';
        break;
      case 15:
      case 16:
      case 17:
        return 'Tarragona';
        break;
      case 18:
      case 19:
      case 20:
        return 'Terrassa';
        break;
      case 21:
      case 22:
      case 23:
        return 'Tortosa';
        break;
      case 24:
      case 25:
      case 26:
        return 'Urgell';
        break;
      case 27:
      case 28:
      case 29:
        return 'Vic';
        break;
      case 30:
        return 'Andorra';
        break;
      }
  },

  convertTextSize(value){
    switch (value) {
      case '1':
        return GLOBAL.size1;
        break;
      case '2':
        return GLOBAL.size2;
        break;
      case '3':
        return GLOBAL.size3;
        break;
      case '4':
        return GLOBAL.size4;
        break;
      case '5':
        return GLOBAL.size5;
        break;
      case '6':
        return GLOBAL.size6;
        break;
      case '7':
        return GLOBAL.size7;
        break;
      case '8':
        return GLOBAL.size8;
        break;
      case '9':
        return GLOBAL.size9;
        break;
      case '10':
        return GLOBAL.size10;
        break;
    }
  },

  canticSpace(titolCantic){
    if(titolCantic) titolCantic = titolCantic.replace("Càntic	","Càntic\n");
    return titolCantic;
  },

  rs(text){
    if(text){
      var length = text.length;
      var lastChar = text.charAt(length-1);
      if(lastChar === ' ' || lastChar === '\n') return text.slice(0,length-1);
    }
    else{
      console.log("InfoLog. rs NOT possible. Something went wrong!");
    }
    return text;
  },

  respTogether(r1,r2){
    var result = r1 + ' ' + r2;

    if(r1 && r2){
      var lastCharacter = r1.charAt(r1.length-1);
      var firstWord = r2.split(" ")[0];
      firstWord=firstWord.replace(",", '');
      firstWord=firstWord.replace(".", '');
      firstWord=firstWord.replace(":", '');
      firstWord=firstWord.replace(";", '');

      if(lastCharacter !== '.' && firstWord !== 'Senyor' && firstWord !== 'Déu'
        && firstWord !== 'Vós')
        result = r1 + ' ' + r2.charAt(0).toLowerCase() + r2.slice(1);
    }
    else{
      console.log("InfoLog. respTogether NOT possible. Something went wrong!");
    }

    return result;
  },

  completeOracio(oracio){
    if(!oracio) return "";

    var form1 = "Per nostre Senyor Jesucrist";
    var bigf1 = "Per nostre Senyor Jesucrist, el vostre Fill, que amb vós viu i regna en la unitat de l'Esperit Sant, Déu, pels segles dels segles";
    var form6 = "Vós, que viviu i regneu";
    var form2 = "Vós, que viviu i regneu pels segles dels segles";
    var bigf2 = "Vós, que viviu i regneu amb Déu Pare en la unitat de l'Esperit Sant, Déu, pels segles dels segles";
    var form3 = "Que viu i regna pels segles dels segles";
    var form4 = "Ell, que viu i regna pels segles dels segles";
    var form5 = "Ell, que amb vós viu i regna";
    var bigf4 = "Ell, que amb vós viu i regna en la unitat de l'Esperit Sant, Déu, pels segles dels segles";

    oAux = oracio;
    //console.log(oAux);
    if(oAux.search(form1) !== -1)
      return oAux.replace(form1, bigf1);
    if(oAux.search(form2) !== -1)
      return oAux.replace(form2, bigf2);
    if(oAux.search(form6) !== -1)
      return oAux.replace(form6, bigf2);
    if(oAux.search(form3) !== -1)
      return oAux.replace(form3, bigf4);
    if(oAux.search(form4) !== -1)
      return oAux.replace(form4, bigf4);
    if(oAux.search(form5) !== -1)
      return oAux.replace(form5, bigf4);

    return oracio;
  },

  getCelType(diocesi, anyliturgic){
    switch (diocesi) {
      default:
        celType = anyliturgic.BaD;
        break;
      case "BaD":
        celType = anyliturgic.BaD;
        break;
      case "BaV":
        celType = anyliturgic.BaV;
        break;
      case "BaC":
        celType = anyliturgic.BaC;
        break;
      case "GiD":
        celType = anyliturgic.GiD;
        break;
      case "GiV":
        celType = anyliturgic.GiV;
        break;
      case "GiC":
        celType = anyliturgic.GiC;
        break;
      case "LlD":
        celType = anyliturgic.LlD;
        break;
      case "LlV":
        celType = anyliturgic.LlV;
        break;
      case "LlC":
        celType = anyliturgic.LlC;
        break;
      case "SFD":
        celType = anyliturgic.SFD;
        break;
      case "SFV":
        celType = anyliturgic.SFV;
        break;
      case "SFC":
        celType = anyliturgic.SFC;
        break;
      case "SoD":
        celType = anyliturgic.SoD;
        break;
      case "SoV":
        celType = anyliturgic.SoV;
        break;
      case "SoC":
        celType = anyliturgic.SoC;
        break;
      case "TaD":
        celType = anyliturgic.TaD;
        break;
      case "TaV":
        celType = anyliturgic.TaV;
        break;
      case "TaC":
        celType = anyliturgic.TaC;
        break;
      case "TeD":
        celType = anyliturgic.TeD;
        break;
      case "TeV":
        celType = anyliturgic.TeV;
        break;
      case "TeC":
        celType = anyliturgic.TeC;
        break;
      case "ToD":
        celType = anyliturgic.ToD;
        break;
      case "ToV":
        celType = anyliturgic.ToV;
        break;
      case "ToC":
        celType = anyliturgic.ToC;
        break;
      case "UrD":
        celType = anyliturgic.UrD;
        break;
      case "UrV":
        celType = anyliturgic.UrV;
        break;
      case "UrC":
        celType = anyliturgic.UrC;
        break;
      case "ViD":
        celType = anyliturgic.ViD;
        break;
      case "ViV":
        celType = anyliturgic.ViV;
        break;
      case "ViC":
        celType = anyliturgic.ViC;
        break;
      case "Andorra":
        celType = anyliturgic.Andorra;
        break;
    }

    return(celType);
  },

  transformDiocesiName(diocesi, lloc){
    switch (diocesi) {
      case "Barcelona":
        switch (lloc) {
          case "Diòcesi":
            return 'BaD';
            break;
          case "Catedral":
            return 'BaC';
            break
          case "Ciutat":
            return 'BaV';
            break;
        }
        break;
      case "Girona":
        switch (lloc) {
          case "Diòcesi":
            return 'GiD';
            break;
          case "Catedral":
            return 'GiC';
            break
          case "Ciutat":
            return 'GiV';
            break;
        }
        break;
      case "Lleida":
        switch (lloc) {
          case "Diòcesi":
            return 'LlD';
            break;
          case "Catedral":
            return 'LlC';
            break
          case "Ciutat":
            return 'LlV';
            break;
        }
        break;
      case "Sant Feliu de Llobregat":
        switch (lloc) {
          case "Diòcesi":
            return 'SFD';
            break;
          case "Catedral":
            return 'SFC';
            break
          case "Ciutat":
            return 'SFV';
            break;
        }
        break;
      case "Solsona":
        switch (lloc) {
          case "Diòcesi":
            return 'SoD';
            break;
          case "Catedral":
            return 'SoC';
            break
          case "Ciutat":
            return 'SoV';
            break;
        }
        break;
      case "Tarragona":
        switch (lloc) {
          case "Diòcesi":
            return 'TaD';
            break;
          case "Catedral":
            return 'TaC';
            break
          case "Ciutat":
            return 'TaV';
            break;
        }
        break;
      case "Terrassa":
        switch (lloc) {
          case "Diòcesi":
            return 'TeD';
            break;
          case "Catedral":
            return 'TeC';
            break
          case "Ciutat":
            return 'TeV';
            break;
        }
        break;
      case "Tortosa":
        switch (lloc) {
          case "Diòcesi":
            return 'ToD';
            break;
          case "Catedral":
            return 'ToC';
            break
          case "Ciutat":
            return 'ToV';
            break;
        }
        break;
      case "Urgell":
        switch (lloc) {
          case "Diòcesi":
            return 'UrD';
            break;
          case "Catedral":
            return 'UrC';
            break
          case "Ciutat":
            return 'UrV';
            break;
        }
        break;
      case "Vic":
        switch (lloc) {
          case "Diòcesi":
            return 'ViD';
            break;
          case "Catedral":
            return 'ViC';
            break
          case "Ciutat":
            return 'ViV';
            break;
        }
        break;
      case "Andorra":
        return 'Andorra';
        break;
    }

    return('BaD');
  },
};

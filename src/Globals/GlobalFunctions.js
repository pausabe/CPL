import GLOBAL from './Globals';

module.exports = {
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
      console.log("rs NOT possible. Something went wrong!");
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
      console.log("respTogether NOT possible. Something went wrong!");
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
};

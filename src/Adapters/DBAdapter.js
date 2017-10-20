import {Platform} from 'react-native';
import GLOBAL from '../Globals/Globals';

export default class DBAdapter {
  constructor(){
    this.SQLite = require('react-native-sqlite-storage');
  }

  executeQuery(query, callback){
    let createFrom;
    if (Platform.OS == "ios") { createFrom = "1"; } //ios platform
    else { createFrom = `~${GLOBAL.DBName}`} //android platform

    let db = this.SQLite.openDatabase(
       {name : GLOBAL.DBName, readOnly: true, createFromLocation : createFrom},
       this.openCB,
       this.errorCB);

    db.transaction((tx) => {
      tx.executeSql(query, [], (tx, results) => {
        callback(results);
        });
    });
  }

  getLiturgia(table, id, callback){
    if(id !== -1){
      //if(table === 'tempsAdventSetmanesDium') console.log(`tempsAdventSetmanesDium---> SELECT * FROM ${table} WHERE id = ${id}`);
      this.executeQuery(`SELECT * FROM ${table} WHERE id = ${id}`,
        result => callback(result.rows.item(0)));
    }
    else{
      this.executeQuery(`SELECT * FROM ${table}`,
        result => callback(result.rows));
    }
  }

  getAnyLiturgic(year, month, day, callback){
    //console.log(day+'/'+(month+1)+'/'+year+' - '+day2+'/'+(month2+1)+'/'+year2);
    //console.log("year: " + year + " month: " + (month+1) + " day: " + day + " / year2: " + year2 + " month2: " + (month2+1) + " day2: " + day2);
    var query = `SELECT * FROM anyliturgic WHERE any = '${year}' AND mes = '${month+1}' AND dia = '${day}'`;
    console.log("QUERY ANY: " + query);
    this.executeQuery(query,
      result => {
        console.log(">>Today: " + result.rows.item(0).dia + '/' + result.rows.item(0).mes);
        this.getTomorrow(result.rows.item(0), year, month, day, callback);
      });
  }

  getTomorrow(r1, year, month, day, callback){
    var tomorrow = new Date(year, month, day);
    tomorrow.setDate(tomorrow.getDate()+1);
    year2 = tomorrow.getFullYear();
    month2 = tomorrow.getMonth();
    day2 = tomorrow.getDate();
    //console.log(day+'/'+(month+1)+'/'+year+' - '+day2+'/'+(month2+1)+'/'+year2);
    //console.log("year: " + year + " month: " + (month+1) + " day: " + day + " / year2: " + year2 + " month2: " + (month2+1) + " day2: " + day2);
    var query = `SELECT * FROM anyliturgic WHERE any = '${year2}' AND mes = '${month2+1}' AND dia = '${day2}'`;
    //console.log("QUERY ANY: " + query);
    this.executeQuery(query,
      result => {
        console.log(">>Tomorrow: " + result.rows.item(0).dia + '/' + result.rows.item(0).mes);
        this.getPentacosta(r1, result.rows.item(0), year, callback);
      });
  }

  getPentacosta(r1, r2, year, callback){
    this.executeQuery(`SELECT * FROM anyliturgic WHERE any = '${year}' AND temps = '${GLOBAL.P_SETMANES}' AND NumSet = '8' AND DiadelaSetmana = 'Dg'`,
      result => {
        var pentacosta = new Date();
        pentacosta.setDate(result.rows.item(0).dia);
        auxMonth = result.rows.item(0).mes-1;
        pentacosta.setMonth(auxMonth);
        console.log(">>Pentacosta: " + result.rows.item(0).dia + '/' + result.rows.item(0).mes);
        callback(r1, r2, pentacosta);
      });
  }

  getSolMem(table, dia, diocesi, lloc, diocesiName, temps, callback){
    var auxDiocesiName = diocesiName;
    var auxDiocesi = diocesi;
    if(diocesi === 'Andorra' && dia !== '08-sep'){
      var auxDiocesiName = 'Urgell';
      var auxDiocesi = this.transformDiocesiName('Urgell', lloc);
    }
    var auxDiocesiQuery = `'${auxDiocesi}'`;
    if(lloc === 'Ciutat'){
      auxDiocesiQuery = `'${auxDiocesi}' OR Diocesis = '${this.transformDiocesiName(auxDiocesiName, 'Diòcesi')}' OR Diocesis = '${this.transformDiocesiName(auxDiocesiName, 'Catedral')}'`;
    }
    else if(lloc === 'Catedral'){
      auxDiocesiQuery = `'${auxDiocesi}' OR Diocesis = '${this.transformDiocesiName(auxDiocesiName, 'Diòcesi')}' OR Diocesis = '${this.transformDiocesiName(auxDiocesiName, 'Ciutat')}'`;
    }
    else if (lloc === 'Diòcesi'){
      auxDiocesiQuery = `'${auxDiocesi}' OR Diocesis = '${this.transformDiocesiName(auxDiocesiName, 'Catedral')}' OR Diocesis = '${this.transformDiocesiName(auxDiocesiName, 'Ciutat')}'`;
    }
    var query = `SELECT * FROM ${table} WHERE (Diocesis = ${auxDiocesiQuery} OR Diocesis = '-') AND dia = '${dia}' AND Temps = '${temps}'`;

    console.log("QUERY SOL_MEM: " + query);

    this.executeQuery(query,
      result => {
        console.log("SolMem Result size: " + result.rows.length);
        var index = this.findCorrect(result.rows, result.rows.length, auxDiocesi, auxDiocesiName, lloc);
        console.log("index definitive: " + index);
        callback(result.rows.item(index));
      });
  }

  findCorrect(rows, length, diocesi, diocesiName, lloc){
    //Catedral < Ciutat < Diòcesi < -
    if(length===1) return 0;
    auxDiocesiName = diocesiName;
    auxDiocesi = diocesi;
    var i = 0;
    while(i<length){
      if(rows.item(i).Diocesis === auxDiocesi) return i;
      i += 1;
    }
    if(lloc === 'Ciutat'){
      auxDiocesi = this.transformDiocesiName(auxDiocesiName, 'Diòcesi');
      i = 0;
      while(i<length){
        if(rows.item(i).Diocesis === auxDiocesi) return i;
        i += 1;
      }
    }
    if(lloc === 'Catedral'){
      auxDiocesi = this.transformDiocesiName(auxDiocesiName, 'Ciutat');
      i = 0;
      while(i<length){
        if(rows.item(i).Diocesis === auxDiocesi) return i;
        i += 1;
      }
      auxDiocesi = this.transformDiocesiName(auxDiocesiName, 'Diòcesi');
      i = 0;
      while(i<length){
        if(rows.item(i).Diocesis === auxDiocesi) return i;
        i += 1;
      }
    }
    return 0; //-
  }

  getSolMemDiesMov(table, id, callback){
    var query = `SELECT * FROM ${table} WHERE id = '${id}'`;

    console.log("QUERY SOL_MEM-Dies_Mov: " + query);

    this.executeQuery(query,
      result => callback(result.rows.item(0)));
  }

  getV(callback){
    var query = `SELECT * FROM santsMemories WHERE id = 457`;

    this.executeQuery(query,
      result => callback(result.rows.item(0)));
  }

  getOC(categoria, callback){
    var query = `SELECT * FROM OficisComuns WHERE Categoria = '${categoria}'`;
    console.log("QUERY getOC: " + query);
    console.log("oficis comuns log -1 - " + categoria);
    this.executeQuery(query,
      result => callback(result.rows.item(0), categoria));
  }

  transformDiocesiName(diocesi, lloc){
    console.log("diocesi: " + diocesi + " - " + "lloc: " + lloc);
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
  }

  errorCB(err) {
    console.log("SQL Error: " + err);
  }

  successCB() {
    console.log("SQL executed fine");
  }

  openCB() {
    console.log("Database OPENED");
  }
}
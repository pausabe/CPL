import { Platform } from 'react-native';

import GLOBAL from '../Globals/Globals';

export default class DBAdapter {
  constructor() {
    this.SQLite = require('react-native-sqlite-storage');
  }

  executeQuery(query, callback) {
    let createFrom;
    if (Platform.OS == "ios") { createFrom = "1"; } //ios platform
    else { createFrom = `~${GLOBAL.DBName}` } //android platform

    let db = this.SQLite.openDatabase(
      { name: GLOBAL.DBName, readOnly: true, createFromLocation: createFrom },
      this.openCB,
      this.errorCB);

    db.transaction((tx) => {
      tx.executeSql(query, [], (tx, results) => {
        callback(results);
      });
    });
  }

  getLiturgia(table, id, callback) {
    if (id !== -1) {
      // if(table === 'tempsNadalOctava') console.log(`tempsAdventSetmanesDium---> SELECT * FROM ${table} WHERE id = ${id}`);
      this.executeQuery(`SELECT * FROM ${table} WHERE id = ${id}`,
        result => callback(result.rows.item(0)));
    }
    else {
      this.executeQuery(`SELECT * FROM ${table}`,
        result => callback(result.rows));
    }
  }

  getAnyLiturgic(year, month, day, callback) {
    var query = `SELECT * FROM anyliturgic WHERE any = '${year}' AND mes = '${month + 1}' AND dia = '${day}'`;
    console.log("QueryLog. QUERY ANY: " + query);
    this.executeQuery(query,
      result => {
        this.getTomorrow(result.rows.item(0), year, month, day, callback);
      });
  }

  getTomorrow(r1, year, month, day, callback) {
    var tomorrow = new Date(year, month, day);
    tomorrow.setDate(tomorrow.getDate() + 1);
    year2 = tomorrow.getFullYear();
    month2 = tomorrow.getMonth();
    day2 = tomorrow.getDate();

    var query = `SELECT * FROM anyliturgic WHERE any = '${year2}' AND mes = '${month2 + 1}' AND dia = '${day2}'`;
    console.log("QUERY AnyTomorrow: " + query);
    this.executeQuery(query,
      result => {
        // console.log(">>Tomorrow: " + result.rows.item(0).dia + '/' + result.rows.item(0).mes);
        this.getPentacosta(r1, result.rows.item(0), year, callback);
      });
  }

  getPentacosta(r1, r2, year, callback) {
    var query = `SELECT * FROM anyliturgic WHERE any = '${year}' AND temps = '${GLOBAL.P_SETMANES}' AND NumSet = '8' AND DiadelaSetmana = 'Dg'`;
    console.log("QueryLog. getPentacosta: " + query);
    this.executeQuery(query,
      result => {
        var pentacosta = new Date();
        pentacosta.setDate(result.rows.item(0).dia);
        auxMonth = result.rows.item(0).mes - 1;
        pentacosta.setMonth(auxMonth);
        pentacosta.setFullYear(year);
        console.log("InfoLog. Pentacosta: " + pentacosta.getDate() + '/' + pentacosta.getMonth() + '/' + pentacosta.getFullYear());
        callback(r1, r2, pentacosta);
      });
  }

  getSolMem(table, dia, diocesi, lloc, diocesiName, temps, callback) {
    var auxDiocesiName = diocesiName;
    var auxDiocesi = diocesi;
    if (diocesi === 'Andorra' && dia !== '08-sep') {
      var auxDiocesiName = 'Urgell';
      var auxDiocesi = this.transformDiocesiName('Urgell', lloc);
    }
    var auxDiocesiQuery = `'${auxDiocesi}'`;
    if (lloc === 'Ciutat') {
      auxDiocesiQuery = `'${auxDiocesi}' OR Diocesis = '${this.transformDiocesiName(auxDiocesiName, 'Diòcesi')}' OR Diocesis = '${this.transformDiocesiName(auxDiocesiName, 'Catedral')}'`;
    }
    else if (lloc === 'Catedral') {
      auxDiocesiQuery = `'${auxDiocesi}' OR Diocesis = '${this.transformDiocesiName(auxDiocesiName, 'Diòcesi')}' OR Diocesis = '${this.transformDiocesiName(auxDiocesiName, 'Ciutat')}'`;
    }
    else if (lloc === 'Diòcesi') {
      auxDiocesiQuery = `'${auxDiocesi}' OR Diocesis = '${this.transformDiocesiName(auxDiocesiName, 'Catedral')}' OR Diocesis = '${this.transformDiocesiName(auxDiocesiName, 'Ciutat')}'`;
    }
    var query = `SELECT * FROM ${table} WHERE (Diocesis = ${auxDiocesiQuery} OR Diocesis = '-') AND dia = '${dia}' AND Temps = '${temps}'`;

    console.log("QueryLog. QUERY SOL_MEM: " + query);

    this.executeQuery(query,
      result => {
        console.log("InfoLog. SolMem Result size: " + result.rows.length);
        var index = this.findCorrect(result.rows, result.rows.length, auxDiocesi, auxDiocesiName, lloc);
        console.log("InfoLog. Index definitive: " + index);
        callback(result.rows.item(index));
      });
  }

  findCorrect(rows, length, diocesi, diocesiName, lloc) {
    //Catedral < Ciutat < Diòcesi < -
    if (length === 1) return 0;
    auxDiocesiName = diocesiName;
    auxDiocesi = diocesi;
    var i = 0;
    while (i < length) {
      if (rows.item(i).Diocesis === auxDiocesi) return i;
      i += 1;
    }
    if (lloc === 'Ciutat') {
      auxDiocesi = this.transformDiocesiName(auxDiocesiName, 'Diòcesi');
      i = 0;
      while (i < length) {
        if (rows.item(i).Diocesis === auxDiocesi) return i;
        i += 1;
      }
    }
    if (lloc === 'Catedral') {
      auxDiocesi = this.transformDiocesiName(auxDiocesiName, 'Ciutat');
      i = 0;
      while (i < length) {
        if (rows.item(i).Diocesis === auxDiocesi) return i;
        i += 1;
      }
      auxDiocesi = this.transformDiocesiName(auxDiocesiName, 'Diòcesi');
      i = 0;
      while (i < length) {
        if (rows.item(i).Diocesis === auxDiocesi) return i;
        i += 1;
      }
    }
    return 0; //-
  }

  getSolMemDiesMov(table, id, callback) {
    var query = `SELECT * FROM ${table} WHERE id = '${id}'`;

    console.log("QueryLog. QUERY SOL_MEM-Dies_Mov: " + query);

    this.executeQuery(query,
      result => callback(result.rows.item(0)));
  }

  getV(callback) {
    var query = `SELECT * FROM santsMemories WHERE id = 457`;

    this.executeQuery(query,
      result => callback(result.rows.item(0)));
  }

  getOC(categoria, callback) {
    var query = `SELECT * FROM OficisComuns WHERE Categoria = '${categoria}'`;
    console.log("QueryLog. QUERY getOC: " + query);
    console.log("InfoLog. Oficis comuns log -1 - " + categoria);
    this.executeQuery(query,
      result => callback(result.rows.item(0), categoria));
  }

  getLDNormal(tempsEspecific, cicle, diaSetmana, setmana, parImpar, callback) {
    var query = `SELECT * FROM LDdiumenges WHERE tempsespecific = '${tempsEspecific}' AND DiadelaSetmana = '${diaSetmana}' AND NumSet = '${setmana}'`;
    console.log("QueryLog. QUERY getLDNormal: " + query);
    this.executeQuery(query,
      result => {
        console.log("InfoLog. getLDNormal Result size: " + result.rows.length);
        var index;
        if (result.rows.length > 1) {
          if (result.rows[0].cicle != '-' && result.rows[0].paroimpar == '-') {
            //1) cicle != '-' and paroimpar != '-'
            for (var i = 0; i < result.rows.length; i++) {
              if (result.rows[i].cicle == cicle) {
                index = i;
                break;
              }
            }
          }
          else if (result.rows[0].paroimpar != '-' && result.rows[0].Cicle == '-') {
            //2) cicle == '-' and paroimpar != '-'
            for (var i = 0; i < result.rows.length; i++) {
              if (result.rows[i].paroimpar == parImpar) {
                index = i;
                break;
              }
            }
          }
          else if(result.rows[0].paroimpar != '-' && result.rows[0].Cicle != '-'){
            //3) cicle != '-' and paroimpar != '-'
            for (var i = 0; i < result.rows.length; i++) {
              if (result.rows[i].cicle == cicle && result.rows[i].paroimpar == parImpar) {
                index = i;
                break;
              }
            }
          }
        }
        else if(result.rows.length == 1){
          //4) cicle == '-' and paroimpar == '-'
          index = 0;
        }

        if(index == undefined){
          console.log("[ERROR] Something went wrong! Index not found");
          index = 0;
        }

        console.log("InfoLog. Index definitive: " + index);
        callback(result.rows.item(index));
      });
  }

  transformDiocesiName(diocesi, lloc) {
    // console.log("diocesi: " + diocesi + " - " + "lloc: " + lloc);
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

    return ('BaD');
  }

  errorCB(err) {
    console.log("SqlLog. SQL Error: " + err);
  }

  successCB() {
    console.log("SqlLog. SQL executed fine");
  }

  openCB() {
    console.log("SqlLog. Database OPENED");
  }
}

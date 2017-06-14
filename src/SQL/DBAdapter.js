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
    var query = `SELECT * FROM anyliturgic WHERE any = ${year} AND mes = ${month+1} AND dia = ${day}`;
    //console.log("QUERY ANY: " + query);
    this.executeQuery(query,
      result => {
        console.log(">>Today: " + result.rows.item(0).dia + '/' + result.rows.item(0).mes);
        this.getTomorrow(result.rows.item(0), year, month, day, callback);
      });
  }

  getTomorrow(r1, year, month, day, callback){
    var tomorrow = new Date(year, month, day);
    tomorrow.setDate(tomorrow.getDate()+1); //TODO: i si no existeix a la base de dades??!! (limitar el datapicker)
    year2 = tomorrow.getFullYear();
    month2 = tomorrow.getMonth();
    day2 = tomorrow.getDate();
    //console.log(day+'/'+(month+1)+'/'+year+' - '+day2+'/'+(month2+1)+'/'+year2);
    //console.log("year: " + year + " month: " + (month+1) + " day: " + day + " / year2: " + year2 + " month2: " + (month2+1) + " day2: " + day2);
    var query = `SELECT * FROM anyliturgic WHERE any = ${year2} AND mes = ${month2+1} AND dia = ${day2}`;
    //console.log("QUERY ANY: " + query);
    this.executeQuery(query,
      result => {
        console.log(">>Tomorrow: " + result.rows.item(0).dia + '/' + result.rows.item(0).mes);
        this.getPentacosta(r1, result.rows.item(0), year, callback);
      });
  }

  getPentacosta(r1, r2, year, callback){
    this.executeQuery(`SELECT * FROM anyliturgic WHERE any = ${year} AND temps = '${GLOBAL.P_SETMANES}' AND NumSet = 8 AND DiadelaSetmana = 'Dg'`,
      result => {
        var pentacosta = new Date();
        pentacosta.setDate(result.rows.item(0).dia);
        auxMonth = result.rows.item(0).mes-1;
        pentacosta.setMonth(auxMonth);
        console.log(">>Pentacosta: " + result.rows.item(0).dia + '/' + result.rows.item(0).mes);
        callback(r1, r2, pentacosta);
      });
  }

  getSolMem(table, dia, diocesi, temps, callback){

    var query = `SELECT * FROM ${table} WHERE (Diocesis = '${diocesi}' OR Diocesis = '-') AND dia = '${dia}' AND Temps = '${temps}'`;

    console.log("QUERY SOL_MEM: " + query);

    this.executeQuery(query,
      result => {
        console.log("SolMem Result size: " + result.rows.length);
        var index = this.findCorrect(result.rows, result.rows.length, diocesi);
        console.log("index definitive: " + index);
        callback(result.rows.item(index));
      });
  }

  findCorrect(rows, length, diocesi){
      if(length===1) return 0;
      var i = 0;
      while(i<length){
        if(rows.item(i).Diocesis === diocesi) return i;
        i += 1;
      }
      return 0;
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
    this.executeQuery(query,
      result => callback(result.rows.item(0)));
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

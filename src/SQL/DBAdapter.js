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
      if(table === 'tempsAdventSetmanesDium') console.log(`tempsAdventSetmanesDium---> SELECT * FROM ${table} WHERE id = ${id}`);
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

  getSolMem(table, date, diocesi, callback){
    dia = this.calculeDia(date);

    var query = `SELECT * FROM ${table} WHERE (Diocesis = '${diocesi}' OR Diocesis = '-') AND dia = '${dia}'`;

    console.log("QUERY SOL_MEM: " + query);

    this.executeQuery(query,
      result => callback(result.rows.item(0)));
  }

  getV(callback){
    var query = `SELECT * FROM santsMemories WHERE id = 457`;

    this.executeQuery(query,
      result => callback(result.rows.item(0)));
  }

  getOC(categoria, callback){
    this.executeQuery(`SELECT * FROM OficisComuns WHERE Categoria = '${categoria}'`,
      result => callback(result.rows.item(0)));
  }

  calculeDia(date){
    switch (date.getMonth()) {
      case 0:
        mes = "ene";
        break;
      case 1:
        mes = "feb";
        break;
      case 2:
        mes = "mar";
        break;
      case 3:
        mes = "abr";
        break;
      case 4:
        mes = "may";
        break;
      case 5:
        mes = "jun";
        break;
      case 6:
        mes = "jul";
        break;
      case 7:
        mes = "ago";
        break;
      case 8:
        mes = "sep";
        break;
      case 9:
        mes = "oct";
        break;
      case 10:
        mes = "nov";
        break;
      case 11:
        mes = "dic";
        break;
    }
    if(date.getDate() < 10)
      dia = `0${date.getDate()}`;
    else dia = date.getDate();

    console.log("Dia: " + dia + "-" + mes);
    return dia + "-" + mes;
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

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
    this.executeQuery(`SELECT * FROM ${table} WHERE id = ${id}`,
      result => callback(result.rows.item(0)));
  }

  getAnyLiturgic(year, month, day, callback){
    var today = new Date(year, month-1, day);
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate()+1);
    year2 = tomorrow.getFullYear();
    month2 = tomorrow.getMonth();
    day2 = tomorrow.getDate();
    this.executeQuery(`SELECT * FROM anyliturgic WHERE any = ${year} AND mes = ${month} AND dia = ${day} OR any = ${year2} AND mes = ${month2} AND dia = ${day2} ORDER BY any, mes, dia ASC`,
      result => callback(result.rows.item(0), result.rows.item(1)));
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

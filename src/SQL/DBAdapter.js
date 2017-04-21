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
        callback(results.rows.item(0));
        });
    });
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

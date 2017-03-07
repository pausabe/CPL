import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';

let SQLite = require('react-native-sqlite-storage')

export default class TextVGdb extends Component {
  constructor(props) {
    super(props)

    this.state = {
      record: "empty"
    }

     let nameDB = "vgDB.db";
     let createFrom;
     if (Platform.OS == "ios") { createFrom = "1"; } //ios platform
     else { createFrom = `~${nameDB}`} //android platform

     //console.log(`name DB:  ${nameDB}`);
     //console.log(`DB from:  ${createFrom}`);

     let db = SQLite.openDatabase(
       {name : nameDB, readOnly: true, createFromLocation : createFrom},
      this.openCB,
      this.errorCB);


    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM pvoc', [], (tx, results) => {
        console.log("Query completed");

        //console.log(`SIIIIIIIIII: ${results.rows.item(0).name}`);

        this.setState({record: results.rows.item(0).pregaria});

          /*var len = results.rows.length;
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            console.log(`Record: ${row.name}`);
            this.setState({record: row});
          }*/

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

  render() {
    return (
      <View>
        <Text style={styles.redColor}>Divendres 24</Text>
        <Text style={styles.blackColor}>
          {this.state.record !== null ?
            this.state.record
            :
            'Hi ha hagut un error. Fes una pregàraria si-us-plau'
          }
      </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  blackColor: {
    textAlign: 'center',
    color: '#000000'
  },
  redColor: {
    textAlign: 'center',
    color: '#FF0000'
  }
});

AppRegistry.registerComponent('TextVGdb', () => TextVGdb);

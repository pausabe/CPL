import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';

let SQLite = require('react-native-sqlite-storage')

/*
  O-ordinari
  Q-cendra
  Q-setmanes
  Q-setSanta
  Q-tridu
  Q-diumPasqua
  P-abans
  P-octava
  P-despres
  P-setmanes
  A-setmanes
  A-feries
  N-octava
  N-abans
*/


export default class Ofici extends Component {
  constructor(props) {
    super(props)

    this.state = {
      row: ""
    }

    let nameDB = "lh_v3.db";
    let createFrom;
    if (Platform.OS == "ios") { createFrom = "1"; } //ios platform
    else { createFrom = `~${nameDB}`} //android platform

    let db = SQLite.openDatabase(
       {name : nameDB, readOnly: true, createFromLocation : createFrom},
       this.openCB,
       this.errorCB);

    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM salteriComuOfici', [], (tx, results) => {
        this.setState({row: results.rows.item(3)});
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
    const gloriaString = "Glòria al Pare i al Fill i a l'Esperit Sant. Com era al principi, ara i sempre i pels segles dels segles. Amén.";
    return (
      <View>
        <Text style={styles.red}>V.
          <Text style={styles.black}> Obriu-me els llavis, Senyor.</Text>
        </Text>
        <Text style={styles.red}>R.
          <Text style={styles.black}> I proclamaré la vostra lloança.</Text>
        </Text>
        <Text />
        <Text style={styles.black}>{gloriaString}</Text>
        {false === true ? //TODO: tenir en compte si és o no Quaresma
          <Text style={styles.black}>Al·leluia</Text> : null
        }
        <Text />
        <Text style={styles.red}>HIMNE</Text>
        <Text />
        {true === false ? //TODO: tenir en compte els ajustaments
          <Text style={styles.black}>{this.state.row.himneNitLlati}</Text>
          :
          <Text style={styles.black}>{this.state.row.himneNitCat}</Text>
        }
        <Text style={styles.red}>SALMÒDIA</Text>
        <Text />
        <Text style={styles.red}>Ant. 1.
          <Text style={styles.black}> {this.state.row.ant1}</Text>
        </Text>
        <Text />
        <Text style={styles.red}>{this.state.row.titol1}</Text>
        <Text style={styles.blackSmallItalic}>
          {this.state.row.com1 !== '-' ?
            this.state.row.com1
            :
            ''
          }
        </Text>
        <Text style={styles.black}>{this.state.row.salm1}</Text>
        <Text />
        <Text style={styles.black}>
          {true === false ?
            "Glòria."
            :
            gloriaString
          }
        </Text>
        <Text />
        <Text style={styles.red}>Ant. 1.
          <Text style={styles.black}> {this.state.row.ant1}</Text>
        </Text>
        <Text />
        <Text style={styles.red}>Ant. 2.
          <Text style={styles.black}> {this.state.row.ant2}</Text>
        </Text>
        <Text />
        <Text style={styles.red}>{this.state.row.titol2}</Text>
        <Text style={styles.blackSmallItalic}>
          {this.state.row.com2 !== '-' ?
            this.state.row.com2
            :
            ''
          }
        </Text>
        <Text style={styles.black}>{this.state.row.salm2}</Text>
        <Text />
        <Text style={styles.black}>Glòria.</Text>
        <Text />
        <Text style={styles.red}>Ant. 2.
          <Text style={styles.black}> {this.state.row.ant2}</Text>
        </Text>
        <Text />
        <Text style={styles.red}>Ant. 3.
          <Text style={styles.black}> {this.state.row.ant3}</Text>
        </Text>
        <Text />
        <Text style={styles.red}>{this.state.row.titol3}</Text>
        <Text style={styles.blackSmallItalic}>
          {this.state.row.com3 !== '-' ?
            this.state.row.com3
            :
            ''
          }
        </Text>
        <Text style={styles.black}>{this.state.row.salm3}</Text>
        <Text />
        <Text style={styles.black}>Glòria.</Text>
        <Text />
        <Text style={styles.red}>Ant. 3.
          <Text style={styles.black}> {this.state.row.ant3}</Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  black: {
    color: '#000000',
    fontSize: 15,
  },
  blackSmallItalic:{
    color: '#000000',
    fontSize: 13,
    fontStyle: 'italic'
  },
  red: {
    color: '#FF0000',
    fontSize: 15,
  }
});

AppRegistry.registerComponent('Ofici', () => Ofici);

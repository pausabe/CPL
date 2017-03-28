import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';
import Hr from 'react-native-hr';
let SQLite = require('react-native-sqlite-storage')

/*
  O-ordinari
  Q-cendra
  Q-setmanes
  Q-diumRams
  Q-setSanta
  Q-tridu
  Q-diumPasqua
  P-octava
  P-despres
  P-setmanes
  A-setmanes
  A-feries
  N-octava
  N-abans
*/

const O_ORDINARI = 'O_ORDINARI';
const Q_CENDRA = 'Q_CENDRA';
const Q_SETMANES = 'Q_SETMANES';
const Q_DIUM_RAMS = 'Q_DIUM_RAMS';
const Q_SET_SANTA = 'Q_SET_SANTA';
const Q_TRIDU = 'Q_TRIDU';
const Q_DIUM_PASQUA = 'Q_DIUM_PASQUA';
const P_OCTAVA = 'P_OCTAVA';
const P_DESPRES = 'P_DESPRES';
const P_SETMANES = 'P_SETMANES';
const A_SETMANES = 'A_SETMANES';
const A_FERIES = 'A_FERIES';
const N_OCTAVA = 'N_OCTAVA';
const N_ABANS = 'N_ABANS';


export default class Ofici extends Component {
  constructor(props) {
    super(props)

    this.state = {
      diumenge: true, //HC
      nit: false, //HC
      salteriComuOfici: '',
      tempsOrdinariOfici: '',
      salteriComuLaudes: '',
      LT: 'O_ORDINARI', //HC
      tempsOrdinariOracions: '',
    }

    let nameDB = "lh_v3.db";
    let createFrom;
    if (Platform.OS == "ios") { createFrom = "1"; } //ios platform
    else { createFrom = `~${nameDB}`} //android platform

    let db = SQLite.openDatabase(
       {name : nameDB, readOnly: true, createFromLocation : createFrom},
       this.openCB,
       this.errorCB);

    var id = props.day;
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM salteriComuOfici WHERE id = 3', [], (tx, results) => {
        this.setState({salteriComuOfici: results.rows.item(0)});
        });
    });

    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tempsOrdinariOfici WHERE id = 3', [], (tx, results) => {
        this.setState({tempsOrdinariOfici: results.rows.item(0)});
        });
    });

    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM salteriComuLaudes WHERE id = 3', [], (tx, results) => {
        this.setState({salteriComuLaudes: results.rows.item(0)});
        });
    });

    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tempsOrdinariOracions WHERE id = 3', [], (tx, results) => {
        this.setState({tempsOrdinariOracions: results.rows.item(0)});
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
        <Text style={styles.black}>{gloriaString}
        {false === true ? //TODO: tenir en compte si és o no Quaresma
          <Text style={styles.black}> Al·leluia</Text> : null
        }
        </Text>
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>HIMNE</Text>
        <Text />
        {this.himne(this.state.LT, this.state.diumenge, this.state.nit)}
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>SALMÒDIA</Text>
        <Text />
        {this.salmodia(this.state.LT)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>VERS</Text>
        <Text />
        {this.vers(this.state.LT)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>LECTURES</Text>
        <Text />
        {this.lectures(this.state.LT)}
        {this.himneOhDeu(this.state.LT, this.state.diumenge)}
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>ORACIÓ</Text>
        <Text />
        {this.oracio(this.state.LT, this.state.diumenge)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={styles.red}>CONCLUSIÓ</Text>
        <Text />
        <Text style={styles.red}>V.
          <Text style={styles.black}> Beneïm al Senyor.</Text>
        </Text>
        <Text style={styles.red}>R.
          <Text style={styles.black}> Donem gràcies a Déu.</Text>
        </Text>
      </View>
    );
  }

  gloria(g){
    if(g === '1'){
      if(true === true){ //TODO: tenir en compte els ajustaments
        return(<Text style={styles.black}>Glòria.</Text>);
      }
      else{
        return(<Text style={styles.black}>{gloriaString}</Text>);
      }
    }
    else{
      if(g==='0'){
        return(<Text style={styles.black}>S'omet el Glòria.</Text>);
      }
    }
  }

  himne(LT, diumenge, nit){
    switch(LT){
      case O_ORDINARI:
        if(nit){
          if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
            return(<Text style={styles.black}>{this.state.salteriComuOfici.himneNitLlati}</Text>);
          }
          else{
            return(<Text style={styles.black}>{this.state.salteriComuOfici.himneNitCat}</Text>)
          }
        }
        else{//dia
          if(false){ //TODO: tenir en compte els ajustaments (llatí o català)
            return(<Text style={styles.black}>{this.state.salteriComuOfici.himneDiaLlati}</Text>);
          }
          else{
            return(<Text style={styles.black}>{this.state.salteriComuOfici.himneDiaCat}</Text>)
          }
        }
      case Q_CENDRA:
        break;
      case Q_SETMANES:
        break;
      case Q_DIUM_RAMS:
        break;
      case Q_SET_SANTA:
        break;
      case Q_TRIDU:
        break;
      case Q_DIUM_PASQUA:
        break;
      case P_OCTAVA:
        break;
      case P_DESPRES:
        break;
      case P_SETMANES:
        break;
      case A_SETMANES:
        break;
      case A_FERIES:
        break;
      case N_OCTAVA:
        break;
      case N_ABANS:
        break;
    }
  }

  salmodia(LT){
    switch(LT){
      case O_ORDINARI:
        ant1 = this.state.salteriComuOfici.ant1;
        titol1 = this.state.salteriComuOfici.titol1;
        com1 = this.state.salteriComuOfici.com1;
        salm1 = this.state.salteriComuOfici.salm1;
        gloria1 = this.state.salteriComuOfici.gloria1;
        ant2 = this.state.salteriComuOfici.ant2;
        titol2 = this.state.salteriComuOfici.titol2;
        com2 = this.state.salteriComuOfici.com2;
        salm2 = this.state.salteriComuOfici.salm2;
        gloria2 = this.state.salteriComuOfici.gloria2;
        ant3 = this.state.salteriComuOfici.ant3;
        titol3 = this.state.salteriComuOfici.titol3;
        com3 = this.state.salteriComuOfici.com3;
        salm3 = this.state.salteriComuOfici.salm3;
        gloria3 = this.state.salteriComuOfici.gloria3;
        break;
      case Q_CENDRA:
        break;
      case Q_SETMANES:
        break;
      case Q_DIUM_RAMS:
        break;
      case Q_SET_SANTA:
        break;
      case Q_TRIDU:
        break;
      case Q_DIUM_PASQUA:
        break;
      case P_OCTAVA:
        break;
      case P_DESPRES:
        break;
      case P_SETMANES:
        break;
      case A_SETMANES:
        break;
      case A_FERIES:
        break;
      case N_OCTAVA:
        break;
      case N_ABANS:
        break;
    }

    return(
      <View>
        <Text style={styles.red}>Ant. 1.
          <Text style={styles.black}> {ant1}</Text>
        </Text>
        <Text />
        <Text style={styles.redCenter}>{titol1}</Text>
        <Text style={styles.blackSmallItalicRight}>
          {com1 !== '-' ? com1 : ''}
        </Text>
        <Text style={styles.black}>{salm1}</Text>
        <Text />
        {this.gloria(gloria1)}
        <Text />
        <Text style={styles.red}>Ant. 1.
          <Text style={styles.black}> {ant1}</Text>
        </Text>
        <Text />
        <Text style={styles.red}>Ant. 2.
          <Text style={styles.black}> {ant2}</Text>
        </Text>
        <Text />
        <Text style={styles.redCenter}>{titol2}</Text>
        <Text style={styles.blackSmallItalicRight}>
          {com2 !== '-' ? com2 : ''}
        </Text>
        <Text style={styles.black}>{salm2}</Text>
        <Text />
        {this.gloria(gloria2)}
        <Text />
        <Text style={styles.red}>Ant. 2.
          <Text style={styles.black}> {ant2}</Text>
        </Text>
        <Text />
        <Text style={styles.red}>Ant. 3.
          <Text style={styles.black}> {ant3}</Text>
        </Text>
        <Text />
        <Text style={styles.redCenter}>{titol3}</Text>
        <Text style={styles.blackSmallItalicRight}>
          {com3 !== '-' ? com3 : ''}
        </Text>
        <Text style={styles.black}>{salm3}</Text>
        <Text />
        {this.gloria(gloria3)}
        <Text />
        <Text style={styles.red}>Ant. 3.
          <Text style={styles.black}> {ant3}</Text>
        </Text>
      </View>
    );
  }

  vers(LT){
    switch(LT){
      case O_ORDINARI:
        respV = this.state.salteriComuOfici.respV;
        respR = this.state.salteriComuOfici.respR;
        break;
      case Q_CENDRA:
        break;
      case Q_SETMANES:
        break;
      case Q_DIUM_RAMS:
        break;
      case Q_SET_SANTA:
        break;
      case Q_TRIDU:
        break;
      case Q_DIUM_PASQUA:
        break;
      case P_OCTAVA:
        break;
      case P_DESPRES:
        break;
      case P_SETMANES:
        break;
      case A_SETMANES:
        break;
      case A_FERIES:
        break;
      case N_OCTAVA:
        break;
      case N_ABANS:
        break;
    }
    return(
      <View>
        <Text style={styles.red}>V.
          <Text style={styles.black}> {respV}</Text>
        </Text>
        <Text style={styles.red}>R.
          <Text style={styles.black}> {respR}</Text>
        </Text>
      </View>
    );
  }

  lectures(LT){
    switch(LT){
      case O_ORDINARI:
        referencia1 = this.state.tempsOrdinariOfici.referencia1;
        cita1 = this.state.tempsOrdinariOfici.cita1;
        titol1 = this.state.tempsOrdinariOfici.titol1;
        lectura1 = this.state.tempsOrdinariOfici.lectura1;
        citaResp1 = this.state.tempsOrdinariOfici.citaResp1;
        resp1Part1 = this.state.tempsOrdinariOfici.resp1Part1;
        resp1Part2 = this.state.tempsOrdinariOfici.resp1Part2;
        resp1Part3 = this.state.tempsOrdinariOfici.resp1Part3;
        referencia2 = this.state.tempsOrdinariOfici.referencia2;
        cita2 = this.state.tempsOrdinariOfici.cita2;
        titol2 = this.state.tempsOrdinariOfici.titol2;
        lectura2 = this.state.tempsOrdinariOfici.lectura2;
        versResp2 = this.state.tempsOrdinariOfici.citaResp2;
        resp2Part1 = this.state.tempsOrdinariOfici.resp2Part1;
        resp2Part2 = this.state.tempsOrdinariOfici.resp2Part2;
        resp2Part3 = this.state.tempsOrdinariOfici.resp2Part3;
        break;
      case Q_CENDRA:
        break;
      case Q_SETMANES:
        break;
      case Q_DIUM_RAMS:
        break;
      case Q_SET_SANTA:
        break;
      case Q_TRIDU:
        break;
      case Q_DIUM_PASQUA:
        break;
      case P_OCTAVA:
        break;
      case P_DESPRES:
        break;
      case P_SETMANES:
        break;
      case A_SETMANES:
        break;
      case A_FERIES:
        break;
      case N_OCTAVA:
        break;
      case N_ABANS:
        break;
    }
    return(
      <View>
        <Text style={styles.red}>Primera lectura</Text>
        <Text style={styles.black}>{referencia1}
          <Text style={styles.red}> {cita1}</Text></Text>
        <Text />
        <Text style={styles.redCenterBold}>{titol1}</Text>
        <Text />
        <Text style={styles.black}>{lectura1}</Text>
        <Text />
        <Text style={styles.red}>Responsori
          <Text style={styles.redSmallItalicRight}> {citaResp1}</Text>
        </Text>
        <Text style={styles.red}>R.
          <Text style={styles.black}> {resp1Part1}
            <Text style={styles.red}>*</Text> {resp1Part2}</Text>
        </Text>
        <Text style={styles.red}>V.
          <Text style={styles.black}> {resp1Part3}
            <Text style={styles.red}>*</Text> {resp1Part2}</Text>
        </Text>
        <Text />
        <Text style={styles.red}>Segona lectura</Text>
        <Text style={styles.black}>{referencia2}
          <Text style={styles.red}> {cita2}</Text></Text>
        <Text />
        <Text style={styles.redCenterBold}>{titol2}</Text>
        <Text />
        <Text style={styles.black}>{lectura2}</Text>
        <Text />
        <Text style={styles.red}>Responsori
          <Text style={styles.redSmallItalicRight}>  {versResp2}</Text>
        </Text>
        <Text style={styles.red}>R.
          <Text style={styles.black}> {resp2Part1}
            <Text style={styles.red}>*</Text> {resp2Part2}</Text>
        </Text>
        <Text style={styles.red}>V.
          <Text style={styles.black}>  {resp2Part3}
            <Text style={styles.red}>*</Text> {resp2Part2}</Text>
        </Text>
      </View>
    )
  }

  himneOhDeu(LT, diumenge){
    var himne = false;
    switch(LT){
      case O_ORDINARI:
        if(diumenge) himne = true;
        break;
      case Q_CENDRA:
        break;
      case Q_SETMANES:
        break;
      case Q_DIUM_RAMS:
        break;
      case Q_SET_SANTA:
        break;
      case Q_TRIDU:
        break;
      case Q_DIUM_PASQUA:
        himne = true;
        break;
      case P_OCTAVA:
        himne = true;
        break;
      case P_DESPRES:
        break;
      case P_SETMANES:
        if(diumenge) himne = true;
        break;
      case A_SETMANES:
        if(diumenge) himne = true;
        break;
      case A_FERIES:
        break;
      case N_OCTAVA:
        break;
      case N_ABANS:
        if(diumenge) himne = true;
        break;
    }

    if(himne){
      return(
        <View>
          <Hr lineColor='#CFD8DC' />
          <Text />
          <Text style={styles.red}>HIMNE</Text>
          <Text />
          <Text style={styles.black}>Oh Déu, us lloem.</Text>
          <Text />
        </View>
      )
    }
  }

  oracio(LT, diumenge){
    switch(LT){
      case O_ORDINARI:
        if(diumenge){
          return(<Text style={styles.black}>{this.state.tempsOrdinariOracions.oracio}</Text>);
        }
        else{
          return(<Text style={styles.black}>{this.state.salteriComuLaudes.oraFi}</Text>);
        }
      case Q_CENDRA:
        break;
      case Q_SETMANES:
        break;
      case Q_DIUM_RAMS:
        break;
      case Q_SET_SANTA:
        break;
      case Q_TRIDU:
        break;
      case Q_DIUM_PASQUA:
        break;
      case P_OCTAVA:
        break;
      case P_DESPRES:
        break;
      case P_SETMANES:
        break;
      case A_DESPRES:
        break;
      case A_FERIES:
        break;
      case N_OCTAVA:
        break;
      case N_ABANS:
        break;
    }
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
  blackSmallItalicRight: {
    color: '#000000',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'right'
  },
  red: {
    color: '#FF0000',
    fontSize: 15,
  },
  redCenter: {
    color: '#FF0000',
    fontSize: 15,
    textAlign: 'center'
  },
  redCenterBold: {
    color: '#FF0000',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  redSmallItalicRight: {
    color: '#FF0000',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'right'
  }
});

AppRegistry.registerComponent('Ofici', () => Ofici);

/*    switch(LT){
      case O_ORDINARI:
        break;
      case Q_CENDRA:
        break;
      case Q_SETMANES:
        break;
      case Q_DIUM_RAMS:
        break;
      case Q_SET_SANTA:
        break;
      case Q_TRIDU:
        break;
      case Q_DIUM_PASQUA:
        break;
      case P_OCTAVA:
        break;
      case P_DESPRES:
        break;
      case P_SETMANES:
        break;
      case A_DESPRES:
        break;
      case A_FERIES:
        break;
      case N_OCTAVA:
        break;
      case N_ABANS:
        break;
    }*/

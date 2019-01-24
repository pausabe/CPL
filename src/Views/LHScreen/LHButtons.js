import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Platform
 } from 'react-native';

import HR from '../../Components/HRComponent';

export default class LHButtons extends Component {
  render() {
    var nowDate = new Date();
    var hour = nowDate.getHours();
    //console.log("Hour: " + hour);
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonContainer} onPress={this.props.oficiCB}>
         <Text style={styles.buttonText}>{"Ofici de lectura"}</Text>
       </TouchableOpacity>
        <HR/>
       <TouchableOpacity style={styles.buttonContainer} onPress={this.props.laudesCB}>
         {hour > 5 && hour < 9 ?
           <Text style={styles.buttonTextBold}>{"Laudes"}</Text>
           :
           <Text style={styles.buttonText}>{"Laudes"}</Text>
         }
       </TouchableOpacity>
       <HR/>
       <View style={{flex:1, flexDirection: 'column'}}>
         <View style={{flex:1, paddingTop: 5}}>
          <Text style={styles.buttonText}>{"Hora menor"}</Text>
         </View>
         <View style={{flex:2, flexDirection: 'row'}}>
           <TouchableOpacity style={styles.buttonContainer} onPress={this.props.terciaCB}>
             {hour > 8 && hour < 12 ?
               <Text style={styles.horaMenorTextBold}>{"Tèrcia"}</Text>
               :
               <Text style={styles.horaMenorText}>{"Tèrcia"}</Text>
             }
           </TouchableOpacity>
           <TouchableOpacity style={styles.buttonContainer} onPress={this.props.sextaCB}>
             {hour > 11 && hour < 15 ?
               <Text style={styles.horaMenorTextBold}>{"Sexta"}</Text>
               :
               <Text style={styles.horaMenorText}>{"Sexta"}</Text>
             }
           </TouchableOpacity>
           <TouchableOpacity style={styles.buttonContainer} onPress={this.props.nonaCB}>
             {hour > 14 && hour < 18 ?
               <Text style={styles.horaMenorTextBold}>{"Nona"}</Text>
               :
               <Text style={styles.horaMenorText}>{"Nona"}</Text>
             }
           </TouchableOpacity>
         </View>
       </View>
        <HR/>
       <TouchableOpacity style={styles.buttonContainer} onPress={this.props.vespresCB}>
        {hour > 17 && hour <= 23 ?
          <Text style={styles.buttonTextBold}>{"Vespres"}</Text>
          :
          <Text style={styles.buttonText}>{"Vespres"}</Text>
        }
         {this.props.ViewData.primVespres ?
          <View style={{padding: 5, paddingHorizontal: 15}}>
            {this.props.ViewData.celebracio.titolCelTom !== '-'?
              <View>
                {this.props.ViewData.celebracio.titolCelTom !== 'dium-pasqua'?
                  <Text numberOfLines={1} style={styles.redCenter}>{this.props.ViewData.celebracio.titolCelTom}</Text>
                  : null
                }
              </View>
              :
              <View>
                {this.props.variables.date.getDay()===6?
                  <Text style={styles.redCenter}>{"Primeres vespres de diumenge"}</Text>
                :
                  <Text style={styles.redCenter}>{"Primeres vespres"}</Text>
                }
              </View>
            }
          </View>
          : null }
       </TouchableOpacity>
       <HR/>
       <TouchableOpacity style={styles.buttonContainer} onPress={this.props.completesCB}>
         {hour >= 0 && hour < 2 ?
           <Text style={styles.buttonTextBold}>{"Completes"}</Text>
           :
           <Text style={styles.buttonText}>{"Completes"}</Text>
         }
       </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 10
    },
    backgroundColor: 'white',
    opacity: 0.75,
    borderRadius: 15
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 18,
    fontWeight: 'normal'
  },
  buttonTextBold: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 17,
    fontWeight: 'bold',
  },
  horaMenorText: {
    textAlign: 'center',
    color: '#595959',
    fontSize: 16,
    fontWeight: 'normal'
  },
  horaMenorTextBold: {
    textAlign: 'center',
    color: '#595959',
    fontSize: 16,
    fontWeight: 'bold'
  },
  hrstyle: {
    backgroundColor: '#263238',
    height: 4
  },
  redCenter: {
    color: '#FF0000',
    fontSize: 14,
    textAlign: 'center'
  },
})

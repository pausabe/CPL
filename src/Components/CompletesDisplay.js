import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Platform
} from 'react-native';
import Hr from 'react-native-hr';
import GLOBAL from '../Globals/Globals';

export default class CompletesDisplay extends Component {
  render() {
    COMPLETES = this.props.liturgicProps.LITURGIA.completes;
    const gloriaStringIntro = "Glòria al Pare i al Fill\ni a l’Esperit Sant.\nCom era al principi, ara i sempre\ni pels segles dels segles. Amén.";
    return (
      <View>
        <Text style={GLOBAL.styles.red}>V.
          <Text style={GLOBAL.styles.black}> Sigueu amb nosaltres, Déu nostre.</Text>
        </Text>
        <Text style={GLOBAL.styles.red}>R.
          <Text style={GLOBAL.styles.black}> Senyor, veniu a ajudar-nos.</Text>
        </Text>
        <Text />
        <Text style={GLOBAL.styles.black}>{gloriaStringIntro}
        {this.props.liturgicProps.LT !== GLOBAL.Q_CENDRA && this.props.liturgicProps.LT !== GLOBAL.Q_SETMANES
          && this.props.liturgicProps.LT !== GLOBAL.Q_DIUM_RAMS && this.props.liturgicProps.LT !== GLOBAL.Q_SET_SANTA
          && this.props.liturgicProps.LT !== GLOBAL.Q_TRIDU ?
          <Text style={GLOBAL.styles.black}> Al·leluia</Text> : null
        }
        </Text>
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.redCenter}>És lloable que aquí es faci examen de consciència, que, en la celebració comunitària, pot integrar-se en un acte penitencial com els que figuren en l'Ordre de la missa.</Text>
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>HIMNE</Text>
        <Text />
        <Text style={GLOBAL.styles.black}>{COMPLETES.himne}</Text>
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>SALMÒDIA</Text>
        <Text />
        {COMPLETES.dosSalms === "1" ?
          <View>
            {COMPLETES.antifones ?
              <Text style={GLOBAL.styles.red}>Ant. 1.
                <Text style={GLOBAL.styles.black}> {COMPLETES.ant1}</Text>
              </Text>
            :
              <Text style={GLOBAL.styles.red}>Ant.
                <Text style={GLOBAL.styles.black}> {COMPLETES.ant1}</Text>
              </Text>
            }
            <Text />
            <Text style={GLOBAL.styles.redCenter}>{COMPLETES.titol1}</Text>
            <Text />
            {COMPLETES.com1 !== '-' ?
              <View><Text style={GLOBAL.styles.blackSmallItalicRight}>{COMPLETES.com1}</Text><Text /></View> : null}
            <Text style={GLOBAL.styles.black}>{COMPLETES.salm1}</Text>
            <Text />
            {this.gloria(COMPLETES.gloria1)}
            <Text />
            {COMPLETES.antifones ?
              <View>
                <Text style={GLOBAL.styles.red}>Ant. 1.
                  <Text style={GLOBAL.styles.black}> {COMPLETES.ant1}</Text>
                </Text>
                <Text />
                <Text style={GLOBAL.styles.red}>Ant. 2.
                  <Text style={GLOBAL.styles.black}> {COMPLETES.ant2}</Text>
                </Text>
                <Text />
              </View>
            : null
            }
            <Text style={GLOBAL.styles.redCenter}>{COMPLETES.titol2}</Text>
            <Text />
            {COMPLETES.com2 !== '-' ?
              <View><Text style={GLOBAL.styles.blackSmallItalicRight}>{COMPLETES.com2}</Text><Text /></View> : null}
            <Text style={GLOBAL.styles.black}>{salm2}</Text>
            <Text />
            {this.gloria(COMPLETES.gloria2)}
            <Text />
            {COMPLETES.antifones ?
              <View>
                <Text style={GLOBAL.styles.red}>Ant. 2.
                  <Text style={GLOBAL.styles.black}> {COMPLETES.ant2}</Text>
                </Text>
              </View>
            :
              <View>
                <Text style={GLOBAL.styles.red}>Ant.
                  <Text style={GLOBAL.styles.black}> {COMPLETES.ant1}</Text>
                </Text>
              </View>
            }
          </View>
        :
          <View>
            <Text style={GLOBAL.styles.red}>Ant.
              <Text style={GLOBAL.styles.black}> {COMPLETES.ant1}</Text>
            </Text>
            <Text />
            <Text style={GLOBAL.styles.redCenter}>{COMPLETES.titol1}</Text>
            <Text />
            {COMPLETES.com1 !== '-' ?
              <View><Text style={GLOBAL.styles.blackSmallItalicRight}>{COMPLETES.com1}</Text><Text /></View> : null}
            <Text style={GLOBAL.styles.black}>{COMPLETES.salm1}</Text>
            <Text />
            {this.gloria(COMPLETES.gloria1)}
            <Text />
            <Text style={GLOBAL.styles.red}>Ant.
              <Text style={GLOBAL.styles.black}> {COMPLETES.ant1}</Text>
            </Text>
          </View>
        }
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>LECTURA BREU</Text>
        <Text />
        <Text style={GLOBAL.styles.red}>{COMPLETES.vers}</Text>
        <Text />
        <Text style={GLOBAL.styles.black}>{COMPLETES.lecturaBreu}</Text>
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>RESPONSORI BREU</Text>
        <Text />
        {COMPLETES.antRespEspecial === "-" ?
          <View>
            <Text style={GLOBAL.styles.red}>V.
              <Text style={GLOBAL.styles.black}> {COMPLETES.respBreu1} {COMPLETES.respBreu2}</Text>
            </Text>
            <Text style={GLOBAL.styles.red}>R.
              <Text style={GLOBAL.styles.black}> {COMPLETES.respBreu1} {COMPLETES.respBreu2}</Text>
            </Text>
            <Text />
            <Text style={GLOBAL.styles.red}>V.
              <Text style={GLOBAL.styles.black}> {COMPLETES.respBreu3}</Text>
            </Text>
            <Text style={GLOBAL.styles.red}>R.
              <Text style={GLOBAL.styles.black}> {COMPLETES.respBreu2}</Text>
            </Text>
            <Text />
            <Text style={GLOBAL.styles.red}>V.
              <Text style={GLOBAL.styles.black}> Glòria al Pare i al Fill i a l'Esperit Sant.</Text>
            </Text>
            <Text style={GLOBAL.styles.red}>R.
              <Text style={GLOBAL.styles.black}> {COMPLETES.respBreu1} {COMPLETES.respBreu2}</Text>
            </Text>
          </View>
        :
          <View>
            <Text style={GLOBAL.styles.red}>Ant.
              <Text style={GLOBAL.styles.black}> {COMPLETES.antRespEspecial}</Text>
            </Text>
          </View>
        }
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>CÀNTIC SIMEÓ</Text>
        <Text />
        <Text style={GLOBAL.styles.red}>Ant.
          <Text style={GLOBAL.styles.black}> {COMPLETES.antCantic}</Text>
        </Text>
        <Text />
        <Text style={GLOBAL.styles.black}>{COMPLETES.cantic}</Text>
        <Text />
        {this.gloria('1')}
        <Text />
        <Text style={GLOBAL.styles.red}>Ant.
          <Text style={GLOBAL.styles.black}> {COMPLETES.antCantic}</Text>
        </Text>
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>ORACIÓ</Text>
        <Text />
        <Text style={GLOBAL.styles.blackBold}>Preguem.</Text>
        <Text style={GLOBAL.styles.black}>{COMPLETES.oracio}</Text>
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>CONCLUSIÓ</Text>
        <Text />
        <Text style={GLOBAL.styles.red}>V.
          <Text style={GLOBAL.styles.black}> Que el Senyor totpoderós ens concedeixi una nit tranquil·la i una fi beneurada.</Text>
        </Text>
        <Text style={GLOBAL.styles.red}>R.
          <Text style={GLOBAL.styles.black}> Amén.</Text>
        </Text>
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.black}>{COMPLETES.antMare}</Text>
        <Text />
      </View>
    );
  }

  gloria(g){
    const gloriaString = "Glòria al Pare i al Fill    *\ni a l’Esperit Sant.\nCom era al principi, ara i sempre    *\ni pels segles dels segles. Amén.";
    if(g === '1'){
      if(this.props.variables.gloria === 'false'){ 
        return(<Text style={GLOBAL.styles.black}>Glòria.</Text>);
      }
      else{
        return(<Text style={GLOBAL.styles.black}>{gloriaString}</Text>);
      }
    }
    else{
      if(g==='0'){
        return(<Text style={GLOBAL.styles.black}>S'omet el Glòria.</Text>);
      }
    }
  }
}

AppRegistry.registerComponent('CompletesDisplay', () => CompletesDisplay);

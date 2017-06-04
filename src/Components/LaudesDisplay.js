import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Platform
} from 'react-native';
import Hr from 'react-native-hr';
import GLOBAL from '../Globals/Globals';

export default class LaudesDisplay extends Component {
  constructor(props){
    super(props);

    this.styles = {
      black: {
        color: '#000000',
        fontSize: this.convertTextSize(),
      },
      blackBold: {
        color: '#000000',
        fontSize: this.convertTextSize(),
        fontWeight: 'bold',
      },
      blackSmallItalic:{
        color: '#000000',
        fontSize: this.convertTextSize(),
        fontStyle: 'italic'
      },
      blackSmallItalicRight: {
        color: '#000000',
        fontSize: this.convertTextSize(),
        fontStyle: 'italic',
        textAlign: 'right'
      },
      red: {
        color: '#FF0000',
        fontSize: this.convertTextSize(),
      },
      redCenter: {
        color: '#FF0000',
        fontSize: this.convertTextSize(),
        textAlign: 'center'
      },
      redCenterBold: {
        color: '#FF0000',
        fontSize: this.convertTextSize(),
        textAlign: 'center',
        fontWeight: 'bold',
      },
      redSmallItalicRight: {
        color: '#FF0000',
        fontSize: this.convertTextSize(),
        fontStyle: 'italic',
        textAlign: 'right'
      }
    }
  }

  convertTextSize(){
    switch (this.props.variables.textSize) {
      case '1':
        return GLOBAL.size1;
        break;
      case '2':
        return GLOBAL.size2;
        break;
      case '3':
        return GLOBAL.size3;
        break;
      case '4':
        return GLOBAL.size4;
        break;
      case '5':
        return GLOBAL.size5;
        break;
    }
  }


  render() {
    LAUDES = this.props.liturgicProps.LITURGIA.laudes;
    return (
      <View>
        {this.introduccio(this.props.liturgicProps.LT, this.props.liturgicProps.setmana, LAUDES)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={this.styles.red}>HIMNE</Text>
        <Text />
        {this.himne(this.props.liturgicProps.LT, this.props.variables.date.getDay(), this.props.liturgicProps.setmana, LAUDES)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={this.styles.red}>SALMÒDIA</Text>
        <Text />
        {this.salmodia(this.props.liturgicProps.LT, this.props.liturgicProps.setmana, this.props.variables.date.getDay(), LAUDES)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={this.styles.red}>LECTURA BREU</Text>
        <Text />
        {this.lecturaBreu(this.props.liturgicProps.LT, LAUDES)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={this.styles.red}>RESPONSORI BREU</Text>
        <Text />
        {this.responsori(this.props.liturgicProps.LT, LAUDES)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={this.styles.red}>CÀNTIC DE ZACARIES</Text>
        <Text />
        {this.cantic(this.props.liturgicProps.LT, this.props.variables.date.getDay(), this.props.liturgicProps.ABC, LAUDES)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={this.styles.red}>PREGÀRIES</Text>
        <Text />
        {this.pregaries(this.props.liturgicProps.LT, LAUDES)}
        <Text />
        <Text style={this.styles.red}>ORACIÓ</Text>
        <Text />
        <Text style={this.styles.blackBold}>Preguem.</Text>
        {this.oracio(this.props.liturgicProps.LT, this.props.variables.date.getDay(), LAUDES)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={this.styles.red}>CONCLUSIÓ</Text>
        <Text />
        <Text style={this.styles.red}>V.
          <Text style={this.styles.black}> Que el Senyor ens beneeixi i ens guardi de tot mal, i ens dugui a la vida eterna.</Text>
        </Text>
        <Text style={this.styles.red}>R.
          <Text style={this.styles.black}> Amén.</Text>
        </Text>
        <Text />
      </View>
    );
  }

  gloria(g){
    const gloriaString = "Glòria al Pare i al Fill    *\ni a l’Esperit Sant.\nCom era al principi, ara i sempre    *\ni pels segles dels segles. Amén.";

    if(g === '1'){
      if(true === true){ //TODO: tenir en compte els ajustaments
        return(<Text style={this.styles.black}>Glòria.</Text>);
      }
      else{
        return(<Text style={this.styles.black}>{gloriaString}</Text>);
      }
    }
    else{
      if(g==='0'){
        return(<Text style={this.styles.black}>S'omet el Glòria.</Text>);
      }
    }
  }

  introduccio(LT, setmana, LAUDES){
    const gloriaStringIntro = "Glòria al Pare i al Fill\ni a l’Esperit Sant.\nCom era al principi, ara i sempre\ni pels segles dels segles. Amén.";

    if(LAUDES.invitatori !== "Laudes"){
      return(
        <View>
          <Text style={this.styles.red}>V.
            <Text style={this.styles.black}> Sigueu amb nosaltres, Déu nostre.</Text>
          </Text>
          <Text style={this.styles.red}>R.
            <Text style={this.styles.black}> Senyor, veniu a ajudar-nos.</Text>
          </Text>
          <Text />
          <Text style={this.styles.black}>{gloriaStringIntro}
            {this.props.liturgicProps.LT !== GLOBAL.Q_CENDRA && this.props.liturgicProps.LT !== GLOBAL.Q_SETMANES && this.props.liturgicProps.LT !== GLOBAL.Q_DIUM_RAMS && this.props.liturgicProps.LT !== GLOBAL.Q_SET_SANTA && this.props.liturgicProps.LT !== GLOBAL.Q_TRIDU ?
              <Text style={this.styles.black}> Al·leluia</Text> : null
            }
          </Text>
        </View>
      )
    }
    else{
      return(
        <View>
          <Text style={this.styles.red}>V.
            <Text style={this.styles.black}> Obriu-me els llavis, Senyor.</Text>
          </Text>
          <Text style={this.styles.red}>R.
            <Text style={this.styles.black}> I proclamaré la vostra lloança.</Text>
          </Text>
          <Text />
          <Hr lineColor='#CFD8DC' />
          <Text />
          <Text style={this.styles.red}>Ant.
            <Text style={this.styles.black}> {LAUDES.antInvitatori}</Text>
          </Text>
          <Text />
          <Text style={this.styles.redCenter}>{"Salm 94\nInvitació a lloar Déu"}</Text>
          <Text />
          <Text style={this.styles.blackSmallItalicRight}>{"Mentre repetim aquell «avui», exhortem-nos cada dia els uns als altres (He 3, 13)"}</Text>
          <Text />
          <Text style={this.styles.black}>{LAUDES.salm94}</Text>
          <Text />
          {this.gloria('1')}
          <Text />
          <Text style={this.styles.red}>Ant.
            <Text style={this.styles.black}> {LAUDES.antInvitatori}</Text>
          </Text>
        </View>
      )
    }
  }

  himne(LT, weekDay, setmana, LAUDES){
    return(<Text style={this.styles.black}>{LAUDES.himne}</Text>);
  }

  salmodia(LT, setmana, weekDay, LAUDES){
    return(
      <View>
        <Text style={this.styles.red}>Ant. 1.
          <Text style={this.styles.black}> {LAUDES.ant1}</Text>
        </Text>
        <Text />
        <Text style={this.styles.redCenter}>{LAUDES.titol1}</Text>
        <Text />
        {LAUDES.com1 !== '-' ?
          <View><Text style={this.styles.blackSmallItalicRight}>{LAUDES.com1}</Text><Text /></View> : null}
        <Text style={this.styles.black}>{LAUDES.salm1}</Text>
        <Text />
        {this.gloria(LAUDES.gloria1)}
        <Text />
        <Text style={this.styles.red}>Ant. 1.
          <Text style={this.styles.black}> {LAUDES.ant1}</Text>
        </Text>
        <Text />
        <Text style={this.styles.red}>Ant. 2.
          <Text style={this.styles.black}> {LAUDES.ant2}</Text>
        </Text>
        <Text />
        <Text style={this.styles.redCenter}>{LAUDES.titol2}</Text>
        <Text />
        {LAUDES.com2 !== '-' ?
          <View><Text style={this.styles.blackSmallItalicRight}>{LAUDES.com2}</Text><Text /></View> : null}
        <Text style={this.styles.black}>{LAUDES.salm2}</Text>
        <Text />
        {this.gloria(LAUDES.gloria2)}
        <Text />
        <Text style={this.styles.red}>Ant. 2.
          <Text style={this.styles.black}> {LAUDES.ant2}</Text>
        </Text>
        <Text />
        <Text style={this.styles.red}>Ant. 3.
          <Text style={this.styles.black}> {LAUDES.ant3}</Text>
        </Text>
        <Text />
        <Text style={this.styles.redCenter}>{LAUDES.titol3}</Text>
        <Text />
        {LAUDES.com3 !== '-' ?
          <View><Text style={this.styles.blackSmallItalicRight}>{LAUDES.com3}</Text><Text /></View> : null}
        <Text style={this.styles.black}>{LAUDES.salm3}</Text>
        <Text />
        {this.gloria(LAUDES.gloria3)}
        <Text />
        <Text style={this.styles.red}>Ant. 3.
          <Text style={this.styles.black}> {LAUDES.ant3}</Text>
        </Text>
      </View>
    );
  }

  lecturaBreu(LT, LAUDES){
    return(
      <View>
        <Text style={this.styles.red}>{LAUDES.vers}</Text>
        <Text />
        <Text style={this.styles.black}>{LAUDES.lecturaBreu}</Text>
      </View>
    )
  }

  responsori(LT, LAUDES){
    if(LAUDES.calAntEspecial){
      return(
        <View>
          <Text style={this.styles.red}>Ant.
            <Text style={this.styles.black}> {LAUDES.antEspecialLaudes}</Text>
          </Text>
        </View>
      )
    }
    else{
      return(
        <View>
          <Text style={this.styles.red}>V.
            <Text style={this.styles.black}> {LAUDES.respBreu1} {LAUDES.respBreu2}</Text>
          </Text>
          <Text style={this.styles.red}>R.
            <Text style={this.styles.black}> {LAUDES.respBreu1} {LAUDES.respBreu2}</Text>
          </Text>
          <Text />
          <Text style={this.styles.red}>V.
            <Text style={this.styles.black}> {LAUDES.respBreu3}</Text>
          </Text>
          <Text style={this.styles.red}>R.
            <Text style={this.styles.black}> {LAUDES.respBreu2}</Text>
          </Text>
          <Text />
          <Text style={this.styles.red}>V.
            <Text style={this.styles.black}> Glòria al Pare i al Fill i a l'Esperit Sant.</Text>
          </Text>
          <Text style={this.styles.red}>R.
            <Text style={this.styles.black}> {LAUDES.respBreu1} {LAUDES.respBreu2}</Text>
          </Text>
        </View>
      )
    }
  }

  cantic(LT, weekDay, litYear, LAUDES){
    return(
      <View>
        <Text style={this.styles.red}>Ant.
          <Text style={this.styles.black}> {LAUDES.antCantic}</Text>
        </Text>
        <Text />
        <Text style={this.styles.black}>{LAUDES.cantic}</Text>
        <Text />
        {this.gloria('1')}
        <Text />
        <Text style={this.styles.red}>Ant.
          <Text style={this.styles.black}> {LAUDES.antCantic}</Text>
        </Text>
      </View>
    );
  }

  pregaries(LT, LAUDES){
    return(
        <Text style={this.styles.black}> {LAUDES.pregaries}</Text>
    );
  }

  oracio(LT, weekDay, LAUDES){
    return(<Text style={this.styles.black}>{LAUDES.oracio}</Text>);
  }

  convertTextSize(){
    switch (this.props.variables.textSize) {
      case '1':
        return 14;
        break;
      case '2':
        return 16;
        break;
      case '3':
        return 18;
        break;
      case '4':
        return 20;
        break;
      case '5':
        return 22;
        break;
    }
  }
}

AppRegistry.registerComponent('LaudesDisplay', () => LaudesDisplay);

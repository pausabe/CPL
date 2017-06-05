import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Platform
} from 'react-native';
import Hr from 'react-native-hr';
import GLOBAL from '../Globals/Globals';

export default class OficiDisplay extends Component {
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
    OFICI = this.props.liturgicProps.LITURGIA.ofici;
    return (
      <View>
        {this.introduccio(this.props.liturgicProps.LT, this.props.liturgicProps.setmana, OFICI)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={this.styles.red}>HIMNE</Text>
        <Text />
        {this.himne(this.props.liturgicProps.LT, this.props.variables.date.getDay(), false, this.props.liturgicProps.setmana, OFICI)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={this.styles.red}>SALMÒDIA</Text>
        <Text />
        {this.salmodia(this.props.liturgicProps.LT, this.props.liturgicProps.setmana, this.props.variables.date.getDay(), this.props.cicle, OFICI)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={this.styles.red}>VERS</Text>
        <Text />
        {this.vers(this.props.liturgicProps.LT, OFICI)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={this.styles.red}>LECTURES</Text>
        <Text />
        {this.lectures(this.props.liturgicProps.LT, OFICI)}
        <Text />
        {this.himneOhDeu(this.props.liturgicProps.LT, this.props.variables.date.getDay(), OFICI)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={this.styles.red}>ORACIÓ</Text>
        <Text />
        <Text style={this.styles.blackBold}>Preguem.</Text>
        {this.oracio(this.props.liturgicProps.LT, this.props.variables.date.getDay(), OFICI)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={this.styles.red}>CONCLUSIÓ</Text>
        <Text />
        <Text style={this.styles.red}>V.
          <Text style={this.styles.black}> Beneïm al Senyor.</Text>
        </Text>
        <Text style={this.styles.red}>R.
          <Text style={this.styles.black}> Donem gràcies a Déu.</Text>
        </Text>
        <Text />
      </View>
    );
  }

  gloria(g){
    const gloriaString = "Glòria al Pare i al Fill    *\ni a l’Esperit Sant.\nCom era al principi, ara i sempre    *\ni pels segles dels segles. Amén.";

    if(g === '1'){
      if(this.props.variables.gloria === 'false'){
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

  introduccio(LT, setmana, OFICI){
    const gloriaStringIntro = "Glòria al Pare i al Fill\ni a l’Esperit Sant.\nCom era al principi, ara i sempre\ni pels segles dels segles. Amén.";

    if(OFICI.invitatori !== "Ofici"){
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
            <Text style={this.styles.black}> {OFICI.antInvitatori}</Text>
          </Text>
          <Text />
          <Text style={this.styles.redCenter}>{"Salm 94\nInvitació a lloar Déu"}</Text>
          <Text />
          <Text style={this.styles.blackSmallItalicRight}>{"Mentre repetim aquell «avui», exhortem-nos cada dia els uns als altres (He 3, 13)"}</Text>
          <Text />
          <Text style={this.styles.black}>{OFICI.salm94}</Text>
          <Text />
          {this.gloria('1')}
          <Text />
          <Text style={this.styles.red}>Ant.
            <Text style={this.styles.black}> {OFICI.antInvitatori}</Text>
          </Text>
        </View>
      )
    }
  }

  himne(LT, weekDay, nit, setmana, OFICI){
    return(<Text style={this.styles.black}>{OFICI.himne}</Text>);
  }

  salmodia(LT, setmana, weekDay, cicle, OFICI){
    return(
      <View>
        <Text style={this.styles.red}>Ant. 1.
          <Text style={this.styles.black}> {OFICI.ant1}</Text>
        </Text>
        <Text />
        <Text style={this.styles.redCenter}>{OFICI.titol1}</Text>
        <Text />
        {OFICI.com1 !== '-' ?
          <View><Text style={this.styles.blackSmallItalicRight}>{OFICI.com1}</Text><Text /></View> : null}
        <Text style={this.styles.black}>{OFICI.salm1}</Text>
        <Text />
        {this.gloria(OFICI.gloria1)}
        <Text />
        <Text style={this.styles.red}>Ant. 1.
          <Text style={this.styles.black}> {OFICI.ant1}</Text>
        </Text>
        <Text />
        <Text style={this.styles.red}>Ant. 2.
          <Text style={this.styles.black}> {OFICI.ant2}</Text>
        </Text>
        <Text />
        <Text style={this.styles.redCenter}>{OFICI.titol2}</Text>
        <Text />
        {OFICI.com2 !== '-' ?
          <View><Text style={this.styles.blackSmallItalicRight}>{OFICI.com2}</Text><Text /></View> : null}
        <Text style={this.styles.black}>{OFICI.salm2}</Text>
        <Text />
        {this.gloria(OFICI.gloria2)}
        <Text />
        <Text style={this.styles.red}>Ant. 2.
          <Text style={this.styles.black}> {OFICI.ant2}</Text>
        </Text>
        <Text />
        <Text style={this.styles.red}>Ant. 3.
          <Text style={this.styles.black}> {OFICI.ant3}</Text>
        </Text>
        <Text />
        <Text style={this.styles.redCenter}>{OFICI.titol3}</Text>
        <Text />
        {OFICI.com3 !== '-' ?
          <View><Text style={this.styles.blackSmallItalicRight}>{OFICI.com3}</Text><Text /></View> : null}
        <Text style={this.styles.black}>{OFICI.salm3}</Text>
        <Text />
        {this.gloria(OFICI.gloria3)}
        <Text />
        <Text style={this.styles.red}>Ant. 3.
          <Text style={this.styles.black}> {OFICI.ant3}</Text>
        </Text>
      </View>
    );
  }

  vers(LT, OFICI){
    return(
      <View>
        <Text style={this.styles.red}>V.
          <Text style={this.styles.black}> {OFICI.respV}</Text>
        </Text>
        <Text style={this.styles.red}>R.
          <Text style={this.styles.black}> {OFICI.respR}</Text>
        </Text>
      </View>
    );
  }

  lectures(LT, OFICI){
    return(
      <View>
        <Text style={this.styles.red}>Primera lectura</Text>
        <Text style={this.styles.black}>{OFICI.referencia1}
          <Text style={this.styles.red}> {OFICI.cita1}</Text></Text>
        <Text />
        <Text style={this.styles.redCenterBold}>{OFICI.titolLectura1}</Text>
        <Text />
        <Text style={this.styles.black}>{OFICI.lectura1}</Text>
        <Text />
        <Text style={this.styles.red}>Responsori
          <Text style={this.styles.redSmallItalicRight}> {OFICI.citaResp1}</Text>
        </Text>
        <Text style={this.styles.red}>R.
          <Text style={this.styles.black}> {OFICI.resp1Part1} {OFICI.resp1Part2}</Text>
        </Text>
        <Text style={this.styles.red}>V.
          <Text style={this.styles.black}> {OFICI.resp1Part3} {OFICI.resp1Part2}</Text>
        </Text>
        <Text />
        <Text style={this.styles.red}>Segona lectura</Text>
        <Text style={this.styles.black}>{OFICI.referencia2}
          <Text style={this.styles.red}> {OFICI.cita2}</Text></Text>
        <Text />
        <Text style={this.styles.redCenterBold}>{OFICI.titolLectura2}</Text>
        <Text />
        <Text style={this.styles.black}>{OFICI.lectura2}</Text>
        <Text />
        <Text style={this.styles.red}>Responsori
          <Text style={this.styles.redSmallItalicRight}>  {OFICI.versResp2}</Text>
        </Text>
        <Text style={this.styles.red}>R.
          <Text style={this.styles.black}> {OFICI.resp2Part1} {OFICI.resp2Part2}</Text>
        </Text>
        <Text style={this.styles.red}>V.
          <Text style={this.styles.black}>  {OFICI.resp2Part3} {OFICI.resp2Part2}</Text>
        </Text>
      </View>
    )
  }

  himneOhDeu(LT, weekDay, OFICI){
    if(OFICI.himneOhDeuBool){
      return(
        <View>
          <Hr lineColor='#CFD8DC' />
          <Text />
          <Text style={this.styles.red}>HIMNE</Text>
          <Text />
          <Text style={this.styles.black}>{OFICI.himneOhDeu}</Text>
          <Text />
        </View>
      )
    }
  }

  oracio(LT, weekDay, OFICI){
    return(<Text style={this.styles.black}>{OFICI.oracio}</Text>);
  }
}

AppRegistry.registerComponent('OficiDisplay', () => OficiDisplay);

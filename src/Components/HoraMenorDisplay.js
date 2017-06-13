import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Platform
} from 'react-native';
import Hr from 'react-native-hr';
import GLOBAL from '../Globals/Globals';

export default class HoraMenorDisplay extends Component {
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
        fontSize: this.convertTextSize()-2,
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
    const gloriaStringIntro = "Glòria al Pare i al Fill\ni a l’Esperit Sant.\nCom era al principi, ara i sempre\ni pels segles dels segles. Amén.";
    return (
      <View>
        <Text selectable={true} style={this.styles.red}>V.
          <Text selectable={true} style={this.styles.black}> Sigueu amb nosaltres, Déu nostre.</Text>
        </Text>
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> Senyor, veniu a ajudar-nos.</Text>
        </Text>
        <Text />
        <Text selectable={true} style={this.styles.black}>{gloriaStringIntro}
        {this.props.liturgicProps.LT !== GLOBAL.Q_CENDRA && this.props.liturgicProps.LT !== GLOBAL.Q_SETMANES && this.props.liturgicProps.LT !== GLOBAL.Q_DIUM_RAMS && this.props.liturgicProps.LT !== GLOBAL.Q_SET_SANTA && this.props.liturgicProps.LT !== GLOBAL.Q_TRIDU ? //TODO: tenir en compte si és o no Quaresma
          <Text selectable={true} style={this.styles.black}> Al·leluia</Text> : null
        }
        </Text>
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text selectable={true} style={this.styles.red}>HIMNE</Text>
        <Text />
        {this.himne(this.props.liturgicProps.LT, this.props.variables.date.getDay(), this.props.liturgicProps.setmana, this.props.HM)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text selectable={true} style={this.styles.red}>SALMÒDIA</Text>
        <Text />
        {this.salmodia(this.props.liturgicProps.LT, this.props.liturgicProps.setmana, this.props.variables.date.getDay(), this.props.HM)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text selectable={true} style={this.styles.red}>LECTURA BREU</Text>
        <Text />
        {this.lecturaBreuResp(this.props.liturgicProps.LT, this.props.HM)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text selectable={true} style={this.styles.red}>ORACIÓ</Text>
        <Text />
        <Text selectable={true} style={this.styles.blackBold}>Preguem.</Text>
        {this.oracio(this.props.liturgicProps.LT, this.props.variables.date.getDay(), this.props.HM)}
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> Amén.</Text>
        </Text>
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text selectable={true} style={this.styles.red}>CONCLUSIÓ</Text>
        <Text />
        <Text selectable={true} style={this.styles.red}>V.
          <Text selectable={true} style={this.styles.black}> Beneïm al Senyor.</Text>
        </Text>
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> Donem gràcies a Déu.</Text>
        </Text>
        <Text />
      </View>
    );
  }

  salm(salm){
    if(this.props.variables.cleanSalm === 'false'){
      salm = salm.replace(/    [*]/g,'');
      salm = salm.replace(/   [*]/g,'');
      salm = salm.replace(/  [*]/g,'');
      salm = salm.replace(/ [*]/g,'');
      salm = salm.replace(/    [†]/g,'');
      salm = salm.replace(/   [†]/g,'');
      salm = salm.replace(/  [†]/g,'');
      salm = salm.replace(/ [†]/g,'');
    }
    return (<Text selectable={true} style={this.styles.black}>{salm}</Text>);
  }

  gloria(g){
    var gloriaString = "Glòria al Pare i al Fill    *\ni a l’Esperit Sant.\nCom era al principi, ara i sempre    *\ni pels segles dels segles. Amén.";
    if(this.props.variables.cleanSalm === 'false')
      gloriaString = "Glòria al Pare i al Fill    \ni a l’Esperit Sant.\nCom era al principi, ara i sempre    \ni pels segles dels segles. Amén.";

    if(g === '1'){
      if(this.props.variables.gloria === 'false'){
        return(<Text selectable={true} style={this.styles.black}>Glòria.</Text>);
      }
      else{
        return(<Text selectable={true} style={this.styles.black}>{gloriaString}</Text>);
      }
    }
    else{
      if(g==='0'){
        return(<Text selectable={true} style={this.styles.black}>{"S'omet el Glòria."}</Text>);
      }
    }
  }

  himne(LT, weekDay, setmana, HM){
    return(<Text selectable={true} style={this.styles.black}>{this.props.HORA_MENOR.himne}</Text>);
  }

  salmodia(LT, setmana, weekDay, HM){
    return(
      <View>
        {this.props.HORA_MENOR.antifones ?
          <View>
            <Text selectable={true} style={this.styles.red}>Ant. 1.
              <Text selectable={true} style={this.styles.black}> {this.props.HORA_MENOR.ant1}</Text>
            </Text>
          </View>
        :
          <View>
            <Text selectable={true} style={this.styles.red}>Ant.
              <Text selectable={true} style={this.styles.black}> {this.props.HORA_MENOR.ant}</Text>
            </Text>
          </View>
        }
        <Text />
        <Text selectable={true} style={this.styles.redCenter}>{this.props.HORA_MENOR.titol1}</Text>
        <Text />
        {this.props.HORA_MENOR.com1 !== '-' ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{this.props.HORA_MENOR.com1}</Text>
          <Text /></View></View> : null}
        {this.salm(this.props.HORA_MENOR.salm1)}
        <Text />
        {this.gloria(this.props.HORA_MENOR.gloria1)}
        <Text />
        {this.props.HORA_MENOR.antifones ?
          <View>
            <Text selectable={true} style={this.styles.red}>Ant. 1.
              <Text selectable={true} style={this.styles.black}> {this.props.HORA_MENOR.ant1}</Text>
            </Text>
            <Text />
            <Text selectable={true} style={this.styles.red}>Ant. 2.
              <Text selectable={true} style={this.styles.black}> {this.props.HORA_MENOR.ant2}</Text>
            </Text>
            <Text />
          </View>
        : null }
        <Text selectable={true} style={this.styles.redCenter}>{this.props.HORA_MENOR.titol2}</Text>
        <Text />
        {this.props.HORA_MENOR.com2 !== '-' ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{this.props.HORA_MENOR.com2}</Text>
          <Text /></View></View> : null}
        {this.salm(this.props.HORA_MENOR.salm2)}
        <Text />
        {this.gloria(this.props.HORA_MENOR.gloria2)}
        <Text />
        {this.props.HORA_MENOR.antifones ?
          <View>
            <Text selectable={true} style={this.styles.red}>Ant. 2.
              <Text selectable={true} style={this.styles.black}> {this.props.HORA_MENOR.ant2}</Text>
            </Text>
            <Text />
            <Text selectable={true} style={this.styles.red}>Ant. 3.
              <Text selectable={true} style={this.styles.black}> {this.props.HORA_MENOR.ant3}</Text>
            </Text>
            <Text />
          </View>
        : null }
        <Text selectable={true} style={this.styles.redCenter}>{this.props.HORA_MENOR.titol3}</Text>
        <Text />
        {this.props.HORA_MENOR.com3 !== '-' ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{this.props.HORA_MENOR.com3}</Text>
          <Text /></View></View> : null}
        {this.salm(this.props.HORA_MENOR.salm3)}
        <Text />
        {this.gloria(this.props.HORA_MENOR.gloria3)}
        <Text />
        {this.props.HORA_MENOR.antifones ?
          <View>
            <Text selectable={true} style={this.styles.red}>Ant. 3.
              <Text selectable={true} style={this.styles.black}> {this.props.HORA_MENOR.ant3}</Text>
            </Text>
          </View>
        :
          <View>
            <Text selectable={true} style={this.styles.red}>Ant.
              <Text selectable={true} style={this.styles.black}> {this.props.HORA_MENOR.ant}</Text>
            </Text>
          </View>
        }
      </View>
    );
  }

  lecturaBreuResp(LT, HM){
    return(
      <View>
        <Text selectable={true} style={this.styles.red}>{this.props.HORA_MENOR.vers}</Text>
        <Text />
        <Text selectable={true} style={this.styles.black}>{this.props.HORA_MENOR.lecturaBreu}</Text>
        <Text />
        <Text selectable={true} style={this.styles.red}>V.
          <Text selectable={true} style={this.styles.black}> {this.props.HORA_MENOR.respV}</Text>
        </Text>
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> {this.props.HORA_MENOR.respR}</Text>
        </Text>
      </View>
    )
  }

  oracio(LT, weekDay, HM){
    return(<Text selectable={true} style={this.styles.black}>{this.completeOracio(this.props.HORA_MENOR.oracio)}</Text>);
  }

  completeOracio(oracio){
    var form1 = "Per nostre Senyor Jesucrist";
    var bigf1 = "Per nostre Senyor Jesucrist, el vostre Fill, que amb vós viu i regna en la unitat de l'Esperit Sant, Déu, pels segles dels segles";
    var form2 = "Vós, que viviu i regneu pels segles dels segles";
    var bigf2 = "Vós, que viviu i regneu amb Déu Pare en la unitat de l'Esperit Sant, Déu, pels segles dels segles";
    var form3 = "Que viu i regna pels segles dels segles";
    var form4 = "Ell, que viu i regna pels segles dels segles";
    var bigf4 = "Ell, que amb vós viu i regna en la unitat de l'Esperit Sant, Déu, pels segles dels segles";

    oAux = oracio;
    console.log(oAux);
    if(oAux.search(form1) !== -1)
      return oAux.replace(form1, bigf1);
    if(oAux.search(form2) !== -1)
      return oAux.replace(form2, bigf2);
    if(oAux.search(form3) !== -1)
      return oAux.replace(form3, bigf4);
    if(oAux.search(form4) !== -1)
      return oAux.replace(form4, bigf4);

    return oracio;
  }
}

AppRegistry.registerComponent('HoraMenorDisplay', () => HoraMenorDisplay);

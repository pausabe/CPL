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

    console.log("OficiDisplay");

    this.styles = {
      black: {
        color: '#000000',
        fontSize: this.convertTextSize(),
      },
      blackJustified:{
        color: '#000000',
        fontSize: this.convertTextSize(),
        textAlign: 'justify',
      },
      blackBold: {
        color: '#000000',
        fontSize: this.convertTextSize(),
        fontWeight: 'bold',
      },
      blackItalic:{
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
        fontSize: this.convertTextSize()-2,
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
    if(!OFICI.diumPasqua){
      return (
        <View>
          {this.introduccio(this.props.liturgicProps.LT, this.props.liturgicProps.setmana, OFICI)}
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Hr lineColor='#CFD8DC' />
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>HIMNE</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          {this.himne(this.props.liturgicProps.LT, this.props.variables.date.getDay(), false, this.props.liturgicProps.setmana, OFICI)}
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Hr lineColor='#CFD8DC' />
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>SALMÒDIA</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          {this.salmodia(this.props.liturgicProps.LT, this.props.liturgicProps.setmana, this.props.variables.date.getDay(), this.props.cicle, OFICI)}
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Hr lineColor='#CFD8DC' />
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>VERS</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          {this.vers(this.props.liturgicProps.LT, OFICI)}
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Hr lineColor='#CFD8DC' />
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>LECTURES</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          {this.lectures(this.props.liturgicProps.LT, OFICI)}
          {this.himneOhDeu(this.props.liturgicProps.LT, this.props.variables.date.getDay(), OFICI)}
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Hr lineColor='#CFD8DC' />
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>ORACIÓ</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.blackBold}>Preguem.</Text>
          {this.oracio(this.props.liturgicProps.LT, this.props.variables.date.getDay(), OFICI)}
          <Text selectable={true} style={this.styles.red}>R.
            <Text selectable={true} style={this.styles.black}> Amén.</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Hr lineColor='#CFD8DC' />
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>CONCLUSIÓ</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>V.
            <Text selectable={true} style={this.styles.black}> Beneïm el Senyor.</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>R.
            <Text selectable={true} style={this.styles.black}> Donem gràcies a Déu.</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        </View>
      );
    }
    else{
      return (
        <View>
          {this.lecturesDiumPasqua(this.props.liturgicProps.LT, OFICI)}
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          {this.himneOhDeu(this.props.liturgicProps.LT, this.props.variables.date.getDay(), OFICI)}
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Hr lineColor='#CFD8DC' />
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>ORACIÓ</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.blackBold}>Preguem.</Text>
          {this.oracio(this.props.liturgicProps.LT, this.props.variables.date.getDay(), OFICI)}
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Hr lineColor='#CFD8DC' />
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>CONCLUSIÓ</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>V.
            <Text selectable={true} style={this.styles.black}> Beneïm el Senyor.</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>R.
            <Text selectable={true} style={this.styles.black}> Donem gràcies a Déu.</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        </View>
      );
    }
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
        return(<Text selectable={true} style={this.styles.blackItalic}>Glòria.</Text>);
      }
      else{
        return(<Text selectable={true} style={this.styles.blackItalic}>{gloriaString}</Text>);
      }
    }
    else{
      if(g==='0'){
        return(<Text selectable={true} style={this.styles.blackItalic}>S'omet el Glòria.</Text>);
      }
    }
  }

  introduccio(LT, setmana, OFICI){
    const gloriaStringIntro = "Glòria al Pare i al Fill\ni a l’Esperit Sant.\nCom era al principi, ara i sempre\ni pels segles dels segles. Amén.";

    if(OFICI.invitatori !== "Ofici"){
      return(
        <View>
          <Text selectable={true} style={this.styles.red}>V.
            <Text selectable={true} style={this.styles.black}> Sigueu amb nosaltres, Déu nostre.</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>R.
            <Text selectable={true} style={this.styles.black}> Senyor, veniu a ajudar-nos.</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.black}>{gloriaStringIntro}
            {this.props.liturgicProps.LT !== GLOBAL.Q_CENDRA && this.props.liturgicProps.LT !== GLOBAL.Q_SETMANES && this.props.liturgicProps.LT !== GLOBAL.Q_DIUM_RAMS && this.props.liturgicProps.LT !== GLOBAL.Q_SET_SANTA && this.props.liturgicProps.LT !== GLOBAL.Q_TRIDU ?
              <Text selectable={true} style={this.styles.black}> Al·leluia</Text> : null
            }
          </Text>
        </View>
      )
    }
    else{
      return(
        <View>
          <Text selectable={true} style={this.styles.red}>V.
            <Text selectable={true} style={this.styles.black}> Obriu-me els llavis, Senyor.</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>R.
            <Text selectable={true} style={this.styles.black}> I proclamaré la vostra lloança.</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Hr lineColor='#CFD8DC' />
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>Ant.
            <Text selectable={true} style={this.styles.black}> {OFICI.antInvitatori}</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.redCenter}>{"Salm 94\nInvitació a lloar Déu"}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{"Mentre repetim aquell «avui», exhortem-nos cada dia els uns als altres (He 3, 13)"}</Text></View></View>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          {this.salm(OFICI.salm94)}
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          {this.gloria('1')}
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>Ant.
            <Text selectable={true} style={this.styles.black}> {OFICI.antInvitatori}</Text>
          </Text>
        </View>
      )
    }
  }

  himne(LT, weekDay, nit, setmana, OFICI){
    return(<Text selectable={true} style={this.styles.black}>{OFICI.himne}</Text>);
  }

  salmodia(LT, setmana, weekDay, cicle, OFICI){
    return(
      <View>
        <Text selectable={true} style={this.styles.red}>Ant. 1.
          <Text selectable={true} style={this.styles.black}> {OFICI.ant1}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{OFICI.titol1}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {OFICI.com1 !== '-' ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{OFICI.com1}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
        {this.salm(OFICI.salm1)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria(OFICI.gloria1)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 1.
          <Text selectable={true} style={this.styles.black}> {OFICI.ant1}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 2.
          <Text selectable={true} style={this.styles.black}> {OFICI.ant2}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{OFICI.titol2}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {OFICI.com2 !== '-' ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{OFICI.com2}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
        {this.salm(OFICI.salm2)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria(OFICI.gloria2)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 2.
          <Text selectable={true} style={this.styles.black}> {OFICI.ant2}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 3.
          <Text selectable={true} style={this.styles.black}> {OFICI.ant3}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{OFICI.titol3}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {OFICI.com3 !== '-' ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{OFICI.com3}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
        {this.salm(OFICI.salm3)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria(OFICI.gloria3)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 3.
          <Text selectable={true} style={this.styles.black}> {OFICI.ant3}</Text>
        </Text>
      </View>
    );
  }

  vers(LT, OFICI){
    return(
      <View>
        <Text selectable={true} style={this.styles.red}>V.
          <Text selectable={true} style={this.styles.black}> {OFICI.respV}</Text>
        </Text>
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> {OFICI.respR}</Text>
        </Text>
      </View>
    );
  }

  lectures(LT, OFICI){
    return(
      <View>
        <Text selectable={true} style={this.styles.red}>Lectura primera</Text>
        <Text selectable={true} style={this.styles.black}>{OFICI.referencia1}</Text>
        <Text selectable={true} style={this.styles.red}>{OFICI.cita1}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenterBold}>{OFICI.titolLectura1}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackJustified}>{OFICI.lectura1}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Responsori</Text>
        {OFICI.citaResp1 !== '-' ? <Text selectable={true} style={this.styles.red}>{OFICI.citaResp1}</Text> : null}
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> {OFICI.resp1Part1} {OFICI.resp1Part2}</Text>
        </Text>
        <Text selectable={true} style={this.styles.red}>V.
          <Text selectable={true} style={this.styles.black}> {OFICI.resp1Part3}</Text>
        </Text>
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> {OFICI.resp1Part2}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Lectura segona</Text>
        <Text selectable={true} style={this.styles.black}>{OFICI.referencia2}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenterBold}>{OFICI.titolLectura2}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackJustified}>{OFICI.lectura2}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Responsori</Text>
        {OFICI.versResp2 !== '-' ? <Text selectable={true} style={this.styles.red}>{OFICI.versResp2}</Text> : null}
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> {OFICI.resp2Part1} {OFICI.resp2Part2}</Text>
        </Text>
        <Text selectable={true} style={this.styles.red}>V.
          <Text selectable={true} style={this.styles.black}> {OFICI.resp2Part3}</Text>
        </Text>
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> {OFICI.resp2Part2}</Text>
        </Text>
      </View>
    )
  }

  lecturesDiumPasqua(LT, OFICI){
    return(
      <View>
        <Text selectable={true} style={this.styles.red}>Lectura primera</Text>
        <Text selectable={true} style={this.styles.black}>{OFICI.referencia1}</Text>
        <Text selectable={true} style={this.styles.red}>{OFICI.cita1}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenterBold}>{OFICI.titolLectura1}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackJustified}>{OFICI.lectura1}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {OFICI.ant1}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{OFICI.titol1}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.salm(OFICI.salm1)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria('1')}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {OFICI.ant1}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackBold}>Preguem.</Text>
        <Text selectable={true} style={this.styles.black}>{this.completeOracio(OFICI.oracio1)}</Text>
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> Amén.</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Lectura segona</Text>
        <Text selectable={true} style={this.styles.black}>{OFICI.referencia2}</Text>
        <Text selectable={true} style={this.styles.red}>{OFICI.cita2}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenterBold}>{OFICI.titolLectura2}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackJustified}>{OFICI.lectura2}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {OFICI.ant2}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{OFICI.titol2}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.salm(OFICI.salm2)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria('1')}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {OFICI.ant2}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackBold}>Preguem.</Text>
        <Text selectable={true} style={this.styles.black}>{this.completeOracio(OFICI.oracio2)}</Text>
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> Amén.</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Lectura tercera</Text>
        <Text selectable={true} style={this.styles.black}>{OFICI.referencia3}</Text>
        <Text selectable={true} style={this.styles.red}>{OFICI.cita3}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenterBold}>{OFICI.titolLectura3}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackJustified}>{OFICI.lectura3}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {OFICI.ant3}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{OFICI.titol3}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.salm(OFICI.salm3)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria('1')}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {OFICI.ant3}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Lectura quarta</Text>
        <Text selectable={true} style={this.styles.black}>{OFICI.referencia4}</Text>
        <Text selectable={true} style={this.styles.red}>{OFICI.cita4}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenterBold}>{OFICI.titolLectura4}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackJustified}>{OFICI.lectura4}</Text>
      </View>
    )
  }

  himneOhDeu(LT, weekDay, OFICI){
    if(OFICI.himneOhDeuBool){
      return(
        <View>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Hr lineColor='#CFD8DC' />
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>HIMNE</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.black}>{OFICI.himneOhDeu}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        </View>
      )
    }
  }

  oracio(LT, weekDay, OFICI){
    return(<Text selectable={true} style={this.styles.black}>{this.completeOracio(OFICI.oracio)}</Text>);
  }

  completeOracio(oracio){
    var form1 = "Per nostre Senyor Jesucrist";
    var bigf1 = "Per nostre Senyor Jesucrist, el vostre Fill, que amb vós viu i regna en la unitat de l'Esperit Sant, Déu, pels segles dels segles";
    var form2 = "Vós, que viviu i regneu pels segles dels segles";
    var bigf2 = "Vós, que viviu i regneu amb Déu Pare en la unitat de l'Esperit Sant, Déu, pels segles dels segles";
    var form3 = "Que viu i regna pels segles dels segles";
    var form4 = "Ell, que viu i reg­na pels segles dels segles";
    var bigf4 = "Ell, que amb vós viu i regna en la unitat de l'Esperit Sant, Déu, pels segles dels segles";

    oAux = oracio;
    //console.log(oAux);
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

  rs(text){
    var length = text.length;
    if(text.charAt(length-1) === ' ') return text.slice(0,length-1);
    return text;
  }

  respTogether(r1,r2){
    r1=this.rs(r1);

    var lastCharacter = r1.charAt(r1.length-1);
    var firstWord = r2.split(" ")[0];

    var result = r1 + ' ' + r2;

    if(lastCharacter !== '.' && firstWord !== 'Senyor' && firstWord !== 'Déu')
      result = r1 + ' ' + r2.charAt(0).toLowerCase() + r2.slice(1);

    return result;
  }
}

AppRegistry.registerComponent('OficiDisplay', () => OficiDisplay);

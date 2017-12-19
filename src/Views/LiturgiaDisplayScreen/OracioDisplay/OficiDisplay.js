import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Platform
} from 'react-native';
import Hr from 'react-native-hr';
import GLOBAL from '../../../Globals/Globals';
import GF from '../../../Globals/GlobalFunctions';

export default class OficiDisplay extends Component {

  constructor(props){
    super(props);

    console.log("PlaceLog. OficiDisplay");

    var textSize = this.props.variables.textSize;

    this.styles = {
      black: {
        color: '#000000',
        fontSize: GF.convertTextSize(textSize),
      },
      blackJustified:{
        color: '#000000',
        fontSize: GF.convertTextSize(textSize),
        textAlign: 'justify',
      },
      blackBold: {
        color: '#000000',
        fontSize: GF.convertTextSize(textSize),
        fontWeight: 'bold',
      },
      blackItalic:{
        color: '#000000',
        fontSize: GF.convertTextSize(textSize),
        fontStyle: 'italic'
      },
      blackSmallItalicRight: {
        color: '#000000',
        fontSize: GF.convertTextSize(textSize)-2,
        fontStyle: 'italic',
        textAlign: 'right'
      },
      red: {
        color: '#FF0000',
        fontSize: GF.convertTextSize(textSize),
      },
      redCenter: {
        color: '#FF0000',
        fontSize: GF.convertTextSize(textSize),
        textAlign: 'center'
      },
      redCenterBold: {
        color: '#FF0000',
        fontSize: GF.convertTextSize(textSize),
        textAlign: 'center',
        fontWeight: 'bold',
      },
      redSmallItalicRight: {
        color: '#FF0000',
        fontSize: GF.convertTextSize(textSize)-2,
        fontStyle: 'italic',
        textAlign: 'right'
      }
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
    if(!salm) return null;

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
    if(!g) return null;
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
            <Text selectable={true} style={this.styles.black}> {GF.rs(OFICI.antInvitatori, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.redCenter}>{"Salm 94\nInvitació a lloar Déu"}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{"Mentre repetim aquell «avui», exhortem-nos cada dia els uns als altres (He 3, 13)"}</Text></View></View>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          {this.salm(GF.rs(OFICI.salm94, this.props.superTestMode, this.props.testErrorCB.bind(this)))}
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          {this.gloria('1')}
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>Ant.
            <Text selectable={true} style={this.styles.black}> {GF.rs(OFICI.antInvitatori, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
          </Text>
        </View>
      )
    }
  }

  himne(LT, weekDay, nit, setmana, OFICI){
    return(<Text selectable={true} style={this.styles.black}>{GF.rs(OFICI.himne, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>);
  }

  salmodia(LT, setmana, weekDay, cicle, OFICI){
    return(
      <View>
        <Text selectable={true} style={this.styles.red}>Ant. 1.
          <Text selectable={true} style={this.styles.black}> {GF.rs(OFICI.ant1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{GF.rs(OFICI.titol1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {OFICI.com1 !== '-' ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{GF.rs(OFICI.com1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
        {this.salm(GF.rs(OFICI.salm1, this.props.superTestMode, this.props.testErrorCB.bind(this)))}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria(OFICI.gloria1)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 1.
          <Text selectable={true} style={this.styles.black}> {GF.rs(OFICI.ant1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 2.
          <Text selectable={true} style={this.styles.black}> {GF.rs(OFICI.ant2, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{GF.rs(OFICI.titol2, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {OFICI.com2 !== '-' ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{GF.rs(OFICI.com2, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
        {this.salm(GF.rs(OFICI.salm2, this.props.superTestMode, this.props.testErrorCB.bind(this)))}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria(OFICI.gloria2)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 2.
          <Text selectable={true} style={this.styles.black}> {GF.rs(OFICI.ant2, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 3.
          <Text selectable={true} style={this.styles.black}> {GF.rs(OFICI.ant3, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{GF.rs(OFICI.titol3, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {OFICI.com3 !== '-' ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{GF.rs(OFICI.com3, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
        {this.salm(GF.rs(OFICI.salm3, this.props.superTestMode, this.props.testErrorCB.bind(this)))}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria(OFICI.gloria3)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 3.
          <Text selectable={true} style={this.styles.black}> {GF.rs(OFICI.ant3, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        </Text>
      </View>
    );
  }

  vers(LT, OFICI){
    return(
      <View>
        <Text selectable={true} style={this.styles.red}>V.
          <Text selectable={true} style={this.styles.black}> {GF.rs(OFICI.respV, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        </Text>
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> {GF.rs(OFICI.respR, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        </Text>
      </View>
    );
  }

  lectures(LT, OFICI){
    return(
      <View>
        <Text selectable={true} style={this.styles.red}>Lectura primera</Text>
        <Text selectable={true} style={this.styles.black}>{GF.rs(OFICI.referencia1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {OFICI.cita1 !== '-' ? <Text selectable={true} style={this.styles.red}>{GF.rs(OFICI.cita1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text> : null}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenterBold}>{GF.rs(OFICI.titolLectura1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackJustified}>{GF.rs(OFICI.lectura1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Responsori</Text>
        {OFICI.citaResp1 !== '-' ? <Text selectable={true} style={this.styles.red}>{GF.rs(OFICI.citaResp1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text> : null}
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> {GF.respTogether(GF.rs(OFICI.resp1Part1, this.props.superTestMode, this.props.testErrorCB.bind(this)),GF.rs(OFICI.resp1Part2, this.props.superTestMode, this.props.testErrorCB.bind(this)))}</Text>
        </Text>
        <Text selectable={true} style={this.styles.red}>V.
          <Text selectable={true} style={this.styles.black}> {GF.rs(OFICI.resp1Part3, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        </Text>
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> {GF.rs(OFICI.resp1Part2, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Lectura segona</Text>
        <Text selectable={true} style={this.styles.black}>{GF.rs(OFICI.referencia2, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenterBold}>{GF.rs(OFICI.titolLectura2, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackJustified}>{GF.rs(OFICI.lectura2, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Responsori</Text>
        {OFICI.versResp2 !== '-' ? <Text selectable={true} style={this.styles.red}>{GF.rs(OFICI.versResp2, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text> : null}
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> {GF.respTogether(GF.rs(OFICI.resp2Part1, this.props.superTestMode, this.props.testErrorCB.bind(this)),GF.rs(OFICI.resp2Part2, this.props.superTestMode, this.props.testErrorCB.bind(this)))}</Text>
        </Text>
        <Text selectable={true} style={this.styles.red}>V.
          <Text selectable={true} style={this.styles.black}> {GF.rs(OFICI.resp2Part3, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        </Text>
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> {GF.rs(OFICI.resp2Part2, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        </Text>
      </View>
    )
  }

  lecturesDiumPasqua(LT, OFICI){
    return(
      <View>
        <Text selectable={true} style={this.styles.red}>Lectura primera</Text>
        <Text selectable={true} style={this.styles.black}>{GF.rs(OFICI.referencia1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {OFICI.cita1 !== '-' ? <Text selectable={true} style={this.styles.red}>{GF.rs(OFICI.cita1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text> : null}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenterBold}>{GF.rs(OFICI.titolLectura1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackJustified}>{GF.rs(OFICI.lectura1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {GF.rs(OFICI.ant1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{GF.rs(OFICI.titol1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.salm(GF.rs(OFICI.salm1, this.props.superTestMode, this.props.testErrorCB.bind(this)))}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria('1')}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {GF.rs(OFICI.ant1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackBold}>Preguem.</Text>
        <Text selectable={true} style={this.styles.black}>{GF.completeOracio(GF.rs(OFICI.oracio1, this.props.superTestMode, this.props.testErrorCB.bind(this)),false,LT)}</Text>
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> Amén.</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Lectura segona</Text>
        <Text selectable={true} style={this.styles.black}>{GF.rs(OFICI.referencia2, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {OFICI.cita2 !== '-' ? <Text selectable={true} style={this.styles.red}>{GF.rs(OFICI.cita2, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text> : null}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenterBold}>{GF.rs(OFICI.titolLectura2, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackJustified}>{GF.rs(OFICI.lectura2, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {GF.rs(OFICI.ant2, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{GF.rs(OFICI.titol2, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.salm(GF.rs(OFICI.salm2, this.props.superTestMode, this.props.testErrorCB.bind(this)))}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria('1')}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {GF.rs(OFICI.ant2, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackBold}>Preguem.</Text>
        <Text selectable={true} style={this.styles.black}>{GF.completeOracio(GF.rs(OFICI.oracio2, this.props.superTestMode, this.props.testErrorCB.bind(this)),false,LT)}</Text>
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> Amén.</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Lectura tercera</Text>
        <Text selectable={true} style={this.styles.black}>{GF.rs(OFICI.referencia3, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {OFICI.cita3 !== '-' ? <Text selectable={true} style={this.styles.red}>{GF.rs(OFICI.cita3, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text> : null}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenterBold}>{GF.rs(OFICI.titolLectura3, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackJustified}>{GF.rs(OFICI.lectura3, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {GF.rs(OFICI.ant3, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{GF.rs(OFICI.titol3, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.salm(GF.rs(OFICI.salm3, this.props.superTestMode, this.props.testErrorCB.bind(this)))}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria('1')}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {GF.rs(OFICI.ant3, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Lectura quarta</Text>
        <Text selectable={true} style={this.styles.black}>{GF.rs(OFICI.referencia4, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {OFICI.cita4 !== '-' ? <Text selectable={true} style={this.styles.red}>{GF.rs(OFICI.cita4, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text> : null}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenterBold}>{GF.rs(OFICI.titolLectura4, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.blackJustified}>{GF.rs(OFICI.lectura4, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
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
    return(<Text selectable={true} style={this.styles.black}>{GF.completeOracio(GF.rs(OFICI.oracio, this.props.superTestMode, this.props.testErrorCB.bind(this)),false,LT)}</Text>);
  }
}

AppRegistry.registerComponent('OficiDisplay', () => OficiDisplay);

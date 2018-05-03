import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Platform
} from 'react-native';
import HR from '../../../Components/HRComponent';
import GLOBAL from '../../../Globals/Globals';
import GF from '../../../Globals/GlobalFunctions';

export default class VespresDisplay extends Component {
  constructor(props){
    super(props);

    console.log("PlaceLog. VespresDisplay");

    var textSize = this.props.variables.textSize;

    this.styles = {
      black: {
        color: '#000000',
        fontSize: GF.convertTextSize(textSize),
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
      redItalic:{
        color: '#FF0000',
        fontSize: GF.convertTextSize(textSize),
        fontStyle: 'italic'
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
    VESPRES = this.props.liturgicProps.LITURGIA.vespres;
    const gloriaStringIntro = "Glòria al Pare i al Fill\ni a l’Esperit Sant.\nCom era al principi, ara i sempre\ni pels segles dels segles. Amén.";
    return (
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
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>HIMNE</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.himne(this.props.liturgicProps.LT, this.props.variables.date.getDay(), this.props.liturgicProps.setmana, VESPRES)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>SALMÒDIA</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.salmodia(this.props.liturgicProps.LT, this.props.liturgicProps.setmana, this.props.variables.date.getDay(), VESPRES)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>LECTURA BREU</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.lecturaBreu(this.props.liturgicProps.LT, VESPRES)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>RESPONSORI BREU</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.responsori(this.props.liturgicProps.LT, this.props.variables.date.getDay(), VESPRES)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>CÀNTIC DE MARIA</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.cantic(this.props.liturgicProps.LT, this.props.variables.date.getDay(), this.props.ABC, VESPRES)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>PREGÀRIES</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.pregaries(this.props.liturgicProps.LT, VESPRES)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>ORACIÓ</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.oracio(this.props.liturgicProps.LT, this.props.variables.date.getDay(), VESPRES)}
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> Amén.</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>CONCLUSIÓ</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>V.
          <Text selectable={true} style={this.styles.black}> Que el Senyor ens beneeixi i ens guardi de tot mal, i ens dugui a la vida eterna.</Text>
        </Text>
        <Text selectable={true} style={this.styles.red}>R.
          <Text selectable={true} style={this.styles.black}> Amén.</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {Platform.OS === 'android' ? null : <Text />}
      </View>
    );
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
    if(!g || !(g==='0'||g==='1')) {
      if(this.superTestMode){
        this.testErrorCB();
      }
      return null;
    }
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

  himne(LT, weekDay, setmana, VESPRES){
    return(<Text selectable={true} style={this.styles.black}>{GF.rs(VESPRES.himne, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>);
  }

  salmodia(LT, setmana, weekDay, VESPRES){
    return(
      <View>
        <Text selectable={true} style={this.styles.red}>Ant. 1.
          <Text selectable={true} style={this.styles.black}> {GF.rs(VESPRES.ant1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{GF.rs(VESPRES.titol1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {VESPRES.com1 !== '-' ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{GF.rs(VESPRES.com1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
        {this.salm(GF.rs(VESPRES.salm1, this.props.superTestMode, this.props.testErrorCB.bind(this)))}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria(VESPRES.gloria1)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 1.
          <Text selectable={true} style={this.styles.black}> {GF.rs(VESPRES.ant1, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 2.
          <Text selectable={true} style={this.styles.black}> {GF.rs(VESPRES.ant2, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{GF.rs(VESPRES.titol2, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {VESPRES.com2 !== '-' ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{GF.rs(VESPRES.com2, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
        {this.salm(GF.rs(VESPRES.salm2, this.props.superTestMode, this.props.testErrorCB.bind(this)))}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria(VESPRES.gloria2)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 2.
          <Text selectable={true} style={this.styles.black}> {GF.rs(VESPRES.ant2, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 3.
          <Text selectable={true} style={this.styles.black}> {GF.rs(VESPRES.ant3, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{GF.canticSpace(GF.rs(VESPRES.titol3, this.props.superTestMode, this.props.testErrorCB.bind(this)))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.salm(GF.rs(VESPRES.salm3, this.props.superTestMode, this.props.testErrorCB.bind(this)))}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria(VESPRES.gloria3)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 3.
          <Text selectable={true} style={this.styles.black}> {GF.rs(VESPRES.ant3, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        </Text>
      </View>
    );
  }

  lecturaBreu(LT, VESPRES){
    return(
      <View>
        <Text selectable={true} style={this.styles.red}>{GF.rs(VESPRES.vers, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.black}>{GF.rs(VESPRES.lecturaBreu, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
      </View>
    )
  }

  responsori(LT, weekDay, VESPRES){
    if(VESPRES.calAntEspecial){
      return(
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {GF.rs(VESPRES.antEspecialVespres, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        </Text>
      )
    }
    else{
      return(
        <View>
          <Text selectable={true} style={this.styles.red}>V.
            <Text selectable={true} style={this.styles.black}> {GF.respTogether(GF.rs(VESPRES.respBreu1, this.props.superTestMode, this.props.testErrorCB.bind(this)),GF.rs(VESPRES.respBreu2, this.props.superTestMode, this.props.testErrorCB.bind(this)))}</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>R.
            <Text selectable={true} style={this.styles.black}> {GF.respTogether(GF.rs(VESPRES.respBreu1, this.props.superTestMode, this.props.testErrorCB.bind(this)),GF.rs(VESPRES.respBreu2, this.props.superTestMode, this.props.testErrorCB.bind(this)))}</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>V.
            <Text selectable={true} style={this.styles.black}> {GF.rs(VESPRES.respBreu3, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>R.
            <Text selectable={true} style={this.styles.black}> {GF.rs(VESPRES.respBreu2, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>V.
            <Text selectable={true} style={this.styles.black}> Glòria al Pare i al Fill i a l'Esperit Sant.</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>R.
            <Text selectable={true} style={this.styles.black}> {GF.respTogether(GF.rs(VESPRES.respBreu1, this.props.superTestMode, this.props.testErrorCB.bind(this)),GF.rs(VESPRES.respBreu2, this.props.superTestMode, this.props.testErrorCB.bind(this)))}</Text>
          </Text>
        </View>
      )
    }
  }

  cantic(LT, weekDay, litYear, VESPRES){
    return(
      <View>
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {GF.rs(VESPRES.antCantic, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{"Càntic\nLc 1, 46-55\nLa meva ànima magnifica el Senyor"}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.salm(GF.rs(VESPRES.cantic, this.props.superTestMode, this.props.testErrorCB.bind(this)))}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria('1')}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {GF.rs(VESPRES.antCantic, this.props.superTestMode, this.props.testErrorCB.bind(this))}</Text>
        </Text>
      </View>
    );
  }

  convertN(pregs,papa,bisbe){
    if(pregs.search("papa N.") !== -1){
      pregs = pregs.replace("papa N.","papa "+papa);
    }
    else if(pregs.search("Papa N.") !== -1){
      pregs = pregs.replace("Papa N.","papa "+papa);
    }
    if(pregs.search("bisbe N.") !== -1){
      pregs = pregs.replace("bisbe N.","bisbe "+bisbe);
    }
    return pregs;
  }

  pregaries(LT, VESPRES){
    var allPregs = GF.rs(VESPRES.pregaries, this.props.superTestMode, this.props.testErrorCB.bind(this));

    if(allPregs === null || allPregs === undefined || allPregs === '' || allPregs === '-')
      return(<Text selectable={true} style={this.styles.black}>{"-"}</Text>);

    allPregs = this.convertN(allPregs, VESPRES.papa, VESPRES.bisbe);

    if(allPregs.match(/—/g, "")) var numGuio = allPregs.match(/—/g, "").length;
    else return(<Text selectable={true} style={this.styles.black}>{allPregs}</Text>);
    if(allPregs.match(/\n/g, "")) var numEnter = allPregs.match(/\n/g, "").length;
    else return(<Text selectable={true} style={this.styles.black}>{allPregs}</Text>);

    if(numEnter !== numGuio*3+3){//every prayer have 3 spaces and intro have 3 more
      console.log("InfoLog. incorrect spaces in pregaries");
      return(<Text selectable={true} style={this.styles.black}>{allPregs}</Text>);
    }
    else{
      var introPregs = allPregs.split(":")[0];
      if(allPregs.search(introPregs+':') !== -1){
        var pregsNoIntro = allPregs.replace(introPregs+':','');
        if(pregsNoIntro !== ''){
          while(pregsNoIntro.charAt(0) === '\n' || pregsNoIntro.charAt(0) === ' '){
            pregsNoIntro = pregsNoIntro.substring(1,pregsNoIntro.length);
          }
        }
      }
      else{
        console.log("InfoLog. something incorrect. Pregaries 1");
        return(<Text selectable={true} style={this.styles.black}>{allPregs}</Text>);
      }

      var respPregs = pregsNoIntro.split("\n")[0];
      if(pregsNoIntro.search(respPregs+'\n\n') !== -1){
        var pregaries = pregsNoIntro.replace(respPregs+'\n\n','');
      }
      else{
        console.log("InfoLog. something incorrect. Pregaries 2");
        return(<Text selectable={true} style={this.styles.black}>{allPregs}</Text>);
      }

      if(pregaries.search(": Pare nostre.") !== -1){
        pregaries = pregaries.replace(": Pare nostre.",':');
      }
      else{
        if(pregaries.search(":  Pare nostre.") !== -1){
          pregaries = pregaries.replace(":  Pare nostre.",':');
        }
        else{
          console.log("InfoLog. something incorrect. Pregaries 3");
          return(<Text selectable={true} style={this.styles.black}>{allPregs}</Text>);
        }
      }

      var pregsFinalPart = (pregaries.split("—")[numGuio-1]).split(".\n\n")[1]+'—'+pregaries.split("—")[numGuio];
      if(pregaries.search('\n\n'+pregsFinalPart) !== -1){
        pregaries = pregaries.replace('\n\n'+pregsFinalPart,'');
      }
      else{
        console.log("InfoLog. something incorrect. Pregaries 4");
        return(<Text selectable={true} style={this.styles.black}>{allPregs}</Text>);
      }
    }

      return(
        <View>
          <Text selectable={true} style={this.styles.black}>{introPregs}{':'}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.blackItalic}>{respPregs}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.black}>{pregaries}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.redItalic}>{"Aquí es poden afegir altres intencions."}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.black}>{pregsFinalPart}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.blackItalic}>{"Pare nostre."}</Text>
        </View>
      );
  }

  oracio(LT, weekDay, VESPRES){
    return(<Text selectable={true} style={this.styles.black}>{GF.completeOracio(GF.rs(VESPRES.oracio, this.props.superTestMode, this.props.testErrorCB.bind(this)),false,LT)}</Text>);
  }
}

AppRegistry.registerComponent('VespresDisplay', () => VespresDisplay);

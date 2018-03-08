import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Platform,
  TouchableOpacity
} from 'react-native';
import HR from '../../../Components/HRComponent';
import GLOBAL from '../../../Globals/Globals';
import GF from '../../../Globals/GlobalFunctions';

export default class LaudesDisplay extends Component {
  constructor(props){
    super(props);

    console.log("PlaceLog. LaudesDisplay");

    var textSize = props.variables.textSize;

    this.state = {
      invitatori: false
    }

    this.styles = {
      black: {
        color: '#000000',
        fontSize: GF.convertTextSize(textSize),
      },
      invitatoriButton: {
        color: 'grey',
        fontSize: GF.convertTextSize(textSize)-3,
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

    this.LAUDES = props.liturgicProps.LITURGIA.laudes;
    this.liturgicProps = props.liturgicProps;
    this.variables = props.variables;
    this.superTestMode = props.superTestMode;
    this.testErrorCB = props.testErrorCB;
  }

  render() {
    return (
      <View>
        {this.introduccio(this.liturgicProps.LT, this.liturgicProps.setmana)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>HIMNE</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.himne(this.liturgicProps.LT, this.variables.date.getDay(), this.liturgicProps.setmana)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>SALMÒDIA</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.salmodia(this.liturgicProps.LT, this.liturgicProps.setmana, this.variables.date.getDay())}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>LECTURA BREU</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.lecturaBreu(this.liturgicProps.LT)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>RESPONSORI BREU</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.responsori(this.liturgicProps.LT)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>CÀNTIC DE ZACARIES</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.cantic(this.liturgicProps.LT, this.variables.date.getDay(), this.liturgicProps.ABC)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>PREGÀRIES</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.pregaries(this.liturgicProps.LT)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <HR/>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>ORACIÓ</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.oracio(this.liturgicProps.LT, this.variables.date.getDay())}
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

    if(this.variables.cleanSalm === 'false'){
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
    if(this.variables.cleanSalm === 'false')
      gloriaString = "Glòria al Pare i al Fill    \ni a l’Esperit Sant.\nCom era al principi, ara i sempre    \ni pels segles dels segles. Amén.";

    if(g === '1'){
      if(true === true){ //TODO: tenir en compte els ajustaments
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

  _invitatoriButton(){
    return(
      <View>
        <TouchableOpacity onPress={() => this.setState({invitatori: !this.state.invitatori})}>
          <View style={{alignItems: 'center',paddingVertical: 10}}>
            <Text style={this.styles.invitatoriButton}>{this.state.invitatori?"Amagar":"Començar amb"}{" l'invitatori"}</Text>
          </View>
        </TouchableOpacity>
        {this.state.invitatori?
          <View>
            <Text selectable={true} style={this.styles.red}>{"INVITATORI"}</Text>
              {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          </View>
          :null
        }
      </View>
    );
  }

  introduccio(LT, setmana){
    const gloriaStringIntro = "Glòria al Pare i al Fill\ni a l’Esperit Sant.\nCom era al principi, ara i sempre\ni pels segles dels segles. Amén.";

    if(!this.LAUDES.diumPasqua && !this.state.invitatori/*this.LAUDES.invitatori !== "Laudes"*/){
      return(
        <View>
          {this._invitatoriButton()}
          <Text selectable={true} style={this.styles.red}>V.
            <Text selectable={true} style={this.styles.black}> Sigueu amb nosaltres, Déu nostre.</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>R.
            <Text selectable={true} style={this.styles.black}> Senyor, veniu a ajudar-nos.</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.black}>{gloriaStringIntro}
            {this.liturgicProps.LT !== GLOBAL.Q_CENDRA && this.liturgicProps.LT !== GLOBAL.Q_SETMANES && this.liturgicProps.LT !== GLOBAL.Q_DIUM_RAMS && this.liturgicProps.LT !== GLOBAL.Q_SET_SANTA && this.liturgicProps.LT !== GLOBAL.Q_TRIDU ?
              <Text selectable={true} style={this.styles.black}> Al·leluia</Text> : null
            }
          </Text>
        </View>
      )
    }
    else{
      return(
        <View>
          {!this.LAUDES.diumPasqua?
            <View>{this._invitatoriButton()}</View>
            : null
          }
          <Text selectable={true} style={this.styles.red}>V.
            <Text selectable={true} style={this.styles.black}> Obriu-me els llavis, Senyor.</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>R.
            <Text selectable={true} style={this.styles.black}> I proclamaré la vostra lloança.</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <HR/>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>Ant.
            <Text selectable={true} style={this.styles.black}> {GF.rs(this.LAUDES.antInvitatori, this.superTestMode, this.testErrorCB.bind(this))}</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.redCenter}>{"Salm 94\nInvitació a lloar Déu"}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{"Mentre repetim aquell «avui», exhortem-nos cada dia els uns als altres (He 3, 13)"}</Text></View></View>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          {this.salm(GF.rs(this.LAUDES.salm94, this.superTestMode, this.testErrorCB.bind(this)))}
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          {this.gloria('1')}
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>Ant.
            <Text selectable={true} style={this.styles.black}> {GF.rs(this.LAUDES.antInvitatori, this.superTestMode, this.testErrorCB.bind(this))}</Text>
          </Text>
        </View>
      )
    }
  }

  himne(LT, weekDay, setmana){
    return(<Text selectable={true} style={this.styles.black}>{GF.rs(this.LAUDES.himne, this.superTestMode, this.testErrorCB.bind(this))}</Text>);
  }

  salmodia(LT, setmana, weekDay){
    return(
      <View>
        <Text selectable={true} style={this.styles.red}>Ant. 1.
          <Text selectable={true} style={this.styles.black}> {GF.rs(this.LAUDES.ant1, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{GF.rs(this.LAUDES.titol1, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.LAUDES.com1 !== '-' ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{GF.rs(this.LAUDES.com1, this.superTestMode, this.testErrorCB.bind(this))}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
        {this.salm(GF.rs(this.LAUDES.salm1, this.superTestMode, this.testErrorCB.bind(this)))}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria(this.LAUDES.gloria1)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 1.
          <Text selectable={true} style={this.styles.black}> {GF.rs(this.LAUDES.ant1, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 2.
          <Text selectable={true} style={this.styles.black}> {GF.rs(this.LAUDES.ant2, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{GF.canticSpace(GF.rs(this.LAUDES.titol2, this.superTestMode, this.testErrorCB.bind(this)))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.LAUDES.com2 !== '-' ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{GF.rs(this.LAUDES.com2, this.superTestMode, this.testErrorCB.bind(this))}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
        {this.salm(GF.rs(this.LAUDES.salm2, this.superTestMode, this.testErrorCB.bind(this)))}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria(this.LAUDES.gloria2)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 2.
          <Text selectable={true} style={this.styles.black}> {GF.rs(this.LAUDES.ant2, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 3.
          <Text selectable={true} style={this.styles.black}> {GF.rs(this.LAUDES.ant3, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{GF.rs(this.LAUDES.titol3, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.LAUDES.com3 !== '-' ?
          <View style={{flexDirection: 'row'}}><View style={{flex:1}}/><View style={{flex:2}}>
          <Text selectable={true} style={this.styles.blackSmallItalicRight}>{GF.rs(this.LAUDES.com3, this.superTestMode, this.testErrorCB.bind(this))}</Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}</View></View> : null}
        {this.salm(GF.rs(this.LAUDES.salm3, this.superTestMode, this.testErrorCB.bind(this)))}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria(this.LAUDES.gloria3)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant. 3.
          <Text selectable={true} style={this.styles.black}> {GF.rs(this.LAUDES.ant3, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        </Text>
      </View>
    );
  }

  lecturaBreu(LT){
    return(
      <View>
        <Text selectable={true} style={this.styles.red}>{GF.rs(this.LAUDES.vers, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.black}>{GF.rs(this.LAUDES.lecturaBreu, this.superTestMode, this.testErrorCB.bind(this))}</Text>
      </View>
    )
  }

  responsori(LT){
    if(this.LAUDES.calAntEspecial){
      return(
        <View>
          <Text selectable={true} style={this.styles.red}>Ant.
            <Text selectable={true} style={this.styles.black}> {GF.rs(this.LAUDES.antEspecialLaudes, this.superTestMode, this.testErrorCB.bind(this))}</Text>
          </Text>
        </View>
      )
    }
    else{
      return(
        <View>
          <Text selectable={true} style={this.styles.red}>V.
            <Text selectable={true} style={this.styles.black}> {GF.respTogether(GF.rs(this.LAUDES.respBreu1, this.superTestMode, this.testErrorCB.bind(this)),GF.rs(this.LAUDES.respBreu2, this.superTestMode, this.testErrorCB.bind(this)))}</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>R.
            <Text selectable={true} style={this.styles.black}> {GF.respTogether(GF.rs(this.LAUDES.respBreu1, this.superTestMode, this.testErrorCB.bind(this)),GF.rs(this.LAUDES.respBreu2, this.superTestMode, this.testErrorCB.bind(this)))}</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>V.
            <Text selectable={true} style={this.styles.black}> {GF.rs(this.LAUDES.respBreu3, this.superTestMode, this.testErrorCB.bind(this))}</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>R.
            <Text selectable={true} style={this.styles.black}> {GF.rs(this.LAUDES.respBreu2, this.superTestMode, this.testErrorCB.bind(this))}</Text>
          </Text>
          {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
          <Text selectable={true} style={this.styles.red}>V.
            <Text selectable={true} style={this.styles.black}> Glòria al Pare i al Fill i a l'Esperit Sant.</Text>
          </Text>
          <Text selectable={true} style={this.styles.red}>R.
            <Text selectable={true} style={this.styles.black}> {GF.respTogether(GF.rs(this.LAUDES.respBreu1, this.superTestMode, this.testErrorCB.bind(this)),GF.rs(this.LAUDES.respBreu2, this.superTestMode, this.testErrorCB.bind(this)))}</Text>
          </Text>
        </View>
      )
    }
  }

  cantic(LT, weekDay, litYear){
    return(
      <View>
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {GF.rs(this.LAUDES.antCantic, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        </Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.redCenter}>{"Càntic\nLc 1, 68-79\nEl Messies i el seu Precursor"}</Text>
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.salm(this.LAUDES.cantic)}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        {this.gloria('1')}
        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
        <Text selectable={true} style={this.styles.red}>Ant.
          <Text selectable={true} style={this.styles.black}> {GF.rs(this.LAUDES.antCantic, this.superTestMode, this.testErrorCB.bind(this))}</Text>
        </Text>
      </View>
    );
  }

  convertN(pregs,papa,bisbe){ //desconec si a Laudes existeix aquest cas
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

  pregaries(LT){
    var allPregs = GF.rs(this.LAUDES.pregaries, this.superTestMode, this.testErrorCB.bind(this));

    if(allPregs === null || allPregs === undefined || allPregs === '' || allPregs === '-')
      return(<Text selectable={true} style={this.styles.black}>{"-"}</Text>);

      allPregs = this.convertN(allPregs, this.LAUDES.papa, this.LAUDES.bisbe);

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
      // console.log("introPregs: " + introPregs);
      // console.log("allPregs:\n" + allPregs);
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
        console.log("InfoLog. something incorrect. Pregaries 3");
        return(<Text selectable={true} style={this.styles.black}>{allPregs}</Text>);
      }

      var pregsFinalPart = pregaries.split("—")[numGuio].split(".\n\n")[1];
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

  oracio(LT, weekDay){
    return(<Text selectable={true} style={this.styles.black}>{GF.completeOracio(GF.rs(this.LAUDES.oracio, this.superTestMode, this.testErrorCB.bind(this)),false,LT)}</Text>);
  }
}

AppRegistry.registerComponent('LaudesDisplay', () => LaudesDisplay);

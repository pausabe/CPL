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
  render() {
    return (
      <View>
        {this.introduccio(this.props.LT, this.props.setmana)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>HIMNE</Text>
        <Text />
        {this.himne(this.props.LT, this.props.weekDay, false, this.props.setmana)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>SALMÒDIA</Text>
        <Text />
        {this.salmodia(this.props.LT, this.props.setmana, this.props.weekDay, this.props.cicle)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>VERS</Text>
        <Text />
        {this.vers(this.props.LT)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>LECTURES</Text>
        <Text />
        {this.lectures(this.props.LT)}
        <Text />
        {this.himneOhDeu(this.props.LT, this.props.weekDay)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>ORACIÓ</Text>
        <Text />
        <Text style={GLOBAL.styles.blackBold}>Preguem.</Text>
        {this.oracio(this.props.LT, this.props.weekDay)}
        <Text />
        <Hr lineColor='#CFD8DC' />
        <Text />
        <Text style={GLOBAL.styles.red}>CONCLUSIÓ</Text>
        <Text />
        <Text style={GLOBAL.styles.red}>V.
          <Text style={GLOBAL.styles.black}> Beneïm al Senyor.</Text>
        </Text>
        <Text style={GLOBAL.styles.red}>R.
          <Text style={GLOBAL.styles.black}> Donem gràcies a Déu.</Text>
        </Text>
        <Text />
      </View>
    );
  }

  gloria(g){
    const gloriaString = "Glòria al Pare i al Fill    *\ni a l’Esperit Sant.\nCom era al principi, ara i sempre    *\ni pels segles dels segles. Amén.";

    if(g === '1'){
      if(true === true){ //TODO: tenir en compte els ajustaments
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

  introduccio(LT, setmana){
    const gloriaStringIntro = "Glòria al Pare i al Fill\ni a l’Esperit Sant.\nCom era al principi, ara i sempre\ni pels segles dels segles. Amén.";

    if(this.props.OFICI.invitatori !== "Ofici"){
      return(
        <View>
          <Text style={GLOBAL.styles.red}>V.
            <Text style={GLOBAL.styles.black}> Sigueu amb nosaltres, Déu nostre.</Text>
          </Text>
          <Text style={GLOBAL.styles.red}>R.
            <Text style={GLOBAL.styles.black}> Senyor, veniu a ajudar-nos.</Text>
          </Text>
          <Text />
          <Text style={GLOBAL.styles.black}>{gloriaStringIntro}
            {this.props.LT !== GLOBAL.Q_CENDRA && this.props.LT !== GLOBAL.Q_SETMANES && this.props.LT !== GLOBAL.Q_DIUM_RAMS && this.props.LT !== GLOBAL.Q_SET_SANTA && this.props.LT !== GLOBAL.Q_TRIDU ?
              <Text style={GLOBAL.styles.black}> Al·leluia</Text> : null
            }
          </Text>
        </View>
      )
    }
    else{
      return(
        <View>
          <Text style={GLOBAL.styles.red}>V.
            <Text style={GLOBAL.styles.black}> Obriu-me els llavis, Senyor.</Text>
          </Text>
          <Text style={GLOBAL.styles.red}>R.
            <Text style={GLOBAL.styles.black}> I proclamaré la vostra lloança.</Text>
          </Text>
          <Text />
          <Hr lineColor='#CFD8DC' />
          <Text />
          <Text style={GLOBAL.styles.red}>Ant.
            <Text style={GLOBAL.styles.black}> {this.props.OFICI.antInvitatori}</Text>
          </Text>
          <Text />
          <Text style={GLOBAL.styles.redCenter}>{"Salm 94\nInvitació a lloar Déu"}</Text>
          <Text />
          <Text style={GLOBAL.styles.blackSmallItalicRight}>{"Mentre repetim aquell «avui», exhortem-nos cada dia els uns als altres (He 3, 13)"}</Text>
          <Text />
          <Text style={GLOBAL.styles.black}>{this.props.OFICI.salm94}</Text>
          <Text />
          {this.gloria('1')}
          <Text />
          <Text style={GLOBAL.styles.red}>Ant.
            <Text style={GLOBAL.styles.black}> {this.props.OFICI.antInvitatori}</Text>
          </Text>
        </View>
      )
    }
  }

  himne(LT, weekDay, nit, setmana){
    return(<Text style={GLOBAL.styles.black}>{this.props.OFICI.himne}</Text>);
  }

  salmodia(LT, setmana, weekDay, cicle){
    console.log("vamoh a ver: " + this.props.OFICI.titol1);
    return(
      <View>
        <Text style={GLOBAL.styles.red}>Ant. 1.
          <Text style={GLOBAL.styles.black}> {this.props.OFICI.ant1}</Text>
        </Text>
        <Text />
        <Text style={GLOBAL.styles.redCenter}>{this.props.OFICI.titol1}</Text>
        <Text />
        {this.props.OFICI.com1 !== '-' ?
          <View><Text style={GLOBAL.styles.blackSmallItalicRight}>{this.props.OFICI.com1}</Text><Text /></View> : null}
        <Text style={GLOBAL.styles.black}>{this.props.OFICI.salm1}</Text>
        <Text />
        {this.gloria(this.props.OFICI.gloria1)}
        <Text />
        <Text style={GLOBAL.styles.red}>Ant. 1.
          <Text style={GLOBAL.styles.black}> {this.props.OFICI.ant1}</Text>
        </Text>
        <Text />
        <Text style={GLOBAL.styles.red}>Ant. 2.
          <Text style={GLOBAL.styles.black}> {this.props.OFICI.ant2}</Text>
        </Text>
        <Text />
        <Text style={GLOBAL.styles.redCenter}>{this.props.OFICI.titol2}</Text>
        <Text />
        {this.props.OFICI.com2 !== '-' ?
          <View><Text style={GLOBAL.styles.blackSmallItalicRight}>{this.props.OFICI.com2}</Text><Text /></View> : null}
        <Text style={GLOBAL.styles.black}>{this.props.OFICI.salm2}</Text>
        <Text />
        {this.gloria(this.props.OFICI.gloria2)}
        <Text />
        <Text style={GLOBAL.styles.red}>Ant. 2.
          <Text style={GLOBAL.styles.black}> {this.props.OFICI.ant2}</Text>
        </Text>
        <Text />
        <Text style={GLOBAL.styles.red}>Ant. 3.
          <Text style={GLOBAL.styles.black}> {this.props.OFICI.ant3}</Text>
        </Text>
        <Text />
        <Text style={GLOBAL.styles.redCenter}>{this.props.OFICI.titol3}</Text>
        <Text />
        {this.props.OFICI.com3 !== '-' ?
          <View><Text style={GLOBAL.styles.blackSmallItalicRight}>{this.props.OFICI.com3}</Text><Text /></View> : null}
        <Text style={GLOBAL.styles.black}>{this.props.OFICI.salm3}</Text>
        <Text />
        {this.gloria(this.props.OFICI.gloria3)}
        <Text />
        <Text style={GLOBAL.styles.red}>Ant. 3.
          <Text style={GLOBAL.styles.black}> {this.props.OFICI.ant3}</Text>
        </Text>
      </View>
    );
  }

  vers(LT){
    return(
      <View>
        <Text style={GLOBAL.styles.red}>V.
          <Text style={GLOBAL.styles.black}> {this.props.OFICI.respV}</Text>
        </Text>
        <Text style={GLOBAL.styles.red}>R.
          <Text style={GLOBAL.styles.black}> {this.props.OFICI.respR}</Text>
        </Text>
      </View>
    );
  }

  lectures(LT){
    return(
      <View>
        <Text style={GLOBAL.styles.red}>Primera lectura</Text>
        <Text style={GLOBAL.styles.black}>{this.props.OFICI.referencia1}
          <Text style={GLOBAL.styles.red}> {this.props.OFICI.cita1}</Text></Text>
        <Text />
        <Text style={GLOBAL.styles.redCenterBold}>{this.props.OFICI.titolLectura1}</Text>
        <Text />
        <Text style={GLOBAL.styles.black}>{this.props.OFICI.lectura1}</Text>
        <Text />
        <Text style={GLOBAL.styles.red}>Responsori
          <Text style={GLOBAL.styles.redSmallItalicRight}> {this.props.OFICI.citaResp1}</Text>
        </Text>
        <Text style={GLOBAL.styles.red}>R.
          <Text style={GLOBAL.styles.black}> {this.props.OFICI.resp1Part1} {this.props.OFICI.resp1Part2}</Text>
        </Text>
        <Text style={GLOBAL.styles.red}>V.
          <Text style={GLOBAL.styles.black}> {this.props.OFICI.resp1Part3} {this.props.OFICI.resp1Part2}</Text>
        </Text>
        <Text />
        <Text style={GLOBAL.styles.red}>Segona lectura</Text>
        <Text style={GLOBAL.styles.black}>{this.props.OFICI.referencia2}
          <Text style={GLOBAL.styles.red}> {this.props.OFICI.cita2}</Text></Text>
        <Text />
        <Text style={GLOBAL.styles.redCenterBold}>{this.props.OFICI.titolLectura2}</Text>
        <Text />
        <Text style={GLOBAL.styles.black}>{this.props.OFICI.lectura2}</Text>
        <Text />
        <Text style={GLOBAL.styles.red}>Responsori
          <Text style={GLOBAL.styles.redSmallItalicRight}>  {this.props.OFICI.versResp2}</Text>
        </Text>
        <Text style={GLOBAL.styles.red}>R.
          <Text style={GLOBAL.styles.black}> {this.props.OFICI.resp2Part1} {this.props.OFICI.resp2Part2}</Text>
        </Text>
        <Text style={GLOBAL.styles.red}>V.
          <Text style={GLOBAL.styles.black}>  {this.props.OFICI.resp2Part3} {this.props.OFICI.resp2Part2}</Text>
        </Text>
      </View>
    )
  }

  himneOhDeu(LT, weekDay){
    if(this.props.OFICI.himneOhDeuBool){
      return(
        <View>
          <Hr lineColor='#CFD8DC' />
          <Text />
          <Text style={GLOBAL.styles.red}>HIMNE</Text>
          <Text />
          <Text style={GLOBAL.styles.black}>{this.props.OFICI.himneOhDeu}</Text>
          <Text />
        </View>
      )
    }
  }

  oracio(LT, weekDay){
    return(<Text style={GLOBAL.styles.black}>{this.props.OFICI.oracio}</Text>);
  }
}

AppRegistry.registerComponent('OficiDisplay', () => OficiDisplay);

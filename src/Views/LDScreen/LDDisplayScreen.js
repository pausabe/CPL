import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';

import GF from '../../Globals/GlobalFunctions';
import HR from '../../Components/HRComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import GLOBAL from "../../Globals/Globals";

export default class LDDisplayScreen extends Component {
    //PREVIEWS --------------------------------------------------------------------------
    UNSAFE_componentWillMount() {
        this.screen_props = this.props.navigation.state.params.props;
        this.eventEmitter = this.screen_props.events;

        this.setState({
            Need_Lect2: this.screen_props.need_lectura2,
            VetllaPasquaLecturesSalms: this.screen_props.type === 'VetllaPasquaLecturesSalms',
            VetllaPasquaEvangeli: this.screen_props.type === 'VetllaPasquaEvangeli',
            Rams: this.screen_props.type === 'Rams',
            Lect1: this.screen_props.type === '1Lect',
            Salm: this.screen_props.type === 'Salm',
            Lect2: this.screen_props.type === '2Lect',
            Evangeli: this.screen_props.type === 'Evangeli',
            DisplayVespers: this.screen_props.useVespersTexts,
            evangeliType: 'normal'
        })
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle:
            <View style={{ paddingLeft: 100 }}>
                <Text style={{
                    textAlign: 'center',
                    color: GLOBAL.itemsBarColor,
                    fontSize: 20,
                    fontWeight: '600',
                }}>{navigation.state.params.props.type}</Text>
            </View>,
        headerStyle: {
            backgroundColor: GLOBAL.barColor,
        },
        /*headerRight: <TouchableOpacity
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}
            onPress={() => {
                navigation.state.params.props.emitShareCB();
            }}>
            <View style={{ flex: 1, paddingRight: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Icon
                    name="ios-share"
                    size={30}
                    color="#FFFFFF" />
            </View>
        </TouchableOpacity>,*/
    });

    //CONSTRUCTOR --------------------------------------------------------------------------
    constructor(props) {
        super(props);

        this.styles = {
            container: {
                flex: 1,
            },
            black: {
                color: '#000000',
                fontSize: GF.convertTextSize(G_VALUES.textSize),
            },
            continueButton: {
                color: 'grey',
                fontSize: GF.convertTextSize(G_VALUES.textSize) - 3,
            },
            textContinueButton: {
                color: 'grey',
                fontSize: GF.convertTextSize(G_VALUES.textSize) > 17 ? 17 : GF.convertTextSize(G_VALUES.textSize) - 3,
            },
            texSalmInvButtonBold: {
                color: 'grey',
                fontSize: GF.convertTextSize(G_VALUES.textSize) > 17 ? 17 : GF.convertTextSize(G_VALUES.textSize) - 3,
                fontWeight: 'bold',
            },
            blackJustified: {
                color: '#000000',
                fontSize: GF.convertTextSize(G_VALUES.textSize),
                textAlign: 'justify',
            },
            blackBold: {
                color: '#000000',
                fontSize: GF.convertTextSize(G_VALUES.textSize),
                fontWeight: 'bold',
            },
            blackItalic: {
                color: '#000000',
                fontSize: GF.convertTextSize(G_VALUES.textSize),
                fontStyle: 'italic'
            },
            blackSmallItalicRight: {
                color: '#000000',
                fontSize: GF.convertTextSize(G_VALUES.textSize) - 2,
                fontStyle: 'italic',
                textAlign: 'right'
            },
            red: {
                color: '#FF0000',
                fontSize: GF.convertTextSize(G_VALUES.textSize),
            },
            redItalic: {
                color: '#FF0000',
                fontSize: GF.convertTextSize(G_VALUES.textSize),
                fontStyle: 'italic'
            },
            redCenter: {
                color: '#FF0000',
                fontSize: GF.convertTextSize(G_VALUES.textSize),
                textAlign: 'center'
            },
            redCenterBold: {
                color: '#FF0000',
                fontSize: GF.convertTextSize(G_VALUES.textSize),
                textAlign: 'center',
                fontWeight: 'bold',
            },
            redSmallItalicRight: {
                color: '#FF0000',
                fontSize: GF.convertTextSize(G_VALUES.textSize) - 2,
                fontStyle: 'italic',
                textAlign: 'right'
            },
            textButton: {
                color: 'grey',
                fontSize: GF.convertTextSize(G_VALUES.textSize) > 17 ? 17 : GF.convertTextSize(G_VALUES.textSize) - 3,
            },
            textButtonBold: {
                color: 'grey',
                fontSize: GF.convertTextSize(G_VALUES.textSize) > 17 ? 17 : GF.convertTextSize(G_VALUES.textSize) - 3,
                fontWeight: 'bold',
            },
        }
    }

    //CALLBACKS ----------------------------------------------------------------------------
    saveShareTextCB(shareText) {
        this.screen_props.saveSharedTextCB(shareText);
    }

    //RENDER -------------------------------------------------------------------------------
    render() {
        try {
            console.log("this.state.DisplayVespers", this.state.DisplayVespers);

            return (
                <View style={this.styles.container}>
                    <ScrollView automaticallyAdjustContentInsets={false} style={{ padding: 10, }}>
                        <View style={{ flex: 1 }}>
                            {this.state.VetllaPasquaLecturesSalms ?
                                <View>
                                    <Text selectable={true} style={this.styles.redCenter}>{"Lectures de la Vetlla Pasqual"}</Text>
                                    {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                                    {this.Render_VetllaPasquaLecturesSalms()}
                                </View>
                                : null}
                            {this.state.VetllaPasquaEvangeli ?
                                this.Render_VetllaPasquaEvangeli()
                                : null}
                            {this.state.Rams ?
                                this.Render_Rams()
                                : null}
                            {this.state.Lect1 ?
                                this.Render_1Lect()
                                : null}
                            {this.state.Salm ?
                                this.Render_Salm(this.state.Need_Lect2)
                                : null}
                            {this.state.Lect2 ?
                                this.Render_2Lect()
                                : null}
                            {this.state.Evangeli ?
                                this.Render_Evangeli()
                                : null}
                            {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                            {Platform.OS === 'android' ? null : <Text />}
                        </View>
                    </ScrollView>
                </View>
            )
        }
        catch (error) {
            console.log("Error: ", error);
            return null;
        }
    }

    Render_VetllaPasquaLecturesSalms() {
        return (
            <View style={{ flex: 1 }}>
                <Text selectable={true} style={this.styles.red}>{"Lectura primera "}{LD_VALUES.Lectura1}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackItalic}>{LD_VALUES.Lectura1Cita}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.black}>{LD_VALUES.Lectura1Titol}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackJustified}>{LD_VALUES.Lectura1Text}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.red}>{"Salm responsorial "}{LD_VALUES.Salm1}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackJustified}>{LD_VALUES.Salm1Text}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.red}>{"Lectura segona "}{LD_VALUES.Lectura2}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackItalic}>{LD_VALUES.Lectura2Cita}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.black}>{LD_VALUES.Lectura2Titol}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackJustified}>{LD_VALUES.Lectura2Text}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.red}>{"Salm responsorial "}{LD_VALUES.Salm2}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackJustified}>{LD_VALUES.Salm2Text}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.red}>{"Lectura tercera "}{LD_VALUES.Lectura3}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackItalic}>{LD_VALUES.Lectura3Cita}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.black}>{LD_VALUES.Lectura3Titol}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackJustified}>{LD_VALUES.Lectura3Text}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.red}>{"Salm responsorial "}{LD_VALUES.Salm3}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackJustified}>{LD_VALUES.Salm3Text}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.red}>{"Lectura quarta "}{LD_VALUES.Lectura4}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackItalic}>{LD_VALUES.Lectura4Cita}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.black}>{LD_VALUES.Lectura4Titol}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackJustified}>{LD_VALUES.Lectura4Text}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.red}>{"Salm responsorial "}{LD_VALUES.Salm4}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackJustified}>{LD_VALUES.Salm4Text}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.red}>{"Lectura cinquena "}{LD_VALUES.Lectura5}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackItalic}>{LD_VALUES.Lectura5Cita}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.black}>{LD_VALUES.Lectura5Titol}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackJustified}>{LD_VALUES.Lectura5Text}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.red}>{"Salm responsorial "}{LD_VALUES.Salm5}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackJustified}>{LD_VALUES.Salm5Text}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.red}>{"Lectura sisena "}{LD_VALUES.Lectura6}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackItalic}>{LD_VALUES.Lectura6Cita}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.black}>{LD_VALUES.Lectura6Titol}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackJustified}>{LD_VALUES.Lectura6Text}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.red}>{"Salm responsorial "}{LD_VALUES.Salm6}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackJustified}>{LD_VALUES.Salm6Text}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.red}>{"Lectura setena "}{LD_VALUES.Lectura7}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackItalic}>{LD_VALUES.Lectura7Cita}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.black}>{LD_VALUES.Lectura7Titol}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackJustified}>{LD_VALUES.Lectura7Text}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.red}>{"Salm responsorial "}{LD_VALUES.Salm7}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackJustified}>{LD_VALUES.Salm7Text}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}

                <Text selectable={true} style={this.styles.red}>{"Glòria"}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                {this.GloriaText()}
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}

                <Text selectable={true} style={this.styles.red}>{"Lectura de l'apòstol "}{LD_VALUES.LecturaApostol}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackItalic}>{LD_VALUES.LecturaApostolCita}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.black}>{LD_VALUES.LecturaApostolTitol}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackJustified}>{LD_VALUES.LecturaApostolText}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}

                {this.state.VetllaPasquaEvangeli ?
                    <View>
                        <HR />
                        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                    </View>
                    :
                    <TouchableOpacity onPress={() => this.setState({ VetllaPasquaEvangeli: true })}>
                        <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                            <Text style={this.styles.continueButton}>{"Continua amb l'Evangeli"}</Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        )
    }

    Render_VetllaPasquaEvangeli() {
        return (
            <View style={{ flex: 1 }}>
                <Text selectable={true} style={this.styles.red}>{"Evangeli"}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.red}>{"Al·leluia. "}{LD_VALUES.Alleluia}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.black}>{LD_VALUES.AlleluiaText}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.red}>{LD_VALUES.Evangeli}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackItalic}>{LD_VALUES.EvangeliCita}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.black}>{LD_VALUES.EvangeliTitol}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackJustified}>{LD_VALUES.EvangeliText}</Text>
            </View>
        )
    }

    Render_Rams() {
        var evangeliRams = "";
        var evangeliCitaRams = "";
        var evangeliTitolRams = "";
        var evangeliTextRams = "";

        switch (G_VALUES.ABC) {
            case "A":
                evangeliRams = "Mt 21,1-11";
                evangeliCitaRams = "Beneït el qui ve en nom del Senyor";
                evangeliTitolRams = "Lectura de l’evangeli segons sant Mateu";
                evangeliTextRams = "Quan eren prop de Jerusalem, arribaren a Betfagé, a la muntanya de les Oliveres. Allà Jesús envià dos deixebles amb aquest encàrrec: «Aneu al poble d’aquí al davant, i trobareu tot seguit una somera fermada, amb el seu pollí. Deslligueu-la i porteu-me’ls. Si algú us deia res, responeu-li que el Senyor els ha de menester, però els tornarà de seguida».\nTot això va succeir perquè es complís el que el Senyor havia anunciat pel profeta: «Digueu a la ciutat de Sió: Mira, el teu rei fa humilment la seva entrada, muntat en una somera, en un pollí, fill d’un animal de càrrega».\nEls deixebles hi anaren, feren el que Jesús els havia manat, portaren la somera i el pollí, els guarniren amb els seus mantells, i ell hi pujà. Molta gent entapissava el camí amb els seus mantells, altres tallaven branques dels arbres per encatifar el camí i la gent que anava al davant i que el seguia cridava: «Hosanna al Fill de David. Beneït el qui ve en nom del Senyor. Hosanna a dalt del cel».\nQuan hagué entrat a Jerusalem, s’agità tota la ciutat. Molts preguntaven: «Qui és aquest?». La gent que anava amb ell responia: «És el profeta Jesús, de Natzaret de Galilea».";
                break;
            case "B":
                evangeliRams = "Mc 11,1-10";
                evangeliCitaRams = "Beneït el qui ve en nom del Senyor";
                evangeliTitolRams = "Lectura de l’evangeli segons sant Marc";
                evangeliTextRams = "Quan s’acostaven a Jerusalem, vora Betfagé i Betània, cap a la muntanya de les Oliveres, Jesús envià dos dels seus deixebles amb aquest encàrrec: «Aneu al poble d’aquí al davant, i així que hi entrareu trobareu un pollí fermat, que ningú no ha muntat encara. Deslligueu-lo i porteu-lo. Si algú us preguntava: Per què ho feu?, digueu-li: el Senyor l’ha de menester, i de seguida el tornarà aquí.»\nElls se n’anaren i trobaren un pollí fermat, fora, al portal d’una casa, i el deslligaren. Alguns dels qui eren allà els deien: «Què feu, que deslligueu el pollí?» Ells respongueren tal com els havia dit Jesús, i els deixaren fer. Porten a Jesús el pollí, el guarneixen amb els seus mantells i ell hi puja.\nMolts estenien els mantells pel camí, i d’altres, ramatge que collien dels camps, i els qui el precedien o el seguien cridaven: «Hosanna. Beneït el qui ve en nom del Senyor. Beneït el Regne del nostre pare David, que està a punt d’arribar. Hosanna a dalt del cel.»";
                break;
            case "C":
                evangeliRams = "Lc 19,28-40";
                evangeliCitaRams = "Beneït el qui ve en nom del Senyor";
                evangeliTitolRams = "Lectura de l’evangeli segons sant Lluc";
                evangeliTextRams = "En aquell temps, Jesús anava al davant pujant a Jerusalem. Quan era a prop de Betfagué i de Betània, a la muntanya de les Oliveres, envià dos dels seus deixebles amb aquest encàrrec: «Aneu al poble d’aquí al davant i, entrant, hi trobareu un pollí fermat, que ningú no ha muntat mai. Deslligueu-lo i porteu-lo. Si algú us preguntava per què el deslligueu, respondreu que el Senyor l’ha de menester». Els dos que Jesús enviava se n’anaren i ho trobaren tot tal com Jesús els ho havia dit. Mentre deslligaven el pollí, els amos els digueren: «Per què el deslligueu?». Ells respongueren: «El Senyor l’ha de menester». Portaren el pollí a Jesús, el guarniren tirant-li els mantells a sobre i hi feren pujar Jesús.\nA mesura que Jesús avançava estenien els mantells pel camí. Quan s’acostava a la baixada de la muntanya de les Oliveres, tota la multitud dels seus addictes, plena d’alegria, començà de lloar Déu a grans crits per tots els prodigis que havien vist, i deien: «Beneït sigui el rei, el qui ve en nom del Senyor. Pau al cel, i glòria allà dalt».\nAlguns fariseus que anaven amb la multitud li digueren: «Mestre, renya els teus seguidors». Ell respongué: «Us asseguro que si aquests callessin, cridarien les pedres».";
                break;
        }

        return (
            <View style={{ flex: 1 }}>
                <Text selectable={true} style={this.styles.red}>{"Evangeli"}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.red}>{evangeliRams}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackItalic}>{evangeliCitaRams}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.black}>{evangeliTitolRams}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackJustified}>{evangeliTextRams}</Text>
                {this.state.Lect1 ?
                    <View>
                        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                        <HR />
                        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                    </View>
                    :
                    <TouchableOpacity onPress={() => this.setState({ Lect1: true })}>
                        <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                            <Text style={this.styles.continueButton}>{"Continua amb la primera lectura"}</Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        )
    }

    Render_1Lect() {
        var displayGloria = (this.state.DisplayVespers && LD_VALUES.GloriaVespers == '1') || (!this.state.DisplayVespers && LD_VALUES.Gloria == '1');

        return (
            <View style={{ flex: 1 }}>
                {displayGloria ?
                    <View>
                        <Text selectable={true} style={this.styles.red}>{"Glòria"}</Text>
                        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                        {this.GloriaText()}
                        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                        <HR />
                        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                    </View>
                    :
                    null
                }
                <Text selectable={true} style={this.styles.red}>{"Lectura primera"}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.red}>{this.state.DisplayVespers ? LD_VALUES.Lectura1Vespers : LD_VALUES.Lectura1}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackItalic}>{this.state.DisplayVespers ? LD_VALUES.Lectura1CitaVespers : LD_VALUES.Lectura1Cita}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.black}>{this.state.DisplayVespers ? LD_VALUES.Lectura1TitolVespers : LD_VALUES.Lectura1Titol}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackJustified}>{this.state.DisplayVespers ? LD_VALUES.Lectura1TextVespers : LD_VALUES.Lectura1Text}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                {this.state.Salm ?
                    <View>
                        <HR />
                        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                    </View>
                    :
                    <TouchableOpacity onPress={() => this.setState({ Salm: true })}>
                        <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                            <Text style={this.styles.continueButton}>{"Continua amb el Salm"}</Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        )
    }

    GloriaText() {
        return <Text selectable={true} style={this.styles.blackJustified}>{"Glòria a Déu a dalt del cel,\ni a la terra pau a als homes que estima el Senyor.\nUs lloem,\nus beneïm,\nus adorem, \nus glorifiquem,\nus donem gràcies,\npel la vostra immensa glòria,\nSenyor Déu, Rei celestial,\nDéu Pare omnipotent.\nSenyor, Fill Unigènit, Jesucrist,\nSenyor Déu, Anyell de Déu, Fill del Pare,\nvós, que lleveu el pecat del món,\ntingueu pietat de nosaltres;\nvós, que lleveu el pecat del món,\nacolliu la nostra súplica;\nvós, que seieu a la dreta del Pare,\ntingueu pietat de nosaltres.\nPerquè vós sou l’únic Sant,\nvós l’únic Senyor,\nvós l’únic Altíssim,\nJesucrist,\namb l’Esperit Sant,\nen la glòria de Déu Pare. Amén."}</Text>;
    }

    Render_Salm(need_lect2) {
        return (
            <View style={{ flex: 1 }}>
                <Text selectable={true} style={this.styles.red}>{"Salm responsorial"}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.red}>{this.state.DisplayVespers ? LD_VALUES.SalmVespers : LD_VALUES.Salm}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackJustified}>{this.state.DisplayVespers ? LD_VALUES.SalmTextVespers : LD_VALUES.SalmText}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                {(need_lect2 && this.state.Lect2) || (!need_lect2 && this.state.Evangeli) ?
                    <View>
                        <HR />
                        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                    </View>
                    :
                    <TouchableOpacity onPress={() => { this.Set_Continue_State(need_lect2) }}>
                        <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                            <Text style={this.styles.continueButton}>{"Continua amb " + (need_lect2 ? "la segona lectura" : "l'Evangeli")}</Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        )
    }

    Set_Continue_State(need_lect2) {
        if (need_lect2)
            this.setState({ Lect2: true });
        else
            this.setState({ Evangeli: true });
    }

    Render_2Lect() {
        return (
            <View style={{ flex: 1 }}>
                <Text selectable={true} style={this.styles.red}>{"Lectura segona"}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.red}>{this.state.DisplayVespers ? LD_VALUES.Lectura2Vespers : LD_VALUES.Lectura2}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackItalic}>{this.state.DisplayVespers ? LD_VALUES.Lectura2CitaVespers : LD_VALUES.Lectura2Cita}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.black}>{this.state.DisplayVespers ? LD_VALUES.Lectura2TitolVespers : LD_VALUES.Lectura2Titol}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackJustified}>{this.state.DisplayVespers ? LD_VALUES.Lectura2TextVespers : LD_VALUES.Lectura2Text}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                {this.state.Evangeli ?
                    <View>
                        <HR />
                        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                    </View>
                    :
                    <TouchableOpacity onPress={() => this.setState({ Evangeli: true })}>
                        <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                            <Text style={this.styles.continueButton}>{"Continua amb l'Evangeli"}</Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        )
    }

    Render_Evangeli() {
        var displayCredo = (this.state.DisplayVespers && LD_VALUES.credoVespers == '1') || (!this.state.DisplayVespers && LD_VALUES.credo == '1');
        var aleluia_text = (this.state.DisplayVespers ? LD_VALUES.AlleluiaVespers != '-'? LD_VALUES.AlleluiaVespers : "" : LD_VALUES.Alleluia != '-'? LD_VALUES.Alleluia : "")
        return (
            <View>
                <Text selectable={true} style={this.styles.red}>{"Evangeli"}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                {(G_VALUES.tempsespecific != "Quaresma" && G_VALUES.tempsespecific != "Tridu Pasqual") ?
                    <Text selectable={true} style={this.styles.red}>{"Al·leluia. "}{aleluia_text}</Text>
                    :
                    <Text selectable={true} style={this.styles.red}>{"Vers abans de l'evangeli"}</Text>
                }
                <Text selectable={true} style={this.styles.black}>{this.state.DisplayVespers ? LD_VALUES.AlleluiaTextVespers : LD_VALUES.AlleluiaText}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}

                {G_VALUES.LT == "Q_DIUM_PASQUA" ?
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                            <TouchableOpacity onPress={this._onEvangeliPress.bind(this, 'normal')}>
                                <Text style={this.state.evangeliType == "normal" ? this.styles.textButtonBold : this.styles.textButton}>{"Normal  "}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this._onEvangeliPress.bind(this, 'alternative')}>
                                <Text style={this.state.evangeliType == "normal" ? this.styles.textButton : this.styles.textButtonBold}>{"  Alternatiu (vespre)"}</Text>
                            </TouchableOpacity>
                        </View>
                        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                    </View>
                    :
                    null
                }

                <View>

                    {this.state.evangeliType == "normal" ?
                        this.NormalEvangeli()
                        :
                        this.AlternativePasquaEvangeli()
                    }
                </View>
                {displayCredo ?
                    <View>
                        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                        <HR />
                        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                        <Text selectable={true} style={this.styles.red}>{"Credo"}</Text>
                        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                        {this.CredoText()}
                    </View>
                    :
                    null
                }
            </View>
        );
    }

    _onEvangeliPress(evangeliType) {
        this.setState({ evangeliType: evangeliType });
    }

    NormalEvangeli() {
        var cita = this.state.DisplayVespers ? LD_VALUES.EvangeliCitaVespers : LD_VALUES.EvangeliCita;
        return (
            <View style={{ flex: 1 }}>
                <Text selectable={true} style={this.styles.red}>{this.state.DisplayVespers ? LD_VALUES.EvangeliVespers : LD_VALUES.Evangeli}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                {cita == undefined || cita == '-' ?
                    null
                    :
                    <View>
                        <Text selectable={true} style={this.styles.blackItalic}>{cita}</Text>
                        {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                    </View>
                }
                <Text selectable={true} style={this.styles.black}>{this.state.DisplayVespers ? LD_VALUES.EvangeliTitolVespers : LD_VALUES.EvangeliTitol}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackJustified}>{this.state.DisplayVespers ? LD_VALUES.EvangeliTextVespers : LD_VALUES.EvangeliText}</Text>
            </View>
        )
    }

    AlternativePasquaEvangeli() {
        return (
            <View style={{ flex: 1 }}>
                <Text selectable={true} style={this.styles.red}>{"Lc 24,13-35"}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackItalic}>{"El reconegueren quan partia el pa"}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.black}>{"Lectura de l’evangeli segons sant Lluc"}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackJustified}>{"Aquell mateix diumenge dos dels deixebles de Jesús se n’anaven a un poble anomenat Emaús, a onze quilòmetres de Jerusalem, i conversaven entre ells comentant aquests incidents.\nMentre conversaven i discutien, Jesús mateix els aconseguí i es posà a caminar amb ells, però Déu impedia que els seus ulls el reconeguessin. Ell els preguntà: «De què discutiu entre vosaltres tot caminant?». Ells s’aturaren amb un posat trist i un dels dos, que es deia Cleofàs, li respongué: «De tots els forasters que hi havia aquests dies a Jerusalem, ets l’únic que no saps el que hi ha passat?». Els preguntà: «Què?». Li contestaren: «El cas de Jesús de Natzaret. S’havia revelat com un profeta poderós en obres i en paraules davant Déu i el poble. Els grans sacerdots i les autoritats del nostre poble l’entregaren perquè fos condemnat a mort i crucificat. Nosaltres esperàvem que ell seria el qui hauria alliberat Israel. Ara, de tot això ja fa tres dies. És cert que unes dones del nostre grup ens han esverat: han anat de bon matí al sepulcre, no hi han trobat el cos, i han vingut a dir-nos que fins i tot se’ls han aparegut uns àngels i els han assegurat que ell és viu. Alguns dels qui eren amb nosaltres han anat al sepulcre i ho han trobat tot exactament com les dones havien dit, però a ell, no l’han vist pas».\nEll els digué: «Sí que us costa d’entendre! Quins cors tan indecisos a creure tot allò que havien anunciat els profetes. No havia de patir tot això el Messies abans d’entrar en la seva glòria?». Llavors, començant pels llibres de Moisès i seguint els de tots els profetes, els exposava tots els llocs de les Escriptures que es referien a ell.\nMentrestant s’acostaven al poblet on es dirigien i ell va fer com si seguís més enllà. Però ells el forçaren pregant-lo: «Queda’t amb nosaltres que ja es fa tard i el dia ha començat a declinar». Jesús entrà per quedar-se amb ells. Quan s’hagué posat amb ells a taula, prengué el pa, digué la benedicció, el partí i els el donava. En aquell moment se’ls obriren els ulls i el reconegueren, però ell desaparegué. I es deien l’un a l’altre: «No és veritat que els nostres cors s’abrusaven dins nostre mentre ens parlava pel camí i ens obria el sentit de les Escriptures?». Llavors mateix s’alçaren de taula i se’n tornaren a Jerusalem. Allà trobaren reunits els onze i tots els qui anaven amb ells, que deien: «Realment el Senyor ha ressuscitat i s’ha aparegut a Simó». Ells també contaven el que els havia passat pel camí, i com l’havien reconegut quan partia el pa."}</Text>
            </View>
        )
    }

    CredoText() {
        return <Text selectable={true} style={this.styles.blackJustified}>{"Crec en un Déu\nPare totpoderós,\ncreador del cel i de la terra.\n\nI en Jesucrist, únic Fill seu i Senyor nostre;\nel qual fou concebut per obra de l’Esperit Sant,\nnasqué de Maria Verge;\npatí sota el poder de Ponç Pilat,\nfou crucificat, mort i sepultat;\ndavallà als inferns,\nressuscità el tercer dia d’entre els morts;\nse’n pujà al cel,\nseu a la dreta de Déu Pare totpoderós;\ni d’allí ha de venir a judicar els vius i els morts.\n\nCrec en l’Esperit Sant;\nla santa Mare Església catòlica,\nla comunió dels sants;\nla remissió dels pecats;\nla resurrecció de la carn;\nla vida perdurable. Amén."}</Text>;
    }

    //------------------------------------------------------------------------------------
}
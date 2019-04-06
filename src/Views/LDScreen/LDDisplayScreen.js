import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';

import GF from '../../Globals/GlobalFunctions';
import HR from '../../Components/HRComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import GLOBAL from "../../Globals/Globals";

export default class LDDisplayScreen extends Component {
    //PREVIEWS --------------------------------------------------------------------------
    componentWillMount() {
        this.props = this.props.navigation.state.params.props;
        this.eventEmitter = this.props.events;

        this.setState({
            Need_Lect2: this.props.need_lectura2,
            Lect1: this.props.type === '1Lect',
            Salm: this.props.type === 'Salm',
            Lect2: this.props.type === '2Lect',
            Evangeli: this.props.type === 'Evangeli',
            DisplayVespers: this.props.useVespersTexts
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
                    name="ios-share-outline"
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
            }
        }
    }

    //CALLBACKS ----------------------------------------------------------------------------
    saveShareTextCB(shareText) {
        this.props.saveSharedTextCB(shareText);
    }

    //RENDER -------------------------------------------------------------------------------
    render() {
        try {
            console.log("this.state.DisplayVespers", this.state.DisplayVespers);

            return (
                <View style={this.styles.container}>
                    <ScrollView automaticallyAdjustContentInsets={false} style={{ padding: 10, }}>
                        <View style={{ flex: 1 }}>
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
                <Text selectable={true} style={this.styles.red}>{this.state.DisplayVespers ? LD_VALUES.Lectura1Vespers : LD_VALUES.Lectura1}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackItalic}>{this.state.DisplayVespers ? LD_VALUES.Lectura1CitaVespers : LD_VALUES.Lectura1Cita}</Text>
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
        return <Text selectable={true} style={this.styles.blackJustified}>{"Glòria a Déu a dalt del cel,\ni a la terra pau a als homes que estima el Senyor.\nUs lloem,\nus beneïm,\nus adorem, \nus glorifiquem,\nus donem gràcies,\npel la vostra immensa glòria,\nSenyor Déu, Rei celestial,\nDeu Pare omnipotent.\nSenyor, Fill Unigènit, Jesucrist,\nSenyor Déu, Anyell de Déu, Fill del Pare,\nvós, que lleveu el pecat del món,\ntingueu pietat de nosaltres;\nvós, que lleveu el pecat del món,\nacolliu la nostra súplica;\nvós, que seieu a la dreta del Pare,\ntingueu pietat de nosaltres.\nPerquè vós sou l’únic Sant,\nvós l’únic Senyor,\nvós l’únic Altíssim,\nJesucrist,\namb l’Esperit Sant,\nen la glòria de Déu Pare. Amén."}</Text>;
    }

    Render_Salm(need_lect2) {
        return (
            <View style={{ flex: 1 }}>
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
                            <Text style={this.styles.continueButton}>{"Continua amb " + (need_lect2 ? "la Segona lectura" : "l'Evangeli")}</Text>
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
                <Text selectable={true} style={this.styles.red}>{this.state.DisplayVespers ? LD_VALUES.Lectura2Vespers : LD_VALUES.Lectura2}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackItalic}>{this.state.DisplayVespers ? LD_VALUES.Lectura2CitaVespers : LD_VALUES.Lectura2Cita}</Text>
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
        var displayEvangeli = (this.state.DisplayVespers && LD_VALUES.credoVespers == '1') || (!this.state.DisplayVespers && LD_VALUES.credo == '1');

        return (
            <View style={{ flex: 1 }}>
                <Text selectable={true} style={this.styles.red}>{G_VALUES.tempsespecific == "Quaresma" ? "" : "Al·leluia. "}{this.state.DisplayVespers ? LD_VALUES.EvangeliVespers : LD_VALUES.Evangeli}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackItalic}>{this.state.DisplayVespers ? LD_VALUES.EvangeliCitaVespers : LD_VALUES.EvangeliCita}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.black}>{this.state.DisplayVespers ? LD_VALUES.EvangeliTitolVespers : LD_VALUES.EvangeliTitol}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackJustified}>{this.state.DisplayVespers ? LD_VALUES.EvangeliTextVespers : LD_VALUES.EvangeliText}</Text>
                {displayEvangeli ?
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
        )
    }

    CredoText() {
        return <Text selectable={true} style={this.styles.blackJustified}>{"Crec en un Déu\nPare totpoderós,\ncreador del cel i de la terra.\n\nI en Jesucrist, únic Fill seu i Senyor nostre;\nel qual fou concebut per obra de l’Esperit Sant,\nnasqué de Maria Verge;\npatí sota el poder de Ponç Pilat,\nfou crucificat, mort i sepultat;\ndavallà als inferns,\nressuscità el tercer dia d’entre els morts;\nse’n pujà al cel,\nseu a la dreta de Déu Pare totpoderós;\ni d’allí ha de venir a judicar els vius i els morts.\n\nCrec en l’Esperit Sant;\nla santa Mare Església catòlica,\nla comunió dels sants;\nla remissió dels pecats;\nla resurrecció de la carn;\nla vida perdurable. Amén."}</Text>;
    }

    //------------------------------------------------------------------------------------
}
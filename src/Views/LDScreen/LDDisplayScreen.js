import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';

import GF from '../../Globals/GlobalFunctions';
import Icon from 'react-native-vector-icons/Ionicons';
import GLOBAL from "../../Globals/Globals";

export default class LDDisplayScreen extends Component {
    //PREVIEWS --------------------------------------------------------------------------
    componentWillMount() {
        this.props = this.props.navigation.state.params.props;
        this.eventEmitter = this.props.events;
        this.setState({ type: this.props.type })
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <View style={{ paddingLeft: 100 }}>
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
        headerRight: <TouchableOpacity
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
        </TouchableOpacity>,
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

        this.state = {
            Lect1: this.props.type === '1Lect',
            Salm: this.props.type === 'Salm',
            Lect2: this.props.type === '2Lect',
            Evangeli: this.props.type === 'Evangeli',
        }
        console.log("props = ", this.props);
        console.log("this.state.Lect1 = " + this.state.Lect1);
    }

    //CALLBACKS ----------------------------------------------------------------------------
    saveShareTextCB(shareText) {
        this.props.saveSharedTextCB(shareText);
    }

    //RENDER -------------------------------------------------------------------------------
    render() {
        console.log("reeeendering this.state.Lect1 = " + this.state.Lect1);
        
        try {
            return (
                <View style={this.styles.container}>
                    <ScrollView automaticallyAdjustContentInsets={false} style={{ padding: 10, }}>
                        <View style={{ flex: 1 }}>
                            {this.state.Lect1 ?
                                this.Render_1Lect()
                                : null}
                            {this.state.Salm ?
                                this.Render_Salm()
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
        console.log("render 1lect");
        
        return (
            <View style={{ flex: 1 }}>
                <Text selectable={true} style={this.styles.red}>{LD_VALUES.Lectura1}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackItalic}>{LD_VALUES.Lectura1Cita}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackJustified}>{LD_VALUES.Lectura1Text}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <TouchableOpacity onPress={() => this.setState({ invitatori: !this.state.invitatori })}>
                    <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                        <Text style={this.styles.continueButton}>{"Continua amb el Salm"}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    Render_Salm() {
        return (
            <View style={{ flex: 1 }}>
                <Text selectable={true} style={this.styles.red}>{LD_VALUES.Salm}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackJustified}>{LD_VALUES.SalmText}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.texSalmInvButton}>{"Continua amb " + (this.props.need_lectura2 ? "la Segona lectura" : "l'Evangeli")}</Text>
            </View>
        )
    }

    Render_2Lect() {
        return (
            <View style={{ flex: 1 }}>
                <Text selectable={true} style={this.styles.red}>{LD_VALUES.Lectura2}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackItalic}>{LD_VALUES.Lectura2Cita}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.blackJustified}>{LD_VALUES.Lectura2Text}</Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
                <Text selectable={true} style={this.styles.texSalmInvButton}>{"Continua amb l'Evangeli"}</Text>
            </View>
        )
    }

    Render_Evangeli() {
        return (
            <View style={{ flex: 1 }}>
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

    //------------------------------------------------------------------------------------
}
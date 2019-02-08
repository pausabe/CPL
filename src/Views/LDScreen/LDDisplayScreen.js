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
            black: {
                color: '#000000',
                fontSize: GF.convertTextSize(G_VALUES.textSize),
            },
            invitatoriButton: {
                color: 'grey',
                fontSize: GF.convertTextSize(G_VALUES.textSize) - 3,
            },
            texSalmInvButton: {
                color: 'grey',
                fontSize: GF.convertTextSize(G_VALUES.textSize) > 17 ? 17 : GF.convertTextSize(G_VALUES.textSize) - 3,
            },
            texSalmInvButtonBold: {
                color: 'grey',
                fontSize: GF.convertTextSize(G_VALUES.textSize) > 17 ? 17 : GF.convertTextSize(G_VALUES.textSize) - 3,
                fontWeight: 'bold',
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
        return (
            <View style={styles.container}>
                <ScrollView automaticallyAdjustContentInsets={false} style={{ padding: 10, }}>
                    {this.Render_Prayer()}
                </ScrollView>
            </View>
        )
    }

    Render_Prayer() {
        switch (this.props.type) {
            case "1Lect":
                return this.Render_1Lect();
            case "Salm":
                return this.Render_Salm();
            case "2Lect":
                return this.Render_2Lect();
            case "Evangeli":
                return this.Render_Evangeli();
            default:
                return null;
        }
    }

    Render_1Lect() {
        return (
            <View style={{ flex: 1 }}>
                <Text selectable={true} style={this.styles.red}>{'R. '}
                    <Text selectable={true} style={this.styles.black}>{LD_VALUES.Lectura1}</Text>
                </Text>
                {Platform.OS === 'android' ? <Text>{"\n"}</Text> : <Text />}
            </View>
        )
    }

    Render_Salm() {
        return (
            <Text>{"Salm"}</Text>
        )
    }

    Render_2Lect() {
        return (
            <Text>{"Segona lectura"}</Text>
        )
    }

    Render_Evangeli() {
        return (
            <Text>{"Evangeli"}</Text>
        )
    }

    //------------------------------------------------------------------------------------
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

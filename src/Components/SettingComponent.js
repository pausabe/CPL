import React, { Component } from 'react';
import {View, Text, Slider, Switch, Picker, StyleSheet} from 'react-native';
import Hr from 'react-native-hr';
import GLOBAL from "../Globals/Globals";

export default class SettingComponent extends Component{

    constructor(props){
        super();
        this.name = props.name;
        this.description = props.description;
        this.id = props.id;
        this.value = props.value;
        this.callback = props.callback;
        this.selectorComponent = props.selectorComponent;
        this.selectorProps = props.selectorProps;
    }

    componentWillMount(){
        this.setState({
            value: this.value
        });
    }

    render(){
        let selectorProps;
        switch (this.props.selectorComponent) {
            case "switch":
                selectorProps = Object.assign(this.selectorProps ? this.selectorProps : {}, {
                    value: this.state.value,
                    onValueChange: this._updateSelectionStateCallback.bind(this)
                });
                this.selectorComponent = React.createElement(Switch, selectorProps);
                break;
            case "slider":
                selectorProps = Object.assign(this.selectorProps ? this.selectorProps : {}, {
                    onValueChange: this._selectionCallback.bind(this)
                });
                this.selectorComponent = React.createElement(Slider, selectorProps);
                break;
            case "picker":
                selectorProps = Object.assign(this.selectorProps ? this.selectorProps : {}, {
                    selectedValue: this.state.value,
                    onValueChange: this._updateSelectionStateCallback.bind(this)
                });
                this.selectorComponent = React.createElement(Picker, selectorProps,
                    <Picker.Item label="Java" value="java"/>,
                    <Picker.Item label="JavaScript" value="js"/>);
                break;
            default:
        }

        return(
            <View>
                <View style={styles.option}>
                    <Text>{this.name}</Text>
                    {this.selectorComponent}
                </View>
                <Hr style={styles.separator} lineColor={GLOBAL.hrColor} />
            </View>
        );
    }

    _updateSelectionStateCallback(value){
        this.setState({
            value: value
        });
        this._selectionCallback(value);
    }

    _selectionCallback(value){
        this.callback(this.id, value);
    }

}

const styles = StyleSheet.create({
    option: {
        height: 70,
        justifyContent: 'center',
        padding: 20
    }
});

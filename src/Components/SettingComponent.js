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
        switch (this.props.selectorComponent) {
            case "switch":
                this.selectorComponent = this._generateSwitch();
                break;
            case "slider":
                this.selectorComponent = this._generateSlider();
                break;
            case "picker":
                this.selectorComponent = this._generatePicker();
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

    _generateSwitch(){
        let selectorProps = this._mergeProps({
            value: this.state.value,
            onValueChange: this._updateSelectionStateCallback.bind(this)
        });
        return React.createElement(Switch, selectorProps);
    }

    _generateSlider(){
        let selectorProps = this._mergeProps({
            onValueChange: this._selectionCallback.bind(this)
        });
        return React.createElement(Slider, selectorProps);
    }

    _generatePicker(){
        let selectorProps = this._mergeProps({
            selectedValue: this.state.value,
            onValueChange: this._updateSelectionStateCallback.bind(this)
        });
        return React.createElement(Picker, selectorProps,
            <Picker.Item label="Java" value="java"/>,
            <Picker.Item label="JavaScript" value="js"/>
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

    _mergeProps(properties){
        return Object.assign(this.selectorProps ? this.selectorProps : {}, properties);
    }

}

const styles = StyleSheet.create({
    option: {
        height: 70,
        justifyContent: 'center',
        padding: 20
    }
});

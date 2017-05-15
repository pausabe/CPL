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
        this.options = props.options;
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
        let selectorComponent;
        let styleSelectorView = styles.selectorView;
        switch (this.props.selectorComponent) {
            case "switch":
                styleSelectorView = styles.selectorViewSwitch;
                selectorComponent = this._generateSwitch();
                break;
            case "slider":
                selectorComponent = this._generateSlider();
                break;
            case "picker":
                selectorComponent = this._generatePicker();
                break;
            default:
        }

        return(
            <View>
                <View style={styles.option}>
                    <View style={styles.textView}>
                        <Text style={styles.text}>{this.name}</Text>
                    </View>
                    <View style={styleSelectorView}>
                        {selectorComponent}
                    </View>
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
            value: this.state.value,
            onValueChange: this._selectionCallback.bind(this)
        });
        return React.createElement(Slider, selectorProps);
    }

    _generatePicker(){
        let selectorProps = this._mergeProps({
            selectedValue: this.state.value,
            onValueChange: this._updateSelectionStateCallback.bind(this),
            style: styles.selectorPicker
        });
        return React.createElement(Picker, selectorProps,
            this._generatePickerOptions()
        );
    }

    _generatePickerOptions(){
        console.log("Generating options...");
        let options = [];
        for(let key in this.options){
            options.push(
                <Picker.Item label={this.options[key]} value={key} key={key}/>
            );
        }
        return options;
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

//Util function for cloning objects
/*const clone = function(obj){
    return JSON.parse(JSON.stringify(obj));
};*/

//Pregenetarion of styles objects
/*const preStyles = {
    selectorView: {
        flex: 5,
        justifyContent: "center"
    },
    selectorViewSwitch: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end"
    }
};*/

const styles = StyleSheet.create({
    option: {
        minHeight: 70,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    textView: {
        flex: 5,
        justifyContent: "center"
    },
    selectorView: {
        flex: 5,
        justifyContent: "center"
    },
    text: {
        color: "black",
        fontSize: 16
    },
    selectorViewSwitch: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    selectorPicker: {
        color: "gray"
    }
});

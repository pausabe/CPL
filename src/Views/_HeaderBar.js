import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

//var Dimensions = require('Dimensions');

import GLOBAL from '../Globals/Globals';

export default class HeaderBar extends Component {

  render() {
    return (
      <View style={{ paddingLeft: this.props.left_padding == undefined? 0 : this.props.left_padding}}>
        <Text style={{
          textAlign: 'center',
          color: GLOBAL.itemsBarColor,
          fontSize: 20,
          fontWeight: '600',
        }}>{this.props.title}</Text>
      </View>
    )
  }
}

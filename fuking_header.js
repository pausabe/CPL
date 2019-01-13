import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform
 } from 'react-native';

var Dimensions = require('Dimensions');

import GLOBAL from './src/Globals/Globals';

export default class HeaderBar extends Component {

  render() {
    return(
      <View style={{paddingLeft: 100}}>
                      <Text style={{
                        textAlign: 'center',
                        color: GLOBAL.itemsBarColor,
                        fontSize: 20,
                        fontWeight: '600',
                      }}>CPL</Text>
                    </View>
    )
  }
}

import React, { Component } from 'react';
import {
  View,
 } from 'react-native';

 export default class HRComponent extends Component {
   render() {
     return(
       <View
         style={{
           borderBottomColor: 'rgba(144, 164, 174, 0.4)',
           borderBottomWidth: 1,
           marginHorizontal: (this.props.margin_horizontal !== undefined? this.props.margin_horizontal : 0),
         }}
       />
     );
   }
 }

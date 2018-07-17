import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  WebView,
 } from 'react-native';

import GLOBAL from "../Globals/Globals";

function paddingBar(){
  if(Platform.OS === 'ios'){
    var DeviceInfo = require('react-native-device-info');
    var iosVer = parseInt(DeviceInfo.getSystemVersion());
    if(iosVer>=11) return 44;
    return 64;
  }
  return 0;
}

export default class CommentScreen extends Component {
  Internet_Error(){
    return (
      <View style={styles.internet_error_container}>
        <Text/>
        <Text style={styles.internal_error_text}>{"És necessari tenir una connexió a internet"}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          source={{uri: 'https://mescpl.cpl.es/contacte/'}}
          startInLoadingState={true}
          renderError={() => this.Internet_Error() }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  internet_error_container: {
    flex: 1,
    paddingTop: paddingBar()
  },
  internal_error_text: {
    textAlign: 'center',
  }
});

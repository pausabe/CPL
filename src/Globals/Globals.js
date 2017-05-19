import {Platform} from 'react-native';

const normalTextSize = 17;
const smallTextSize = 15;

module.exports = {
  barColor: '#006064',
  itemsBarColor: '#FFFFFF',
  statusBarColor: '#00474a',
  hrColor: '#90A4AE',
  DBName: 'lh_v6.db',
  paddingBar: Platform.OS === 'ios' ? 0 : 54,
  styles: {
    black: {
      color: '#000000',
      fontSize: normalTextSize,
    },
    blackBold: {
      color: '#000000',
      fontSize: normalTextSize,
      fontWeight: 'bold',
    },
    blackSmallItalic:{
      color: '#000000',
      fontSize: normalTextSize,
      fontStyle: 'italic'
    },
    blackSmallItalicRight: {
      color: '#000000',
      fontSize: normalTextSize,
      fontStyle: 'italic',
      textAlign: 'right'
    },
    red: {
      color: '#FF0000',
      fontSize: normalTextSize,
    },
    redCenter: {
      color: '#FF0000',
      fontSize: normalTextSize,
      textAlign: 'center'
    },
    redCenterBold: {
      color: '#FF0000',
      fontSize: normalTextSize,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    redSmallItalicRight: {
      color: '#FF0000',
      fontSize: normalTextSize,
      fontStyle: 'italic',
      textAlign: 'right'
      }
  }
};

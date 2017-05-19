import {Platform} from 'react-native';

const normalTextSize = 17;
const smallTextSize = 15;

module.exports = {
  barColor: '#006064',
  itemsBarColor: '#FFFFFF',
  statusBarColor: '#00474a',
  hrColor: '#90A4AE',

  O_ORDINARI: 'O_ORDINAR',
  Q_CENDRA:'Q_CENDRA',
  Q_SETMANES: 'Q_SETMANES',
  Q_DIUM_RAMS: 'Q_DIUM_RAMS',
  Q_SET_SANTA: 'Q_SET_SANTA',
  Q_TRIDU: 'Q_TRIDU',
  Q_DIUM_PASQUA: 'Q_DIUM_PASQUA',
  P_OCTAVA: 'P_OCTAVA',
  P_SETMANES: 'P_SETMANES',
  A_SETMANES: 'A_SETMANES',
  A_FERIES: 'A_FERIES',
  N_OCTAVA: 'N_OCTAVA',
  N_ABANS: 'N_ABANS',

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

import {Platform} from 'react-native';

const normalTextSize = 17;
const smallTextSize = 15;

module.exports = {
  idTracker: "UA-113574827-1",
  barColor: '#006064',
  dataPicker: '#007b80', //Simbòlic, el canvi s'ha de fer a res/values/styles.xml
  itemsBarColor: '#FFFFFF',
  statusBarColor: '#00474a',
  hrColor: '#90A4AE',
  switchColor: '#007b80',

  /*...Platform.select({
      ios: {
        backgroundColor: 'rgb(225, 225, 225)',
      },
      android: {
        backgroundColor: 'rgb(225, 225, 225)',
      },
    }),*/

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

  size1: 15,
  size2: 18,
  size3: 21,
  size4: 24,
  size5: 27,
  size6: 30,
  size7: 33,
  size8: 36,
  size9: 39,
  size10: 42,

  DBName: 'lh_v1.11.db',

  paddingBar: Platform.OS === 'ios' ? 0 : 54,

};

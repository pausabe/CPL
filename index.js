import { AppRegistry, YellowBox } from 'react-native';
import CPL from './src/App.js';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Remote debugger']);

AppRegistry.registerComponent('CPL', () => CPL);

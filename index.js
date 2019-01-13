import { AppRegistry, YellowBox } from 'react-native';
import CPL from './App2.js';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Remote debugger']);

AppRegistry.registerComponent('CPL', () => CPL);

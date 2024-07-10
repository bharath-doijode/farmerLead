/**
 * @format
 */

import {ScriptManager, Script, Federated} from '@callstack/repack/client';
import {AppRegistry, Platform} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json'; 

const resolveURL = Federated.createURLResolver({
  containers: {
  auth: "http://localhost:9003/[name][ext]"
  //auth: "https://github.com/bharath-doijode/SuperApp/releases/download/auth-android@0.0.1/[name][ext]"
  },
});
  //auth: `https://raw.githubusercontent.com/callstack-internal/super-app-template/main/packages/auth/build/generated/${Platform.OS}/[name][ext]`,
ScriptManager.shared.addResolver(async (scriptId, caller) => {
  let url;
  console.log("caller >>>>>>>>> ", caller);
  if (caller === 'main') {
    url = Script.getDevServerURL(scriptId);
  } else {
    url = resolveURL(scriptId, caller);
  }

  console.log("URL >>>>> ", url);
  if (!url) {
    return undefined;
  }
  return {
    url,
    cache: false, // For development
    query: {
      platform: Platform.OS,
    },
  };
});

AppRegistry.registerComponent(appName, () => App);

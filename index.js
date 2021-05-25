import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry, YellowBox} from 'react-native';
import {App} from './src/App';
import {name as appName} from './app.json';
import {Provider as StoreProvider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {theme} from './theme';
import {store} from './src/store/store';
import {SnackbarContext} from './src/context/SnackbarContext';
import {snackbarState} from './src/context/snackbarState';

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
  'Setting a timer',
]);

export default function index() {
  const {visible, message, show, hide} = snackbarState();
  return (
    <StoreProvider store={store}>
      <SnackbarContext.Provider value={{visible, message, show, hide}}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <App />
          </NavigationContainer>
        </PaperProvider>
      </SnackbarContext.Provider>
    </StoreProvider>
  );
}

AppRegistry.registerComponent(appName, () => index);

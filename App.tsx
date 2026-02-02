import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { LogBox, SafeAreaView, StatusBar } from 'react-native';
import { SheetProvider } from 'react-native-actions-sheet';
import 'react-native-devsettings/withAsyncStorage';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Colors } from './src/Constants/Colors';
import RootNavigation from './src/Navigation/RootNavigation';
import './src/Sheets/Sheets';
import { persistor, store } from './src/Store/store';
import i18n from './src/Translates/i18n';

const App: React.FC = () => {
  LogBox.ignoreAllLogs();
  LogBox.ignoreLogs([
    'Require cycle:',
    'ViewPropTypes',
    'i18next:',
    'Non-serializable values were found in the navigation state',
    'VirtualizedLists should never be neste',
  ]);

  return (
    <I18nextProvider i18n={i18n}>
      <GestureHandlerRootView style={{ flex: 1 ,backgroundColor: Colors.gray1, }}>
        <SafeAreaView style={{ backgroundColor: Colors.gray1, flex: 0 }} />
        <SafeAreaView style={{ flex: 1 }}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <SheetProvider>
                <StatusBar
                  animated={true}
                  backgroundColor={Colors.gray1}
                  barStyle="dark-content"
                  translucent={false}
                />
                <RootNavigation />
              </SheetProvider>
            </PersistGate>
          </Provider>
        </SafeAreaView>
      </GestureHandlerRootView>
    </I18nextProvider>
  );
};

export default App;

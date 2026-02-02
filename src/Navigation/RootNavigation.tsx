import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Linking, SafeAreaView, StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';

import { useAppSelector } from '../Store/store';
import i18n from '../Translates/i18n';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Utils/window.util';

export const navigationRef = createNavigationContainerRef();

export const navigate = (name: string, params?: any) => {
  if (navigationRef.isReady()) {
    (navigationRef.navigate as any)(name, params);
  }
};

const RootNavigation: React.FC = () => {
  const authorized = useAppSelector(state => state.auth.isLoggedIn);
  const Language = useAppSelector(state => state.ui.language);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    i18n.changeLanguage(Language);
  }, [Language]);

  useEffect(() => {
    const prepareApp = async () => {
      // Handle deep link, preload data, etc.
      const url = await Linking.getInitialURL();
      if (url) {
        console.log('Initial Deep Link URL:', url);
      }
      setIsLoading(false);
    };

    prepareApp();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {isLoading ? (
          <SafeAreaView style={styles.loadingContainer}>
            <Text>Gifter</Text>
          </SafeAreaView>
        ) : authorized ? (
          <DrawerNavigator />
        ) : (
          <AuthNavigator />
        )}
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  lottie: {
    width: 200,
    height: 200,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
  },
});

import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Linking, SafeAreaView, StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';

import { bootstrapThunk } from '../Store/Slices/Auth/Auth.thunks';
import { setBootstrapped } from '../Store/Slices/AuthSlice';
import { useAppSelector } from '../Store/store';
import i18n from '../Translates/i18n';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../Utils/window.util';

// ✅ add these (adjust paths)

export const navigationRef = createNavigationContainerRef();

export const navigate = (name: string, params?: any) => {
  if (navigationRef.isReady()) {
    (navigationRef.navigate as any)(name, params);
  }
};

const RootNavigation: React.FC = () => {
  const dispatch = useDispatch<any>();

  const authorized = useAppSelector(state => state.auth.isLoggedIn);
  const isBootstrapped = useAppSelector(state => state.auth.isBootstrapped);
  const Language = useAppSelector(state => state.ui.language);

  useEffect(() => {
    i18n.changeLanguage(Language);
  }, [Language]);

  useEffect(() => {
    const prepareApp = async () => {
      // ✅ Deep link check (fine)
      const url = await Linking.getInitialURL();
      if (url) console.log('Initial Deep Link URL:', url);

      // ✅ Auth bootstrap (refresh cookie -> token -> /me)
      await dispatch(bootstrapThunk());

      // ✅ mark boot complete
      dispatch(setBootstrapped(true));
    };

    prepareApp();
  }, [dispatch]);

  return (
    <NavigationContainer ref={navigationRef}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {!isBootstrapped ? (
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
});

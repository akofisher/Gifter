import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import GenericModal from '../ComponentsShared/GenericModal/GenericModal';
import GenericText from '../ComponentsShared/GenericText/GenericText';
import { Colors } from '../Constants/Colors';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';

import { bootstrapThunk } from '../Store/Slices/Auth/Auth.thunks';
import { clearGlobalError } from '../Store/Slices/GlobalErrorSlice';
import { setBootstrapped } from '../Store/Slices/AuthSlice';
import { useAppDispatch, useAppSelector } from '../Store/store';
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
  const dispatch = useAppDispatch();

  const authorized = useAppSelector(state => state.auth.isLoggedIn);
  const isBootstrapped = useAppSelector(state => state.auth.isBootstrapped);
  const Language = useAppSelector(state => state.ui.language);
  const globalError = useAppSelector(state => state.globalError.current);

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
        <GenericModal
          visible={Boolean(globalError)}
          onClose={() => dispatch(clearGlobalError())}
        >
          {globalError ? (
            <View style={styles.errorModalContent}>
              <GenericText
                textType="Title"
                text={globalError.title}
                textStyles={styles.errorTitle}
              />

              <GenericText
                textType="SubTitle"
                text={globalError.message}
                textStyles={styles.errorMessage}
              />

              {globalError.status ? (
                <GenericText
                  textType="SubTitle"
                  text={`Status: ${globalError.status}`}
                  textStyles={styles.errorMeta}
                />
              ) : null}

              <TouchableOpacity
                style={styles.errorButton}
                onPress={() => dispatch(clearGlobalError())}
                activeOpacity={0.8}
              >
                <Text style={styles.errorButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </GenericModal>

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
  errorModalContent: {
    width: '100%',
    alignItems: 'center',
  },
  errorTitle: {
    color: Colors.red,
    marginBottom: 8,
  },
  errorMessage: {
    marginBottom: 10,
    textAlign: 'center',
  },
  errorMeta: {
    color: Colors.dark,
    marginBottom: 16,
  },
  errorButton: {
    backgroundColor: Colors.mein,
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  errorButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

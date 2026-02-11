import { NavigationProp, useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNRestart from 'react-native-restart';
import Profile from '../../../assets/svg/User.svg';
import { Colors } from '../../Constants/Colors';
import Screens, { NavigationParams } from '../../Navigation/Screens';
import { logoutThunk } from '../../Store/Slices/Auth/Auth.thunks';
import { setLanguage } from '../../Store/Slices/UiSlice';
import { useAppDispatch, useAppSelector } from '../../Store/store';
import { formatDateDDMMYYYY } from '../../Utils/timestamp.util';
import { getFontSizeByWindowWidth } from '../../Utils/window.util';
import BackgroundContainer from '../BackgroundContainer/BackgroundContainer';
import GenericText from '../GenericText/GenericText';

type Props = {};

const DrawerContent = (props: Props) => {
  const navigation = useNavigation<NavigationProp<NavigationParams>>();
  const dispatch = useAppDispatch();
  const User = useAppSelector((s: any) => s?.auth?.user);

  const LanguageChange = (lng: string) => {
    dispatch(setLanguage(lng));
    setTimeout(() => {
      RNRestart.restart();
    }, 100);
  };
  const DrawerButtons = [
    {
      id: 1,
      title: t('menuButtons.profile'),
      funct: () => navigation.navigate(Screens.Profile),
    },
    {
      id: 2,
      title: t('menuButtons.giving'),
      funct: () => navigation.navigate(Screens.MyGiveAwayStack),
    },
    {
      id: 3,
      title: t('menuButtons.taking'),
      funct: () => navigation.navigate(Screens.MyTakingsStack),
    },
    {
      id: 4,
      title: t('menuButtons.aboutus'),
      funct: () => console.log('About us'),
    },
    {
      id: 5,
      title: t('menuButtons.logOut'),
      funct: () => dispatch(logoutThunk()),
    },
    {
      id: 6,
      title: t('menuButtons.logOut'),
      funct: () => navigation.navigate(Screens.Settings),
    },
  ];
  const LanguageButtons = [
    {
      id: 1,
      title: t('languages.geo'),
      code: 'ka',
      funct: () => LanguageChange('ka'),
    },
    {
      id: 2,
      title: t('languages.eng'),
      code: 'en',
      funct: () => LanguageChange('en'),
    },
    {
      id: 3,
      title: t('languages.rus'),
      code: 'ru',
      funct: () => LanguageChange('ru'),
    },
  ];
  const SupportButtons = [
    {
      id: 1,
      title: 'BOG - ა.ლ/a.l',
      address: '123123123123',
      funct: () => console.log('Support'),
    },
    {
      id: 2,
      title: 'TBC - ა.ლ/a.l',
      address: '123123123123',
      funct: () => console.log('Support'),
    },
    {
      id: 3,
      title: 'BTC',
      address: '123123123123',
      funct: () => console.log('Support'),
    },
    {
      id: 4,
      title: 'LTC',
      address: '123123123123',
      funct: () => console.log('Support'),
    },
    {
      id: 5,
      title: 'USDT',
      address: '123123123123',
      funct: () => console.log('Support'),
    },
    {
      id: 6,
      title: 'USDC',
      address: '123123123123',
      funct: () => console.log('Support'),
    },
  ];
  return (
    <BackgroundContainer containerStyles={{}}>
      <ScrollView>
        <View style={styles.DrawerHeadContainer}>
          <View style={{ flexDirection: 'column', paddingHorizontal: 10 }}>
            <GenericText
              textType={'SubTitle'}
              text={`${User?.firstName} ${User?.lastName}`}
              textStyles={{}}
            />
            <GenericText
              textType={'Universal'}
              text={formatDateDDMMYYYY(User?.createdAt)}
              textStyles={{
                fontSize: getFontSizeByWindowWidth(11),
                color: Colors.dark,
              }}
            />
          </View>

          <TouchableOpacity>
            <Profile />
          </TouchableOpacity>
        </View>
        <View style={styles.DrawerBodyContainer}>
          {DrawerButtons.map((val, idx) => (
            <TouchableOpacity
              style={styles.menuButtons}
              key={idx}
              onPress={val?.funct}
            >
              <Text style={styles.menuTitle}>{val?.title}</Text>
              {val?.id == 2 ? (
                <Text style={styles.menuNumber}>
                  {User?.stats?.giving} / {User?.stats?.exchanging}
                </Text>
              ) : val?.id == 3 ? (
                <Text style={styles.menuNumber}>
                  {User?.stats?.given} / {User?.stats?.exchanged}
                </Text>
              ) : null}
            </TouchableOpacity>
          ))}
          <GenericText
            textType={'Universal'}
            text={t('languages.changeLanguage')}
            textStyles={styles.languageTitle}
          />
          {LanguageButtons.map((val, idx) => {
            const currentLang = useAppSelector(state => state.ui.language);
            const isSelected = val?.code === currentLang; // assuming val.code is 'ka', 'en', etc.

            return (
              <TouchableOpacity
                key={idx}
                onPress={val?.funct}
                style={styles.buttonContainer}
              >
                <View style={styles.radioContainer}>
                  <Text style={[styles.languages]}>{val?.title}</Text>
                  <View
                    style={[
                      styles.radioCircle,
                      { borderColor: isSelected ? Colors.mein : Colors.dark },
                    ]}
                  >
                    {isSelected && (
                      <View
                        style={[
                          styles.radioDot,
                          { backgroundColor: Colors.mein },
                        ]}
                      />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
          <GenericText
            textType={'Title'}
            text={t('support.ifuwant')}
            textStyles={{
              paddingTop: 20,
              paddingBottom: 5,
              color: Colors.mein,
              marginTop: 10,
              borderTopWidth: 1,
              borderTopColor: Colors.gray2,
            }}
          />
          <GenericText
            textType={'Title'}
            text={t('support.copy')}
            textStyles={{
              paddingVertical: 5,
              color: Colors.green,
              marginBottom: 20,
              fontSize: getFontSizeByWindowWidth(12),
            }}
          />
          <View style={styles.supportContainer}>
            {SupportButtons.map((val, idx) => (
              <TouchableOpacity style={styles.flexibleCube}>
                <GenericText
                  textType={'Universal'}
                  text={val?.title}
                  textStyles={styles.supportTitle}
                />
                <GenericText
                  textType={'Universal'}
                  text={val?.address}
                  textStyles={styles.supportAddress}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </BackgroundContainer>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  DrawerHeadContainer: {
    width: '100%',
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray2,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  DrawerBodyContainer: {
    width: '100%',
    paddingVertical: 10,
  },
  menuTitle: {
    color: Colors.dark,
    fontSize: getFontSizeByWindowWidth(14),
    fontWeight: '500',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  menuNumber: {
    color: Colors.green,
    fontSize: getFontSizeByWindowWidth(14),
    fontWeight: '500',
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: Colors.gray3,
    borderRadius: 50,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  languages: {
    color: Colors.dark,
    fontSize: getFontSizeByWindowWidth(14),
    fontWeight: '500',
    paddingVertical: 10,
  },
  languageTitle: {
    color: Colors.mein,
    fontSize: getFontSizeByWindowWidth(14),
    fontWeight: '500',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.gray2,
  },
  flexibleCube: {
    width: '49%',
    borderRadius: 12,
    backgroundColor: Colors.gray3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingVertical: Platform.OS == 'ios' ? 12 : 9,
    paddingHorizontal: Platform.OS == 'ios' ? 8 : 5,
  },
  supportContainer: {
    width: '100%',
    paddingHorizontal: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 4,
  },
  supportAddress: {
    color: Colors.mein,
    fontSize: getFontSizeByWindowWidth(11),
    fontWeight: '500',
  },
  supportTitle: {
    paddingVertical: 5,
    fontWeight: '400',
    fontSize: getFontSizeByWindowWidth(12),
  },
  buttonContainer: {
    paddingVertical: 5,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  menuButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

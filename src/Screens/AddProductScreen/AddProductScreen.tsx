import { NavigationProp, useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import Back from '../../../assets/svg/ArrowLeft.svg';
import BackgroundContainer from '../../ComponentsShared/BackgroundContainer/BackgroundContainer';
import GenericText from '../../ComponentsShared/GenericText/GenericText';
import { Colors } from '../../Constants/Colors';
import { NavigationParams } from '../../Navigation/Screens';
import AddProductForm from './AddProductForm';

type Props = {};

const AddProductScreen = (props: Props) => {
  const navigation = useNavigation<NavigationProp<NavigationParams>>();

  return (
    <BackgroundContainer containerStyles={{}}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
        >
          <Back width={28} height={24} />
        </TouchableOpacity>
        <GenericText
          textType={'SubTitle'}
          text={t('forms.addProduct')}
          textStyles={styles.title}
        />
      </View>
      <AddProductForm />
    </BackgroundContainer>
  );
};

export default AddProductScreen;

const styles = StyleSheet.create({
  headerContainer: {
    width: Platform.OS == 'ios' ? '70%' : '75%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    paddingTop: 5,
  },
  goBackButton: {
    backgroundColor: Colors.gray3,
    borderRadius: 50,
    padding: 4,
  },
});

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import Add from '../../../assets/svg/add.svg';
import BackgroundContainer from '../../ComponentsShared/BackgroundContainer/BackgroundContainer';
import GenericHeader from '../../ComponentsShared/GenericHeader/GenericHeader';
import GiveOrChangeMenu from '../../ComponentsShared/GiveOrChangeMenu/GiveOrChangeMenu';
import Screens, { NavigationParams } from '../../Navigation/Screens';

type Props = {};

const MyGiveAway = (props: Props) => {
  const navigation = useNavigation<NavigationProp<NavigationParams>>();
  const [chosen, setChosen] = useState(1);
  return (
    <BackgroundContainer containerStyles={{}}>
      <GenericHeader
        onPress={() => navigation.navigate(Screens.AddProduct)}
        icon={<Add width={18} height={18} />}
      />
      <GiveOrChangeMenu
        onPress1={() => {
          setChosen(1);
        }}
        onPress2={() => {
          setChosen(2);
        }}
        title1={t('menuButtons.gaving')}
        title2={t('menuButtons.exchanging')}
        chosen={chosen}
      />
      <Text>MyGiveAway</Text>
    </BackgroundContainer>
  );
};

export default MyGiveAway;

const styles = StyleSheet.create({});

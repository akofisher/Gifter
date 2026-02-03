import { NavigationProp, useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import BackgroundContainer from '../../ComponentsShared/BackgroundContainer/BackgroundContainer';
import GenericCard from '../../ComponentsShared/GenericCard/GenericCard';
import GenericFlatList from '../../ComponentsShared/GenericFlatList/GenericFlatList';
import GenericHeader from '../../ComponentsShared/GenericHeader/GenericHeader';
import GenericText from '../../ComponentsShared/GenericText/GenericText';
import { News } from '../../Data/Data';
import Screens, { NavigationParams } from '../../Navigation/Screens';

type Props = {};

const HomeScreen = (props: Props) => {
  const navigation = useNavigation<NavigationProp<NavigationParams>>();

  return (
    <BackgroundContainer containerStyles={{}}>
      <GenericHeader
        onPress={() => navigation.navigate(Screens.MyMessagesStack)}
        icon={undefined}
      />
      <GenericText
        textType={'Title'}
        text={t('news.news')}
        textStyles={{ paddingVertical: 15 }}
      />
      <GenericFlatList
        type="vertical"
        data={News}
        renderItem={({ item, index, onPress }) => (
          <GenericCard
            onPress={() => navigation.navigate(Screens.SingleBlog)}
            key={index}
            cardType={'Blog'}
            data={item}
          />
        )}
        handleItemPress={item => console.log('Pressed item:', item)}
        emptyComponent={
          <Text style={{ alignSelf: 'center', marginTop: 100 }}>
            {t('emptyProducts')}
          </Text>
        }
      />
    </BackgroundContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

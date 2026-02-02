import { NavigationProp, useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import BackgroundContainer from '../../ComponentsShared/BackgroundContainer/BackgroundContainer';
import GenericCard from '../../ComponentsShared/GenericCard/GenericCard';
import GenericFlatList from '../../ComponentsShared/GenericFlatList/GenericFlatList';
import GenericHeader from '../../ComponentsShared/GenericHeader/GenericHeader';
import GenericTextInput from '../../ComponentsShared/GenericInput/GenericInput';
import GenericText from '../../ComponentsShared/GenericText/GenericText';
import SliderMenu from '../../ComponentsShared/SliderMenu/SliderMenu';
import { Product } from '../../Data/Data';
import Screens, { NavigationParams } from '../../Navigation/Screens';
import { setCategory } from '../../Store/Slices/FilterSlice';
import { useAppDispatch, useAppSelector } from '../../Store/store';
import {
  filterByCategory,
  filterBySearch,
} from '../../Utils/filterbyCategory.utils';

type Props = {};

const ExchangeScreen = (props: Props) => {
  const navigation = useNavigation<NavigationProp<NavigationParams>>();
  const category = useAppSelector(state => state.filters.category);
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    const byCategory = filterByCategory(Product, category);
    return filterBySearch(byCategory, searchQuery);
  }, [Product, category, searchQuery]);
  return (
    <BackgroundContainer containerStyles={{}}>
      <GenericHeader
        onPress={() => navigation.navigate(Screens.MyMessagesStack)}
        icon={undefined}
      />
      <SliderMenu
        onPress={item => dispatch(setCategory(item))}
        choosenId={category?.id}
      />
      <GenericTextInput
        inputType={'SearchInput'}
        onChangeText={e => setSearchInput(e)}
        onPressSearch={() => setSearchQuery(searchInput)}
      />
      <GenericText
        textType={'Title'}
        text={t('exchange.exchange')}
        textStyles={{ paddingVertical: 15 }}
      />
      <GenericFlatList
        type="vertical"
        data={filtered}
        renderItem={({ item, index, onPress }) => (
          <GenericCard
            onPress={() => navigation.navigate(Screens.SingleExchange)}
            key={index}
            cardType={'Exchange'}
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

export default ExchangeScreen;

const styles = StyleSheet.create({});

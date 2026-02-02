import { t } from 'i18next';
import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Colors } from '../../Constants/Colors';
import { Categories } from '../../Data/Data';
import { CategoryInterface } from '../../Services/NewsData';
import { useAppSelector } from '../../Store/store';
import GenericFlatList from '../GenericFlatList/GenericFlatList';
import SliderButton from './SliderButton';

type Props = {
  onPress: (arg: CategoryInterface) => void;
  choosenId: number | string | undefined;
};

const SliderMenu = ({ onPress, choosenId }: Props) => {
  const category = useAppSelector(state => state.filters.category);

  useEffect(() => {
    console.log(category);
  }, [category]);

  return (
    <>
      <GenericFlatList
        type="horizontal"
        data={Categories}
        renderItem={({ item, index }) => (
          <SliderButton
            key={index}
            onPress={() => onPress(item)}
            title={item?.name}
            id={item?.id}
            choosenId={choosenId}
          />
        )}
        handleItemPress={item => console.log('Pressed item:', item)}
        emptyComponent={<Text>{t('emptyProducts')}</Text>}
        contentContainerStyle={{
          paddingVertical: 15,
          alignItems: 'center',
          backgroundColor: Colors.gray2,
        }}
      />
    </>
  );
};

export default SliderMenu;

const styles = StyleSheet.create({});

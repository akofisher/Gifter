import React, { ReactElement, forwardRef } from 'react';
import { FlatList, Platform, StyleSheet, ViewStyle } from 'react-native';

interface GenericFlatListProps {
  data: any[];
  renderItem: (info: {
    item: any;
    index: number;
    onPress?: (item: any) => void;
  }) => ReactElement;
  handleItemPress?: (item: any) => void;
  type?: 'vertical' | 'horizontal';
  contentContainerStyle?: ViewStyle;
  style?: ViewStyle;
  emptyComponent?: ReactElement | null;
  snapToInterval?: number;
  listFooterComponent?: ReactElement;
  pagingEnabled?: boolean;
}

const GenericFlatList = forwardRef<FlatList<any>, GenericFlatListProps>(
  (
    {
      type = 'vertical',
      data,
      renderItem,
      handleItemPress,
      contentContainerStyle,
      style,
      emptyComponent,
      snapToInterval,
      listFooterComponent,
      pagingEnabled = true,
    },
    ref,
  ) => {
    const listProps = {
      ref,
      data,
      keyExtractor: (_: any, index: { toString: () => any }) =>
        index.toString(),
      ListEmptyComponent: emptyComponent || null,
      renderItem: ({ item, index }: any) =>
        renderItem({ item, index, onPress: handleItemPress }),
      showsHorizontalScrollIndicator: false,
      showsVerticalScrollIndicator: type === 'vertical',
      contentContainerStyle: [
        type === 'vertical'
          ? styles.verticalContainer
          : styles.horizontalContainer,
        contentContainerStyle,
      ],
      style,
      pagingEnabled,
      ListFooterComponent: listFooterComponent || undefined,
    };

    if (type === 'horizontal') {
      return (
        <FlatList
          {...listProps}
          horizontal
          snapToInterval={snapToInterval}
          decelerationRate="fast"
        />
      );
    }

    return <FlatList {...listProps} />;
  },
);

export default GenericFlatList;

const styles = StyleSheet.create({
  horizontalContainer: {
    paddingEnd: Platform.OS === 'ios' ? 60 : 200,
  },
  verticalContainer: {
    paddingBottom: Platform.OS === 'ios' ? 100 : 200,
    paddingHorizontal: 20,
    minHeight: '100%',
  },
});

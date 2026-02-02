import { NavigationProp, useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import LeftArrow from '../../../assets/svg/LeftArrow.svg';
import BackgroundContainer from '../../ComponentsShared/BackgroundContainer/BackgroundContainer';
import CarouselImage from '../../ComponentsShared/Carousel/CarouselImage';
import GenericHeader from '../../ComponentsShared/GenericHeader/GenericHeader';
import GenericText from '../../ComponentsShared/GenericText/GenericText';
import { Colors } from '../../Constants/Colors';
import { Product } from '../../Data/Data';
import Screens, { NavigationParams } from '../../Navigation/Screens';
import { getFontSizeByWindowWidth } from '../../Utils/window.util';

type Props = {};

const SingleProduct = (props: Props) => {
  let data = Product[2];
  const navigation = useNavigation<NavigationProp<NavigationParams>>();
  return (
    <BackgroundContainer containerStyles={{}}>
      <GenericHeader
        onPress={() => navigation.navigate(Screens.MyMessagesStack)}
        icon={undefined}
      />
      <CarouselImage media={Product[2]?.images} />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          width: 35,
          height: 35,
          borderRadius: 35 / 2,
          backgroundColor: Colors.gray3,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 70,
          left: 10,
        }}
        activeOpacity={0.7}
      >
        <LeftArrow width={16} height={14} />
      </TouchableOpacity>
      <View style={styles.flexibleCol}>
        <GenericText
          textType={'Universal'}
          text={data?.title}
          textStyles={styles.BlogTitle}
        />
        <GenericText
          textType={'Universal'}
          text={data?.description}
          textStyles={styles.BlogDescription}
          numberOfLines={20}
        />
        <View style={styles.flexibleRow}>
          <GenericText
            textType={'Universal'}
            text={`${t('cards.gifter')}: ${data?.owner}`}
            textStyles={styles.Owner}
          />
          <GenericText
            textType={'Universal'}
            text={
              data?.giftedOrExchanged == 1
                ? t('cards.giveing')
                : t('cards.given')
            }
            textStyles={
              data?.giftedOrExchanged == 1 ? styles.Gift : styles.Gifted
            }
          />
        </View>
      </View>
    </BackgroundContainer>
  );
};

export default SingleProduct;

const styles = StyleSheet.create({
  BlogTitle: {
    color: Colors.black,
    fontSize: getFontSizeByWindowWidth(15),
    fontWeight: '700',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  Owner: {
    color: Colors.black,
    fontSize: getFontSizeByWindowWidth(10),
    fontWeight: '500',
    padding: 10,
  },
  Gift: {
    color: Colors.mein,
    fontSize: getFontSizeByWindowWidth(10),
    fontWeight: '500',
    padding: 10,
  },
  Gifted: {
    color: Colors.red,
    fontSize: getFontSizeByWindowWidth(10),
    fontWeight: '500',
    padding: 10,
  },
  BlogDescription: {
    color: Colors.black,
    fontSize: getFontSizeByWindowWidth(12),
    fontWeight: '400',
    paddingHorizontal: 10,
  },
  flexibleCol: {
    height: 140,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  flexibleRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

import { t } from 'i18next';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../Constants/Colors';
import {
  BlogDataInterface,
  ProductDataInterface,
} from '../../Services/NewsData';
import { getFontSizeByWindowWidth } from '../../Utils/window.util';
import GenericText from '../GenericText/GenericText';

type Props = {
  cardType: 'List' | 'Horizontal' | 'Blog' | 'Exchange';
  data: BlogDataInterface & ProductDataInterface;
  cardStyles?: object;
  onPress: () => void;
};

const GenericCard = ({ cardType, cardStyles, data, onPress }: Props) => {
  let CardElement;
  switch (cardType) {
    case 'List':
      CardElement = (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.ListCardStyles, cardStyles]}
        >
          <Image
            source={{ uri: data?.images[0] }}
            style={[styles.squareImage]}
          />
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
              numberOfLines={4}
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
        </TouchableOpacity>
      );

      break;
    case 'Exchange':
      CardElement = (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.ListCardStyles, cardStyles]}
        >
          <Image
            source={{ uri: data?.images[0] }}
            style={[styles.squareImage]}
          />
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
              numberOfLines={4}
            />
            <View style={styles.flexibleRow}>
              <GenericText
                textType={'Universal'}
                text={`${t('cards.changes')}: ${data?.owner}`}
                textStyles={styles.Owner}
              />
              <GenericText
                textType={'Universal'}
                text={
                  data?.giftedOrExchanged == 1
                    ? t('cards.changeing')
                    : t('cards.changed')
                }
                textStyles={
                  data?.giftedOrExchanged == 1 ? styles.Gift : styles.Gifted
                }
              />
            </View>
          </View>
        </TouchableOpacity>
      );

      break;
    case 'Horizontal':
      CardElement = (
        <TouchableOpacity
          style={[styles.HorizonCardStyles, cardStyles]}
        ></TouchableOpacity>
      );

      break;
    case 'Blog':
      CardElement = (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.BlogCardStyles, cardStyles]}
        >
          <Image
            source={{ uri: data?.images[0] }}
            style={[styles.squareImage]}
          />
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
              numberOfLines={4}
            />

            <View style={styles.flexibleRow}>
              <GenericText
                textType={'Universal'}
                text={`${t('cards.fully')}  -->`}
                textStyles={styles.fully}
              />
              <GenericText
                textType={'Universal'}
                text={data?.date}
                textStyles={styles.date}
              />
            </View>
          </View>
        </TouchableOpacity>
      );

      break;

    default:
      break;
  }
  return CardElement;
};

export default GenericCard;

const styles = StyleSheet.create({
  ListCardStyles: {
    width: '100%',
    height: 300,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginVertical: 10,
    overflow: 'hidden',
  },
  HorizonCardStyles: {},
  BlogCardStyles: {
    width: '100%',
    height: 300,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginVertical: 10,
    overflow: 'hidden',
  },
  squareImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
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
  date: {
    color: Colors.dark,
    fontSize: getFontSizeByWindowWidth(10),
    fontWeight: '500',
    padding: 10,
  },
  fully: {
    color: Colors.mein,
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

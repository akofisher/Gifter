import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { Colors } from '../../Constants/Colors';
import { getFontSizeByWindowWidth } from '../../Utils/window.util';

type Props = {
  textType: 'Title' | 'SubTitle' | 'Universal';
  text: string | number;
  textStyles?: object;
  numberOfLines?: number;
};

const GenericText = ({ textType, text, textStyles, numberOfLines }: Props) => {
  let TextElement;
  switch (textType) {
    case 'Title':
      TextElement = (
        <Text
          numberOfLines={numberOfLines}
          style={[styles.titleStyle, textStyles]}
        >
          {text}
        </Text>
      );

      break;
    case 'SubTitle':
      TextElement = (
        <Text
          numberOfLines={numberOfLines}
          style={[styles.subTitleStyle, textStyles]}
        >
          {text}
        </Text>
      );

      break;
    case 'Universal':
      TextElement = (
        <Text
          numberOfLines={numberOfLines}
          style={[styles.universalStyle, textStyles]}
        >
          {text}
        </Text>
      );

      break;
    default:
      break;
  }
  return TextElement;
};

export default GenericText;

const styles = StyleSheet.create({
  titleStyle: {
    textAlign: 'center',
    color: Colors.black,
    fontSize: getFontSizeByWindowWidth(18),
    fontWeight: '700',
  },
  subTitleStyle: {
    textAlign: 'center',
    color: Colors.black,
    fontSize: getFontSizeByWindowWidth(14),
    fontWeight: '500',
  },
  universalStyle: {},
});

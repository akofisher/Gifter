import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../Constants/Colors';
import { getFontSizeByWindowWidth } from '../../Utils/window.util';
import GenericText from '../GenericText/GenericText';

type Props = {
  id: string | number;
  choosenId: string | number | undefined;
  title: string;
  onPress: () => void;
};

const SliderButton = ({ title, id, choosenId, onPress }: Props) => {
  return (
    <TouchableOpacity style={[styles.sliderMenuButton]} onPress={onPress}>
      <GenericText
        textType={'Universal'}
        text={title}
        textStyles={[
          styles.buttonText,
          { color: choosenId == id ? Colors.mein : Colors.black },
        ]}
      />
    </TouchableOpacity>
  );
};

export default SliderButton;

const styles = StyleSheet.create({
  sliderMenuButton: {
    height: 30,
    paddingHorizontal: 7,
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: getFontSizeByWindowWidth(10),
    fontWeight: 400,
    color: Colors.black,
  },
});

import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../Constants/Colors';
import {
  SCREEN_WIDTH,
  getFontSizeByWindowWidth,
} from '../../Utils/window.util';
import GenericText from '../GenericText/GenericText';

type Props = {
  onPress1: () => void;
  onPress2: () => void;
  title1: string;
  title2: string;
  chosen: number;
};

const GiveOrChangeMenu = ({
  onPress1,
  onPress2,
  title1,
  title2,
  chosen,
}: Props) => {
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity
        onPress={onPress1}
        style={chosen == 1 ? styles.chosenMenuButton : styles.menuButton}
      >
        <GenericText
          textType={'Universal'}
          text={title1}
          textStyles={styles.buttonText}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPress2}
        style={[
          chosen == 2 ? styles.chosenMenuButton : styles.menuButton,
          { borderLeftWidth: 1.5, borderLeftColor: Colors.gray2 },
        ]}
      >
        <GenericText
          textType={'Universal'}
          text={title2}
          textStyles={styles.buttonText}
        />
      </TouchableOpacity>
    </View>
  );
};

export default GiveOrChangeMenu;

const styles = StyleSheet.create({
  menuContainer: {
    width: SCREEN_WIDTH,
    flexDirection: 'row',
  },
  menuButton: {
    width: SCREEN_WIDTH / 2,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.gray2,
  },
  chosenMenuButton: {
    width: SCREEN_WIDTH / 2,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.green,
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.black,
    fontSize: getFontSizeByWindowWidth(14),
    fontWeight: '500',
  },
});

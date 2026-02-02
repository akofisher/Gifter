import React, { ReactNode } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Colors } from '../../Constants/Colors';

type Props = {
  children: ReactNode;
  containerStyles: object | null;
};

const BackgroundContainer = ({ children, containerStyles }: Props) => {
  return (
    <SafeAreaView style={[styles.container, containerStyles]}>
      {/* <KeyboardAwareScrollView
        contentContainerStyle={[styles.container, containerStyles]}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
      > */}
      {children}
      {/* </KeyboardAwareScrollView> */}
    </SafeAreaView>
  );
};

export default BackgroundContainer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    backgroundColor: Colors.gray1,
  },
});

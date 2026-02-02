import React from 'react';
import { Modal, Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { Colors } from '../../Constants/Colors';

type GenericModalContainerProps = {
  visible: boolean;
  onClose?: () => void;

  animationType?: 'none' | 'slide' | 'fade';
  closeOnBackdropPress?: boolean;
  closeOnBackButtonPress?: boolean;

  backdropStyle?: ViewStyle;
  containerStyle?: ViewStyle;

  children: React.ReactNode;
};

const GenericModal: React.FC<GenericModalContainerProps> = ({
  visible,
  onClose,
  animationType = 'fade',
  closeOnBackdropPress = true,
  closeOnBackButtonPress = true,
  backdropStyle,
  containerStyle,
  children,
}) => {
  const handleRequestClose = () => {
    if (!closeOnBackButtonPress) return;
    onClose?.();
  };

  const handleBackdropPress = () => {
    if (!closeOnBackdropPress) return;
    onClose?.();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType={animationType}
      statusBarTranslucent
      onRequestClose={handleRequestClose}
    >
      <View style={[styles.backdrop, backdropStyle]}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={handleBackdropPress}
        />

        <View style={[styles.container, containerStyle]}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: Colors.lightbgfordark,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  container: {
    width: '100%',
    maxWidth: 520,
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,

    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
});

export default GenericModal;

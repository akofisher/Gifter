import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import Back from '../../../../assets/svg/ArrowLeft.svg';
import BackgroundContainer from '../../../ComponentsShared/BackgroundContainer/BackgroundContainer';
import { Colors } from '../../../Constants/Colors';
import { NavigationParams } from '../../../Navigation/Screens';
type Props = {};

const MyMessages = (props: Props) => {
  const navigation = useNavigation<NavigationProp<NavigationParams>>();

  return (
    <BackgroundContainer containerStyles={{}}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
        >
          <Back width={28} height={24} />
        </TouchableOpacity>
      </View>
    </BackgroundContainer>
  );
};

export default MyMessages;

const styles = StyleSheet.create({
  headerContainer: {
    width: Platform.OS == 'ios' ? '70%' : '75%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    paddingTop: 5,
  },
  goBackButton: {
    backgroundColor: Colors.gray3,
    borderRadius: 50,
    padding: 4,
  },
});

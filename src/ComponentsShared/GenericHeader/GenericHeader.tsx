import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Menu from '../../../assets/svg/Menu.svg';
import HaveMessages from '../../../assets/svg/haveMessages.svg';
import NoMessages from '../../../assets/svg/noMessages.svg';
import { Colors } from '../../Constants/Colors';
import { Messages } from '../../Data/Data';
import Screens, { NavigationParams } from '../../Navigation/Screens';

type Props = {
  onPress: () => void;
  icon: string | React.ReactNode;
};

const GenericHeader = ({ onPress, icon }: Props) => {
  const navigation = useNavigation<NavigationProp<NavigationParams>>();
  const Notification = Messages;

  const Open = () => {
    //@ts-ignore
    navigation.openDrawer();
  };
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => Open()} style={styles.headerButtons}>
        <Menu />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: Screens.TabStack }],
          })
        }
        style={styles.headerButtons}
      >
        <Text>Gifter</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress} style={styles.headerButtons}>
        {icon ? (
          icon
        ) : Notification?.length > 0 ? (
          <HaveMessages width={30} height={30} />
        ) : (
          <NoMessages width={30} height={30} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default GenericHeader;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerButtons: {
    paddingHorizontal: 20,
    height: '100%',
    justifyContent: 'center',
  },
  headerText: {},
  lottie: {
    width: 50,
    height: 50,
  },
});

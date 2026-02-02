import { NavigationProp, useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import React, { useRef } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Back from '../../../../assets/svg/ArrowLeft.svg';
import BackgroundContainer from '../../../ComponentsShared/BackgroundContainer/BackgroundContainer';
import GenericText from '../../../ComponentsShared/GenericText/GenericText';
import { Colors } from '../../../Constants/Colors';
import { Chats, User } from '../../../Data/Data';
import { NavigationParams } from '../../../Navigation/Screens';
import ChatCard from './ChatCard';
type Props = {};

const MyChats = (props: Props) => {
  const navigation = useNavigation<NavigationProp<NavigationParams>>();
  const scrollRef = useRef<ScrollView>(null);
  const Data = Chats;
  return (
    <BackgroundContainer containerStyles={{}}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
        >
          <Back width={28} height={24} />
        </TouchableOpacity>
        <GenericText
          textType={'SubTitle'}
          text={t('forms.messages')}
          textStyles={styles.title}
        />
      </View>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.formContainer}
        keyboardShouldPersistTaps="handled"
      >
        {Data.map((val, idx) => (
          <ChatCard key={idx} data={val} currentUserId={User?.id} />
        ))}
      </ScrollView>
    </BackgroundContainer>
  );
};

export default MyChats;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    borderBottomColor: Colors.gray2,
    borderBottomWidth: 1.5,
  },
  title: {
    paddingTop: 5,
    marginHorizontal: 'auto',
  },
  goBackButton: {
    backgroundColor: Colors.gray3,
    borderRadius: 50,
    padding: 4,
  },
  formContainer: {
    paddingBottom: 50,
  },
});

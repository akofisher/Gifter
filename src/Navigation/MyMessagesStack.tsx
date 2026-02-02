import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import MyChats from '../Screens/Messages/MyMessages/MyMessages';
import MyMessages from '../Screens/Messages/MyChats/MyChats';
import Screens from './Screens';

const Stack = createNativeStackNavigator();

const MyMessagesStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screens.MyMessages} component={MyMessages} />
      <Stack.Screen name={Screens.MyChat} component={MyChats} />
    </Stack.Navigator>
  );
};

export default MyMessagesStack;

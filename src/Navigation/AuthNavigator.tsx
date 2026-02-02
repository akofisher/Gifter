import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from '../Screens/Auth/Login/Login';
import Recover from '../Screens/Auth/Recover/Recover';
import Register from '../Screens/Auth/Register/Register';
import Screens from './Screens';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screens.Login} component={Login} />
      <Stack.Screen name={Screens.Register} component={Register} />
      <Stack.Screen name={Screens.Recover} component={Recover} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

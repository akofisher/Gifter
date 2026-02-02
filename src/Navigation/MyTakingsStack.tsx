import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddProductScreen from '../Screens/AddProductScreen/AddProductScreen';
import MyTakings from '../Screens/MyTakings/MyTakings';
import Screens from './Screens';

const Stack = createNativeStackNavigator();

const MyTakingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screens.MyTakings} component={MyTakings} />
      <Stack.Screen name={Screens.AddProduct} component={AddProductScreen} />
    </Stack.Navigator>
  );
};

export default MyTakingsStack;

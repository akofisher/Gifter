import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddProductScreen from '../Screens/AddProductScreen/AddProductScreen';
import MyGiveAway from '../Screens/MyGiveAway/MyGiveAway';
import Screens from './Screens';

const Stack = createNativeStackNavigator();

const MyGiveAwayStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screens.MyGiveAways} component={MyGiveAway} />
      <Stack.Screen name={Screens.AddProduct} component={AddProductScreen} />
    </Stack.Navigator>
  );
};

export default MyGiveAwayStack;

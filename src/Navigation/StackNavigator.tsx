import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ExchangeScreen from '../Screens/ExchangeScreen/ExchangeScreen';
import HomeScreen from '../Screens/Home/HomeScreen';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import SingleBlog from '../Screens/SingleBlog/SingleBlog';
import SingleExchange from '../Screens/SingleExchange/SingleExchange';
import SingleProduct from '../Screens/SingleProduct/SingleProduct';
import Screens from './Screens';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Screens.Blog} component={HomeScreen} />
      <Stack.Screen name={Screens.Profile} component={ProfileScreen} />
      <Stack.Screen name={Screens.SingleBlog} component={SingleBlog} />
      <Stack.Screen name={Screens.SingleGift} component={SingleProduct} />
      <Stack.Screen name={Screens.SingleExchange} component={SingleExchange} />
      <Stack.Screen name={Screens.Exchange} component={ExchangeScreen} />
      {/* <Stack.Screen name={Screens.MyMessages} component={MyMessages} />
      <Stack.Screen name={Screens.MyChat} component={MyChats} /> */}
      {/* <Stack.Screen name={Screens.MyGiveAways} component={MyGiveAway} />
      <Stack.Screen name={Screens.MyTakings} component={MyTakings} /> */}
      {/* <Stack.Screen name={Screens.AddProduct} component={AddProductScreen} /> */}
    </Stack.Navigator>
  );
};

export default StackNavigator;

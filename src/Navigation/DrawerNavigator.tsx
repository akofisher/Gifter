import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import DrawerContent from '../ComponentsShared/Drawer/DrawerContent';
import DevicesScreen from '../Screens/Devices/DevicesScreen';
import ExchangeScreen from '../Screens/ExchangeScreen/ExchangeScreen';
import HomeScreen from '../Screens/Home/HomeScreen';
import ProductsScreen from '../Screens/Products/ProductsScreen';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import SingleBlog from '../Screens/SingleBlog/SingleBlog';
import SingleExchange from '../Screens/SingleExchange/SingleExchange';
import SingleProduct from '../Screens/SingleProduct/SingleProduct';
import MyGiveAwayStack from './MyGiveAwayStack';
import MyMessagesStack from './MyMessagesStack';
import MyTakingsStack from './MyTakingsStack';
import Screens from './Screens';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props: any) => <DrawerContent />}>
      <Drawer.Screen
        name={Screens.TabStack}
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={Screens.SingleBlog}
        component={SingleBlog}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={Screens.SingleGift}
        component={SingleProduct}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={Screens.Blog}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={Screens.Gifts}
        component={ProductsScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={Screens.Profile}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={Screens.Exchange}
        component={ExchangeScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={Screens.SingleExchange}
        component={SingleExchange}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={Screens.MyGiveAwayStack}
        component={MyGiveAwayStack}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={Screens.MyTakingsStack}
        component={MyTakingsStack}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={Screens.MyMessagesStack}
        component={MyMessagesStack}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={Screens.Settings}
        component={DevicesScreen}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

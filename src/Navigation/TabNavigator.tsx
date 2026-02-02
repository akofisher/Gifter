import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform } from 'react-native';
import HomeIcon from '../../assets/svg/blog.svg';
import Exchange from '../../assets/svg/exchange.svg';
import Gift from '../../assets/svg/gift.svg';
import User from '../../assets/svg/profile.svg';
import { Colors } from '../Constants/Colors';
import ExchangeScreen from '../Screens/ExchangeScreen/ExchangeScreen';
import HomeScreen from '../Screens/Home/HomeScreen';
import ProductsScreen from '../Screens/Products/ProductsScreen';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import type { NavigationParams } from './Screens';
import Screens from './Screens';

const Tab = createBottomTabNavigator<NavigationParams>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.mein,
        tabBarInactiveTintColor: Colors.dark,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarStyle: {
          height: Platform.OS == 'ios' ? 50 : 60,
          backgroundColor: Colors.gray1
        },
        
      })}
    >
      <Tab.Screen
        name={Screens.Blog}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <HomeIcon
              width={22}
              height={22}
              fill={focused ? Colors.mein : Colors.dark}
              color={focused ? Colors.mein : Colors.dark}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Screens.Gifts}
        component={ProductsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Gift
              width={30}
              height={30}
              fill={focused ? Colors.mein : Colors.dark}
              color={focused ? Colors.mein : Colors.dark}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Screens.Exchange}
        component={ExchangeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Exchange
              width={35}
              height={45}
              fill={focused ? Colors.mein : Colors.dark}
              color={focused ? Colors.mein : Colors.dark}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Screens.Profile}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <User
              width={30}
              height={30}
              fill={focused ? Colors.mein : Colors.dark}
              color={focused ? Colors.mein : Colors.dark}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

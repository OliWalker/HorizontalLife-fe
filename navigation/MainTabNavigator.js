import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import GymListScreen from '../screens/GymListScreen';
import HomeGymScreen from '../screens/HomeGymScreen';

import RoutesScreen from '../screens/RoutesScreen';
import PostScreen from '../screens/PostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ImagePickerScreen from '../screens/ImagePickerScreen';
import DrawingScreen from '../screens/DrawingScreen';
import UploadRouteScreen from '../screens/UploadRouteScreen';
import RoutePreviewScreen from '../screens/RoutePreviewScreen';

const GymsStack = createStackNavigator({
  Gyms: GymListScreen,
  HomeGymScreen: { screen: HomeGymScreen },
});

GymsStack.navigationOptions = {
  tabBarLabel: 'Gyms',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const RoutesStack = createStackNavigator({
  Routes: RoutesScreen,
  Post: PostScreen,
});

RoutesStack.navigationOptions = {
  tabBarLabel: 'Routes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const ImageUploadStack = createStackNavigator({
  ImagePicker: ImagePickerScreen,
  DrawingScreen,
  UploadRouteScreen,
  RoutePreviewScreen,
});

ImageUploadStack.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
};

const TabNavigator = createBottomTabNavigator({
  GymsStack,
  RoutesStack,
  ProfileStack,
});

TabNavigator.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
};

export default createStackNavigator({
  Tabs: TabNavigator,
  ImageUploadStack, //route to render above the tab bar
  RoutePreviewScreen,
});

import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import GymListScreen from '../screens/GymListScreen';
import RoutesScreen from '../screens/RoutesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ImagePickerScreen from '../screens/ImagePickerScreen';
// import UnusedScreen from '../screens/UnusedScreen';

const GymsStack = createStackNavigator({
  Gyms: GymListScreen
});

GymsStack.navigationOptions = {
  tabBarLabel: 'Gyms',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  )
};
const RoutesStack = createStackNavigator({
  Routes: RoutesScreen,
  ImagePicker: ImagePickerScreen
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
  )
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  )
};

// const UnusedStack = createStackNavigator({
//   Unused: UnusedScreen
// });

// UnusedStack.navigationOptions = {
//   tabBarLabel: 'Unused',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
//     />
//   )
// };

export default createBottomTabNavigator({
  GymsStack,
  RoutesStack,
  ProfileStack
  // UnusedStack
});

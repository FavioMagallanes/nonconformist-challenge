import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/home-screen';
import {TakePhotoScreen} from '../screens/take-photo-screen';
import {PhotoModal} from '../photos/components/photo-modal';
import {RootStackParamList} from './types';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Home'}}
      />
      <Stack.Screen
        name="PhotoScreen"
        component={PhotoModal}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="TakePhoto"
        component={TakePhotoScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/home-screen';
import {PhotoScreen} from '../screens/photo-screen';
import {TakePhotoScreen} from '../screens/take-photo-screen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Home'}}
      />
      <Stack.Screen
        name="Photo"
        component={PhotoScreen}
        options={{title: 'Photo'}}
      />
      <Stack.Screen
        name="TakePhoto"
        component={TakePhotoScreen}
        options={{title: 'Take Photo'}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

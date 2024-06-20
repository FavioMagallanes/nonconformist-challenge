import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/home-screen';
import {TakePhotoScreen} from '../screens/take-photo-screen';
import {PhotoModal} from '../photos/components/photo-modal';
import {RootStackParamList} from './types';
import SplashScreen from '../screens/splash-screen';

const Stack = createStackNavigator<RootStackParamList>();

const HeaderIcon = () => (
  <View style={{marginRight: 16}}>
    <Image
      style={styles.logo}
      source={require('../assets/logo.jpg')}
      resizeMode="contain"
    />
  </View>
);

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerRight: () => <HeaderIcon />,
      }}>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Home" component={HomeScreen} options={{title: ''}} />
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

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: 10,
  },
});

export default AppNavigator;

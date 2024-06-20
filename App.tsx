import 'react-native-gesture-handler';

import React from 'react';
import AppNavigator from './src/navigation/app-navigator';
import {NavigationContainer} from '@react-navigation/native';
import {View} from 'react-native';
import {globalStyles} from './src/styles/global-styles';
import {PhotoProvider} from './src/context/photo-context';
import {LocationProvider} from './src/context/location-context';

const App = () => {
  return (
    <View style={globalStyles.container}>
      <NavigationContainer>
        <PhotoProvider>
          <LocationProvider>
            <AppNavigator />
          </LocationProvider>
        </PhotoProvider>
      </NavigationContainer>
    </View>
  );
};

export default App;

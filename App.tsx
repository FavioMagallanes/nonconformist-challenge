import 'react-native-gesture-handler';

import React from 'react';
import AppNavigator from './src/navigation/app-navigator';
import {NavigationContainer} from '@react-navigation/native';
import {View} from 'react-native';
import {globalStyles} from './src/styles/global-styles';
import {PhotoProvider} from './src/context/photo-context';

const App = () => {
  return (
    <View style={globalStyles.container}>
      <NavigationContainer>
        <PhotoProvider>
          <AppNavigator />
        </PhotoProvider>
      </NavigationContainer>
    </View>
  );
};

export default App;

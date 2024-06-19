import 'react-native-gesture-handler';

import React from 'react';
import AppNavigator from './src/navigation/app-navigator';
import {NavigationContainer} from '@react-navigation/native';
import {View} from 'react-native';
import {globalStyles} from './src/styles/global-styles';

const App = () => {
  return (
    <View style={globalStyles.container}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </View>
  );
};

export default App;

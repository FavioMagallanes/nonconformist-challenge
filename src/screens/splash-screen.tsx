import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SplashScreenNavigationProp} from '../navigation/types';
import {SvgXml} from 'react-native-svg';
import {logoSvg} from '../components/logo';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <SvgXml xml={logoSvg} width="200" height="200" fill="white" />
      <Text style={styles.welcomeText}>Welcome!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F40084',
  },
  welcomeText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default SplashScreen;

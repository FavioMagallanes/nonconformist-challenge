import React from 'react';
import {View, StyleSheet} from 'react-native';
import {PhotoList} from '../photos/components/photo-list';
import {TakePhotoButton} from '../photos/components/take-photo-button';
import {globalStyles} from '../styles/global-styles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/types';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const imageUrls = [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
  ];

  const handleTakePhoto = () => {
    navigation.navigate('TakePhoto');
  };

  return (
    <View style={globalStyles.container}>
      <PhotoList imageUrls={imageUrls} />
      <View style={styles.buttonContainer}>
        <TakePhotoButton onPress={handleTakePhoto} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default HomeScreen;

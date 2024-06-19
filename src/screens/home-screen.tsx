import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import {PhotoList} from '../photos/components/photo-list';
import {TakePhotoButton} from '../photos/components/take-photo-button';
import {globalStyles} from '../styles/global-styles';
import {useNavigation} from '@react-navigation/native';
import {usePhotoContext} from '../context/photo-context';

export const HomeScreen: FC = () => {
  const navigation = useNavigation();
  const {photos} = usePhotoContext();

  const handleTakePhoto = () => {
    navigation.navigate('TakePhoto' as never);
  };

  return (
    <View style={globalStyles.container}>
      <PhotoList photos={photos} />
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

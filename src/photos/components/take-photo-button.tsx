import React, {FC} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type TakePhotoButtonProps = {
  onPress: () => void;
};

export const TakePhotoButton: FC<TakePhotoButtonProps> = ({onPress}) => {
  const handleCapture = () => {
    try {
      onPress();
    } catch (error) {
      console.error('Error al capturar la imagen:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.takePictureButton} onPress={handleCapture}>
      <Icon name="camera-outline" size={30} color="#f0f0f8" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  takePictureButton: {
    alignSelf: 'center',
    borderRadius: 50,
    backgroundColor: '#F40084',
    marginBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});

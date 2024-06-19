import React, {FC} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type TakePictureButtonProps = {
  onPress: () => void;
};

export const TakePhotoButton: FC<TakePictureButtonProps> = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.takePictureButton} onPress={onPress}>
      <Icon name="camera-outline" size={30} color="#f0f0f8" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  takePictureButton: {
    alignSelf: 'center',
    borderRadius: 50,
    backgroundColor: '#c2c1e1',
    marginBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});

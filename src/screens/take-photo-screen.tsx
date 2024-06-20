import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import {Camera} from 'react-native-camera-kit';
import {TakePhotoButton} from '../photos/components/take-photo-button';
import {useCamera} from '../photos/hooks/use-camera';

export const TakePhotoScreen: FC = () => {
  const {cameraRef, handleCapture} = useCamera();

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        cameraType={'back'}
        style={styles.camera}
        flashMode={'auto'}
        focusMode={'on'}
        zoomMode={'on'}
        ratioOverlay={'1:1'}
        saveToCameraRoll={false}
        showFrame={true}
        resetFocusTimeout={0}
      />
      <TakePhotoButton onPress={handleCapture} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  textError: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TakePhotoScreen;

import {useContext, useRef, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Camera} from 'react-native-camera-kit';
import {PhotoContext} from '../../context/photo-context';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';

export const useCamera = () => {
  const navigation = useNavigation();
  const {addPhoto} = useContext(PhotoContext) || {};
  const cameraRef = useRef<Camera>(null);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    const watchLocation = async () => {
      try {
        const position = await getCurrentPosition();
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      } catch (error) {
        console.error('Error obteniendo la ubicación:', error);
      }
    };

    watchLocation();
  }, []);

  const getCurrentPosition = () => {
    return new Promise<GeolocationResponse>((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error),
        {enableHighAccuracy: true, timeout: 30000, maximumAge: 1000},
      );
    });
  };

  const handleCapture = async () => {
    if (!location) {
      console.log('La ubicación aún no está disponible.');
      return;
    }

    try {
      const image = await cameraRef.current?.capture();
      if (image && image.uri) {
        const photo = {uri: image.uri, location};
        if (addPhoto) {
          addPhoto(photo);
        }
      } else {
        console.log('No se pudo capturar la imagen.');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error al capturar la imagen:', error);
    }
  };

  return {cameraRef, handleCapture};
};

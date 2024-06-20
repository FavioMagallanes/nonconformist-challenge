/**
 * La función `useCamera` es un hook personalizado en TypeScript que maneja la captura de fotos utilizando
 * la cámara del dispositivo, incluida la comprobación de la disponibilidad de la ubicación y la adición de la
 * foto capturada a un contexto.
 * @returns El hook  `useCamera` devuelve un objeto con las siguientes propiedades:
 * - `cameraRef`: una referencia al componente de la cámara
 * - `handleCapture`: una función que captura una imagen utilizando la cámara y la añade al contexto de fotos
 * con datos de ubicación
 * - `error`: estado de error del contexto de ubicación
 */

import {useContext, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Camera} from 'react-native-camera-kit';
import {PhotoContext} from '../../context/photo-context';
import {LocationContext} from '../../context/location-context';

export const useCamera = () => {
  const navigation = useNavigation();
  const {addPhoto} = useContext(PhotoContext) || {};
  const {location, error} = useContext(LocationContext);
  const cameraRef = useRef<Camera>(null);

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

  return {cameraRef, handleCapture, error};
};

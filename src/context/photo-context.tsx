/**
 * El código define un PhotoContext y PhotoProvider en React para gestionar una lista de fotos
 * con datos de ubicación, almacenándolas en AsyncStorage.
 * @property {Photo[]} photos - La propiedad `photos` en el código representa un array de objetos `Photo`.
 * Cada objeto `Photo` tiene una propiedad `uri` de tipo string y una propiedad opcional `location`
 * de tipo `Location`, que consiste en propiedades `latitude` y `longitude` de tipo number.
 * @property addPhoto - La función `addPhoto` en el código proporcionado es una función que toma un objeto `Photo`
 * como parámetro y lo añade a la lista de fotos almacenadas en el estado del componente. Utiliza la función
 * `setPhotos` proporcionada por el gancho `useState` para actualizar el estado añadiendo la foto.
 * @property removePhoto - La función `removePhoto` en el código proporcionado es responsable de eliminar
 * una foto específica de la lista de fotos almacenadas en el contexto. Toma un objeto `Photo` como
 * parámetro y filtra la foto con una propiedad `uri` coincidente de la lista actual de fotos.
 * @property removeAllPhotos - La función `removeAllPhotos` en el fragmento de código es una función definida
 * dentro del componente `PhotoProvider`. Es responsable de eliminar todas las fotos del estado `photos`
 * y también eliminar las fotos almacenadas de AsyncStorage utilizando el método `AsyncStorage.removeItem`
 * con la clave `PHOTO_STORAGE_KEY`.
 */

import React, {createContext, useState, useContext, FC, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Location = {
  latitude: number;
  longitude: number;
};

export type Photo = {
  uri: string;
  location?: Location;
};

type PhotoContextType = {
  photos: Photo[];
  addPhoto: (photo: Photo) => void;
  removePhoto: (photo: Photo) => void;
  removeAllPhotos: () => void;
};

type PhotoProviderProps = {
  children: React.ReactNode;
};

export const PhotoContext = createContext<PhotoContextType | undefined>(
  undefined,
);

const PHOTO_STORAGE_KEY = '@photos_storage_key';

export const PhotoProvider: FC<PhotoProviderProps> = ({children}) => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const storedPhotos = await AsyncStorage.getItem(PHOTO_STORAGE_KEY);
        if (storedPhotos) {
          setPhotos(JSON.parse(storedPhotos));
        }
      } catch (error) {
        console.error('Error loading photos from AsyncStorage', error);
      }
    };

    loadPhotos();
  }, []);

  useEffect(() => {
    const savePhotos = async () => {
      try {
        await AsyncStorage.setItem(PHOTO_STORAGE_KEY, JSON.stringify(photos));
      } catch (error) {
        console.error('Error saving photos to AsyncStorage', error);
      }
    };

    savePhotos();
  }, [photos]);

  const addPhoto = (photo: Photo) => {
    setPhotos(prevPhotos => [...prevPhotos, photo]);
  };

  const removePhoto = (photoToRemove: Photo) => {
    setPhotos(prevPhotos =>
      prevPhotos.filter(photo => photo.uri !== photoToRemove.uri),
    );
  };

  const removeAllPhotos = async () => {
    setPhotos([]);
    try {
      await AsyncStorage.removeItem(PHOTO_STORAGE_KEY);
    } catch (error) {
      console.error('Error removing all photos from AsyncStorage', error);
    }
  };

  return (
    <PhotoContext.Provider
      value={{photos, addPhoto, removePhoto, removeAllPhotos}}>
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotoContext = () => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error(
      'usePhotoContext debe ser utilizado dentro de un PhotoProvider',
    );
  }
  return context;
};

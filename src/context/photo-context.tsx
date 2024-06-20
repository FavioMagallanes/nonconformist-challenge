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

  return (
    <PhotoContext.Provider value={{photos, addPhoto, removePhoto}}>
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

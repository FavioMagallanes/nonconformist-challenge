import React, {createContext, useState, useContext, FC} from 'react';

export type Photo = {
  uri: string;
};

type PhotoContextType = {
  photos: Photo[];
  addPhoto: (photo: Photo) => void;
};

type PhotoProviderProps = {
  children: React.ReactNode;
};

export const PhotoContext = createContext<PhotoContextType | undefined>(
  undefined,
);

export const PhotoProvider: FC<PhotoProviderProps> = ({children}) => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const addPhoto = (photo: Photo) => {
    setPhotos(prevPhotos => [...prevPhotos, photo]);
  };

  return (
    <PhotoContext.Provider value={{photos, addPhoto}}>
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

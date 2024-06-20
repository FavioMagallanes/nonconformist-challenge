import React, {createContext, useState, useEffect, FC} from 'react';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';

type LocationProviderProps = {
  children: React.ReactNode;
};

export const LocationContext = createContext<{
  location: {latitude: number; longitude: number} | null;
  error: string | null;
}>({
  location: null,
  error: null,
});

export const LocationProvider: FC<LocationProviderProps> = ({children}) => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const watchLocation = async () => {
      try {
        const position: GeolocationResponse = await getCurrentPosition();
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      } catch (error) {
        console.error('Error obteniendo la ubicación:', error);
        setError('No se pudo obtener la ubicación');
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

  return (
    <LocationContext.Provider value={{location, error}}>
      {children}
    </LocationContext.Provider>
  );
};

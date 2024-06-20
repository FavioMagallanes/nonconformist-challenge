import {getCityName} from './geocoding-utils';

export type Location = {
  latitude: number;
  longitude: number;
};

export const fetchLocationText = async (
  location: Location | null | undefined,
) => {
  if (location && 'latitude' in location && 'longitude' in location) {
    const city = await getCityName(location.latitude, location.longitude);
    return city
      ? city
      : `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
  } else {
    return 'Unknown Location';
  }
};

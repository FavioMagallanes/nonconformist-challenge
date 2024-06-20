import axios from 'axios';

const API_KEY = 'ac137126f6584b07bc0a57a28f3b1b9d';

export const getCityName = async (
  latitude: number,
  longitude: number,
): Promise<string | null> => {
  try {
    const response = await axios.get(
      'https://api.opencagedata.com/geocode/v1/json',
      {
        params: {
          q: `${latitude}+${longitude}`,
          key: API_KEY,
        },
      },
    );

    const results = response.data.results;
    if (results.length > 0) {
      return (
        results[0].components.city ||
        results[0].components.town ||
        results[0].components.village
      );
    }

    return null;
  } catch (error) {
    console.error('Error al obtener el nombre de la ciudad', error);
    return null;
  }
};

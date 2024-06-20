import Share from 'react-native-share';
import {Photo} from '../../context/photo-context';

export const sharePhoto = async (photo: Photo) => {
  try {
    const shareOptions = {
      title: 'Compartir imagen',
      message: 'Echa un vistazo a esta imagen',
      url: photo.uri,
    };
    await Share.open(shareOptions);
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      error.message !== 'User did not share'
    ) {
      console.error('Error al compartir la imagen:', error);
    }
  }
};

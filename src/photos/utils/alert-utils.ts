import {Alert} from 'react-native';
import {Photo} from '../../context/photo-context';

export const showDeletePhotoAlert = (
  photo: Photo,
  removePhoto: (photo: Photo) => void,
) => {
  Alert.alert(
    'Eliminar foto',
    '¿Estás seguro de que deseas eliminar esta foto?',
    [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Eliminar', onPress: () => removePhoto(photo)},
    ],
    {cancelable: false},
  );
};

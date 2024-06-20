import React, {FC} from 'react';
import {
  Image,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {RouteProp, useRoute, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './photo-modal.styles';
import Share from 'react-native-share';
import {Photo} from '../../context/photo-context';
import {RootStackParamList} from '../../navigation/types';

type PhotoScreenRouteProp = RouteProp<RootStackParamList, 'PhotoScreen'>;

export const PhotoModal: FC = () => {
  const {height: screenHeight} = useWindowDimensions();
  const route = useRoute<PhotoScreenRouteProp>();
  const navigation = useNavigation();
  const {photo} = route.params;

  const locationText = photo.location
    ? `Latitude: ${photo.location.latitude}, Longitude: ${photo.location.longitude}`
    : 'Unknown Location';

  const handleSharePhoto = async (photo: Photo) => {
    try {
      const shareOptions = {
        title: 'Compartir imagen',
        message: 'Echa un vistazo a esta imagen',
        url: photo.uri,
      };
      const shareResponse = await Share.open(shareOptions);

      if (shareResponse.dismissedAction) {
        return;
      }
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

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{...styles.imageContainer, height: screenHeight * 0.7}}>
          <TouchableOpacity
            style={styles.goBackButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-outline" size={30} color="#F40084" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => handleSharePhoto(photo)}>
            <Icon name="logo-whatsapp" size={40} color="#fff" />
          </TouchableOpacity>

          <View style={styles.imageBorder}>
            <Image
              source={{
                uri: photo.uri,
              }}
              style={styles.posterImage}
            />
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Location:</Text>
          <Text style={styles.description}>{locationText}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

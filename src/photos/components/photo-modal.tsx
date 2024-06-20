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
import {RootStackParamList} from '../../navigation/types';
import {styles} from './photo-modal.styles';

type PhotoScreenRouteProp = RouteProp<RootStackParamList, 'PhotoScreen'>;

export const PhotoModal: FC = () => {
  const {height: screenHeight} = useWindowDimensions();
  const route = useRoute<PhotoScreenRouteProp>();
  const navigation = useNavigation();
  const {photo} = route.params;

  const locationText = photo.location
    ? `Latitude: ${photo.location.latitude}, Longitude: ${photo.location.longitude}`
    : 'Unknown Location';

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{...styles.imageContainer, height: screenHeight * 0.7}}>
          <TouchableOpacity
            style={styles.goBackButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-outline" size={30} color="#f0f0f8" />
          </TouchableOpacity>
          <View style={styles.imageBorder}>
            <Image
              source={{
                uri: photo.uri
                  ? photo.uri
                  : 'https://via.placeholder.com/843x475.png?text=No+Image',
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

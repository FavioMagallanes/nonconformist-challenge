import React, {FC, useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {RouteProp, useRoute, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/types';
import {fetchLocationText, sharePhoto} from '../utils';
import {styles} from './photo-modal.styles';
import Icon from 'react-native-vector-icons/Ionicons';

type PhotoScreenRouteProp = RouteProp<RootStackParamList, 'PhotoScreen'>;

export const PhotoModal: FC = () => {
  const {height: screenHeight} = useWindowDimensions();
  const route = useRoute<PhotoScreenRouteProp>();
  const navigation = useNavigation();
  const {photo} = route.params;

  const [locationText, setLocationText] = useState('Unknown Location');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateLocationText = async () => {
      setLoading(true);
      const text = await fetchLocationText(photo.location);
      setLocationText(text);
      setLoading(false);
    };

    updateLocationText();
  }, [photo.location]);

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
            onPress={() => sharePhoto(photo)}>
            <Icon name="logo-whatsapp" size={40} color="#fff" />
          </TouchableOpacity>

          <View style={styles.imageBorder}>
            <Image source={{uri: photo.uri}} style={styles.posterImage} />
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Picture Location:</Text>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#F40084" />
              <Text style={styles.loadingText}>Getting location...</Text>
            </View>
          ) : (
            <Text style={styles.description}>{locationText}</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

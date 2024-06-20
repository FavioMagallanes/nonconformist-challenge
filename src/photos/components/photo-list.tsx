import React, {FC} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Alert,
} from 'react-native';
import {Photo, usePhotoContext} from '../../context/photo-context';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/types';
import {showDeletePhotoAlert} from '../utils/alert-utils';

type PhotoListProps = {
  photos: Photo[];
};

export const PhotoList: FC<PhotoListProps> = ({photos}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {removePhoto} = usePhotoContext();

  const handlePress = (photo: Photo) =>
    navigation.navigate('PhotoScreen', {photo});

  const handleLongPress = (photo: Photo) =>
    showDeletePhotoAlert(photo, removePhoto);

  return (
    <ScrollView contentContainerStyle={styles.gridContainer}>
      {photos.length === 0 ? (
        <View style={styles.noPhotosContainer}>
          <Text style={styles.noPhotosText}>
            Not photos found. Take a picture!
          </Text>
        </View>
      ) : (
        photos.map((photo, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(photo)}
            onLongPress={() => handleLongPress(photo)}>
            <Image source={{uri: photo.uri}} style={styles.gridItem} />
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
    marginTop: 60,
  },
  gridItem: {
    width: 150,
    height: 150,
    margin: 5,
    borderRadius: 10,
  },
  noPhotosContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  noPhotosText: {
    fontSize: 18,
    borderRadius: 50,
    color: '#F40084',
    textAlign: 'center',
  },
});

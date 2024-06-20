import React, {FC} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {Photo, usePhotoContext} from '../../context/photo-context';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/types';
import {showDeletePhotoAlert} from '../utils';
import {DeleteAllPhotosButton} from './delete-all-photos-button';

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
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {photos.length > 0 && (
        <View style={styles.buttonContainer}>
          <DeleteAllPhotosButton />
        </View>
      )}
      <View style={styles.gridContainer}>
        {photos.length === 0 ? (
          <View style={styles.noPhotosContainer}>
            <Text style={styles.noPhotosText}>
              No photos found. Take a picture!
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  buttonContainer: {
    padding: 10,
    alignItems: 'center',
    marginTop: 60,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
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
    height: 700,
  },
  noPhotosText: {
    fontSize: 18,
    borderRadius: 50,
    color: '#F40084',
    textAlign: 'center',
  },
});

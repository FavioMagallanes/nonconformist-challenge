import React, {FC} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {Photo} from '../../context/photo-context';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/types';

type PhotoListProps = {
  photos: Photo[];
};

export const PhotoList: FC<PhotoListProps> = ({photos}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = (photo: Photo) => {
    navigation.navigate('PhotoScreen', {photo});
  };

  return (
    <ScrollView contentContainerStyle={styles.gridContainer}>
      {photos.length === 0 ? (
        <View style={styles.noPhotosContainer}>
          <Text style={styles.noPhotosText}>No hay fotos disponibles</Text>
        </View>
      ) : (
        photos.map((photo, index) => (
          <TouchableOpacity key={index} onPress={() => handlePress(photo)}>
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
    marginTop: 20,
  },
  gridItem: {
    width: 90,
    height: 90,
    margin: 5,
  },
  noPhotosContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  noPhotosText: {
    fontSize: 18,
    color: '#9592e2',
  },
});

export default PhotoList;

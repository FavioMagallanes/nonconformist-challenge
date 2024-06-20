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
import {Photo} from '../../context/photo-context';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/types';
import Icon from 'react-native-vector-icons/Ionicons';

type PhotoListProps = {
  photos: Photo[];
  onDeletePhoto: (photo: Photo) => void;
};

export const PhotoList: FC<PhotoListProps> = ({photos, onDeletePhoto}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = (photo: Photo) => {
    navigation.navigate('PhotoScreen', {photo});
  };

  const handleDeletePhoto = (photo: Photo) => {
    onDeletePhoto(photo);
  };

  const handleLongPress = (photo: Photo) => {
    Alert.alert(
      'Eliminar foto',
      '¿Estás seguro de que deseas eliminar esta foto?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Eliminar', onPress: () => handleDeletePhoto(photo)},
      ],
      {cancelable: false},
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.gridContainer}>
      {photos.length === 0 ? (
        <View style={styles.noPhotosContainer}>
          <Text style={styles.noPhotosText}>No hay fotos disponibles</Text>
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
    color: '#9592e2',
    textAlign: 'center',
  },
});

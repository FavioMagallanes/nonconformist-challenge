import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
import {usePhotoContext} from '../../context/photo-context';
import Icon from 'react-native-vector-icons/Ionicons';

export const DeleteAllPhotosButton: React.FC = () => {
  const {removeAllPhotos} = usePhotoContext();

  const handlePress = () => {
    Alert.alert(
      'Eliminar todas las fotos',
      '¿Estás seguro de que quieres eliminar todas las fotos?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Eliminar',
          onPress: () => removeAllPhotos(),
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.text}>Delete All</Text>
      <Icon
        style={styles.icon}
        name="trash-bin-outline"
        size={20}
        color="#F40084"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  text: {
    color: '#F40084',
    fontSize: 16,
  },
  icon: {
    marginLeft: 6,
  },
});

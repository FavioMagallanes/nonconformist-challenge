import React, {FC} from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';
import {Photo} from '../../context/photo-context';

type PhotoListProps = {
  photos: Photo[];
};

export const PhotoList: FC<PhotoListProps> = ({photos}) => {
  return (
    <ScrollView contentContainerStyle={styles.gridContainer}>
      {photos.map((photo, index) => (
        <Image key={index} source={{uri: photo.uri}} style={styles.gridItem} />
      ))}
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
});

export default PhotoList;

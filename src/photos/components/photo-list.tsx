import React, {FC} from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';

type PhotoListProps = {
  imageUrls: string[];
};

export const PhotoList: FC<PhotoListProps> = ({imageUrls}) => {
  return (
    <ScrollView contentContainerStyle={styles.gridContainer}>
      {imageUrls.map((url, index) => (
        <Image key={index} source={{uri: url}} style={styles.gridItem} />
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

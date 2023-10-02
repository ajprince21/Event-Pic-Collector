import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { getPictureList } from '../api/api';

const PicturesScreen = () => {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    getPictures();
  }, []);

  const getPictures = async () => {
    try {
      const response = await getPictureList();
      if (response.status === '200') {
        setPictures(response.data);
      } else {
        console.error('Failed to fetch pictures:', response.message);
      }
    } catch (error) {
      console.error('Error fetching pictures:', error);
    }
  };

  const renderPictureItem = ({ item }) => (
    <View style={styles.pictureItem}>
      <Text style={styles.pictureTags}>{item.tags}</Text>
      <Image source={{ uri: item.file_path }} style={styles.pictureImage} />

    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Pictures</Text>
      <FlatList
        data={pictures}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPictureItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text>No Images found. Please upload</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: '700',
    color: 'grey',
  },
  pictureItem: {
    marginBottom: 20,
  },
  pictureImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 5,
  },
  pictureTags: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    padding: 5
  },
});

export default PicturesScreen;

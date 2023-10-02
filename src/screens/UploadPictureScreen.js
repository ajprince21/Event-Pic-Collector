import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { uploadPicture } from '../api/api';

const UploadPictureScreen = () => {
  const [pictureUri, setPictureUri] = useState(null);
  const [tag, setTag] = useState('');

  const selectPicture = () => {
    const options = {
      title: 'Select Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    Alert.alert(
      'Select Source',
      'Choose the source of the picture:',
      [
        {
          text: 'Camera',
          onPress: () => launchCamera(options, handleImageSelection),
        },
        {
          text: 'Library',
          onPress: () => launchImageLibrary(options, handleImageSelection),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  const handleImageSelection = (response) => {
    if (response.error) {
      Alert.alert('Error', 'Failed to select an image. Please try again.');
    } else if (response.didCancel) {
      console.log('User cancelled image picker');
    } else {
      if (response.assets && response.assets.length > 0) {
        setPictureUri(response.assets[0]);
      } else {
        Alert.alert('Error', 'Selected image data is missing or in an unexpected format.');
      }
    }
  };

  const handleUploadPicture = async () => {
    try {
      if (!pictureUri || !tag) {
        Alert.alert('Error', 'Please select a picture and provide a tag');
        return;
      }

      // Call the uploadPicture function with tag and pictureUri
      const response = await uploadPicture(tag, pictureUri);

      if (response.status == 200) {
        Alert.alert('Success', 'Image successfully uploaded.');
        setPictureUri(null);
        setTag('');
      } else {
        Alert.alert('Error', response.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to upload the image. Please try again.');
    }
  };



  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Upload Events Pictures</Text>
      <View style={styles.imageContainer}>
        {pictureUri && <Image source={{ uri: pictureUri.uri }} style={styles.image} />}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter Tag/Name"
        placeholderTextColor={'grey'}
        value={tag}
        onChangeText={(text) => setTag(text)}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={selectPicture}>
          <Text style={styles.buttonText}>Select Picture</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleUploadPicture}>
          <Text style={styles.buttonText}>Upload Picture</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'#ffffff'
  },
  headerText: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: '700',
    color: 'grey',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    color:'grey'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText:{
    color:'grey'
  }
});

export default UploadPictureScreen;

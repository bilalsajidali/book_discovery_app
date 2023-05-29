import React, { useState } from 'react';
import { View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Large_Button from './Large_Button';

const UploadImageButton = ({ onSelect }) => {
  const [imageSource, setImageSource] = useState(null);

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission not granted!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageSource(result.uri);
      onSelect(result.uri); // Pass the selected image URI to the parent component
    }
  };

  return (
    <View>
      <Large_Button title="Upload Image" topPosition={621} onPress={selectImage} />
    </View>
  );
};

export default UploadImageButton;


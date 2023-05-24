import React from 'react';
import { View, Text } from 'react-native';
import Button from '../components/Button';
import TextInput from '../components/TextInput';

const AboutScreen = ({ navigation }) => {
  const handleButtonPress = () => {
    navigation.goBack();
  };

  return (
    <View>
      <Text>Welcome to the About Screen!</Text>
      <TextInput placeholder="Enter your name" />
      <Button title="Go Back" onPress={handleButtonPress} />
    </View>
  );
};

export default AboutScreen;

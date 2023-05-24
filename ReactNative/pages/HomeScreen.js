import React from 'react';
import { View, Text } from 'react-native';
import Button from '../components/Button';

const HomeScreen = ({ navigation }) => {
  const handleButtonPress = () => {
    navigation.navigate('About');
  };

  return (
    <View>
      <Text>Welcome to the Home Screen!</Text>
      <Button title="Go to About Screen" onPress={handleButtonPress} />
    </View>
  );
};

export default HomeScreen;

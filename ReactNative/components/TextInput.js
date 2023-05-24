import React from 'react';
import { TextInput as RNTextInput } from 'react-native';

const TextInput = ({ placeholder, value, onChangeText }) => {
  return (
    <RNTextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default TextInput;

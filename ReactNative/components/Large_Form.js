import React from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';

const Large_Form = ({ value, onChangeText, topPosition }) => {
  return (
    <RNTextInput
      value={value}
      onChangeText={onChangeText}
      style={[styles.input, { top: topPosition }]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    position: 'absolute',
    width: 244,
    height: 57,
    left: '50%',
    marginLeft: -122, 
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 10,
  },
});

export default Large_Form;

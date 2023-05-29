import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

const Small_Form = ({ value, onChangeText, top, left }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'), 
      });
      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  return (
    <>
      {fontLoaded && (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[styles.input, { top, left }]}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    position: 'absolute',
    width: 114,
    height: 57,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 10,
  },
});

export default Small_Form;


import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, Text } from 'react-native';
import * as Font from 'expo-font';

const Small_Form = ({ value, onChangeText }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Montserrat-Medium': require('../assets/fonts/Montserrat-Regular.ttf'), 
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
          style={styles.input}
          multiline={true}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    position: 'absolute',
    width: 244,
    height: 138,
    left: 92,
    top: 471,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 10,
  },
});

export default Small_Form;


import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

const Password_Form = ({ value, onChangeText, topPosition }) => {
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
          style={[styles.input, { top: topPosition }]}
          secureTextEntry
        />
      )}
    </>
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
    fontSize: 32,
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: 10,
  },
});

export default Password_Form;

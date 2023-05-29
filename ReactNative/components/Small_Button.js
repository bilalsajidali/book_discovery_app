import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

const Small_Button = ({ onPress, title, topPosition, leftPosition }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'), // Replace with the actual path to your font file
      });
      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null; // Render nothing until the font is loaded
  }

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, { top: topPosition, left: leftPosition }]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    width: 112,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#262A56',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonText: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Small_Button;

import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import * as Font from 'expo-font';

const Book_Heading = ({ children, color, topPosition, leftMargin }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
      });
      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <Text
      style={{
        position: 'absolute',
        top: topPosition, 
        left: leftMargin, 
        textAlign: 'center',
        fontSize: 40,
        fontFamily: 'Montserrat-Bold',
        alignSelf: 'center',
        color: color, 
      }}
    >
      {children}
    </Text>
  );
};

export default Book_Heading;

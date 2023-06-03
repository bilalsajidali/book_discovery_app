import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import * as Font from 'expo-font';

const Heading = ({ children, color }) => {
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

export default Heading;

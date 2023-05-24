import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = ({ topPosition }) => {
  return (
    <Image
      source={require('../assets/mad_logo.png')}
      style={[styles.logo, { top: topPosition }]}
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 212.12,
    width: 350,
    alignSelf: 'center',
  },
});

export default Logo;

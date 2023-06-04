import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const GoogleAds = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/banner-ad-example-online.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: 428,
    height: 64,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 428,
    height: 64,
  },
});

export default GoogleAds;

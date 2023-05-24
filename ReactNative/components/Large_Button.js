import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Large_Button = ({ onPress, title, topPosition }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { top: topPosition }]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    width: 244,
    height: 60,
    left: '50%',
    marginLeft: -122,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#262A56',
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Large_Button;

import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Normal_Text = ({ text, topPosition, leftPosition }) => {
  return (
    <Text style={[styles.text, { top: topPosition, left: leftPosition }]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    position: 'absolute',
  },
});

export default Normal_Text;

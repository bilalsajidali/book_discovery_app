import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Form_Label = ({ text, topPosition, leftPosition }) => {
  return (
    <Text style={[styles.label, { top: topPosition, left: leftPosition }]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    position: 'absolute',
  },
});

export default Form_Label;

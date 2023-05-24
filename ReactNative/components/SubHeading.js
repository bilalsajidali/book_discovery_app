import React from 'react';
import { Text, StyleSheet } from 'react-native';

const SubHeading = ({ text, topPosition, leftPosition, color }) => {
  return (
    <Text style={[styles.subHeading, { top: topPosition, left: leftPosition, color }]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  subHeading: {
    position: 'absolute',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
  },
});

export default SubHeading;

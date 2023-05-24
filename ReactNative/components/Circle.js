import React from 'react';
import { View, StyleSheet } from 'react-native';

const Circle = ({ topPosition, leftPosition, children }) => {
  return (
    <View style={[styles.circle, { top: topPosition, left: leftPosition }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#262A56',
    position: 'absolute',
    zIndex: -1,
  },
});

export default Circle;

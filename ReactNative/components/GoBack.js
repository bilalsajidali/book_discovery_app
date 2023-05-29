import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const GoBack = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topNav} />
      <TouchableOpacity style={styles.arrowLeft} onPress={handleGoBack}>
        <Icon name="arrow-left" size={80} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 93,
  },
  topNav: {
    width: '100%',
    height: '100%',
    backgroundColor: '#262A56',
  },
  arrowLeft: {
    position: 'absolute',
    width: 80,
    height: 80,
    top: 6,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GoBack;


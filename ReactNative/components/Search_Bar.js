import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Font from 'expo-font';

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Montserrat-Light': require('../assets/fonts/Montserrat-Light.ttf'),
      });
      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  useEffect(() => {
    onSearch(search);
  }, [search]);

  if (!fontLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Icon name="search" size={40} style={styles.icon} />
        <TextInput
          style={styles.input}
          onChangeText={setSearch}
          value={search}
          placeholder="Search"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 382,
    height: 70,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  icon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontFamily: 'Montserrat-Light',
    fontSize: 30,
    color: '#000000',
    width: 300,
    height: 70,
    marginLeft: 20,
  },
});

export default SearchBar;

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import Heading from '../components/Heading';
import Cards from '../components/Cards';
import SearchBar from '../components/Search_Bar';

const firebaseConfig = {
  apiKey: "AIzaSyB874SwK2FLGOf3PTtDbmAmUEDwCmejqH4",
  authDomain: "bookdiscoveryapp.firebaseapp.com",
  databaseURL: "https://bookdiscoveryapp-default-rtdb.firebaseio.com",
  projectId: "bookdiscoveryapp",
  storageBucket: "bookdiscoveryapp.appspot.com",
  messagingSenderId: "224686141258",
  appId: "1:224686141258:web:4228c07458829be9f25bb3",
  measurementId: "G-0CTY4WGY2C"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const MainFeedScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const databaseRef = firebase.database().ref('All_Books');

    const handleDataChange = (snapshot) => {
      const data = snapshot.val();
      const allBooks = Object.entries(data).map(([bookId, bookData]) => ({
        bookId,
        ...bookData,
      }));
      setBooks(allBooks);
    };

    databaseRef.on('value', handleDataChange);

    return () => {
      databaseRef.off('value', handleDataChange);
    };
  }, []);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [books, searchQuery]);

  const handleBookPress = (bookId) => {
    navigation.navigate('Detail', { bookId });
  };

  const handleSearch = (query) => {
    const results = books.filter(
      (book) =>
        book.book_title.toLowerCase().includes(query.toLowerCase()) ||
        book.book_author.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={setSearchQuery} />
      <View style={styles.cardsContainer}>
        {searchResults.length > 0 ? (
          searchResults.map((book, index) => (
            <TouchableOpacity key={index} onPress={() => handleBookPress(book.bookId)}>
              <Cards book={book} />
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noResultsContainer}>
            <Heading>No results found</Heading>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  cardsContainer: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
  noResultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainFeedScreen;

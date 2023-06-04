import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GoBack from '../components/GoBack';
import Heading from '../components/Heading';
import Cards from '../components/Cards';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import 'firebase/compat/auth';

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

  const RomanceScreen = () => {
    const [books, setBooks] = useState([]);
    const navigation = useNavigation();

    const handleCardPress = (bookId) => {
      navigation.navigate('Detail', { bookId });
    };
    
    useEffect(() => {
      const fetchBooks = async () => {
        try {
          const ref = firebase.database().ref('All_Books');
          const snapshot = await ref.once('value');
          const fetchedBooks = [];
    
          snapshot.forEach((snap) => {
            if (snap.val().book_genre === "Romance") {
              fetchedBooks.push({
                bookId: snap.key,
                ...snap.val(),
              });
            }
          });
    
          // Sorting fetchedBooks array by rating, from high to low
          fetchedBooks.sort((a, b) => b.book_rating - a.book_rating);
    
          setBooks(fetchedBooks);
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      };
    
      fetchBooks();
    }, []);
  
    return (
      <View style={styles.container}>
        <GoBack />
        <View style={styles.centerContent}>
        <View style={styles.headingContainer}>
          <Heading color="#000">Romance</Heading>
        </View>
        {books.map((book, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCardPress(book.bookId)}
          >
            <Cards book={book} />
          </TouchableOpacity>
        ))}
        </View>
      </View>
    );
  };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    flex: 1,
    alignContent: 'center',
    marginTop: 122,
  },
  headingContainer: {
    marginBottom: 40, 
  },
});

export default RomanceScreen;


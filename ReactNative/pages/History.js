import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GoBack from '../components/GoBack';
import Heading from '../components/Heading';
import Cards from '../components/Cards';
import Added_Cards from '../components/Added_Cards';
import Saved_Cards from '../components/Saved_Cards';
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
} else {
  firebase.app();
}

const HistoyScreen = () => {
  const [addedBooks, setAddedBooks] = useState([]);
  const [savedBooks, setSavedBooks] = useState([]);
  const navigation = useNavigation();

  const handleDeleteBook = (bookId) => {
    setAddedBooks((prevBooks) => prevBooks.filter((book) => book.bookId !== bookId));
  };

  useEffect(() => {
    const fetchAddedBooks = async () => {
      const userId = firebase.auth().currentUser.uid;
      try {
        const databaseRef = firebase.database().ref(`Added_Books/${userId}`);
        const snapshot = await databaseRef.once('value');
        const data = snapshot.val();
        if (data) {
          const bookIds = Object.keys(data).filter((bookId) => data[bookId] === true);
          const books = [];
          for (const bookId of bookIds) {
            const bookSnapshot = await firebase.database().ref(`All_Books/${bookId}`).once('value');
            const bookData = bookSnapshot.val();
            if (bookData) {
              books.push({ bookId, ...bookData });
            }
          }
          setAddedBooks(books);
        }
      } catch (error) {
        console.error('Error fetching added books:', error);
      }
    };

    const fetchSavedBooks = async () => {
      const userId = firebase.auth().currentUser.uid;
      try {
        const databaseRef = firebase.database().ref(`Saved_Books/${userId}`);
        const snapshot = await databaseRef.once('value');
        const data = snapshot.val();
        if (data) {
          const bookIds = Object.keys(data).filter((bookId) => data[bookId] === true);
          const books = [];
          for (const bookId of bookIds) {
            const bookSnapshot = await firebase.database().ref(`All_Books/${bookId}`).once('value');
            const bookData = bookSnapshot.val();
            if (bookData) {
              books.push({ bookId, ...bookData });
            }
          }
          setSavedBooks(books);
        }
      } catch (error) {
        console.error('Error fetching saved books:', error);
      }
    };

    fetchAddedBooks();
    fetchSavedBooks();
  }, []);

  return (
    <View style={styles.container}>
      <GoBack />
      <ScrollView style={styles.contentContainer}>
        <View style={styles.headingContainer}>
          <Heading color="#000">Added Books</Heading>
        </View>
        {addedBooks.map((book, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate('Detail', { bookId: book.bookId })}>
            <Added_Cards book={book} bookId={book.bookId} onDelete={handleDeleteBook} />
          </TouchableOpacity>
        ))}
        <View style={styles.headingContainer}>
          <Heading color="#000">Saved Books</Heading>
        </View>
        {savedBooks.map((book, index) => (
        <TouchableOpacity key={index} onPress={() => navigation.navigate('Detail', { bookId: book.bookId })}>
          <Saved_Cards book={book} bookId={book.bookId} onDelete={handleSavedDeleteBook} />
        </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginTop: 124,
  },
  headingContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
});

export default HistoyScreen;

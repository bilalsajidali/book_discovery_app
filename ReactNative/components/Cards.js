import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import firebase from 'firebase/compat/app';
import storage from '@react-native-firebase/storage';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import * as Font from 'expo-font';

// Initialize Firebase with your Firebase project credentials
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

// Check if Firebase has already been initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Cards = ({ book }) => {
  const { book_title, book_author, book_genre, book_rating, book_image } = book;
  const [imageLoadingError, setImageLoadingError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isFontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
      });
      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  const handleImageError = () => {
    setImageLoadingError(true);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  if (!isFontLoaded) {
    return null; 
  }

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const truncatedTitle = truncateText(book_title, 5); // Limit the title to 5 characters
  const truncatedAuthor = truncateText(book_author, 5); // Limit the author name to 5 characters

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {imageLoadingError ? (
          <View style={styles.imageWrapper}>
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>Image Not Available</Text>
            </View>
          </View>
        ) : (
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: book_image }}
              style={[styles.bookImage, isImageLoaded ? null : styles.hidden]}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          </View>
        )}
        <View style={styles.bookDetails}>
          <Text style={styles.title}>{truncatedTitle}</Text>
          <Text style={styles.author}>Author: {truncatedAuthor}</Text>
          <Text style={styles.genre}>Genre: {book_genre}</Text>
          <Text style={styles.rating}>Rating: {book_rating}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 34,
  },
  card: {
    width: 356,
    height: 182,
    backgroundColor: '#262A56',
    borderRadius: 20,
    flexDirection: 'row',
    padding: 16,
  },
  imageWrapper: {
    position: 'relative',
    width: 150,
    height: 150,
    marginRight: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  bookImage: {
    width: '100%',
    height: '100%',
  },
  hidden: {
    display: 'none',
  },
  placeholderImage: {
    width: 150,
    height: 150,
    height: '100%',
    borderRadius: 10,
    marginRight: 16,
    backgroundColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#FFF',
  },
  bookDetails: {
    flex: 1,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: '#FFF',
    marginBottom: 8,
    marginTop: 15,
  },
  author: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#FFF',
    marginBottom: 8,
  },
  genre: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#FFF',
    marginBottom: 8,
  },
  rating: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#FFF',
    marginBottom: 8,
  },
});

export default Cards;

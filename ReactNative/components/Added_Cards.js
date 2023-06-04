import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Share, TouchableOpacity } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import 'firebase/compat/auth';
import * as Font from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

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

const Added_Cards = ({ book, onDelete }) => {
  const { id, book_title, book_author, book_genre, book_rating, book_image } = book;
  const [imageLoadingError, setImageLoadingError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isFontLoaded, setFontLoaded] = useState(false);
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  
  

  useEffect(() => {
    // Check if the user is authenticated
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, retrieve the userId
        setUserId(user.uid);
      } else {
        // User is signed out, clear the userId
        setUserId(null);
      }
    });

    // Cleanup the subscription
    return () => unsubscribe();
  }, []);

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

  const handleShare = () => {
    Share.share({
      message: `Check out this book: ${book_title} by ${book_author}`,
    })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  const handleEdit = () => {
    navigation.navigate('EditBook', { bookId: book.id, book });
  };

  const handleDelete = () => {
    if (!userId) {
      console.log('User is not authenticated');
      return;
    }
  
    const addedBooksRef = firebase.database().ref(`Added_Books/${userId}/${book.bookId}`);
    const allBooksRef = firebase.database().ref(`All_Books/${book.bookId}`);
  
    addedBooksRef
      .set(null)
      .then(() => {
        console.log('Book deleted from Added_Books successfully');
      })
      .catch((error) => {
        console.log('Error deleting book from Added_Books:', error);
      });
  
    allBooksRef
    .set(null)
    .then(() => {
      console.log('Book deleted from All_Books successfully');
      onDelete(book.bookId); // notify parent component that book has been deleted
    })
    .catch((error) => {
      console.log('Error deleting book from All_Books:', error);
    });
  };
  
  
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.row}>
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
        <View style={styles.iconsContainer}>
          <FontAwesome name="pencil" style={styles.icon} onPress={handleEdit} />
          <TouchableOpacity onPress={handleDelete}>
            <FontAwesome name="trash" style={styles.icon} />
          </TouchableOpacity>
          <FontAwesome name="share-alt" style={styles.icon} onPress={handleShare} />
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
    height: 248,
    backgroundColor: '#262A56',
    borderRadius: 20,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
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
    borderRadius: 10,
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
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  icon: {
    color: '#FFF',
    fontSize: 35,
    marginHorizontal: 34,
  },
});

export default Added_Cards;

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

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

const BookBanner = ({ bookId }) => {
  const [imageURL, setImageURL] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchImageURL = async () => {
      try {
        const storageRef = firebase.storage().ref().child(`book_${bookId}`);
        const downloadURL = await storageRef.getDownloadURL();
        setImageURL(downloadURL);
      } catch (error) {
        console.error('Error fetching image URL:', error);
        setImageError(true);
      }
    };

    fetchImageURL();
  }, [bookId]);

  return (
    <View style={styles.container}>
      {imageURL && !imageError ? (
        <Image
          source={{ uri: imageURL }}
          style={styles.image}
          resizeMode="contain"
        />
      ) : (
        <Text style={styles.imageNotAvailableText}>Image Not Available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 93,
    left: 0,
    width: '100%',
    height: 240,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageNotAvailableText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default BookBanner;
